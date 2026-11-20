const socket = io();
const statusMessage = document.querySelector("#services-status");
let pendingRefresh;

async function refreshServices() {
  pendingRefresh?.abort();
  const request = new AbortController();
  pendingRefresh = request;

  try {
    const response = await fetch(window.location.pathname, { signal: request.signal });
    if (!response.ok) {
      throw new Error("No se pudo cargar el listado");
    }

    const html = await response.text();
    const page = new DOMParser().parseFromString(html, "text/html");
    const updatedList = page.querySelector("#services-list");
    if (!updatedList) {
      throw new Error("El listado no está disponible");
    }

    if (!request.signal.aborted) {
      document.querySelector("#services-list").replaceWith(updatedList);
      statusMessage.textContent = "";
    }
  } catch {
    if (!request.signal.aborted) {
      statusMessage.textContent = "No se pudo actualizar el listado de servicios.";
    }
  }
}

socket.on("services:changed", refreshServices);
// Recupera cambios ocurridos antes de conectar o durante una desconexión.
socket.on("connect", refreshServices);
