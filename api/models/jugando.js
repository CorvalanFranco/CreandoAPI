import mongoose from "mongoose";

const jugandoSchema = mongoose.Schema({
    firstName: String,
    phone: Number,
    address: String
})

export default mongoose.model("jugando", jugandoSchema)