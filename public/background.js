import * as THREE from "https://cdn.jsdelivr.net/npm/three@^0.170.0/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight(0xff0000, 8000);
light.position.set(0,0,40);
scene.add(light); 

const light3 = new THREE.PointLight(0x0000ff, 8000);
light3.position.set(0,0,40);
scene.add(light3); 

const light2 = new THREE.PointLight(0x00ff00, 8000);
light2.position.set(0,0,40);
scene.add(light2); 

const geometry = new THREE.BoxGeometry( 250, 150, 1 );
const material = new THREE.MeshLambertMaterial({color:0x888888}); 
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 100;
var testvar = 0
var adjustera = Math.random()*10
var adjusterb = Math.random()*10
var adjusterc = Math.random()*10
function animate () {
    testvar += .01
    light.position.y = Math.sin(testvar/1.5 + adjustera)*50;
    light.position.x = Math.sin(testvar*4/3 + adjusterc)*80;
    light3.position.x = Math.sin(testvar/2 + adjustera)*80;
    light3.position.y = Math.sin(testvar+3.14 + adjusterb)*50;
    light2.position.y = Math.sin(testvar*.75+3.14 + adjusterb)*50;
    light2.position.x = Math.sin(testvar/2+3.14 + adjusterc)*80;
    light.position.z = Math.sin(testvar*2 + adjusterc) + 40;
    light2.position.z = Math.sin(testvar*2 + 4 + adjusterb) + 40;
    light3.position.z = Math.sin(testvar*2 + 8 + adjustera) + 40;

	renderer.render( scene, camera );

}