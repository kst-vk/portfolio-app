import { motion } from "framer-motion";
import "../styles/Base.scss";

export default function DisplayPad(props: { children: any }) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "#FAFAFFCA", borderRadius: '25px', padding: "1vh 1vw", margin: "1vh 1vw"}}>
            {props.children}
        </motion.div>
    )
}