import "./Card.css"

export default function Card ({code}) {
  let posneg = Math.floor(Math.random()) > 0.5 ? 1 : -1
  const rotation = Math.floor(Math.random()*45) * posneg
  return (
    <img className="Card" src={`https://deckofcardsapi.com/static/img/${code}.png`} alt="card" style={{transform: `rotate(${rotation}deg)` }}></img>
  )
}