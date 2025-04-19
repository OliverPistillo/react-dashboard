/ src/data/mockData.js
export const mockProjects = [
  {
    id: 'proj1',
    name: 'Sviluppo sito web aziendale',
    description: 'Progettazione e sviluppo del nuovo sito web corporate con focus su UX/UI e performance.',
    startDate: '2025-03-01T00:00:00.000Z',
    endDate: '2025-05-15T00:00:00.000Z',
    status: 'active',
    progress: 35,
    priority: 'alta',
    members: ['user1', 'user2', 'user3', 'user4'],
    manager: 'user1',
    budget: 25000,
    client: 'TechCorp',
    tags: ['web', 'design', 'frontend', 'backend']
  },
  {
    id: 'proj2',
    name: 'App mobile gestione ordini',
    description: 'Sviluppo applicazione mobile cross-platform per la gestione degli ordini e tracciamento delle consegne.',
    startDate: '2025-02-15T00:00:00.000Z',
    endDate: '2025-04-30T00:00:00.000Z',
    status: 'active',
    progress: 60,
    priority: 'alta',
    members: ['user1', 'user3', 'user5'],
    manager: 'user1',
    budget: 18000,
    client: 'LogiDelivery',
    tags: ['mobile', 'react-native', 'api', 'logistica']
  },
  {
    id: 'proj3',
    name: 'Dashboard analisi vendite',
    description: 'Creazione di una dashboard interattiva per la visualizzazione e analisi dei dati di vendita in tempo reale.',
    startDate: '2025-04-01T00:00:00.000Z',
    endDate: '2025-05-20T00:00:00.000Z',
    status: 'active',
    progress: 15,
    priority: 'media',
    members: ['user2', 'user4', 'user6'],
    manager: 'user2',
    budget: 12000,
    client: 'RetailPlus',
    tags: ['dashboard', 'data-visualization', 'analytics']
  },
  {
    id: 'proj4',
    name: 'Rebranding aziendale',
    description: 'Rinnovo dell\'identità visiva aziendale con nuovo logo, colori, font e materiali promozionali.',
    startDate: '2025-01-10T00:00:00.000Z',
    endDate: '2025-03-28T00:00:00.000Z',
    status: 'complete',
    progress: 100,
    priority: 'alta',
    members: ['user1', 'user2', 'user5'],
    manager: 'user5',
    budget: 15000,
    client: 'FitnessGear',
    tags: ['branding', 'design', 'marketing']
  },
  {
    id: 'proj5',
    name: 'Sistema gestione progetti interno',
    description: 'Implementazione di un sistema interno per la gestione efficiente dei progetti e delle risorse aziendali.',
    startDate: '2025-04-15T00:00:00.000Z',
    endDate: '2025-07-30T00:00:00.000Z',
    status: 'planning',
    progress: 0,
    priority: 'media',
    members: ['user1', 'user4', 'user6'],
    manager: 'user1',
    budget: 22000,
    client: 'Interno',
    tags: ['gestione', 'project-management', 'risorse']
  }
];

