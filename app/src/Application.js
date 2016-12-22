import {
  Clock,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  CubeGeometry,
  MeshLambertMaterial,
  Mesh,
  PlaneGeometry,
  ImageUtils,
  DirectionalLight,
  AdditiveBlending, Color } from 'three'

//Helpers
import Statistics from './helpers/Stats/stats'

//Module
import Smoke from './modules/Smoke/smoke'
import Snow from './modules/Snow/snow'
import Title from './modules/Title/title'
import Snowman from './modules/Snowman/snowman'
import HollyLeaf from './modules/Holly/hollyleaf'
import SnowGround from './modules/SnowGround/snowground'
import Tree from './modules/Tree/tree'
import FireWork from './modules/Firework/firework'

//Application initialization
export default class Application {
    constructor(options) {
        //this.stats = new Statistics();
        this.clock = new Clock()
        this.renderer = new WebGLRenderer()
        this.scene = new Scene()
        
        this.scene.background = new Color( 0x297329 );
        this.fadeToBlackActive = false;

        this.modules = [];

        this.renderer.setSize( 1138,590 )

        this.initiateCamera()
        this.initiateLight()
        this.initiateModules(options.modules)
        this.initiateAnimate()

        document.body.appendChild( this.renderer.domElement )
    }

    initiateCamera(){
      this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
      this.scene.add(this.camera)
      this.camera.position.z = 1000
    }

    initiateLight(){
      let light = new DirectionalLight(0xffffff,0.8)
      light.position.set(0,0,900)
      this.scene.add(light)
    }

    getModuleForType(type){
      switch (type.toLowerCase()) {
        case 'snowman':
          return new Snowman();
          break;
        case 'snow':
          return new Snow();
          break;
        case 'smoke':
          return new Smoke();
          break;
        case 'title':
          return new Title();
          break;
        case 'hollyleaf':
          return new HollyLeaf();
          break;
        case 'snowground':
          return new SnowGround();
          break;
        case 'tree':
          return new Tree();
          break;
        case 'firework':
          return new FireWork();
          break;
        default:
          throw "No valid module was found exception"
      }
    }

    initiateModules(modulesConfiguration){
      modulesConfiguration.map(config => this.addModule(config));
    }

    addModule(config){
      if(config.active){
        const instance = this.getModuleForType(config.type)

        instance.setOptions(config.options)

        //Set configuration and return into callback!
        instance.setParticles(config.particles, (particles) => {
          particles.map((p) => this.scene.add(p))
          if(config.animate){
            this.modules.push(instance)
          }
        })
      }
    }

    initiateAnimate() {
        // note: three.js includes requestAnimationFrame shim
        //this.stats.begin()
        const delta = this.clock.getDelta()
        requestAnimationFrame(() => this.initiateAnimate(delta) )
        this.animate(delta);
        this.render()
        //this.stats.end()
    }

    animate(delta){
      if(this.fadeToBlackActive){
        var r = this.scene.background.r - 0.003
        var g = this.scene.background.g - 0.003
        var b = this.scene.background.b - 0.003
        var rgb = {r: r, g:g,b: b};
        this.scene.background.setRGB(r,g,b)
      }
      this.modules.map(module => module.animate(delta))
    }

    fadeToBlack(){
        this.modules.map(module => module.fadeToBlack());
        this.fadeToBlackActive = true;
    }

    render(){
        this.renderer.render( this.scene, this.camera )
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }
}
