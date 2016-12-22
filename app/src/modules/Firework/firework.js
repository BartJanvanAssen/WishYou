import BaseModule from '../module'
import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Particle,
  Texture,
  ImageUtils,
  PointsMaterial,
  Vector3,
  Geometry,
  VertexColors
} from 'three'
import image from '../../images/firework.png'
import FireParticle from './fireParticle';

const particleImage = new Image(image);

export default class FireWork extends BaseModule{
  constructor(){
    super();
    this.arrows = [];
    this.positions = [{
      x: -120,
      y: 70
    },{
      x: -50,
      y: 70
    },{
      x: 50,
      y: 70
    },{
      x: 120,
      y: 70
    }];
  }
  setParticles(amount, callback) {

    for (var i = 0; i < amount; i++) {
      var geometry = new BoxGeometry(10, 10, 1);
      var material = new MeshBasicMaterial({ map: ImageUtils.loadTexture(image), transparent: true })
      const arrow = new Arrow(geometry, material, this.positions[i], callback);
      this.arrows.push(arrow);
    }

    callback(this.arrows);
  }
  animate(){
    this.arrows.map(arr =>  arr.animate());
  }
  setOptions(){
    return;
  }
}

class Arrow extends Mesh{
  constructor(geometry, material, position, addToSceneCallback){
    super(geometry, material);
    this.position.set(0, -90, 880); //start position
    this.explosionPosition = position;
    this.addToSceneCallback = addToSceneCallback;
  }

  animate(){
    if(this.arrowInPlace(this.position.x, this.explosionPosition.x) && this.arrowInPlace(this.position.y, this.explosionPosition.y)){
     return this.explode() //remove the arrow
    }
    this.goNextPosition();
  }

  arrowInPlace(currentValue, toBeReached){
    return (toBeReached - currentValue) < 1 
  }

  goNextPosition(){
    var framesToExplode = 30;
    var x = this.position.x - this.explosionPosition.x 
    var y = this.position.y - this.explosionPosition.y
    var xdeValue = x/framesToExplode;
    var ydeValue = y/framesToExplode;
    this.position.x = Math.abs(xdeValue) < 0.04 ? this.explosionPosition.x : this.position.x - xdeValue
    this.position.y = Math.abs(ydeValue) < 0.04 ? this.explosionPosition.y : this.position.y - ydeValue
  }

  explode(){
    if(!this.explosion){
      this.material.opacity = 0 
      this.explosion = new Explode(this.position, this.addToSceneCallback);
    }else{
      this.explosion.animate();
    }
  }
}

class Explode{
  constructor(position, addToSceneCallback){
    this.particles = [];

    var amount = 50;
    //var material = new PointsMaterial( { color: 0xb22222} );
    for (var i = 0; i < amount; i++) {
      var part = new FireParticle()
      part.material.color.set(getRandomColor(i))
      part.position.set(randomRangeForCenter(position.x),randomRangeForCenter(position.y), 880)
      this.particles.push(part)
    }
    addToSceneCallback(this.particles)
  }
  animate(){
    this.particles.map( p => p.updatePhysics())
  }
}

function getRandomColor(i){
  return (i % 2 === 0) ? 0xb22222 : 0xf5f51f;
}

// class LightParticle extends Mesh {
//   constructor(options, centerPosition){
//     super(options)
//     this.centerPosition = centerPosition;
    
//   //   this.velocity = new FlockVector(0, -2, 0);
//   //  this.velocity.rotateX(randomRange(-45, 45));
//   //   this.velocity.rotateY(randomRange(0, 360));
//   //  this.gravity = new FlockVector(0, 0, 0);
//   //   this.drag = 1;    
//   }
//   animate(){
    
//   }
// }

//helpers
function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

function randomRangeForCenter(x) {
    var diff = 30;
    return randomRange(x - diff, x + diff)
}

