import React, { useState } from "react";
import { useParams } from "react-router";
import MarkDownTextArea from "../../common/inputs/MarkDownTextArea";
import gripImage from "../../../assets/grip-vertical.svg";
import close from "../../../assets/close.svg";
import { useProjectCTX } from "../../../services/hooks";

export default function ProjectEditorComponent({
  component,
  onDelete,
  updateComponent,
}) {
  const { pageId } = useParams();
  const { deleteComponent } = useProjectCTX();
  const getComponent = () => {
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
          <FigureEditorComponent
            {...{ component, updateComponent, onDelete }}
          />
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
  };
  return (
    <div className='project-editor-component'>
      <div className='project-editor-component__drag'>
        <img src={gripImage} />
      </div>
      {getComponent()}
      <button
        onClick={() => deleteComponent(pageId, component.id)}
        className='project-editor-component__delete'
      >
        <img src={close} />
      </button>
    </div>
  );
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
      <label>Path</label>
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
      <label>Description</label>
      <MarkDownTextArea
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
      <label>Response Example</label>
      <MarkDownTextArea
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
      <label>Request Example</label>
      <MarkDownTextArea
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
      <MarkDownTextArea
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
  return (
    <div className='project-editor-component__text'>
      <MarkDownTextArea
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
