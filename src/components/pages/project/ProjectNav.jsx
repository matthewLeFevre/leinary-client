import React, { useCallback } from "react";

import ProjectPage from "./ProjectPage";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useProjectCTX } from "../../../services/contexts";
import reorderPage from "../../../services/projectMethods/reorderPage";
import { addPage } from "../../../services/projectMethods/addPage";

export default function ProjectNav() {
  const { project, setProject } = useProjectCTX();
  const onDragEnd = useCallback(
    (result, provided) => {
      const { destination, draggableId } = result;
      const page = project.pages.find(pg => pg.id === draggableId);
      setProject(reorderPage(project, page, destination.index));
    },
    [project]
  );
  const onAddPage = () => {
    setProject(addPage(project));
  };
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
              {project?.pages?.map(page => (
                <ProjectPage page={page} key={page.id} />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={onAddPage}>Add Page</button>
    </div>
  );
}
