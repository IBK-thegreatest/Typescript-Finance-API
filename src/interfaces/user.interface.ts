export interface registerData {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean,
    accountNumber: number
}

export interface loginData {
    email: string
    password: string
}

export interface PasswordResetData {
    email: string
}

export interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean,
    accountNumber: number,
    balance: number
}