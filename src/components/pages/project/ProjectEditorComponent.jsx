import React, { useState } from "react";
import { useParams } from "react-router";
import MarkDownTextArea from "../../common/inputs/MarkDownTextArea";
import gripImage from "../../../assets/grip-vertical.svg";
import close from "../../../assets/close.svg";
import { Draggable } from "react-beautiful-dnd";

export default function ProjectEditorComponent({
  component,
  onDelete,
  updateComponent,
}) {
  const getComponent = () => {
    switch (component.type) {
      case "TEXT":
        return <TextEditorComponent {...{ component, updateComponent }} />;
      case "FIGURE":
        return <FigureEditorComponent {...{ component, updateComponent }} />;
      case "ENDPOINT":
        return <EndpointEditorComponent {...{ component, updateComponent }} />;
      default:
        return <div>{component.type}</div>;
    }
  };
  return (
    <Draggable draggableId={component.id} index={parseInt(component.order)}>
      {provided => (
        <div
          className='project-editor-component'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className='project-editor-component__drag'
            {...provided.dragHandleProps}
          >
            <img src={gripImage} />
          </div>
          {getComponent()}
          <button
            onClick={onDelete}
            className='project-editor-component__delete'
          >
            <img src={close} />
          </button>
        </div>
      )}
    </Draggable>
  );
}

function EndpointEditorComponent({ component, updateComponent }) {
  return (
    <div className='project-editor-component__endpoint'>
      <form className='grid--gap'>
        <div className='field-set col--4'>
          <label>Type</label>
          <select
            value={component.httpVerb}
            onChange={e =>
              updateComponent({
                property: "httpVerb",
                newValue: e.target.value,
                component,
              })
            }
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className='field-set col--8'>
          <label>Path</label>
          <input
            type='text'
            value={component.path}
            onChange={e =>
              updateComponent({
                property: "path",
                newValue: e.target.value,
                component,
              })
            }
          />
        </div>
        <div className='field-set col--12'>
          <label>Description</label>
          <MarkDownTextArea
            value={component.content}
            onChange={e =>
              updateComponent({
                property: "content",
                newValue: e.target.value,
                component,
              })
            }
          />
        </div>
        <div className='field-set col--12'>
          <label>Response Example</label>
          <MarkDownTextArea
            value={component.responseExample}
            onChange={e =>
              updateComponent({
                property: "responseExample",
                newValue: e.target.value,
                component,
              })
            }
          />
        </div>
        <div className='field-set col--12'>
          <label>Request Example</label>
          <MarkDownTextArea
            value={component.requestExample}
            onChange={e =>
              updateComponent({
                property: "requestExample",
                newValue: e.target.value,
                component,
              })
            }
          />
        </div>
      </form>
    </div>
  );
}

function FigureEditorComponent({ component, updateComponent }) {
  return (
    <div className='project-editor-component__figure'>
      <input
        type='text'
        value={component.imgResource}
        onChange={e =>
          updateComponent({
            property: "imgResource",
            newValue: e.target.value,
            component,
          })
        }
      />
      <MarkDownTextArea
        value={component.content}
        onChange={e =>
          updateComponent({
            property: "content",
            newValue: e.target.value,
            component,
          })
        }
      />
    </div>
  );
}

function TextEditorComponent({ component, updateComponent }) {
  return (
    <div className='project-editor-component__text'>
      <MarkDownTextArea
        value={component.content}
        onChange={e =>
          updateComponent({
            property: "content",
            newValue: e.target.value,
            component,
          })
        }
      />
    </div>
  );
}
