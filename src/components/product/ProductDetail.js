import { Editor } from "@tinymce/tinymce-react";
import Context from "components/context/Context";
import React, { useContext, useState, useEffect } from "react";
import ProductsApi from "services/ProductsApi";
import { parse } from 'node-html-parser';


function ProductDetail() {
  const {activeProduct, activeSubProducts, setEditProcessContent, editProcessContent} = useContext(Context);
  const [readOnlyMode, setReadOnlyMode] = useState(true)

  const root = parse('<ul id="list"><li>Hello World</li></ul>');
  console.log(root.firstChild.structure);

  useEffect(()=>{
    setReadOnlyMode(true)
  },[activeProduct])

  function toggleReadOnyMode() {
    setReadOnlyMode(!readOnlyMode);
  }

  function handleEditorChange(content, editor) {
    setEditProcessContent(content)
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
      // Thay đổi dữ liệu danh sách sản phẩm con
      newData.productList.splice(productIndex, 1, {
        ...activeProduct,
        process: editProcessContent,
      });
      let t = activeProduct;
      // Cập nhật dữ liệu lên server
      ProductsApi.updateProduct(activeSubProducts.id, newData);
    }
  }

  return (
    <div className={readOnlyMode&&"hideEditorHeader"}>
      <button onClick={toggleReadOnyMode}>Chế độ {readOnlyMode?"sửa":"đọc"}</button>
      <button onClick={updateProduct}>Lưu</button>
      <Editor
      apiKey="ybsyhu4bcrzgwir4lhlmqffti3np06827pv3wht6ulg9ebed"
      value={activeProduct&&activeProduct.process}
      disabled={readOnlyMode}
      init={{
        selector: 'textarea#readonly-demo',
        body_class : "my_class",
        height: 350,
        menubar: false,
        statusbar: false,
        body_class: 'my_class',
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar: "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        setup: function (editor) {
          editor.ui.registry.addContextToolbar('imagealignment', {
            predicate: function (node) {
              return node.nodeName.toLowerCase() === 'img'
            },
            items: 'alignleft aligncenter alignright',
            position: 'node',
            scope: 'node'
          });
      
          editor.ui.registry.addContextToolbar('textselection', {
            predicate: function (node) {
              return !editor.selection.isCollapsed();
            },
            items: 'bold italic underline',
            position: 'selection',
            scope: 'node'
          });
        }
      }}
      onEditorChange={handleEditorChange}
      
    />
    </div>
  );
}

export default ProductDetail;
