import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './starDustStyles.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const StarDustMobile = () => {
  // const isMobile = () => window.innerWidth <= 768;
  // const [showMobile, setShowMobile] = useState(isMobile());
  
  // Refs for elements we'll animate
  const containerRef = useRef(null);
  const orangePlanetRef = useRef(null);
  const overviewRef = useRef(null);
  const tapToMineRef = useRef(null);
  const uspRef = useRef(null);
  const starDustRef = useRef(null);
  const upgradesRef = useRef(null);
  const gameConceptRef = useRef(null);

  // Wait for component mount before initializing GSAP
  useEffect(() => {
    let ctx;
    
    // Make sure all refs are available
    if (containerRef.current && 
        orangePlanetRef.current && 
        overviewRef.current && 
        tapToMineRef.current && 
        uspRef.current && 
        starDustRef.current && 
        upgradesRef.current && 
        gameConceptRef.current) {
      
      ctx = gsap.context(() => {
        // Initial states - using a single gsap.set for better performance
        gsap.set([
          overviewRef.current,
          tapToMineRef.current,
          uspRef.current,
          starDustRef.current,
          upgradesRef.current,
          gameConceptRef.current
        ], { 
          y: '100%', 
          opacity: 0,
          immediateRender: true
        });

        // Set orange planet initial position
        gsap.set(orangePlanetRef.current, {
          x: '50%',
          y: '50%',
          scale: 1.2,
          xPercent: 20,
          yPercent: -15,
          immediateRender: true
        });

        // Create ScrollTrigger animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=4000',
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / 6,
              duration: { min: 0.2, max: 0.3 },
              inertia: false
            },
            invalidateOnRefresh: true
          }
        });

        // Animation sequence
        tl.to(orangePlanetRef.current, {
          y: '40%',
          scale: 0.9,
          duration: 1
        })
        .to(overviewRef.current, {
          opacity: 1,
          y: '30%',
          duration: 1
        }, '<')
        .to([orangePlanetRef.current, overviewRef.current], {
          y: '0',
          x: '-2%',
          opacity: 1,
          duration: 1
        })
        .to(tapToMineRef.current, {
          opacity: 1,
          y: '0',
          duration: 1
        })
        .to(uspRef.current, {
          opacity: 1,
          y: '0',
          duration: 1
        })
        .to(starDustRef.current, {
          opacity: 1,
          y: '0',
          duration: 1
        })
        .to(upgradesRef.current, {
          opacity: 1,
          y: '0',
          duration: 1
        })
        .to(gameConceptRef.current, {
          opacity: 1,
          y: '0',
          duration: 1
        });
      }, containerRef);
    }

    // Cleanup function
    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  // Handle resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setShowMobile(isMobile());
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // if (!showMobile) {
  //   return null;
  // }

  return (
    <div ref={containerRef} className="game-container">
      <div className="background-overlay background-image" style={{ backgroundImage: 'url("mbg.png")', backgroundSize: 'cover' }}>
        <img
          src="mbg.png"
          alt="Space background"
          className="background-image"
          fetchpriority="low"
          loading="lazy"
        />
      </div>

      <div className="content-container">
        

        <div className="main-section">
          <div className="section-header">
            <h2 ref={overviewRef} className="section-title">
              Overview of Star Dust Adventures
            </h2>
          </div>

          <div>
            <div className="features-container">
              <img 
                ref={orangePlanetRef} 
                className="orange-planet" 
                src="red_planet.png"
                // src={{ backgroundImage: 'url("red_planet.png")' }}
              />

              <div className="feature-list">
                <div ref={tapToMineRef} className="feature-tap-mine">
                  <h1 className="feature-title">Tap-to-Mine Mechanics</h1>
                  <p className="feature-description">
                    Engaging and addictive gameplay that appeals to a wide range of players.
                  </p>
                </div>

                <div ref={uspRef} className="feature-usp">
                  <h1 className="feature-title">Unique Selling Proposition</h1>
                  <p className="feature-description">
                    Exciting game mechanics merged with blockchain play-to-earn mechanics for gamers and crypto enthusiasts.
                  </p>
                </div>

                <div ref={starDustRef} className="feature-stardust">
                  <h1 className="feature-title">Star Dust Resources</h1>
                  <p className="feature-description">
                    A valuable in-game resource with real-world cryptocurrency potential, increasing player engagement.
                  </p>
                </div>

                <div ref={upgradesRef} className="feature-upgrades">
                  <h1 className="feature-title">Upgrades</h1>
                  <p className="feature-description">
                    Players can enhance their astronaut's gear, oxygen tank, and spaceship for improved efficiency.
                  </p>
                </div>

                <div ref={gameConceptRef} className="feature-concept">
                  <h1 className="feature-title">Game Concept</h1>
                  <p className="feature-description">
                    Control an astronaut mining StarDust across the universe with tap-to-earn mechanics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarDustMobile;