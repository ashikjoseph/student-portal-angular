import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  searchKey: any = "";
  allStudentsData: any = []
  p:number = 1;
  constructor(private api: AdminapiService) { }
  ngOnInit(): void {
    this.getAllStudents()
  }
  getAllStudents() {
    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allStudentsData = res
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  deleteStudent(id: any) {
    this.api.deleteStudentApi(id).subscribe({
      next: (res: any) => {
        alert("Student deleted successfully")
        this.getAllStudents();
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  sortById() {
    this.allStudentsData.sort((a: any, b: any) => a.id - b.id)
  }
  sortByName() {
    this.allStudentsData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })
  }
  generatePdf() {
    const pdf = new jsPDF();
    let head = [['Id', 'Student Name', 'Email', 'Status']];
    let body: any = [];
    this.allStudentsData.forEach((item: any) => {
      if (item.id != 1) {
        body.push([item.id, item.name, item.email, item.status])
      }
    });
    pdf.text("Student Details", 10, 10);
    autoTable(pdf, { head: head, body: body })
    pdf.output('dataurlnewwindow')
    pdf.save("student-details.pdf")
  }
}
