import "./App.css";
import { useEffect, useState } from "react";

import SingleCard from "./Components/SingleCard";

/*We are going to create a memory game, wherby a user can click a few cards to see if they match or not.
If the cards match, they will be stay flipped. If not, then the cards will return back
to their original state, wherby only the back of the card was shown.
*/

/*Now firstly we are going to create an array of images, wherby each card that will be 
created, will point to the specific image*/
const cardImages = [
  { src: "/images/Aubameyang.png", match:false},
  { src: "/images/Messi.png", match:false},
  { src: "/images/Ballack.png", match:false },
  { src: "/images/DOS_AVIIERO.png", match:false },
  { src: "/images/Neymar.png", match:false },
  { src: "/images/Iniesta.png", match:false }
];

/*Then, after, we want to create a duplicate array of 12 images(so that there can be 12 image/cards)
instead of 6.
This array will be stored in state because when the 'New Game' button is clicked,
the array will be reshuffled and the cards will have a different image.And when the 
'New Game' button is clicekd, a new pair of cards will be shown*/
function App() {
  const[cards, setCards] = useState([]);
  const[firstChoice, setFirstChoice] = useState(null);
  const[secondChoice, setSecondChoice] = useState(null);
  const[disabled, setDisabled] = useState(false)

  //creating a function that will reshuffle the cards
  const reShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort( ()=> Math.random() - 0.5) //sorting the array randomly. 
    .map((card) => ({...card, id: Math.random()}) ) //for each card, we are going to create a key
    setCards(shuffledCards);

    //when the new button is clicked, the null state varibale will be set to null
    setFirstChoice(null)
    setSecondChoice(null)

  }

  //this function will handle the cards that the user picks
  //if user has not picked a card, we are going to set the initial card that the user picked
  //if the user has picked a card, thus the firstChoice card state was set, now the second cards value(state) is set
  const handleChoice = (cardSelected) => {
    firstChoice ? setSecondChoice(cardSelected) : setFirstChoice(cardSelected)
  }

  //then we are going to compare the cards if the match or not. if the cards chosen, match, then we set the properties that they match to true, in the cards array
  //this will allow us to flip the cards, if the cards match
  //we made use of useEffect hook so that the function can execute right after the dependency has a value, and that value has changed
  //if the cards match, the values will be set to true and then first and second choice state will be set to null so that the user may be able to store  new choices again
  useEffect( () => {
    if(firstChoice && secondChoice) {
      setDisabled(true) //if the cards match, they will be disabled

      if(firstChoice.src === secondChoice.src){
        setCards(prevCards => {
          return prevCards.map( card => {
            if(card.src === firstChoice.src){
              return {...card, match: true}
            } else {
              return card
            }
          })
        })
        resetTurn()  
      } else{
        resetTurn()
      }
    }
     
  }, [firstChoice, secondChoice])
  

  //we want to reset the choices after the user clicks the card
  //and also we want to be able to click the cards after the cards match
  const resetTurn = () =>{
    setDisabled(false)
    setFirstChoice(null)
    setSecondChoice(null)

  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={reShuffleCards}>New Game</button>

      <div className="card-grid">
      {
         cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card ===  firstChoice || card === secondChoice || card.match} disabled={disabled}/>
        ) )
      }
      </div>
      
    </div>
  );
}

export default App;
