# darsio.com

Site officiel de Darsio — phase 1 : accueil, téléchargement, tarifs, contact, pages légales.
HTML et CSS simples, sans outil de construction : chaque page se modifie directement.

## Arborescence

```
index.html                 Accueil
telecharger/index.html     Télécharger (version, taille, SHA-256 lus dans version.json)
tarifs/index.html          Tarifs et achat (?code=… pré-remplit le code du PC)
contact/index.html         WhatsApp et e-mail
confidentialite/           Politique de confidentialité   ← projet à faire relire
conditions/                CGV / CGU                       ← projet à faire relire
mentions-legales/          Éditeur, hébergeur, marques     ← projet à faire relire
404.html                   Page introuvable
version.json               Flux de mise à jour lu par l'application ET par la page Télécharger
assets/css/site.css        Le système de design (encre, papier, une seule ambre par écran)
assets/js/site.js          Menu, version, liens d'achat — réglages dans CONFIG en haut du fichier
assets/img/                Logo, captures (données fictives), image de partage (partage.png)
_headers                   En-têtes Cloudflare (sécurité, cache ; version.json jamais en cache)
robots.txt, sitemap.xml    Référencement
```

## À compléter avant la mise en ligne

1. `assets/js/site.js` → `CONFIG.whatsapp` : le numéro WhatsApp Business (format 212XXXXXXXXX). Vide, le bouton n'apparaît pas.
2. Créer la boîte `contact@darsio.com` (l'application l'utilise aussi pour l'achat).
3. Pages légales : remplir les passages en surbrillance (raison sociale, ICE, adresse, TVA, remboursement, tribunal),
   faire relire, puis retirer le cadre « Projet à faire relire ».
4. `version.json` à chaque version : `version`, `date`, `installateur`, `taille`, `sha256`, `nouveautes`.
   Empreinte : `certutil -hashfile Darsio-setup-1.2611.exe SHA256` (PowerShell : `Get-FileHash`).

## Mise en ligne (Cloudflare)

1. Pages → Create → Upload assets (ou relier un dépôt Git) : ce dossier, tel quel. Pas de commande de construction.
2. Custom domains → `darsio.com` et `www.darsio.com` (redirection www → darsio.com).
3. L'installateur dépasse la limite de 25 Mo par fichier de Pages : le mettre dans un compartiment R2 relié à
   `telechargement.darsio.com`, et indiquer son adresse dans `version.json` → `installateur`.
4. Web Analytics → activer pour darsio.com (sans cookie : pas de bandeau à afficher).

## Vérifier en local

```
py -3.13 -m http.server 8765 --bind 127.0.0.1
```
puis ouvrir http://127.0.0.1:8765/ (les chemins commencent par « / » : ouvrir les fichiers directement ne suffit pas).

## Règles de communication

- Ne jamais utiliser le blason ni le logo du ministère sur le site ou dans les publicités.
- Dire « compatible avec les exports Massar », jamais « officiel » ou « approuvé ».
- Captures : uniquement des données fictives (les captures fournies utilisent des noms et des codes Massar inventés,
  codes en Z900000…, professeur « Salma Idrissi »).
