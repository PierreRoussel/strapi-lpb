'use strict';

const EDITOR_ROLE_TYPE = 'editor';
const EDITOR_ROLE_NAME = 'Editor';
const ADMIN_ROLE_TYPE = 'admin';
const ADMIN_ROLE_NAME = 'Administrator';

const PUBLIC_READ_ACTIONS = ['find', 'findOne'];
const ADMIN_WRITE_ACTIONS = ['find', 'findOne', 'create', 'update', 'delete'];

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

const UPLOAD_CONTENT_API_ACTIONS = ['content-api.upload'];

function buildUploadPermissions(actions) {
  return actions.map((action) => ({
    action: `plugin::upload.${action}`,
  }));
}

async function disablePermissions(strapi, roleId, permissions) {
  for (const permission of permissions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          role: roleId,
          action: permission.action,
        },
      });

    if (existing?.enabled) {
      await strapi.query('plugin::users-permissions.permission').update({
        where: { id: existing.id },
        data: { enabled: false },
      });
    }
  }
}

const PUBLIC_CONTENT_TYPES = [
  'page',
  'navigation',
  'global-temoignages',
  'global-faq',
  'global-partners',
  'global-prestations',
  'article',
  'category',
  'prestation',
  'cta-global-atelier',
  'page-tarif',
  'page-podcast',
  'page-conference',
  'actualite',
  'evenement',
  'cible',
  'ressource',
  'quizz',
  'linktree',
  'ou-me-trouver',
  'places-bien-etre',
  'reseau',
];

