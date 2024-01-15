export interface Transaction {
    userId: string
    category: string
    description?: string
    fromAccountNumber: number
    toAccountNumber: number
    amount: number
    transactionType: string
}