const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

const path = require("path"),
  isDev = require("electron-is-dev");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 480, height: 320 });
  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(appUrl);
  mainWindow.maximize();
  mainWindow.setFullScreen(false);
  mainWindow.on("closed", () => (mainWindow = null));
};

// =================tester====================
let popUp;
const createPopup = () => {
  if (!popUp) {
  popUp = new BrowserWindow({width: 100,
    height: 80, titleBarStyle: 'hide',
    transparent: false,
    frame: true,
    resizable: false,
    hasShadow: false,});
    // popUp.setAutoHideMenuBar(true);
    popUp.loadURL(`file://${path.join(__dirname, "../src/index.html")}`);
    popUp.setAlwaysOnTop(true, 'floating');
  }
  popUp.show();
}
// =================tester end====================

app.on("ready", createWindow);
app.on("ready", createPopup)
app.on("window-all-closed", () => {
  // Follow OS convention on whether to quit app when
  // all windows are closed.
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  // If the app is still open, but no windows are open,
  // create one when the app comes into focus.
  if (mainWindow === null) {
    createWindow();
    createPopup();
  }
});
