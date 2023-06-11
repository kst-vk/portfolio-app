import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavigationButton(props: { children: any, route?: string, href?: string }) {
  const content = (
    <motion.div whileHover={{
      color: ["#000", "#B9BBBE", "#AAF"],
      transition: { duration: 1 }
    }}>
      {props.children}
    </motion.div>
  )
  
  let component;
  if (props.href) {
    component = (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  } else if (props.route) {
    component = (
      <Link to={props.route}>
        {content}
      </Link>
    )
  } else {
    component = content;
  }

  return (component)
}