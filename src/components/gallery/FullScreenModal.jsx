// FullscreenModal.jsx
export default function FullscreenModal({ image, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <img src={image.base64} alt={image.description} style={styles.img} />
        <p style={styles.text}>{image.description}</p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  content: {
    position: "relative",
    width: "100%",
    maxWidth: "600px", // Limita el ancho en desktop
    maxHeight: "90%",
    textAlign: "center"
  },
  img: {
    width: "100%",
    maxHeight: "70vh",
    objectFit: "contain",
    borderRadius: "8px"
  },
  text: {
    marginTop: "1rem",
    color: "#fff",
    fontSize: "1rem"
  },
  closeBtn: {
    position: "absolute",
    top: "10px", right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "2rem",
    color: "#fff",
    cursor: "pointer",
    zIndex: 10
  }
};
