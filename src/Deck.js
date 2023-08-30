import { useState, useEffect, useRef } from "react";
import Card from "./Card"


export default function Deck () {
  const [deck, updateDeck] = useState([])
  const deckRef = useRef()
  useEffect(() => {
    async function getDeck() {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      const data = await res.json()
      deckRef.current = data.deck_id
      console.log(deckRef)
    }
    getDeck()
  }, [])
  

  async function draw () {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckRef.current}/draw/?count=1`)
    const data = await res.json()
    console.log(data.cards[0])
    const newDeck = [...deck]
    newDeck.push(data.cards[0])
    console.log(deckRef)
    updateDeck(newDeck)
  }

  async function shuffle (e) {
    e.target.disabled = true;
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckRef.current}/shuffle/`)
    const data = await res.json()
    console.log(data)
    e.target.disabled = false;
    updateDeck([])
  }

  return (
    <div className="Deck">
      {deck.map((c,i) => <Card key={i} code={c.code}/>)}
      <button type="button" onClick={draw}>draw a card</button>
      <button type="button" onClick={shuffle}>shuffle</button>
    </div>
  )
}