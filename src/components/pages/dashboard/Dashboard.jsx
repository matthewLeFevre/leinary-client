import randomId from "random-id";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useProjectCTX, useProjectsCTX } from "../../../services/hooks";
import { useRequest } from "../../../services/useRequest";
import Button from "../../common/Button";
import AuthenticatedPageContainer from "../../utilities/AuthenticatedPageContainer";

export default function Dashboard() {
  const { projects, setProjects } = useProjectsCTX();
  const [projectName, setProjectName] = useState("");
  useEffectOnce(async () => {
    const result = await fetch("http://localhost:3333/projects");
    const json = await result.json();
    setProjects(json.data);
  });
  const request = useRequest();
  const newProject = async e => {
    e.preventDefault();
    if (projectName !== "") {
      const result = await request({
        method: "post",
        path: "/projects",
        data: { name: projectName },
      });
      setProjectName("");
      setProjects(prev => [...prev, result.data]);
      console.log(result);
    }
  };
  return (
    <AuthenticatedPageContainer>
      <h2>Dashboard</h2>
      <form onSubmit={newProject}>
        <input
          type='text'
          onChange={e => setProjectName(e.target.value)}
          value={projectName}
        />
        <Button type='submit'>New Project</Button>
      </form>
      <div>
        <ol>
          {projects?.map(pj => (
            <li key={pj.id}>
              <DashboardProject project={pj} />
            </li>
          ))}
        </ol>
      </div>
    </AuthenticatedPageContainer>
  );
}

function DashboardProject({ project }) {
  const { setProjects } = useProjectsCTX();
  const request = useRequest();
  const onDelete = async () => {
    const res = await request({
      method: "delete",
      path: `/projects/${project.id}`,
    });
    setProjects(res.data);
  };
  return (
    <div>
      <Link to={`/project/${project.id}/page/${project.pages[0].id}`}>
        {project.name}
      </Link>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
