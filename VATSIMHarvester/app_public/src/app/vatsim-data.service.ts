import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const Airports: string[] = [
  //BRAVO
  "KPHX", //KPHX - Phoenix Sky Harbor Intl
  //CHARLIE
  "KABQ", //KABQ - Albuquerque Intl Sunport
  "KAMA", //KAMA - Rick Husband Amarillo Intl
  "KDMA", //KDMA - Davis Monthan AFB
  "KELP", //KELP - El Paso Intl
  "KTUS", //KTUS - Tucson Intl & U90 TRACON
  //DELTA
  "KAEG", //KAEG - Double Eagle II
  "KBIF", //KBIF - Biggs AAF
  "KCHD", //KCHD - Chandler Municipal
  "KCVS", //KCVS - Cannon AFB
  "KDVT", //KDVT - Phoenix Deer Valley
  "KFFZ", //KFFZ - Falcon Field
  "KFHU", //KFHU - Sierra Vista / Libby AAF
  "KFLG", //KFLG - Flagstaff Pulliam
  "KGEU", //KGEU - Glendale Municipal
  "KGYR", //KGYR - Phoenix Goodyear
  "KHMN", //KHMN - Holloman AFB
  "KIWA", //KIWA - Phoenix-Mesa Gateway
  "KLUF", //KLUF - Luke AFB
  "KPRC", //KPRC - Ernest A Love Field
  "KROW", //KROW - Roswell Intl Air Center
  "KRYN", //KRYN - Ryan Field
  "KSAF", //KSAF - Santa Fe Municipal
  "KSDL"  //KSDL - Scottsdale
];
export { Airports };

export class Client {
  _id: string;
  callsign: string;
  cid: string;
  realname: string;
  clienttype: string;
  frequency: string;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  planned_tascruise: number;
  planned_depairport: string;
  planned_altitude: number;
  planned_destairport: string;
  server: string;
  protrevision: string;
  rating: string;
  transponder: string;
  facilitytype: string;
  visualrange: number;
  planned_flighttype: string;
  planned_deptime: number;
  planned_actdeptime: number;
  planned_hrsenroute: number;
  planned_minenroute: number;
  planned_hrsfuel: number;
  planned_minfuel: number;
  planned_altairport: string;
  planned_remarks: string;
  planned_route: string;
  planned_depairport_lat: number;
  planned_depairport_lon: number;
  planned_destairport_lat: number;
  atis_message: string;
  time_last_atis_received: string;
  time_logon: string;
  heading: number;
  QNH_iHg: number;
}

@Injectable({
  providedIn: 'root'
})
export class VatsimDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  // promise-based example from Clive and Simon
  // private handleError(error: any): Promise<any> {
  //   console.error('Dude, wrong stuff', error);
  //   return Promise.reject(error.message || error);
  // }

  public getZABArrivals(airport: string): Observable<Client[]> {
    const offset: number = 0;
    const howMany: number = 15;    

    // /arrived/:airport/:howMany/:offset'
    const url: string = `${this.apiBaseUrl}/arrived/${airport}/${howMany}/${offset}`;
    return this.http.get<Client[]>(url)
               .pipe(
                  catchError(this.handleError<Client[]>('getClients', []))
               );    

  }

  public getZABDepartures(airport: string): Observable<Client[]> {
    const offset: number = 0;
    const howMany: number = 15;

    // /departed/:airport/:howMany/:offset'
    const url: string = `${this.apiBaseUrl}/departed/${airport}/${howMany}/${offset}`;
    return this.http.get<Client[]>(url)
               .pipe(
                  catchError(this.handleError<Client[]>('getClients', []))
               );
    // .toPromise()
    // .then(response => response as Client[])
    // .catch(this.handleError);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * Code is from Tour of Heroes: https://angular.io/tutorial/toh-pt6
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  
}
