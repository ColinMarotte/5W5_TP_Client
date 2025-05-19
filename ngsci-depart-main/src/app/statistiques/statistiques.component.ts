import { HttpService } from 'src/app/services/http.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Title } from '@angular/platform-browser';

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
      text: "Nombre de cartes par rareté"
    },
    data: [{
      type: "pie",
      startAngle: 45,
      indexLabel: "{name}: {y}",
      indexLabelPlacement: "inside",
      // yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 21.3, name: "Facebook" },
        { y: 27.7, name: "Instagram" },
      ]
    }]
  }

  chartOptions2 = {
    animationEnabled: true,
    title: {
      text: "Attaque et Défense"
    },
    axisX: {
      labelAngle: -90
    },
    axisY: {
      title: "Nombre de cartes"
    },
    axisY2: {
      // title: "million barrels/day"
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
      // name: "Proven Oil Reserves (bn)",
      legendText: "Attaque",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 262 },
        { label: "Venezuela", y: 211 },
        { label: "Canada", y: 175 },
        { label: "Iran", y: 137 },
        { label: "Iraq", y: 115 },
      ]
    }, {
      type: "column",
      // name: "Oil Production (million/day)",
      legendText: "Défense",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: [
        { label: "Saudi", y: 11.15 },
        { label: "Venezuela", y: 2.5 },
        { label: "Canada", y: 3.6 },
        { label: "Iran", y: 4.2 },
        { label: "Iraq", y: 2.6 },
      ]
    }]

  }

  chartOptions3 = {
    // backgroundColor: "#fffff",
    title: {
      text: "Coût en mana"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      // suffix: "K",
      title: "Nombre de cartes"
    },
    axisX: {
      title: "Mana"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###K",
      dataPoints: [
        { label: "Twitter", y: 1 },
        { label: "Facebook", y: 1 }
      ]
    }]
  }
}
