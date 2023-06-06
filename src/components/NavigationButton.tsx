import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavigationButton({ children, route }: any) {
  return (
    <Link to={route}>
      <motion.div whileHover={{
        color: ["#000", "#B9BBBE", "#AAF"],
        transition: { duration: 1 }
      }}>
        {children}
      </motion.div>
    </Link>
  )
}