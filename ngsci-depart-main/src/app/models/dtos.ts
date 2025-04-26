export class RegisterDTO {
    constructor(
        public email: string,
        public password: string,
        public passwordConfirm: string
    ) { }
}

export class LoginDTO {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class NewDeckDTO {
    constructor(
        public deckName: string
    ) { }
}

export class DeckConfigDTO {
    constructor(
        public nbDecksMax: number,
        public nbCardsMaxInDeck: number
    ) { }
}
