import { HttpService } from 'src/app/services/http.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent {
  constructor(private apiService: ApiService) { }

  stats: any = null;
  deckStats: any = null;
  dataPoints: any = null;
  nbrVictoires: any;
  nbrDefaites: any;

  async ngOnInit() {
    const playerId = sessionStorage.getItem("playerId");

    if (playerId) {

      this.stats = await this.apiService.getPlayerStats(playerId);
      // this.getChartInstance(this.stats);
    }
  }
  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: "Social Media Engagement"
    },
    data: [{
      type: "pie",
      startAngle: 45,
      indexLabel: "{name}: {y}",
      indexLabelPlacement: "inside",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 21.3, name: "Facebook" },
        { y: 27.7, name: "Instagram" },
        { y: 17, name: "Twitter" },
        { y: 14.9, name: "LinkedIn" },
        { y: 10.6, name: "Pinterest" },
        { y: 8.5, name: "Others" }
      ]
    }]
  }

  chartOptions2 = {
    animationEnabled: true,
    title: {
      text: "Crude Oil Reserves Vs Production"
    },
    axisX: {
      labelAngle: -90
    },
    axisY: {
      title: "billion of barrels"
    },
    axisY2: {
      title: "million barrels/day"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "column",
      name: "Proven Oil Reserves (bn)",
      legendText: "Proven Oil Reserves",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 262 },
        { label: "Venezuela", y: 211 },
        { label: "Canada", y: 175 },
        { label: "Iran", y: 137 },
        { label: "Iraq", y: 115 },
        { label: "Kuwait", y: 104 },
        { label: "UAE", y: 97.8 },
        { label: "Russia", y: 60 },
        { label: "US", y: 23.3 },
        { label: "China", y: 20.4 }
      ]
    }, {
      type: "column",
      name: "Oil Production (million/day)",
      legendText: "Oil Production",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 11.15 },
        { label: "Venezuela", y: 2.5 },
        { label: "Canada", y: 3.6 },
        { label: "Iran", y: 4.2 },
        { label: "Iraq", y: 2.6 },
        { label: "Kuwait", y: 2.7 },
        { label: "UAE", y: 3.1 },
        { label: "Russia", y: 10.23 },
        { label: "US", y: 10.3 },
        { label: "China", y: 4.3 }
      ]
    }]

  }

  chartOptions3 = {
    title: {
      text: "Total Impressions by Platforms"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: "K"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###K",
      dataPoints: [
        { label: "Snapchat", y: 15 },
        { label: "Instagram", y: 20 },
        { label: "YouTube", y: 24 },
        { label: "Twitter", y: 29 },
        { label: "Facebook", y: 73 }
      ]
    }]
  }
}
