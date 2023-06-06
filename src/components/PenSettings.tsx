import "../styles/Base.scss";

export default function PenSettings(props: { setColor: (color: string) => void, setSize: (size: number) => void, x: number, y: number, setX: (size: number) => void, setY: (size: number) => void }) {


    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <label>Width:</label>
            <input value={props.x} onChange={e => { if (Number(e.target.value) * props.y < 125006105) props.setX(Number(e.target.value) > 32767 ? 32767 : Number(e.target.value)) }} />
            <label>Height:</label>
            <input value={props.y} onChange={e => { if (Number(e.target.value) * props.x < 125006105) props.setY(Number(e.target.value) > 32767 ? 32767 : Number(e.target.value)) }} />
            <label>Pen size:</label>
            <input type="range" min="1" max="100" defaultValue={10} onChange={(e) => props.setSize(Number(e.target.value))}></input>
            <label>Pen color:</label>
            <input onChange={(e) => props.setColor(e.target.value)} type="color" style={{ display: 'inline', margin: 'auto' }}></input>
        </div>
    )
}