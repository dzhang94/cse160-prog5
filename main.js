// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ocean Geometry
const oceanGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const oceanMaterial = new THREE.MeshPhongMaterial({ color: 0x0099ff, side: THREE.DoubleSide, specular: 'Blue'});
const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
ocean.castShadow = true;
ocean.receiveShadow = true;
ocean.rotation.x = -Math.PI / 2;
scene.add(ocean);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
// directionalLight.position.set(-1, 1, 1);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

const cameraOffset = {
    x: 0,
    y: 8,
    z: -20
};


function createFish() {
    const fishGroup = new THREE.Group();
    // Fish body
    const bodyGeometry = new THREE.SphereGeometry(5, 32, 16);
    bodyGeometry.scale(0.4, 0.3, 1);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    fishGroup.add(body);

    // Fish tail
    const tailGeometry = new THREE.ConeGeometry(1.5, 4, 32);
    tailGeometry.rotateX(Math.PI / 2);
	tailGeometry.scale(0.2,1,0.7);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0, -4);
	tail.name = 'tail';
    fishGroup.add(tail);

    // Dorsal fin
    const dorsalFinGeometry = new THREE.ConeGeometry(0.8, 3, 32);
	dorsalFinGeometry.scale(0.2,1,1);
    const dorsalFinMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const dorsalFin = new THREE.Mesh(dorsalFinGeometry, dorsalFinMaterial);
    dorsalFin.position.set(0, 1.5, 0);
    dorsalFin.rotation.x = Math.PI / 2;
	dorsalFin.name = 'dorsalFin';
    fishGroup.add(dorsalFin);

    // Side fins
    const finGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
    // Right fin
	finGeometry.scale(0.2,1.3,-2)
    const rightFinMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const rightFin = new THREE.Mesh(finGeometry, rightFinMaterial);
	
    rightFin.position.set(-2, 0, 0);
    rightFin.rotation.z = -Math.PI / 2;
    rightFin.rotation.y = -Math.PI / 4;
	rightFin.rotation.x = -Math.PI / 2;
	rightFin.name = 'rightFin';
    fishGroup.add(rightFin);
    // Left fin
    const leftFinMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });
    const leftFin = new THREE.Mesh(finGeometry, leftFinMaterial);
    leftFin.position.set(2, 0, 0);
    leftFin.rotation.z = Math.PI / 2;
    leftFin.rotation.y = Math.PI / 4;
	leftFin.rotation.x = -Math.PI / 2;
	leftFin.name = 'leftFin';
    fishGroup.add(leftFin);

	const fishLight = new THREE.SpotLight(0xffffff, 1000, 20, Math.PI / 6, 0.5, 1);
    fishLight.position.set(0, 0, 5);
    fishGroup.add(fishLight);
    fishLight.target.position.set(0, 0, 10);
    fishGroup.add(fishLight.target);

    return fishGroup;
}

