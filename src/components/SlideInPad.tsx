import { motion } from "framer-motion";
import "../styles/Base.scss";

export default function SlideInPad(props: { children: any }) {
    return (
        <motion.div initial={{ x: window.innerWidth, scaleX: 0 }} // using vw in initial state disables listeners of the children, possibly a bug.
            animate={{ x: 0, scaleX: 1 }}
            exit={{ x: "-100vw", scaleX: 0 }}
            transition={{ ease: 'easeOut', type: "tween" }}>
            {props.children}
        </motion.div>
    )
}
