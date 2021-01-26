import React, { useEffect } from "react";
import firebase from "firebase/config";
var db = firebase.firestore();

function Test() {
  useEffect(() => {
    listenProductsData();
  }, []);

  function listenProductsData() {
    // db.collection(`products/qua-buoi/itemProcess/buoi-dien/steps`)
    //   .doc("ABf1EHxViGVambEIQhqy")
    //   .get()
    //   .then(function (doc) {
    //     console.log(doc.data());
    //     if (doc.data()) {
    //       console.log(doc.data());
    //     } else {
    //       // setProcessData([]);
    //     }
    //   });
    db.collection("products/qua-buoi/itemProcess/buoi-dien/steps")
      .get()
      .then(function (snapshot) {
        snapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error) {
        console.error("Lay du lieu that bai: ", error);
      });
  }
  return <div>111</div>
}

export default Test;
