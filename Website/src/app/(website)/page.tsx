import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./_components/landing.module.css";

export default function Home() {
  return (
    <main className={styles.landingRoot}>
      {/* ─── NAV ─── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image src="/voom.png" alt="Voom logo" width={160} height={80} />
        </Link>
        <ul className={styles.navLinks}>
          <li><a href="#features">Features</a></li>
          <li><a href="#ai">AI Tools</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#download">Download</a></li>
        </ul>
        <div className={styles.navActions}>
          <Link href="/auth/sign-in" className={`${styles.btn} ${styles.btnGhost}`}>
            Sign In
          </Link>
          <Link href="/auth/sign-up" className={`${styles.btn} ${styles.btnPrimary}`}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroGrid}></div>

        {/* <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Now with AI Transcriptions &amp; Smart Summaries
        </div> */}

        <h1 className={styles.heroTitle}>
          Record. Share.<br />
          <span className={styles.accent}>Close faster.</span>
        </h1>

        <p className={styles.heroSub}>
          The video messaging platform built for sales teams — record your screen and webcam, share instantly, and let AI do the heavy lifting.
        </p>

        <div className={styles.heroCtas}>
          <Link href="/auth/sign-in" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
            Get Started Free
          </Link>
          <Link href="#download" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
            ↓ &nbsp;Download Desktop App
          </Link>
        </div>
        <p className={styles.heroNote}>No credit card required · Free tier available · 720p &amp; 1080p recording</p>

        {/* Video mockup */}
        <div className={styles.videoFrame}>
          <div className={styles.videoFrameBorder}>
            <div className={styles.videoTopbar}>
              <div className={styles.trafficLight} style={{ background: "#ff5f57" }}></div>
              <div className={styles.trafficLight} style={{ background: "#ffbd2e" }}></div>
              <div className={styles.trafficLight} style={{ background: "#28c840" }}></div>
              <div style={{ flex: 1 }}></div>
              <div style={{ fontSize: "0.75rem", color: "#6b6b6b", fontFamily: "'DM Sans', sans-serif" }}>Voom.io/v/demo-recording</div>
              <div style={{ flex: 1 }}></div>
            </div>
            <div className={styles.videoBody} style={{ padding: 0, display: 'flex' }}>
              <Image
                src="/demo.png"
                alt="Voom Interface Mockup"
                width={1200}
                height={2000}
                style={{ width: '100%', height: '100&' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <div className={styles.proofStrip}>
        <div className={styles.proofInner}>
          <p className={styles.proofLabel}>Trusted by modern sales teams</p>
          <div className={styles.proofStats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>50K+</div>
              <div className={styles.statLabel}>Videos recorded</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>3.2M</div>
              <div className={styles.statLabel}>Minutes of content</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>12K+</div>
              <div className={styles.statLabel}>Active users</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>4.8★</div>
              <div className={styles.statLabel}>Average rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Everything you need</p>
          <h2 className={styles.sectionTitle}>Record, share &amp; collaborate<br />from one platform</h2>
          <p className={styles.sectionSub}>
            Built on a real-time infrastructure with no third-party recording libraries — so your videos stay fast, private, and yours.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎥</div>
              <div className={styles.featureTitle}>Screen &amp; Webcam Capture</div>
              <p className={styles.featureDesc}>Capture your screen, webcam, or both simultaneously. Switch between 720p and 1080p recording quality based on your plan.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <div className={styles.featureTitle}>Real-time Streaming</div>
              <p className={styles.featureDesc}>Zero dependency on third-party libraries. Our custom real-time socket infrastructure delivers ultra-low latency recording and playback.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔗</div>
              <div className={styles.featureTitle}>Instant Sharing</div>
              <p className={styles.featureDesc}>Share a video link the moment recording stops. Embed custom video thumbnails directly into outreach emails that stand out.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👥</div>
              <div className={styles.featureTitle}>Team Workspaces</div>
              <p className={styles.featureDesc}>Invite teammates into shared workspaces. Collaborate on video libraries, manage permissions, and stay aligned across deals.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <div className={styles.featureTitle}>Viewer Activity Feed</div>
              <p className={styles.featureDesc}>Track every view. Get notified the moment your first prospect watches your video, with a live activity feed for comments and engagement.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>☁️</div>
              <div className={styles.featureTitle}>AWS Cloud Storage</div>
              <p className={styles.featureDesc}>All videos are securely uploaded to AWS with dynamic length limits based on subscription tier. Your content, always available.</p>
            </div>
            {/* <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🖥️</div>
              <div className={styles.featureTitle}>Native Desktop App</div>
              <p className={styles.featureDesc}>Electron-powered desktop app for Windows, macOS, and Linux. Access native devices, save recording presets, and record without a browser tab.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📧</div>
              <div className={styles.featureTitle}>Email Notifications</div>
              <p className={styles.featureDesc}>Receive an email alert the instant a prospect opens your video for the first time — so you can follow up at the perfect moment.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎛️</div>
              <div className={styles.featureTitle}>Device Presets &amp; CMS</div>
              <p className={styles.featureDesc}>Save your camera and microphone preferences as reusable presets. Admins get full CMS control for in-app marketing and announcements.</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className={styles.howSection}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className={styles.sectionLabel}>Workflow</div>
          <h2 className={styles.sectionTitle}>Record to revenue<br />in four steps.</h2>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNum}>01</div>
              <h4 className={styles.stepTitle}>Install &amp; Open</h4>
              <p className={styles.stepDesc}>Download the Electron desktop app or open the web app. Grant mic &amp; camera access once — presets saved forever.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>02</div>
              <h4 className={styles.stepTitle}>Record</h4>
              <p className={styles.stepDesc}>Hit record. Capture screen, webcam, or both in 720p or 1080p. Audio and video stream simultaneously in real time.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>03</div>
              <h4 className={styles.stepTitle}>Share Instantly</h4>
              <p className={styles.stepDesc}>A shareable link is generated automatically. Drop it into an email with an embedded video thumbnail for maximum impact.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>04</div>
              <h4 className={styles.stepTitle}>Track &amp; Follow Up</h4>
              <p className={styles.stepDesc}>Get notified the second someone watches. See view counts, read comments, and strike while the iron&apos;s hot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI SECTION ─── */}
      <section id="ai" className={`${styles.section} ${styles.aiSection}`}>
        <div className={styles.container}>
          <div className={styles.aiGrid}>
            <div>
              <p className={styles.sectionLabel}>Powered by AI</p>
              <h2 className={styles.sectionTitle}>Your AI co-pilot for every video</h2>
              <p className={styles.sectionSub}>Let AI handle transcription, summaries, and answering questions so your prospects stay engaged long after they watch.</p>

              <ul className={styles.aiFeaturesList}>
                <li className={styles.aiFeatureItem}>
                  <span className={styles.aiFeatureDot}></span>
                  <div>
                    <div className={styles.aiFeatureTitle}>Video Chatbot</div>
                    <div className={styles.aiFeatureDesc}>Prospects can ask questions about your video and get instant answers — no back-and-forth needed.</div>
                  </div>
                </li>
                <li className={styles.aiFeatureItem}>
                  <span className={styles.aiFeatureDot}></span>
                  <div>
                    <div className={styles.aiFeatureTitle}>Auto Transcription</div>
                    <div className={styles.aiFeatureDesc}>Every word, timestamped and searchable — generated the moment recording ends.</div>
                  </div>
                </li>
                <li className={styles.aiFeatureItem}>
                  <span className={styles.aiFeatureDot}></span>
                  <div>
                    <div className={styles.aiFeatureTitle}>Smart Summary &amp; Title</div>
                    <div className={styles.aiFeatureDesc}>AI generates a concise summary and optimized title and description for each video.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <div className={styles.aiChatMockup}>
                <div className={styles.chatHeader}>
                  <div className={styles.chatAvatar}>AI</div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#f9f9f7" }}>Video Assistant</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b6b6b" }}>Watching: &quot;Q4 Product Demo&quot;</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#a78bfa", background: "rgba(124,58,237,0.12)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)" }}>Live</div>
                </div>

                {/* User message */}
                <div className={`${styles.chatMsg} ${styles.chatMsgUser}`}>
                  <div className={styles.chatAvatarSmall} style={{ background: "#2a2a2a", color: "#a0a0a0" }}>V</div>
                  <div className={`${styles.chatBubble} ${styles.chatBubbleUser}`}>What integrations do you support?</div>
                </div>

                {/* AI response */}
                <div className={styles.chatMsg}>
                  <div className={styles.chatAvatarSmall} style={{ background: "#7c3aed", color: "#fff" }}>AI</div>
                  <div className={`${styles.chatBubble} ${styles.chatBubbleAi}`}>Based on the demo, we integrate natively with Salesforce, HubSpot, and Slack. At 3:42 in the video, you can see the Salesforce sync in action.</div>
                </div>

                {/* User message */}
                <div className={`${styles.chatMsg} ${styles.chatMsgUser}`}>
                  <div className={styles.chatAvatarSmall} style={{ background: "#2a2a2a", color: "#a0a0a0" }}>V</div>
                  <div className={`${styles.chatBubble} ${styles.chatBubbleUser}`}>What&apos;s the pricing for teams?</div>
                </div>

                {/* AI typing */}
                <div className={styles.chatMsg}>
                  <div className={styles.chatAvatarSmall} style={{ background: "#7c3aed", color: "#fff" }}>AI</div>
                  <div className={styles.typingDots}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                </div>

                {/* Chat input */}
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "10px 12px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <input type="text" placeholder="Ask about this video…" className={styles.chatInput} readOnly />
                    <div className={styles.chatSendBtn}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel} style={{ textAlign: "center" }}>Pricing</p>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center" }}>Simple, honest pricing</h2>
          <p className={styles.sectionSub} style={{ textAlign: "center", margin: "0 auto" }}>Start free, upgrade when you need more. Powered by Stripe.</p>

          <div className={styles.plansGrid}>
            {/* Free */}
            <div className={styles.planCard}>
              <div className={styles.planName}>Free</div>
              <div className={styles.planPrice}>$0 <span>/ month</span></div>
              <p className={styles.planDesc}>Perfect for individuals getting started with video messaging.</p>
              <ul className={styles.planFeatures}>
                <li><span className={styles.check}></span>Unlimited recordings (5 min max)</li>
                <li><span className={styles.check}></span>720p recording quality</li>
                <li><span className={styles.check}></span>Screen + webcam capture</li>
                <li><span className={styles.check}></span>Instant share links</li>
                <li><span className={styles.check}></span>View count &amp; activity feed</li>
                <li><span className={styles.check}></span>One-time AI feature trial</li>
              </ul>
              <Link href="/auth/sign-in" className={`${styles.btn} ${styles.btnOutline}`} style={{ width: "100%", justifyContent: "center" }}>Get started free</Link>
            </div>

            {/* Pro */}
            <div className={`${styles.planCard} ${styles.planCardFeatured}`}>
              <div className={styles.planBadge}>Most Popular</div>
              <div className={styles.planName}>Pro</div>
              <div className={styles.planPrice}>$19 <span>/ month</span></div>
              <p className={styles.planDesc}>For sales professionals who live in their inbox and need every edge.</p>
              <ul className={styles.planFeatures}>
                <li><span className={styles.check}></span>Unlimited recordings (up to 60 min)</li>
                <li><span className={styles.check}></span>1080p HD recording quality</li>
                <li><span className={styles.check}></span>AI Transcription for all videos</li>
                <li><span className={styles.check}></span>AI summary, title &amp; description</li>
                <li><span className={styles.check}></span>AI chatbot on all videos</li>
                <li><span className={styles.check}></span>Email notification on first view</li>
                <li><span className={styles.check}></span>Custom video thumbnails for email</li>
                <li><span className={styles.check}></span>Desktop app access (Win/Mac/Linux)</li>
                <li><span className={styles.check}></span>Device presets</li>
              </ul>
              <Link href="/payment" className={`${styles.btn} ${styles.btnPrimary}`} style={{ width: "100%", justifyContent: "center" }}>Start Pro — free 7-day trial</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsHeader}>
          <p className={styles.sectionLabel}>Testimonials</p>
          <h2 className={styles.sectionTitle}>Loved by teams everywhere</h2>
          <p className={styles.sectionSub} style={{ margin: "0 auto" }}>See what our users are saying about Voom.</p>
        </div>

        <div className={styles.testimonialsWrapper}>
          <div className={styles.testimonialsTrack}>
            {[
              { quote: "Voom replaced our entire demo workflow. Prospects love getting a personal video instead of a generic PDF.", name: "Sarah Chen", role: "Head of Sales, Kova", color: "#7c3aed" },
              { quote: "The AI transcription is insanely good. I send a video and my prospect can search through the content instantly.", name: "Marcus Rivera", role: "AE, CloudStack", color: "#2563eb" },
              { quote: "We closed 3 enterprise deals last month using Voom videos in our outreach. The engagement metrics are unreal.", name: "Emily Zhao", role: "SDR Lead, Nuvio", color: "#059669" },
              { quote: "I used to spend 20 minutes writing follow-up emails. Now I record a 2-minute Voom and get replies the same day.", name: "James Park", role: "Sales Manager, Relay", color: "#dc2626" },
              { quote: "The desktop app is buttery smooth. I can start recording with a keyboard shortcut and share in seconds.", name: "Priya Sharma", role: "BDR, Finmark", color: "#d97706" },
              { quote: "Our team went from 12% reply rate to 38% after switching to Voom video outreach. The numbers speak for themselves.", name: "David Kim", role: "VP Sales, Tessera", color: "#7c3aed" },
              { quote: "Being able to see when a prospect watches my video changed the game. I follow up at the exact right moment.", name: "Rachel Foster", role: "Enterprise AE, Modo", color: "#2563eb" },
              { quote: "The AI summary saved me hours. It generates titles and descriptions that are actually better than what I'd write.", name: "Tom Nguyen", role: "CSM, Brightpath", color: "#059669" },
              { quote: "Voom is the only tool my entire team actually uses daily. The UX is beautiful and recording takes zero effort.", name: "Nina Patel", role: "Revenue Lead, Synnex", color: "#dc2626" },
              { quote: "The video chatbot blew my mind. My prospect asked a question while I was asleep and got an answer instantly.", name: "Chris Okafor", role: "AE, Lumino", color: "#d97706" },
              // Duplicated for seamless loop
              { quote: "Voom replaced our entire demo workflow. Prospects love getting a personal video instead of a generic PDF.", name: "Sarah Chen", role: "Head of Sales, Kova", color: "#7c3aed" },
              { quote: "The AI transcription is insanely good. I send a video and my prospect can search through the content instantly.", name: "Marcus Rivera", role: "AE, CloudStack", color: "#2563eb" },
              { quote: "We closed 3 enterprise deals last month using Voom videos in our outreach. The engagement metrics are unreal.", name: "Emily Zhao", role: "SDR Lead, Nuvio", color: "#059669" },
              { quote: "I used to spend 20 minutes writing follow-up emails. Now I record a 2-minute Voom and get replies the same day.", name: "James Park", role: "Sales Manager, Relay", color: "#dc2626" },
              { quote: "The desktop app is buttery smooth. I can start recording with a keyboard shortcut and share in seconds.", name: "Priya Sharma", role: "BDR, Finmark", color: "#d97706" },
              { quote: "Our team went from 12% reply rate to 38% after switching to Voom video outreach. The numbers speak for themselves.", name: "David Kim", role: "VP Sales, Tessera", color: "#7c3aed" },
              { quote: "Being able to see when a prospect watches my video changed the game. I follow up at the exact right moment.", name: "Rachel Foster", role: "Enterprise AE, Modo", color: "#2563eb" },
              { quote: "The AI summary saved me hours. It generates titles and descriptions that are actually better than what I'd write.", name: "Tom Nguyen", role: "CSM, Brightpath", color: "#059669" },
              { quote: "Voom is the only tool my entire team actually uses daily. The UX is beautiful and recording takes zero effort.", name: "Nina Patel", role: "Revenue Lead, Synnex", color: "#dc2626" },
              { quote: "The video chatbot blew my mind. My prospect asked a question while I was asleep and got an answer instantly.", name: "Chris Okafor", role: "AE, Lumino", color: "#d97706" },
            ].map((t, i) => (
              <div key={`t-${i}`} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} style={{ background: t.color }}>{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD ─── */}
      <section id="download" className={`${styles.section} ${styles.downloadSection} ${styles.downloadSectionBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Desktop App</p>
          <h2 className={styles.sectionTitle}>Built for your desktop</h2>
          <p className={styles.sectionSub} style={{ margin: "0 auto 0.5rem" }}>
            Powered by Electron. Record at the system level — access native cameras, mics, and screen capture without a browser tab.
          </p>

          <div className={styles.downloadCards}>
            <a
              href="https://github.com/yatharthaurangpure01/Video-Messaging-App/releases/latest/download/Voom-Windows-0.0.0-Setup.exe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dlCard}
            >
              <span className={styles.dlOsIcon}><Image src={"/window.png"} alt="window-logo" width={100} height={100} /></span>
              <div className={styles.dlOsName}>Windows</div>
              <div className={styles.dlOsExt}>.exe installer · x64</div>
              <div className={styles.dlBtnInner}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                Download
              </div>
            </a>
          </div>


        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerGlow}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className={styles.sectionLabel} style={{ textAlign: "center" }}>Get started</p>
          <h2 className={styles.ctaBannerTitle}>Stop writing emails.<br />Start sending videos.</h2>
          <p className={styles.ctaBannerSub}>Your prospects will watch. Your pipeline will thank you.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <Link href="/auth/sign-in" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>Start for free</Link>
            <a href="#download" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>Download desktop app</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/" className={styles.logo} style={{ fontSize: "1.1rem" }}>
            <Image src="/voom.png" alt="Voom logo" width={160} height={80} />
          </Link>
          <ul className={styles.footerLinks}>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Changelog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div style={{ color: "#6b6b6b" }}>© 2025 Voom. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
