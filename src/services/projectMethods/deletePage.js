import { removeAndReorder } from "../arrayUtil";

export default function deletePage(project, pageId) {
  const newProject = { ...project };
  newProject.pages = removeAndReorder(project.pages, pageId);
  return newProject;
}
