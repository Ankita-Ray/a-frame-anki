
import { colors } from "../../Constants/Strings";

export const styles={
headerContainer:  {
    zIndex:1000,
    backgroundColor:`${colors.lightPurple}`,
    borderBottomWidth:1,
    borderBottomColor:`${colors.white}`,
    borderBottomStyle:'solid' ,
    zIndex:1, 
    boxShadow: `0px 6px 8px -2px rgba(191,191,191,0.75)`
   },
headerTextContainer:{
    justifyContent:'center',
    display:'flex',
    flexDirection:'row',
    color:`${colors.white}`,
} 

// container :{
//     display: 'grid',
//     gridTemplateColumns:'200px 1fr',
//     gridTemplateRows:'60px 1fr',
//     gap:'1em 1em',
//     gridAutoFlow:'row',
//     gridTemplateAreas:`"header header"
//     "sidebar content"
//    `
    
//   },
  
//   header :{ gridArea: 'header',backgroundColor:'yellow',width:'100%' },
  
//   footer :{ gridArea: 'footer' },
  
//   sidebar :{ gridArea: 'sidebar' },
  
//   content :{ gridArea: 'content' },
}