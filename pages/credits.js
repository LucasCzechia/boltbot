// pages/credits.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TEAM_MEMBERS = {
  developers: [
    {
      name: "Lucax",
      role: "Lead Developer",
      image: "/images/boltbot.webp", 
      discord: "lucax",
      github: "LucasCzechia"
    },
    {
      name: "Dev2Name",
      role: "Backend Developer",
      image: "/images/boltbot.webp", 
      discord: "dev2",
      github: "dev2github"
    }
  ],
  testers: [
    {
      name: "Tester1",
      role: "Lead Tester",
      image: "/images/boltbot.webp", 
    },
   // add more 
  ]
};

export default function Credits() {
  return (
    <>
      <Head>
        <title>Credits - BoltBot⚡</title>
        <meta name="description" content="Meet the amazing team behind BoltBot" />
      </Head>

      <Navbar />

      <main className="credits-page">
        <div className="credits-hero">
          <h1>The Team Behind BoltBot⚡</h1>
          <p>Meet the amazing people who make BoltBot⚡ possible</p>
        </div>

        <section className="team-section">
          <h2>Development Team</h2>
          <div className="team-grid">
            {TEAM_MEMBERS.developers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="card-content">
                  <div className="member-image">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="avatar"
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <div className="social-links">
                    {member.discord && (
                      <Link href={`https://discord.com/users/${member.discord}`} target="_blank">
                        Discord
                      </Link>
                    )}
                    {member.github && (
                      <Link href={`https://github.com/${member.github}`} target="_blank">
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section testers">
          <h2>Testing Team</h2>
          <div className="team-grid">
            {TEAM_MEMBERS.testers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="card-content">
                  <div className="member-image">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="avatar"
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <div className="social-links">
                    {member.discord && (
                      <Link href={`https://discord.com/users/${member.discord}`} target="_blank">
                        Discord
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
