const overlay = document.getElementById("overlay-contatti");

function apriModal() {
  overlay.removeAttribute("hidden");
  document.body.style.overflow = "hidden"; // blocca lo scroll della pagina sotto
}

function chiudiModal() {
  // aggiunge la classe che fa partire l'animazione di uscita
  overlay.classList.add("closing");

  // dopo 200ms (durata dell'animazione) nasconde l'overlay e toglie la classe
  setTimeout(() => {
    overlay.setAttribute("hidden", "");
    overlay.classList.remove("closing");
    document.body.style.overflow = "";
  }, 200);
}

// apre il modal
document.getElementById("apri-contatti").addEventListener("click", apriModal);

// chiude con la X
document
  .getElementById("chiudi-contatti")
  .addEventListener("click", chiudiModal);

// chiude cliccando sull'overlay scuro (fuori dal modal)
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    chiudiModal();
  }
});

// chiude con il tasto Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    chiudiModal();
  }
});
