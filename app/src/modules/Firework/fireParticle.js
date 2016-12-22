import {
  ParticleBasicMaterial,
  Texture,
  Particle,
  Vector3
 } from 'three'

const TO_RADIANS = Math.PI / 180;

export default class FireParticle extends Particle {
    constructor(){
      super();
      //define props
      this.velocity = new FlockVector(0, -0.40, 0);
      this.velocity.rotateX(randomRange(-45, 45));
      this.velocity.rotateY(randomRange(0, 360));
      this.gravity = new FlockVector(0, 0, 0);
      this.drag = 1;
      
    }
    updatePhysics(){
        //this.material.color = 0xff2828;
        this.velocity.multiplyScalar(this.drag);
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
    }
};

export class FlockVector extends Vector3{
  rotateY(angle) {
      const cosRY = Math.cos(angle * TO_RADIANS);
      const sinRY = Math.sin(angle * TO_RADIANS);

      const tempz = this.z;
      const tempx = this.x;

      this.x = (tempx * cosRY) + (tempz * sinRY);
      this.z = (tempx * -sinRY) + (tempz * cosRY);
  }

  rotateX(angle) {
      const cosRY = Math.cos(angle * TO_RADIANS);
      const sinRY = Math.sin(angle * TO_RADIANS);

      const tempz = this.z;
      const tempy = this.y;

      this.y = (tempy * cosRY) + (tempz * sinRY);
      this.z = (tempy * -sinRY) + (tempz * cosRY);
  }

  rotateZ(angle) {
      const cosRY = Math.cos(angle * TO_RADIANS);
      const sinRY = Math.sin(angle * TO_RADIANS);

      const tempx = this.x;
      const tempy = this.y;

      this.y = (tempy * cosRY) + (tempx * sinRY);
      this.x = (tempy * -sinRY) + (tempx * cosRY);
  }
}

//helpers
function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}
