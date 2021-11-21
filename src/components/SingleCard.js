import "./SingleCard.css";

export default function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/assets/card-background.png"
          onClick={handleClick}
          alt="cover"
        />
      </div>
    </div>
  );
}
