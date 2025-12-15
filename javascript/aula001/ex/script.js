let jsAtivo = true;

function toggleCSS() {
    const css = document.getElementById("css-link");
    css.disabled = !css.disabled;
}
function toggleHTML() {
  const elements = document.querySelectorAll(".html-layer");

  elements.forEach(el => {
    if (el.style.display === "none") {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
}



function toggleJS() {
  jsAtivo = !jsAtivo;

  document.getElementById("js-status").textContent =
    jsAtivo ? "JS ligado" : "JS desligado";

  document.getElementById("btn-html").disabled = !jsAtivo;
  document.getElementById("btn-css").disabled = !jsAtivo;
}

function openImage(src) {
  const overlay = document.getElementById("overlay");
  const img = document.getElementById("modal-img");

  img.src = src;
  overlay.style.display = "flex";
}

function closeImage() {
  document.getElementById("overlay").style.display = "none";
}
