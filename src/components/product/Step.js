import React, { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DatePicker, Divider,Comment, Avatar } from "antd";
import { Button, Tooltip } from 'antd';
import { CloseOutlined, SaveOutlined  } from '@ant-design/icons';
import moment from 'moment';
import Tools from "tools/Tools";
import "./css/step.css";

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
  let { itemData, deleteStep, updateStep, unique } = props;
  let [currentData, setCurrentData] = useState(Tools.cloneObject(itemData));
 
  useEffect(() => {
    setCurrentData(Tools.cloneObject(itemData))
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
  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Luu Hung</a>}
      avatar={
        <Avatar
          src="images/male-farmer.png"
          alt="Luu Hung"
        />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );
  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h3 id={unique}>Bước {itemData.index}</h3>
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
            moment(itemData.stepTime[0]),
            moment(itemData.stepTime[1])
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
        <ExampleComment />
      </div>
    </div>
  );
  
}

export default Step;
