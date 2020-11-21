import { Layout } from "antd";
import React, { useState } from "react";
import "./css/product.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

function Product(props) {
  const { activeProduct } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onChange(editorState) {
    setEditorState(editorState);

    console.log(editorState);
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  function onBoldClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  return (
    <div className="main-content">
      <h2>{activeProduct && activeProduct.name}</h2>
      <button onClick={onBoldClick}>Bold</button>
      <div className="editor-wrapper">
      <Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand}/>
      </div>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minus,
        obcaecati, unde quasi perspiciatis iusto veritatis sapiente tempore,
        facilis consequatur dolore totam soluta! Nobis eligendi corrupti
        suscipit! Earum, dolorum a?
      </h3>
    </div>
  );
}

export default Product;
