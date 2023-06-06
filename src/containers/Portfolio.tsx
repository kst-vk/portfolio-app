import "../styles/Base.scss";

import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import DisplayPad from "../components/DisplayPad";
import { AnimatePresence, motion } from "framer-motion";
const variants = {
  open: { height: 200, scaleY: 1 },
  closed: { height: 0, scaleY: 0 },
}
const PainterApp = lazy(() => import('./PainterApp'));
const NumberRecognitionApp = lazy(() => import('./DigitRecognitionApp'));


export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation();

  useEffect(() => {
    setIsOpen(location.pathname === '/portfolio');
  }, [location])

  return (
    <div>
      <motion.div animate={isOpen ? "open" : "closed"}
        variants={variants}>
        <DisplayPad><Link to={'painter'}>Painter</Link></DisplayPad>
        <DisplayPad><Link to={'numberrecognition'}>Digit Recognition</Link></DisplayPad>
      </motion.div>
      <Suspense fallback={<p> Loading...</p>}>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='painter' element={<DisplayPad><PainterApp /></DisplayPad>} />
            <Route path='numberrecognition' element={<DisplayPad><NumberRecognitionApp /></DisplayPad>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  )
}