import axios from "axios";
import firebase from "firebase/config";

var db = firebase.firestore();

export const getProcessData = async () => {
  db.collection("Process")
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
