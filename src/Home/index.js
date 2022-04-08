import React from "react";
import { Link } from "react-router-dom";
import { exampleLists, headers, links } from "../Constants/Strings";
import { listStyle } from "./styles";

function Home() {
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      {/* Wrapper Start */}

      {/* Header Start */}
      <div>
        <h1>{headers.frameExample}</h1>
      </div>
      {/* Header Start*/}

      {/* List of examples Start */}
      <div>
        <ul>
          {/* webVR */}
          <li style={listStyle}>
            <Link to={`/${links.webVR}`}>{exampleLists.webVR}</Link>
          </li>

          {/* modelViewer */}
          <li style={listStyle}>
            <Link to={`/${links.modelViewer}`}>{exampleLists.modelViewer}</Link>
          </li>

          {/* responsiveUI */}
          <li style={listStyle}>
            <Link to={`/${links.responsiveUI}`}>
              {exampleLists.responsiveUI}
            </Link>
          </li>

          {/* Image360 */}
          <li style={listStyle}>
            <Link to={`/${links.Image360}`}>{exampleLists.Image360}</Link>
          </li>

          {/* demo */}
          <li style={listStyle}>
            <Link to={`/${links.demo}`}>{exampleLists.demo}</Link>
          </li>
        </ul>
      </div>
      {/* List of examples Start */}

      {/* Wrapper Start */}
    </div>
  );
}

export default Home;
