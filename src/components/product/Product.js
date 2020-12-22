import Context from "components/context/Context";
import firebase from "firebase/config";
import React, { useContext, useEffect, useState } from "react";
import tocbot from "tocbot";
import Tools from "tools/Tools";
import "./css/product.css";
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
  const { activeProduct, setActiveProduct } = useContext(Context);

  const [stepsData, setStepsData] = useState([]);

  console.log(stepsData);
  useEffect(() => {
    getProcessSteps();
  }, [activeProduct]);

  useEffect(() => {
    initToc();
  }, [stepsData]);

  function getProcessSteps() {
    db.collection(
      `products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`
    )
      .orderBy("id", "desc")
      .get()
      .then(function (snapshot) {
        let data = [];
        snapshot.forEach(function (doc) {
          data.push({ id: doc.id, ...doc.data() });
        });
        setStepsData(data);
      });
  }

  function updateStep(stepId, data) {
    db.collection(
      `products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`
    )
      .doc(stepId)
      .update(data)
      .then(() => {
        getProcessSteps();
      });
  }

  function addNewStep() {
    if (!stepsData) return false;
    const newId = Tools.getNewIdCode(stepsData, "step");
    db.collection(
      `products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`
    )
      .doc(newId)
      .set({
        id: newId,
        stepTitle: `<p><span class="text-big"><strong>Tiêu đề công đoạn</strong></span></p>`,
        stepTime: [],
        stepContent: "<p>Nội dung công đoạn</p>",
      })
      .then(function (docRef) {
        getProcessSteps();
        console.log("done");
      })
      .catch(function (error) {
        console.error("Ghi du lieu that bai: ", error);
      });
  }

  function deleteStep(stepId) {
    db.collection(
      `products/${activeProduct.parentId}/itemProcess/${activeProduct.id}/steps`
    )
      .doc(stepId)
      .delete()
      .then(function () {
        getProcessSteps();
        console.log("deleted");
      })
      .catch(function (error) {
        console.error("Xoa du lieu that bai: ", error);
      });
  }

  function initToc() {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-body-content",
      // Which headings to grab inside of the contentSelector element.
      // headingSelector: 'h1, h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      collapseDepth: 6,
      orderedList: false,
      listClass: "toc-list",
      fixedSidebarOffset: "auto",
    });
  }

  return (
    <div className="main-content">
      <h2>{activeProduct.name}</h2>
      <div className="wrapper-option">
        <button
          onClick={() => {
            addNewStep();
          }}
        >
          Thêm công đoạn
        </button>
        <button
          onClick={() => {
            initToc();
          }}
        >
          toc
        </button>
      </div>

      <div className="wrapper-step">
        <div className="main-step js-toc-body-content">
          {stepsData &&
            stepsData.map((item, index) => {
              return (
                <Step
                  itemData={{ ...item, index: stepsData.length - index }}
                  key={activeProduct.id + "-" + item.id}
                  unique={activeProduct.id + "-" + item.id}
                  deleteStep={deleteStep}
                  updateStep={updateStep}
                />
              );
            })}
        </div>
        <div className="toc-container">
          <div className="toc-style">
            <div className="js-toc">tts</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
