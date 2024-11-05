import { useEffect, useRef } from "react";
import { CARDS } from "../../landing/gamePlayMechanics";
import Card from "./Card";
import './index.css';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      {CARDS.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
          // className="mob-gameplay-card"
        />
      ))}
    </div>
  );
};

const GameplayMechanics = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create context for cleanup
    const ctx = gsap.context(() => {
      if (!headerRef.current || !containerRef.current || !cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".mob-gameplay-card");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Header animation
      tl.fromTo(
        headerRef.current, 
        { 
          x: '100%', 
          height: '100vh',
          opacity: 0 
        }, 
        { 
          x: 0, 
          height: 'auto',
          opacity: 1,
          duration: 1 
        }
      );

      // Cards animation - make sure cards exist before animating
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { 
            opacity: 0.8, 
            scale: 0.8,
            x: 0 
          },
          { 
            x: `-${100 * (cards.length - 1)}%`,
            ease: "none",
            opacity: 1,
            scale: 1,
            stagger: 0.2
          }
        );
      }
    }, containerRef); // Scope GSAP to container

    // Cleanup function
    return () => {
      ctx.revert(); // This will clean up all GSAP animations
    };
  }, []);

  return (
    <div ref={containerRef} className="gameplay-mechanics-container">
      <Header headerRef={headerRef} />
      <CardList cardsRef={cardsRef} />
    </div>
  );
};

export default GameplayMechanics;