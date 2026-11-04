const overlay = document.getElementById("overlay-contatti");

function apriModal() {
  overlay.removeAttribute("hidden");
  document.body.style.overflow = "hidden"; // blocca lo scroll della pagina sotto
}

function chiudiModal() {
  overlay.setAttribute("hidden", "");
  document.body.style.overflow = "";
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
