import { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  
  useEffect(() => {
    fetch("https://partners.every.org/v0.2/search/ngo?apiKey=public")
      .then((res) => res.json())
      .then((data) => {
        
        const apiEvents = data.nonprofits.map((ngo) => ({
          id: ngo.ein,
          title: ngo.name,
          date: "Upcoming 2026", 
          location: ngo.location || "Global",
        }));
        setEvents(apiEvents);
        setLoading(false);
      })
      .catch((err) => console.error(err));
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