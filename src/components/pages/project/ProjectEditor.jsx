import React, { Fragment } from "react";
import ProjectEditorComponent from "./ProjectEditorComponent";

export default function ProjectEditor({ tools, page }) {
  const {
    addTitleComponent,
    addTextComponent,
    addEndpointComponent,
    addFigureComponent,
    deleteComponent,
    updateComponent,
  } = tools;
  return (
    <div>
      <div className='project-editor__components'>
        {page?.components.map(cp => (
          <Fragment key={cp.id}>
            <ProjectEditorComponent
              key={cp.id}
              component={cp}
              onDelete={() => deleteComponent(page.id, cp.id)}
              updateComponent={updateComponent}
            />
            <hr />
          </Fragment>
        ))}
        <div>
          {/* <button type='button' onClick={() => addTitleComponent(page?.id)}>
            Add Title
          </button> */}
          <button type='button' onClick={() => addTextComponent(page?.id)}>
            Add Text
          </button>
          <button type='button' onClick={() => addEndpointComponent(page?.id)}>
            Add Endpoint
          </button>
          <button type='button' onClick={() => addFigureComponent(page?.id)}>
            Add Figure
          </button>
        </div>
      </div>
    </div>
  );
}
