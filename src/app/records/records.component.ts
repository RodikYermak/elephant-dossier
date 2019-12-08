import { Component, OnInit } from "@angular/core";
import { RecordsService } from "../shared/records.service";

import { AngularFireStorage } from "@angular/fire/storage";
// import { finalize } from "rxjs/operators";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.css"]
})
export class RecordsComponent implements OnInit {
  imgSrc: string = "assets/img/image_placeholder.jpg";
  selectedImage: any = null;
  // isSubmitted: boolean;

  constructor(
    private storage: AngularFireStorage,
    private recordsService: RecordsService
  ) {}

  // upload(event) {
  //   this.storage.upload(
  //     "`${this.selectedImage.name}_${new Date().getTime()}`",
  //     event.target.files[0]
  //   );
  // }

  positiveTrait = [
    "Creative",
    "Educated",
    "Easygoing",
    "Focused",
    "Espresso",
    "Focused",
    "HaveMoney",
    "Funny",
    "Quiet",
    "Quiet"
  ];

  positiveOrder = [];
  addPositive = trait => this.positiveOrder.push(trait);
  removePositive = trait => {
    let index = this.positiveOrder.indexOf(trait);
    if (index > -1) this.positiveOrder.splice(index, 1);
  };
  onSubmit(formValue) {
    this.recordsService.form.value.positiveTraits = this.positiveOrder;
    let data = this.recordsService.form.value;

    // var filePath = `${formValue.category}}/${
    //   this.selectedImage.name
    // }_${new Date().getTime()}`;
    // const fileRef = this.storage.ref(filePath);
    // this.storage
    //   .upload(filePath, this.selectedImage)
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe(url => {
    //         formValue["imageUrl"] = url;
    //       });
    //     })
    //   )
    //   .subscribe();

    this.recordsService.createPositiveTraitOrder(data).then(res => {
      /*do something here....
           maybe clear the form or give a success message*/
    });
  }

  ngOnInit() {}

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = "assets/img/image_placeholder.jpg";
      this.selectedImage = null;
    }
  }
}
