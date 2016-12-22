import {
  TextGeometry,
  FontLoader,
  GeometryUtils,
  Mesh,
  FlatShading, SmoothShading,
  MeshPhongMaterial, MultiMaterial,
  Group
} from 'three'
import BaseModule from '../module'

export default class Title extends BaseModule {
  constructor() {
    super()
    this.text = "Merry christmas and a happy new year!"
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

  loadFont(callback) {
  	var loader = new FontLoader();
    loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_bold.typeface.json', font => callback(font));
	}

  setFont(){
    if(!this.font){
      throw "No font loaded yet";
    }

    this.material = new MultiMaterial([
      new MeshPhongMaterial( { color: 0xec3d3d, shading: FlatShading } ), // front
      new MeshPhongMaterial( { color: 0xec3d3d, shading: SmoothShading } ) // side
    ]);

    this.textGeo = new TextGeometry(this.text, {
      font: this.font,
      size: this.settings.size,
      height: this.settings.height,
      curveSegments: this.settings.curveSegments,
      material: 0,
      extrudeMaterial: 1
    });

    this.textMesh = new Mesh(this.textGeo, this.material);
    this.textMesh.position.set(this.getCenterOffset(), 25, 0);
  }

  getCenterOffset(){
    this.textGeo.computeBoundingBox()
    this.textGeo.computeVertexNormals()

    return -0.5 * ( this.textGeo.boundingBox.max.x - this.textGeo.boundingBox.min.x )
  }

  setParticles(amount, callback){
    this.loadFont((font) => {
      this.font = font;
      this.setFont();
      callback([this.textMesh])
    })
  }

  setOptions(options){ 
    this.options = options
    this.text = options.text;
  }
  
  fadeToBlack(){
    this.fadeToBlackActive = true;
  }
  
  animate(delta) {
    let speed = 60;
    if(this.textMesh.position.z > 700 && !this.fadeToBlackActive){
      this.textMesh.position.z = 700;
    }
    if(this.fadeToBlackActive){
      speed = 20;
    }
    this.textMesh.position.z += speed;
  }
}
