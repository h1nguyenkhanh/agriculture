import React, { useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Context from "components/context/Context";

function ProductDetail() {
  const {productsData,setProductsData,activeProduct, activeSubProducts, updateProduct, editProcessContent, setEditProcessContent} = useContext(Context);
  
  if(activeProduct) {
    const productIndex = activeSubProducts.productList.indexOf(activeProduct)

  }

  function handleEditorChange(content, editor) {
    setEditProcessContent(content)
    console.log(content);
  }

  // updateProduct()
  return (
    <Editor
      apiKey="ybsyhu4bcrzgwir4lhlmqffti3np06827pv3wht6ulg9ebed"
      value={activeProduct&&activeProduct.process}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
      }}
      image_advtab={true}
      onEditorChange={handleEditorChange}
    />
  );
}

export default ProductDetail;
