import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import {MatchData} from "../models/models";

const _hubUrl = "https://localhost:7179/matchHub";

@Injectable({
  providedIn: 'root'

})
export class HubService {

  userId = "";
  hubConnection: HubConnection | undefined;
  startMatchEvent = null;
  joiningMatchData : MatchData| null = null;
  surrenderEvent : Event | null = null;
  endTurnEvent : Event | null = null;

  constructor() {
    this.connectToHub();
  }

  private connectToHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(_hubUrl)
                              .build();

    this.hubConnection.on('JoiningMatchData', (data) => {
      console.log("JoiningMatchData", data);
      this.joiningMatchData = data;
    })

    this.hubConnection.on('StartMatchEvent', (data) => {
      console.log("startMatchEvent:",data);
      this.startMatchEvent = data;
    })

    this.hubConnection.on('EndTurnEvent', (data) => {
      this.endTurnEvent = data;
    })

    this.hubConnection.on('SurrenderEvent', (data) => {
      console.log("SurrenderEvent:",data);
      this.surrenderEvent = data;
    })

    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion est active!');
          })
        .catch(err => console.log('Error while starting connection: ' + err));
}



public async joinMatch(userId: string): Promise<MatchData | null>{
  if (!this.hubConnection) {
    console.error('La connexion SignalR n\'est pas établie.');
    return null;
  }

  await this.hubConnection.invoke('JoinMatch', userId );
  console.log("startmatchEvent:",this.startMatchEvent);
  return this.joiningMatchData;
  }

  public async endTurn(userId: string, matchId : number){
      console.log("Ending Turn Event:", matchId);
      if (!this.hubConnection) {
        console.error('La connexion SignalR n\'est pas établie.');
        return ;
      }
      this.hubConnection.invoke('EndTurnEvent', userId,matchId);
  }

public async surrender(userId: string, matchId : number){
  if (!this.hubConnection) {
    console.error('La connexion SignalR n\'est pas établie.');
    return ;
  }
  await this.hubConnection.invoke('Surrender', userId, matchId );
}
}
