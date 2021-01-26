import Context from "components/context/Context";
import firebase from "firebase/config";
import React, { useContext, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
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
  const {
    activeProduct,
    productsData,
    setProductsData,
    setActiveProduct,
    getFirstProduct,
  } = useContext(Context);

  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    getProcessSteps();
  }, [activeProduct]);

  useEffect(() => {
    initToc();
  }, [stepsData]);

  function getProcessSteps() {
    if(!activeProduct) return;
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

  function deleteProduct() {
    function deleteCategory() {
      //Lấy danh mục con (qua-buoi) trong danh mục các sản phẩm
      let productChild = productsData.find(
        (element) => element.id === activeProduct.parentId
      );

      //Lấy vị trí danh mục con (qua-buoi) trong danh mục các sản phẩm (vị trí của danh mục bưởi)
      const productIndex = productsData.indexOf(productChild);

      //Lấy vị trí sản phẩm trong danh mục con (bưởi diễn trong qua bưởi)
      let productChildIndex = productChild.items.findIndex((item) => {
        return item.id === activeProduct.id;
      });

      //Xóa vị trí của sản phẩm trong danh mục
      productChild.items.splice(productChildIndex, 1);

      //Cập nhật csdl
      db.collection(`products`)
        .doc(activeProduct.parentId)
        .update({
          items: productChild.items,
        })
        .then(function () {
          setActiveProduct({});
          console.log("Xoa du lieu thanh cong");
        })
        .catch(function (error) {
          console.error("Xoa du lieu that bai: ", error);
        });
    }

    db.collection(`products/${activeProduct.parentId}/itemProcess/`)
      .doc(activeProduct.id)
      .delete()
      .then(function () {
        deleteCategory();
        console.log("Xoa du lieu thanh cong");
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
      {activeProduct && activeProduct.id && (
        <div>
          <h2>{activeProduct.name}</h2>
          <div className="wrapper-option">
            <Button onClick={addNewStep} type="primary" icon={<PlusOutlined />}>
              Thêm công đoạn
            </Button>
            <Button
              onClick={deleteProduct}
              type="danger"
              icon={<CloseOutlined />}
              style={{ marginLeft: "10px" }}
            >
              Xóa quy trình
            </Button>
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
                <div className="js-toc"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
