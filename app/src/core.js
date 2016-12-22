//https://github.com/mrdoob/three.js/pull/9310
import * as THREE from 'three';

var backgroundColor = 0xffffff;
//var backgroundColor = 0x000000;
var loading = false;


var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xff0000 );
//scene.background = new THREE.Color(backgroundColor); // background-color
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

var camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
//renderer.setClearColor( 0xffffff, 1 )
//renderer.autoClear = true;

window.addEventListener( 'resize', onWindowResize, false );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);


// var helper = new THREE.GridHelper( 1000, 100 );
// helper.position.y = - 199;
// helper.material.opacity = 0.85;
// helper.material.transparent = true;
// scene.add( helper );



var PageGeometry = new THREE.BoxGeometry( window.innerWidth, window.innerHeight, 1 );
var HomeScreen = new THREE.Mesh( PageGeometry, material );

scene.add( HomeScreen );

camera.position.z = 2;
var counter = new THREE.Clock();
counter.start();
function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
  if(loading){
    HomeScreen.visible = true;
  }
  else{
  }
  counter++;
  if(counter.getElapsedTime > 2500){
    loading = true;
  }
}
render();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
