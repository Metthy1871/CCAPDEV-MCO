import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        displayName: {
            type: String,
            default: function() { return this.username; }
        },
        bio: {
            type: String,
            default: "Meow"
        },
        avatar: {
            type: String,
            default: "https://i.pinimg.com/736x/b7/a9/39/b7a939727d776c17504d41d0c0a08a93.jpg"
        }
    },
    {
        timestamps: true
    }
);

// hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)
