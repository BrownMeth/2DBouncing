// app.js

// Import Babylon.js
import * as BABYLON from 'https://cdn.babylonjs.com/babylon.js';

// Create the canvas and engine
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    
    // Create a basic light
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    
    // Create a camera
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    // Create a ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    
    // Create a jumping object
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box.position.y = 1;
    
    // Add jumping logic
    scene.onBeforeRenderObservable.add(() => {
        if (box.position.y > 1) {
            box.position.y -= 0.1; // Fall down
        } else {
            box.position.y = 1; // Reset position
        }
    });
    
    return scene;
};

// Create the scene
const scene = createScene();

// Render loop
engine.runRenderLoop(function () {
    scene.render();
});

// Resize the engine on window resize
window.addEventListener('resize', function () {
    engine.resize();
});
