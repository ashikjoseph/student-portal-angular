import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit{
student:any={}
// ActivatedRoute is used to get id from url
constructor(private route:ActivatedRoute, private api:AdminapiService, private path:Router){}

ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    console.log(res)
    const {id}=res;
    this.getStudentById(id)
  })
}
getStudentById(id:any){
  this.api.getStudentDetailsById(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.student = res;
    },
    error:(res:any)=>{
      console.log(res)
    }
  })
}
updateStudent(id:any){
  this.api.updateStudentApi(id,this.student).subscribe({
    next:(res:any)=>{
      this.path.navigateByUrl("students")
    },
    error:(res:any)=>{
      console.log(res)
    }
  })
}

restoreValues(id:any){
  this.getStudentById(id)
}
}
