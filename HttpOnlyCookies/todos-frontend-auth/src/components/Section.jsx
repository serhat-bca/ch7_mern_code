const Section = ({ componentTitle, children }) => {
  return (
    <div className="section">
      <h3>{componentTitle}</h3>
      {children}
    </div>
  );
};

export default Section;
