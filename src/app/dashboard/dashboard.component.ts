import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  editAdminStatus: boolean = false;
  profileImage: string = './assets/images/user.png'
  chartOptions: any = {}
  adminName: any = ""
  adminDetails: any = {}
  selected: Date | null = new Date();
  constructor(private api: AdminapiService) {
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Student Data'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text:
          'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'B.Tech',
              y: 55.02
            },
            {
              name: 'Polytechnic',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'MCA',
              y: 1.09
            },
            {
              name: 'BCA',
              y: 15.5
            },
            {
              name: 'Others',
              y: 1.68
            }
          ]
        }
      ]
    }
  }
  showSideBar: boolean = true;
  studentLength: number = 0;
  ngOnInit(): void {
    this.getAllStudentLength()
    if (localStorage.getItem("name")) {
      this.adminName = localStorage.getItem("name")
    }
    this.api.authorization().subscribe((res: any) => {
      this.adminDetails = res;
      if (this.adminDetails.picture) {
        this.profileImage = res.picture
      }
      console.log("admin details")
      console.log(this.adminDetails)
    })
  }
  getAllStudentLength() {
    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        console.log(res)
        this.studentLength = res.length - 1
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  showMenu() {
    this.showSideBar = !this.showSideBar
  }
  edit() {
    this.editAdminStatus = true;
  }
  getFile(event: any) {
    let fileDetail = event.target.files[0]
    console.log(fileDetail)
    // filereader is used to convert image
    let fr = new FileReader();
    fr.readAsDataURL(fileDetail)
    fr.onload = (event: any) => {
      console.log(event.target.result)
      this.profileImage = event.target.result;
      this.adminDetails.picture = this.profileImage;
    }
  }
  updateAdmin() {
    this.api.updateAdminApi(this.adminDetails).subscribe({
      next: (res: any) => {
        alert("admin details updated successfully")
        localStorage.setItem("name", res.name);
        localStorage.setItem("password", res.password)
        this.adminName = localStorage.getItem("name")
        this.editAdminStatus = false;
      },
      error: (err: any) => {
        alert(err)
      }
    })
  }
}
