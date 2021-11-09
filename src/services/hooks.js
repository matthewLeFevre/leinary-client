import { useContext, useState } from "react";
// import { SocketContext } from "./contents";
import randomId from "random-id";
import {
  getItemById,
  removeAndReorder,
  safePushToIndex,
  safeReorderByIndex,
} from "./arrayUtil";
import { ProjectContext, UserContext, ProjectsContext } from "./contexts";

// export function useSocket() {
//   return useContext(SocketContext);
// }

export function useProjectCTX() {
  return useContext(ProjectContext);
}

export function useProjectsCTX() {
  return useContext(ProjectsContext);
}

export function useProjects(initialProjects) {
  const [projects, setProjects] = useState(initialProjects);

  return { projects, setProjects };
}

export function useUser() {
  return useContext(UserContext);
}

export function useProject(
  initialProject = {
    name: "New Project",
    pages: [
      {
        id: randomId(),
        name: "New Page",
        components: [],
        order: 0,
      },
    ],
    status: "PRIVATE",
    id: randomId(),
  }
) {
  const [project, setProject] = useState(initialProject);
  const keyChange = (key, value) => {
    setProject(prevProject => {
      const newProject = { ...prevProject, [key]: value };
      return newProject;
    });
  };
  const addPage = (order = null) => {
    const trueOrder = order || project.pages.length;
    const page = {
      name: "New Page",
      components: [],
      order: trueOrder,
      id: randomId(),
    };
    const pages = safePushToIndex(project.pages, page, trueOrder);
    keyChange("pages", pages);
  };
  const deletePage = pageId => {
    const pages = removeAndReorder(project.pages, pageId);
    keyChange("pages", pages);
  };
  const updatePage = pageUpdates => {
    const pages = [...project.pages];
    const index = pages.findIndex(pg => pg.id === pageUpdates.id);
    pages[index] = pageUpdates;
    keyChange("pages", pages);
  };
  const reorderPage = (pageId, desiredIndex) => {
    const page = getItemById(project.pages, pageId);
    const reorderedPages = safeReorderByIndex(
      project.pages,
      page,
      desiredIndex
    );
    keyChange("pages", reorderedPages);
  };
  const addTitleComponent = (pageId, order = null) => {
    let page = getItemById(project.pages, pageId);
    const trueOrder = order || page?.components?.length;
    const title = {
      id: randomId(),
      order: trueOrder,
      content: "New Title",
      type: "TITLE",
      level: 1,
    };
    page.components = safePushToIndex(page?.components, title, trueOrder);
    keyChange("pages", project.pages);
  };
  const addTextComponent = (pageId, order = null) => {
    let page = getItemById(project.pages, pageId);
    const trueOrder = order || page.components.length;
    const text = {
      id: randomId(),
      order: trueOrder,
      content: "New Text",
      type: "TEXT",
    };
    page.components = safePushToIndex(page.components, text, trueOrder);
    keyChange("pages", project.pages);
  };
  const addFigureComponent = (pageId, order = null) => {
    let page = getItemById(project.pages, pageId);
    const trueOrder = order || page.components.length;
    const figure = {
      id: randomId(),
      order: trueOrder,
      content: "New Text",
      videoResource: null,
      imgResource:
        "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png",
      type: "FIGURE",
    };
    page.components = safePushToIndex(page.components, figure, trueOrder);
    keyChange("pages", project.pages);
  };
  const addEndpointComponent = (pageId, order = null) => {
    let page = getItemById(project.pages, pageId);
    const trueOrder = order || page.components.length;
    const endpoint = {
      id: randomId(),
      order: trueOrder,
      content: "New Endpoint",
      httpVerb: "GET",
      responseExample: "",
      requestExample: "",
      type: "ENDPOINT",
      path: "http://localhost",
    };
    page.components = safePushToIndex(page.components, endpoint, trueOrder);
    keyChange("pages", project.pages);
  };
  const deleteComponent = (pageId, componentId) => {
    let page = getItemById(project.pages, pageId);
    page.components = removeAndReorder(page.components, componentId);
    keyChange("pages", project.pages);
  };
  const updateComponent = (pageId, component) => {
    let page = getItemById(project.pages, pageId);
    let componentIndex = page.components.findIndex(
      cp => cp.id === component.id
    );
    page.components[componentIndex] = component;
    keyChange("pages", project.pages);
  };

  return {
    project,
    setProject,
    pages: project?.pages,
    keyChange,
    addPage,
    updatePage,
    reorderPage,
    deletePage,
    addTitleComponent,
    addTextComponent,
    addFigureComponent,
    addEndpointComponent,
    deleteComponent,
    updateComponent,
  };
}
