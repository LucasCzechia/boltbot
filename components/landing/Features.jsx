// components/landing/Features.jsx
export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Text Generation",
      description: "Generate human-like text responses across various topics with advanced AI capabilities."
    },
    {
      icon: "🎨",
      title: "Image Generation",
      description: "Create stunning images using DALL-E 3 with detailed text prompts."
    },
    {
      icon: "🖼️",
      title: "Image Recognition",
      description: "Analyze and provide detailed descriptions of images shared in your server."
    },
    {
      icon: "🌐",
      title: "Internet Browsing",
      description: "Retrieve current information and verify facts in real-time."
    },
    {
      icon: "🐍",
      title: "Python Code Execution",
      description: "Run Python code snippets in a secure environment directly in Discord."
    },
    {
      icon: "📄",
      title: "File Management",
      description: "Create and manage text-based files with ease."
    }
  ];

  return (
    <section className="features" id="features">
      <h2 className="section-title">Powerful Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 
