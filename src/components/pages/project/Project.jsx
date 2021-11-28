import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAsync, useDebounce } from "react-use";
import { useProjectCTX, useProjectsCTX } from "../../../services/contexts";
import { request } from "../../../services/request";

import AuthenticatedPageContainer from "../../utilities/AuthenticatedPageContainer";
import ProjectEditor from "./ProjectEditor";
import ProjectNav from "./ProjectNav";
import ProjectToolbar from "./ProjectToolbar";
import ProjectViewer from "./ProjectViewer";

export default function Project() {
  const [saving, setSaving] = useState(false);
  const { project, setProject } = useProjectCTX();
  const { pageId, projectId } = useParams();
  // const activeProject = projects?.find(pj => pj.id === projectId);
  const activeProject = {};
  // const activePage = activeProject.pages.find(pg => pg.id === pageId);
  const [activePage, setActivePage] = useState({});
  const [openWindows, setOpenWindows] = useState("both"); // editor, viewer, both
  useAsync(async () => {
    if (!project.id || project.id !== projectId) {
      const result = await request({
        method: "GET",
        path: `/projects/${projectId}`,
      });
      setProject(result.data);
    }
  }, [projectId]);
  useEffect(() => {
    if (project.id) {
      setActivePage(project.pages.find(pg => pg.id === pageId));
    }
  }, [project.id, pageId]);
  useEffect(() => {
    console.log("project", project);
  }, [project]);
  useEffect(() => {
    console.log("active page", activePage);
  }, [activePage]);

  const saveProject = async () => {
    setSaving(true);
    await fetch(`http://localhost:3333/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: project }),
    });
    setSaving(false);
  };
  useDebounce(saveProject, 3000, [project]);
  if (!project.id) return <div>...loading</div>;
  return (
    <AuthenticatedPageContainer>
      <ProjectToolbar setOpenWindows={setOpenWindows} />
      <div className='project'>
        <aside className='project__nav project__section col--2'>
          <div className='project__section__title'>Pages</div>
          {activePage ? <ProjectNav {...{ project, setProject }} /> : null}
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
              <ProjectEditor {...{ project, setProject }} page={activePage} />
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
