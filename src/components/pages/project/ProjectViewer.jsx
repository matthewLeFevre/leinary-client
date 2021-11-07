import React from "react";
import ProjectViewerComponent from "./ProjectViewerComponent";

export default function ProjectViewer({ page }) {
  return (
    <div>
      <div className='project-viewer__components'>
        {page?.components.map(cp => (
          <ProjectViewerComponent key={cp.id} component={cp} />
        ))}
      </div>
    </div>
  );
}
