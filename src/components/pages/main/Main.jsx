import React from "react";
import { useProjectCTX } from "../../../services/hooks";
import Page from "./Page";
import Editor from "./Editor";
import Viewer from "./Viewer";

export default function Main() {
  const tools = useProjectCTX();

  return (
    <div>
      <h1>{project.name}</h1>
      <button onClick={() => addPage()}>Add Project</button>
      <ol>
        {pages.map(page => (
          <Page page={page} key={page.id} />
        ))}
      </ol>
      <Editor />
      <Viewer />
    </div>
  );
}
