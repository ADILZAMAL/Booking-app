const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hotelSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    // bookings: [bookingSchema],
});

// userSchema.pre("save", async function (next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 8)
//     }
//     next();
// })

const HotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = HotelModel