import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { useProject, useProjectCTX } from "../../../services/hooks";
import { useParams } from "react-router";

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
  return (
    <li>
      {!edit ? (
        <>
          <Link
            onDoubleClick={() => setEdit(true)}
            to={`/project/${projectId}/page/${page.id}`}
          >
            {page.name}
          </Link>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={() => deletePage(page.id)}>Delete</button>
        </>
      ) : (
        <>
          <input value={page.name} onChange={onChangeName} ref={inputRef} />
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      )}
    </li>
  );
}
