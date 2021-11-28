import React, { useState } from "react";
import AddIcon from "../../../assets/icons/add-black.svg";
import addEndpointComponent from "../../../services/projectMethods/addEndpointComponent";
import addFigureComponent from "../../../services/projectMethods/addFigureComponent";
import addTextComponent from "../../../services/projectMethods/addTextComponent";

export default function ProjectAddComponent({
  project,
  setProject,
  page,
  order,
}) {
  const [active, setActive] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div
        className={`project-add-component ${active ? "active" : ""}`}
        onClick={() => setActive(prev => !prev)}
      >
        <img src={AddIcon} />
      </div>
      <div className={`project-add-tooltip ${active ? "active" : ""}`}>
        <button
          type='button'
          onClick={() => {
            setActive(false);
            setProject(addTextComponent(project, page, order + 1));
          }}
        >
          Add Text
        </button>
        <button
          type='button'
          onClick={() => {
            setActive(false);
            setProject(addEndpointComponent(project, page, order + 1));
          }}
        >
          Add Endpoint
        </button>
        <button
          type='button'
          onClick={() => {
            setActive(false);
            setProject(addFigureComponent(project, page, order + 1));
          }}
        >
          Add Figure
        </button>
      </div>
    </div>
  );
}
