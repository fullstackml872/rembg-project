import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // index unique dans MongoDB : deux comptes ne peuvent pas avoir le même email
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    // Préparé pour les étapes quotas / paiement, pas encore utilisé
    credits: {
      images_remaining: { type: Number, default: 10 },
    },
    is_premium: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
