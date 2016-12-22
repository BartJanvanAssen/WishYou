import {
  TextGeometry,
  JSONLoader,
  GeometryUtils,
  Mesh,
  FlatShading, SmoothShading,
  MeshPhongMaterial, MultiMaterial,
  CubeGeometry,
  MeshBasicMaterial,
  MeshFaceMaterial,
  Vector3,
  Group,
  ImageUtils
} from 'three'
import BaseModule from '../module'
import image from '../../images/snow_ground.png'

export default class SnowGround extends BaseModule {
  constructor(){
    super();
    this.fadeToBlackActive = false;
  }
  setParticles(amount, callback) {
    var geometry = new CubeGeometry(2800, 500, 1, 2, 2, 2);
    var material = new MeshBasicMaterial({ map: ImageUtils.loadTexture(image), transparent: true, opacity: 1, color: 0xFFFFFF })
    this.snowground  = new Mesh(geometry, material);
    // this.snowground.position.x = -1000
     this.snowground.position.y = -520
     //this.snowground.position.x = 820
    callback([this.snowground]);
  }
  animate(){
      if(this.fadeToBlackActive){
        this.snowground.material.opacity -= 0.01;
      }
  }
  fadeToBlack(){
    this.fadeToBlackActive = true;
  }


  setOptions(options){ this.options = options }
}
