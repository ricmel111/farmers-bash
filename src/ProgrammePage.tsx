import React from "react";

const ProgrammePage: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('/images/bg6.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <img
      src="/images/FBW-Weekend-Programme.jpg"
      alt="Programme"
      style={{ maxWidth: "100%", maxHeight: "100vh", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}
    />
  </div>
);

export default ProgrammePage;