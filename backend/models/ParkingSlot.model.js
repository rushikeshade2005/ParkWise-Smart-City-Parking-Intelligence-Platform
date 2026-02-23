import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: String,
      required: true,
      trim: true,
    },

    parkingArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingArea",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "RESERVED", "OCCUPIED", "OUT_OF_SERVICE"],
      default: "AVAILABLE",
      index: true,
    },

    vehicleNumber: {
      type: String,
      trim: true,
      default: null,
    },

    reservationStartTime: {
      type: Date,
      default: null,
    },

    reservationEndTime: {
      type: Date,
      default: null,
    },

    isOverstayed: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate slot numbers in same parking area
parkingSlotSchema.index(
  { slotNumber: 1, parkingArea: 1 },
  { unique: true }
);

const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);

export default ParkingSlot;