// Gallery.jsx
export default function Gallery({ pictures, onSelect }) {
  return (
    <div style={styles.gallery}>
      {pictures.map((pic) => (
        <div key={pic.id} style={styles.card} onClick={() => onSelect(pic)}>
          <img src={pic.base64} alt={pic.description} style={styles.image} />
          <p style={styles.description}>{pic.description}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1rem",
    padding: "1rem"
  },
  card: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "0.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    maxWidth: "400px", // límite en desktop
    height: "auto",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  description: {
    marginTop: "0.5rem",
    fontSize: "14px",
    color: "#333",
    textAlign: "center"
  }
};
