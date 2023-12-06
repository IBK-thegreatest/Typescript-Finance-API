export interface DataStoredInToken {
    id: any
    username: string
    email: string
    isAdmin: boolean
}

export interface UserInfo {
    id: any
    username: string
    firstName: string
    lastName: string
    email: string
    isAdmin: boolean
    accountNumber: number
    balance: number
    token: string
}