import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-statistic2',
  templateUrl: './statistic2.component.html',
  styleUrls: ['./statistic2.component.css']
})
export class Statistic2Component implements OnInit {
  limits = []
  count = []

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = this.limits


  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.count }

  ];
  public barChartColors = [{ backgroundColor: 'rgb(64, 199, 30)' }]

  constructor(private vs: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.TypesOfLimitations()
  }
  TypesOfLimitations() {
    this.vs.TypesOfLimitations().subscribe((ans) => {
      ans.forEach(data => {
        this.limits.push(data['restriction'])
        this.count.push(data['count'])
      })
    })
  }

}
