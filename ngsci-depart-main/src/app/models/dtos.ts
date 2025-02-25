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
