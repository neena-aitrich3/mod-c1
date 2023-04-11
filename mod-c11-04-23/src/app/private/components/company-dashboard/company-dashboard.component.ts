import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from '../../services/chart.service';
import { PublicUserService } from '../../services/public-user.service';
import { UserService } from '../../services/user.service';
import { Chart, registerables, ChartDataset, ChartOptions, } from 'chart.js/auto';
//  Chart.register(...registerables)
import { Filtermodel } from '../../models/filtermodel';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  userList: any
  userName: any = localStorage.getItem('username');
  selectedTeam = '';
  // result: any;
  coinPrice: any;
  users: any;
  coinName: any;
  values: any;
  chart!: Chart;
  selectedValue: any;
  yesterday: string | undefined
  dateOne = new Date('2023-01-03')
  dateTwo = new Date('2023-03-03')
  Date_to_check = "2023-01-10";
  value1: any;
  arr: any;
  filterValue: any | undefined;
  entities = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'TODAY' },
    { id: 2, name: 'YESTERDAY' },
    { id: 3, name: 'WTD' },
    { id: 4, name: 'MTD' },
    { id: 5, name: 'CUSTOM' },
  ];

  //  companyId:any=localStorage.setItem('id');
  constructor(
    private publicuserser: PublicUserService, private chartser: ChartService,
    private router: Router) { }

  from: string = "2023-01-25";
  to: string = "2023-02-25";

  now: Date = new Date();



  // days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // firstmonths = ['January', 'Februry', 'March', 'April', 'May', 'June'];
  // secondmonth = ['July', 'Augest', 'September', 'October', 'November', 'December'];
  // result: any | undefined;


  data: any;
  barchart: any;
  day: string | undefined;
  //.............https://www.npmjs.com/package/typescript-calendar-date/v/1.3.1

  viewDay() {
    // const arr = event.target.value;
    this.arr = this.filterValue;
    // alert("sucess" + " " + this.arr)
    console.log("Selected Option Is " + this.arr)
    var obj: Filtermodel = new Filtermodel();


    var DateToCheck: any;
    switch (this.arr) {
      case 'TODAY':
        //alert("It is Option-Today");
        console.log("It is Option-Today");
        labelname: "March 04"
        DateToCheck = new Date()
        obj.fdate = new Date().toISOString().slice(0, 10).toString();
        obj.type = 'TODAY';
        obj.tdate = new Date().toISOString().slice(0, 10).toString();
        break;
      case 'YESTERDAY':
        //alert("It is Option-Yeterday");
        console.log("It is Option-Yesterday");
        let currentDate = new Date()

        // Subtract one day (in milliseconds) to get yesterday's date
        let yesterdayDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

        // Format the date as a string using the toISOString() method
        obj.fdate = yesterdayDate.toISOString().slice(0, 10);

        console.log(obj.fdate); // Output: "2023-03-05"
        //  obj.fdate=
        obj.type = 'YESTERDAY';
        obj.tdate = new Date().toISOString().slice(0, 10).toString();

        break;
      case 'WTD':
        //       //alert("It is Option-WTD");
        console.log("It is Option-Week.");
        //         // obj.fdate=new Date().toLocaleDateString('en-GB').toString();
        //         // obj.type='WTD';
        //         // obj.tdate=new Date().toLocaleDateString('en-GB').toString();
        let DateCurrent = new Date();

        // Calculate the start and end dates of the week
        let firstDayOfWeek = new Date(DateCurrent.setDate(DateCurrent.getDate() - DateCurrent.getDay() + 1));
        let lastDayOfWeek = new Date(DateCurrent.setDate(DateCurrent.getDate() - DateCurrent.getDay() + 7));

        // Format the dates as strings using the toISOString() method
        obj.fdate = firstDayOfWeek.toISOString().slice(0, 10);
        obj.type = 'WTD';
        obj.tdate = lastDayOfWeek.toISOString().slice(0, 10);

        console.log(obj.fdate); // Output: "2023-03-06"
        console.log(obj.tdate); // Output: "2023-03-12"
        break;
      case 'MTD':
        //alert("It is Option-MTD");
        console.log("It is a Month.");

        // obj.fdate=new Date().toLocaleDateString('en-GB').toString();
        // obj.type='MTD';
        // obj.tdate=new Date().toLocaleDateString('en-GB').toString();
        // Get the current date
        let currentMonth = new Date();

        // Calculate the start and end dates of the month
        let firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        let lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        // Format the dates as strings using the toISOString() method
        obj.fdate = firstDayOfMonth.toISOString().slice(0, 10);
        obj.type = 'MTD';
        obj.tdate = lastDayOfMonth.toISOString().slice(0, 10);

        console.log(obj.fdate); // Output: "2023-03-01"
        console.log(obj.tdate); // Output: "2023-03-31"
        break;
      case 'CUSTOM':
        //alert("It is Option-Custom");
        console.log("It is a Custom.");
        // Set the from and to dates
        let fromDate = new Date('2023-03-01');
        let toDate = new Date('2023-03-31');

        // Format the dates as strings using the toISOString() method
        obj.fdate = fromDate.toISOString().slice(0, 10);
        obj.type = 'CUSTOM';
        obj.tdate = toDate.toISOString().slice(0, 10);

        console.log(obj.fdate); // Output: "2023-03-01"
        console.log(obj.tdate); // Output: "2023-03-31"
        break;

      default:
        console.log("No such option exists!");
        break;
    }
    // this.day = event
    // this.viewresultchart(this.day)
    this.viewresultchart(obj);

  }
 

  setFiltervalue(event: any) {
    this.filterValue="";
this.filterValue = event.target.value;
this.viewDay();

  }
  fooFunction(i: number, entityName: string) {
    console.log(`${i} - ${entityName}`);
  }

  ngOnInit(): void {
    // alert(this.now.toLocaleDateString("en-US"));

    this.publicuserser.users().subscribe((res: any) => {
      this.userList = res;
      // console.log(this.userList.id);
      localStorage.setItem('id', this.userList.id);
      localStorage.setItem('companyid', this.userList.companyId);
      localStorage.setItem('companyname', this.userList.companyName);


      console.log(this.userList)

    }),

  this.filterValue="TODAY";
    this.viewDay();

  }


  viewresultchart(resultdate: any) {
    console.log(resultdate);
    this.chartser.getchartData(resultdate).subscribe(data => {

      console.log(data)
      console.log(data.user)
      const chartData = {

        //  labels: data.adminUser,
        // labels: [this.getLabels()], display: false,
        labels: ["active users"], display: false,
        title: "Registration count",
        responsive: true,

        datasets: [

          {
            label: ' User',
            data: data.user,
            // data: ['300','700', '600', '179', '82','92', '573', '556'],
            //dataPoints:data.user,
            //  borderColor: '#3e95cd',
            backgroundColor: "#3e95cd",
            fill: false,
            // borderColor: 'Blue',
            tension: 0.1,
            barThickness:40

          },


        ],
        options: {
          aspectRatio: 2.5
        }

      };

      //       var myChart = document.getElementById('myChart');
      // if (myChart){
      //   myChart.remove();
      //   // myChart.destroy();
      // }
      // this.chart.destroy();
      // Create the chart
      console.log(this.chart);

      if (this.chart != undefined) {
        this.chart.config.data = chartData;
        this.chart.update();
      } else {
        this.chart = new Chart('myChart', {
          type: 'bar',
          data: chartData,
          options: {   plugins: {
            legend: {
              display: true,
              position: 'right',
              labels:{

              usePointStyle:true,
              pointStyle:'circle'
              
              
              }
            }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { text: 'Registration Count', display: true },
                display: true
              },
              x: {
                // title: { text: this.getLabels(), display: true },

                //  title: { text: 'X-Data', display: true },
                // labels:['jan 1','feb 1']
                // labels: this.getLabels()

              },

            },
            responsive: true,
            // plugins:  [ChartDataLabels],


          }
        });

      }
      // alert(this.result);
    });

  }
  getLabels(): any {
    if (this.arr === 'WTD') {
      // this.updateChart();
      // this.chart.update();
      return 'WTD';
      // this.updateChart();
    } else if (this.arr === 'MTD') {
      // this.updateChart();
      // this.chart.update();
      return 'MTD';
    }
    else if (this.arr === 'TODAY') {
      // this.updateChart();
      return 'TODAY';
    }
    else if (this.arr === 'YESTERDAY') {
      return 'YESTERDAY';
    }
    else {
      return 'CUSTOM'
    }
  }


  // update chart when selected option changes
  updateChart() {
    // this.chart.data.labels = this.getLabels();
    // this.chart.update();
  }
}
