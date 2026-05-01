import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BookAppointment() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(`${apiBaseUrl}/services`);
        const data = await response.json();
        setServices(data);
      } catch {
        setMessage("Failed to load services");
      }
    }

    loadServices();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <div>
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            data-testid="booking-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            data-testid="booking-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Service</label>
          <br />
          <select
            data-testid="booking-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date</label>
          <br />
          <input
            data-testid="booking-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Time</label>
          <br />
          <input
            data-testid="booking-time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <button data-testid="booking-submit" type="submit">
          Book Appointment
        </button>
      </form>

      {message && <p data-testid="booking-message">{message}</p>}
    </div>
  );
}