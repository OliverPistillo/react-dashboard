# React Admin Dashboard Desktop App

🚀 **Dashboard amministrativo** sviluppato in **React + MUI** e impacchettato con **Electron** per distribuzione desktop (.exe). Interfaccia moderna, stile ClickUp, performance ottimizzate e architettura modulare.

---

## 🖥️ Caratteristiche principali

- ⚛️ **Frontend React 18** con routing via `react-router-dom`
- 🎨 **Material UI 5** per design responsivo e dark mode
- 📊 Componenti dinamici: grafici (Line, Bar, Pie, Geo), tabelle, calendario, FAQ e altro
- 🪟 **Electron** integrato per creazione di app desktop standalone
- 🏗️ Build automatica con `electron-builder`
- 📦 Code splitting, lazy loading, performance tuning ready
- 🌈 Tema dark/light dinamico con `ThemeProvider`
- 🔒 Login e autenticazione (in lavorazione...)

---

## 🛠️ Installazione e Avvio

### 1. Clona il repo

```bash
git clone https://github.com/OliverPistillo/react-dashboard.git
cd react-dashboard
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Avvia in modalità sviluppo

```bash
npm start
```

Aprirà:
- Il server React su `http://localhost:5000`
- L'app Electron con renderer React

---

## 📦 Build per produzione

```bash
npm run build
```

Questo comando:
- Compila l'app React
- Copia il `main.js`
- Lancia `electron-builder` per creare l'eseguibile

Troverai l’output in `dist/` pronto da distribuire (`.exe`, `.dmg` ecc.)

---

## 📁 Struttura del progetto

```
react-admin-dashboard-master/
│
├── public/           # File statici (HTML, icone, manifest)
├── src/              # Codice sorgente React
│   ├── components/   # Componenti riutilizzabili
│   ├── scenes/       # Pagine (Dashboard, Form, FAQ, ecc.)
│   ├── data/         # MockData e risorse geografiche
│   └── theme.js      # Tema globale con dark/light mode
├── main.js           # Entry point Electron
├── package.json      # Configurazione app + script + dipendenze
├── .gitignore
└── README.md         # Questo file
```

---

## ✨ In arrivo

- [ ] Modulo login con Firebase Auth (email + Google)
- [ ] Multi-tenant backend + database SQL
- [ ] Versione mobile (React Native o alternativa leggera)
- [ ] Notifiche desktop, tray icon, auto-update

---

## 📌 Autore

Made with ❤️ by **Oliver Pistillo**  
🔗 [github.com/OliverPistillo](https://github.com/OliverPistillo)

---

## 🧠 License

Questo progetto è distribuito con licenza **MIT**.  
Usalo, forkalo, miglioralo!

---

> _"Simple, scalable, and beautiful. Exactly what admin dashboards should be."_ 😎
