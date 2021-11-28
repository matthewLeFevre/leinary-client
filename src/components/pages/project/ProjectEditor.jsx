import React, { Fragment, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import addEndpointComponent from "../../../services/projectMethods/addEndpointComponent";
import addFigureComponent from "../../../services/projectMethods/addFigureComponent";
import addTextComponent from "../../../services/projectMethods/addTextComponent";
import deleteComponent from "../../../services/projectMethods/deleteComponent";
import reorderComponent from "../../../services/projectMethods/reorderComponents";
import updateComponent from "../../../services/projectMethods/updateComponent";
import ProjectAddComponent from "./ProjectAddComponent";
import ProjectEditorComponent from "./ProjectEditorComponent";

export default function ProjectEditor({ project, setProject, page }) {
  const onDragEnd = useCallback(
    result => {
      const { destination, draggableId } = result;
      const component = page.components.find(cp => cp.id == draggableId);
      const updatedProject = reorderComponent(
        project,
        page,
        component,
        destination.index
      );
      setProject(updatedProject);
    },
    [page]
  );
  const onDeleteComponent = componentId => {
    setProject(deleteComponent(project, page, componentId));
  };
  const onUpdateComponent = component => {
    setProject(updateComponent(project, page, component));
  };
  return (
    <div>
      <DragDropContext {...{ onDragEnd }}>
        <Droppable droppableId='droppable-2'>
          {provided => (
            <div
              className='project-editor__components'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {page?.components?.map(cp => (
                <Fragment key={cp.id}>
                  <ProjectEditorComponent
                    key={cp.id}
                    component={cp}
                    onDelete={() => onDeleteComponent(cp.id)}
                    updateComponent={({ property, newValue, component }) => {
                      const newComponent = { ...component };
                      newComponent[property] = newValue;
                      onUpdateComponent(newComponent);
                    }}
                  />
                  <ProjectAddComponent
                    {...{ project, setProject, page }}
                    order={cp.order}
                  />
                </Fragment>
              ))}
              {provided.placeholder}
              <div>
                {/* <button type='button' onClick={() => addTitleComponent(page?.id)}>
            Add Title
          </button> */}
                <button
                  type='button'
                  onClick={() => setProject(addTextComponent(project, page))}
                >
                  Add Text
                </button>
                <button
                  type='button'
                  onClick={() =>
                    setProject(addEndpointComponent(project, page))
                  }
                >
                  Add Endpoint
                </button>
                <button
                  type='button'
                  onClick={() => setProject(addFigureComponent(project, page))}
                >
                  Add Figure
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
