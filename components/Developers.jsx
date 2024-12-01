// components/Developers.jsx
import Link from 'next/link';

export default function Developers() {
  return (
    <section id="developers">
      <h2 className="section-title">Developers</h2>
      <p>If you need help or would like to contact us, feel free to reach out to our developers.</p>
      <div className="developers-grid">
        <iframe 
          src="https://lanyard.cnrad.dev/api/1146944562951106721" 
          frameBorder="0" 
          className="lanyard-frame"
        />
        <iframe 
          src="https://lanyard.cnrad.dev/api/794543886742585366" 
          frameBorder="0" 
          className="lanyard-frame"
        />
        <iframe 
          src="https://lanyard.cnrad.dev/api/946789084876144641" 
          frameBorder="0" 
          className="lanyard-frame"
        />
      </div>
      <div className="support-server">
        <Link 
          href="https://discord.gg/bolt" 
          className="support-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Support Server
        </Link>
      </div>
    </section>
  );
}
