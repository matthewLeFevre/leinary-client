import React, { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";

export default function MarkDownTextArea({ ...rest }) {
  const [height, setHeight] = useState(0);
  const adjustHeight = e => {
    setHeight(e.target.scrollHeight);
  };
  const taRef = useRef();
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
  useEffectOnce(() => {
    setHeight(taRef.current.scrollHeight);
  });
  return (
    <textarea
      ref={taRef}
      style={{ height }}
      onKeyUp={adjustHeight}
      onKeyDown={processTab}
      {...rest}
    />
  );
}
