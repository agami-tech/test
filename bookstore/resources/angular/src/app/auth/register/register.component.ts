import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { isEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public form:any ={};
    constructor(private AuthService: AuthService,private router: Router) {}
    ngOnInit(): void {
    this.register();
    }
    register() {
        this.AuthService.register(this.form).subscribe((data: any) => {
            if(data.token){
                this.AuthService.token=data.token;
                this.router.navigate(['/admin']);
            }
          console.log("login",data);
      }
      );

      }
}
