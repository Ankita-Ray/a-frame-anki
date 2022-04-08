import React from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { Demo, Hello_WebVR,Image360, Model_Viewer, ResponsiveUi } from "../AframeExamples";
 
import { links } from '../Constants/Strings';
import Home from '../Home';

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path={`${links.webVR}`} element={<Hello_WebVR />} />
        <Route path={`${links.modelViewer}`} element={<Model_Viewer />} />
        <Route path={`${links.responsiveUI}`} element={<ResponsiveUi />} />
        <Route path={`${links.Image360}`} element={<Image360 />} />
        <Route path={`${links.demo}`} element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation

