import React, { useContext, useState, useEffect } from "react";
import Context from "components/context/Context";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ProductsApi from "services/ProductsApi";
import tocbot from "tocbot";
import Tools from "tools/Tools";
import "./css/product.css";
import firebase from "firebase/config";
import Step from "./Step";
var db = firebase.firestore();

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

function Product() {
  const {
    activeProduct,
    setActiveProduct,
    // activeSubProducts,
    // setEditProcessContent,
    // editProcessContent,
  } = useContext(Context);

  const [stepsData, setStepsData] = useState(null);

  useEffect(() => {
    getProcessSteps();
  }, [activeProduct]);

  function getProcessSteps() {
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
      .get()
      .then(function (snapshot) {
        let data = []
        snapshot.forEach(function (doc) {
          data.push({id:doc.id, ...doc.data()})
        });
        setStepsData(data)
      })
      .catch(function (error) {
        console.error("Lay du lieu that bai: ", error);
      });
  }

  function updateStep(stepId, field, data) {
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
      .doc(stepId)
      .update({
        [field]: data,
      });
  }

  function addNewStep() {
      db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
        .add({
          stepTitle: "<p><span class='text-big'><strong>Tiêu đề công đoạn</strong></span></p>",
          stepTime: new Date(),
          stepContent: "<p>Nội dung công đoạn</p>"
        })
        .then(function(docRef) {
          getProcessSteps();
        })
        .catch(function(error) {
            console.error("Ghi du lieu that bai: ", error);
        });
  }

  function deleteStep(stepId) {
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`).doc(stepId).delete()
    .then(function() {
        getProcessSteps();
    })
    .catch(function(error) {
        console.error("Xoa du lieu that bai: ", error);
    });
    
  }

  return (
    <div className="main-content">
      <h2>{activeProduct.name}</h2>
      <button
        onClick={() => {
          addNewStep();
        }}
      >
        Thêm công đoạn
      </button>
      {stepsData &&
        stepsData.map((item, index) => (
          <Step itemData={{...item, index: stepsData.length-index}} key={index} deleteStep={deleteStep}/>
        ))}
    </div>
  );
}

export default Product;
