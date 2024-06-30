const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ciudad: { type: String },
    intereses: { type: String },
    permiteRecibirOfertas: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
