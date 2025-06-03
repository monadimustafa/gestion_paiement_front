import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any = {
    admin: {username: "admin", password: "1234", roles: ["STUDENT", "ADMIN"]},
    user: {username: "admin", password: "1234", roles: ["STUDENT"]}
  }
  isAuthenticated: boolean = false;
  authenticatedUser: any = {
    username: null,
    roles: []
  }
  
  constructor() { }

login(username: string,password: string): boolean{
    if(this.users[username] && this.users[username]["password"] === password){
      this.isAuthenticated = true;
      this.setAutheticatedUser(username, this.users[username]["roles"])
      return true;
    }
    return false;
  }

  logout(){
    this.isAuthenticated = false;
    this.setAutheticatedUser(null, [])
  }
  
  setAutheticatedUser(username: string | null, roles: string[]){
      this.authenticatedUser = {username, roles}
      return;
  }


}
