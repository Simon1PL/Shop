export class User {
    constructor(email, name, emailVerified = false, phone = null, isAnonymous = false) {
        this.email = email;
        this.name = name;
        this.emailVerified = emailVerified;
        this.phone = phone;
        this.isAnonymous = isAnonymous;
    }
    email: string;
    role: roleEnum;
    name: string;
    phone: string;
    emailVerified: boolean;
    isAnonymous: boolean;
}

export enum roleEnum {
    Admin = 'Admin',
    User = 'User',
    NotLogged = 'NotLogged'
}
