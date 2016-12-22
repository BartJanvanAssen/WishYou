import {
  ParticleBasicMaterial,
  Texture,
  ImageUtils,
  AdditiveBlending
 } from 'three'
import SnowFlock from './snowFlock'
import BaseModule from '../module'

const particleImage = new Image();

export default class Snow extends BaseModule{
    constructor(){
      super();
      this.fadeToBlackActive = false;
      this.particles = []
    }

    setParticles(amount, callback){
      var material = new ParticleBasicMaterial( { map: new Texture(particleImage), blending: AdditiveBlending,  transparent: true } );
      for (let i = 0; i < amount; i++) {

        const particle = new SnowFlock( material);
        particle.position.set(randomRange(-1000, 1000),  randomRange(-200,400), randomRange(600,1000))
        this.particles.push(particle);

      }

      callback(this.particles)
    }
    fadeToBlack(){
      this.fadeToBlackActive = true;
    }
    animate(delta) {
      var sp = this.particles.length
      if(this.fadeToBlackActive){
        while(sp--) {
          let particle = this.particles[sp]
          if(~~parseInt(randomRange(0,5)) == 1){
            particle.position.y = -1000;
            particle.remove();
          }
        }

      }else{

      sp = this.particles.length
        while(sp--) {
          let particle = this.particles[sp]
          if(particle){
          particle.rotation.z += (delta * 0.2)
          particle.updatePhysics()

           particle.position.y += particle.position.y < -200 ? 400 : 0;
           particle.position.x += particle.position.x > 500 ? -1000 : (particle.position.x < -500 ? 1000 : 0)
           particle.position.z += particle.position.z > 1000 ? 1 : (particle.position.z < 0 ? 600 : 0)
         }
       }
     }
    }
}
//helpers
function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}
