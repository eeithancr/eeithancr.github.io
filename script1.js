document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comentarioForm");
  const lista = document.getElementById("listaComentarios");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (nombre && comentario) {
      const nuevoComentario = document.createElement("div");
      nuevoComentario.classList.add("comentario");
      nuevoComentario.innerHTML = `
        <h3>${nombre}</h3>
        <p>${comentario}</p>
      `;
      lista.prepend(nuevoComentario);
      form.reset();
    }
  });
});
