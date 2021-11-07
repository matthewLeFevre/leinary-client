import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Router from "./components/utilities/Router";
import {
  ProjectContext,
  ProjectsContext,
  UserContext,
} from "./services/contexts";
import { useProject, useProjects } from "./services/hooks";
// import { socket, SocketContext } from "./services/contents";
import "./styles/App.scss";

function App() {
  const project = useProject();
  const projects = useProjects([
    {
      name: "New Project",
      pages: [
        {
          id: "1234",
          name: "New Page",
          components: [],
          order: 0,
        },
      ],
      status: "PRIVATE",
      id: "1234",
    },
  ]);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProjectsContext.Provider value={projects}>
        <ProjectContext.Provider value={project}>
          <Router />
        </ProjectContext.Provider>
      </ProjectsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
