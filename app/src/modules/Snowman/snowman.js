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
import image from '../../images/snowman.png';

export default class Snowman extends BaseModule {
  constructor() {
    super()
    this.downOrUp = 1;
    this.fadeToBlackActive = false;
    this.settings = {
      firstLetter: true,
    	height: 10,
    	size: 20,
    	hover: 0,
    	curveSegments: 4,
    	bevelThickness: 2,
    	bevelSize: 1.5,
    	bevelSegments: 3,
    	bevelEnabled: true,
    	font: undefined,
      material: undefined,
      textMesh: undefined,
    	fontWeight: "bold"
    }
  }

  setParticles(amount, callback) {
    var geometry = new CubeGeometry(700, 700, 1, 2, 2, 2);
    var material = new MeshBasicMaterial({ map: ImageUtils.loadTexture(image), transparent: true, opacity: 1, color: 0xFFFFFF })
    this.snowman  = new Mesh(geometry, material);
    this.snowman.position.x = 900
    this.snowman.position.y = -420
    callback([this.snowman]);
  }

  setOptions(options){ this.options = options }

  animate(delta) {
    if(this.fadeToBlackActive){
      this.snowman.material.opacity -= 0.01;
    }

    var rotate = this.snowman.rotation.z

    if(rotate > 0.2 ){
      this.downOrUp = -1
    }
    if(rotate < -0.2){
      this.downOrUp = 1
    }

    if(this.downOrUp > 0){
      rotate += 0.0047
    }else{
      rotate -= 0.0047
    }

    this.snowman.rotation.z = rotate

  }
  fadeToBlack(){
    this.fadeToBlackActive = true;
  }
}
