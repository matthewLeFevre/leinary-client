import React, { useCallback } from "react";
import { useProjectCTX } from "../../../services/hooks";
import ProjectPage from "./ProjectPage";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function ProjectNav() {
  const { project, addPage, reorderPage } = useProjectCTX();

  const onDragEnd = useCallback((result, provided) => {
    const { destination, draggableId } = result;
    reorderPage(draggableId, destination.index);
  }, []);

  return (
    <div className='project-nav'>
      <DragDropContext
        {...{
          onDragEnd,
        }}
      >
        <Droppable droppableId='droppable-1'>
          {(provided, snapshot) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='project-nav__list'
            >
              {project.pages?.map(page => (
                <ProjectPage page={page} key={page.id} />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={() => addPage()}>Add Page</button>
    </div>
  );
}
