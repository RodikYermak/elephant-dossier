import { Component, OnInit } from "@angular/core";
import { RecordsService } from "../shared/records.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.css"]
})
export class RecordsComponent implements OnInit {
  constructor(private recordsService: RecordsService) {}

  positiveTrait = [
    "Creative",
    "Educated",
    "Easygoing",
    "Focused",
    "Espresso",
    "Focused",
    "HaveMoney",
    "Funny",
    "Quiet"
  ];

  positiveOrder = [];
  addPositive = trait => this.positiveOrder.push(trait);
  removePositive = trait => {
    let index = this.positiveOrder.indexOf(trait);
    if (index > -1) this.positiveOrder.splice(index, 1);
  };
  onSubmit() {
    this.recordsService.form.value.positiveTraits = this.positiveOrder;
    let data = this.recordsService.form.value;

    this.recordsService.createPositiveTraitOrder(data).then(res => {
      /*do something here....
           maybe clear the form or give a success message*/
    });
  }

  ngOnInit() {}
}
