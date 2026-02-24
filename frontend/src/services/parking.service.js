// Mock parking data (backend API later)
export const getAllParkings = async () => {
  return [
    {
      id: "1",
      name: "City Center Parking",
      address: "MG Road",
      city: "Pune",
      totalSlots: 100,
      availableSlots: 32,
      pricePerHour: 40,
    },
    {
      id: "2",
      name: "Metro Station Parking",
      address: "Shivajinagar",
      city: "Pune",
      totalSlots: 60,
      availableSlots: 12,
      pricePerHour: 30,
    },
    {
      id: "3",
      name: "Mall Parking Zone",
      address: "Phoenix Mall",
      city: "Pune",
      totalSlots: 120,
      availableSlots: 78,
      pricePerHour: 50,
    },
  ];
};