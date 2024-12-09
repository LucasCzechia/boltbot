// components/Tools.jsx
export default function Tools() {
  const tools = [
    {
      icon: "💱",
      title: "Currency Converter",
      description: "Convert between different currencies in real-time."
    },
    {
      icon: "☀️",
      title: "Weather Updates",
      description: "Get current weather conditions for any location."
    },
    {
      icon: "🕒",
      title: "Time Retrieval",
      description: "Check current time across different time zones."
    },
    {
      icon: "😊",
      title: "React Emojis",
      description: "Add visual expression reactions to messages."
    }
  ];

  return (
    <section className="tools-section" id="tools">
      <h2 className="section-title">Powerful Tools</h2>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <h3>{tool.icon} {tool.title}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 
