import { Component, OnInit } from "@angular/core";
import { RecordsService } from "../shared/records.service";

@Component({
  selector: "app-records-list",
  templateUrl: "./records-list.component.html",
  styleUrls: ["./records-list.component.css"]
})
export class RecordsListComponent implements OnInit {
  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.getPositiveTraits();
  }
  positiveTraits;
  getPositiveTraits = () =>
    this.recordsService
      .getPositiveTraits()
      .subscribe(res => (this.positiveTraits = res));

  deleteOrder = data => this.recordsService.deletePerson(data);
}
