import { useState } from "react";
import Router from "./components/utilities/Router";
import {
  ProjectContext,
  ProjectsContext,
  UserContext,
} from "./services/contexts";
// import { socket, SocketContext } from "./services/contents";
import "./styles/App.scss";

function App() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <ProjectContext.Provider value={{ project, setProject }}>
          <Router />
        </ProjectContext.Provider>
      </ProjectsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
