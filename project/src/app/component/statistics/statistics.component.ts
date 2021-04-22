import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { data } from 'jQuery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})


export class StatisticsComponent implements OnInit {

  statisticShown = [true, false, false, false]


  constructor(private vs: VolunteeringserviceService, private route: Router) {
  }

  ngOnInit(): void {

  }

  setStatisticsIsShown(num: number) {
    this.statisticShown = [false, false, false, false]
    this.statisticShown[num] = true
  }


}



