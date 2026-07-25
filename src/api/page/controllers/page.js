'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const PAGE_UID = 'api::page.page';

module.exports = createCoreController(PAGE_UID, ({ strapi }) => ({
  async publish(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne(PAGE_UID, id, {
      publicationState: 'preview',
    });

    if (!entity) {
      return ctx.notFound('Page not found');
    }

    if (entity.publishedAt) {
      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    }

    const updated = await strapi.entityService.update(PAGE_UID, id, {
      data: { publishedAt: new Date() },
    });

    const sanitized = await this.sanitizeOutput(updated, ctx);
    return this.transformResponse(sanitized);
  },

  async unpublish(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne(PAGE_UID, id, {
      publicationState: 'preview',
    });

    if (!entity) {
      return ctx.notFound('Page not found');
    }

    if (!entity.publishedAt) {
      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    }

    const updated = await strapi.entityService.update(PAGE_UID, id, {
      data: { publishedAt: null },
    });

    const sanitized = await this.sanitizeOutput(updated, ctx);
    return this.transformResponse(sanitized);
  },
}));
