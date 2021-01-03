const ipcRenderer = window.require("electron").ipcRenderer;

// let name = document.getElementById("pinbutton");

ButtonSendName = document.getElementById("pinbutton");
ButtonSendName.addEventListener("click", event => {
  ipcRenderer.send("pinned");
  console.log("we think it sent click")
});
