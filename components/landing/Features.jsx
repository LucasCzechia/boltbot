// components/landing/Features.jsx
import LandingContentContainer from './LandingContentContainer';
import { Wrench } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: "🤖", title: "AI Text Generation", description: "Generate human-like text responses across various topics with advanced AI capabilities." },
    { icon: "✨", title: "Custom Personality", description: "Create custom personalities to create your own truly, custom AI Discord chatbot." },
    { icon: "🎨", title: "Image Generation", description: "Create stunning images using Google Image Translator with detailed text prompts." },
    { icon: "🖼️", title: "Image Recognition", description: "Analyze and provide detailed descriptions of images shared in your server." },
    { icon: "🌐", title: "Internet Browsing", description: "Retrieve current information and verify facts in real-time." },
    { icon: "📄", title: "File Management", description: "Create and manage text-based files with ease." }
  ];

  return (
    <section className="landing-features" id="features">
      <LandingContentContainer>
        <h2 className="landing-container-title">
          <Wrench size={24} />
          Powerful Features
        </h2>
        <LandingContentContainer>
          <div className="landing-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="landing-feature-card">
                <h3>{feature.icon} {feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </LandingContentContainer>
      </LandingContentContainer>
    </section>
  );
}
