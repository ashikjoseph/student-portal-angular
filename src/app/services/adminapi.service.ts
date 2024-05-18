
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {
  server_url = "https://student-server-angular.onrender.com"
  constructor(private http: HttpClient) { }

  // creating a behaviour subject
public sharedData = new BehaviorSubject(false)

// create a function to update the value of behaviour subject
updateData(data:any){
  this.sharedData.next(data)
}

  authorization() {
    return this.http.get(`${this.server_url}/student/1`)
  }
  addStudentApi(studentData: any) {
    return this.http.post(`${this.server_url}/student`, studentData)
  }

  getAllStudentsApi() {
    return this.http.get(`${this.server_url}/student`)
  }

  deleteStudentApi(studentId:any) {
    return this.http.delete(`${this.server_url}/student/${studentId}`)
  }

  getStudentDetailsById(id:any){
    return this.http.get(`${this.server_url}/student/${id}`)
  }
  
  updateStudentApi(id:any, data:any){
    return this.http.put(`${this.server_url}/student/${id}`,data)
  }
  updateAdminApi(admin:any){
    return this.http.put(`${this.server_url}/student/1`,admin)
  }
}
