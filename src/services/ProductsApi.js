import firebase from "firebase/config";

var db = firebase.firestore();

const ProductsApi = {};

ProductsApi.getProductsList = (productName) => {
  return db.collection("products")
    .get()
    .then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function (error) {
      console.error("Lay du lieu that bai: ", error);
    });
};

export default ProductsApi;
