import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ArrivalListComponent } from './arrival-list/arrival-list.component';
import { DepartureListComponent } from './departure-list/departure-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VatsimDatePipe } from './vatsimdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArrivalListComponent,
    DepartureListComponent,
    PageNotFoundComponent,    
    VatsimDatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [DepartureListComponent]
})
export class AppModule { }
