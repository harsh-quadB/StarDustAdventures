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
const PatternCover = ()=> {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GradientCover>
      <Suspense fallback={<p>Loading...</p>}>
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
const Landing = ()=>{
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="page">
      <Hero />
      {width > 1024 ? <GameConcept /> : <StarDustMobile />}
      <PatternCover />
      <Footer />
    </div>
  );
};

export default Landing;