export const mockTasks = [
  // Progetto 1: Sviluppo sito web aziendale
  {
    id: 'task1',
    title: 'Analisi dei requisiti',
    description: 'Raccolta e analisi dei requisiti del cliente per il nuovo sito web.',
    startDate: '2025-03-01T00:00:00.000Z',
    dueDate: '2025-03-07T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj1',
    assignees: [
      { id: 'user1', name: 'Marco Bianchi', avatar: '/assets/avatars/avatar1.jpg' },
      { id: 'user2', name: 'Laura Rossi', avatar: '/assets/avatars/avatar2.jpg' }
    ],
    tags: ['analisi', 'documentazione'],
    completedSubtasks: 5,
    totalSubtasks: 5,
    comments: 3,
    attachments: 2
  },
  {
    id: 'task2',
    title: 'Wireframing e design UI',
    description: 'Creazione dei wireframe e della UI per tutte le pagine principali del sito.',
    startDate: '2025-03-08T00:00:00.000Z',
    dueDate: '2025-03-21T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj1',
    assignees: [
      { id: 'user2', name: 'Laura Rossi', avatar: '/assets/avatars/avatar2.jpg' }
    ],
    tags: ['design', 'ui', 'wireframe'],
    completedSubtasks: 8,
    totalSubtasks: 8,
    comments: 12,
    attachments: 6,
    dependencies: ['task1']
  },
  {
    id: 'task3',
    title: 'Sviluppo frontend',
    description: 'Implementazione del frontend in React seguendo il design approvato.',
    startDate: '2025-03-22T00:00:00.000Z',
    dueDate: '2025-04-12T00:00:00.000Z',
    status: 'inProgress',
    priority: 'alta',
    projectId: 'proj1',
    assignees: [
      { id: 'user3', name: 'Andrea Verdi', avatar: '/assets/avatars/avatar3.jpg' },
      { id: 'user4', name: 'Sofia Neri', avatar: '/assets/avatars/avatar4.jpg' }
    ],
    tags: ['frontend', 'react', 'development'],
    completedSubtasks: 4,
    totalSubtasks: 12,
    comments: 8,
    attachments: 3,
    dependencies: ['task2']
  },
  {
    id: 'task4',
    title: 'Sviluppo backend e API',
    description: 'Creazione del backend e delle API necessarie per il funzionamento del sito.',
    startDate: '2025-03-22T00:00:00.000Z',
    dueDate: '2025-04-12T00:00:00.000Z',
    status: 'inProgress',
    priority: 'alta',
    projectId: 'proj1',
    assignees: [
      { id: 'user1', name: 'Marco Bianchi', avatar: '/assets/avatars/avatar1.jpg' }
    ],
    tags: ['backend', 'api', 'development'],
    completedSubtasks: 3,
    totalSubtasks: 10,
    comments: 5,
    attachments: 2,
    dependencies: ['task1']
  },
  {
    id: 'task5',
    title: 'Test e ottimizzazione',
    description: 'Testing approfondito di tutte le funzionalità e ottimizzazione delle performance.',
    startDate: '2025-04-13T00:00:00.000Z',
    dueDate: '2025-04-30T00:00:00.000Z',
    status: 'todo',
    priority: 'media',
    projectId: 'proj1',
    assignees: [
      { id: 'user3', name: 'Andrea Verdi', avatar: '/assets/avatars/avatar3.jpg' },
      { id: 'user4', name: 'Sofia Neri', avatar: '/assets/avatars/avatar4.jpg' }
    ],
    tags: ['testing', 'ottimizzazione', 'performance'],
    completedSubtasks: 0,
    totalSubtasks: 6,
    comments: 0,
    attachments: 0,
    dependencies: ['task3', 'task4']
  },
  
  // Progetto 2: App mobile gestione ordini
  {
    id: 'task6',
    title: 'Design interfaccia app',
    description: 'Progettazione dell\'interfaccia utente per l\'app mobile di gestione ordini.',
    startDate: '2025-02-15T00:00:00.000Z',
    dueDate: '2025-02-28T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj2',
    assignees: [
      { id: 'user2', name: 'Laura Rossi', avatar: '/assets/avatars/avatar2.jpg' }
    ],
    tags: ['design', 'mobile', 'ui'],
    completedSubtasks: 6,
    totalSubtasks: 6,
    comments: 8,
    attachments: 5
  },
  {
    id: 'task7',
    title: 'Sviluppo frontend React Native',
    description: 'Implementazione delle schermate e della logica frontend in React Native.',
    startDate: '2025-03-01T00:00:00.000Z',
    dueDate: '2025-03-21T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj2',
    assignees: [
      { id: 'user3', name: 'Andrea Verdi', avatar: '/assets/avatars/avatar3.jpg' },
      { id: 'user5', name: 'Luca Gialli', avatar: '/assets/avatars/avatar5.jpg' }
    ],
    tags: ['react-native', 'mobile', 'frontend'],
    completedSubtasks: 10,
    totalSubtasks: 10,
    comments: 15,
    attachments: 4,
    dependencies: ['task6']
  },
  {
    id: 'task8',
    title: 'Integrazione API e backend',
    description: 'Integrazione delle API esistenti con l\'app mobile e sviluppo di nuovi endpoint necessari.',
    startDate: '2025-03-15T00:00:00.000Z',
    dueDate: '2025-04-05T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj2',
    assignees: [
      { id: 'user1', name: 'Marco Bianchi', avatar: '/assets/avatars/avatar1.jpg' }
    ],
    tags: ['api', 'backend', 'integrazione'],
    completedSubtasks: 8,
    totalSubtasks: 8,
    comments: 6,
    attachments: 2,
    dependencies: ['task7']
  },
  {
    id: 'task9',
    title: 'Test su diversi dispositivi',
    description: 'Testing dell\'applicazione su diversi dispositivi Android e iOS per verificare compatibilità e performance.',
    startDate: '2025-04-06T00:00:00.000Z',
    dueDate: '2025-04-15T00:00:00.000Z',
    status: 'inProgress',
    priority: 'media',
    projectId: 'proj2',
    assignees: [
      { id: 'user3', name: 'Andrea Verdi', avatar: '/assets/avatars/avatar3.jpg' },
      { id: 'user5', name: 'Luca Gialli', avatar: '/assets/avatars/avatar5.jpg' }
    ],
    tags: ['testing', 'mobile', 'qualità'],
    completedSubtasks: 4,
    totalSubtasks: 8,
    comments: 3,
    attachments: 1,
    dependencies: ['task8']
  },
  {
    id: 'task10',
    title: 'Rilascio e distribuzione',
    description: 'Preparazione degli store per il rilascio e distribuzione dell\'app sugli app store.',
    startDate: '2025-04-16T00:00:00.000Z',
    dueDate: '2025-04-30T00:00:00.000Z',
    status: 'todo',
    priority: 'alta',
    projectId: 'proj2',
    assignees: [
      { id: 'user1', name: 'Marco Bianchi', avatar: '/assets/avatars/avatar1.jpg' }
    ],
    tags: ['release', 'app-store', 'play-store'],
    completedSubtasks: 0,
    totalSubtasks: 5,
    comments: 0,
    attachments: 0,
    dependencies: ['task9']
  },
  
  // Progetto 3: Dashboard analisi vendite
  {
    id: 'task11',
    title: 'Raccolta requisiti dashboard',
    description: 'Analisi delle esigenze e definizione delle metriche da visualizzare nella dashboard.',
    startDate: '2025-04-01T00:00:00.000Z',
    dueDate: '2025-04-07T00:00:00.000Z',
    status: 'complete',
    priority: 'alta',
    projectId: 'proj3',
    assignees: [
      { id: 'user2', name: 'Laura Rossi', avatar: '/assets/avatars/avatar2.jpg' },
      { id: 'user6', name: 'Elena Blu', avatar: '/assets/avatars/avatar6.jpg' }
    ],
    tags: ['analisi', 'requisiti', 'business-intelligence'],
    completedSubtasks: 3,
    totalSubtasks: 3,
    comments: 5,
    attachments: 2
  },
  {
    id: 'task12',
    title: 'Design mockup dashboard',
    description: 'Creazione dei mockup visivi della dashboard con vari widget e visualizzazioni dati.',
    startDate: '2025-04-08T00:00:00.000Z',
    dueDate: '2025-04-15T00:00:00.000Z',
    status: 'complete',
    priority: 'media',
    projectId: 'proj3',
    assignees: [
      { id: 'user2', name: 'Laura Rossi', avatar: '/assets/avatars/avatar2.jpg' }
    ],
    tags: ['design', 'dashboard', 'mockup'],
    completedSubtasks: 5,
    totalSubtasks: 5,
    comments: 7,
    attachments: 4,
    dependencies: ['task11']
  },
  {
    id: 'task13',
    title: 'Sviluppo frontend dashboard',
    description: 'Implementazione del frontend della dashboard con componenti React e librerie di visualizzazione dati.',
    startDate: '2025-04-16T00:00:00.000Z',
    dueDate: '2025-04-30T00:00:00.000Z',
    status: 'inProgress',
    priority: 'alta',
    projectId: 'proj3',
    assignees: [
      { id: 'user4', name: 'Sofia Neri', avatar: '/assets/avatars/avatar4.jpg' }
    ],
    tags: ['frontend', 'react', 'data-visualization'],
    completedSubtasks: 2,
    totalSubtasks: 8,
    comments: 3,
    attachments: 1,
    dependencies: ['task12']
  },
  {
    id: 'task14',
    title: 'Integrazione API dati vendite',
    description: 'Collegamento con le API che forniscono i dati di vendita e implementazione del sistema di aggiornamento real-time.',
    startDate: '2025-04-20T00:00:00.000Z',
    dueDate: '2025-05-05T00:00:00.000Z',
    status: 'todo',
    priority: 'media',
    projectId: 'proj3',
    assignees: [
      { id: 'user6', name: 'Elena Blu', avatar: '/assets/avatars/avatar6.jpg' }
    ],
    tags: ['api', 'integration', 'real-time'],
    completedSubtasks: 0,
    totalSubtasks: 6,
    comments: 0,
    attachments: 0,
    dependencies: ['task13']
  },
  {
    id: 'task15',
    title: 'Implementazione filtri e export',
    description: 'Aggiunta di filtri avanzati per la selezione dei dati e funzionalità di export in vari formati (PDF, Excel, CSV).',
    startDate: '2025-05-06T00:00:00.000Z',
    dueDate: '2025-05-15T00:00:00.000Z',
    status: 'todo',
    priority: 'bassa',
    projectId: 'proj3',
    assignees: [
      { id: 'user4', name: 'Sofia Neri', avatar: '/assets/avatars/avatar4.jpg' }
    ],
    tags: ['filtri', 'export', 'funzionalità'],
    completedSubtasks: 0,
    totalSubtasks: 4,
    comments: 0,
    attachments: 0,
    dependencies: ['task14']
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'Marco Bianchi',
    email: 'marco.bianchi@example.com',
    role: 'Project Manager',
    department: 'Tech',
    avatar: '/assets/avatars/avatar1.jpg',
    phone: '+39 333 1234567',
    address: 'Via Roma 123, Milano',
    skills: ['Project Management', 'Backend Development', 'Team Leadership', 'Agile'],
    joinDate: '2023-03-15T00:00:00.000Z'
  },
  {
    id: 'user2',
    name: 'Laura Rossi',
    email: 'laura.rossi@example.com',
    role: 'UX/UI Designer',
    department: 'Design',
    avatar: '/assets/avatars/avatar2.jpg',
    phone: '+39 333 7654321',
    address: 'Via Verdi 45, Roma',
    skills: ['UI Design', 'UX Research', 'Wireframing', 'Figma', 'Adobe Creative Suite'],
    joinDate: '2023-06-20T00:00:00.000Z'
  },
  {
    id: 'user3',
    name: 'Andrea Verdi',
    email: 'andrea.verdi@example.com',
    role: 'Frontend Developer',
    department: 'Tech',
    avatar: '/assets/avatars/avatar3.jpg',
    phone: '+39 333 9876543',
    address: 'Corso Italia 78, Torino',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'React Native', 'UI Animation'],
    joinDate: '2023-08-10T00:00:00.000Z'
  },
  {
    id: 'user4',
    name: 'Sofia Neri',
    email: 'sofia.neri@example.com',
    role: 'Frontend Developer',
    department: 'Tech',
    avatar: '/assets/avatars/avatar4.jpg',
    phone: '+39 333 2468101',
    address: 'Via Mazzini 22, Bologna',
    skills: ['React', 'TypeScript', 'Data Visualization', 'Responsive Design'],
    joinDate: '2024-01-05T00:00:00.000Z'
  },
  {
    id: 'user5',
    name: 'Luca Gialli',
    email: 'luca.gialli@example.com',
    role: 'Marketing Manager',
    department: 'Marketing',
    avatar: '/assets/avatars/avatar5.jpg',
    phone: '+39 333 1357924',
    address: 'Via Dante 90, Firenze',
    skills: ['Digital Marketing', 'Branding', 'Content Strategy', 'Analytics'],
    joinDate: '2023-05-12T00:00:00.000Z'
  },
  {
    id: 'user6',
    name: 'Elena Blu',
    email: 'elena.blu@example.com',
    role: 'Backend Developer',
    department: 'Tech',
    avatar: '/assets/avatars/avatar6.jpg',
    phone: '+39 333 8642097',
    address: 'Via Garibaldi 33, Napoli',
    skills: ['Node.js', 'Python', 'Database Design', 'API Development', 'Cloud Services'],
    joinDate: '2023-11-18T00:00:00.000Z'
  }
];

