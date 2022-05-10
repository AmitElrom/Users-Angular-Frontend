import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpProject2Service } from './http-project2.service';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(private srvHttpProject2 : HttpProject2Service) { }

  getUsers(_id? : string)
  {
    if(_id != null)
    {
      return this.srvHttpProject2.getItems("users/" + _id);
    }
    else
    {
      return this.srvHttpProject2.getItems("users");
    }
  }

  updateUser(id : string, obj : User)
  {
    return this.srvHttpProject2.updateItem("users/" + id, obj);
  }

  deleteUser(id : string)
  {
    return this.srvHttpProject2.deleteItem("users/" + id);
  }

  addUser(obj : any)
  {
    return this.srvHttpProject2.addItem("users", obj)
  }

}
