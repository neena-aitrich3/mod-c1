import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset,ChartOptions, registerables } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { ChartService } from '../../services/chart.service';
import { Filtermodel } from '../../models/filtermodel';
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-unproductive-visit',
  templateUrl: './unproductive-visit.component.html',
  styleUrls: ['./unproductive-visit.component.css']
})
export class UnproductiveVisitComponent implements OnInit {
  yesterday:string | undefined
  // dateOne = new Date('2023-01-03')
   //dateTwo = new Date('2023-03-03')
  //  Date_to_check = "2023-01-10";
  value1: any;
  chart!:Chart
  filterValue: any | undefined;
  
 // define "lord-icon" custom element with default properties
 //defineElement(lottie.loadAnimation);
 
 
  entities = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'TODAY' },
    { id: 2, name: 'WTD' },
    { id: 3, name: 'MTD' },
  ];
  abc: string | _DeepPartialArray<string> | undefined;
 
 
  constructor(private chartser:ChartService) { }
  now:Date= new Date();
  result:any | undefined;

data:any;
barchart:any;
day:string | undefined;
viewDay(){
  // const arr = event.target.value;
  const arr=this.filterValue;
  //alert("sucess"+" "+arr)
  console.log("Selected Option Is "+arr)
  var obj:Filtermodel=new Filtermodel() ;
  
  
 var DateToCheck : any =new Date();
  switch (arr) {
    case 'TODAY':
      //alert("It is Option-Today");
      //console.log("It is Option-Today");
       
        DateToCheck= new Date()
        obj.fdate=new Date().toISOString().slice(0, 10).toString();
        obj.type='TODAY';
        obj.tdate=new Date().toISOString().slice(0, 10).toString();
        //obj.year=obj.tdate.getFullYear();
        obj.year=DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        this.abc=obj.fdate;
       // alert(obj.year+" "+obj.month)
        
        break ;
    case 'YESTERDAY':
      //alert("It is Option-Yeterday");
       // console.log("It is Option-Yesterday");
       
        const today = new Date();
        const yesterday1 = new Date(today);
        yesterday1.setDate(today.getDate() - 1);
        
        //alert(yesterday);
        obj.fdate=yesterday1.toISOString().slice(0, 10).toString();
        obj.type='YESTERDAY';
        obj.tdate=yesterday1.toISOString().slice(0, 10).toString();
    // alert(obj.fdate+"-"+obj.tdate)
    this.abc=(yesterday1.toLocaleDateString('en-GB').slice(0, 10).toString());
    obj.year=DateToCheck.getFullYear();
    obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'WTD':
      //alert("It is Option-WTD");
      // console.log("It is Option-Week.");
        
        let today1 = new Date();
        const dayOfWeek = today1.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startDate = new Date(today1);
        startDate.setDate(today1.getDate() - dayOfWeek);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        
        // alert(startDate.toLocaleDateString('en-GB').slice(0, 10).toString()+" - "+endDate.toLocaleDateString('en-GB').slice(0, 10).toString()); // Output: start date of the week in local date format
        // Output: end date of the week in local date format
 
        obj.fdate=startDate.toISOString().slice(0, 10).toString();
        obj.type='WTD';
        obj.tdate=endDate.toISOString().slice(0, 10).toString();
        this.abc=(startDate.toLocaleDateString('en-GB').slice(0, 10).toString()+" - "+endDate.toLocaleDateString('en-GB').slice(0, 10).toString());
       
        obj.year=DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'MTD':
        //alert("It is Option-MTD");
        //  console.log("It is a Month.");
        const today2 = new Date();
        const monthName = today2.toLocaleString('default', { month: 'long' });
        //alert(monthName); // output: March
 
        const today3 = new Date();
        const firstDayOfMonth = new Date(today3.getFullYear(), today3.getMonth(), 1);
        const lastDayOfMonth = new Date(today3.getFullYear(), today3.getMonth() + 1, 0);
        obj.fdate=firstDayOfMonth.toISOString().slice(0, 10).toString();
        obj.type='MTD';
        obj.tdate=lastDayOfMonth.toISOString().slice(0, 10).toString();
        
      this.abc=monthName;
      obj.year=DateToCheck.getUTCFullYear();
      obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'CUSTOM':
      //alert("It is Option-Custom");
       // console.log("It is a Custom.");
        break;
   
    default:
        console.log("No such option exists!");
        break;
 }
  // this.day=event
  // this.viewresultchart(this.day)
  this.viewresultchart(obj)
 }
 setFiltervalue(event: any) {
  this.filterValue="";
this.filterValue = event.target.value;
this.viewDay();

}

 fooFunction(i: number, entityName: string){
  console.log(`${i} - ${entityName}`);
 }

  ngOnInit(): void {
    this.filterValue="MTD";
    this.viewDay();
  }
  viewresultchart(resultdate : any){
    console.log(resultdate);
  
    this. chartser.getunproductivechartData(resultdate).subscribe(data => {
      // Create chart data
      //alert(data.company);
      //console.log(data);
      //labels: ['jan 1','feb1']
      console.log(data)
      const chartData = {
       
        labels: ['unproductive Count'],
       // labels:this.barchart[0],
        title:"Registration count",
        responsive: true,
        
        datasets: [
          {
            label:'CSA',
            data: [data.competitorStockAvailable],
            backgroundColor: [ "#ED402A","#36A2EB","#FFCE56"],
            tension: 0.1, // a new option to curve the line chart-tension more beauty
            barPercentage:0.8,            
            datalabels:{
              color:'blue',      
             }
          },
          {
            label:'HR',
            data: [data.highRate],
            backgroundColor: ["#F0AB05","#36A2EB","#FFCE56"],          
            tension: 0.1 ,// a new option to curve the line chart-tension more beauty,
            barPercentage:0.8,           
            datalabels:{
            color:'blue',        
                        }
          },
          {
            label:'OO',
            data: [data.overOutstanding],
            backgroundColor: ["#A0B421","#36A2EB","#FFCE56"],         
            fill: false,
            tension: 0.1 ,
            barPercentage:0.8,           
            datalabels:{
              color:'blue',
          
            
            }
          },
          {
           label:'SC',
           data: [data.shopClosed],
           backgroundColor: ["#00A39F","#36A2EB","#FFCE56"],
           fill: false,
           tension: 0.1,
           barPercentage:0.8,
          datalabels:{
            color:'blue',       
          
          }          
         },
         {
         label:'SA',
         data: [data.stockAvailable],
         backgroundColor: ["#00A39F","#36A2EB","#FFCE56"],
         fill: false,
         tension: 0.1,
         barPercentage:0.8,
        datalabels:{
          color:'blue',       
        
        }          
       },
       {
       label:'total-UPV',
       data: [data.totalUnproductiveVisit],
       backgroundColor: ["#00A39F","#36A2EB","#FFCE56"],
       fill: false,
       tension: 0.1,
       barPercentage:0.8,
      datalabels:{
        color:'blue',       
      
      }          
     }
         
        ]
      };
    
  
      // Create the chart
      if(this.chart!=undefined){
       this.chart.config.data=chartData;
       this.chart.update();
     }
     else
     {
     this.chart  = new Chart('myChart4', {
        
        type: 'bar',
        data: chartData,
        
        options: {
          plugins: {
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
                  //beginAtZero: true,
                  // title: { text: 'Registration Count', display: true }, 
                  display: true 
 
              } ,
              //  x: { 
              //   title: { text: this.abc, display: true },
              //  // labels:['jan 1','feb 1']
              // //  labels:data.abc
               
              //  } ,
               
               
          },          
          responsive: true,
                    
      },
      plugins: [ChartDataLabels],
      
      });
     }
    });
    
 
 }
 
 }
