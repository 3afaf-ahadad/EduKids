// src/mockData.js

// Enfant fictif pour Modules.jsx
export const mockChild = {
  id: 1,
  name: 'Léo',
  age: 4,
};

// Progression fictive pour Modules.jsx
export const mockProgress = {
  alphabet_completed: 4,
  alphabet_total: 26,
  alphabet_percentage: 15,
  numbers_completed: 2,
  numbers_total: 10,
  numbers_percentage: 20,
  colors_completed: 0,
  colors_total: 8,
  colors_percentage: 0,
};

// Alphabet (26 lettres) avec image (emoji)
export const mockLetters = [
  { id: 1, letter_uppercase: 'A', example_word: 'Apple', image: '🍎', sound_url: '' },
  { id: 2, letter_uppercase: 'B', example_word: 'Ballon', image: '🎈', sound_url: '' },
  { id: 3, letter_uppercase: 'C', example_word: 'Chat', image: '🐱', sound_url: '' },
  { id: 4, letter_uppercase: 'D', example_word: 'Dragon', image: '🐉', sound_url: '' },
  { id: 5, letter_uppercase: 'E', example_word: 'Éléphant', image: '🐘', sound_url: '' },
  { id: 6, letter_uppercase: 'F', example_word: 'Fleur', image: '🌻', sound_url: '' },
  { id: 7, letter_uppercase: 'G', example_word: 'Girafe', image: '🦒', sound_url: '' },
  { id: 8, letter_uppercase: 'H', example_word: 'Hibou', image: '🦉', sound_url: '' },
  { id: 9, letter_uppercase: 'I', example_word: 'Igloo', image: '⛄', sound_url: '' },
  { id: 10, letter_uppercase: 'J', example_word: 'Jardin', image: '🌷', sound_url: '' },
  { id: 11, letter_uppercase: 'K', example_word: 'Koala', image: '🐨', sound_url: '' },
  { id: 12, letter_uppercase: 'L', example_word: 'Lion', image: '🦁', sound_url: '' },
  { id: 13, letter_uppercase: 'M', example_word: 'Maison', image: '🏠', sound_url: '' },
  { id: 14, letter_uppercase: 'N', example_word: 'Nuage', image: '☁️', sound_url: '' },
  { id: 15, letter_uppercase: 'O', example_word: 'Ours', image: '🐻', sound_url: '' },
  { id: 16, letter_uppercase: 'P', example_word: 'Panda', image: '🐼', sound_url: '' },
  { id: 17, letter_uppercase: 'Q', example_word: 'Quille', image: '🎳', sound_url: '' },
  { id: 18, letter_uppercase: 'R', example_word: 'Raton', image: '🦝', sound_url: '' },
  { id: 19, letter_uppercase: 'S', example_word: 'Soleil', image: '☀️', sound_url: '' },
  { id: 20, letter_uppercase: 'T', example_word: 'Tigre', image: '🐯', sound_url: '' },
  { id: 21, letter_uppercase: 'U', example_word: 'Usine', image: '🏭', sound_url: '' },
  { id: 22, letter_uppercase: 'V', example_word: 'Voiture', image: '🚗', sound_url: '' },
  { id: 23, letter_uppercase: 'W', example_word: 'Wagon', image: '🚂', sound_url: '' },
  { id: 24, letter_uppercase: 'X', example_word: 'Xylophone', image: '🎹', sound_url: '' },
  { id: 25, letter_uppercase: 'Y', example_word: 'Yacht', image: '⛵', sound_url: '' },
  { id: 26, letter_uppercase: 'Z', example_word: 'Zèbre', image: '🦓', sound_url: '' },
];

// Nombres 1 à 10 avec image (quantité)
export const mockNumbers = [
  { id: 1, value: 1, word: 'un', image: '🍎', sound_url: '' },
  { id: 2, value: 2, word: 'deux', image: '🍎🍎', sound_url: '' },
  { id: 3, value: 3, word: 'trois', image: '🍎🍎🍎', sound_url: '' },
  { id: 4, value: 4, word: 'quatre', image: '🍎🍎🍎🍎', sound_url: '' },
  { id: 5, value: 5, word: 'cinq', image: '🍎🍎🍎🍎🍎', sound_url: '' },
  { id: 6, value: 6, word: 'six', image: '🍎🍎🍎🍎🍎🍎', sound_url: '' },
  { id: 7, value: 7, word: 'sept', image: '🍎🍎🍎🍎🍎🍎🍎', sound_url: '' },
  { id: 8, value: 8, word: 'huit', image: '🍎🍎🍎🍎🍎🍎🍎🍎', sound_url: '' },
  { id: 9, value: 9, word: 'neuf', image: '🍎🍎🍎🍎🍎🍎🍎🍎🍎', sound_url: '' },
  { id: 10, value: 10, word: 'dix', image: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎', sound_url: '' },
];

// Couleurs (8) avec image
export const mockColors = [
  { id: 1, name: 'Rouge', hex_code: '#EF4444', example_word: 'Tomate', image: '🍅', sound_url: '' },
  { id: 2, name: 'Bleu', hex_code: '#3B82F6', example_word: 'Mer', image: '🌊', sound_url: '' },
  { id: 3, name: 'Jaune', hex_code: '#FACC15', example_word: 'Soleil', image: '☀️', sound_url: '' },
  { id: 4, name: 'Vert', hex_code: '#22C55E', example_word: 'Arbre', image: '🌳', sound_url: '' },
  { id: 5, name: 'Orange', hex_code: '#F97316', example_word: 'Carotte', image: '🥕', sound_url: '' },
  { id: 6, name: 'Violet', hex_code: '#A855F7', example_word: 'Fleur', image: '🌸', sound_url: '' },
  { id: 7, name: 'Rose', hex_code: '#EC4899', example_word: 'Glace', image: '🍦', sound_url: '' },
  { id: 8, name: 'Marron', hex_code: '#854D0E', example_word: 'Biscuit', image: '🍪', sound_url: '' },
];

// Progressions individuelles (pour afficher ✓)
export const mockCompletedAlphabetIds = { 1: true, 2: true, 3: true };
export const mockCompletedNumberIds = { 1: true, 2: true, 3: true };
export const mockCompletedColorIds = { 1: true, 2: true };

// Enfants fictifs pour le tableau de bord (Dashboard)
export const mockChildren = [
  { id: 1, name: 'Léo', age: 4, theme: 'neutre' },
  { id: 2, name: 'Mia', age: 6, theme: 'neutre' },
];

export const mockChildrenProgress = {
  1: {
    alphabet_completed: 4, alphabet_total: 26, alphabet_percentage: 15,
    numbers_completed: 2, numbers_total: 10, numbers_percentage: 20,
    colors_completed: 0, colors_total: 8, colors_percentage: 0,
  },
  2: {
    alphabet_completed: 26, alphabet_total: 26, alphabet_percentage: 100,
    numbers_completed: 8, numbers_total: 10, numbers_percentage: 80,
    colors_completed: 4, colors_total: 8, colors_percentage: 50,
  },
};