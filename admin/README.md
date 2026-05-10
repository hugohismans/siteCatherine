# Admin CMS, La Fée des Champs et la Fée d'Herbe

Sveltia CMS pour que Catherine et Dominique modifient textes et photos sans toucher au code.

**URL admin (une fois déployé) :** https://hugohismans.github.io/siteCatherine/admin/

---

## Mise en route (à faire 1× par toi, Hugo)

### 1. Créer la GitHub OAuth App

1. Va sur https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
2. Remplis :
   - **Application name** : `La Fée des Champs et la Fée d'Herbe, CMS`
   - **Homepage URL** : `https://hugohismans.github.io/siteCatherine/`
   - **Authorization callback URL** : `https://sveltia-auth.<ton-sous-domaine>.workers.dev/callback`
     (URL provisoire, à mettre à jour à l'étape 3)
3. Note **Client ID** + **Client Secret** (le secret n'est affiché qu'une fois, copie-le)

### 2. Déployer le proxy OAuth (Cloudflare Worker)

Sveltia a besoin d'un proxy parce que GitHub Pages est statique. On utilise le worker officiel `sveltia-cms-auth` (gratuit, ~5 min).

```bash
# Si tu n'as pas encore wrangler
npm i -g wrangler
wrangler login

# Cloner et déployer le worker
git clone https://github.com/sveltia/sveltia-cms-auth
cd sveltia-cms-auth
wrangler secret put GITHUB_CLIENT_ID       # colle le Client ID
wrangler secret put GITHUB_CLIENT_SECRET   # colle le Client Secret
wrangler secret put ALLOWED_DOMAINS        # colle: hugohismans.github.io
wrangler deploy
```

Wrangler te donne l'URL du worker, ex : `https://sveltia-auth.tonusername.workers.dev`.

### 3. Mettre à jour les URLs

- Dans **GitHub OAuth App** (étape 1), édite **Authorization callback URL** avec la vraie URL du worker :
  `https://sveltia-auth.tonusername.workers.dev/callback`
- Dans `admin/config.yml` ligne `base_url:`, remplace `PLACEHOLDER` par ton sous-domaine, puis commit/push.

### 4. Inviter Catherine et Dominique comme collaboratrices

1. https://github.com/hugohismans/siteCatherine/settings/access → **Add people**
2. Invite Catherine et Dominique (elles devront créer un compte GitHub gratuit si elles n'en ont pas)
3. Permission : **Write** (suffit pour commit, pas besoin d'admin)

---

## Guide pour Catherine et Dominique (à leur transmettre)

1. **Créer ton compte GitHub** sur https://github.com si tu n'en as pas, c'est gratuit.
2. **Accepter l'invitation** que Hugo t'enverra par email (sujet : "invitation to collaborate").
3. **Aller sur l'admin** : https://hugohismans.github.io/siteCatherine/admin/
4. **Se connecter avec GitHub** (un seul clic).
5. **Modifier le contenu** :
   - Cliquer sur "Contenu du site" puis sur la section à modifier (Accueil duo, Catherine, Dominique…)
   - Changer le texte ou cliquer sur une photo pour la remplacer
   - Cliquer sur **Save** (ou **Publish**) en haut à droite
6. **Patienter ~30 secondes**, le site se met à jour automatiquement, il faut juste rafraîchir la page.

> Si quelque chose se passe mal, **ne pas paniquer** : aucune modif n'est définitive, tout est versionné. Hugo peut toujours revenir en arrière.

---

## Architecture technique (rappel)

- `content.json` : source de vérité unique, contient tout le contenu éditable
- `index.html` / `catherine.html` / `dominique.html` : squelettes avec `data-key` attributes
- `script.js` : fetch `content.json` au chargement et hydrate le DOM
- `admin/config.yml` : schéma d'édition de Sveltia (collections + widgets par champ)
- `admin/index.html` : entrée Sveltia (charge le bundle JS depuis unpkg)

Sveltia commit directement sur `main` (`publish_mode: simple`), pas de PR à valider.

---

## Quand tu auras fini les 4 étapes

Donne-moi l'URL du Worker (`sveltia-auth.xxxx.workers.dev`) et je :
1. Mets à jour `base_url` dans `admin/config.yml`
2. Commit + push
3. Rédige les emails d'invitation pour Catherine et Dominique
