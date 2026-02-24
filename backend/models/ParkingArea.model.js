import mongoose from "mongoose";

const parkingAreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSlots: {
      type: Number,
      required: true,
      min: 0,
    },

    basePricePerHour: {
      type: Number,
      required: true,
    },

    peakHourMultiplier: {
      type: Number,
      default: 1.5, // used for dynamic pricing
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // PARKING_ADMIN
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  }
);

// 🌍 Enable Geo-spatial queries (nearby parking search)
parkingAreaSchema.index({ location: "2dsphere" });

const ParkingArea = mongoose.model("ParkingArea", parkingAreaSchema);

export default ParkingArea;