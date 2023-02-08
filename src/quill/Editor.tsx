import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
export type EditorProp = {
  setValue: (value: string) => void;
  editorId: string;
};
export const Editor = ({ setValue, editorId }: EditorProp) => {
  const [state, setState] = React.useState({ value: undefined });
  const [randomId, setRandomId] = useState(() => {
    let randomId = Math.random() * Date.now();
    return randomId.toString();
  });
  const handleChange = (value: any) => {
    setState({ value });
    setValue(value);
  };
  const getRandomId = () => {
    let randomId = Math.random() * Date.now();
    return randomId.toString();
  };
  return (
    <div className="text-editor">
      <EditorToolbar toolbarId={editorId} />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules(editorId)}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
