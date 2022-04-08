import React, { useState } from 'react'
import 'aframe'

function Hello_WebVR() {
  const [val,setVal]=useState([]);
  const [show,setShow]=useState(false);
  
  return (
    <a-scene>
      <a-assets>
        <a-asset-item id="mario-obj" src={require ("../../Constants/Images/mario/mario-sculpture.obj")}></a-asset-item>
        <a-asset-item id="mario-mtl" src={require ("../../Constants/Images/mario/mario-sculpture.mtl")}></a-asset-item>
        <img id="elephant" crossOrigin="anonymous" src={require('../../Constants/Images/ele.png')}></img>
      </a-assets>
               
      {/* <a-entity obj-model="obj: #mario-obj; mtl: #mario-mtl"></a-entity> */}

      {/* <a-obj-model src="#mario-obj" mtl="#mario-mtl" width="4" height="4"></a-obj-model> */}

         <a-entity layer="type: quad; src: #elephant" position="0 1.8 -1.5"></a-entity>
      
          {/* <a-box
            position="-1 0.5 -3"
            rotation="0 45 0" 
            color="#4CC3D9"  
            
          >

          </a-box>

          <a-sphere 
            
            position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-cylinder  
          position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        <a-sky color="#ECECEC"></a-sky> */}
     
    </a-scene>
  )
}

export default Hello_WebVR