// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.visible = true; // Cube is shown by default
scene.add(cube);

// Create a triangle shape
const triangleShape = new THREE.Shape();
triangleShape.moveTo(0, 1);
triangleShape.lineTo(-1, -1);
triangleShape.lineTo(1, -1);
triangleShape.lineTo(0, 1);
const extrusionSettings = {
    depth: 1,
    bevelEnabled: false,
};
const triangleGeometry = new THREE.ExtrudeGeometry(triangleShape, extrusionSettings);
const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
triangle.visible = false; // Triangle is hidden by default
scene.add(triangle);

// Set the initial camera position
camera.position.z = 5;

// Zoom parameters
let zoomFactor = 1;

// Create an animate function to update the scene and rotate the shapes
const animate = () => {
    requestAnimationFrame(animate);

    // Adjust camera position based on zoom factor
    camera.position.z = 5 * zoomFactor;

    // Rotate the cube
    if (cube.visible) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    // Rotate the triangle
    if (triangle.visible) {
        triangle.rotation.x += 0.01;
        triangle.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

// Add event listeners for window resizing
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// Button event handlers
const cubeButton = document.getElementById('cubeButton');
const triangleButton = document.getElementById('triangleButton');
const zoomInButton = document.getElementById('zoomInButton');
const zoomOutButton = document.getElementById('zoomOutButton');

cubeButton.addEventListener('click', () => {
    cube.visible = true;
    triangle.visible = false;
});

triangleButton.addEventListener('click', () => {
    cube.visible = false;
    triangle.visible = true;
});

zoomInButton.addEventListener('click', () => {
    zoomFactor *= 1.2; // Increase zoom
});

zoomOutButton.addEventListener('click', () => {
    zoomFactor /= 1.2; // Decrease zoom
});

// Handle pinch-to-zoom for touch devices
let touchStartDistance = 0;

document.addEventListener('touchstart', (event) => {
    const touches = event.touches;
    if (touches.length === 2) {
        touchStartDistance = Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
    }
});

document.addEventListener('touchmove', (event) => {
    const touches = event.touches;
    if (touches.length === 2) {
        const touchEndDistance = Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
        zoomFactor *= touchEndDistance / touchStartDistance;
        touchStartDistance = touchEndDistance;
    }
});

// Start the animation loop
animate();