// public/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require("fs");
const isDev = !app.isPackaged;

function createWindow() {
  // Crea la finestra del browser con parametri iniziali
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,  // Isola il contesto della pagina (sicurezza)
      nodeIntegration: false   // Disabilita integrazione Node nel renderer
      // preload: path.join(__dirname, 'preload.js') // (opzionale) script preload
    }
  });

  if (isDev) {
    // Modalità sviluppo: carica dal server React
    const devURL = `http://localhost:5000`; // o 5000, se hai cambiato porta
    mainWindow.loadURL(devURL);
    mainWindow.webContents.openDevTools();  // apre gli strumenti di sviluppo
  } else {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath);
    } else {
      console.error("⚠️ index.html non trovato!");
    }
  }
}

// Quando Electron è pronto, crea la finestra.
app.whenReady().then(createWindow);

// Su macOS, riapre l’app se clicchi sull’icona nel dock dopo che tutte le finestre sono state chiuse.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Chiudi l'applicazione quando tutte le finestre sono chiuse (eccetto su macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
