import React, { useContext, useState, useEffect } from "react";
import Context from "components/context/Context";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ProductsApi from "services/ProductsApi";
import tocbot from "tocbot";
import "./css/product.css";
import firebase from "firebase/config";
import Step from "./Step";
import Tools from "tools/Tools";

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
  } = useContext(Context);

  const [stepsData, setStepsData] = useState([]);
  let listenData;

  useEffect(() => {
    getProcessSteps();
    return ()=>{
      listenData();
    }
    
  }, [activeProduct]);

  function getProcessSteps() {
    listenData = db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
      .orderBy("id", "desc")
      .onSnapshot(function (snapshot) {
        let data = []
        snapshot.forEach(function (doc) {
          data.push({id:doc.id, ...doc.data()})
        });
        setStepsData(data)
      })
     
  }
 
  function updateStep(stepId, data) {
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
      .doc(stepId)
      .update(data);
  }

  function addNewStep() {
    if(!stepsData) return false;
    const newId = Tools.getNewIdCode(stepsData,"step");
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`)
      .doc(newId)
      .set({
        id: newId,
        stepTitle: `<p><span class="text-big"><strong>Tiêu đề công đoạn</strong></span></p>`,
        stepTime: [],
        stepContent: "<p>Nội dung công đoạn</p>"
      })
      .then(function(docRef) {
        // getProcessSteps();
         console.log('done');
      })
      .catch(function(error) {
          console.error("Ghi du lieu that bai: ", error);
      });
  }

  function deleteStep(stepId) {
    db.collection(`products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`).doc(stepId).delete()
    .then(function() {
        // getProcessSteps();
        console.log('deleted');
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
        stepsData.map((item, index) => {
          return (
            <Step itemData={{...item, index: stepsData.length-index}} key={activeProduct.id+item.id} k={activeProduct.id+item.id} deleteStep={deleteStep} updateStep={updateStep}/>
          )
        })}
    </div>
  );
}

export default Product;
