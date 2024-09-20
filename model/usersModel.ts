import mongoose, { model, Model, Schema } from "mongoose";

interface user_interface extends mongoose.Document {
    FirstName: String,
    MidleName: String,
    LastName: String,
    ProfilePic: String,
    FlatNumber: String,
    Area: String,
    State: String,
    City: String,
    PinCode: String,
    EmailID: String,
    InitiationDate: Date
    DevoteeId: String,
    Password: String,
    Otp: String,
    Role: String
}

interface users_method_interface {
    devoteeId(): string
}

type UserModel = Model<user_interface, {}, users_method_interface>;

const user_schema = new Schema<user_interface, UserModel, users_method_interface>({
    FirstName: {
        type: String,
        required: true
    },
    MidleName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    ProfilePic: {
        type: String,
        required: true
    },
    FlatNumber: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    PinCode: {
        type: String,
        required: true
    },
    EmailID: {
        type: String,
        required: true
    },
    InitiationDate: {
        type: Date,
        required: true
    },
    DevoteeId: {
        type: String
    },
    Password: {
        type: String,
        required: true
    },
    Otp: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    }
})

user_schema.method("devoteeId", function devoteeId() {
    const dt = new Date(this.InitiationDate);
    const fist2 = this.FirstName.substring(0, 2);
    const last2 = this.LastName.substring(0, 2);
    const DevotieeId : any = `${dt.getFullYear()}-${fist2}-${last2}-${dt.getMonth() + 1}`;
    return DevotieeId;
})


const Users = mongoose.models.Users || model<user_interface, UserModel>("Users", user_schema);
export default Users;