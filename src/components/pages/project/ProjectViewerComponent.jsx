import React, { useState } from "react";
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
    <MarkdownHighlighter content={component.content} />
  </div>
);
const EndpointComponent = function ({ component }) {
  const [tab, setTab] = useState("DESCRIPTION");
  const [open, setOpen] = useState(false);
  return (
    <div className='project-viewer__endpoint-component'>
      <div className='project-viewer__endpoint-component__path'>
        <span
          className={`project-viewer__endpoint-component__http-verb ${component.httpVerb}`}
        >
          {component.httpVerb}
        </span>
        <code>{component.path}</code>
        <button
          className='project-viewer__endpoint-component__toggle'
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? "Close Details" : "View Details"}
        </button>
      </div>
      <div className={`${!open && "hide"}`}>
        <div>
          {component?.content ? (
            <label
              onClick={() => setTab("DESCRIPTION")}
              className={`project-viewer__endpoint-component__tab ${
                tab === "DESCRIPTION" ? "active" : ""
              }`}
            >
              Description
            </label>
          ) : null}
          {component?.requestExample ? (
            <label
              onClick={() => setTab("REQUEST")}
              className={`project-viewer__endpoint-component__tab ${
                tab === "REQUEST" ? "active" : ""
              }`}
            >
              Request
            </label>
          ) : null}
          {component?.responseExample ? (
            <label
              onClick={() => setTab("RESPONSE")}
              className={`project-viewer__endpoint-component__tab ${
                tab === "RESPONSE" ? "active" : ""
              }`}
            >
              Response
            </label>
          ) : null}
        </div>
        <div className='project-viewer__endpoint-component__content'>
          {component?.content ? (
            <FadeIn visible={tab === "DESCRIPTION"}>
              <MarkdownHighlighter content={component.content} />
            </FadeIn>
          ) : null}
          {component?.responseExample ? (
            <FadeIn visible={tab === "REQUEST"}>
              <MarkdownHighlighter content={component.requestExample} />
            </FadeIn>
          ) : null}
          {component?.responseExample ? (
            <FadeIn visible={tab === "RESPONSE"}>
              <MarkdownHighlighter content={component.responseExample} />
            </FadeIn>
          ) : null}
        </div>
      </div>
    </div>
  );
};
const FigureComponent = ({ component }) => (
  <figure>
    <img src={component.imgResource} />
    <figcaption>{component.content}</figcaption>
  </figure>
);

const fade = ({ trigger }) => {};

const FadeIn = ({ visible = true, children }) => (
  <div className={`fade-in ${visible ? "visible" : "hidden"}`}>{children}</div>
);
