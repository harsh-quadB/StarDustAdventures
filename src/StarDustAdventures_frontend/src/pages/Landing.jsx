import React, { lazy, Suspense, useEffect, useState } from 'react';
import '../components/landing/landing.css';
import Hero from '../components/landing/hero/Hero';
import Footer from '../components/landing/footer';
import GameConcept from '../components/landing/gameConcept/GameConcept';
import Lore from '../components/landing/loreStoryline/Lore';
import GradientCover from '../components/landing/GradientCover';
import GameConceptM from '../components/landing-mobile/gameConcept/GameConceptM';
import LoreM from '../components/landing-mobile/lore/LoreM';
import StarDustMobile from '../components/landing-mobile/star-mobile-landing/StarDustMobile'

const GamePlayMechanics = lazy(() => import('../components/landing/gamePlayMechanics'));
const MobileGameplayView = lazy(() => import('../components/landing-mobile/gameplayMechanics'));

/**
 * PatternCover component dynamically renders gameplay mechanics based on screen width,
 * displaying a mobile or desktop view inside a gradient cover. It also includes the Lore component.
 *
 * @returns {JSX.Element} The PatternCover component wrapped in a GradientCover with dynamic content.
 */
const PatternCover = ({ width }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [width]);

  if (isLoading) {
    return (
      <GradientCover>
        <div>Loading...</div>
      </GradientCover>
    );
  }

  return (
    <GradientCover>
      <Suspense fallback={<div>Loading...</div>}>
        {width > 768 ? <GamePlayMechanics /> : <MobileGameplayView />}
        {width > 768 ? <Lore /> : <LoreM />}
      </Suspense>
    </GradientCover>
  );
};

/**
 * Landing component renders the main landing page, including the Hero, Game Concept, and Footer sections.
 * It dynamically switches between mobile and desktop versions of the GameConcept component based on screen width.
 *
 * @returns {JSX.Element} The complete landing page layout.
 */
const Landing = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      setIsTransitioning(true);  // Set transitioning state
      
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
        setIsTransitioning(false);  // Clear transitioning state after update
      }, 150);  // Increased delay slightly
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // If transitioning, show a simple loading state or nothing
  if (isTransitioning) {
    return <div className="page loading">Loading...</div>;
  }

  return (
    <div className="page">
      <Hero />
      {width > 1024 ? <GameConcept /> : <StarDustMobile />}
      <PatternCover width={width} />  {/* Pass width as prop */}
      <Footer />
    </div>
  );
};

export default Landing;