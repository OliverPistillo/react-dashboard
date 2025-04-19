# ProjectFlow - Dashboard React + Electron

🚀 **Piattaforma di gestione progetti** sviluppata in **React + MUI**, con packaging tramite **Electron** per una distribuzione desktop multipiattaforma.

Interfaccia moderna ispirata a ClickUp e Notion, performance ottimizzate e architettura altamente modulare e scalabile.

---

## 🖥️ Caratteristiche principali

- ⚛️ **React 18** + routing con `react-router-dom`
- 🎨 **Material UI 5** con supporto tema dark/light
- 🗂️ Visualizzazioni flessibili: Lista, Kanban, Calendario, Gantt
- 📁 **Gestione documenti** con editor integrato e versioning
- ⏱️ Tracciamento tempo, cronologia attività, assegnazioni
- 📊 Grafici dinamici (Line, Bar, Pie, Geo) e dashboard personalizzabili
- 🪟 **Electron** per funzioni desktop (notifiche, offline, tray icon)
- 📦 **electron-builder** per generare `.exe`, `.dmg`, `.AppImage`, ecc.
- 🔒 Login e autenticazione (Firebase Auth in sviluppo)

---

## 🛠️ Guida all’installazione

### 1. Clona il repository
```bash
git clone https://github.com/OliverPistillo/react-dashboard.git
cd react-dashboard
```

### 2. Installa le dipendenze principali
```bash
npm install
```

### 3. Avvia in modalità sviluppo
```bash
npm start
```
Questo comando eseguirà contemporaneamente:
- Il server React su `http://localhost:5000`
- L'app Electron collegata al renderer

---

## 📦 Build per produzione
```bash
npm run build
```
Il comando genera:
- Build ottimizzata React
- Build Electron via `electron-builder`
- Output finale nella cartella `dist/`

---

## 📁 Struttura del progetto
```
project-flow/
├── electron/
│   ├── main.js
│   └── preload.js
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   ├── scenes/
│   ├── services/
│   ├── store/
│   ├── theme/
│   ├── data/
│   ├── utils/
│   └── hooks/
├── package.json
└── README.md
```

---

## ✨ Funzionalità implementate

- 🧩 Gestione task e progetti con viste multiple
- 💬 Commenti, allegati, assegnazioni, priorità
- 📅 Calendario e Gantt con drag & drop
- 📈 Dashboard metriche e produttività
- 📝 Editor documenti con versioning
- 👥 Team e permessi per progetto
- 🧠 Dark mode / Light mode dinamico
- 🔔 Notifiche desktop e supporto offline
- 🔐 Login/registrazione utente

---

## 🚧 In sviluppo / Prossimi step

- [ ] Notifiche real-time
- [ ] Backend multi-tenant SQL
- [ ] App mobile companion (React Native)
- [ ] Collaborazione live (WebSocket)
- [ ] Integrazione Google Drive / Slack / Zapier

---

## 🧠 Troubleshooting rapidi

**Errore: Module not found**
→ Verifica gli import relativi e la presenza dei file

**Electron non si avvia**
→ Assicurati che React sia su porta 5000 e `electron/main.js` sia corretto

**Build fallita**
→ Controlla `package.json` e che tutte le dipendenze siano installate

**Errore di tipi** (se usi librerie con TS)
→ Installa: `npm install --save-dev @types/nome-libreria`

---

## 📌 Autore
Made with ❤️ by **Oliver Pistillo**  
🔗 [github.com/OliverPistillo](https://github.com/OliverPistillo)

---

## 🧠 Licenza
Progetto distribuito con licenza **MIT**.  
Usalo, forkalo, miglioralo.

---

> _"Flexible like Airtable. Powerful like ClickUp. Beautiful like Notion."_

