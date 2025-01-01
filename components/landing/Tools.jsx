// components/landing/Tools.jsx
import ContentContainer from './ContentContainer';

export default function Tools() {
  const tools = [
    {
      icon: "🌐",
      title: "Browse Internet",
      description: "Retrieve current information and verify facts."
    },
    {
      icon: "🎨",
      title: "Generate AI Images",
      description: "Create stunning, unique images using DALL-E 3."  
    },
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
    },
    {
      icon: "📄",
      title: "File Management",
      description: "Create and manage text-based files with ease."
    },
    {
      icon: "🐍",
      title: "Run Python Code",
      description: "Execute Python snippets in a secure sandbox environment."
    },
    {
      icon: "🖼️",
      title: "Google Images Search",
      description: "Search and retrieve high-quality images from the web."
    }
  ];

  return (
    <ContentContainer>
      <section className="landing-tools" id="tools">
        <h2 className="section-title">Powerful Tools</h2>
        <div className="landing-tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="landing-tool-card">
              <h3>{tool.icon} {tool.title}</h3>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </section>
    </ContentContainer>
  );
}
