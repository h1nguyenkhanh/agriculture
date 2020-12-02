import { Editor } from "@tinymce/tinymce-react";
import React from "react";

function ProductDetail() {
  return (
    <div style={{height: "600vh", paddingTop: '300px'}}>
        <h1 style={{height: '300px', position: 'fixed', top: 0}}>bala</h1>
      <div style={{height: "100%", background: "red", width:"50%", position: "absolute", right: 0}}>
      <Editor
        apiKey="ybsyhu4bcrzgwir4lhlmqffti3np06827pv3wht6ulg9ebed"
        // disabled={true}
        init={{
          selector: "textarea#readonly-demo",
          toolbar_sticky: true,
          min_height: 500,
          menubar: false,
          statusbar: false,
          forced_root_block: "div",
          block_formats:
            "Thường=p; Tiêu đề 1=h1; Tiêu đề 2=h2; Tiêu đề 3=h3;  Tiêu đề 4=h4;  Tiêu đề 5=h5;  Tiêu đề 6=h6",
          fontsize_formats: "8 10 12 14 16 18 24 36 48",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
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
      />
      </div>
    </div>
  );
}

export default ProductDetail;
