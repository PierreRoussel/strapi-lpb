'use strict';

const EDITOR_ROLE_TYPE = 'editor';
const EDITOR_ROLE_NAME = 'Editor';

const PUBLIC_READ_ACTIONS = ['find', 'findOne'];
const EDITOR_WRITE_ACTIONS = ['find', 'findOne', 'create', 'update', 'delete'];

async function ensureRole(strapi, { name, type, description }) {
  const existing = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type } });

  if (existing) {
    return existing;
  }

  return strapi.query('plugin::users-permissions.role').create({
    data: {
      name,
      description,
      type,
    },
  });
}

async function setPermissions(strapi, roleId, permissions) {
  for (const permission of permissions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          role: roleId,
          action: permission.action,
        },
      });

    if (existing) {
      if (!existing.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: existing.id },
          data: { enabled: true },
        });
      }
      continue;
    }

    await strapi.query('plugin::users-permissions.permission').create({
      data: {
        action: permission.action,
        role: roleId,
        enabled: true,
      },
    });
  }
}

function buildApiPermissions(uid, actions) {
  return actions.map((action) => ({
    action: `api::${uid}.${uid}.${action}`,
  }));
}

function buildUploadPermissions(actions) {
  return actions.map((action) => ({
    action: `plugin::upload.${action}`,
  }));
}

async function seedBuilderContent(strapi) {
  const pageCount = await strapi.db.query('api::page.page').count();
  if (pageCount === 0) {
    await strapi.entityService.create('api::page.page', {
      data: {
        titre: 'Accueil',
        slug: 'accueil',
        couleur_page: '#6da7a0',
        metadatas: {
          Titre_page:
            'Le Petit Bourgeon | Sophrologue à Pas-en-Artois, Arras, Doullens et visio',
          Description_page:
            'Sophrologue pour stress, sommeil, hypersensibilité, enfants, adultes et seniors.',
        },
        blocks: [
          {
            __component: 'blocks.hero',
            texte:
              "<p>Découvrez Le Petit Bourgeon, bien plus qu'un cabinet bien-être, <b>un écosystème positif accessible pour tous</b>.</p>",
            sous_texte:
              "Proche d'Arras et Doullens, le cabinet se trouve à Pas-en-Artois.",
          },
          {
            __component: 'blocks.section-title',
            titre: 'Nos prestations',
            tag_couleur: '#fd8158c5',
            margin_top: '8rem',
          },
          { __component: 'blocks.prestations-grid' },
          {
            __component: 'blocks.temoignages',
            titre: 'Nous sommes à votre écoute',
            entries: [
              {
                texte: 'Première expérience de sophrologie pour moi !',
                nom: 'Anne',
                type: 'Accompagnement du quotidien',
              },
            ],
          },
          { __component: 'blocks.atelier-cta' },
          { __component: 'blocks.articles-preview', nombre: 4 },
          {
            __component: 'blocks.contact-form',
            titre: 'Nous contacter',
            tag_couleur: '#ecb440',
          },
        ],
        publishedAt: new Date(),
      },
    });
  }

  const navigation = await strapi.entityService.findMany('api::navigation.navigation');
  if (!navigation) {
    await strapi.entityService.create('api::navigation.navigation', {
      data: {
        prestations_links: [
          { name: 'Séances de sophrologie', link: 'prestations', parent: true },
          { name: 'Sophrologie', link: 'prestations/sophrologie' },
        ],
        ressources_links: [
          { name: 'Boite à outils', link: 'boite_a_outils', parent: true },
          { name: 'Blog', link: 'blog' },
        ],
        about_links: [
          { name: 'Qui suis-je ?', link: 'about', parent: true },
          { name: 'FAQ', link: 'faq' },
        ],
        publishedAt: new Date(),
      },
    });
  }
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      await setPermissions(strapi, publicRole.id, [
        ...buildApiPermissions('page', PUBLIC_READ_ACTIONS),
        ...buildApiPermissions('navigation', PUBLIC_READ_ACTIONS),
      ]);
    }

    const editorRole = await ensureRole(strapi, {
      name: EDITOR_ROLE_NAME,
      type: EDITOR_ROLE_TYPE,
      description: 'Éditeur visuel du site — peut modifier pages et navigation',
    });

    await setPermissions(strapi, editorRole.id, [
      ...buildApiPermissions('page', EDITOR_WRITE_ACTIONS),
      ...buildApiPermissions('navigation', ['find', 'findOne', 'update']),
      ...buildUploadPermissions(['upload']),
    ]);

    await seedBuilderContent(strapi);
  },
};
