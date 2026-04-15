import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  async function loadBookings() {
    try {
      const response = await fetch(`${apiBaseUrl}/bookings`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setMessage("Failed to load bookings");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${apiBaseUrl}/bookings/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      setMessage(data.message);
      loadBookings();
    } catch (error) {
      setMessage("Failed to delete booking");
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {message && <p data-testid="delete-message">{message}</p>}

      {bookings.length === 0 ? (
        <p data-testid="no-bookings">No bookings found.</p>
      ) : (
        <ul data-testid="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.name}</strong> - {booking.service} - {booking.date} at {booking.time}
              <button
                data-testid={`delete-booking-${booking.id}`}
                onClick={() => handleDelete(booking.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}