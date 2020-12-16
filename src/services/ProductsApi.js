import firebase from "firebase/config";

var db = firebase.firestore();

const ProductsApi = {};

ProductsApi.updateProduct = (parentId, productData) => {
  db.collection("products")
    .doc(parentId)
    .update(productData)
    .then(function () {
      // alert("Cập nhật quy trình cho sản phẩm thành công")
    })
    .catch(function (error) {
      // alert("hất bại")
    });
};

export default ProductsApi;
