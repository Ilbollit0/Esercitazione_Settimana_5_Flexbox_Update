# Portfolio Page responsive

Esercizio Epicode – Settimana V, Giorno I: **mobile-first refactoring**.

Ho ripreso la Portfolio Page fatta nella Settimana I, Giorno IV e l'ho resa responsive, cioè leggibile e ben proporzionata su:

| Dispositivo | Larghezza |
|-------------|-----------|
| Mobile      | < 576px (stili di base) |
| Tablet      | da 768px |
| Desktop     | da 1200px |

## Obiettivi

- Usare il `viewport` meta tag
- Applicare l'approccio mobile-first con `min-width`
- Gestire immagini, tabella e form in modo responsive

## Struttura del progetto

```
index.html
grazie.html
assets/
  css/style.css
  image/climber.jpg
  image/everest.jpg
```

## Cosa ho fatto

### HTML
- Ho completato il meta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Ho dato all'header l'id `site-header` e l'ho spostato fuori da `<main>`, così occupa tutta la larghezza.
- Ho avvolto la tabella delle esperienze in `<div class="table-wrapper">`.
- Ho spostato la sezione Contatti dentro `<main>`.
- Ho tolto un `</div>` in più e corretto il tag di chiusura in `grazie.html`.

### CSS – base mobile (< 576px)
- Immagini fluide: `img { max-width: 100%; height: auto; }`.
- Header con padding ridotto (`30px 16px 20px`) e `h1` con `clamp(1.8rem, 6vw, 3rem)`.
- Nav con i `<li>` in `inline-block` centrati: su mobile vanno a capo da soli.
- Padding di `main` e delle sezioni a 16px.
- Avatar centrato sopra il testo (`display: block; margin: 0 auto 16px`).
- Form: `width: 100%` e `font-size: 16px` su input, textarea, select e button; `width: auto` sul checkbox `#consenso`.
- Tabella: `.table-wrapper` con `overflow-x: auto` e `table` con `min-width: 480px`, così scorre in orizzontale senza allargare la pagina.

### CSS – tablet (`@media (min-width: 768px)`)
- Ripristinati i valori desktop: header `60px 20px 40px`, main `40px 20px`, sezioni `32px`.
- Avatar di nuovo flottato a sinistra, con `display: flow-root` sulla sezione per contenerlo.
- Input, textarea e select al 60%, bottone `width: auto`.

### CSS – desktop (`@media (min-width: 1200px)`)
- `h1` più grande (3.5rem).

### Extra
- **Secondo breakpoint** a 1200px (vedi sopra).
- **`clamp()` per h2**: `font-size: clamp(1.3rem, 4vw, 1.8rem)`.

## Come vederlo

Apri `index.html` nel browser e usa i DevTools (modalità dispositivo) per provare le larghezze 576px, 768px e 1200px.

---

# CSS Positioning

Esercizio Epicode – Settimana V, Giorno II: **sticky, absolute, fixed, modal**.

Sono partito dalla Portfolio Page responsive del Giorno I (cartella `start/`) e ho applicato quattro pattern di positioning.

## Obiettivi

- Header sticky che resta visibile durante lo scroll
- Badge NEW ancorato all'angolo della prima card progetto (`position: absolute`)
- Bottone "torna in cima" sempre visibile (`position: fixed`)
- Modal contatti con overlay scuro: il form si apre cliccando un bottone

## Struttura del progetto

```
index.html
style.css
script.js
img/header-bg.jpg
```

## Cosa ho fatto

### Header sticky
- In `#site-header`: `position: sticky; top: 0; z-index: 100;`. Resta nel flusso e si "incolla" in cima quando scrolli.
- `html { scroll-padding-top: 350px; }` (360px da 768px in su): senza, i link del nav portavano la sezione dietro l'header sticky e il titolo restava nascosto.

### Badge NEW (relative + absolute)
- Ho raggruppato le regole comuni di `.project` (padding, border-radius, margin-bottom) in un unico blocco con `position: relative`.
- Ho cancellato il vecchio badge inline `.project:first-of-type h3::after`.
- Nuovo badge `.project:first-of-type::after` con `content: "NEW"`, `position: absolute; top: 0; right: 0;` e `border-radius: 0 4px 0 4px`: si aggancia all'angolo della prima card.

### Back-to-top (fixed)
- Dopo `</main>`: `<a href="#" class="back-to-top" aria-label="Torna in cima">↑</a>`.
  - La consegna usa `href="#site-header"`, ma con l'header sticky non funziona: l'header è sempre già in cima alla finestra, quindi il browser pensa di essere già arrivato e non scorre. `href="#"` porta all'inizio della pagina.
