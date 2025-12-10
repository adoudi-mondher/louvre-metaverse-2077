// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f7);
scene.fog = new THREE.Fog(0xf5f5f7, 10, 70);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting - ambiance futuriste
const ambientLight = new THREE.AmbientLight(0x4a5d8f, 0.4);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
mainLight.position.set(0, 10, 5);
mainLight.castShadow = true;
scene.add(mainLight);

// Les lumières d'accentuation sont créées dynamiquement par loadRoom() selon le thème de chaque salle

// Floor
const floorGeometry = new THREE.PlaneGeometry(50, 50, 50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a2e,
    roughness: 0.3,
    metalness: 0.7,
    emissive: 0x0a0a1a,
    emissiveIntensity: 0.3
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const gridHelper = new THREE.GridHelper(50, 50, 0x00ffff, 0x004466);
gridHelper.position.y = 0.01;
gridHelper.material.opacity = 0.3;
gridHelper.material.transparent = true;
scene.add(gridHelper);

// Ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0f0f1f,
    roughness: 0.5,
    metalness: 0.8,
    emissive: 0x1a1a3a,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 10;
scene.add(ceiling);

// Ceiling panels
for (let i = 0; i < 5; i++) {
    const panelGeo = new THREE.PlaneGeometry(3, 3);
    const panelMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x88ccff,
        emissiveIntensity: 0.8,
        side: THREE.DoubleSide
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set((i - 2) * 10, 9.9, 0);
    panel.rotation.x = Math.PI / 2;
    scene.add(panel);
}

// Walls
const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a2e,
    roughness: 0.4,
    metalness: 0.6,
    emissive: 0x0d0d1a,
    emissiveIntensity: 0.2
});

const wall1 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 0.5), wallMaterial);
wall1.position.set(0, 5, -25);
wall1.receiveShadow = true;
wall1.castShadow = true;
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 10, 50), wallMaterial);
wall2.position.set(-25, 5, 0);
wall2.receiveShadow = true;
wall2.castShadow = true;
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 10, 50), wallMaterial);
wall3.position.set(25, 5, 0);
wall3.receiveShadow = true;
wall3.castShadow = true;
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 0.5), wallMaterial);
wall4.position.set(0, 5, 25);
wall4.receiveShadow = true;
wall4.castShadow = true;
scene.add(wall4);

// Neon strips
function addNeonStrips(wall, isVertical) {
    const stripMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 2
    });
    
    if (isVertical) {
        for (let i = 0; i < 5; i++) {
            const strip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 9, 0.2), stripMaterial);
            strip.position.set((i - 2) * 10, 0, 0.35);
            wall.add(strip);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            const strip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 9, 0.1), stripMaterial);
            strip.position.set(0.35, 0, (i - 2) * 10);
            wall.add(strip);
        }
    }
}

addNeonStrips(wall1, false);
addNeonStrips(wall2, true);
addNeonStrips(wall3, true);
addNeonStrips(wall4, false);

// Holographic columns
for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const radius = 18;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    const columnGeo = new THREE.CylinderGeometry(0.3, 0.3, 10, 8);
    const columnMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
        metalness: 1,
        roughness: 0
    });
    const column = new THREE.Mesh(columnGeo, columnMat);
    column.position.set(x, 5, z);
    scene.add(column);
}

// Floating particles
const particleCount = 200;
const particlesGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 50;
    particlePositions[i + 1] = Math.random() * 10;
    particlePositions[i + 2] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.1,
    transparent: true,
    opacity: 0.6
});

const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);

// ========== CONFIGURATION DES SALLES ==========

