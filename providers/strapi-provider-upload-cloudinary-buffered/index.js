'use strict';

/**
 * Cloudinary upload provider that forces the buffered upload path.
 *
 * The official @strapi/provider-upload-cloudinary prefers uploadStream.
 * With Content-API uploads (and some local networks) the stream path
 * regularly hits Cloudinary "Request Timeout" in ~5s, while Admin uploads
 * and direct buffer uploads succeed. By only exposing `upload`, Strapi
 * buffers the file first then calls us — same Cloudinary account, reliable path.
 */

const intoStream = require('into-stream');
const cloudinaryNamespace = require('cloudinary');
const { errors } = require('@strapi/utils');

const cloudinary = cloudinaryNamespace.v2;

const DEFAULT_TIMEOUT_MS = 120000;

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

module.exports = {
  init(options = {}) {
    const timeout = Number(options.timeout) || DEFAULT_TIMEOUT_MS;

    cloudinary.config({
      cloud_name: options.cloud_name,
      api_key: options.api_key,
      api_secret: options.api_secret,
    });

    const uploadOnce = (buffer, config) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { ...config, timeout },
          (err, image) => {
            if (err) {
              if (String(err.message || '').includes('File size too large')) {
                reject(new errors.PayloadTooLargeError());
                return;
              }
              reject(
                new Error(`Error uploading to cloudinary: ${err.message || err}`)
              );
              return;
            }
            if (!image) {
              reject(new Error('Error uploading to cloudinary: empty response'));
              return;
            }
            resolve(image);
          }
        );

        intoStream(buffer).pipe(uploadStream);
      });

    const upload = async (file, customConfig = {}) => {
      let buffer = file.buffer;
      if (!buffer && file.stream) {
        buffer = await streamToBuffer(file.stream);
      }
      if (!buffer) {
        throw new Error('Missing file buffer for Cloudinary upload');
      }

      const config = {
        resource_type: 'auto',
        public_id: file.hash,
        ...customConfig,
      };

      if (file.ext) {
        config.filename = `${file.hash}${file.ext}`;
      }
      if (file.path) {
        config.folder = file.path;
      }

      let image;
      try {
        image = await uploadOnce(buffer, config);
      } catch (firstError) {
        // One retry — Content-API uploads sometimes hit a transient timeout.
        const message = String(firstError?.message || '');
        if (!message.includes('Request Timeout')) {
          throw firstError;
        }
        image = await uploadOnce(buffer, config);
      }

      if (image.resource_type === 'video') {
        file.previewUrl = cloudinary.url(`${image.public_id}.gif`, {
          video_sampling: 6,
          delay: 200,
          width: 250,
          crop: 'scale',
          resource_type: 'video',
        });
      }

      file.url = image.secure_url;
      file.provider_metadata = {
        public_id: image.public_id,
        resource_type: image.resource_type,
      };
    };

    return {
      // Intentionally no uploadStream — forces Strapi to buffer first.
      upload,
      async delete(file, customConfig = {}) {
        const { resource_type: resourceType, public_id: publicId } =
          file.provider_metadata || {};
        const response = await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType || 'image',
          invalidate: true,
          ...customConfig,
        });
        if (response.result !== 'ok' && response.result !== 'not found') {
          throw new Error(`Error deleting on cloudinary: ${response.result}`);
        }
      },
    };
  },
};
