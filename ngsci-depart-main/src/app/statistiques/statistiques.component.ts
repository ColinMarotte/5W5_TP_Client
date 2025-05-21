import { HttpService } from 'src/app/services/http.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DeckService } from '../services/deck.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, RouterModule, NgFor],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent {
  constructor(private apiService: ApiService, private deckservice: DeckService) { }

  stats: any = null;
  deckStats: any = null;
  dataPoints: any = null;
  nbrVictoires: any;
  nbrDefaites: any;

  decks: any[] = [];
  selectedDeckId: string = "starting";


  async ngOnInit() {
    const playerId = sessionStorage.getItem("playerId");

    if (playerId) {

      this.stats = await this.apiService.getPlayerStats(playerId);
      this.decks = await this.deckservice.getDecks();

      this.nbrVictoires = this.stats.totalWins;
      this.nbrDefaites = this.stats.totalLosses;
      this.updateCharts(this.stats.cards);
      // this.getChartInstance(this.stats);
    }
  }

  async onDeckChange(event: any) {
    this.selectedDeckId = event.target.value;
    const playerId = sessionStorage.getItem("playerId");

    if (!playerId) return;

    if (this.selectedDeckId === "Toutes les cartes") {
      const stats = await this.apiService.getPlayerStats(playerId);
      this.nbrVictoires = stats.totalWins;
      this.nbrDefaites = stats.totalLosses;
      this.updateCharts(stats.cards);
    } else {
      const deckStats = await this.apiService.getdeckStats(this.selectedDeckId);

      this.nbrVictoires = deckStats.Wins;
      this.nbrDefaites = deckStats.losses;
      const cards = deckStats.cards.map((ownedCard: any) => ownedCard.card);
      this.updateCharts(cards);
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
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 21.3, name: this.decks },
        { y: 27.7, name: "Instagram" },
      ]
      // dataPoints: [cards.map(card => ({
      //   name: card.name,
      //   y: card.attack
      // })]
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

  //chatgpt
  updateCharts(cards: any[]) {
    // ---- Graphique coût en mana ----
    const manaMap: { [key: number]: number } = {};
    cards.forEach(card => {
      manaMap[card.cost] = (manaMap[card.cost] || 0) + 1;
    });
    this.chartOptions3.data[0].dataPoints = Object.entries(manaMap).map(([mana, count]) => ({
      label: mana,
      y: count
    }));

    // ---- Graphique rareté ----
    const rareteMap: { [key: string]: number } = {};
    cards.forEach(card => {
      rareteMap[card.rarity] = (rareteMap[card.rarity] || 0) + 1;
    });
    this.chartOptions.data[0].dataPoints = Object.entries(rareteMap).map(([rarity, count]) => ({
      name: rarity,
      y: count
    }));

    // ---- Graphique attaque / défense ----
    this.chartOptions2.data[0].dataPoints = cards.map(card => ({
      label: card.name,
      y: card.attack
    }));
    this.chartOptions2.data[1].dataPoints = cards.map(card => ({
      label: card.name,
      y: card.health
    }));
  }






}
