const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
session = electron.session;
ipcMain = electron.ipcMain;

const path = require("path"),
  isDev = require("electron-is-dev");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(appUrl);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("ping", "whoooooooh!");
  });
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

ipcMain.on('createCookie', (event, arg) => {
  console.log("GOT COOKIE USER OBJECT. CREATING COOKIE=======", arg)
  let cookie_val = JSON.stringify(arg)
  console.log("COOKIE VAL INPUT JSONIFIED=======", cookie_val)
  let secured = true
  const cookie = { url: 'http://github.com', name: arg.username, value: cookie_val, expirationDate: 1709333077958, sameSite: 'no_restriction'}
  session.defaultSession.cookies.set(cookie)
  .then(() => {
    console.log("========CREATED USER COOKIE SUCCESSFULLY=========")
  }, (error) => {
    console.error(error)
  })
})

ipcMain.on("loadCookies", (event, arg) => {
  // get cookies
  session.defaultSession.cookies.get({ url: 'http://github.com' })
  .then((cookies) => {
    console.log(cookies)
    // console.log("SENDING COOKIES TO WINDOW=====", cookies)
    event.reply('userData', cookies)
  }).catch((error) => {
    console.log(error)
  })
})

ipcMain.on("clearCookies", (event, arg) => {
  // get cookies
  console.log("CLEARING COOKIES=====")
  session.defaultSession.cookies.remove('http://github.com', arg)
  .then(() => {
  }, (error) => {
    console.error(error)
  })
})
