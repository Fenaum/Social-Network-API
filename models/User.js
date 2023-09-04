const { Schema, model } = require('mongoose');

// Definning User Schema
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Email must match!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('user', UserSchema);

module.exports = User;