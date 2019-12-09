import { Component, OnInit } from "@angular/core";
import { RecordsService } from "../shared/records.service";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { tap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.css"]
})
export class RecordsComponent implements OnInit {
  imgSrc: string = "assets/img/image_placeholder.jpg";
  selectedImage: any = null;

  image: string = null;

  // Main task
  task: AngularFireUploadTask;

  snapshot: Observable<any>;

  uploadPercent: Observable<number>;
  // Download URL
  downloadURL: Observable<string>;

  ref: AngularFireStorageReference;

  constructor(
    private storage: AngularFireStorage,
    private recordsService: RecordsService,
    private firestore: AngularFirestore
  ) {}

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // The storage path
    const path = `${new Date().getTime()}_${file.name}`;

    // The main task
    // this.task = this.storage.upload(path, file);

    const task = this.storage.upload(path, file);
    const ref = this.storage.ref(path);

    // The file's download URL
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.image = url));
        })
      )
      .subscribe();

    // this.snapshot = this.task.snapshotChanges().pipe(
    //   tap(console.log),
    //   // The file's download URL
    //   finalize(async () => {
    //     this.downloadURL = await ref.getDownloadURL().toPromise();

    //     this.firestore
    //       .collection("positiveTraits")
    //       .add({ downloadURL: this.downloadURL, path });
    //   })
    // );
  }

  positiveTrait = [
    "Twitches when nervous",
    "Unhealthy obsession with a certain food",
    "Snort when laughing",
    "Obsessed with cleaning",
    "Mumble things to himself continuously",
    "Talk with animals when feeling alone",
    "hesitate to eat in front of others",
    "Carries the notebook with them",
    "Hallucinates",
    "Visual memory"
  ];
  negativeTrait = [
    "Talk to plants walls and furniture",
    "Taking tea too much",
    "Can’t drive",
    "Addiction to eat or drink",
    "Grown adults but still likes to play with toys like the teddy bear",
    "Conscious about brands",
    "Has a toothpick in the mouth",
    "Daydreams constantly",
    "Having social phobia",
    "Collect animal’s fur, bone, and skin"
  ];

  positiveOrder = [];
  addPositive = trait => this.positiveOrder.push(trait);
  removePositive = trait => {
    let index = this.positiveOrder.indexOf(trait);
    if (index > -1) this.positiveOrder.splice(index, 1);
  };

  negativeOrder = [];
  addNegative = trait => this.negativeOrder.push(trait);
  removeNegative = trait => {
    let index = this.negativeOrder.indexOf(trait);
    if (index > -1) this.negativeOrder.splice(index, 1);
  };

  onSubmit(formValue) {
    this.recordsService.form.value.positiveTraits = this.positiveOrder;
    this.recordsService.form.value.negativeTraits = this.negativeOrder;
    // this.recordsService.form.value.personImage = this.downloadURL;
    // this.recordsService.form.value.downloadURL = this.downloadURL;
    let data = this.recordsService.form.value;

    this.recordsService.createPositiveTraitOrder(data).then(res => {
      /*do something here....
           maybe clear the form or give a success message*/
    });
  }

  resetForm() {
    this.recordsService.form.reset();
    this.positiveOrder = [];
    this.negativeOrder = [];
    // this.downloadURL = null;
    this.imgSrc = "assets/img/image_placeholder.jpg";
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
