import { registerData, User } from "interfaces/user.interface";
import bcrypt from "bcrypt"
import userModel from "models/User";
import HttpException from "exceptions/HttpException";
import { emailValidator, schema } from "middlewares/validation.middleware";

//REGISTER A USER
export const authService = async (userData: registerData): Promise<User> => {
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