# Landings locales — marche à suivre admin

Après redémarrage de Strapi (`npm run develop`) :

1. **Permissions** : Settings → Users & Permissions → Roles → Public → Landing → cocher `find` et `findOne` → Save.
2. **Créer 4 entrées** (brouillon puis Publish) :
   - `sophrologie-pas-en-artois` (mode `cabinet`, localite Pas-en-Artois)
   - `sophrologie-arras` (mode `hybride`, localite Arras)
   - `sophrologie-doullens` (mode `hybride`, localite Doullens)
   - `sophrologie-visio` (mode `visio`, localite Visio / France)
3. Pour chaque entrée : remplir `Metadatas`, `h1`, `zones_desservies`, `faq`, `hero` (CTA principal → `/funnel`), sections, `pages_liees` vers les autres landings.
4. Vérifier : `GET /api/landings?filters[slug][$eq]=sophrologie-arras&populate=deep`

## Palette couleurs (color-picker)

Utiliser uniquement : `#6da7a0`, `#fd8158`, `#dfc6b9`, `#f4c651`, `#a2ba9e`, `#94c9da`, `#337696`, `#cbacd8`.

## Anti thin content

Ne pas dupliquer une page en changeant seulement le nom de ville. Réécrire title, description, H1, zones et FAQ pour chaque localité.
