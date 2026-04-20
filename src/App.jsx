import { useState, useEffect } from "react";

const NGO_EVENTS = [
  { id: "1",  title: "Global Health Initiative",          date: "March 5, 2026",    location: "Geneva, Switzerland" },
  { id: "2",  title: "Save the Oceans Summit",            date: "March 12, 2026",   location: "Sydney, Australia" },
  { id: "3",  title: "Education for All Conference",      date: "March 18, 2026",   location: "Nairobi, Kenya" },
  { id: "4",  title: "Clean Water Access Drive",          date: "March 25, 2026",   location: "New Delhi, India" },
  { id: "5",  title: "Women Empowerment Forum",           date: "April 2, 2026",    location: "Lagos, Nigeria" },
  { id: "6",  title: "Hunger Zero Campaign",              date: "April 8, 2026",    location: "São Paulo, Brazil" },
  { id: "7",  title: "Climate Action Coalition",          date: "April 14, 2026",   location: "Berlin, Germany" },
  { id: "8",  title: "Child Rights Awareness March",      date: "April 20, 2026",   location: "New York, USA" },
  { id: "9",  title: "Disaster Relief Coordination",      date: "April 27, 2026",   location: "Manila, Philippines" },
  { id: "10", title: "Mental Health Awareness Walk",      date: "May 3, 2026",      location: "London, UK" },
  { id: "11", title: "Refugee Support Network Meetup",    date: "May 10, 2026",     location: "Athens, Greece" },
  { id: "12", title: "Rainforest Preservation Drive",     date: "May 17, 2026",     location: "Manaus, Brazil" },
  { id: "13", title: "Youth Leadership Summit",           date: "May 23, 2026",     location: "Johannesburg, South Africa" },
  { id: "14", title: "Animal Welfare Advocacy Day",       date: "June 1, 2026",     location: "Toronto, Canada" },
  { id: "15", title: "Digital Literacy for Villages",     date: "June 8, 2026",     location: "Dhaka, Bangladesh" },
  { id: "16", title: "Elderly Care Volunteer Day",        date: "June 15, 2026",    location: "Tokyo, Japan" },
  { id: "17", title: "Sustainable Farming Fair",          date: "June 21, 2026",    location: "Accra, Ghana" },
  { id: "18", title: "Human Trafficking Awareness Run",  date: "June 28, 2026",    location: "Bangkok, Thailand" },
  { id: "19", title: "Solar Energy for Schools",          date: "July 5, 2026",     location: "Karachi, Pakistan" },
  { id: "20", title: "Tree Plantation Drive",             date: "July 12, 2026",    location: "Mumbai, India" },
  { id: "21", title: "Food Bank Volunteer Day",           date: "July 19, 2026",    location: "Chicago, USA" },
  { id: "22", title: "LGBTQ+ Rights Forum",              date: "July 26, 2026",    location: "Amsterdam, Netherlands" },
  { id: "23", title: "Disability Inclusion Workshop",     date: "August 2, 2026",   location: "Seoul, South Korea" },
  { id: "24", title: "Ocean Plastic Cleanup",             date: "August 9, 2026",   location: "Bali, Indonesia" },
  { id: "25", title: "Indigenous Culture Preservation",   date: "August 16, 2026",  location: "Lima, Peru" },
];

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // Simulate a brief loading state, then load the NGO events
    const timer = setTimeout(() => {
      setEvents(NGO_EVENTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>NGO Event Explorer 🤝</h1>

      <input
        type="text"
        placeholder="Search events by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={styles.searchInput}
      />

      <p style={styles.countText}>
        Total Registered Events: <strong>{registeredEvents.length}</strong>
      </p>

      {loading ? (
        <p style={styles.message}>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p style={styles.message}>No events found.</p>
      ) : (
        <div style={styles.cardContainer}>
          {filteredEvents.map((event) => (
            <div key={event.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>

              <button
                onClick={() => handleRegister(event.id)}
                disabled={registeredEvents.includes(event.id)}
                style={{
                  ...styles.button,
                  backgroundColor: registeredEvents.includes(event.id)
                    ? "#4caf50"
                    : "#007bff",
                  cursor: registeredEvents.includes(event.id)
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {registeredEvents.includes(event.id) ? "Registered ✅" : "Register"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#222",
    marginBottom: "20px",
  },
  searchInput: {
    display: "block",
    margin: "0 auto 20px auto",
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#333333",
  },
  countText: {
    textAlign: "center",
    fontSize: "18px",
    marginBottom: "20px",
    color: "#333",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginBottom: "10px",
    color: "#222",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "15px",
  },
};

export default App;