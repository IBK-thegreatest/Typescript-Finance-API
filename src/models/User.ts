import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v: string) {
                  return v.trim().length > 0;
                },
                message: (props: any) => "Username cannot be an empty string!",
            },
        },
        firstName: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                  return v.trim().length > 0;
                },
                message: (props: any) => "First Name cannot be an empty string!",
            },
        }, 
        lastName: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                  return v.trim().length > 0;
                },
                message: (props: any) => "Last Name cannot be an empty string!",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        accountNumber: {
            type: Number,
            required: true,
            unique: true
        },
        balance: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model("User", UserSchema)


export default userModel;