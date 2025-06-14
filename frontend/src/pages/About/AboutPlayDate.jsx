import React from 'react';
import './AboutPlayDate.css';

const AboutPlayDate = () => {
  return (
    <main className="playdate-container">
      <header className="intro-section">
        <p className="intro-label">About PlayDate</p>
        <h1>More Than a Game,<br /><span className="highlight">It's Your Moment</span></h1>
        <p className="intro-text">
          We’re building a sports culture where every match matters, every player counts, and every
          moment fuels your passion for the game.
        </p>
      </header>

      <section className="experience-section">
        <article className="left-column">
          <h2>You've been there.</h2>
          <ul className="experience-list">
            <li>
              <div className="experience-icon">💬</div>
              <div className="experience-content">
                <strong>Endless Coordination:</strong> Scrolling through WhatsApp groups, trying to get seven friends to agree on a time.
              </div>
            </li>
            <li>
              <div className="experience-icon">📞</div>
              <div className="experience-content">
                <strong>Cold Calls:</strong> Dialing turf managers just to hear, "Sorry, we're full."
              </div>
            </li>
            <li>
              <div className="experience-icon">⏳</div>
              <div className="experience-content">
                <strong>Wasted Time:</strong> Showing up ready to play, only to wait... and wait... and maybe not play at all.
              </div>
            </li>
            <li>
              <div className="experience-icon">😞</div>
              <div className="experience-content">
                <strong>Weekend Blues:</strong> Watching your weekends slip away while your passion for the game sits on the bench.
              </div>
            </li>
          </ul>
        </article>

        <aside className="right-box">
          <div className="icon-box">
            <span className="icon" role="img" aria-label="group">👥</span>
            <h3 className="box-title">We felt it too.</h3>
            <p className="box-text">
              The frustration of wanting to play – to compete, to sweat it out, to relive those college league days.
            </p>
          </div>
        </aside>
      </section>

      <section className="purpose-section">
        <h2>That’s when we built <span className="highlight">PlayDate</span></h2>
        <p>
          Not just a sports booking app, but a movement to bring the thrill of real competition back to every weekend.
        </p>
        <div className="cards">
          <div className="card blue">
            <div className="card-icon" role="img" aria-label="professional">👨‍💼</div>
            <h3>Working Professionals</h3>
            <p>Craving the rush of a Sunday showdown</p>
          </div>
          <div className="card light-blue">
            <div className="card-icon" role="img" aria-label="target">🎯</div>
            <h3>College Players</h3>
            <p>Hungry to prove yourself in competition</p>
          </div>
          <div className="card orange">
            <div className="card-icon" role="img" aria-label="star">⭐</div>
            <h3>First-time Athletes</h3>
            <p>Looking for your tribe and community</p>
          </div>
        </div>

        <div className="no-politics">
          <p>No more turf politics.</p>
          <p>No more flaky teams.</p>
          <p>No more ghosting after saying "let’s play soon."</p>
          <p>Just real games, real rivalries, and real glory.</p>
        </div>
      </section>

      <section className="different-section">
        <h2>What makes us <span className="highlight">different?</span></h2>
        <div className="feature-list">
          <div className="feature-item">🎮 Playmate Matchmaking</div>
          <div className="feature-item">📊 Rivalry Tracking</div>
          <div className="feature-item">⚡ Instant Booking & Updates</div>
          <div className="feature-item">📷 Media Coverage & Leaderboards</div>
          <div className="feature-item">🌐 All-Age Friendly</div>
        </div>
      </section>

      <section className="why-section">
        <h2>Why We Exist</h2>
        <div className="why-items">
          <p>Because your skills deserve a platform. 🎯</p>
          <p>Because we believe every weekend should feel like game day. 📅</p>
        </div>
        <div className="final-statement">
          <h3>
            You don’t need a stadium to feel like a star -<br />
            You just need the right stage.<br />
            <span className="highlight">That’s PlayDate.</span>
          </h3>
          <p>
            We’re not just building a platform. We’re building a sports culture where every match matters, every player counts, and every moment fuels your passion.
          </p>
        </div>
      </section>

      <section className="join-section">
        <h2>Join the movement.</h2>
        <p className="cta-sub">It isn’t about the big game. It’s about every game.</p>
        <button className="cta-button">Get Started Today</button>
        <div className="stats">
          <div><strong>1000+</strong><br />Active Players</div>
          <div><strong>500+</strong><br />Matches Organized</div>
          <div><strong>50+</strong><br />Venue Partners</div>
        </div>
      </section>

      <footer className="footer">
        <p>Building the future of competitive sports, one game at a time.</p>
      </footer>
    </main>
  );
};

export default AboutPlayDate;
