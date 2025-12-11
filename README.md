# 🏛️ Louvre Metaverse 2077

> Musée virtuel immersif du Louvre en 2077 - Une expérience cyberpunk utilisant Three.js

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square&logo=github)](https://adoudi-mondher.github.io/louvre-metaverse-2077/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## ✨ Fonctionnalités

- 🎨 **Navigation 3D immersive** - Explorez le musée en vue première personne
- 🏛️ **Salles thématiques** - Salle Renaissance et Antiquités Égyptiennes
- 🎮 **Menu burger cyberpunk** - Navigation fluide entre les salles avec effets glitch
- ⚡ **Téléportation instantanée** - Changement de salle avec transition glitch (700ms)
- 🖼️ **Œuvres authentiques** - 12 chefs-d'œuvre du Louvre avec informations détaillées
- 🌟 **Effets visuels cyberpunk** - Particules flottantes, néons, scanlines, animations glitch
- 📍 **Minimap en temps réel** - Visualisez votre position et les œuvres
- 💫 **Interface futuriste** - Design inspiré de l'esthétique cyberpunk 2077

## 🎮 Contrôles

| Touche | Action |
|--------|--------|
| **↑ ↓ ← →** | Se déplacer |
| **Souris** | Regarder autour (rotation 360°) |
| **Clic** | Déverrouiller la vue |
| **ESC** | Verrouiller la vue |
| **Menu burger** | Changer de salle |

## 🚀 Installation

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge)
- Un serveur local (Live Server, http-server, etc.)

### Lancement

1. Clonez le dépôt :
```bash
git clone https://github.com/VOTRE_USERNAME/louvre-metaverse-2077.git
cd louvre-metaverse-2077
```

2. Lancez un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx http-server

# Avec Live Server (VS Code extension)
# Clic droit sur index.html → Open with Live Server
```

3. Ouvrez votre navigateur à `http://localhost:8000`

## 🏛️ Salles disponibles

### Salle Renaissance
Ambiance futuriste avec néons cyan/magenta
- La Joconde (Léonard de Vinci)
- La Liberté guidant le peuple (Eugène Delacroix)
- Les Noces de Cana (Paolo Veronese)
- La Victoire de Samothrace
- Le Radeau de la Méduse (Théodore Géricault)
- La Vénus de Milo

### Antiquités Égyptiennes
Ambiance dorée avec thème or/bleu électrique
- Masque de Toutânkhamon
- Buste de Néfertiti
- Pierre de Rosette
- Statue de Ramsès II
- Statue d'Anubis
- Scarabée sacré

## 🎨 Technologies

- **Three.js r128** - Moteur 3D WebGL
- **JavaScript ES6** - Logique applicative
- **CSS3** - Animations et effets visuels
- **HTML5** - Structure de la page

## 🛠️ Structure du projet

```
louvre-metaverse-2077/
├── index.html          # Page principale
├── app.js             # Logique Three.js et navigation
├── styles.css         # Styles et animations cyberpunk
├── assets/            # Images des œuvres
│   ├── Mona_Lisa.jpg
│   ├── Liberté.jpg
│   ├── tutankhamun.jpg
│   └── ...
└── README.md
```

## 🎯 Prochaines fonctionnalités

- [ ] Zoom sur les œuvres au clic
- [ ] Panneaux d'information enrichis
- [ ] Audio ambiance par salle
- [ ] Effets holographiques sur œuvres sélectionnées
- [ ] Mode VR
- [ ] Nouvelles salles (Art Moderne, Sculptures, etc.)

## 📝 License

MIT © 2024

## 👨‍💻 Auteur

Projet réalisé dans le cadre d'une exploration des technologies WebGL et Three.js.

---

<p align="center">
  <strong>🤖 Année 2077 - Visite Virtuelle Immersive</strong>
</p>
