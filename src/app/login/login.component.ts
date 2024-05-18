import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private api: AdminapiService, private router:Router) { }
  adminLogin() {
    if (!this.email || !this.password) {
      Swal.fire({
        title: "Ooops...",
        text: "Please fill the form completely",
        icon: "info"
      });
    }
    else {
      this.api.authorization().subscribe({
        next: (res: any) => {
          console.log(res)
          if(res.email == this.email && res.password == this.password){
            Swal.fire({
              title: "Wow",
              text: "Logged in successfully",
              icon: "success"
            });
            this.api.updateData({data:true})
            localStorage.setItem("name",res.name)
            // navigate to dashboard
            this.router.navigateByUrl('dashboard')
          }
          else{
            Swal.fire({
              title: "Ooops",
              text: "Invalid email or password",
              icon: "error"
            });
          }
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}
