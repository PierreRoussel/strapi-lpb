module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 5, // Default is 5
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUD_NAME", ""),
        api_key: env("CLOUD_API_KEY", ""),
        api_secret: env("CLOUD_API_SECRET", ""),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-brevo",
      providerOptions: {
        apiKey: env("BREVO_API_KEY", ""),
      },
      settings: {
        defaultSenderEmail: "cabinet.bien-etre@lepetitbourgeon.fr",
        defaultSenderName: "Le Petit Bourgeon",
        defaultReplyTo: "cabinet.bien-etre@lepetitbourgeon.fr",
      },
    },
  },
});
