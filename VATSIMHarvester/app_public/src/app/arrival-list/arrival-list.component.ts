import { Component, OnInit } from '@angular/core';
import { VatsimDataService, Client, Airports } from '../vatsim-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-arrival-list',
  templateUrl: './arrival-list.component.html',
  styleUrls: ['./arrival-list.component.css']
})
export class ArrivalListComponent implements OnInit {

  public clients: Client[];
  public airports: string[];
  private airport: string;
  private airportCode: FormControl;

  constructor(private vatsimDataService: VatsimDataService) { 
    this.airport = "KPHX";
    this.airports = Airports;
    this.airportCode = new FormControl();
  }

  //about binding drop-downs in Angular 8: https://www.talkingdotnet.com/bind-select-dropdown-list-in-angular-8/
  public changeAirport(evt){
    this.airport = evt.target.value;
    this.getArrivalClients();
    console.log(this.airport);
  }

  private getArrivalClients(): void{
    this.vatsimDataService
    .getZABArrivals(this.airport)
    .subscribe(foundClients => {this.clients = foundClients});
  }

  ngOnInit() {
    this.getArrivalClients();
  }
}
