import "./index.css";

function Box({ children, style, className }) {
  return (
    <div className={`box ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Box;
