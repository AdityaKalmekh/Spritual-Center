import mongoose from "mongoose"

const dbConnect = async () => {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
    if (connection.connection.host) {
        return true
    }
    else {
        return false
    }
}

export default dbConnect