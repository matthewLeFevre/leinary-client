export default function updatePage(project, pageWithUpdates) {
  const newProject = { ...project };
  newProject.pages[pageWithUpdates.order] = pageWithUpdates;
  return newProject;
}
