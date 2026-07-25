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
    reverse: Attribute.Boolean & Attribute.DefaultTo<false>;
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
    couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    icone: Attribute.String;
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
    reverse: Attribute.Boolean & Attribute.DefaultTo<false>;
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

export interface BlocksArticlesPreview extends Schema.Component {
  collectionName: 'components_blocks_articles_previews';
  info: {
    displayName: 'ArticlesPreview';
    icon: 'book';
    description: 'Aper\u00E7u des derniers articles du blog';
  };
  attributes: {
    nombre: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
        max: 12;
      }> &
      Attribute.DefaultTo<4>;
  };
}

export interface BlocksAtelierCta extends Schema.Component {
  collectionName: 'components_blocks_atelier_ctas';
  info: {
    displayName: 'AtelierCta';
    icon: 'brush';
    description: 'Bloc CTA atelier global (donn\u00E9es Strapi cta-global-atelier)';
  };
  attributes: {};
}

export interface BlocksContactForm extends Schema.Component {
  collectionName: 'components_blocks_contact_forms';
  info: {
    displayName: 'ContactForm';
    icon: 'envelope';
    description: 'Formulaire de contact';
  };
  attributes: {
    titre: Attribute.String;
    tag_couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface BlocksFaqEntry extends Schema.Component {
  collectionName: 'components_blocks_faq_entries';
  info: {
    displayName: 'FaqEntry';
    icon: 'question';
    description: 'Entr\u00E9e FAQ';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    develop: Attribute.Text & Attribute.Required;
  };
}

export interface BlocksFaq extends Schema.Component {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'Faq';
    icon: 'question';
    description: 'Section FAQ';
  };
  attributes: {
    section_titre: Attribute.String;
    section_description: Attribute.Text;
    section_image: Attribute.Media;
    bouton_texte: Attribute.String;
    entries: Attribute.Component<'blocks.faq-entry', true>;
  };
}

export interface BlocksGoogleReview extends Schema.Component {
  collectionName: 'components_blocks_google_reviews';
  info: {
    displayName: 'GoogleReview';
    icon: 'star';
    description: 'Encart pour inviter \u00E0 laisser un avis Google';
  };
  attributes: {
    texte: Attribute.String;
    lien: Attribute.String;
  };
}

export interface BlocksHero extends Schema.Component {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
    icon: 'landscape';
    description: "Section hero de la page d'accueil";
  };
  attributes: {
    illustration: Attribute.Media;
    baseline_image: Attribute.Media;
    texte: Attribute.RichText;
    sous_texte: Attribute.Text;
    boutons: Attribute.Component<'basic.bouton', true>;
  };
}

export interface BlocksHorizontalCardItem extends Schema.Component {
  collectionName: 'components_blocks_horizontal_card_items';
  info: {
    displayName: 'HorizontalCardItem';
    icon: 'layout';
    description: 'Carte horizontale';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    illustration: Attribute.Media;
    illustration_url: Attribute.String;
  };
}

export interface BlocksHorizontalCards extends Schema.Component {
  collectionName: 'components_blocks_horizontal_cards';
  info: {
    displayName: 'HorizontalCards';
    icon: 'layout';
    description: 'Groupe de cartes horizontales';
  };
  attributes: {
    cards: Attribute.Component<'blocks.horizontal-card-item', true>;
  };
}

export interface BlocksLandingIntro extends Schema.Component {
  collectionName: 'components_blocks_landing_intros';
  info: {
    displayName: 'LandingIntro';
    icon: 'landscape';
    description: 'Introduction centr\u00E9e avec sous-titre et bandeau d\u00E9coratif';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    sous_titre: Attribute.String;
    texte: Attribute.RichText;
  };
}

export interface BlocksPageHeader extends Schema.Component {
  collectionName: 'components_blocks_page_headers';
  info: {
    displayName: 'PageHeader';
    icon: 'layout';
    description: 'En-t\u00EAte type prestation avec titre, description, bouton et illustration';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    bouton_titre: Attribute.String;
    bouton_lien: Attribute.String;
    image: Attribute.Media;
  };
}

export interface BlocksPartnerEntry extends Schema.Component {
  collectionName: 'components_blocks_partner_entries';
  info: {
    displayName: 'PartnerEntry';
    icon: 'briefcase';
    description: 'Partenaire (logo + lien)';
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    lien: Attribute.String;
    logo: Attribute.Media;
    logo_url: Attribute.String;
  };
}

export interface BlocksPartners extends Schema.Component {
  collectionName: 'components_blocks_partners';
  info: {
    displayName: 'Partners';
    icon: 'briefcase';
    description: 'Emplacement du bandeau partenaires (donn\u00E9es globales)';
  };
  attributes: {};
}