export const mockDocuments = [
  {
    id: 'doc1',
    title: 'Specifiche sito web aziendale',
    content: '<h1>Specifiche sito web aziendale</h1><p>Questo documento contiene le specifiche tecniche e i requisiti per il nuovo sito web corporate.</p><h2>Obiettivi</h2><ul><li>Migliorare la user experience</li><li>Ottimizzare la conversione dei lead</li><li>Presentare i prodotti in modo efficace</li></ul><h2>Tecnologie</h2><p>Il sito sarà sviluppato utilizzando React per il frontend e Node.js per il backend, con un\'architettura headless CMS per facilitare la gestione dei contenuti.</p>',
    createdAt: '2025-03-01T09:30:00.000Z',
    createdBy: 'user1',
    lastModified: '2025-03-03T14:45:00.000Z',
    lastModifiedBy: 'user2',
    projectId: 'proj1',
    tags: ['documentazione', 'specifiche', 'website'],
    status: 'finalized'
  },
  {
    id: 'doc2',
    title: 'Wireframes e design UI sito web',
    content: '<h1>Wireframes e design UI sito web</h1><p>Questo documento contiene i wireframes e il design della UI per il nuovo sito web aziendale.</p><h2>Home Page</h2><p>La home page avrà un layout moderno con un hero banner e sezioni per presentare i servizi principali.</p><h2>Pagine di prodotto</h2><p>Le pagine di prodotto avranno un layout con immagini di alta qualità, descrizioni dettagliate e call-to-action ben visibili.</p>',
    createdAt: '2025-03-10T10:15:00.000Z',
    createdBy: 'user2',
    lastModified: '2025-03-15T16:20:00.000Z',
    lastModifiedBy: 'user2',
    projectId: 'proj1',
    tags: ['design', 'wireframe', 'ui'],
    status: 'finalized'
  },
  {
    id: 'doc3',
    title: 'Architettura app mobile',
    content: '<h1>Architettura app mobile</h1><p>Questo documento descrive l\'architettura dell\'app mobile per la gestione degli ordini.</p><h2>Stack tecnologico</h2><ul><li>React Native per lo sviluppo cross-platform</li><li>Redux per la gestione dello stato</li><li>Firebase per l\'autenticazione e il database</li></ul><h2>Flussi utente</h2><p>L\'app avrà diversi flussi utente: login, visualizzazione ordini, gestione consegne, notifiche in tempo reale.</p>',
    createdAt: '2025-02-18T11:00:00.000Z',
    createdBy: 'user1',
    lastModified: '2025-02-25T09:30:00.000Z',
    lastModifiedBy: 'user3',
    projectId: 'proj2',
    tags: ['architettura', 'mobile', 'tech-specs'],
    status: 'finalized'
  },
  {
    id: 'doc4',
    title: 'Requisiti dashboard analisi vendite',
    content: '<h1>Requisiti dashboard analisi vendite</h1><p>Questo documento contiene i requisiti funzionali e non funzionali per la dashboard di analisi delle vendite.</p><h2>Metriche chiave</h2><ul><li>Vendite totali per periodo</li><li>Vendite per categoria di prodotto</li><li>Conversione per canale di vendita</li><li>Performance per regione geografica</li></ul><h2>Visualizzazioni</h2><p>La dashboard includerà grafici a linee, istogrammi, mappe geografiche e tabelle interattive.</p>',
    createdAt: '2025-04-02T13:45:00.000Z',
    createdBy: 'user6',
    lastModified: '2025-04-06T10:20:00.000Z',
    lastModifiedBy: 'user2',
    projectId: 'proj3',
    tags: ['requisiti', 'dashboard', 'analytics'],
    status: 'draft'
  },
  {
    id: 'doc5',
    title: 'Piano di rilascio app mobile',
    content: '<h1>Piano di rilascio app mobile</h1><p>Questo documento delinea il piano di rilascio per l\'app mobile di gestione ordini.</p><h2>Timeline</h2><ul><li>Testing interno: 15-20 Aprile</li><li>Beta testing: 21-25 Aprile</li><li>Preparazione store: 26-28 Aprile</li><li>Rilascio ufficiale: 30 Aprile</li></ul><h2>Strategie di lancio</h2><p>Il lancio sarà supportato da comunicazioni interne, email marketing ai clienti esistenti e una campagna sui social media.</p>',
    createdAt: '2025-04-10T15:30:00.000Z',
    createdBy: 'user1',
    lastModified: '2025-04-10T15:30:00.000Z',
    lastModifiedBy: 'user1',
    projectId: 'proj2',
    tags: ['rilascio', 'pianificazione', 'mobile'],
    status: 'draft'
  }
];

