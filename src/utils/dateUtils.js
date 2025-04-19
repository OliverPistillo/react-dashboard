// src/utils/dateUtils.js
import { format, parseISO, isValid, differenceInDays, addDays, isAfter, isBefore, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';

/**
 * Formatta una data nel formato specificato
 * @param {Date|string} date - La data da formattare
 * @param {string} formatString - Il formato desiderato
 * @returns {string} La data formattata
 */
export const formatDate = (date, formatString = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  // Se la data è una stringa, la convertiamo in oggetto Date
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  // Verifichiamo che la data sia valida
  if (!isValid(dateObj)) return 'Data non valida';
  
  return format(dateObj, formatString, { locale: it });
};

/**
 * Formatta una data e ora nel formato specificato
 * @param {Date|string} date - La data da formattare
 * @param {string} formatString - Il formato desiderato
 * @returns {string} La data e ora formattate
 */
export const formatDateTime = (date, formatString = 'dd/MM/yyyy HH:mm') => {
  return formatDate(date, formatString);
};

/**
 * Calcola il tempo rimanente fino a una data
 * @param {Date|string} date - La data di scadenza
 * @returns {Object} Oggetto con informazioni sul tempo rimanente
 */
export const getTimeRemaining = (date) => {
  if (!date) return { expired: true, urgent: false, daysLeft: 0, text: 'Nessuna scadenza' };
  
  // Se la data è una stringa, la convertiamo in oggetto Date
  const dueDate = typeof date === 'string' ? parseISO(date) : date;
  
  // Verifichiamo che la data sia valida
  if (!isValid(dueDate)) return { expired: false, urgent: false, daysLeft: 0, text: 'Data non valida' };
  
  const today = new Date();
  const daysLeft = differenceInDays(dueDate, today);
  
  // Se la data è passata
  if (isBefore(dueDate, today) && !isSameDay(dueDate, today)) {
    return { expired: true, urgent: false, daysLeft, text: `Scaduto il ${formatDate(dueDate)}` };
  }
  
  // Se la data è oggi
  if (isSameDay(dueDate, today)) {
    return { expired: false, urgent: true, daysLeft: 0, text: 'Scade oggi' };
  }
  
  // Se manca poco alla scadenza (3 giorni o meno)
  if (daysLeft <= 3) {
    return { expired: false, urgent: true, daysLeft, text: `Scade tra ${daysLeft} giorn${daysLeft === 1 ? 'o' : 'i'}` };
  }
  
  // Se manca una settimana o meno
  if (daysLeft <= 7) {
    return { expired: false, urgent: true, daysLeft, text: `Scade tra ${daysLeft} giorni` };
  }
  
  // Altrimenti
  return { expired: false, urgent: false, daysLeft, text: `Scade il ${formatDate(dueDate)}` };
};

/**
 * Aggiunge un numero di giorni a una data
 * @param {Date|string} date - La data di partenza
 * @param {number} days - Il numero di giorni da aggiungere
 * @returns {Date} La nuova data
 */
export const addDaysToDate = (date, days) => {
  if (!date) return null;
  
  // Se la data è una stringa, la convertiamo in oggetto Date
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  // Verifichiamo che la data sia valida
  if (!isValid(dateObj)) return null;
  
  return addDays(dateObj, days);
};

// src/utils/formatters.js
/**
 * Formatta un valore di valuta
 * @param {number} value - Il valore da formattare
 * @param {string} currency - La valuta (EUR, USD, ecc.)
 * @returns {string} Il valore formattato
 */
export const formatCurrency = (value, currency = 'EUR') => {
  if (value == null) return '';
  
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency
  }).format(value);
};

/**
 * Formatta un numero con separatore di migliaia
 * @param {number} value - Il valore da formattare
 * @param {number} decimals - Il numero di decimali
 * @returns {string} Il valore formattato
 */
export const formatNumber = (value, decimals = 0) => {
  if (value == null) return '';
  
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Formatta una percentuale
 * @param {number} value - Il valore da formattare (0-100)
 * @param {number} decimals - Il numero di decimali
 * @returns {string} Il valore formattato
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value == null) return '';
  
  return new Intl.NumberFormat('it-IT', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

/**
 * Tronca un testo alla lunghezza specificata
 * @param {string} text - Il testo da troncare
 * @param {number} maxLength - La lunghezza massima
 * @returns {string} Il testo troncato
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};