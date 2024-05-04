const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor teclea tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea tu email"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} no es un email válido!`
        }
    },
    password: {
        type: String,
        required: [true, "Por favor teclea tu contraseña"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    birthday: {
        type: Date,
        required: [true, "Por favor teclea tu fecha de nacimiento"] 
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timeStamps: true 
})
module.exports = mongoose.model('User', userSchema);
