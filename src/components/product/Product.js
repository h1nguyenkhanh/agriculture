import { Editor } from "@tinymce/tinymce-react";
import Context from "components/context/Context";
import React, { useContext, useState, useEffect } from "react";
import ProductsApi from "services/ProductsApi";
import TableOfContent from "components/product/TableOfContent";
import "./css/product.css";
import Tools from "tools/Tools";
import tocbot from "tocbot";
import Test from "components/Test"


function ProductDetail() {
  const {
    activeProduct,
    activeSubProducts,
    setEditProcessContent,
    editProcessContent,
  } = useContext(Context);
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    setReadOnlyMode(true);
    handleOnScrollEvent();
    console.log(document.querySelector(".js-toc-body-content"));
    console.log(Tools.markIdForHtml(activeProduct.process));
  }, [activeProduct]);

  function toggleReadOnyMode() {
    setReadOnlyMode(!readOnlyMode);
  }

  function handleEditorChange(content, editor) {
    setEditProcessContent(content);
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
    });
  }

  function handleOnScrollEvent() {
    window.addEventListener("scroll", function (e) {
      if (!document.querySelector(".tox-tinymce") && readOnlyMode) {
        return;
      }
      let parrentWidth = document.querySelector(".tox-tinymce").offsetWidth - 2;
      if (window.scrollY >= 80) {
        document
          .querySelector(".tox-tinymce")
          .classList.remove("tox-tinymce--toolbar-sticky-off");
        document
          .querySelector(".tox-tinymce")
          .classList.add("tox-tinymce--toolbar-sticky-on");
        document
          .querySelector(".tox-editor-container")
          .classList.add("tox-container-padding");
        document.querySelector(
          ".tox-editor-header"
        ).style.cssText = `position: fixed; left: 236px; top: 0px; width: ${parrentWidth}px`;
      } else {
        document
          .querySelector(".tox-tinymce")
          .classList.remove("tox-tinymce--toolbar-sticky-on");
        document
          .querySelector(".tox-tinymce")
          .classList.add("tox-tinymce--toolbar-sticky-off");
        document
          .querySelector(".tox-editor-container")
          .classList.remove("tox-container-padding");
        document.querySelector(".tox-editor-header").style.cssText = "";
      }
    });
  }

  function onEditerRender() {
    let currentHtml = document.querySelector("iframe").contentDocument.body.innerHTML;
    setContentHtml(currentHtml)
    initToc();
  }

  /**
   * Sửa quy trình của một sản phẩm
   */
  function updateProduct() {
    // Kiểm tra danh sách sản phẩm con
    if (activeSubProducts) {
      // // Lấy vị trí của sản phẩm trong danh sách sản phẩm con
      const productIndex = activeSubProducts.productList.indexOf(activeProduct);
      // Sao chép danh sách sản phẩm con ra 1 obj mới
      const newData = JSON.parse(JSON.stringify(activeSubProducts));
      console.log(productIndex);
      // Thay đổi dữ liệu danh sách sản phẩm con
      newData.productList.splice(productIndex, 1, {
        ...activeProduct,
        process: editProcessContent,
      });
      // Cập nhật dữ liệu lên server
      ProductsApi.updateProduct(activeSubProducts.id, newData);
      let currentHtml = document.querySelector("iframe").contentDocument.body.innerHTML;
      setContentHtml(currentHtml)
      tocbot.refresh();
    }
  }

  return (
    <div className="main-content">
      <h2>{activeProduct.name}</h2>
      <Test></Test>
      
       <div className="wrapper-option">
        <button onClick={toggleReadOnyMode}>
          Chế độ {readOnlyMode ? "sửa" : "đọc"}
        </button>
        <button
          onClick={() => {
            tocbot.refresh();
          }}
        >
          tocbot.refresh();
        </button>
        <button onClick={updateProduct}>Lưu</button>
      </div>
      <div
        style={{
          position: "fixed",
          width: "150px",
          top: "180px",
          right: "25px",
          height: "auto",
          zIndex: 9999999,
          overflow: "hidden",
          border: "2px solid #eee",
          borderLeft: "0px"
        }}
      >
        <div className="js-toc"></div>
      </div>
      <TableOfContent/>

      <div
        className="js-toc-body-content"
        dangerouslySetInnerHTML={{
          __html: Tools.markIdForHtml(contentHtml),
        }}
        style={{}}
      ></div>
      <div className="my-editor-wrapper">
        <div className={readOnlyMode ? "hideEditorHeader" : ""}>
          <Editor
            apiKey="ybsyhu4bcrzgwir4lhlmqffti3np06827pv3wht6ulg9ebed"
            value={activeProduct.process}
            disabled={readOnlyMode}
            init={{
              selector: "textarea#readonly-demo",
              body_class: "",
              toolbar_sticky: true,
              min_height: 500,
              menubar: false,
              statusbar: false,
              forced_root_block: "div",
              block_formats:
                "Thường=p; Tiêu đề 1=h1; Tiêu đề 2=h2; Tiêu đề 3=h3;  Tiêu đề 4=h4;  Tiêu đề 5=h5;  Tiêu đề 6=h6",
              fontsize_formats: "8 10 12 14 16 18 24 36 48",
              plugins: [
                "autoresize",
                // "advlist autolink lists link image charmap print preview anchor",
                // "searchreplace visualblocks code fullscreen",
                // "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              init_instance_callback: onEditerRender,
              setup: function (editor) {
                editor.ui.registry.addContextToolbar("imagealignment", {
                  predicate: function (node) {
                    return node.nodeName.toLowerCase() === "img";
                  },
                  items: "alignleft aligncenter alignright",
                  position: "node",
                  scope: "node",
                });

                editor.ui.registry.addContextToolbar("textselection", {
                  predicate: function (node) {
                    return !editor.selection.isCollapsed();
                  },
                  items: "bold italic underline",
                  position: "selection",
                  scope: "node",
                });
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
      <TableOfContent />
       */}
    </div>
  );
}

export default ProductDetail;
