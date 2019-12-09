import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

// firebase
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  constructor(private firestore: AngularFirestore) {}
  form = new FormGroup({
    personImage: new FormControl(""),
    personName: new FormControl(""),
    personOccupation: new FormControl(""),
    comments: new FormControl("")
    // coffeeOrder: new FormControl(""),
    // completed: new FormControl(false)
  });
  // createCoffeeOrder(data) {
  createPositiveTraitOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        // .collection("coffeeOrders")
        .collection("positiveTraits")
        .add(data)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }
  getPositiveTraits() {
    return this.firestore.collection("positiveTraits").snapshotChanges();
  }
  deletePerson(data) {
    return this.firestore
      .collection("positiveTraits")
      .doc(data.payload.doc.id)
      .delete();
  }
}
