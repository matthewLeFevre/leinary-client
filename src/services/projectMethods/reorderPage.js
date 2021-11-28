import { safeReorderByIndex } from "../arrayUtil";

export default function reorderPage(project, page, desiredIndex) {
  const newProject = { ...project };
  newProject.pages = safeReorderByIndex(project.pages, page, desiredIndex);
  return newProject;
}
