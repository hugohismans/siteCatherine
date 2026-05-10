# Tuto, mise en route avec Catherine et Dominique

Document de travail pour la session sur place (~2-3 h). Coche au fur et à mesure.

URL du site : https://hugohismans.github.io/siteCatherine/
URL de l'admin : https://hugohismans.github.io/siteCatherine/admin/
Repo : https://github.com/hugohismans/siteCatherine

---

## 1. Comptes GitHub (10 min)

Catherine et Dominique ont chacune besoin d'un compte GitHub pour se connecter à l'admin.

- [ ] Aller sur https://github.com/signup
- [ ] **Catherine** crée un compte avec son email pro `centresoleildelune@gmail.com`
- [ ] **Dominique** crée un compte avec son email pro `dominique-deschamps@hotmail.fr`
- [ ] Choisir un username simple (ex: `catherine-faidherbe`, `dominique-deschamps`)
- [ ] Vérifier les emails de confirmation envoyés par GitHub
- [ ] Pas besoin d'activer la 2FA pour l'instant (à faire plus tard, c'est plus sécurisé)

**À noter :** username GitHub de chacune : ___________________ / ___________________

---

## 2. Inviter comme collaboratrices (5 min)

- [ ] Aller sur https://github.com/hugohismans/siteCatherine/settings/access
- [ ] **Add people** → entrer le username GitHub de Catherine → permission **Write**
- [ ] Idem pour Dominique → permission **Write**
- [ ] Catherine et Dominique reçoivent un email "invitation to collaborate" → cliquer sur **Accept**

---

## 3. Tester l'admin (5 min)

- [ ] Catherine ouvre https://hugohismans.github.io/siteCatherine/admin/
- [ ] Clique **Login with GitHub** → autorise l'application
- [ ] Vérifier qu'elle arrive bien sur l'interface Sveltia (collections "Accueil duo", "Catherine", "Dominique", "Pied de page")
- [ ] Idem pour Dominique sur sa propre session

> Si erreur : screenshot + description, on débogue ensemble.

---

## 4. Calendly (20-30 min)

Pour la prise de rendez-vous en ligne (boutons "Réserver" du site).

### Compte
- [ ] Créer un compte Calendly gratuit sur https://calendly.com (Catherine peut utiliser le sien existant si elle en a un)
- [ ] Choisir le plan **Free** (suffisant pour démarrer)

### Liens à créer
On a besoin de **3 liens** distincts (configurables ensuite dans le CMS) :

- [ ] **Séminaire Dohan octobre 2026** (event type avec dates fixes du 21-25 oct, 6 places)
- [ ] **Séminaire Coxyde janvier 2027** (event type avec dates fixes du 13-17 jan, 6 places)
- [ ] **Soins Catherine** (event type récurrent, créneaux selon ses dispos)
- [ ] **Soins Dominique** (event type récurrent, créneaux selon ses dispos, sur le compte de Dominique ou partagé)

> Note : Calendly gratuit limite à **1 event type par compte**. Si on veut 3-4 events, il faudra soit le plan payant, soit créer plusieurs comptes (un Catherine, un Dominique). Décider sur place.

### Reporter les URLs dans le CMS
Une fois les events créés, copier les URLs (format `https://calendly.com/xxx/event-name`) et les mettre dans le CMS :

- [ ] Admin → **Accueil, Duo** → Séminaires → coller l'URL Calendly de chaque séminaire
- [ ] Admin → **Catherine** → Réservation → coller l'URL Calendly Catherine
- [ ] Admin → **Dominique** → Réservation → coller l'URL Calendly Dominique
- [ ] Save / Publish

---

## 5. Formspree (10 min)

Pour le formulaire de contact des 3 pages.

- [ ] Créer un compte sur https://formspree.io (plan **Free** suffit, 50 messages/mois)
- [ ] Créer un nouveau form :
  - **Name** : `Contact La Fée des Champs et la Fée d'Herbe`
  - **Email destinataire** : à confirmer avec elles, possibilités :
    - Boîte partagée (un email qui forwarde aux deux)
    - Catherine principal + Dominique en CC dans les notifications Formspree
- [ ] Récupérer l'**ID du form** (format `xxxxxxxx`, visible dans l'URL ou les settings)
- [ ] Admin → **Accueil, Duo** → Contact → coller l'ID dans `Identifiant Formspree`
- [ ] Admin → **Catherine** → Contact → idem
- [ ] Admin → **Dominique** → Contact → idem
- [ ] Save / Publish

