/* darsio.pages.dev : menu sur téléphone, en-tête au défilement, version et liens d'achat (un seul endroit à régler : CONFIG) */
const CONFIG = {
    email: 'contact@darsio.com',
    whatsapp: '',               // numéro international sans « + » ni espaces, ex. '212600000000' (vide : pas de bouton WhatsApp)
    prix: '199 DH',
};

document.addEventListener('DOMContentLoaded', () => {
    // menu sur téléphone
    const bouton = document.querySelector('.nav-bouton');
    const nav = document.querySelector('.nav');
    bouton?.addEventListener('click', () => {
        const ouvert = nav.classList.toggle('ouverte');
        bouton.setAttribute('aria-expanded', String(ouvert));
    });
    // filet sous l'en-tête une fois la page défilée
    const entete = document.querySelector('.entete');
    const suivre = () => entete?.classList.toggle('defile', window.scrollY > 8);
    suivre();
    window.addEventListener('scroll', suivre, { passive: true });

    // la dernière version (le même fichier que lit l'application)
    fetch('/version.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : null)).then(v => {
        if (!v) return;
        document.querySelectorAll('[data-version]').forEach(e => (e.textContent = v.version));
        if (v.date) {
            const d = new Date(v.date + 'T12:00:00');
            document.querySelectorAll('[data-version-date]').forEach(e => (e.textContent = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })));
        }
        document.querySelectorAll('[data-telecharger]').forEach(a => {
            if (v.installateur) { a.href = v.installateur; return; }
            // installateur pas encore en ligne : pas de lien mort, on oriente vers le contact
            a.href = '/contact/';
            a.textContent = 'Téléchargement bientôt disponible · nous écrire';
        });
        if (v.sha256) document.querySelectorAll('[data-sha256]').forEach(e => (e.textContent = v.sha256));
        if (v.taille) document.querySelectorAll('[data-taille]').forEach(e => (e.textContent = v.taille));
        const liste = document.querySelector('[data-nouveautes]');
        if (liste && Array.isArray(v.nouveautes)) liste.innerHTML = v.nouveautes.map(n => `<li>${n.replace(/</g, '&lt;')}</li>`).join('');
    }).catch(() => {});

    // achat : WhatsApp (si un numéro est réglé) et e-mail, avec le prix et le code du PC (?code=… depuis l'application)
    const params = new URLSearchParams(location.search);
    const code = params.get('code') || params.get('pc') || '';      // ?pc= : lien « Moyens de paiement » de l'application
    const champCode = document.querySelector('#code-pc');
    if (champCode && code) champCode.value = code.slice(0, 64);
    const message = () => {
        const c = (champCode?.value || code).trim();
        return `Bonjour, je souhaite acheter la licence à vie Darsio (${CONFIG.prix}).` + (c ? ` Code de mon PC : ${c}` : '');
    };
    const majLiens = () => {
        document.querySelectorAll('[data-whatsapp]').forEach(a => {
            a.hidden = !CONFIG.whatsapp;
            a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message())}`;
        });
        document.querySelectorAll('[data-email]').forEach(a => {
            a.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Licence Darsio')}&body=${encodeURIComponent(message())}`;
        });
        document.querySelectorAll('[data-email-texte]').forEach(e => (e.textContent = CONFIG.email));
    };
    champCode?.addEventListener('input', majLiens);
    majLiens();
});
