import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class HttpProject2Service {

  constructor(private http : HttpClient) { }

  getItems(urlEnding : string)
  {
    return this.http.get("http://localhost:3112/api/" + urlEnding);
  }

  updateItem(urlEnding : string, obj : any)
  {
    return this.http.put("http://localhost:3112/api/" + urlEnding, obj)
  }

  deleteItem(urlEnding : string)
  {
    return this.http.delete("http://localhost:3112/api/" + urlEnding);
  }

  addItem(urlEnding : string, obj : any)
  {
    return this.http.post("http://localhost:3112/api/" + urlEnding, obj);
  }

}