> Le même ID peut être réutilisé sur les 3 pages (les messages arriveront tous au même endroit, on saura de quelle page ils viennent grâce au champ `subject`).

---

## 6. Tour du CMS, formation prise en main (45 min)

L'objectif : qu'elles puissent modifier le contenu seules.

### Structure
Expliquer les 3 sections principales :
- **Accueil, Duo** : la page d'accueil, présentation commune, séminaires
- **Catherine, Soleil de l'Une** : sa page perso (massages, ateliers, formations)
- **Dominique, Ouvertures des M'Ondes** : sa page perso (soins)
- **Pied de page** : tagline et copyright communs

### Manip à leur faire faire (en live)
- [ ] Modifier un texte (ex: la phrase d'accroche du hero) → Save → rafraîchir le site → constater le changement (~30 s)
- [ ] Remplacer une photo (ex: photo d'un soin) → uploader une nouvelle image → Save → vérifier
- [ ] Ajouter un nouvel item dans une liste (ex: une nouvelle puce dans le programme d'un séminaire)
- [ ] Annuler une modif (montrer comment, via l'historique GitHub si besoin)

### Règles d'or à leur transmettre
1. Ne pas toucher au champ **Identifiant interne** (id) des items, c'est utilisé par le code
2. Toujours cliquer **Save** ou **Publish** après une modif
3. Patienter ~30 s avant de voir le changement sur le site (rafraîchir la page)
4. En cas de doute, ne pas paniquer, tout est versionné, je peux revenir en arrière

---

## 7. Contenu à compléter sur place

Profiter d'être avec elles pour :

- [ ] Vérifier toutes les coordonnées affichées (déjà OK normalement)
- [ ] Demander si elles veulent ajouter de vraies photos d'elles (les `photo-catherine.png` et `photo-dominique.png` actuelles sont à remplacer si elles ont mieux)
- [ ] Demander si elles veulent une **photo de couverture** pour chaque séminaire (à intégrer dans les cards)
- [ ] Vérifier les textes de présentation des soins/massages, corriger éventuelles coquilles
- [ ] Se mettre d'accord sur les **horaires** Calendly (créneaux disponibles pour chacune)

---

## 8. Pour plus tard (à ne pas faire pendant la session)

Listés ici pour ne pas oublier :

- [ ] **Nom de domaine** : acheter et configurer (~12 €/an, ex: lafeedeschamps.be ou similaire)
- [ ] **Pages additionnelles** ? (blog, témoignages, galerie photo…)
- [ ] **2FA GitHub** pour Catherine et Dominique (sécurité)
- [ ] **Données structurées schema.org** dans les `<head>` HTML (SEO)
- [ ] **Activer GitHub Pages** sur le repo si pas déjà fait (Settings → Pages → Source: main)

---

## 9. Récapitulatif des accès créés (à remplir sur place)

Pour qu'elles aient une trace :

- **GitHub Catherine** : username `___________`, mot de passe stocké chez `___________`
- **GitHub Dominique** : username `___________`, mot de passe stocké chez `___________`
- **Calendly** : compte sur l'email `___________`
- **Formspree** : compte sur l'email `___________`
- **Lien admin du site** : https://hugohismans.github.io/siteCatherine/admin/

---

## 10. Après la session

- [ ] Push final si modifs en live
- [ ] Envoyer un email récap avec les liens utiles + rappel du fonctionnement
- [ ] Facturation acompte (100 €) si pas déjà fait
