# Edu AI Frontend

## Description

**Edu AI** est une application web interactive permettant aux utilisateurs de s'entraîner sur des exercices personnalisés en fonction de thématiques et de types d'exercices sélectionnés. L'application offre une interface utilisateur intuitive pour sélectionner des thématiques, répondre à des questions, et consulter des rapports détaillés sur les performances.

Ce projet est développé en React avec TypeScript. Il communique avec une API backend pour récupérer les données des exercices, soumettre les réponses, et générer des rapports.

---

## Fonctionnalités

- Sélection de thématiques et de types d'exercices.
- Génération d'exercices personnalisés.
- Navigation fluide entre les pages (React Router).
- Soumission des réponses et génération de rapports détaillés.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## Installation

1. Clonez le dépôt du projet :

   ```bash
   git clone https://github.com/lucgmensah/edu_ia-front.git
   cd edu_ia-front
   ```

2. Installez les dépendances du projet :

   ```bash
   npm install
   ```

## Configuration
Assurez-vous que l'API backend est en cours d'exécution et accessible.

Vérifiez que l'URL de base de l'API est correctement configurée dans le fichier axios.tsx :
```typescript
const baseUrl = 'http://localhost:8000/';
```
Modifiez cette URL si nécessaire pour correspondre à l'adresse de votre backend.

## Lancement
Pour démarrer l'application en mode développement, exécutez :

```bash
npm start
```