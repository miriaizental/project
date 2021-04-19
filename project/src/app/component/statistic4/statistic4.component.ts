import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-statistic4',
  templateUrl: './statistic4.component.html',
  styleUrls: ['./statistic4.component.css']
})
export class Statistic4Component implements OnInit {
  week_a = 0
  week_b = 0
  week_c = 0
  week = []

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
  public pieChartLabels: Label[] = [['פחות משבוע'], ['שבוע'], 'יותר משבוע'];
  public pieChartData: number[] = this.week
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor(private vs: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.ResponseTime()
  }
  ResponseTime() {
    this.vs.ResponseTime().subscribe((ans) => {
      console.log('a', ans);
      ans.forEach(data => {
        if (data['responseTime'] == 'week-')
          this.week_a++
        else
          if (data['responseTime'] == 'week')
            this.week_b++
        if (data['responseTime'] == 'week+')
          this.week_c++
      })
      this.week.push(this.week_a)
      this.week.push(this.week_b)
      this.week.push(this.week_c)
    })
  }

}
