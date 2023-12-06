import { loginData, PasswordResetData, registerData, User } from "interfaces/user.interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "models/User";
import HttpException from "exceptions/HttpException";
import { emailValidator, schema } from "middlewares/validation.middleware";
import { DataStoredInToken, UserInfo } from "@/interfaces/auth.interface";

//REGISTER A USER
export const registerService = async (userData: registerData): Promise<User> => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    
    const ifAlreadyExists = await userModel.findOne({ email: userData.email })
    if(ifAlreadyExists) throw new HttpException(409, "There is already a user registered with this Email Address")

    //Generating a 10 digit account number for a new user anytime a user registers
    let accountNumber: number;
    let isUnique = false
    while (!isUnique) {
        accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        //Checking if the account number is unique
        const existingUserWithAccountNumber = await userModel.findOne({ accountNumber: accountNumber })
        if (!existingUserWithAccountNumber) {
            isUnique = true
        }
    }
    const data: registerData = {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        isAdmin: userData.isAdmin,
        accountNumber: accountNumber
    }

    if(!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, make sure your email address is in the format foo@bar.com")
    } else if(!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid Password, password must contain an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
    } else {
        const newUser = new userModel(data)
        const createUser: User = await newUser.save()
        return createUser
    }
}

//LOGIN AN EXISTING USER
export const loginService = async (userData: loginData): Promise<UserInfo> => {
    const user = await userModel.findOne({ email: userData.email })
    if(!user) throw new HttpException(404, "A user with this email does not exist")

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(403, "Username and Password does not exist")

    const dataStoredInToken: DataStoredInToken = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }
    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, { expiresIn: "30d" })
    const userInfo: UserInfo = {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        accountNumber: user.accountNumber,
        balance: user.balance,
        token: accessToken
    }
    return userInfo
}

//PASSWORD RESET SERVICE
export const passwordResetService = async (userData: PasswordResetData): Promise<string> => {
    const user = await userModel.findOne({ email: userData.email })
    if(!user) throw new HttpException(404, "A user with this email does not exist")

    function generateRandomAlphanumeric(length: number) {
        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString: string = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex: number = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
      
        return randomString;
    }
    const resetPassword = generateRandomAlphanumeric(10)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(resetPassword, salt)
    await userModel.findOneAndUpdate(
        user._id,
        { $set: { password: hashedPassword } },
        { new: true }
    )
    return resetPassword
}