
import { Card, Rarity } from './../models/models';
import { HttpService } from 'src/app/services/http.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DeckService } from '../services/deck.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { Deck } from '../models/models';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, RouterModule, NgFor],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent {
  constructor(private apiService: ApiService, private deckservice: DeckService, private matchService: MatchService) { }

  chart1: any;
  chart2: any;
  chart3: any;

  cartes: any = null;
  statsdeckswl: any = null;
  deckStats: any = null;
  dataPoints: any = null;
  nbrVictoires: any;
  nbrDefaites: any;
  selectedDeck: Deck | null = null;

  decks: any;
  selectedDeckId: string = "starting";


  async ngOnInit() {
    const playerId = sessionStorage.getItem("playerId");

    if (playerId) {

      console.log("here")
      // this.stats = await this.apiService.getPlayerStats(playerId);
      this.cartes = await this.apiService.getPlayersCards();
      this.decks = await this.apiService.getDecksStatistiques(playerId);
      console.log("here1")
      console.log("decks", this.decks)
      console.log("cartes", this.cartes)
      this.nbrVictoires = this.decks[0].wins;
      this.nbrDefaites = this.decks[0].losses;
      console.log("victoires", this.nbrVictoires)
      console.log("victoires", this.nbrDefaites)
      this.updateChart(this.cartes);
      this.updateCharts(this.cartes);


    }
    this.matchService.statsUpdated$.subscribe(() => {
      const playerId = sessionStorage.getItem("playerId");
      if (playerId) this.chargerStats(playerId);
    });
  }

  async chargerStats(playerId: string) {
    this.cartes = await this.apiService.getPlayersCards();
    this.decks = await this.apiService.getDecksStatistiques(playerId);
    const stats = await this.apiService.getPlayerStats(playerId);

    this.nbrVictoires = stats.totalWins;
    this.nbrDefaites = stats.totalLosses;
    this.updateChart(stats.cards);
    this.updateCharts(stats.cards);
  }


  async onDeckChange(event: any) {
    this.selectedDeckId = event.target.value;
    const playerId = sessionStorage.getItem("playerId");

    if (!playerId) return;

    if (this.selectedDeckId === "all") {
      this.nbrVictoires = this.decks.reduce((sum: number, d: any) => sum + d.wins, 0);
      this.nbrDefaites = this.decks.reduce((sum: number, d: any) => sum + d.losses, 0);
      this.updateChart(this.cartes);
      this.updateCharts(this.cartes);
    } else {
      const deckStats = await this.apiService.getdeckStats(this.selectedDeckId);
      this.nbrVictoires = deckStats.wins;
      this.nbrDefaites = deckStats.losses;
      const cards = deckStats.cards.map((ownedCard: any) => ownedCard.card);
      this.updateChart(cards);
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
      yValueFormatString: "#,###.##''",

      dataPoints: [
        { y: 0, name: "Commune" },
        { y: 0, name: "Rare" },
        { y: 0, name: "Épique" },
        { y: 0, name: "Légendaire" }
      ]
    }]
  }

  chartOptions2 = {
    animationEnabled: true,
    title: { text: "Attaque et Défense" },
    axisX: { labelAngle: -90 },
    axisY: { title: "Valeur" },
    toolTip: { shared: true },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        e.dataSeries.visible = !(e.dataSeries.visible ?? true);
        e.chart.render();
      }
    },
    data: [
      { type: "column", legendText: "Attaque", showInLegend: true, dataPoints: [] },
      { type: "column", legendText: "Défense", showInLegend: true, axisYType: "secondary", dataPoints: [] }
    ]
  };

  chartOptions3 = {
    animationEnabled: true,
    title: { text: "Coût en mana" },
    axisY: { includeZero: true, title: "Nombre de cartes" },
    axisX: { title: "Mana" },
    data: [
      { type: "bar", indexLabel: "{y}", dataPoints: [] }
    ]
  };

  getChart1Instance(chart: any) {
    this.chart1 = chart;
  }

  getChart2Instance(chart: any) {
    this.chart2 = chart;
  }

  getChart3Instance(chart: any) {
    this.chart3 = chart;
  }


  updateCharts(cards: any[]): void {
    // --- Graphique coût en mana ---
    const manaMap: { [key: number]: number } = {};
    cards.forEach(card => {
      manaMap[card.cost] = (manaMap[card.cost] || 0) + 1;
    });

    if (this.chart3) {
      this.chart3.options.data[0].dataPoints = Object.entries(manaMap).map(([mana, count]) => ({
        label: mana,
        y: count
      }));
      this.chart3.render();
    }

    // --- Graphique attaque / défense ---
    if (this.chart2) {
      this.chart2.options.data[0].dataPoints = cards.map(card => ({
        label: card.name,
        y: card.attack
      }));
      this.chart2.options.data[1].dataPoints = cards.map(card => ({
        label: card.name,
        y: card.health
      }));
      this.chart2.render();
    }
  }


  updateChart(cards: any[]): void {
    if (!this.chart1) return;

    const rarityGroups: Record<string, number> = {
      Commune: 0,
      Rare: 0,
      Épique: 0,
      Légendaire: 0
    };

    cards.forEach(card => {
      switch (card.rarity) {
        case Rarity.Commmon:
          rarityGroups["Commune"]++; break;
        case Rarity.Rare:
          rarityGroups["Rare"]++; break;
        case Rarity.Epic:
          rarityGroups["Épique"]++; break;
        case Rarity.Legendary:
          rarityGroups["Légendaire"]++; break;
      }
    });

    const newDataPoints = Object.entries(rarityGroups)
      .filter(([_, count]) => count > 0)
      .map(([name, y]) => ({
        name,
        y
      }));

    this.chart1.options.data[0].dataPoints = newDataPoints;

    this.chart1.render();
  }

  updateRarityChart(): void {
    if (!this.chart1) return;

    const cardsToDisplay = this.selectedDeck
      ? this.selectedDeck.deckOwnedCards
      : this.cartes;

    const rarityGroups: Record<string, { count: number, names: string[] }> = {
      Commune: { count: 0, names: [] },
      Rare: { count: 0, names: [] },
      Épique: { count: 0, names: [] },
      Légendaire: { count: 0, names: [] }
    };

    cardsToDisplay.forEach((card: any) => {
      let rarityLabel = "";
      switch (card.rarity) {
        case Rarity.Commmon: rarityLabel = "Commune"; break;
        case Rarity.Rare: rarityLabel = "Rare"; break;
        case Rarity.Epic: rarityLabel = "Épique"; break;
        case Rarity.Legendary: rarityLabel = "Légendaire"; break;
      }

      if (rarityLabel && rarityGroups[rarityLabel]) {
        rarityGroups[rarityLabel].count++;
        rarityGroups[rarityLabel].names.push(card.name);
      }
    });

    const dataPoints = Object.entries(rarityGroups)
      .filter(([_, group]) => group.count > 0)
      .map(([rarity, group]) => ({
        label: rarity,
        y: group.count,
        toolTipContent: `<b>${rarity}</b><br/>${group.count} carte(s):<br/>${group.names.join('<br/>')}`
      }));

    this.chart1.options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Répartition par rareté",
        fontSize: 20
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "## cartes",
        indexLabel: "{label} - {y}",
        toolTipContent: "{toolTipContent}",
        dataPoints: dataPoints
      }]
    };

    this.chart1.render();
  }
}