// Structure de données pour toutes les salles du musée
const roomsData = {
    // Salle Renaissance (salle actuelle existante)
    renaissance: {
        name: "Salle Renaissance",
        theme: {
            // Couleurs d'ambiance
            background: 0xf5f5f7,
            fog: 0xf5f5f7,
            // Matériaux de la salle
            floor: { color: 0x1a1a2e, emissive: 0x0a0a1a },
            ceiling: { color: 0x0f0f1f, emissive: 0x1a1a3a },
            walls: { color: 0x1a1a2e, emissive: 0x0d0d1a },
            // Lumières d'accentuation (couleurs néon)
            lights: [
                { color: 0x00ffff, position: { x: -20, y: 6, z: -20 } },
                { color: 0xff00ff, position: { x: 20, y: 6, z: -20 } },
                { color: 0x00ff88, position: { x: 0, y: 6, z: 20 } }
            ],
            // Couleurs des particules flottantes
            particles: { color: 0x00ffff, alternateColor: null }
        },
        // Œuvres de la salle Renaissance
        artworks: [
            {
                title: "La Joconde",
                artist: "Léonard de Vinci (1503-1519)",
                description: "Le portrait le plus célèbre au monde, symbole de la Renaissance italienne.",
                position: { x: 0, y: 5, z: -24.5 },
                color: 0x8b7355,
                imageUrl: "assets/Mona_Lisa.jpg"
            },
            {
                title: "La Liberté guidant le peuple",
                artist: "Eugène Delacroix (1830)",
                description: "Allégorie de la Révolution de 1830, icône du romantisme français.",
                position: { x: -15, y: 5, z: -24.5 },
                color: 0x4a5568,
                imageUrl: "assets/Liberté.jpg"
            },
            {
                title: "Les Noces de Cana",
                artist: "Paolo Veronese (1563)",
                description: "Immense toile représentant le premier miracle du Christ.",
                position: { x: 15, y: 5, z: -24.5 },
                color: 0x6b4423,
                imageUrl: "assets/Noces.jpg"
            },
            {
                title: "La Victoire de Samothrace",
                artist: "Sculpteur inconnu (IIe siècle av. J.-C.)",
                description: "Sculpture grecque représentant la déesse de la Victoire.",
                position: { x: -24.5, y: 5, z: -10 },
                color: 0xe8e8e8,
                imageUrl: "assets/Victoire.jpg"
            },
            {
                title: "Le Radeau de la Méduse",
                artist: "Théodore Géricault (1818-1819)",
                description: "Œuvre monumentale dénonçant un naufrage tragique.",
                position: { x: 24.5, y: 5, z: -10 },
                color: 0x3d2b1f,
                imageUrl: "assets/Radeau.jpg"
            },
            {
                title: "La Vénus de Milo",
                artist: "Sculpteur inconnu (vers 130-100 av. J.-C.)",
                description: "Célèbre sculpture grecque incarnant la beauté idéale.",
                position: { x: -24.5, y: 5, z: 10 },
                color: 0xf5f5dc,
                imageUrl: "assets/Venus_Millo.png"
            }
        ]
    },

    // Nouvelle salle : Antiquités Égyptiennes
    egypt: {
        name: "Antiquités Égyptiennes",
        theme: {
            // Ambiance dorée/bleu électrique pour l'Égypte
            background: 0x1a1410,
            fog: 0x1a1410,
            // Matériaux avec teinte dorée
            floor: { color: 0x2a1f0e, emissive: 0x1a1005 },
            ceiling: { color: 0x1f1808, emissive: 0x2a1f0a },
            walls: { color: 0x2a1f0e, emissive: 0x1a1005 },
            // Lumières or/bleu alternées (thème Égypte cyberpunk)
            lights: [
                { color: 0xFFD700, position: { x: -20, y: 6, z: -20 } }, // Or
                { color: 0x0080FF, position: { x: 20, y: 6, z: -20 } },  // Bleu électrique
                { color: 0xFFD700, position: { x: 0, y: 6, z: 20 } }     // Or
            ],
            // Particules hiéroglyphes (or + bleu alternés)
            particles: { color: 0xFFD700, alternateColor: 0x0080FF }
        },
        // Œuvres égyptiennes (6 œuvres majeures)
        artworks: [
            {
                title: "Masque de Toutânkhamon",
                artist: "Artisan inconnu (vers 1323 av. J.-C.)",
                description: "Masque funéraire en or massif du pharaon Toutânkhamon, symbole de l'Égypte ancienne.",
                position: { x: 0, y: 5, z: -24.5 },
                color: 0xFFD700,
                imageUrl: "assets/tutankhamun.jpg" 
            },
            {
                title: "Buste de Néfertiti",
                artist: "Thoutmôsis (vers 1345 av. J.-C.)",
                description: "Portrait emblématique de la reine Néfertiti, incarnation de la beauté égyptienne.",
                position: { x: -15, y: 5, z: -24.5 },
                color: 0xD4AF37,
                imageUrl: "assets/nefertiti.jpg" 
            },
            {
                title: "Pierre de Rosette",
                artist: "Scribes de Ptolémée V (196 av. J.-C.)",
                description: "Stèle qui a permis le déchiffrement des hiéroglyphes égyptiens.",
                position: { x: 15, y: 5, z: -24.5 },
                color: 0x4a4a4a,
                imageUrl: "assets/rosetta.jpg" 
            },
            {
                title: "Ramsès II",
                artist: "Statue de Ramsès II assis, coiffé du khépresh",
                description: "Ramsès II, né aux alentours de 1304 / 1301 av. J.-C. et mort à Pi-Ramsès vers 1213 av. J.-C., est le troisième pharaon de la XIXe dynastie égyptienne, au Nouvel Empire. Il est aussi appelé « Ramsès le Grand » ou encore « Ozymandias ».",
                position: { x: -24.5, y: 5, z: -10 },
                color: 0xB8860B,
                imageUrl: "assets/sarcophage.jpg" 
            },
            {
                title: "Statue d'Anubis",
                artist: "Sculpteur inconnu (Nouvel Empire)",
                description: "Représentation du dieu chacal gardien des nécropoles.",
                position: { x: 24.5, y: 5, z: -10 },
                color: 0x1a1a1a,
                imageUrl: "assets/anubis.jpg"
            },
            {
                title: "Scarabée sacré",
                artist: "Orfèvre royal (Moyen Empire)",
                description: "Amulette symbolisant la renaissance et le cycle solaire.",
                position: { x: -24.5, y: 5, z: 10 },
                color: 0x00CED1,
                imageUrl: "assets/scarabee.jpg"
            }
        ]
    }
};

