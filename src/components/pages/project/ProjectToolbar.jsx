import React from "react";

export default function ProjectToolbar({ setOpenWindows }) {
  return (
    <div className='project-toolbar'>
      <button
        className='project-toolbar__btn'
        onClick={() => setOpenWindows("editor")}
      >
        Editor
      </button>
      <button
        className='project-toolbar__btn'
        onClick={() => setOpenWindows("both")}
      >
        Both
      </button>
      <button
        className='project-toolbar__btn'
        onClick={() => setOpenWindows("viewer")}
      >
        Viewer
      </button>
    </div>
  );
}
