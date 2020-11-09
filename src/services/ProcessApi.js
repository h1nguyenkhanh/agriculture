import firebase from "firebase/config";

var db = firebase.firestore();

const ProcessApi = {};

ProcessApi.getProcessData = () => {
  return db.collection("Process")
    .get()
    .then(function (snapshot) {
      let processData = [];
      snapshot.forEach(function (doc) {
        let objData = { ProcessId: doc.id, ...doc.data() };
        console.log(objData);
        processData.push(objData);
      });
      return processData;
    })
    .catch(function (error) {
      console.error("Lay du lieu that bai: ", error);
    });
};

export default ProcessApi;
