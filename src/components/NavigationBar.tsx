import {  useAnimate } from "framer-motion";
import {  useState } from "react";
import "../styles/Base.scss";
import "../styles/NavigationBar.scss";
import NavigationButton from "./NavigationButton";
import useNavigationBarFadeInAnimation from "../hooks/useNavigationBarFadeInAnimation";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(true);
  const [scope, animate] = useAnimate()
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  
  useNavigationBarFadeInAnimation(isNavExpanded, windowWidth, animate, setWindowWidth, setIsNavExpanded)

  return (
    <nav ref={scope} className="navigation">

      <button
        className="expand-navigation-menu"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg fill="white" color="white" viewBox="0 0 100 80" width="100%" height="100%">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
      <div
        className={
          (isNavExpanded) ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul onClick={() => {
          if (windowWidth <= 550) setIsNavExpanded(!isNavExpanded);
        }}>
          <li>
            <NavigationButton route="portfolio-app/">About</NavigationButton>
          </li><li>
            <NavigationButton route="portfolio">Portfolio</NavigationButton>
          </li>
          <li>
            <NavigationButton route="contact">Contact</NavigationButton>
          </li>
          <li>
          <NavigationButton href="https://github.com/kst-vk/portfolio-app">Github</NavigationButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}
