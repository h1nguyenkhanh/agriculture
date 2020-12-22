import React, { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DatePicker, Divider } from "antd";
import { Button, Tooltip } from 'antd';
import { CloseOutlined, SaveOutlined  } from '@ant-design/icons';
import moment from 'moment';
import Tools from "tools/Tools";
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
  let [currentData, setCurrentData] = useState(Tools.cloneObject(itemData));
  let [stepTime, setStepTime] = useState([...itemData.stepTime]) 
  
  useEffect(() => {
    setCurrentData(Tools.cloneObject(itemData))   
    // console.log(itemData.id,itemData.stepTime);
    // console.log(currentData);
  }, [itemData]);

  function onClickUpdate() {
    updateStep(itemData.id, currentData)
  }

  function titleEditorOnBlur(event, editor) {
    let editData = {...currentData, stepTitle: editor.getData()};
    if(currentData.stepTitle!==editData.stepTitle) {
      setCurrentData(editData)
    }
  }


  function contentEditorOnBlur(event, editor) {
    let editData = {...currentData, stepContent: editor.getData()};
    if(currentData.stepContent!==editData.stepContent) {
      setCurrentData(editData)
    }
  }

  function editorOnReady(editor) {}
  function onDatePickerChange(value, dateString) {
    let editData = {...currentData, stepTime: dateString};
    if(currentData.stepTime!==editData.stepTime) {
      setCurrentData(editData)
    }
  }

  // console.log(itemData.stepTime);
  
  return (
    <div className="step-wrapper">
      <h2>{itemData.id}</h2>
      <h2>{stepTime[0]}</h2>
      <div className="step-header">
        <h3>{itemData.index}</h3>
        <div>
        <Button shape='circle' danger type="primary" icon={<CloseOutlined />} onClick={()=>deleteStep(itemData.id)}></Button>
        {
        itemData.stepTitle !== currentData.stepTitle
        ||
        itemData.stepContent !== currentData.stepContent
        ||
        JSON.stringify(itemData.stepTime) !== JSON.stringify(currentData.stepTime)
        ?
        <Button shape='circle' type="primary" icon={<SaveOutlined />} onClick={onClickUpdate}  style={{marginLeft: '5px'}}></Button>
        :false
        }
        </div>
      </div>
      <div className="step-title">
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={itemData.stepTitle}
          // onReady={editorOnReady}
          // onChange={headerEditorOnChange}
          onBlur={titleEditorOnBlur}
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
          defaultValue={[
            moment(stepTime[0]),
            moment(stepTime[1])
          ]}
          // defaultValue={}
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
          onBlur={contentEditorOnBlur}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Step);
