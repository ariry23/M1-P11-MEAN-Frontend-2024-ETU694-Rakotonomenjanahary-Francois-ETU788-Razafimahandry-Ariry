import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BENEFICE_STAT } from 'src/app/constants/api.constant';

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
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-dashboard-benefice',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './dashboard-benefice.component.html',
  styleUrls: ['./dashboard-benefice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardBeneficeComponent implements OnInit {

  barSimpleChart: Partial<ChartOptions>;
  donutChart: Partial<ChartOptions>;
  calculateForm: FormGroup;

  salaire = 0;
  loyer = 0;
  piece = 0;
  divers = 0;

  data: any;
  series = [];
  seriesCA = [];
  categories = [];
  counter = 0;

  constructor(private apiService: ApiService, private toastrService: ToastrService, private ref: ChangeDetectorRef, private zone: NgZone) {

      this.buildCalculateForm();
      this.caculateBenefice();
      this.barSimpleChart = {
        series: [
          {
            name: 'Benefice ',
            data: this.series,
          },
          {
            name: 'Chiffres d\'affaires ',
            data: this.seriesCA,
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
            text: 'Benefice par mois',
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
        tooltip: {
          y: {
            formatter: function (val) {
              return '' + val;
            },
          },
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
        series: this.series,
        labels: this.categories,
        legend: {
          position: 'left',
          offsetY: 80,
        },
      };
      this.ref.detectChanges;

  }

  ngOnInit(): void {

    // Run the setInterval function outside the Angular zone

  }
  ngOnChanges(): void {
    this.caculateBenefice();
  }
  buildCalculateForm(): void {
    this.calculateForm = new FormGroup({
      salaire: new FormControl(0),
      loyer: new FormControl(0),
      piece: new FormControl(0),
      divers: new FormControl(0)
    });
  }
  caculateBenefice(): void {
    this.series = [];
    this.seriesCA = [];
    this.categories = [];
    let calulateData: any = this.calculateForm.value;
    let apiData = {
      salaire: calulateData.salaire,
      loyer: calulateData.loyer,
      piece: calulateData.piece,
      divers: calulateData.divers
    }
    this.apiService.postData(BENEFICE_STAT, apiData).subscribe(datas => {
      this.data = datas.result;
      this.data.forEach(dt => {
        this.categories.push(dt._id);
        this.series.push(dt.benefice);
        this.seriesCA.push(dt.CA);
      });
      this.updateSeries();
      this.updateSeriesDonut;
      this.ref.detectChanges();
      console.log(this.categories);
      console.log(this.series);
    }, err => {
      this.toastrService.error(err);
    })
  }

  public updateSeries() {
    this.barSimpleChart.series = [
      {
        name: 'Benefice ',
        data: this.series,
      },
      {
        name: 'Chiffres d\'affaires ',
        data: this.seriesCA,
      },
    ];
  }

  public updateSeriesDonut(){
    this.donutChart.series = this.series;
  }

}
