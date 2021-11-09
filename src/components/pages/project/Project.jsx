import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDebounce } from "react-use";
import { useProjectCTX, useProjectsCTX } from "../../../services/hooks";
import AuthenticatedPageContainer from "../../utilities/AuthenticatedPageContainer";
import ProjectEditor from "./ProjectEditor";
import ProjectNav from "./ProjectNav";
import ProjectViewer from "./ProjectViewer";

export default function Project() {
  const [saving, setSaving] = useState(false);
  const { projects } = useProjectsCTX();
  const tools = useProjectCTX();
  const { pageId, projectId } = useParams();
  const activeProject = projects?.find(pj => pj.id === projectId);
  const activePage = activeProject.pages.find(pg => pg.id === pageId);
  useEffect(() => {
    if (projectId) {
      tools.setProject(activeProject);
    }
  }, [projectId]);
  // useEffect(() => {
  //   setActivePage(activeProject.pages.find(pg => pg.id === pageId));
  // }, [pageId]);

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
      <div>
        <div className='grid--gap'>
          <aside className='project__section col--2'>
            <h2 className='project__section__title'>Project</h2>
            {activePage ? <ProjectNav /> : null}
          </aside>
          <section className='project__section col--5'>
            <h2 className='project__section__title'>Project Editor</h2>
            {activePage ? (
              <ProjectEditor tools={tools} page={activePage} />
            ) : null}
          </section>
          <section className='project__section col--5'>
            <h2 className='project__section__title'>Project Viewer</h2>
            {activePage ? <ProjectViewer page={activePage} /> : null}
          </section>
        </div>
      </div>
    </AuthenticatedPageContainer>
  );
}
