import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

// components
import { RecordsComponent } from "./records/records.component";
import { RecordsListComponent} from "./records-list/records-list.component";

// shared
import { RecordsService } from "./shared/records.service";

// form
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, RecordsComponent, RecordsListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    ReactiveFormsModule
  ],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
