import React, { useState } from "react";

export default function MarkDownTextArea({ ...rest }) {
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
    <textarea
      style={{ height }}
      onKeyUp={adjustHeight}
      onKeyDown={processTab}
      {...rest}
    />
  );
}
