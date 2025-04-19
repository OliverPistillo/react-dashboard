// src/constants/status.js
/**
 * Stati delle task
 */
export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    REVIEW: 'review',
    COMPLETE: 'complete'
  };
  
  /**
   * Etichette leggibili degli stati task
   */
  export const TASK_STATUS_LABELS = {
    [TASK_STATUS.TODO]: 'Da fare',
    [TASK_STATUS.IN_PROGRESS]: 'In corso',
    [TASK_STATUS.REVIEW]: 'In revisione',
    [TASK_STATUS.COMPLETE]: 'Completato'
  };
  
  /**
   * Colori associati agli stati task
   */
  export const TASK_STATUS_COLORS = {
    [TASK_STATUS.TODO]: 'default',
    [TASK_STATUS.IN_PROGRESS]: 'primary',
    [TASK_STATUS.REVIEW]: 'warning',
    [TASK_STATUS.COMPLETE]: 'success'
  };
  
  /**
   * Stati dei progetti
   */
  export const PROJECT_STATUS = {
    PLANNING: 'planning',
    ACTIVE: 'active',
    ON_HOLD: 'onHold',
    COMPLETE: 'complete'
  };
  
  /**
   * Etichette leggibili degli stati progetto
   */
  export const PROJECT_STATUS_LABELS = {
    [PROJECT_STATUS.PLANNING]: 'In pianificazione',
    [PROJECT_STATUS.ACTIVE]: 'Attivo',
    [PROJECT_STATUS.ON_HOLD]: 'In attesa',
    [PROJECT_STATUS.COMPLETE]: 'Completato'
  };
  
  /**
   * Colori associati agli stati progetto
   */
  export const PROJECT_STATUS_COLORS = {
    [PROJECT_STATUS.PLANNING]: 'info',
    [PROJECT_STATUS.ACTIVE]: 'primary',
    [PROJECT_STATUS.ON_HOLD]: 'warning',
    [PROJECT_STATUS.COMPLETE]: 'success'
  };
  
  /**
   * Livelli di priorità
   */
  export const PRIORITY = {
    LOW: 'bassa',
    MEDIUM: 'media',
    HIGH: 'alta'
  };
  
  /**
   * Etichette leggibili delle priorità
   */
  export const PRIORITY_LABELS = {
    [PRIORITY.LOW]: 'Bassa',
    [PRIORITY.MEDIUM]: 'Media',
    [PRIORITY.HIGH]: 'Alta'
  };
  
  /**
   * Colori associati alle priorità
   */
  export const PRIORITY_COLORS = {
    [PRIORITY.LOW]: 'success',
    [PRIORITY.MEDIUM]: 'warning',
    [PRIORITY.HIGH]: 'error'
  };
  
  /**
   * Stati dei documenti
   */
  export const DOCUMENT_STATUS = {
    DRAFT: 'draft',
    REVIEW: 'review',
    FINALIZED: 'finalized'
  };
  
  /**
   * Etichette leggibili degli stati documento
   */
  export const DOCUMENT_STATUS_LABELS = {
    [DOCUMENT_STATUS.DRAFT]: 'Bozza',
    [DOCUMENT_STATUS.REVIEW]: 'In revisione',
    [DOCUMENT_STATUS.FINALIZED]: 'Finalizzato'
  };
  
  /**
   * Colori associati agli stati documento
   */
  export const DOCUMENT_STATUS_COLORS = {
    [DOCUMENT_STATUS.DRAFT]: 'default',
    [DOCUMENT_STATUS.REVIEW]: 'warning',
    [DOCUMENT_STATUS.FINALIZED]: 'success'
  };