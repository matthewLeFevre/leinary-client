import randomId from "random-id";
import { safePushToIndex } from "../arrayUtil";

export default function addFigureComponent(project, page, newComponentOrder) {
  const newProject = { ...project };
  const order = newComponentOrder || page.components.length;
  page.components = safePushToIndex(
    page.components,
    {
      id: randomId(),
      order,
      content: "New Figure Component",
      videoResource: null,
      imgResource:
        "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png",
      type: "FIGURE",
    },
    order
  );
  newProject.pages[page.order] = page;
  return newProject;
}
