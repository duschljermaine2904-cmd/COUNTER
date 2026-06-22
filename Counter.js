let number1 = document.getElementById("number");

let count = localStorage.getItem('zaehler') ? parseInt(localStorage.getItem('zaehler')) : 0;
let letzte = localStorage.getItem('letzte') ? parseInt(localStorage.getItem('letzte')) : null;

number1.textContent = count;

function formatiereZeitDifferenz(ms) {
    const sekunden = Math.floor(ms / 1000);
    const minuten = Math.floor(sekunden / 60);
    const stunden = Math.floor(minuten / 60);
    const tage = Math.floor(stunden / 24);

    if (tage > 0) return `vor ${tage} Tag${tage > 1 ? 'en' : ''}`;
    if (stunden > 0) return `vor ${stunden} Std ${minuten % 60} Min`;
    if (minuten > 0) return `vor ${minuten} Min`;
    return `vor ${sekunden} Sek`;
}

function aktualisiereLetzte() {
    const el = document.getElementById('letzte-zeit');
    if (!letzte) {
        el.textContent = '–';
    } else {
        el.textContent = formatiereZeitDifferenz(Date.now() - letzte);
    }
}

function Countup() {
    count++;
    letzte = Date.now();
    number1.textContent = count;
    localStorage.setItem('zaehler', count);
    localStorage.setItem('letzte', letzte);
    aktualisiereLetzte();
}

function Countdown() {
    if (count > 0) {
        count--;
        number1.textContent = count;
        localStorage.setItem('zaehler', count);
    }
}

function starteUhr() {
    const jetzt = new Date();
    const uhrzeit = jetzt.toLocaleTimeString('de-DE');
    document.getElementById('uhr').innerText = uhrzeit;
    setTimeout(starteUhr, 1000);
}

// "letzte" jede Minute auffrischen
setInterval(aktualisiereLetzte, 1000);

aktualisiereLetzte();
starteUhr();