function createBarnacle() {
    const group = new THREE.Group();

    // Main body
    const mainGeometry = new THREE.ConeGeometry(1, 2, 100);
    const mainMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 60 + 180}, 100%, 50%)`),
    });
    const mainBody = new THREE.Mesh(mainGeometry, mainMaterial);
    group.add(mainBody);

    // barnacle offshoots
    for (let i = 0; i < 8; i++) {
        const plateGeometry = new THREE.ConeGeometry(0.3, 1, 6);
        const plateMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(`hsl(${Math.random() * 60 + 180}, 100%, 70%)`),
        });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.y = Math.random() * 0.5;
        plate.rotation.y = (Math.PI / 4) * i;
        plate.rotation.z = Math.PI / 2;
        group.add(plate);
    }

    // Randomize
    const scale = Math.random() * 10 + 3;
    group.scale.set(scale, scale, scale);
    group.position.x = Math.random() * 200 - 100;
    group.position.y = 0;
    group.position.z = Math.random() * 200 - 100;

    return group;
}

function createJellyfish() {
    const jellyfishGroup = new THREE.Group();

    // body
    const bodyGeometry = new THREE.SphereGeometry(5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x009688, transparent: true, opacity: 0.8 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    jellyfishGroup.add(body);

    // tentacles
    const tentacleMaterial = new THREE.MeshPhongMaterial({ color: 0x004D40 });
    const tentacleLength = 10;
    const tentacleRadius = 0.1;
    const tentacles = 8; // Number of tentacles
    for (let i = 0; i < tentacles; i++) {
        const tentacleGeometry = new THREE.CylinderGeometry(tentacleRadius, tentacleRadius, tentacleLength, 8);
        const tentacle = new THREE.Mesh(tentacleGeometry, tentacleMaterial);

        tentacle.position.y = -tentacleLength / 2;
        tentacle.position.x = Math.cos((2 * Math.PI / tentacles) * i) * 3;
        tentacle.position.z = Math.sin((2 * Math.PI / tentacles) * i) * 3;
        tentacle.rotation.x = Math.PI;

        jellyfishGroup.add(tentacle);
    }
    jellyfishGroup.position.x = Math.random() * 200 - 100;
    jellyfishGroup.position.y = Math.random() * 20 + 10
    jellyfishGroup.position.z = Math.random() * 200 - 100;

    return jellyfishGroup;
}
const textureLoader = new THREE.TextureLoader();
const fishTexture = textureLoader.load('textures/fishTexture.jpg');

const bodyMaterial = new THREE.MeshPhongMaterial({
    map: fishTexture,
    color: 0xffa500
});

let fish = createFish();
fish.position.y = 7;

scene.add(fish);

const numLights = 15
for (let i = 0; i < numLights; i++) {
    const pointLight1 = new THREE.PointLight(Math.floor(Math.random() * 0xffffff), Math.random() * 400 + 80, Math.random() * 10 + 10, Math.random() * 1);
	pointLight1.position.set(Math.random() * 200 - 100, Math.random() * 15, Math.random() * 200 - 100);
	scene.add(pointLight1);
}

const jellyfishes = [];
for (let i = 0; i < 20; i++) {
    const jellyfish = createJellyfish();
    scene.add(jellyfish);
    jellyfishes.push(jellyfish);
}

const numBarnacles = 100;
for (let i = 0; i < numBarnacles; i++) {
    const barnacle = createBarnacle();
    scene.add(barnacle);
}

// Listen to keydown events
// document.addEventListener('keydown', onDocumentKeyDown, false);

const keyStates = {
    W: false,
    A: false,
    D: false,
    Space: false,
    C: false,
};

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (key === ' ' || key in keyStates) {
        event.preventDefault();
        if (key === ' ') {
            keyStates.Space = true;
        } else {
            keyStates[key] = true;
        }
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    if (key === ' ' || key in keyStates) {
        event.preventDefault();
        if (key === ' ') {
            keyStates.Space = false;
        } else {
            keyStates[key] = false;
        }
    }
});

function createWall(width, height, position, rotation) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(position.x, position.y, position.z);
    wall.rotation.set(rotation.x, rotation.y, rotation.z);
    return wall;
}

const wallWidth = 200;
const wallHeight = 200;
const positionsAndRotations = [
    { position: { x: 0, y: 0, z: -100 }, rotation: { x: 0, y: 0, z: 0 } },
    { position: { x: 0, y: 0, z: 100 }, rotation: { x: 0, y: Math.PI, z: 0 } },
    { position: { x: -100, y: 0, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
    { position: { x: 100, y: 0, z: 0 }, rotation: { x: 0, y: -Math.PI / 2, z: 0 } },
    { position: { x: 0, y: 100, z: 0 }, rotation: { x: Math.PI / 2, y: 0, z: 0 } },
    { position: { x: 0, y: -100, z: 0 }, rotation: { x: -Math.PI / 2, y: 0, z: 0 } }
];

positionsAndRotations.forEach(({ position, rotation }) => {
    const wall = createWall(wallWidth, wallHeight, position, rotation);
    scene.add(wall);
});


function animate() {
    requestAnimationFrame(animate);

    const swimSpeed = -0.1;
	const vertSpeed = 0.07;
	const idleSpeed = -0.02;
	const rotationSpeed = 0.005;
	const beforeclampPosition = fish.position.clone();


    if (keyStates.A) {
		fish.rotation.y += rotationSpeed;
    }
    if (keyStates.D) {
		fish.rotation.y -= rotationSpeed;
    }
    if (keyStates.Space) {
		fish.position.y += vertSpeed;
    }
    if (keyStates.C) {
		if (fish.position.y > 0) {
			fish.position.y -= vertSpeed;
		}
    }
	const time = Date.now() * 0.005; 

	jellyfishes.forEach(jellyfish => {
        jellyfish.position.y += Math.sin(time / 10) * 0.02;

        jellyfish.rotation.y += 0.005;
    });
	
	const leftfinRotationSpeed = keyStates.A ? 1 : 0.1;
	const rightfinRotationSpeed = keyStates.D ? 1 : 0.1;
	const finRotationSpeed = keyStates.W ? 0.5 : 0.1
	const rightFin = fish.getObjectByName('rightFin');
    const leftFin = fish.getObjectByName('leftFin');
	const tail = fish.getObjectByName('tail');
	const dorsalFin = fish.getObjectByName('dorsalFin');

	rightFin.rotation.z = -Math.PI / 4 + Math.sin(time) * leftfinRotationSpeed;
	leftFin.rotation.z = Math.PI / 4 - Math.sin(time) * rightfinRotationSpeed;
	tail.rotation.y = Math.cos(time) * finRotationSpeed;
	dorsalFin.rotation.z = - Math.sin(time) * finRotationSpeed/5;

	const speed = keyStates.W ? swimSpeed : idleSpeed;
    beforeclampPosition.add(new THREE.Vector3(0, 0, -speed).applyQuaternion(fish.quaternion));


	fish.position.x = THREE.MathUtils.clamp(beforeclampPosition.x, -100, 100);
    // fish.position.y = THREE.MathUtils.clamp(beforeclampPosition.y, -boundary.y, boundary.y);
    fish.position.z = THREE.MathUtils.clamp(beforeclampPosition.z, -100, 100);
    // Update the camera position relative to the fish
    const relativeCameraOffset = new THREE.Vector3(cameraOffset.x, cameraOffset.y, cameraOffset.z);
    const cameraOffsetRotated = relativeCameraOffset.applyMatrix4(fish.matrixWorld);
    camera.position.x = cameraOffsetRotated.x;
    camera.position.y = cameraOffsetRotated.y;
    camera.position.z = cameraOffsetRotated.z;
    camera.lookAt(fish.position);

    renderer.render(scene, camera);
}

animate();