import {  Component, OnChanges, SimpleChanges,ChangeDetectorRef   } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../../model/book.model';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    books: Book[] = [];
    login_b:boolean=true;
    constructor(private AuthService: AuthService) {}
    ngOnInit(): void {
    this.login();
    }

    login() {
      this.AuthService.login({
        "name":"amol",
        "email":"amol@asf.in",
        "password":"password"
    }).subscribe((data: any) => {
        this.AuthService.token=data.token;
        console.log("login",data.token);
    });
    }
    buttonToogle(){
        this.login_b=!this.login_b;
    }



}
