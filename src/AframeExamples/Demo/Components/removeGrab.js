export const aFrameFunctions={
  onObjClick:()=>{
    document.addEventListener('mousedown', ()=>{
        console.log(document,'onMouse down')
    });
  },
  showEnvMoveButton:()=>{
    var infoButton;
    var wrapper;
    
    const scene=document.querySelector('a-scene'); 

    var css ='.a-info-message-container {position: absolute; left: 80px; bottom: 50px; }';
    var style = document.createElement('style');
      
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
      
      
      // Create elements.
      wrapper = document.createElement('div');
      wrapper.classList.add('a-info-message-container');
        infoButton = document.createElement('button');
      // infoButton.className = 'a-info-message-button';
      infoButton.setAttribute('title', 'Info');
      infoButton.textContent='ki'
      // Insert elements.
      wrapper.appendChild(infoButton);
      infoButton.addEventListener('click', function (evt) {
        alert('hi')
        evt.stopPropagation();
      });
       scene.appendChild(wrapper);
  },
   rotateClockwise:(model,rotateYminus)=>{
    rotateYminus-=5;
    model.setAttribute('rotation', `0 ${rotateYminus} 0`);
  },
 rotateAntiClockwise:(model,rotateYplus)=>{
    rotateYplus+=5;
    model.setAttribute('rotation', `0 ${rotateYplus} 0`);
  },
  changeColor:(lightE)=>{
    lightE.setAttribute('light', {
      type: 'hemisphere',
      intensity:2,
      color:'#fa0000',
      groundColor:'#fa0000',
    }
  );
    // model.setAttribute('rotation', `0 ${rotateYplus} 0`);
  },
 DisplaceUP:(model,cuurVal)=>{
    const y=cuurVal.y+0.1; 
    model.setAttribute('position',`${cuurVal.x} ${y} ${cuurVal.z}`)
  },
 DisplaceDOWN:(model,cuurVal)=>{
    const y=cuurVal.y-0.1; 
    model.setAttribute('position',`${cuurVal.x} ${y} ${cuurVal.z}`)
  },
 DisplaceLEFT:(model,cuurVal)=>{ 
    const x=cuurVal.x-0.1; 
    const z=cuurVal.z-0.001;
    const y=cuurVal.y-0.001;
    model.setAttribute('position',`${x} ${y} ${z}`)
  },
    DisplaceRIGHT:(model,cuurVal)=>{
    const x=cuurVal.x+0.1; 
    model.setAttribute('position',`${x} ${cuurVal.y} ${cuurVal.z}`)
  },
    scaleUp:(model,cuurVal)=>{ 
    const z=cuurVal.z+0.3;  
    model.setAttribute('position',`${cuurVal.x} ${cuurVal.y} ${z}`)
  },
    scaleDown:(model,cuurVal)=>{ 
    const z=cuurVal.z- 0.3;  
    model.setAttribute('position',`${cuurVal.x} ${cuurVal.y} ${z}`)
  }
}