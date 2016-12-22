import { ImageUtils, MeshLambertMaterial, PlaneGeometry, Mesh} from 'three'
import BaseModule from '../module'

export default class Smoke extends BaseModule{
    constructor(){
        super();
        this.particles = [];
        this.smokeTexture = ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
        this.smokeMaterial = new MeshLambertMaterial({color: 0xfffdfd, map: this.smokeTexture, transparent: true});
        this.smokeGeo = new PlaneGeometry(300,300);
    }

    setParticles(amount, callback){
        for (let i = 0; i < amount; i++) {

            const particle = new Mesh(this.smokeGeo, this.smokeMaterial)
            particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-200)
            particle.rotation.z = Math.random() * 360

            this.particles.push(particle)
        }

        callback(this.particles)
    }

    animate( delta) {
        var sp = this.particles.length;
        while(sp--) {
            this.particles[sp].rotation.z += (delta * 0.2);
        }
    }
}
