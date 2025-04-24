import { AppComponent } from './../app.component';
import { Card, MatchData, PlayableCard } from 'src/app/models/models';
import { PlayerData } from '../models/models';
import { Injectable } from '@angular/core';
import { Match } from '../models/models';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const hubUrl = "https://localhost:7179/matchHub";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  match: Match | null = null;
  matchData: MatchData | null = null;
  currentPlayerId: number = -1;
  currentUserId: string = "";

  playerData: PlayerData | undefined;
  adversaryData: PlayerData | undefined;

  opponentSurrendered: boolean = false;
  isCurrentPlayerTurn: boolean = false;

  matchfini: boolean = false;
  victoire: boolean = false;
  perdant: number = -1;

  hubConnection: HubConnection | undefined;

  stoppedJoiningMatch: boolean | undefined;

  private joiningMatchSubject = new BehaviorSubject<MatchData | null>(null);
  public joiningMatch$ = this.joiningMatchSubject.asObservable();

  private MoneyReceivedSubject = new BehaviorSubject<number | null>(null);
  public MoneyReveiced$ = this.MoneyReceivedSubject.asObservable();

  constructor() {
  }

  public async seDeconnecterDuHub() {
    await this.hubConnection?.stop().then(() => {
      console.log('La connexion est arrêté!');
    })
      .catch(err => console.log('Error while stopping connection: ' + err));
  }

  public async connectToHub() {
    this.hubConnection = await new signalR.HubConnectionBuilder()
      .withUrl(hubUrl,
        // Ajout du code pour joindre le token aux requêtes SignalR (l'équivalent de l'interceptor pour les autres requêtes)
        { accessTokenFactory: () => sessionStorage.getItem("token")! }
      )
      .build();

    await this.hubConnection.on('JoiningMatchData', (data) => {
      console.log("JoiningMatchData", data);
      this.joiningMatchSubject.next(data);
      let playerIdStorage: string | null = sessionStorage.getItem("playerId")
      if (playerIdStorage) {
        this.currentPlayerId = parseInt(playerIdStorage)
      }
      this.playMatch(data, this.currentPlayerId)
    })

    await this.hubConnection.on('StartMatchEvent', (data) => {
      console.log("startMatchEvent:", data);
      this.applyEvent(data)
    })

    await this.hubConnection.on('EndTurnEvent', (data) => {
      this.applyEvent(data)
      console.log("endturnevent:", data)
    })

    await this.hubConnection.on('SurrenderEvent', (data) => {
      console.log("SurrenderEvent:", data);
      this.applyEvent(data)
    })

    await this.hubConnection.on('StoppedJoiningStatus', (data) => {
      console.log(data ? "Stopped joining the match" : "Failed to stop joining the match");
      this.stoppedJoiningMatch = data;
    })

    await this.hubConnection.on('PlayCardEvent', (data) => {
      console.log("PlayCardEvent:", data);
      this.applyEvent(data);
    })

    await this.hubConnection
      .start()
      .then(() => {
        console.log('La connexion est active!');
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public async stopJoiningMatch(): Promise<boolean> {
    await this.hubConnection?.invoke('StopJoiningMatch')

    if (this.stoppedJoiningMatch) {
      return this.stoppedJoiningMatch
    }

    return false
  }

  public async joinMatch() {
    await this.connectToHub();

    if (!this.hubConnection) {
      console.error('La connexion SignalR n\'est pas établie.');
      return;
    }

    await this.hubConnection.invoke('JoinMatch');
    console.log("invoked JoinMatch");
  }

  public async endTurn() {
    if (!this.hubConnection) {
      console.error('La connexion SignalR n\'est pas établie.');
      return;
    }
    // console.log("Ending Turn Event:", this.currentPlayerId, this.match?.id);
    await this.hubConnection.invoke('EndTurn', this.match?.id);
    console.log("invoked EndTurn")
  }

  public async surrender() {
    console.log("Ending Turn Event:", this.match?.id);
    if (!this.hubConnection) {
      console.error('La connexion SignalR n\'est pas établie.');
      return;
    }
    console.log("Surrendering")
    await this.hubConnection.invoke('Surrender', this.match?.id);

  }

  public async playCard(playableCardId:any){
    if (!this.hubConnection) {
      console.error('La connexion SignalR n\'est pas établie.');
      return;
    }
    try{
      await this.hubConnection.invoke('PlayCard', this.match?.id, playableCardId)

    }
    catch(error){
      console.log(error);
    }
  }

  // public async

  clearMatch() {
    this.match = null;
    this.matchData = null;
    this.playerData = undefined;
    this.adversaryData = undefined;
    this.opponentSurrendered = false;
    this.isCurrentPlayerTurn = false;

    this.matchfini = false;
    this.victoire = false;
    this.perdant = -1;
  }

  playMatch(matchData: MatchData, currentPlayerId: number) {
    this.matchData = matchData;
    this.match = matchData.match;
    this.currentPlayerId = currentPlayerId;
    this.match.playerDataA.battleField.sort(a => a.index);
    this.match.playerDataB.battleField.sort(a => a.index).reverse;

    if (this.match.playerDataA.playerId == this.currentPlayerId) {
      this.playerData = this.match.playerDataA!;
      this.playerData.playerName = matchData.playerA.name;
      this.adversaryData = this.match.playerDataB!;
      this.adversaryData.playerName = matchData.playerB.name;
      this.isCurrentPlayerTurn = this.match.isPlayerATurn;
    }
    else {
      this.playerData = this.match.playerDataB!;
      this.playerData.playerName = matchData.playerB.name;
      this.adversaryData = this.match.playerDataA!;
      this.adversaryData.playerName = matchData.playerA.name;
      this.isCurrentPlayerTurn = !this.match.isPlayerATurn;
    }
    this.playerData.maxhealth = 20;
    this.adversaryData.maxhealth = 20;
  }

  // La méthode qui passe à travers l'arbre d'évènements reçu par le serveur
  // Utiliser pour mettre les données à jour et jouer les animations
  async applyEvent(event: any) {
    console.log("ApplyingEvent: " + event.eventType);
    switch (event.eventType) {
      case "StartMatch": {
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      }

      case "GainMana": {
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {
          playerData.mana += event.mana;

        }
        break;
      }

      case "PlayerEndTurn": {
        if (this.match) {
          
          this.match.isPlayerATurn = !this.match.isPlayerATurn;
          this.isCurrentPlayerTurn = event.playerId != this.currentPlayerId;
        }
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {

        }
        break;
      }
      case "DrawCard": {
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {
          this.moveCard(playerData.cardsPile, playerData.hand, event.playableCardId);
          await new Promise(resolve => setTimeout(resolve, 250));
        }

        break;
      }
      case "EndMatch": {
        this.matchData!.winningPlayerId = event.winningPlayerId;
        this.match!.isMatchCompleted = true;
        console.log("MatchEnded, winner: " + this.matchData?.winningPlayerId);

        if (event.winningPlayerId === this.currentPlayerId) {
          this.victoire = true;
          this.MoneyReceivedSubject.next(event.moneyReceivedByWinner)
          console.log("Victoire pour le joueur " + this.currentPlayerId);
        } else {
          this.victoire = false;
          this.perdant = this.currentPlayerId;
          this.MoneyReceivedSubject.next(event.moneyReceivedByLoser)
          console.log("Défaite pour le joueur " + this.currentPlayerId);
        }

        break;
      }
      case "PlayCard": {
        let playerData = this.getPlayerData(event.playerId);
        if (playerData) {
          this.moveCard(playerData.hand, playerData.battleField, event.playableCardId);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        break;      
      }
      case "CardDamage":{
        let playerData = this.getPlayerData(event.playerId);
        if(playerData){
          // await new Promise(resolve => setTimeout(resolve, 250));
          let playableCard = playerData.battleField[event.battlefieldIndex];
          playableCard.health -= event.value;
          // playableCard.
        }

        break;
      }      
      case "CardDeath":{
        let playerData = this.getPlayerData(event.playerId);
        if(playerData){
          // await new Promise(resolve => setTimeout(resolve, 250));
          let playableCard = playerData.battleField[event.battlefieldIndex];
          this.moveCard(playerData.battleField, playerData.graveyard, playableCard.id);
        }

        break;
      }
      case "PlayerDamage":{
        let playerData = this.getPlayerData(event.playerId);
        if(playerData){
          // await new Promise(resolve => setTimeout(resolve, 250));
          playerData.health -= event.value;

        }

        break;
      }

    }
    if (event.events) {
      for (let e of event.events) {
        await this.applyEvent(e);
      }
    }
  }

  // Obtenir le PlayerData d'un match à partir de l'Id du Player
  getPlayerData(playerId: any): PlayerData | null {
    if (this.match) {
      if (playerId == this.match.playerDataA.playerId)
        return this.match.playerDataA;
      else if (playerId == this.match.playerDataB.playerId)
        return this.match.playerDataB;
    }
    return null;
  }

  // Déplace une carte d'un array à l'autre
  moveCard(src: PlayableCard[], dst: PlayableCard[], playableCardId: any) {
    let playableCard = src.find(c => c.id == playableCardId);

    if (playableCard != undefined) {
      let index = src.findIndex(c => c.id == playableCardId);
      // Retire l'élément de l'array
      src.splice(index, 1);
      dst.push(playableCard);
    }
  }

}
