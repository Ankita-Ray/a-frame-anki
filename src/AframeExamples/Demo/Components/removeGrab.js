// window.addEventListener('DOMContentLoaded', (e) => { 
//     // if (alreadyAttached) return;
//     let assets = document.querySelector('a-assets');

//     console.log(assets,'assets created or not its value');

//     if (!assets)
//     {
//       assets = document.createElement('a-assets');
//       var image = document.createElement('img');

//       document.querySelector('a-scene').append(image)
//     }
    
//     if (assets.hasLoaded)
//     {
//       console.warn("Assets already loaded. May lead to bugs")
//     }
    
//     let streetMix = document.createElement('streetmix-assets')
//     assets.append(streetMix)
//   });