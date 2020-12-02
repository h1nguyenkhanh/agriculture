import { Editor } from "@tinymce/tinymce-react";
import Context from "components/context/Context";
import React, { useContext, useState, useEffect } from "react";
import ProductsApi from "services/ProductsApi";
import "./css/product.css";

function ProductDetail() {
  const {
    activeProduct,
    activeSubProducts,
    setEditProcessContent,
    editProcessContent,
  } = useContext(Context);
  const [readOnlyMode, setReadOnlyMode] = useState(true);

  useEffect(() => {
    setReadOnlyMode(true);
    handleOnScrollEvent();
  }, [activeProduct]);

  function toggleReadOnyMode() {
    setReadOnlyMode(!readOnlyMode);
  }

  function handleEditorChange(content, editor) {
    setEditProcessContent(content);
  }

  function handleOnScrollEvent() {
    window.addEventListener("scroll",function(e){
      console.log(window.scrollY)
    })
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
    }
  }

  return (
    <div className="main-content">
      <h2>{activeProduct.name}</h2>
      <div className="datail-option">
        <button onClick={toggleReadOnyMode}>
          Chế độ {readOnlyMode ? "sửa" : "đọc"}
        </button>
        <button onClick={updateProduct}>Lưu</button>
      </div>
      <div className="my-editor-wrapper">
        <div className={readOnlyMode ? "hideEditorHeader" : ""}>
          <Editor
            apiKey="ybsyhu4bcrzgwir4lhlmqffti3np06827pv3wht6ulg9ebed"
            value={activeProduct.process}
            disabled={readOnlyMode}
            init={{
              selector: "textarea#readonly-demo",
              // height: 300,
              // autoresize_min_height: 500,
              // toolbar_sticky: true,
              min_height: 500,
              menubar: false,
              statusbar: false,
              forced_root_block: "div",
              block_formats:
                "Thường=p; Tiêu đề 1=h1; Tiêu đề 2=h2; Tiêu đề 3=h3;  Tiêu đề 4=h4;  Tiêu đề 5=h5;  Tiêu đề 6=h6",
              fontsize_formats: "8 10 12 14 16 18 24 36 48",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor autoresize",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
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
    </div>
  );
}

export default ProductDetail;
