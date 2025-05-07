export interface Player {
    id: number;
    name: string;
    balance: number;
    elo: number;
}

export interface Card {
    id: number;
    name: string;
    attack: number;
    health: number;
    cost: number;
    imageUrl: string;
    cardPowers: CardPower[];
    rarity: number;
    price: number;
}

export interface MatchData {
    match: Match;
    playerA: Player;
    playerB: Player;
    winningPlayerId: number;
}

export interface Match {
    id: number;
    isMatchCompleted: boolean;
    isPlayerATurn: boolean;
    playerDataA: PlayerData;
    playerDataB: PlayerData;
}

export interface PlayableCard {
    id: number;
    card: Card;
    index: number;
    health: number;
}

export interface PlayerData {
    id: number;
    health: number;
    maxhealth: number;
    mana: number;
    playerId: number;
    playerName: string;
    cardsPile: PlayableCard[];
    hand: PlayableCard[];
    battleField: PlayableCard[];
    graveyard: PlayableCard[];
}

export interface Deck {
    id: number;
    name: string;
    current: boolean;
    playerId: number;
    deckOwnedCards: DeckOwnedCard[];
}

export interface DeckOwnedCard {
    id: number;
    deckId: number;
    ownedCardId: number;
    ownedCard: OwnedCard;
}

export interface OwnedCard {
    id: number;
    card: Card;
}

export interface Power {
    id: number;
    name: string;
    description: string;
    icone: string;
    CardPowers: CardPower[];
}

export interface CardPower {
    id: number;
    cardId: number;
    card: Card;
    powerId: number;
    value: number;
    power: Power;
}
