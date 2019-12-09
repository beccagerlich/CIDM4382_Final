import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatsimdate'
})
export class VatsimDatePipe implements PipeTransform {

  transform(date: string): string {

    //20191023002813
    let year = parseInt(date.slice(0,4));
    let month = parseInt(date.slice(4,6));
    let day = parseInt(date.slice(6,8));
    let hour = parseInt(date.slice(8,10));
    let minute = parseInt(date.slice(10,12));
    let second = parseInt(date.slice(12,14));

    //creating a new date in Zulu Time: https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
    const dateutc = new Date(Date.UTC(year, month - 1, day, hour, minute, second, 0));
    return dateutc.toUTCString();
  }

}
