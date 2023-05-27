import "../styles/App.css";

function GlassmorphicContainer({ children }) {
  return (
    <div className="trailerTxt">
      <h3>Cuplikan</h3>
      <div className="containerTrailer">{children}</div>
    </div>
  );
}

export default GlassmorphicContainer;
