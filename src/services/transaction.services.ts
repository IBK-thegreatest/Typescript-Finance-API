import HttpException from "exceptions/HttpException";
import { Transaction } from "interfaces/transaction.interface";
import transactionModel from "models/Transaction";
import userModel from "models/User";

export const depositService = async (userId: string, transactionData: Transaction) => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user wuth this userId does not exist")

    const data: Transaction = {
        userId: userId,
        category: transactionData.category,
        description: transactionData.description,
        fromAccountNumber: transactionData.fromAccountNumber,
        toAccountNumber: transactionData.toAccountNumber,
        amount: transactionData.amount,
        transactionType: transactionData.transactionType
    }
    if (transactionData.amount < 1000) throw new HttpException(403, "You are only allowed to deposit a total amount of 1000 naira or more")
    user.balance += transactionData.amount
    const newTransaction = new transactionModel(data)
    const createTransaction = await newTransaction.save()
    if(createTransaction) {
        await userModel.findByIdAndUpdate(
            userId,
            { $set: { balance: user.balance }},
            { new: true }
        )
    }
    return { createTransaction, user }
}

export const withdrawalService = async (userId: string, transactionData: Transaction) => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user wuth this userId does not exist")

    const data: Transaction = {
        userId: userId,
        category: transactionData.category,
        description: transactionData.description,
        fromAccountNumber: transactionData.fromAccountNumber,
        toAccountNumber: transactionData.toAccountNumber,
        amount: transactionData.amount,
        transactionType: transactionData.transactionType
    }
    if(transactionData.amount > user.balance) throw new HttpException(403, "Your Account has Insufficient funds so you are not allowed to make this transaction")
    if(transactionData.amount < 1000) throw new HttpException(403, "You are not allowed to withdraw amount less than 1000 naira")
    user.balance -= transactionData.amount
    const newTransaction = new transactionModel(data)
    const createTransaction = await newTransaction.save();
    if (createTransaction) {
        await userModel.findByIdAndUpdate(
            userId,
            { $set: { balance: user.balance } },
            { new: true }
        )
    }
    return { createTransaction, user }
}

export const transferService = async (senderId: string, transactionData: Transaction) => {
    const user = await userModel.findById(senderId)
    if(!user) throw new HttpException(404, "A user wuth this userId does not exist")

    const data: Transaction = {
        userId: senderId,
        category: transactionData.category,
        description: transactionData.description,
        fromAccountNumber: transactionData.fromAccountNumber,
        toAccountNumber: transactionData.toAccountNumber,
        amount: transactionData.amount,
        transactionType: transactionData.transactionType
    }
    const senderData = await userModel.findOne({ accountNumber: transactionData.fromAccountNumber })
    if(!senderData) throw new HttpException(404, "A User with this Account Number does not exist")
    const receiverData = await userModel.findOne({ accountNumber: transactionData.toAccountNumber })
    if(!receiverData) throw new HttpException(404, "A User with this account Number does not exist")

    if(transactionData.amount < 500) throw new HttpException(403, "You are only allowed to send amount of money equivalent to 500 naira and above")
    if(transactionData.amount > senderData.balance) throw new HttpException(403, "Your Account has Insufficient funds so you are not allowed to make this transaction")
    senderData.balance -= transactionData.amount
    receiverData.balance += transactionData.amount
    const newTransaction = new transactionModel(data)
    const createTransaction = await newTransaction.save();
    if (createTransaction) {
        await userModel.findByIdAndUpdate(
            senderId,
            { $set: { balance: senderData.balance } },
            { new: true }
        )
        await userModel.findByIdAndUpdate(
            receiverData._id,
            { $set: { balance: receiverData.balance } },
            { new: true }
        )
    }
    return { senderData, receiverData, createTransaction }
}

export const getUserTransactionsService = async (userId) => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")

    const userTransactions = await transactionModel.find({ userId: userId })
    return userTransactions
}