// Variable globale pour stocker la salle actuelle
let currentRoom = 'renaissance';

// Create artworks
const artworkObjects = [];
const textureLoader = new THREE.TextureLoader();

function createArtwork(artwork, index) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(4.2, 5.2, 0.2);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    frame.receiveShadow = true;
    
    // Border
    const borderGeo = new THREE.BoxGeometry(4.3, 5.3, 0.05);
    const borderMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 1.5
    });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.position.z = -0.13;
    frame.add(border);
    
    const paintingGeometry = new THREE.PlaneGeometry(3.8, 4.8);
    
    // Default material with color
    const paintingMaterial = new THREE.MeshStandardMaterial({ 
        color: artwork.color || 0x888888,
        roughness: 0.8,
        metalness: 0.1
    });
    
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    
    // Load texture asynchronously
    if (artwork.imageUrl) {
        textureLoader.load(
            artwork.imageUrl,
            (texture) => {
                painting.material.map = texture;
                painting.material.needsUpdate = true;
            }
        );
    }
    
    frame.position.set(artwork.position.x, artwork.position.y, artwork.position.z);
    
    // Position painting based on wall orientation
    if (Math.abs(artwork.position.z) > 20) {
        if (artwork.position.z < 0) {
            painting.position.z = 0.11;
        } else {
            painting.position.z = -0.11;
            frame.rotation.y = Math.PI;
        }
    } else if (artwork.position.x < 0) {
        frame.rotation.y = Math.PI / 2;
        painting.position.z = 0.11;
    } else {
        frame.rotation.y = -Math.PI / 2;
        painting.position.z = 0.11;
    }
    
    frame.add(painting);
    scene.add(frame);

    // Spotlight
    const artLight = new THREE.SpotLight(0xffffff, 1.5);
    artLight.position.copy(frame.position);
    artLight.position.y += 4;
    artLight.target = frame;
    artLight.angle = Math.PI / 8;
    artLight.penumbra = 0.3;
    artLight.castShadow = true;
    scene.add(artLight);

    // Halo
    const haloGeo = new THREE.PlaneGeometry(5, 6);
    const haloMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.z = -0.2;
    frame.add(halo);

    artworkObjects.push({ mesh: frame, painting: painting, data: artwork, index: index });
}

// Les œuvres seront créées par la fonction loadRoom() au démarrage

// Camera setup
camera.position.set(0, 4.5, 15);
camera.rotation.order = 'YXZ';

// Controls
const keys = {};
const moveSpeed = 0.1;
const mouseSensitivity = 0.002;
let isMouseLocked = false;
const lockIndicator = document.getElementById('lock-indicator');

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;

    
});

document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    if (isMouseLocked) {
        mouseX = e.movementX;
        mouseY = e.movementY;
    }
});

// Pointer lock - verrouiller seulement si pas déjà verrouillé
renderer.domElement.addEventListener('click', () => {
    if (!isMouseLocked) {
        renderer.domElement.requestPointerLock();
    }
});

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement) {
        isMouseLocked = true;
        lockIndicator.classList.add('active');
    } else {
        isMouseLocked = false;
        lockIndicator.classList.remove('active');
    }
});

