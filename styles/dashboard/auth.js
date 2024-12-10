/* styles/dashboard/auth.css */

/* Auth Container */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark);
  padding: 1rem;
}

.auth-card {
  background: rgba(255, 204, 0, 0.05);
  border: 1px solid rgba(255, 204, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.5s ease;
}

.auth-logo {
  margin-bottom: 2rem;
}

.auth-logo img {
  border-radius: 20px;
  animation: glow 2s infinite alternate;
}

.auth-card h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-card p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

/* Discord Button */
.discord-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #5865F2;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.discord-button:hover {
  background: #4752C4;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(88, 101, 242, 0.2);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 20px rgba(255, 204, 0, 0.2);
  }
  to {
    box-shadow: 0 0 30px rgba(255, 204, 0, 0.4);
  }
}
