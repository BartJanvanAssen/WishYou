//https://www.script-tutorials.com/christmas-tree-with-threejs/

import Application from './Application.js';
import * as THREE from 'three';

window.THREE = THREE;

const app = new Application({
  modules: [
    { type: 'smoke', particles: 150, active: false, animate: true, options: {} },
    { type: 'snowman', particles: 1, active: true, animate: true, options: {} },
    { type: 'hollyleaf', particles: 1, active: true, animate: true, options: {} },
    { type: 'snowground', particles: 1, active: true, animate: true, options: {} },
    { type: 'tree', particles: 1, active: true, animate: true, options: {} },
    { type: 'snow', particles: 3500, active: true, animate: true, options: {} }
  ]
});
//
setTimeout(() => {
  app.addModule({ type: 'title', particles: 1, active: true, animate: true, options: { text: 'We wish you a merry christmas'} });
}, 3000)

setTimeout(() => {
  app.fadeToBlack();
}, 7000)

setTimeout(() => {
  app.addModule({ type: 'title', particles: 1, active: true, animate: true, options: { text: '...and a happy new year!'} });
}, 10000)

setTimeout(() => {
  app.addModule({ type: 'firework', particles: 4, active: true, animate: true });
}, 8000)


//window.addEventListener('resize', () => { app.onWindowResize() }, false );
