import ParkingArea from "../models/ParkingArea.model.js";
import ParkingSlot from "../models/ParkingSlot.model.js";

/**
 * @desc    Add new parking area (Admin only)
 */
export const createParkingArea = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      latitude,
      longitude,
      totalSlots,
      basePricePerHour,
    } = req.body;

    const parkingArea = await ParkingArea.create({
      name,
      address,
      city,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      totalSlots,
      availableSlots: totalSlots,
      basePricePerHour,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Parking area created successfully",
      parkingArea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Add parking slots to a parking area (Admin only)
 */
export const addParkingSlots = async (req, res) => {
  try {
    const { parkingAreaId, slots } = req.body;
    // slots = ["A1", "A2", "A3"]

    const slotDocs = slots.map((slotNumber) => ({
      slotNumber,
      parkingArea: parkingAreaId,
    }));

    await ParkingSlot.insertMany(slotDocs);

    res.status(201).json({
      message: "Parking slots added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Get all parking areas (Public / User)
 */
export const getAllParkingAreas = async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find({ isActive: true });

    res.json(parkingAreas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};