// Artwork info
const artworkInfo = document.getElementById('artwork-info');
const artworkTitle = document.getElementById('artwork-title');
const artworkDescription = document.getElementById('artwork-description');

function checkNearArtwork() {
    let nearestArtwork = null;
    let minDistance = Infinity;

    artworkObjects.forEach(obj => {
        const distance = camera.position.distanceTo(obj.mesh.position);
        if (distance < 5 && distance < minDistance) {
            minDistance = distance;
            nearestArtwork = obj.data;
        }
    });

    if (nearestArtwork) {
        artworkTitle.textContent = nearestArtwork.title;
        artworkDescription.textContent = `${nearestArtwork.artist} - ${nearestArtwork.description}`;
        artworkInfo.classList.add('visible');
    } else {
        artworkInfo.classList.remove('visible');
    }
}

// Minimap
const minimapCanvas = document.getElementById('minimap');
const minimapCtx = minimapCanvas.getContext('2d');
minimapCanvas.width = 150;
minimapCanvas.height = 150;

function drawMinimap() {
    minimapCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    minimapCtx.fillRect(0, 0, 150, 150);

    minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    minimapCtx.lineWidth = 2;
    minimapCtx.strokeRect(10, 10, 130, 130);

    artworkObjects.forEach(obj => {
        const x = (obj.mesh.position.x + 25) / 50 * 130 + 10;
        const z = (obj.mesh.position.z + 25) / 50 * 130 + 10;
        minimapCtx.fillStyle = '#a0c4ff';
        minimapCtx.fillRect(x - 2, z - 2, 4, 4);
    });

    const playerX = (camera.position.x + 25) / 50 * 130 + 10;
    const playerZ = (camera.position.z + 25) / 50 * 130 + 10;
    minimapCtx.fillStyle = '#ff6b6b';
    minimapCtx.beginPath();
    minimapCtx.arc(playerX, playerZ, 4, 0, Math.PI * 2);
    minimapCtx.fill();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (isMouseLocked) {
        camera.rotation.y -= mouseX * mouseSensitivity;
        camera.rotation.x -= mouseY * mouseSensitivity;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }
    mouseX = 0;
    mouseY = 0;

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);
    right.y = 0;
    right.normalize();

    if (keys['z'] || keys['w']) camera.position.add(forward.multiplyScalar(moveSpeed));
    if (keys['s']) camera.position.add(forward.multiplyScalar(-moveSpeed));
    if (keys['q'] || keys['a']) camera.position.add(right.multiplyScalar(-moveSpeed));
    if (keys['d']) camera.position.add(right.multiplyScalar(moveSpeed));

    if (keys['arrowup']) camera.position.add(forward.multiplyScalar(moveSpeed));
    if (keys['arrowdown']) camera.position.add(forward.multiplyScalar(-moveSpeed));
    if (keys['arrowleft']) camera.position.add(right.multiplyScalar(-moveSpeed));
    if (keys['arrowright']) camera.position.add(right.multiplyScalar(moveSpeed));

    camera.position.x = Math.max(-23, Math.min(23, camera.position.x));
    camera.position.z = Math.max(-23, Math.min(23, camera.position.z));
    camera.position.y = 4.5;

    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.002;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.rotation.y += 0.0002;

    checkNearArtwork();
    drawMinimap();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========== GESTION DU MENU BURGER ==========

const burgerBtn = document.getElementById('burger-menu-btn');
const burgerMenu = document.getElementById('burger-menu');
const menuItems = document.querySelectorAll('.menu-item');

// Ouvrir/Fermer le menu avec effet glitch
burgerBtn.addEventListener('click', () => {
    // Ajouter l'animation glitch au bouton
    burgerBtn.classList.add('glitch');
    setTimeout(() => burgerBtn.classList.remove('glitch'), 300);

    // Toggle du menu
    if (burgerMenu.classList.contains('menu-closed')) {
        burgerMenu.classList.remove('menu-closed');
        burgerMenu.classList.add('menu-open');
    } else {
        burgerMenu.classList.remove('menu-open');
        burgerMenu.classList.add('menu-closed');
    }
});

