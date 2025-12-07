// booking service
const createBooking = async (data: Record<string, any>) => {
  // implementation for creating a booking
};

const getBooking = async (bookingId: string) => {
  // implementation for fetching a specific booking
};

const getAllBookings = async () => {
  // implementation for fetching all bookings
};

const updateBooking = async (bookingId: string, data: Record<string, any>) => {
  // implementation for updating a booking
};

export const bookingServices = {
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
};
