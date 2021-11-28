export default function updateComponent(project, page, componentWithUpdates) {
  const newProject = { ...project };
  page.components[componentWithUpdates.order] = componentWithUpdates;
  newProject.pages[page.order] = page;
  return newProject;
}
