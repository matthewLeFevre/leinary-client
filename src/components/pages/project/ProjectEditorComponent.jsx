import React, { useState } from "react";
import { useParams } from "react-router";

export default function ProjectEditorComponent({
  component,
  onDelete,
  updateComponent,
}) {
  switch (component.type) {
    case "TEXT":
      return (
        <TextEditorComponent {...{ component, updateComponent, onDelete }} />
      );
    case "TITLE":
      return (
        <TitleEditorComponent {...{ component, updateComponent, onDelete }} />
      );
    case "FIGURE":
      return (
        <FigureEditorComponent {...{ component, updateComponent, onDelete }} />
      );
    case "ENDPOINT":
      return (
        <EndpointEditorComponent
          {...{ component, updateComponent, onDelete }}
        />
      );
    default:
      return <div>{component.type}</div>;
  }
}

function EndpointEditorComponent({ component, onDelete, updateComponent }) {
  const { pageId } = useParams();
  return (
    <div className='project-editor-component__endpoint'>
      <select
        value={component.httpVerb}
        onChange={e =>
          onUpdate({
            property: "httpVerb",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>
      <input
        type='text'
        value={component.path}
        onChange={e =>
          onUpdate({
            property: "path",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
      <textarea
        value={component.content}
        onChange={e =>
          onUpdate({
            property: "content",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
      <textarea
        value={component.responseExample}
        onChange={e =>
          onUpdate({
            property: "responseExample",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
      <textarea
        value={component.requestExample}
        onChange={e =>
          onUpdate({
            property: "requestExample",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
    </div>
  );
}

function FigureEditorComponent({ component, onDelete, updateComponent }) {
  const { pageId } = useParams();
  return (
    <div className='project-editor-component__figure'>
      <input
        type='text'
        value={component.imgResource}
        onChange={e =>
          onUpdate({
            property: "imgResource",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
      <textarea
        value={component.content}
        onChange={e =>
          onUpdate({
            property: "content",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
    </div>
  );
}

function TextEditorComponent({ component, onDelete, updateComponent }) {
  const { pageId } = useParams();
  const [height, setHeight] = useState(0);
  const adjustHeight = e => {
    console.log(e.target.scrollHeight);
    setHeight(
      e.target.scrollHeight > e.target.clientHeight ? e.target.scrollHeight : 0
    );
  };
  const processTab = e => {
    if (e.key == "Tab") {
      e.preventDefault();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      e.target.value =
        e.target.value.substring(0, start) +
        "\t" +
        e.target.value.substring(end);

      // put caret at right position again
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };
  return (
    <div className='project-editor-component__text'>
      <textarea
        style={{ height }}
        value={component.content}
        onKeyUp={adjustHeight}
        onKeyDown={processTab}
        onChange={e =>
          onUpdate({
            property: "content",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
    </div>
  );
}

function TitleEditorComponent({ component, onDelete, updateComponent }) {
  const { pageId } = useParams();
  return (
    <div className='project-editor-component__title'>
      <input
        type='text'
        value={component.content}
        onChange={e =>
          onUpdate({
            property: "content",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      />
      <select
        value={component.level}
        onChange={e =>
          onUpdate({
            property: "level",
            newValue: e.target.value,
            component,
            pageId,
            updateFunc: updateComponent,
          })
        }
      >
        <option value={1}>h1</option>
        <option value={2}>h2</option>
        <option value={3}>h3</option>
        <option value={4}>h4</option>
      </select>
    </div>
  );
}

function onUpdate({ property, newValue, component, pageId, updateFunc }) {
  const newComponent = { ...component };
  newComponent[property] = newValue;
  updateFunc(pageId, newComponent);
}
