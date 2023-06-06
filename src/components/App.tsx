import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import NavigationBar from './NavigationBar';
import Portfolio from '../containers/Portfolio';
import SlideInPad from './SlideInPad';
import BackgroundAnimation from './BackgroundAnimation';
import Contact from './Contact';

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <header className="App-header">
        <BackgroundAnimation />
        <NavigationBar />
        <div className={"main-outlet" }>
        <AnimatePresence  mode='wait' initial={false}>
          <Routes location={location} key={location.pathname.split('/')[1]}>
            <Route path="/portfolio-app/" element={<SlideInPad><Home /></SlideInPad>} />
            <Route path="/contact" element={<SlideInPad><Contact /></SlideInPad>} />
            <Route path="/portfolio/*" element={<SlideInPad><Portfolio /></SlideInPad>} />
          </Routes>
        </AnimatePresence>
        </div>
      </header>
    </div>
  );
}
