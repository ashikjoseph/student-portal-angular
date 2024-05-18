import { Component } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  constructor(private api: AdminapiService, private route: Router) { }
  student: any = {
    id: "",
    name: "",
    email: "",
    status: ""
  }

  addStudent() {
    console.log(this.student)
    const { id, name, email, status } = this.student;
    if (!id || !name || !email || !status) {
      alert("Please fill the form completely")
      Swal.fire({
        title: "Ooops...",
        text: "Please fill the form completely",
        icon: "info"
      });
    }
    else {
      this.api.addStudentApi(this.student).subscribe({
        next: (res: any) => {
          console.log(res)
          Swal.fire({
            title: "Wow",
            text: "Student added successfully",
            icon: "success"
          });
          // navigate to student list page
          this.route.navigateByUrl('students')
        },
        error: (res: any) => {
          console.log(res)
          Swal.fire({
            title: "Ooops...",
            text: "Error in adding student",
            icon: "info"
          });
        }
      })
    }
  }
  clearFields() {
    this.student = {}
  }
}
