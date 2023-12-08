export interface Transaction {
    userId: string
    category: string
    description?: string
    amount: number
    transactionType: string
}