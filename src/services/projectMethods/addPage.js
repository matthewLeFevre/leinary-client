import randomId from "random-id";
import { safePushToIndex } from "../arrayUtil";

export function addPage(project, newPageOrder) {
  const newProject = { ...project };
  const order = newPageOrder || project.pages.length;
  const page = {
    name: "New Page",
    components: [],
    order,
    id: randomId(),
  };
  newProject.pages = safePushToIndex(project.pages, page, order);
  return newProject;
}