export const mockNotifications = [
  {
    id: 'notif1',
    title: 'Task assegnato',
    message: 'Sei stato assegnato al task "Sviluppo frontend dashboard"',
    timestamp: '2025-04-16T09:15:00.000Z',
    read: false,
    type: 'task_assigned',
    link: '/tasks/task13',
    userId: 'user4'
  },
  {
    id: 'notif2',
    title: 'Commento aggiunto',
    message: 'Marco Bianchi ha commentato sul task "Sviluppo frontend"',
    timestamp: '2025-04-15T14:30:00.000Z',
    read: false,
    type: 'comment_added',
    link: '/tasks/task3',
    userId: 'user3'
  },
  {
    id: 'notif3',
    title: 'Scadenza imminente',
    message: 'Il task "Test su diversi dispositivi" scade tra 2 giorni',
    timestamp: '2025-04-13T08:00:00.000Z',
    read: true,
    type: 'deadline_approaching',
    link: '/tasks/task9',
    userId: 'user3'
  },
  {
    id: 'notif4',
    title: 'Documento aggiornato',
    message: 'Laura Rossi ha aggiornato il documento "Requisiti dashboard analisi vendite"',
    timestamp: '2025-04-06T10:20:00.000Z',
    read: true,
    type: 'document_updated',
    link: '/documents/doc4',
    userId: 'user6'
  },
  {
    id: 'notif5',
    title: 'Nuovo progetto',
    message: 'Sei stato aggiunto al progetto "Dashboard analisi vendite"',
    timestamp: '2025-04-01T13:45:00.000Z',
    read: true,
    type: 'project_assigned',
    link: '/projects/proj3',
    userId: 'user6'
  }
];