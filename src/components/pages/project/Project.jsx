import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDebounce } from "react-use";
import { useProjectCTX, useProjectsCTX } from "../../../services/hooks";
import AuthenticatedPageContainer from "../../utilities/AuthenticatedPageContainer";
import ProjectEditor from "./ProjectEditor";
import ProjectNav from "./ProjectNav";
import ProjectToolbar from "./ProjectToolbar";
import ProjectViewer from "./ProjectViewer";

export default function Project() {
  const [saving, setSaving] = useState(false);
  const { projects } = useProjectsCTX();
  const tools = useProjectCTX();
  const { pageId, projectId } = useParams();
  const activeProject = projects?.find(pj => pj.id === projectId);
  const activePage = activeProject.pages.find(pg => pg.id === pageId);
  const [openWindows, setOpenWindows] = useState("both"); // editor, viewer, both
  useEffect(() => {
    if (projectId) {
      tools.setProject(activeProject);
    }
  }, [projectId]);

  const saveProject = async () => {
    setSaving(true);
    await fetch(`http://localhost:3333/projects/${tools.project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: tools.project }),
    });
    setSaving(false);
  };
  useDebounce(saveProject, 3000, [tools.project]);
  return (
    <AuthenticatedPageContainer>
      <ProjectToolbar setOpenWindows={setOpenWindows} />
      <div className='project'>
        <aside className='project__nav project__section col--2'>
          <div className='project__section__title'>Pages</div>
          {activePage ? <ProjectNav /> : null}
        </aside>
        <div className='grid--gap project__body'>
          <section
            className={`project__section ${
              openWindows === "editor"
                ? "col--12"
                : openWindows === "both"
                ? "col--6"
                : "hide"
            }`}
          >
            <div className='project__section__title'>Editor</div>
            {activePage ? (
              <ProjectEditor tools={tools} page={activePage} />
            ) : null}
          </section>
          <section
            className={`project__section ${
              openWindows === "viewer"
                ? "col--12"
                : openWindows === "both"
                ? "col--6"
                : "hide"
            }`}
          >
            <div className='project__section__title'>Viewer</div>
            {activePage ? <ProjectViewer page={activePage} /> : null}
          </section>
        </div>
      </div>
    </AuthenticatedPageContainer>
  );
}
