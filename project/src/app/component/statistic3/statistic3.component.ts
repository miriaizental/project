import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { data } from 'jQuery';
@Component({
  selector: 'app-statistic3',
  templateUrl: './statistic3.component.html',
  styleUrls: ['./statistic3.component.css']
})
export class Statistic3Component implements OnInit {
  satisfaction_a = 0
  satisfaction_b = 0
  satisfaction_c = 0
  satisfaction = []
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

  public pieChartLabels: Label[] = [['לא מרוצה'], ['מרוצה'], 'מרוצה מאד'];

  public pieChartData: number[] = this.satisfaction
  //public pieChartData: number[] = [300, 500, 100];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor(private vs:VolunteeringserviceService) { }

  ngOnInit(): void {
    this.Satisfaction()
  }
  
  Satisfaction() {
    this.vs.Satisfaction().subscribe((ans) => {
      ans.forEach(data => {
        if (data['satisfaction'] < 4)
          this.satisfaction_a++
        else
          if (data['satisfaction'] < 8)
            this.satisfaction_b++
        if (data['satisfaction'] >= 8)
          this.satisfaction_c++
      })
      this.satisfaction.push(this.satisfaction_a)
      this.satisfaction.push(this.satisfaction_b)
      this.satisfaction.push(this.satisfaction_c)

    })
  }

}
