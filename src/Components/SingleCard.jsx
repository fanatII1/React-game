import React from 'react'
import "./SingleCard.css";

/*this component is going to create the specific card with images for the front and back
of the card.
For each card we are going to append the specific image to the specific card
For this to work we passed the "card" parameter from the callback function of the "map" method.

*/
function SingleCard({card, handleChoice, flipped}) {
    const handleClick = () => {

        handleChoice(card);
    }

  return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
            <img src={card.src}  className="frontCoverImage" alt="" />
            <img src='/images/coverImage.png' className="backImage" alt="" onClick={handleClick}/>
        </div>
    </div>
  )
}

export default SingleCard