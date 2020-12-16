import React, { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DatePicker, Divider } from "antd";
import { Button, Tooltip } from 'antd';
import { CloseOutlined  } from '@ant-design/icons';

import "./css/process.css";

const editorConfiguration = {
  toolbar: {
    viewportTopOffset: 74,
    items: [
      "heading",
      "|",
      "fontFamily",
      "fontSize",
      "|",
      "bold",
      "italic",
      "underline",
      "link",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "horizontalLine",
      "|",
      "alignment",
      "indent",
      "outdent",
      "|",
      "imageInsert",
      "mediaEmbed",
      "|",
      "specialCharacters",
      "|",
      "removeFormat",
      "undo",
      "redo",
    ],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "linkImage",
    ],
  },
  mediaEmbed: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  lenguage: "vi",
};

function Step(props) {
  let { itemData, deleteStep, updateStep } = props;
  let [renderComponent, setRenderComponent] = useState(null);
  
  useEffect(() => {

    console.log('done');
  }, []);

  function headerEditorOnBlur(event, editor) {}
  function contentEditorOnBlur(event, editor) {}
  function editorOnReady(editor) {}
  function onDatePickerChange(value, dateString) {
    console.log(value);
    console.log(dateString);
  }
  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h3>{itemData.index}</h3>
        <Button shape='circle' danger type="primary" icon={<CloseOutlined />} onClick={()=>deleteStep(itemData.id)}></Button>
      </div>
      <div className="step-title">
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={itemData.stepTitle}
          // onReady={editorOnReady}
          // onChange={headerEditorOnChange}
          // onBlur={headerEditorOnBlur}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>
      <Divider className="custom-divider" />
      <div className="step-time">
        <p>Trời gian</p>
        <DatePicker.RangePicker
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          onChange={onDatePickerChange}
        />
      </div>
      <Divider className="custom-divider" />
      <div className="step-content">
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={itemData.stepContent}
          // onReady={editorOnReady}
          // onChange={headerEditorOnChange}
          // onBlur={headerEditorOnBlur}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}

export default Step;
