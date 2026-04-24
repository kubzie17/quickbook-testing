import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Services() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(`${apiBaseUrl}/services`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        setMessage("Failed to load services");
      }
    }

    loadServices();
  }, []);

  return (
    <div>
      <h2>Services</h2>

      {message && <p data-testid="services-message">{message}</p>}

      <ul>
        {services.map((service) => (
          <li data-testid="service-item" key={service.id}>
            <strong>{service.name}</strong> - {service.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}
