import type { Schema, Attribute } from '@strapi/strapi';

export interface BasicBlocCta extends Schema.Component {
  collectionName: 'components_basic_bloc_ctas';
  info: {
    displayName: 'bloc_cta';
    icon: 'ad';
    description: '';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    texte: Attribute.Text & Attribute.Required;
    bouton: Attribute.Component<'basic.bouton'>;
    illustration: Attribute.Media;
    couleur_fond: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface BasicBouton extends Schema.Component {
  collectionName: 'components_basic_boutons';
  info: {
    displayName: 'bouton';
    icon: 'arrow-alt-circle-right';
  };
  attributes: {
    titre: Attribute.String;
    lien: Attribute.String;
  };
}

export interface BasicCategorieTarifs extends Schema.Component {
  collectionName: 'components_basic_categorie_tarifs';
  info: {
    displayName: 'CategorieTarifs';
    icon: 'apps';
    description: '';
  };
  attributes: {
    Titre: Attribute.String;
    Description: Attribute.String;
    Tarif: Attribute.Component<'basic.tarif', true>;
  };
}

export interface BasicImgDisplay extends Schema.Component {
  collectionName: 'components_basic_img_displays';
  info: {
    displayName: 'ImgDisplay';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    titre: Attribute.String;
    image: Attribute.Media;
    texte: Attribute.RichText;
  };
}

export interface BasicLieux extends Schema.Component {
  collectionName: 'components_basic_lieuxes';
  info: {
    displayName: 'lieux';
  };
  attributes: {
    titre: Attribute.String;
    adresse: Attribute.String;
    description: Attribute.String;
    image: Attribute.Media;
  };
}

export interface BasicTarif extends Schema.Component {
  collectionName: 'components_basic_tarifs';
  info: {
    displayName: 'Tarif';
    icon: 'information';
    description: '';
  };
  attributes: {
    Titre: Attribute.String;
    Prix: Attribute.Decimal;
    LienCalcom: Attribute.String;
    DureeEnMinutes: Attribute.Integer;
    Couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    Description: Attribute.Blocks;
  };
}

export interface BasicWideBlocCta extends Schema.Component {
  collectionName: 'components_basic_wide_bloc_ctas';
  info: {
    displayName: 'wide_bloc_cta';
    icon: 'atlas';
    description: '';
  };
  attributes: {
    titre: Attribute.String;
    texte: Attribute.Text;
    illustration: Attribute.Media;
    ctas: Attribute.Component<'basic.bouton', true>;
    couleur_fond: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface FaqQuestion extends Schema.Component {
  collectionName: 'components_faq_questions';
  info: {
    displayName: 'Question FAQ';
    icon: 'question';
    description: 'Question / r\u00E9ponse de la FAQ';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    develop: Attribute.Text & Attribute.Required;
  };
}

export interface LandingDualCta extends Schema.Component {
  collectionName: 'components_landing_dual_ctas';
  info: {
    displayName: 'DualCta';
    icon: 'clone';
    description: 'Double CTA ateliers + newsletter';
  };
  attributes: {
    atelier_titre: Attribute.String;
    atelier_texte: Attribute.Text;
    atelier_illustration: Attribute.Media;
    atelier_bouton: Attribute.Component<'basic.bouton'>;
    atelier_couleur_fond: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    newsletter_titre: Attribute.String;
    newsletter_texte: Attribute.Text;
    newsletter_couleur_fond: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface LandingFaqItem extends Schema.Component {
  collectionName: 'components_landing_faq_items';
  info: {
    displayName: 'FaqItem';
    icon: 'question';
    description: 'Question / r\u00E9ponse FAQ locale';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    reponse: Attribute.Text & Attribute.Required;
  };
}

export interface LandingFeatureItem extends Schema.Component {
  collectionName: 'components_landing_feature_items';
  info: {
    displayName: 'FeatureItem';
    icon: 'star';
    description: 'Carte feature (icone Iconoir + texte)';
  };
  attributes: {
    icone: Attribute.String & Attribute.Required;
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface LandingFeaturesGrid extends Schema.Component {
  collectionName: 'components_landing_features_grids';
  info: {
    displayName: 'FeaturesGrid';
    icon: 'layer-group';
    description: 'Grille de features (3 cartes typiquement)';
  };
  attributes: {
    titre_section: Attribute.String;
    items: Attribute.Component<'landing.feature-item', true>;
  };
}

export interface LandingHero extends Schema.Component {
  collectionName: 'components_landing_heroes';
  info: {
    displayName: 'Hero';
    icon: 'landscape';
    description: 'Hero landing avec CTAs et preuve sociale';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    titre_emphase: Attribute.String;
    texte: Attribute.Text;
    illustration: Attribute.Media;
    cta_principal: Attribute.Component<'basic.bouton'>;
    cta_secondaire: Attribute.Component<'basic.bouton'>;
    note: Attribute.String;
    preuve_sociale: Attribute.String;
    avatars: Attribute.Media;
  };
}

export interface LandingImgTexte extends Schema.Component {
  collectionName: 'components_landing_img_textes';
  info: {
    displayName: 'ImgTexte';
    icon: 'images';
    description: 'Section image + texte altern\u00E9e, stats optionnelles';
  };
  attributes: {
    eyebrow: Attribute.String;
    titre: Attribute.String & Attribute.Required;
    texte: Attribute.RichText;
    image: Attribute.Media;
    reverse: Attribute.Boolean & Attribute.DefaultTo<false>;
    bouton: Attribute.Component<'basic.bouton'>;
    stats: Attribute.Component<'landing.stat-item', true>;
  };
}

export interface LandingStatItem extends Schema.Component {
  collectionName: 'components_landing_stat_items';
  info: {
    displayName: 'StatItem';
    icon: 'chart-bar';
    description: 'Chiffre + label pour stats / barre de stats';
  };
  attributes: {
    valeur: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface LandingStatsBar extends Schema.Component {
  collectionName: 'components_landing_stats_bars';
  info: {
    displayName: 'StatsBar';
    icon: 'chart-line';
    description: 'Barre de statistiques';
  };
  attributes: {
    items: Attribute.Component<'landing.stat-item', true>;
  };
}

export interface LandingTemoignageItem extends Schema.Component {
  collectionName: 'components_landing_temoignage_items';
  info: {
    displayName: 'TemoignageItem';
    icon: 'quote-right';
    description: 'Entr\u00E9e t\u00E9moignage landing';
  };
  attributes: {
    citation: Attribute.Text & Attribute.Required;
    nom: Attribute.String & Attribute.Required;
    role: Attribute.String;
    photo: Attribute.Media;
  };
}

export interface LandingTemoignages extends Schema.Component {
  collectionName: 'components_landing_temoignages';
  info: {
    displayName: 'Temoignages';
    icon: 'comments';
    description: 'Section t\u00E9moignages landing';
  };
  attributes: {
    titre_section: Attribute.String;
    entries: Attribute.Component<'landing.temoignage-item', true>;
  };
}

export interface LinktreeLien extends Schema.Component {
  collectionName: 'components_linktree_liens';
  info: {
    displayName: 'Lien';
    icon: 'globe-africa';
    description: '';
  };
  attributes: {
    Lien: Attribute.String;
    Nom: Attribute.String;
  };
}

export interface PodcastPodcasts extends Schema.Component {
  collectionName: 'components_podcast_podcasts';
  info: {
    displayName: 'podcasts';
    icon: 'play';
    description: '';
  };
  attributes: {
    titre_podcast: Attribute.String & Attribute.Required;
    description_podcast: Attribute.Text & Attribute.Required;
    image_podcast: Attribute.Media & Attribute.Required;
    audio_podcast: Attribute.Media;
    lien_spotify: Attribute.String;
    couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface QuizzQuestion extends Schema.Component {
  collectionName: 'components_quizz_questions';
  info: {
    displayName: 'Question';
    icon: 'splotch';
    description: '';
  };
  attributes: {
    Question: Attribute.String & Attribute.Required;
    Description_courte: Attribute.Text;
    Illustration: Attribute.Media;
    Reponses: Attribute.Component<'quizz.reponse', true>;
  };
}

export interface QuizzReponse extends Schema.Component {
  collectionName: 'components_quizz_reponses';
  info: {
    displayName: 'Reponse';
    icon: 'air-freshener';
  };
  attributes: {
    Reponse: Attribute.String;
  };
}

export interface QuizzResultat extends Schema.Component {
  collectionName: 'components_quizz_resultats';
  info: {
    displayName: 'Resultat';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    Reponse_moyenne: Attribute.Integer;
    Description: Attribute.RichText;
  };
}

export interface SeoSeoMetadatas extends Schema.Component {
  collectionName: 'components_seo_seo_metadatas';
  info: {
    displayName: 'SeoMetadatas';
    icon: 'air-freshener';
    description: '';
  };
  attributes: {
    Titre_page: Attribute.String;
    Description_page: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basic.bloc-cta': BasicBlocCta;
      'basic.bouton': BasicBouton;
      'basic.categorie-tarifs': BasicCategorieTarifs;
      'basic.img-display': BasicImgDisplay;
      'basic.lieux': BasicLieux;
      'basic.tarif': BasicTarif;
      'basic.wide-bloc-cta': BasicWideBlocCta;
      'faq.question': FaqQuestion;
      'landing.dual-cta': LandingDualCta;
      'landing.faq-item': LandingFaqItem;
      'landing.feature-item': LandingFeatureItem;
      'landing.features-grid': LandingFeaturesGrid;
      'landing.hero': LandingHero;
      'landing.img-texte': LandingImgTexte;
      'landing.stat-item': LandingStatItem;
      'landing.stats-bar': LandingStatsBar;
      'landing.temoignage-item': LandingTemoignageItem;
      'landing.temoignages': LandingTemoignages;
      'linktree.lien': LinktreeLien;
      'podcast.podcasts': PodcastPodcasts;
      'quizz.question': QuizzQuestion;
      'quizz.reponse': QuizzReponse;
      'quizz.resultat': QuizzResultat;
      'seo.seo-metadatas': SeoSeoMetadatas;
    }
  }
}
