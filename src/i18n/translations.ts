import { Language } from '../types';

type TranslationKeys = {
  'app.title': string;
  'rewards.title': string;
  'rewards.points': string;
  'category.all': string;
  'category.fitness': string;
  'category.wellness': string;
  'category.adventure': string;
  'category.sports': string;
  'booking.title': string;
  'booking.selectDateTime': string;
  'booking.confirm': string;
  'booking.cancel': string;
  'service.slots': string;
  'service.points': string;
  'service.bookNow': string;
  'search.placeholder': string;
};

type Translations = {
  [key in Language]: TranslationKeys;
};

export const translations: Translations = {
  en: {
    'app.title': 'Book Your Next Adventure',
    'rewards.title': 'Your Rewards',
    'rewards.points': 'points',
    'category.all': 'all',
    'category.fitness': 'fitness',
    'category.wellness': 'wellness',
    'category.adventure': 'adventure',
    'category.sports': 'sports',
    'booking.title': 'Book',
    'booking.selectDateTime': 'Select Date and Time',
    'booking.confirm': 'Confirm Booking',
    'booking.cancel': 'Cancel',
    'service.slots': 'slots',
    'service.points': 'points',
    'service.bookNow': 'Book Now',
    'search.placeholder': 'Search services, locations, or activities...',
  },
  it: {
    'app.title': 'Prenota La Tua Prossima Avventura',
    'rewards.title': 'I Tuoi Premi',
    'rewards.points': 'punti',
    'category.all': 'tutti',
    'category.fitness': 'fitness',
    'category.wellness': 'benessere',
    'category.adventure': 'avventura',
    'category.sports': 'sport',
    'booking.title': 'Prenota',
    'booking.selectDateTime': 'Seleziona Data e Ora',
    'booking.confirm': 'Conferma Prenotazione',
    'booking.cancel': 'Annulla',
    'service.slots': 'posti',
    'service.points': 'punti',
    'service.bookNow': 'Prenota Ora',
    'search.placeholder': 'Cerca servizi, luoghi o attività...',
  },
  de: {
    'app.title': 'Buche Dein Nächstes Abenteuer',
    'rewards.title': 'Deine Belohnungen',
    'rewards.points': 'punkte',
    'category.all': 'alle',
    'category.fitness': 'fitness',
    'category.wellness': 'wellness',
    'category.adventure': 'abenteuer',
    'category.sports': 'sport',
    'booking.title': 'Buchen',
    'booking.selectDateTime': 'Datum und Uhrzeit auswählen',
    'booking.confirm': 'Buchung bestätigen',
    'booking.cancel': 'Abbrechen',
    'service.slots': 'plätze',
    'service.points': 'punkte',
    'service.bookNow': 'Jetzt Buchen',
    'search.placeholder': 'Suche nach Dienstleistungen, Orten oder Aktivitäten...',
  },
  fr: {
    'app.title': 'Réservez Votre Prochaine Aventure',
    'rewards.title': 'Vos Récompenses',
    'rewards.points': 'points',
    'category.all': 'tout',
    'category.fitness': 'fitness',
    'category.wellness': 'bien-être',
    'category.adventure': 'aventure',
    'category.sports': 'sports',
    'booking.title': 'Réserver',
    'booking.selectDateTime': 'Sélectionner la Date et l\'Heure',
    'booking.confirm': 'Confirmer la Réservation',
    'booking.cancel': 'Annuler',
    'service.slots': 'places',
    'service.points': 'points',
    'service.bookNow': 'Réserver',
    'search.placeholder': 'Rechercher des services, lieux ou activités...',
  },
  es: {
    'app.title': 'Reserva Tu Próxima Aventura',
    'rewards.title': 'Tus Recompensas',
    'rewards.points': 'puntos',
    'category.all': 'todos',
    'category.fitness': 'fitness',
    'category.wellness': 'bienestar',
    'category.adventure': 'aventura',
    'category.sports': 'deportes',
    'booking.title': 'Reservar',
    'booking.selectDateTime': 'Seleccionar Fecha y Hora',
    'booking.confirm': 'Confirmar Reserva',
    'booking.cancel': 'Cancelar',
    'service.slots': 'plazas',
    'service.points': 'puntos',
    'service.bookNow': 'Reservar Ahora',
    'search.placeholder': 'Buscar servicios, ubicaciones o actividades...',
  },
};