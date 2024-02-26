// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid,
} from 'ng-apexcharts';

import { ApiService } from 'src/app/core/services/api.service';
import { CHIFFRES_PER_DAY, CHIFFRES_PER_MONTH, CA_PER_DAY, CA_PER_MONTH, TEMPS_AVG } from 'src/app/constants/api.constant';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule, NgxSpinnerModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss'],
})
export default class ApexChartComponent  implements OnInit{
  @ViewChild('chart') chart: ChartComponent;
  barSimpleChart: Partial<ChartOptions>;
  barSimpleChartPerMonth: Partial<ChartOptions>;
  barStackedChart: Partial<ChartOptions>;
  areaAngleChart: Partial<ChartOptions>;
  areaSmoothChart: Partial<ChartOptions>;
  lineAreaChart: Partial<ChartOptions>;
  donutChart: Partial<ChartOptions>;

  data: any;
  dataResaPerMonth: any ;
  dataCAPerDAy: any;
  dataCAPerMonth: any;

  dataWavgEmpl: any;
  

  series =  [];
  categories = [];

  seriesResaPerMonth =  [];
  categoriesResaPerMonth = [];

  seriesCA =  [];
  categoriesCA = [];

  seriesCAMonth =  [];
  categoriesCAMonth = [];

  seriesWavgEmpl =  [];
  categoriesWavgEmpl = [];

  constructor(private apiService: ApiService, private toastrService: ToastrService) {
    this.barSimpleChart = {
      series: [
        {
          name: 'Nombre ',
          data: this.series,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: "rounded"
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: this.categories,
      },
      yaxis: {
        title: {
          text: 'Nombre de reservation par Jour',
        },
      },
      fill: {
        opacity: 1,
      },
      colors:['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
      tooltip: {
        y: {
          formatter: function (val) {
            return ''+ val;
          },
        },
      },
    };

    this.barSimpleChartPerMonth = {
      series: [
        {
          name: 'Nombre ',
          data: this.seriesResaPerMonth,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: "rounded"
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: this.categoriesResaPerMonth,
      },
      yaxis: {
        title: {
          text: 'Nombre de reservation par mois',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ''+ val;
          },
        },
      },
    };
    // this.barStackedChart = {
    //   series: [
    //     {
    //       name: 'PRODUCT A',
    //       data: [44, 55, 41, 67, 22, 43, 21, 49],
    //     },
    //     // {
    //     //   name: 'PRODUCT B',
    //     //   data: [13, 23, 20, 8, 13, 27, 33, 12],
    //     // },
    //     // {
    //     //   name: 'PRODUCT C',
    //     //   data: [11, 17, 15, 15, 21, 14, 15, 13],
    //     // },
    //   ],
    //   chart: {
    //     type: 'bar',
    //     height: 350,
    //     stacked: true,
    //     stackType: '100%',
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         legend: {
    //           position: 'bottom',
    //           offsetX: -10,
    //           offsetY: 0,
    //         },
    //       },
    //     },
    //   ],
    //   xaxis: {
    //     categories: this.categoriesResaPerMonth,
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'right',
    //     offsetX: 0,
    //     offsetY: 50,
    //   },
    // };
    this.areaAngleChart = {
      chart: {
        height: 380,
        type: 'area',
        stacked: false,
      },
      stroke: {
        curve: 'straight',
      },
      series: [
        {
          name: 'Music',
          data: this.seriesResaPerMonth,
        },
        // {
        //   name: 'Photos',
        //   data: [32, 33, 21, 42, 19, 32],
        // },
      ],
      xaxis: {
        type:'category',
        categories: this.categories,
        // [
        //   '2011 Q1',
        //   '2011 Q2',
        //   '2011 Q3',
        //   '2011 Q4',
        //   '2012 Q1',
        //   '2012 Q2',
        // ],
      },
      tooltip: {
        followCursor: true,
          x: {
            formatter: function (val) {
              return ''+ val;
            },
          },
        
      },
      fill: {
        opacity: 1,
      },
    };
    this.areaSmoothChart = {
      series: [
        {
          name: 'CA',
          data: this.seriesCA
        },
        // {
        //   name: 'series2',
        //   data: [11, 32, 45, 32, 34, 52, 41],
        // },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: this.categoriesCA,
        // [
        //   '2018-09-19T00:00:00.000Z',
        //   '2018-09-19T01:30:00.000Z',
        //   '2018-09-19T02:30:00.000Z',
        //   '2018-09-19T03:30:00.000Z',
        //   '2018-09-19T04:30:00.000Z',
        //   '2018-09-19T05:30:00.000Z',
        //   '2018-09-19T06:30:00.000Z',
        // ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
    this.lineAreaChart = {
      series: [
        {
          name: 'Desktops',
          data: [20, 55, 45, 75, 50, 75, 100],
        },
        {
          name: 'Desktops',
          data: [10, 45, 35, 65, 40, 65, 90],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      },
    };
    this.donutChart = {
      chart: {
        type: 'donut',
        width: '100%',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            size: '75%',
          },
          offsetY: 20,
        },
      },
      colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
      series: this.seriesWavgEmpl,
      labels: this.categoriesWavgEmpl,
      legend: {
        position: 'left',
        offsetY: 80,
      },
    };
    
  }

  ngOnInit(): void {
    this.getDataResaPerMonth();
    this.getDataResaPerDay();
    this.getDataCAPerDay();
    // this.getDataCAPerMonth();
    this.getTempsAvgEmpl();
  }

  getDataResaPerDay():void{
    this.apiService.getData(CHIFFRES_PER_DAY).subscribe(datas => {
      this.data = datas.result;
      this.data.forEach(dt => {
        this.categories.push(dt._id);
        this.series.push(dt.numberResa);
      });
      
    }, err => {
      this.toastrService.error(err);
    })
  }

  getDataResaPerMonth():void{
    this.apiService.getData(CHIFFRES_PER_MONTH).subscribe(datas => {
      this.dataResaPerMonth = datas.result;
      this.dataResaPerMonth.forEach(dt => {
        this.categoriesResaPerMonth.push(dt._id);
        this.seriesResaPerMonth.push(dt.numberResa);
      });
    }, err => {
      this.toastrService.error(err);
    })
  }

  getDataCAPerDay():void{
    this.apiService.getData(CA_PER_DAY).subscribe(datas => {
      this.dataCAPerDAy = datas.result;
      this.dataCAPerDAy.forEach(dt => {
        this.categoriesCA.push(dt._id);
        this.seriesCA.push(dt.CA);
      });
    }, err => {
      this.toastrService.error(err);
    })
  }

  getDataCAPerMonth():void{
    this.apiService.getData(CA_PER_MONTH).subscribe(datas => {
      this.dataCAPerMonth = datas.result;
      this.dataCAPerMonth.forEach(dt => {
        this.categoriesCAMonth.push(dt._id);
        this.seriesCAMonth.push(dt.CA);
      });
    }, err => {
      this.toastrService.error(err);
    })
  }

  getTempsAvgEmpl():void{
    this.apiService.getData(TEMPS_AVG).subscribe(datas => {
      this.dataWavgEmpl = datas.result;
      this.dataWavgEmpl.forEach(dt => {
        this.categoriesWavgEmpl.push(dt.username);
        this.seriesWavgEmpl.push(dt.AvgWEmpl);
      });
    }, err => {
      this.toastrService.error(err);
    })
  }
}
