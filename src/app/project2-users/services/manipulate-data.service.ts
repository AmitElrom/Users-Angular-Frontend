import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManipulateDataService {

  constructor() { }

  firstLetterCase (str : string) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
  } 

  titleCase (str : string) {
        return str.trim().split(/[\s,\t,\n]+/).map(s => this.firstLetterCase(s)).join(" ")
  } 
}
