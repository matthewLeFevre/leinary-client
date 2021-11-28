import randomId from "random-id";
import { safePushToIndex } from "../arrayUtil";

export default function addEndpointComponent(project, page, newComponentOrder) {
  const newProject = { ...project };
  const order = newComponentOrder || page.components.length;
  page.components = safePushToIndex(
    page.components,
    {
      id: randomId(),
      order,
      content: "New Endpoint Component",
      httpVerb: "GET",
      responseExample: "",
      requestExample: "",
      path: "http://localhost",
      type: "ENDPOINT",
    },
    order
  );
  newProject.pages[page.order] = page;
  return newProject;
}
