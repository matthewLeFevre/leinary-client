import { removeAndReorder } from "../arrayUtil";

export default function deleteComponent(project, page, componentId) {
  const newProject = { ...project };
  page.components = removeAndReorder(page.components, componentId);
  newProject.pages[page.order] = page;
  return newProject;
}
