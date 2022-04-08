import React from "react";
// import './ar-hit-test'
import './components/ar-shadows'
import './components/background-gradient'
// import './hide-on-enter-ar'
import './components/info-message'
import './components/model-viewer' 
import 'aframe-extras'
import 'aframe'
function Model_Viewer() {
  return (
    <a-scene
      renderer="colorManagement: true;"
      info-message="htmlSrc: #messageText"
      model-viewer="gltfModel: #triceratops; title: Triceratops"
    >
      <a-assets>
        <a-asset-item
          id="triceratops"
          src="https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf"
          response-type="arraybuffer"
          crossorigin="anonymous"
        ></a-asset-item>

        <a-asset-item
          id="reticle"
          src="https://cdn.aframe.io/examples/ar/models/reticle/reticle.gltf"
          response-type="arraybuffer"
          crossorigin="anonymous"
        ></a-asset-item>

        <img
          id="shadow"
          src="https://cdn.glitch.com/20600112-c04b-492c-8190-8a5ccc06f37d%2Fshadow.png?v=1606338852399"
        ></img>
         
      </a-assets>
    </a-scene>
  );
}

export default Model_Viewer;
