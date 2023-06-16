import { stagger } from "framer-motion";
import { SetStateAction, useEffect } from "react";

export default function useNavigationBarFadeInAnimation(isNavExpanded: boolean, windowWidth: number, animate: any, setWindowWidth: { (value: SetStateAction<number>): void; (arg0: number): void; }, setIsNavExpanded: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) {
    
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth); setIsNavExpanded(window.innerWidth >= 550)
        }
        window.addEventListener('resize', handleResize);
        const menuAnimations: any = isNavExpanded
          ? [
            [
              "nav",
              { scaleY: 1 },
              { transform: "translateX(0%)" },
              { ease: [0.08, 0.65, 0.53, 0.96], duration: 11.6 },
              { onAnimationCoplete: () => { } }
            ],
            [
              "li",
              { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
              { delay: stagger(0.05), at: "-0.1" }
            ]
          ]
          : [
            [
              "li",
              { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
              { delay: stagger(0.05, { from: "last" }), at: "<" }
            ],
            ["nav",
              { scaleY: 0 }, { transform: "translateX(-100%)" }, { at: "-0.1" },
              { ease: [0.08, 0.65, 0.53, 0.96], duration: 11.6 }]
          ];
    
        animate([
          ...menuAnimations
        ]);
    
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [isNavExpanded, windowWidth, animate, setWindowWidth, setIsNavExpanded]);
}
