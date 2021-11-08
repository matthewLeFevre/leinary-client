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
  const [activePage, setActivePage] = useState(
    tools?.pages?.find(p => p.id === pageId)
  );
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
  useEffect(() => {
    const activeProject = projects?.find(pj => pj.id === projectId);
    if (projectId) {
      tools.setProject(activeProject);
    }
    if (pageId) {
      setActivePage(activeProject?.pages?.find(p => p.id === pageId));
    }
  }, [projectId, pageId]);
  useDebounce(saveProject, 3000, [tools.project]);
  useEffect(() => {}, [pageId]);
  return (
    <AuthenticatedPageContainer>
      <div>
        <div className='grid--gap'>
          <aside className='project__section col--2'>
            <h2 className='project__section__title'>Project</h2>
            <ProjectNav />
          </aside>
          <section className='project__section col--5'>
            <h2 className='project__section__title'>Project Editor</h2>
            <ProjectEditor tools={tools} page={activePage} />
          </section>
          <section className='project__section col--5'>
            <h2 className='project__section__title'>Project Viewer</h2>
            <ProjectViewer page={activePage} />
          </section>
        </div>
      </div>
    </AuthenticatedPageContainer>
  );
}
