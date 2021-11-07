import React from "react";
import { useProjectCTX } from "../../../services/hooks";
import ProjectPage from "./ProjectPage";

export default function ProjectNav() {
  const { pages, project, addPage } = useProjectCTX();
  const saveProject = async () => {
    await fetch(`http://localhost:3333/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project }),
    });
  };
  return (
    <div>
      <button onClick={() => addPage()}>Add Page</button>
      <button onClick={() => saveProject()}>Save Project</button>
      <ol>
        {pages?.map(page => (
          <ProjectPage page={page} key={page.id} />
        ))}
      </ol>
    </div>
  );
}
