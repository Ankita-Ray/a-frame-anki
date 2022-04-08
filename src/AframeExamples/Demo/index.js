import React, { useEffect, useState } from "react";
import "aframe-html-shader";
import "aframe";
import {   backgroundImages, colors, headers, height,   } from "../../Constants/Strings";
import { styles } from "./style";
import './Components/removeGrab'; 
// import "aframe-physics-components";
function Demo() {
  const objectImages = [
    // "https://c4.wallpaperflare.com/wallpaper/501/784/3/earth-planet-sky-moon-wallpaper-preview.jpg",
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUjqocno2qzsargI1TtsIwOeErHZu_I3mw9Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc00dLT_OZREEUihVhq1jjOCBag_43a3mbzQ&usqp=CAU',
    '../../Constants/Images/ele.png'
  ];
  

  const [imageGallery, setimageGallery] = useState([]); //images to render on imagePallete
  const [buttonState, setButtonState] = useState(null);//which button to render
  const [allObjStack, setAllObjSelected] = useState([]); // stack of selected/clicked Object image
  const [showImagePalatte, setShowImagePalatte] = useState(false); // state to toggle image pallete
  const [currentlySelected, setCurrentlySelected] = useState(null); //currently selected backgroundImage 
  const [currentlySelectedImageType, setCurrentlySelectedImageType] = useState(null); //currently selected backgroundImage 
  
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
          setimageGallery(objectImages),
          setButtonState(index),
          setCurrentlySelectedImageType('Actions')
        );
      },
    },
  ];
  const actionButtons=[
    {
      name:'Flip Vertically',
      onClick:()=>{
        document.querySelector('')
      }
    }
  ];
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
    const ele=document.querySelector('a-plane');
    ele.setAttribute("material",`src:${url}` );
 };// a-plane image url update on dynamic click of background image
 const create_object_node=(url)=>{
  const scene=document.querySelector('a-scene');
  const entity1=document.createElement('a-entity'); 
  entity1.setAttribute('layer',`type: quad; src: ${require(url)}`);
  entity1.setAttribute('position',`0 1.8 -1`);
  entity1.setAttribute('id','objEntity');
  entity1.setAttribute('scale','6.220 3.440 1.170')
  scene.appendChild(entity1);
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
              // overflow:'scroll'
            }}
          >
            <input
              style={{ paddingLeft: 60 }}
              type="file"
              name="uploadImage"
              onChange={(event) => onImageChange(event)}
            />

            {
              currentlySelectedImageType == 'Env' ?
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
             : 
             (
              currentlySelectedImageType == 'Actions'
              ?
              actionButtons.map((item) => {
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
              : 
              <div
                style={{
                  width: "75%",
                  height: "27%",
                  cursor: "pointer",
                  margin: 20,
                  zIndex:1000,
                  backgroundColor:`${colors.white}`
                }}
                onClick={() => create_object_node('../../Constants/Images/ele.png')}
                
              >
                <img
                  style={{
                      zIndex:1000,
                      borderRadius: 10,
                  }}
                  src={  require('../../Constants/Images/ele.png')  }
                  crossOrigin="anonymous"
                  height="100%"
                  width="100%"
                />
              </div>
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
              <a-scene embedded inspector={true} vr-mode-ui="enabled: false">
                <a-assets>
                  <img
                    crossOrigin="anonymous"
                    id="myImage"
                    src={currentlySelected}
                  />
                   <img id="elephant" crossOrigin="anonymous" src="../../Constants/Images/ele.png"></img>
                  {/* <a-asset-item id="mario-obj" src={allObjStack[allObjStack.length-1]}></a-asset-item>
                  <a-asset-item id="mario-mtl" src="../../Constants/Images/mario/mario-sculpture.mtl"></a-asset-item> */}
                </a-assets>
               
                {
                  // currentlySelectedImageType!='Env'
                  // && 
                  // <a-entity obj-model="obj: #mario-obj; mtl: #mario-mtl"></a-entity>
                }
            

                    <a-plane
                      material="src: #myImage "
                      position="-0.8 1.5 -4.8"
                      rotation="360 360 0"
                      width="16" //"19.5"
                      height= "6"  //"11.6"
                    ></a-plane>
                <a-camera id="camera" look-controls="enabled:false"></a-camera>
             
                  
              </a-scene>
            )}
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
