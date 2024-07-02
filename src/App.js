import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card";

function App() {
  const cards = [
    { img: "animal_black_sheep_hitsuji.png", number: 1, isMatch: false },
    { img: "animal_kiboshi_iwa_hyrax.png", number: 2, isMatch: false },
    { img: "animal_okojo_summer.png", number: 3, isMatch: false },
    { img: "animal_rakuda_kobu_tareru.png", number: 4, isMatch: false },
  ];

  const [state, setState] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const newCards = [...cards, ...cards]
      .map((c, index) => ({
        ...c,
        id: index + 1,
      }))
      .sort(() => Math.random() - 0.5);

    setState(newCards);
  };

  useEffect(() => {
    if (selected.length == 2) {
      setTimeout(() => {
        setSelected([]);
      }, 1000);

      check();
    }
  }, [selected]);

  useEffect(() => {
    if (state.length === 0) return;

    const all = state.every((c) => c.isMatch);

    if (all) {
      setTimeout(() => {
        alert("クリア");
      }, 500);
    }
  }, [state]);

  const check = () => {
    if (selected[0].number === selected[1].number) {
      const newM = state.map((c) => {
        if (c.number === selected[0].number) {
          return { ...c, isMatch: true };
        }
        return c;
      });
      setState(newM);
    } else {
      setTries((prev) => prev + 1);
      if (tries >= 3) {
        alert("失敗");
      }
    }
  };

  // console.log(state);

  return (
    <>
      <div className="container">
        <div className="cards-container">
          {state.map((car) => (
            <Card
              key={car.id}
              car={car}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
