let scene, camera, renderer, cube, sphere, torus, particles;
let pointLight, ambientLight;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00aaff });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -2;
    scene.add(cube);

    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff6347 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = 2;
    scene.add(torus);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add lights
    pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();

// GSAP animations
gsap.to(cube.position, { duration: 2, y: 1, repeat: -1, yoyo: true, ease: "power1.inOut" });
gsap.to(sphere.scale, { duration: 1.5, x: 1.5, y: 1.5, z: 1.5, repeat: -1, yoyo: true, ease: "bounce.out" });
gsap.to(torus.rotation, { duration: 3, z: Math.PI * 2, repeat: -1, ease: "none" });

// Camera movement
gsap.to(camera.position, { 
    duration: 10, 
    x: 3, 
    y: 2, 
    z: 7, 
    repeat: -1, 
    yoyo: true, 
    ease: "power1.inOut",
    onUpdate: function() {
        camera.lookAt(scene.position);
    }
});

// Animate point light
gsap.to(pointLight.position, { 
    duration: 4, 
    x: 5, 
    y: 3, 
    z: 5, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut" 
});

// Cube color change
gsap.to(cube.material.color, {
    duration: 3,
    r: 1,
    g: 0,
    b: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Sphere bounce
gsap.to(sphere.position, {
    duration: 1,
    y: 1,
    repeat: -1,
    yoyo: true,
    ease: "bounce.out"
});

// Torus size pulsation
gsap.to(torus.scale, {
    duration: 1.5,
    x: 1.5,
    y: 1.5,
    z: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Particle system expansion and contraction
gsap.to(particles.scale, {
    duration: 5,
    x: 1.5,
    y: 1.5,
    z: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Mouse interaction
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(scene.rotation, {
        duration: 0.5,
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        ease: "power1.out"
    });
}