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
      'linktree.lien': LinktreeLien;
      'podcast.podcasts': PodcastPodcasts;
      'quizz.question': QuizzQuestion;
      'quizz.reponse': QuizzReponse;
      'quizz.resultat': QuizzResultat;
      'seo.seo-metadatas': SeoSeoMetadatas;
    }
  }
}
