import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classNames from "classnames/bind";
import styles from "./TextEditor.module.scss";

const cx = classNames.bind(styles);

const TextEditor = ({ onEditorStateChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    onEditorStateChange(newEditorState);
  };

  return (
    <div className={cx("editor")}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
