# Site, La Fée d'Herbe & des Champs

Site vitrine pour Catherine Faidherbe (Soleil de l'Une) et Dominique Deschamps (Ouvertures des M'Ondes) : présentation du duo, séminaires en Belgique et en Brocéliande, et offres individuelles (massages, soins énergétiques, ateliers, formations).

**URL prod :** https://hugohismans.github.io/siteCatherine/

## Architecture

3 pages HTML statiques hydratées depuis `content.json` :

- `index.html`, accueil duo + séminaires
- `catherine.html`, Soleil de l'Une (massages, ateliers, formations)
- `dominique.html`, Ouvertures des M'Ondes (soins, Reiki, EFT, constellations)

Chaque page définit `window.PAGE_KEY` qui dit à `script.js` quelle section du JSON consommer.

## Structure des fichiers

```
.
├── index.html              # Accueil duo
├── catherine.html          # Page Soleil de l'Une
├── dominique.html          # Page Ouvertures des M'Ondes
├── content.json            # Source de vérité (édité via le CMS)
├── script.js               # Hydratation + modals + form
├── style.css               # Charte commune + 3 thèmes (theme-duo / theme-catherine / theme-dominique)
├── .nojekyll               # Évite le traitement Jekyll par GitHub Pages
├── images/                 # Photos, vignettes, fiches PDF
└── admin/
    ├── index.html          # Sveltia CMS
    └── config.yml          # Schéma d'édition
```

## Stack

- HTML/CSS/JS statique, zéro framework
- Polices Google : Cormorant Garamond + Great Vibes (titres) + Lato (texte)
- **Sveltia CMS** pour permettre à Catherine et Dominique d'éditer le contenu sans toucher au code
- Hébergement GitHub Pages
- **Calendly** pour la prise de rendez-vous (URLs configurables dans le CMS)
- **Formspree** pour le formulaire de contact

## TODO avant mise en prod

- [ ] **OAuth Sveltia** : déployer un Cloudflare Worker et remplacer `base_url` dans `admin/config.yml` (`PLACEHOLDER`)
- [ ] **Formspree** : créer 3 endpoints (un par page) ou un seul partagé, et remplacer `PLACEHOLDER_ID` dans `content.json`
- [ ] **Calendly** : créer les liens dédiés (séminaires, soins Catherine, soins Dominique) et les remplacer dans `content.json`
- [ ] **Coordonnées Dominique** : récupérer son vrai email + téléphone (placeholders pour l'instant)
- [ ] **Adresses** : remplacer "Rue de l'Exemple 102, 1000 Bruxelles" par les vraies adresses des cabinets
- [ ] **Numéro Catherine** : confirmer 0479/64.28.51 (les fiches formation indiquent 0749642851, probable inversion à valider)
- [ ] **GitHub Pages** : activer Pages sur la branche `main` du repo
- [ ] **Données structurées schema.org** à enrichir dans le `<head>` des HTML une fois les vraies adresses connues

## Développement local

Ouvrir n'importe quel `*.html` dans un navigateur (les fetch sur `content.json` fonctionnent en file://) ou servir le dossier :

```bash
python -m http.server 8000
# puis http://localhost:8000
```

## Édition via le CMS

URL admin : `https://hugohismans.github.io/siteCatherine/admin/`

L'édition crée un commit direct sur `main` (pas de PR). Le site se redéploie automatiquement via GitHub Pages.
