import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownHighlighter from "../../utilities/MarkdownHighlighter";

export default function ProjectViewerComponent({ component }) {
  switch (component.type) {
    case "TEXT":
      return <TextComponent component={component} />;
    case "TITLE":
      return <TitleComponent component={component} />;
    case "FIGURE":
      return <FigureComponent component={component} />;
    case "ENDPOINT":
      return <EndpointComponent component={component} />;
    default:
      return <div>{component.type}</div>;
  }
}

const TitleComponent = ({ component }) => {
  console.log(component.level === 4);
  switch (parseInt(component.level)) {
    case 2:
      return <h2>{component.content}</h2>;
    case 3:
      return <h3>{component.content}</h3>;
    case 4:
      return <h4>{component.content}</h4>;
    case 5:
      return <h5>{component.content}</h5>;
    default:
      return <h1>{component.content}</h1>;
  }
};
const TextComponent = ({ component }) => (
  <div className='project-viewer__text-component'>
    <MarkdownHighlighter>{component.content}</MarkdownHighlighter>
  </div>
);
const EndpointComponent = ({ component }) => (
  <div>
    <div>
      <span>{component.httpVerb}</span>
      {component.path}
    </div>
    <label>Description</label>
    <MarkdownHighlighter>{component.content}</MarkdownHighlighter>
    <label>Response Example:</label>
    <MarkdownHighlighter>{component.responseExample}</MarkdownHighlighter>
    {component.requestExample ? (
      <>
        <label>Request Example</label>
        <MarkdownHighlighter>{component.requestExample}</MarkdownHighlighter>
      </>
    ) : null}
  </div>
);
const FigureComponent = ({ component }) => (
  <figure>
    <img src={component.imgResource} />
    <figcaption>{component.content}</figcaption>
  </figure>
);
