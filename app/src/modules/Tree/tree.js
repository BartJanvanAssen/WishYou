import {
} from 'three'

import OBJLoader from '../../loaders/OBJLoader'
import MTLLoader from '../../loaders/MTLLoader'
import BaseModule from '../module'
import image from '../../images/snow_ground.png'

export default class Tree extends BaseModule {
  constructor(){
    super();
    this.fadeToBlackActive = false
  }
  setParticles(amount, callback) {
    var Matloader = new MTLLoader();
      Matloader.load('../src/models/CartoonTree.mtl', (materials) => {
      materials.preload();

      var loader = new OBJLoader();
      loader.setMaterials(materials);
      loader.load('../src/models/CartoonTree.obj', (tree) => {
        this.tree = tree;
        this.tree.position.z = 990;
        this.tree.position.y = -6;
        this.tree.position.x = -8;

        callback([tree])
      })
    });


    //callback([this.tree]);
  }
  fadeToBlack(){
    this.fadeToBlackActive = true
  }
  animate(delta){
    if(this.fadeToBlackActive){
      this.tree.position.x -= 0.08;
    }
    this.tree.rotation.y += 0.02
  }
  setOptions(options){ this.options = options }
}
