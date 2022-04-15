import React, { useEffect, useState } from "react";
import "aframe-html-shader";
import "aframe";
import {   backgroundImages, colors, headers, height,   } from "../../Constants/Strings";
import { styles } from "./style";
import 'aframe-extras'
import { aFrameFunctions } from "./Components/removeGrab";
// import './Components/removeGrab'; 
// import "aframe-physics-components";
function Demo() {
   
  const [imageGallery, setimageGallery] = useState([]); //images to render on imagePallete
  const [buttonState, setButtonState] = useState(null);//which button to render
  const [allObjStack, setAllObjSelected] = useState([]); // stack of selected/clicked Object image
  const [showImagePalatte, setShowImagePalatte] = useState(false); // state to toggle image pallete
  const [currentlySelected, setCurrentlySelected] = useState(null); //currently selected backgroundImage 
  const [currentlySelectedImageType, setCurrentlySelectedImageType] = useState(null); //currently selected backgroundImage 
    
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const mImg=[...imageGallery]
      mImg.push(URL.createObjectURL(img));
      setimageGallery(mImg);
    }
  };// uploadingImage

  const update_a_plane_node=(imageUrl)=>{
    const url = imageUrl.replace('blob:','');// if image is from upload action
    const ele=document.querySelector('a-sky');
    ele.setAttribute("material",`src:${url}` );
  };// a-plane image url update on dynamic click of background image

  const create_object_node=(url,rotation,scale,position,modelId)=>{ 
  
  const scene=document.querySelector('a-scene'); 
  const entity1=document.createElement('a-entity'); //a-entity //a-video
  const checkId=document.getElementById(modelId); 

  if( modelId!='tv_screen_model'){  
      var modelPivotEl =  document.createElement('a-entity');
      var modelEl =  document.createElement('a-entity');
    
      var lightEl =  document.createElement('a-entity');
      var sceneLightEl = document.createElement('a-entity');

      modelPivotEl.id = 'modelPivot';
      

      modelEl.setAttribute('geometry','primitive:plane')
      modelEl.setAttribute('gltf-model', url);
      modelEl.id = modelId;

      modelEl.setAttribute('rotation', rotation);// this will enable rotaion of model/flip
      // modelEl.setAttribute('animation-mixer', '');//causes animation
      modelEl.setAttribute('scale', scale);
      modelEl.setAttribute('position', position);
      // modelEl.setAttribute('shadow', 'cast: true; receive: false');
      
      modelPivotEl.appendChild(modelEl);

      sceneLightEl.id='colorChange'
      sceneLightEl.setAttribute('light', {
              type: 'hemisphere',
              intensity: 1 
            }
      );

      lightEl.id = 'light';
      lightEl.setAttribute('position', '-2 4 2');
      lightEl.setAttribute('light', {
        type: 'directional',
        castShadow: true,
        shadowMapHeight: 1024,
        shadowMapWidth: 1024,
        shadowCameraLeft: -7,
        shadowCameraRight: 5,
        shadowCameraBottom: -5,
        shadowCameraTop: 5,
        intensity: 0.5,
        target: 'modelPivot'
      });

      scene.appendChild(lightEl);
      scene.appendChild(sceneLightEl);
    
      scene.appendChild(modelPivotEl);

      

  }
  else{
    // <a-entity geometry="primitive: box" material="shader: html; target: #htmlElement"></a-entity>
    
      // entity1.setAttribute('layer',`type: stereocubemap; src: ${url}`);
      // document.getElementById('htmlElement').setAttribute('src',url);
    
      entity1.setAttribute('geometry', 'primitive :plane ' ); // keep from
      entity1.setAttribute('material', `src :${url}` );//,
      entity1.setAttribute('id',modelId);
      entity1.setAttribute('crossOrigin','anonymous');

      // this.onMouseDown = this.onMouseDown.bind(this);
      // document.addEventListener('mousedown', this.onMouseDown);

      
      entity1.setAttribute('position',position);//"0 0 -20" // 
      entity1.setAttribute('scale',scale); 
      scene.appendChild(entity1); //keep to

      // entity1.setAttribute('src', url );
      // entity1.setAttribute('autoplay',true);
      // entity1.setAttribute('width','50');
      // entity1.setAttribute('height','9');
      // entity1.setAttribute('width','30%');
      // entity1.setAttribute('position',position);//0 1.8 -1 //5.238 1.034 -3.002
      // entity1.setAttribute('rotation',rotation);//'2.000 -360.000 0.000'
      // ezntity1.setAttribute('scale','2.220 1.440 0.002');//3.220 1.440 1.170 //
          // rotation:'2.000 -360.000 0.000',
      // scale:'0.002 0.002 0.002',
      // position:'0.238 1.034 -3.002', 
    
    }
}

  const onImageClick=(url)=>{
    if(currentlySelectedImageType=='Env')
    {
      setCurrentlySelected(url);//background Image
      update_a_plane_node(url);
    }
    else
    {
        setAllObjSelected((prev) => {
            prev.push(url);
            return prev;
        });
    }
    // create_object_node(url);
  };//on click of image on image pallete
  
  const buttons = [
    {
      name: "Env",
      onclick: (index) => {
        return (
          setShowImagePalatte(!showImagePalatte),
          setButtonState(index),
          setimageGallery(backgroundImages),
          setCurrentlySelectedImageType('Env')
        );
      },
    },
    {
      name: "Objects",
      onclick: (index) => {
        return (
          setShowImagePalatte(!showImagePalatte),
          setimageGallery(objectImages),
          setButtonState(index),
          setCurrentlySelectedImageType('Objects')
        );
      },
    },
    {
      name: "Actions",
      onclick: (index) => {
        return (
          setShowImagePalatte(!showImagePalatte),
          // setimageGallery(objectImages),
          // setButtonState(index),
          setCurrentlySelectedImageType('Actions')
        );
      },
    },
  ];
  const actionButtons=[
    {
      name:'Rotate Obj ClockWise',
      onClick:()=>{
        const objModel=document.getElementById('tv_screen_model'); 
        const currentRotation=objModel.getAttribute('rotation');
        aFrameFunctions.rotateClockwise(objModel,currentRotation.y);
      }
    },
    {
      name:'Rotate Obj Anti-ClockWise', 
      onClick:()=>{
        const objModel=document.getElementById('tv_screen_model'); 
        const currentRotation=objModel.getAttribute('rotation');
        aFrameFunctions.rotateAntiClockwise(objModel,currentRotation.y);
      }
    } , 
    {
      name:'Change Obj Color To Red', 
      onClick:()=>{
        const lightE=document.getElementById('colorChange');  
        aFrameFunctions.changeColor(lightE);
      }
    } ,
    {
      name:'Displace Obj UP', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        aFrameFunctions.DisplaceUP(model,curr_pos);
      }
    },
    ,
    {
      name:'Displace Obj DOWN', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        aFrameFunctions.DisplaceDOWN(model,curr_pos);
      }
    },
    {
      name:'Displace Obj LEFT', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        const curr_rot= model.getAttribute('rotation');
         
        aFrameFunctions.DisplaceLEFT(model,curr_pos);
      }
    },
    {
      name:'Displace Obj RIGHT', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        aFrameFunctions.DisplaceRIGHT(model,curr_pos);
      }
    },
    {
      name:'ScaleUp Obj', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        aFrameFunctions.scaleUp(model,curr_pos);
      }
    },
    {
      name:'ScaleDown Obj', 
      onClick:()=>{
        const model=document.getElementById('tv_screen_model');  
        const curr_pos= model.getAttribute('position');
        aFrameFunctions.scaleDown(model,curr_pos);
      }
    }
  ];
  const objectImages = [
    // "https://c4.wallpaperflare.com/wallpaper/501/784/3/earth-planet-sky-moon-wallpaper-preview.jpg", 
    {
      png:require('../../Constants/Images/ele.png'),
      gltf:'https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf',
      rotation:'0 -30 0',//'0 -30 0'
      scale:'0.006 0.006 0.006',
      position:'1.238 1.036 -3.000',//'1.238 1.036 -3.000',
      modelId:'elephant_model'

    },
    {
      png:require('../../Constants/Images/tv.png'),
      gltf:require('../../Constants/Images/Old_TV.gltf'),
      rotation:'2.000 -360.000 0.000',
      scale:'0.003 0.003 0.003',
      position:'-0.102 0.552 -3.000',//0.238 1.034 -3.002  //-0.5 0 -5.002
      modelId:'tv_model'
    },
    {
      png:'https://st.depositphotos.com/1006706/2671/i/600/depositphotos_26715369-stock-photo-which-way-to-choose-3d.jpg',
      gltf:'https://st.depositphotos.com/1006706/2671/i/600/depositphotos_26715369-stock-photo-which-way-to-choose-3d.jpg',//'https://cdn.aframe.io/videos/bunny.mp4'
      rotation:'2.000 -360.000 0.000',
      scale:'0.6 0.4 0.5',//0.002 0.002 0.002
      position:'0.4 1.08 -1',//- - -3.002    //0.238 1.034 -6.002 //-1.101 0.573 -1
      modelId:'tv_screen_model'
    },
  ];  
  return (
    <div style={{ height: height - 60 }}>
      <div style={styles.headerContainer}>
        <div style={styles.headerTextContainer}>
          <h3>{headers.frameExample}</h3> 
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
      >
        {/*side pannel buttons */}
        <div
          style={{
              zIndex:1000,
            backgroundColor: `${colors.lightPurple}`,
            borderRightWidth: showImagePalatte ? 1 : null,
            borderRightColor: showImagePalatte ? `${colors.white}` : null,
            borderRightStyle: showImagePalatte ? "solid" : null,
          }}
        >
          {buttons.map((item, index) => {
            return (
              <div
                style={{
              zIndex:1000, 
              borderColor: `${colors.white}`,
                  borderWidth: 2,
                  borderStyle: "solid",
                  margin: 20,
                  padding: 5,
                  backgroundColor:
                    showImagePalatte && index == buttonState
                      ? `${colors.darkPurple}`
                      : `${colors.white}`,
                  borderRadius: 5,
                  color:
                    showImagePalatte && index == buttonState
                      ? `${colors.white}`
                      : `${colors.darkPurple}`,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => item.onclick(index)}
              >
                <p style={{ textAlign: "center", padding: 0, margin: 0 }}>
                  {item.name}
                  {item.selected}
                </p>
              </div>
            );
          })}
        </div>

        {/* imagePallete */}
        {showImagePalatte && (
          <div
            style={{
              zIndex:1000,
              backgroundColor: `${colors.darkPurple}`,
              flex: 2,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingTop: 15, 
              paddingLeft:10,
              paddingRight:10
              // overflow:'scroll'
            }}
          >
            {
              currentlySelectedImageType == 'Env' ?
             (
                < >
                <h4 style={{color:'white',margin:0,marginBottom:10}}>Select An Environment</h4 >
                <input
                    style={{ paddingLeft: 60 }}
                    type="file"
                    name="uploadImage"
                    onChange={(event) => onImageChange(event)}
                  />
                  {
                    imageGallery.map((item) => {
                      return (
                        <div
                          style={{
                            width: "75%",
                            height: "27%",
                            cursor: "pointer",
                            margin: 20,
                            zIndex:1000,
                          }}
                          onClick={() => {onImageClick(item)}}
                        >
                          
                          <img
                            style={{
                                zIndex:1000,
                                borderRadius: 10,
                            }}
                            src={ item  }
                            crossOrigin="anonymous"
                            height="100%"
                            width="100%"
                          />
                        </div>
                      );
                    })
                  }
                </>
             )
             : 
             (
              currentlySelectedImageType == 'Actions'
              ?
               <>
                <h4 style={{color:'white',margin:0,marginBottom:10}}>Choose any Actions</h4 >

                {
                  actionButtons.map((item) => {
                    return (
                      <div
                        style={{
                          width: "75%",
                          height: "5%",
                          cursor: "pointer",
                          margin:10,
                          zIndex:1000,
                        }}
                        onClick={() => {onImageClick(item)}}
                      >
                        <button 
                          onClick={item.onClick}
                        >
                          {item.name}
                          </button>
                      </div>
                    );
                  })
                }
               </>
              : 
              (
                <>
                <h4 style={{color:'white',margin:0,marginBottom:10}}>Select Objects</h4>
                {
                  objectImages.map((item)=>{
                    return(
                        <div
                            style={{
                              width: "105%",
                              height: "27%",
                              cursor: "pointer",
                              margin: 5,
                              zIndex:1000,
                              backgroundColor:`${colors.white}`
                            }}
                            onClick={() => create_object_node(item.gltf,item.rotation,item.scale,item.position,item.modelId)}
                        >
                            <img
                              style={{
                                  zIndex:1000,
                                  borderRadius: 10,
                              }}
                              src={item.png}
                              crossOrigin="anonymous"
                              height="100%"
                              width="100%"
                            />
                        </div>
                    )
                  })
                }
                </>
               ) 
             )
           }
          </div>
        )} 
        {/* Content */}
        {
          <div
            style={{
              height: "100%",
              flex: 9,
              justifyContent: "center",
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {currentlySelected != null && (
              <a-scene  embedded inspector={true} vr-mode-ui="enabled: false">
                <a-assets>
                  <img
                    crossOrigin="anonymous"
                    id="myImage"
                    src={currentlySelected}
                  />
                   {/* <img
                    crossOrigin="anonymous"
                    id="myImage"
                    src={"https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf"}
                  /> */}
                  <a-asset-item id="tree" src="https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf"></a-asset-item>
                   {/* <img id="elephant" crossOrigin="anonymous" src="../../Constants/Images/ele.png"></img> */}
                  {/* <a-asset-item id="mario-obj" src={allObjStack[allObjStack.length-1]}></a-asset-item>
                  <a-asset-item id="mario-mtl" src="../../Constants/Images/mario/mario-sculpture.mtl"></a-asset-item> */}
                </a-assets> 
                {
                  // currentlySelectedImageType!='Env'
                  // && 
                  // <a-entity obj-model="obj: #mario-obj; mtl: #mario-mtl"></a-entity>
                } 
                    <a-sky
                      id="backgroundEnv"
                      material="src: #myImage "
                      rotation="0 0 0"
                      
                      
                      // rotation="0 50 0"
                      // width="16" //"19.5"
                      // height= "6"  //"11.6"
                    ></a-sky>
                <a-camera id="camera" look-controls="enabled:false"></a-camera>
             
                  
              </a-scene>
            )}

            <div 
                style={{
                    position:'absolute',
                    right:'5%',
                    bottom:'10%',
                    backgroundColor:colors.lightPurple,
                    borderRadius:40,
                    height:'40px',  
                    minWidth:'40px',
                    overflow:'hidden',
                    padding:10
                }}
            >
              {/* <div style={{backgroundColor:'red'}}> */}
                    
                      <p
                          onClick={
                            ()=>{
                              alert('hi')
                            }
                          }
                          style={{
                            cursor:'pointer',
                            margin: 0,
                            marginTop:'-20px',
                            marginBottom:'15px',
                            // display:'inline-block',
                            // marginLeft:15
                            transform:' rotate(270deg)',
                            color:'white'
                          }}
                        >
                          &#10148;
                      </p> 
                            
                      <p 
                        onClick={()=>{
                           const objModel=document.getElementById('backgroundEnv'); 
                            const currentRotation=objModel.getAttribute('rotation');
                            
                            aFrameFunctions.rotateClockwise(objModel,currentRotation.y);
                        }}
                        style={{
                            margin: 0,display:'inline-block',
                            /* transform: rotate(180deg); */
                            transform:'scaleX(-1)',
                            cursor:'pointer',
                            color:'white'
                          }}
                      >
                        &#10148;
                      </p>
               
                      <p
                      onClick={()=>{
                        const objModel=document.getElementById('backgroundEnv'); 
                        const currentRotation=objModel.getAttribute('rotation'); 
                        aFrameFunctions.rotateAntiClockwise(objModel,currentRotation.y);
                      }}  
                        style={{
                          margin: 0,
                          display:'inline-block',
                          marginLeft:'22px',
                          /* transform: rotate(180deg); */
                          cursor:'pointer',
                          color:'white'
                        }}
                      >
                       &#10148;
                     </p> 
                    
                     <p
                        style={{
                          margin: 0,
                          // display:'inline-block',
                          // marginLeft:15
                           transform:'rotate(90deg)',
                           marginTop:'12px',
                           marginBottom:'-20px',
                           cursor:'pointer',
                           marginLeft:'5px',
                           color:'white'
                        }}
                      >
                       &#10148;
                     </p>
              {/* </div> */}
            </div>
          </div>
        }
    
      </div>
    </div>
  );
}

export default Demo;

{
  /* <div>
   <a-scene>
    <a-entity geometry="primitive: box" material="shader: html; target: #htmlElement"></a-entity>
   </a-scene>

  <div style= {{    width: '100%', height: '100%', position: 'fixed', left: 0, top: 0, zIndex: -1, overflow: 'hidden'}} >
    <div id="htmlElement" style= {{background: 'pink', color: '#000', fontSize: 48  }}>Hello, HTML!</div>
  </div>
</div> */
}
{
  /* <a-assets>
        <img
          id="myImage"
          src="https://t4.ftcdn.net/jpg/02/69/09/47/360_F_269094752_2ZHgmHRgtMRHQCfye0floFYJORXlcWuU.jpg"
        />
      </a-assets>

      <a-plane
        material="src: #myImage"
        position="0 0 -5"
        rotation="360 360 0"
        width="19.5"
        height="11.6"
      ></a-plane> */
}
