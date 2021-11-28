import randomId from "random-id";
import { safePushToIndex } from "../arrayUtil";

export default function addTextComponent(project, page, newComponentOrder) {
  const newProject = { ...project };
  const order = newComponentOrder || page.components.length;
  page.components = safePushToIndex(
    page.components,
    {
      id: randomId(),
      order,
      content: "New Text Component",
      type: "TEXT",
    },
    order
  );
  newProject.pages[page.order] = page;
  return newProject;
}
