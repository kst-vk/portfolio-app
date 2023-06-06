import "../styles/Base.scss";
import DisplayPad from "./DisplayPad";

export default function Contact() {
    return (
        <DisplayPad><p style={{cursor: "pointer"}}onClick={() => {window.open('mailto:karolst@protonmail.com');}}>karolst@protonmail.com</p></DisplayPad>
    )
}