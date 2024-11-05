import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { CARDS } from "../../landing/gamePlayMechanics";
import Card from "./Card";
import './index.css';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Header = ({ headerRef }: { headerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div ref={headerRef} className="gameplay-header">
      <h2 className="gameplay-title">Gameplay Mechanics</h2>
      <p className="gameplay-caption">
        Explore the engaging system of Star Dust Adventures
      </p>
    </div>
  );
};

const CardList = ({ cardsRef }: { cardsRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div ref={cardsRef} className="gameplay-cards-container">
      {CARDS.map((card: CardProps, index: number) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
         
        />
      ))}
    </div>
  );
};

const GameplayMechanics = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const cleanup = () => {
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Clear GSAP contexts
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.revert();
      animationRef.current = null;
    }

    // Reset styles
    if (headerRef.current) {
      gsap.set(headerRef.current, { clearProps: "all" });
    }
    if (cardsRef.current) {
      gsap.set(cardsRef.current.children, { clearProps: "all" });
    }
  };

  const initializeAnimations = () => {
    if (!headerRef.current || !containerRef.current || !cardsRef.current) return;

    cleanup();

    // Create new animation context
    animationRef.current = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".mob-gameplay-card");
      if (!cards?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onKill: () => {
            gsap.set([headerRef.current, cards], { clearProps: "all" });
          },
          onUpdate: (self) => {
            if (self.isActive) {
              setIsInitialized(true);
            }
          }
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // Set initial states
      gsap.set(headerRef.current, {
        x: '100%',
        height: '100vh',
        opacity: 0
      });
      
      gsap.set(cards, {
        opacity: 0.8,
        scale: 0.8,
        x: 0
      });

      // Animations
      tl.to(headerRef.current, {
        x: 0,
        height: 'auto',
        opacity: 1,
        duration: 1
      });

      tl.to(cards, {
        x: `-${100 * (cards.length - 1)}%`,
        ease: "none",
        opacity: 1,
        scale: 1,
        stagger: 0.2
      });
    }, containerRef);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      initializeAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  useEffect(() => {
    let resizeTimeout: number;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      cleanup();
      
      resizeTimeout = window.setTimeout(() => {
        initializeAnimations();
        ScrollTrigger.refresh(true);
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cleanup();
    };
  }, []);

  // Add styles to prevent FOUC
  const containerStyle = {
    visibility: isInitialized ? 'visible' : 'hidden',
    opacity: isInitialized ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div ref={containerRef} className="gameplay-mechanics-container" >
      <Header headerRef={headerRef} />
      <CardList cardsRef={cardsRef} />
    </div>
  );
};

export default GameplayMechanics;