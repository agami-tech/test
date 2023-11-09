import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  token ='';
  notification_status:any={"show":false};
  constructor(public AuthService: AuthService) {
    this.token=this.AuthService.token;
  }
  ngOnInit(): void {
  }
  showMessage(title:string,message:string,time:string){
    this.notification_status.show=true;
    this.notification_status.title=title;
    this.notification_status.message=message;
    this.notification_status.time=time;
    console.log("n",this.notification_status);
     setTimeout(() => {
         this.notification_status.show = false;
       }, 3000);
 }
 logout(){
    this.AuthService.token='';
    this.token='';
    location.reload();
 }
}
