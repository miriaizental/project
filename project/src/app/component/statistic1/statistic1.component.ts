import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-statistic1',
  templateUrl: './statistic1.component.html',
  styleUrls: ['./statistic1.component.css']
})
export class Statistic1Component implements OnInit {
  cities = []
  counts = []
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = this.cities
  public pieChartData: number[] = this.counts
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: 'rgb(64, 199, 30)',
      //backgroundColor: ['green', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },

  ];

  constructor(private vs: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.getCities()
  }
  getCities() {
    this.vs.GetCities().subscribe((ans) => {
      ans.forEach(data => {
        this.cities.push(data['city'])
        this.counts.push(data['count'])
      })
    })

  }

}