- `.back-to-top` con `position: fixed; bottom: 20px; right: 20px;`, 48×48px, `border-radius: 50%`, sfondo blu, testo bianco, `z-index: 50`.

### Modal contatti
- **HTML:** nella sezione `#contatti` il form è stato sostituito da `<button id="apri-contatti">Scrivimi</button>`. Il form ora sta in `<div id="overlay-contatti" class="overlay" hidden>` → `<div class="modal">`, con un bottone `×` (`id="chiudi-contatti"`) per chiudere.
- **CSS:**
  - `.overlay` → `position: fixed` su tutta la finestra (`top/right/bottom/left: 0`), sfondo `rgba(0, 0, 0, 0.5)`, `z-index: 1000`.
  - `.overlay[hidden] { display: none; }`.
  - `.modal` → `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`, sfondo bianco, padding e bordi arrotondati.
  - Bottone `×` in `position: absolute` nell'angolo del modal.
- **JavaScript (`script.js`):** tre `addEventListener`:
  - click su `#apri-contatti` → `overlay.removeAttribute("hidden")`;
  - click su `#chiudi-contatti` → `overlay.setAttribute("hidden", "")`;
  - click sull'overlay (`event.target === overlay`) → chiusura.

### Extra
- **Blocco dello scroll:** a modal aperto `document.body.style.overflow = "hidden"`, alla chiusura torna `""`.
- **Chiusura con Escape:** `document.addEventListener("keydown", ...)` chiude il modal quando premi `Escape`.

## Come vederlo

Apri `index.html` nel browser, scorri la pagina per vedere l'header sticky e il bottone ↑, poi clicca **Scrivimi** per aprire il modal.

---

# CSS Flexbox

Esercizio Epicode – Settimana V, Giorno III: **refactoring del Portfolio con Flexbox**.

Sono partito dalla Portfolio Page del Giorno II e ho rifatto quattro parti del layout con Flexbox, togliendo `float` e `inline-block`.

## Obiettivi

- Nav con `display: flex`, `flex-wrap` e `gap`, niente più `inline-block`
- Chi sono con avatar e testo affiancati con flex (al posto del `float`)
- Skill list come chips (etichette a pillola) che vanno a capo da sole
- Griglia progetti con `flex-wrap` e `flex: 1 1 260px`

## Cosa ho fatto

### Nav flex
- `nav ul` → `display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;`.
- Tolti `text-align: center` e la regola `nav li { display: inline-block; }`: ora ogni `<li>` è un flex item.
- I link `nav a` passano da `inline-block` a `block` (il padding funziona lo stesso).

### Chi sono con flex
- **HTML:** avatar e paragrafi dentro `<div class="bio">`, i due `<p>` dentro `<div class="text">`. L'`<h2>` resta fuori, così `.bio` ha esattamente due figli.
- **CSS:**
  - `.bio { display: flex; flex-direction: column; gap: 16px; }` su mobile.
  - Da 768px: `flex-direction: row; align-items: flex-start;` → avatar a sinistra, testo a destra.
  - `.avatar`: tolti `float: left` e il margin; resta `display: block; margin: 0 auto;` su mobile e `margin: 0` da 768px. Aggiunto `flex-shrink: 0` così non si rimpicciolisce.
  - Tolto `clear: both` su `#competenze` (senza float non serve più).

### Competenze come chips
- `.skill-list` → `display: flex; flex-wrap: wrap; gap: 8px; padding: 0; list-style: none;`.
- Tolte le righe alternate (`nth-child(odd)` / `nth-child(even)`).
- Ogni `li` è una pillola: sfondo `hsl(220, 60%, 30%)`, testo bianco, `padding: 6px 14px`, `border-radius: 999px`.
- La prima chip (`:first-child`) è gialla per evidenziarla.

### Griglia progetti
- **HTML:** i due `<article class="project">` dentro `<div class="projects-grid">`.
- **CSS:** `.projects-grid { display: flex; flex-wrap: wrap; gap: 16px; }` e `.project { flex: 1 1 260px; }`. Tolto `margin-bottom`: lo spazio lo dà il `gap`.
- Verificato: a 375px le card sono in colonna, a 768px e a 1280px due affiancate.

## Come vederlo

Apri `index.html` e usa i DevTools (modalità dispositivo) per provare 375px, 768px e 1280px.

---

© 2026 Gabriel Bollati

Scritto con l'aiuto di un modello (Readme) di ©Luca.
