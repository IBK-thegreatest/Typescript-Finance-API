import HttpException from "exceptions/HttpException"
import { UserWithId, User } from "interfaces/user.interface"
import bcrypt from "bcrypt"
import { emailValidator, schema } from "middlewares/validation.middleware"
import userModel from "models/User"

//GET ALL USERS
export const getAllUsersService = async (): Promise<UserWithId[]> => {
    const users: UserWithId[] = await userModel.find()
    if(users.length === 0) throw new HttpException(404, "There are no users in this database")
    return users
}

//GET A USER
export const getUserService = async (userId: string): Promise<UserWithId> => {
    const user: UserWithId = await userModel.findById(userId)
    return user
}

//UPDATE USER INFORMATION
export const updateUserService = async (userId: string, userData: User): Promise<User> => {
    const user: UserWithId = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A User with this ID does not exist")

    if(userData.email) {
        if(!emailValidator.validate(userData.email)) throw new HttpException(403, "Invalid Email Address, make sure your email is in the format foo@bar.com")
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { email: userData.email }},
            { new: true }
        )
        return updatedUser
    } else if (userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Invalid Password, password must have an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword }},
            { new: true }
        )
        return updatedUser
    } else {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        )
        return updatedUser
    }
}

//DELETE USER INFORMATION
export const deleteUserService = async (userId: string): Promise<UserWithId> => {
    const user: UserWithId = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A User with this Id does not exist")

    await userModel.findByIdAndDelete(userId)
    return user
}