// Navigation entre les salles
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const roomId = item.getAttribute('data-room');

        // Ne rien faire si on clique sur la salle actuelle
        if (roomId === currentRoom) {
            burgerMenu.classList.remove('menu-open');
            burgerMenu.classList.add('menu-closed');
            return;
        }

        // Fermer le menu
        burgerMenu.classList.remove('menu-open');
        burgerMenu.classList.add('menu-closed');

        // Téléportation vers la nouvelle salle avec effet glitch
        teleportToRoom(roomId);
    });
});

// ========== SYSTÈME DE TÉLÉPORTATION ==========

// Fonction de téléportation avec effet glitch cyberpunk
function teleportToRoom(roomId) {
    const glitchOverlay = document.getElementById('glitch-overlay');

    // Phase 1 : Activer l'effet glitch (écran devient noir avec scanlines)
    glitchOverlay.classList.remove('glitch-hidden');
    glitchOverlay.classList.add('glitch-active');

    // Phase 2 : Après 700ms (mi-transition), changer la salle
    setTimeout(() => {
        // Nettoyer la scène actuelle
        clearCurrentRoom();

        // Charger la nouvelle salle
        loadRoom(roomId);

        // Mettre à jour la salle actuelle
        currentRoom = roomId;

        // Réinitialiser la position du joueur au centre
        camera.position.set(0, 4.5, 15);
        camera.rotation.set(0, 0, 0);
    }, 700);

    // Phase 3 : Désactiver l'effet glitch après 1400ms (fin de transition)
    setTimeout(() => {
        glitchOverlay.classList.remove('glitch-active');
        glitchOverlay.classList.add('glitch-hidden');
    }, 1400);
}

// ========== FONCTIONS DE GESTION DES SALLES ==========

// Nettoyer tous les objets de la salle actuelle
function clearCurrentRoom() {
    // Supprimer toutes les œuvres
    artworkObjects.forEach(obj => {
        scene.remove(obj.mesh);
        // Libérer la mémoire des textures
        if (obj.painting.material.map) {
            obj.painting.material.map.dispose();
        }
        obj.painting.material.dispose();
        obj.mesh.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => mat.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    artworkObjects.length = 0; // Vider le tableau

    // Supprimer les lumières d'accentuation (3 lumières accent + spotlights des œuvres)
    const lightsToRemove = [];
    scene.children.forEach(child => {
        if (child instanceof THREE.PointLight || child instanceof THREE.SpotLight) {
            lightsToRemove.push(child);
        }
    });
    lightsToRemove.forEach(light => scene.remove(light));
}

// Charger une nouvelle salle avec son thème et ses œuvres
function loadRoom(roomId) {
    const roomData = roomsData[roomId];
    const theme = roomData.theme;

    // Mettre à jour le titre de la salle dans le header
    document.querySelector('#header h1').textContent = roomData.name.toUpperCase();

    // Appliquer le thème visuel
    scene.background = new THREE.Color(theme.background);
    scene.fog = new THREE.Fog(theme.fog, 10, 70);

    // Mettre à jour les matériaux existants (sol, plafond, murs)
    floor.material.color.setHex(theme.floor.color);
    floor.material.emissive.setHex(theme.floor.emissive);

    ceiling.material.color.setHex(theme.ceiling.color);
    ceiling.material.emissive.setHex(theme.ceiling.emissive);

    // Mettre à jour tous les murs
    [wall1, wall2, wall3, wall4].forEach(wall => {
        wall.material.color.setHex(theme.walls.color);
        wall.material.emissive.setHex(theme.walls.emissive);
    });

    // Créer les lumières d'accentuation de la salle
    theme.lights.forEach(lightData => {
        const accentLight = new THREE.PointLight(lightData.color, 0.5, 30);
        accentLight.position.set(lightData.position.x, lightData.position.y, lightData.position.z);
        scene.add(accentLight);
    });

    // Mettre à jour les particules
    updateParticles(theme.particles);

    // Créer les œuvres de la salle
    roomData.artworks.forEach((artwork, index) => createArtwork(artwork, index));
}

// Mettre à jour les particules selon le thème
function updateParticles(particleConfig) {
    // Changer la couleur des particules
    if (particleConfig.alternateColor) {
        // Si alternance de couleurs (ex: or/bleu pour Égypte)
        particlesMaterial.color.setHex(particleConfig.color);
        // Note: Pour l'alternance, on pourrait créer 2 systèmes de particules
        // mais pour l'instant on garde une couleur principale
    } else {
        particlesMaterial.color.setHex(particleConfig.color);
    }
}


setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    // Charger la salle initiale (Renaissance)
    loadRoom(currentRoom);
    animate();
}, 1000);