import { safeReorderByIndex } from "../arrayUtil";

export default function reorderComponent(
  project,
  page,
  component,
  desiredIndex
) {
  const newProject = { ...project };
  page.components = safeReorderByIndex(
    page.components,
    component,
    desiredIndex
  );
  newProject.pages[page.order] = page;
  return newProject;
}
