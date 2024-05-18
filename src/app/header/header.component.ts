import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged:boolean = false;
  constructor(private route: Router, private api:AdminapiService) {
    this.api.sharedData.subscribe((res:any)=>{
      this.logged = res
    })
   }
  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("password")
    this.route.navigateByUrl("")
    this.api.updateData(false)
  }
}
