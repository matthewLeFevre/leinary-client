import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { useParams } from "react-router";
import gripImage from "../../../assets/grip-vertical.svg";
import close from "../../../assets/close.svg";
import { Draggable } from "react-beautiful-dnd";
import { useProjectCTX } from "../../../services/contexts";
import updatePage from "../../../services/projectMethods/updatePage";
import deletePage from "../../../services/projectMethods/deletePage";

export default function ProjectPage({ page }) {
  const { projectId, pageId } = useParams();
  const { project, setProject } = useProjectCTX();
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  useClickAway(inputRef, () => {
    if (edit) {
      setEdit(false);
    }
  });
  const onChangeName = e => {
    const newPage = { ...page, name: e.target.value };
    setProject(updatePage(project, newPage));
  };
  const onKeyUp = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEdit(false);
    }
  };
  return (
    <Draggable draggableId={page.id} index={parseInt(page.order)}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`project-nav__page ${pageId === page.id ? "active" : ""}`}
        >
          <div
            {...provided.dragHandleProps}
            className='project-nav__page-grip'
            title='Change Page Order'
          >
            <img src={gripImage} />
          </div>
          {!edit ? (
            <>
              <Link
                title='Double click to change page title'
                onDoubleClick={() => setEdit(true)}
                to={`/project/${projectId}/page/${page.id}`}
              >
                {page.name}
              </Link>
              <button
                className='project-nav__page-button'
                onClick={() => deletePage(project, page.id)}
                title='Delete Page'
              >
                <img src={close} />
              </button>
            </>
          ) : (
            <input
              onKeyUp={onKeyUp}
              value={page.name}
              onChange={onChangeName}
              ref={inputRef}
            />
          )}
        </li>
      )}
    </Draggable>
  );
}