export interface BlocksPrestationCard extends Schema.Component {
  collectionName: 'components_blocks_prestation_cards';
  info: {
    displayName: 'PrestationCard';
    icon: 'grid';
    description: 'Carte de prestation';
  };
  attributes: {
    overline: Attribute.String;
    titre: Attribute.String & Attribute.Required;
    texte: Attribute.RichText;
    lien: Attribute.String;
    lien_texte: Attribute.String;
    illustration: Attribute.Media;
    illustration_url: Attribute.String;
  };
}

export interface BlocksPrestationsGrid extends Schema.Component {
  collectionName: 'components_blocks_prestations_grids';
  info: {
    displayName: 'PrestationsGrid';
    icon: 'grid';
    description: 'Grille des prestations (composant fixe)';
  };
  attributes: {};
}

export interface BlocksPromoteBlog extends Schema.Component {
  collectionName: 'components_blocks_promote_blogs';
  info: {
    displayName: 'PromoteBlog';
    icon: 'book';
    description: 'Bandeau promotionnel du blog avec articles r\u00E9cents';
  };
  attributes: {
    tag: Attribute.String;
    titre: Attribute.String;
    texte: Attribute.RichText;
    bouton_titre: Attribute.String;
    bouton_lien: Attribute.String;
    nombre: Attribute.Integer & Attribute.DefaultTo<3>;
  };
}

export interface BlocksRichText extends Schema.Component {
  collectionName: 'components_blocks_rich_texts';
  info: {
    displayName: 'RichText';
    icon: 'file';
    description: 'Bloc de texte riche';
  };
  attributes: {
    titre: Attribute.String;
    contenu: Attribute.RichText;
  };
}

export interface BlocksSectionTitle extends Schema.Component {
  collectionName: 'components_blocks_section_titles';
  info: {
    displayName: 'SectionTitle';
    icon: 'heading';
    description: 'Titre de section avec tag color\u00E9';
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    tag_couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    margin_top: Attribute.String;
  };
}

export interface BlocksTemoignages extends Schema.Component {
  collectionName: 'components_blocks_temoignages';
  info: {
    displayName: 'Temoignages';
    icon: 'quote';
    description: 'Slider de t\u00E9moignages';
  };
  attributes: {
    titre: Attribute.String;
    cta_texte: Attribute.String;
    cta_lien: Attribute.String;
    cta_couleur: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    entries: Attribute.Component<'blocks.testimonial-entry', true>;
  };
}

export interface BlocksTestimonialEntry extends Schema.Component {
  collectionName: 'components_blocks_testimonial_entries';
  info: {
    displayName: 'TestimonialEntry';
    icon: 'quote';
    description: 'T\u00E9moignage';
  };
  attributes: {
    texte: Attribute.Text & Attribute.Required;
    nom: Attribute.String & Attribute.Required;
    type: Attribute.String;
    illustration: Attribute.Media;
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

export interface NavigationNavLink extends Schema.Component {
  collectionName: 'components_navigation_nav_links';
  info: {
    displayName: 'NavLink';
    icon: 'link';
    description: 'Lien de navigation';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    parent: Attribute.Boolean & Attribute.DefaultTo<false>;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
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
      'blocks.articles-preview': BlocksArticlesPreview;
      'blocks.atelier-cta': BlocksAtelierCta;
      'blocks.contact-form': BlocksContactForm;
      'blocks.faq-entry': BlocksFaqEntry;
      'blocks.faq': BlocksFaq;
      'blocks.google-review': BlocksGoogleReview;
      'blocks.hero': BlocksHero;
      'blocks.horizontal-card-item': BlocksHorizontalCardItem;
      'blocks.horizontal-cards': BlocksHorizontalCards;
      'blocks.landing-intro': BlocksLandingIntro;
      'blocks.page-header': BlocksPageHeader;
      'blocks.partner-entry': BlocksPartnerEntry;
      'blocks.partners': BlocksPartners;
      'blocks.prestation-card': BlocksPrestationCard;
      'blocks.prestations-grid': BlocksPrestationsGrid;
      'blocks.promote-blog': BlocksPromoteBlog;
      'blocks.rich-text': BlocksRichText;
      'blocks.section-title': BlocksSectionTitle;
      'blocks.temoignages': BlocksTemoignages;
      'blocks.testimonial-entry': BlocksTestimonialEntry;
      'linktree.lien': LinktreeLien;
      'navigation.nav-link': NavigationNavLink;
      'podcast.podcasts': PodcastPodcasts;
      'quizz.question': QuizzQuestion;
      'quizz.reponse': QuizzReponse;
      'quizz.resultat': QuizzResultat;
      'seo.seo-metadatas': SeoSeoMetadatas;
    }
  }
}
