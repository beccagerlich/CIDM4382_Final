import { Component, OnInit } from '@angular/core';
import { VatsimDataService, Client, Airports } from '../vatsim-data.service';
import { FormControl } from '@angular/forms';

/*
"_id": "5dd029a801d17049a0dfdecf",
"callsign": "SWA24",
"cid": "1411085",
"realname": "AJ VanMiddendorp KIAH",
"clienttype": "PILOT",
"frequency": "",
"latitude": "32.63354",
"longitude": "-96.74587",
"altitude": "12145",
"groundspeed": "336",
"planned_tascruise": "452",
"planned_depairport": "KDAL",
"planned_altitude": "34000",
"planned_destairport": "KAMA",
"server": "USA-EAST",
"protrevision": "100",
"rating": "1",
"transponder": "4565",
"facilitytype": "",
"visualrange": "",
"planned_flighttype": "I",
"planned_deptime": "1620",
"planned_actdeptime": "0",
"planned_hrsenroute": "1",
"planned_minenroute": "3",
"planned_hrsfuel": "2",
"planned_minfuel": "37",
"planned_altairport": "KOKC",
"planned_remarks": "PBN/A1B1C1D1S1S2 NAV/RNVD1E2A1 REG/N806SB EET/KZAB0043 SIMBRIEF /v/",
"planned_route": "KKITY4 HUDAD CEVEX",
"planned_depairport_lat": "0",
"planned_depairport_lon": "0",
"planned_destairport_lat": "0",
"atis_message": "",
"time_last_atis_received": "",
"time_logon": "20191116141716",
"heading": "226",
"QNH_iHg": "30.272",
"QNH_Mb": "1025",
*/

@Component({
  selector: 'app-departure-list',
  templateUrl: './departure-list.component.html',
  styleUrls: ['./departure-list.component.css']
})
export class DepartureListComponent implements OnInit {

  public clients: Client[];
  public airports: string[];
  private airport: string;
  private airportCode: FormControl;

  constructor(private vatsimDataService: VatsimDataService) {
    this.airport = "KPHX";
    this.airports = Airports;
    this.airportCode = new FormControl();
  }

  // public get airportCode(){
  //   return this.airportSelectForm.get('airportCode');
  // }

  // public airportSelectForm = this.fb.group({
  //   airportCode: ['', Validators.required]];
  // });

  public changeAirport(evt){
    this.airport = evt.target.value;
    this.getDepartureClients();
    console.log(this.airport);
  }

  private getDepartureClients(): void{
    this.vatsimDataService
    .getZABDepartures(this.airport)
    .subscribe(foundClients => {this.clients = foundClients});
  }

  ngOnInit() {
    this.getDepartureClients();
  }

}
