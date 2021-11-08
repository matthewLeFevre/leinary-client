import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { useProject, useProjectCTX } from "../../../services/hooks";
import { useParams } from "react-router";
import gripImage from "../../../assets/grip-lines-solid.svg";
import trash from "../../../assets/trash-solid.svg";
import { Draggable } from "react-beautiful-dnd";

export default function ProjectPage({ page }) {
  const { projectId } = useParams();
  const { deletePage, updatePage } = useProjectCTX();
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  useClickAway(inputRef, () => {
    console.log("editing");
    if (edit) {
      setEdit(false);
    }
  });
  useEffect(() => {
    if (edit) {
      // inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edit]);
  const onChangeName = e => {
    const newPage = { ...page, name: e.target.value };
    updatePage(newPage);
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
          className='project-nav__page'
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
                onClick={() => deletePage(page.id)}
                title='Delete Page'
              >
                <img src={trash} />
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
