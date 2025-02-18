const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    referralId: { type: String, unique: true },
    referralCount: { type: Number, default: 0 },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    isEmailVerified: { type: Boolean, default: false }
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;