async function seedCtaGlobalAtelier(strapi) {
  const existing = await strapi.db
    .query('api::cta-global-atelier.cta-global-atelier')
    .findOne();

  if (existing) return;

  await strapi.entityService.create('api::cta-global-atelier.cta-global-atelier', {
    data: {
      bloc_cta: {
        titre: 'Ateliers de sophrologie',
        texte:
          'Découvrez nos ateliers de groupe pour partager un moment de bien-être et de relaxation.',
        couleur_fond: '#becfbb',
        bouton: {
          titre: 'Découvrir les ateliers',
          lien: '/prestations/seances-de-groupe',
        },
      },
    },
  });
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
            tag_couleur: '#fd8158',
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

async function seedGlobalTemoignages(strapi) {
  const existing = await strapi.db
    .query('api::global-temoignages.global-temoignages')
    .findOne({});

  if (existing) return;

  await strapi.entityService.create('api::global-temoignages.global-temoignages', {
    data: {
      titre: 'Nous sommes à votre écoute',
      cta_texte: "Tenter l'expérience",
      cta_lien: '/funnel',
      cta_couleur: '#6da7a0',
      entries: [
        {
          texte:
            "Première expérience de sophrologie pour moi ! J'appréhendais un peu, surtout que nous ne nous voyons qu'en visio. Mais vraiment, Sixtine est au top ! Prévenante et à l'écoute, elle sait mettre en place les pratiques qu'il faut. Et elle est ponctuelle. Je recommande !",
          nom: 'Anne',
          type: 'Accompagnement du quotidien',
        },
        {
          texte:
            "Sixtine intervient depuis plusieurs mois au sein de l'Espace Ressources Cancers Arrageois. Elle accompagne les personnes atteintes d'un cancer et leur proche en leur proposant des séances personnalisées, dans un climat extrêmement bienveillant. Nous n'avons que des retours positifs ! Merci pour cette chouette collaboration !",
          nom: 'ERC Arrageois',
          type: 'Ateliers de groupe',
        },
      ],
      publishedAt: new Date(),
    },
  });
}

async function seedGlobalFaq(strapi) {
  const existing = await strapi.db
    .query('api::global-faq.global-faq')
    .findOne({});

  if (existing) return;

  await strapi.entityService.create('api::global-faq.global-faq', {
    data: {
      section_titre: 'Vos questions les plus courantes',
      section_description:
        'Afin de mieux comprendre la sophrologie et explorer la pratique, voici des petites graines que vous laisse Le Petit Bourgeon.',
      bouton_texte: 'Consulter les réponses',
      section_image_url:
        'https://res.cloudinary.com/dsij12kya/image/upload/v1692462579/FAQ_06284cafd5.svg',
      entries: [
        {
          titre:
            "Peut-on profiter d'un accompagnement de sophrologie en visioconference ?",
          develop:
            "Oui. La sophrologie est parfaitement adaptee a la visio car l'outil principal est la voix.",
        },
        {
          titre: 'Combien de seances faut-il pour ressentir des effets ?',
          develop:
            "Chaque personne avance a son rythme, mais les premiers effets sont souvent perceptibles apres quelques seances regulieres.",
        },
        {
          titre:
            'La sophrologie peut-elle aider en cas de stress ou burn-out ?',
          develop:
            "Oui. La sophrologie travaille la respiration, la detente corporelle et la regulation emotionnelle.",
        },
        {
          titre:
            'Proposez-vous un accompagnement pour les aidants et personnes malades ?',
          develop:
            "Oui. L'accompagnement est adapte aux besoins des personnes touchees par la maladie et de leurs proches aidants.",
        },
      ],
      publishedAt: new Date(),
    },
  });
}

async function seedGlobalPartners(strapi) {
  const existing = await strapi.db
    .query('api::global-partners.global-partners')
    .findOne({});

  if (existing) return;

  await strapi.entityService.create('api::global-partners.global-partners', {
    data: {
      tag: 'Ils nous font confiance',
      titre: 'Ils nous font confiance',
      description:
        "Le cabinet de sophrologie Le Petit Bourgeon est fier de pouvoir contribuer au bien-être et à la mission de santé de structures et associations locales. Nous pouvons nous engager sur des contrats récurrents auprès d'entreprises et associations pour intervenir lors de séances individuelles pour vos collaborateurs ou lors d'ateliers collectifs. Chaque prestation est réalisée sur-mesure, pour vos besoins.",
      entries: [
        {
          nom: 'ERC - Espace Ressource Cancer',
          lien: 'https://erc-hauts-de-france.ars.sante.fr/',
        },
        {
          nom: 'TRAINME - Par Decathlon',
          lien: 'https://trainme.co/fr/pourquoi-trainme',
        },
        {
          nom: "L'Hirondelle Bleue - Centre de Médecine Intégrative",
          lien: 'https://lhirondelle-bleue.fr/',
        },
        {
          nom: 'UNA Des Trois Vallées',
          lien: 'https://www.facebook.com/profile.php?id=100080197914163&locale=fr_FR',
        },
        {
          nom: 'Feron-Vrau',
          lien: 'https://feron-vrau.com/ehpad-saint-antoine-de-padoue/',
        },
        {
          nom: 'Urbasolar',
          lien: 'https://www.urbasolar.com/',
        },
      ],
      publishedAt: new Date(),
    },
  });
}

async function seedGlobalPrestations(strapi) {
  const existing = await strapi.db
    .query('api::global-prestations.global-prestations')
    .findOne({});

  if (existing) return;

  await strapi.entityService.create('api::global-prestations.global-prestations', {
    data: {
      titre: 'Nos prestations',
      cta_titre: 'Sophrologie, en visio ou au cabinet',
      cta_texte: 'Prendre rendez-vous',
      cta_lien: 'https://cal.com/le-petit-bourgeon',
      entries: [
        {
          overline: 'Sophrologie',
          titre: 'Séance de sophrologie',
          texte:
            '<p>La pratique de la sophrologie vise à cultiver notre capacité à :</p><ul><li>Mieux comprendre et gérer ses émotions</li><li>Lâcher prise sur nos pensées et nos émotions</li><li>Être plus serein face aux difficultés de la vie</li><li>Porter notre attention sur le moment présent</li><li>Construire son propre écosystème bien-être en toute autonomie</li><li>Développer des ressources positives pour atteindre vos objectifs personnel, professionnel et vous épanouir.</li></ul>',
          lien: '/prestations/sophrologie',
          lien_texte: 'Plus à propos de la sophrologie',
          illustration_url:
            'https://res.cloudinary.com/dsij12kya/image/upload/c_thumb,w_50,g_face/v1690717103/prendre_une_pause_cropped_wnnjgn.svg',
        },
        {
          overline: 'Gestion des émotions',
          titre: 'Améliorer votre quotidien',
          texte:
            "<p>La sophrologie peut t'aider à t'alléger de nombreux maux et problématiques que tu rencontres au quotidien, tels que :<br><i>Sommeil, stress, anxiété, pensées envahissantes et bloquantes, émotions exacerbées inconfortables, manque de confiance en soi, besoin d'affirmer son autorité parentale, surmonter un deuil, et bien d’autres encore...</i></p>",
          lien: '/prestations/hypersensibilite',
          lien_texte: 'Plus à propos de nos accompagnements',
        },
        {
          overline: 'Préparation à un événement précis',
          titre: 'Préparation mentale',
          texte:
            '<p>Sportif (amateur ou professionnel) ? Artiste ? En entreprise ? Etudiant ? La sophrologie aide à se préparer à un événement précis : Examen, concours, permis de conduire, accouchement, entretien, événement sportif, compétition, prise de parole..</p>',
          lien: '/prestations/preparation-mentale',
          lien_texte: 'Plus à propos de nos accompagnements',
        },
        {
          overline: 'Gestion du stress',
          titre: 'Stress & burnout',
          texte:
            "<p>La sophrologie aide à détendre le corps et l’esprit, favorisant ainsi une meilleure gestion du stress. Elle est spécialement recommandée pour diminuer l'intensité des crises d'angoisse et des attaques de panique, tout en apaisant l'anxiété.<br>Cette pratique agit sur l'esprit, les tensions corporelles, les émotions et permet de ne pas se laisser envahir par les émotions désagréables.</p>",
          lien: '/prestations/stress-et-burn-out',
          lien_texte: 'Plus à propos de nos accompagnements',
          illustration_url:
            'https://res.cloudinary.com/dsij12kya/image/upload/c_thumb,w_50,g_face/v1690717103/prevention_cropped_ldrtfi.svg',
        },
      ],
      publishedAt: new Date(),
    },
  });
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const publicPermissions = PUBLIC_CONTENT_TYPES.flatMap((uid) =>
        buildApiPermissions(uid, PUBLIC_READ_ACTIONS)
      );
      await setPermissions(strapi, publicRole.id, publicPermissions);
    }

    const editorRole = await ensureRole(strapi, {
      name: EDITOR_ROLE_NAME,
      type: EDITOR_ROLE_TYPE,
      description: 'Lecture seule — le builder visuel est réservé aux administrateurs',
    });

    await setPermissions(strapi, editorRole.id, [
      ...buildApiPermissions('page', PUBLIC_READ_ACTIONS),
      ...buildApiPermissions('navigation', PUBLIC_READ_ACTIONS),
    ]);

    await disablePermissions(strapi, editorRole.id, [
      ...buildApiPermissions('page', ['create', 'update', 'delete']),
      ...buildApiPermissions('navigation', ['update', 'create', 'delete']),
      ...buildUploadPermissions(UPLOAD_CONTENT_API_ACTIONS),
      { action: 'plugin::upload.upload' },
    ]);

    const adminRole = await ensureRole(strapi, {
      name: ADMIN_ROLE_NAME,
      type: ADMIN_ROLE_TYPE,
      description: 'Administrateur frontend — accès au builder visuel du site',
    });

    await setPermissions(strapi, adminRole.id, [
      ...buildApiPermissions('page', ADMIN_WRITE_ACTIONS),
      ...buildApiPermissions('navigation', ['find', 'findOne', 'update']),
      ...buildApiPermissions('global-temoignages', ['find', 'findOne', 'update']),
      ...buildApiPermissions('global-faq', ['find', 'findOne', 'update']),
      ...buildApiPermissions('global-partners', ['find', 'findOne', 'update']),
      ...buildApiPermissions('global-prestations', ['find', 'findOne', 'update']),
      ...buildUploadPermissions(UPLOAD_CONTENT_API_ACTIONS),
    ]);

    await disablePermissions(strapi, adminRole.id, [
      { action: 'plugin::upload.upload' },
    ]);

    await seedBuilderContent(strapi);
    await seedCtaGlobalAtelier(strapi);
    await seedGlobalTemoignages(strapi);
    await seedGlobalFaq(strapi);
    await seedGlobalPartners(strapi);
    await seedGlobalPrestations(strapi);
  },
};
