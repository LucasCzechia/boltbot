// pages/credits.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, GithubIcon, HeartIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TEAM_MEMBERS = {
  developers: [
    {
      name: "Lucas",
      role: "Lead Developer",
      image: "/images/lucas.webp",
      description: "Hey! I'm the lead developer of BoltBot⚡. I love coding and creating amazing experiences for users!",
      discord: "lucaaczech",
      github: "LucasCzechia"
    },
    {
      name: "Alolo",
      role: "Backend Developer",
      image: "/images/alolo.webp",
      description: "Focusing on making BoltBot's backend robust and efficient. Always learning and improving!",
      discord: "alolohere"
    },
    {
      name: "ProTon",
      role: "Retired Developer",
      image: "/images/proton.webp",
      description: "Former developer who helped shape BoltBot's early features. Thank you for your contributions!",
      discord: "wrench.x.x"
    },
    {
      name: "Claude",
      role: "AI Assistant",
      image: "/images/boltbot.webp",
      description: "Helping with development, design, and bringing ideas to life. Always here to assist!",
      special: true
    }
  ],
  testers: [
    {
      name: "fat.penguin",
      role: "Lead Tester",
      image: "/images/fatto.webp",
      description: "Leading the testing team to ensure BoltBot runs smoothly. Quality is my priority!",
      discord: "fat.penguin"
    },
    {
      name: "Mahmoud",
      role: "Tester",
      image: "/images/mahmoud.webp",
      description: "Dedicated to finding and reporting issues to make BoltBot better every day.",
      discord: "mahmoudsatty"
    },
    {
      name: "Crayth",
      role: "Tester",
      image: "/images/crayth.webp",
      description: "Passionate about testing and improving user experience. Every detail matters!",
      discord: "craythh"
    }
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
                  <h3>{member.name} {member.special && '✨'}</h3>
                  <p className="role">{member.role}</p>
                  <p className="description">{member.description}</p>
                  <div className="social-links">
                    {member.discord && (
                      <Link href={`https://discord.com/users/${member.discord}`} target="_blank" className="social-link">
                        <MessageSquare size={16} />
                        <span>Discord</span>
                      </Link>
                    )}
                    {member.github && (
                      <Link href={`https://github.com/${member.github}`} target="_blank" className="social-link">
                        <GithubIcon size={16} />
                        <span>GitHub</span>
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
                  <p className="description">{member.description}</p>
                  <div className="social-links">
                    {member.discord && (
                      <Link href={`https://discord.com/users/${member.discord}`} target="_blank" className="social-link">
                        <MessageSquare size={16} />
                        <span>Discord</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="thank-you-section">
          <div className="thank-you-content">
            <h2><HeartIcon className="heart-icon" /> Thank You!</h2>
            <p>
              From the bottom of our hearts, we want to thank every single person who has contributed
              to making BoltBot⚡ what it is today. 
              Our developers, testers, and especially YOU -
              
              our amazing community - have made this journey incredible.
            </p>
            <p>
              Every bug report, suggestion, and word of encouragement has pushed us to make BoltBot⚡
              better. 
              We couldn't have done it without you!
            </p>
          </div>
        </section> 

        <section className="community-section">
          <div className="community-content">
            <h2>And You! 💖</h2>
            <p>
            Yes, you reading this! You're part of what makes BoltBot⚡ special. 
                
            Whether you're a server owner, user, or just checking us out - thank you for being here!
            </p>
            <p>
              Join our growing community and be part of our journey!
            </p>
            <Link href="https://discord.gg/bolt" target="_blank" className="community-button">
              <MessageSquare size={20} />
              Join Our Community
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
