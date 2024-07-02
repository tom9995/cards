import { useEffect, useState } from "react";

const Card = ({ car, selected, setSelected }) => {
  const [isF, setIsF] = useState(false);

  useEffect(() => {
    if (selected[0] === car || selected[1] === car || car.isMatch) {
      setIsF(true);
    } else {
      setIsF(false);
    }
  }, [selected]);

  const handleCilick = () => {
    setSelected([...selected, car]);
  };

  return (
    <>
      <div className={isF ? "card open" : "card"} onClick={handleCilick}>
        <div>
          <img src={car.img}></img>
        </div>
        <div className="back"></div>
      </div>
    </>
  );
};

export default Card;
