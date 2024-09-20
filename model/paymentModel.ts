import mongoose from "mongoose";
import Payment_interface from "../interface/Payment";

const PaymentSchema = new mongoose.Schema<Payment_interface>({
    Month : {
        type : String
    },
    Year : {
        type : String
    },
    Amount : {
        type : Number
    },
    DevoteeId : {
        type : String
    }
})

const payment = mongoose.models.payment || mongoose.model("payment", PaymentSchema);
export default payment