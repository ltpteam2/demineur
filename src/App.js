import React, { useState } from "react";
import useDidMount from "@rooks/use-did-mount";

import "./App.css";
import "bulma/css/bulma.css";

import { Button } from "bloomer";

import bomb from "./images/bomb.png";

const CarreVide = ({ nbAAfficher }) => {
  return (
    <div
      style={{
        height: 25,
        width: 25,
        margin: 1,
        textAlign: "center",
        backgroundColor: "#d9e5ec",
        fontWeight: "800",
        color: "red"
      }}
    >
      {nbAAfficher !== 0 && nbAAfficher}
    </div>
  );
};

const CarreBomb = () => {
  return (
    <div
      style={{
        height: 25,
        width: 25,
        margin: 1
      }}
    >
      <img src={bomb} alt="Bombe !" />
    </div>
  );
};

const CarreInconnu = () => {
  return (
    <div
      style={{
        height: 25,
        width: 25,
        margin: 1,
        backgroundColor: "grey",
        color: "white"
      }}
    />
  );
};

const trouveLeNombreDeBombes = (grille, x, y) => {
  console.log("from trouveLeNombreDeBombes, la grille : ", grille);
  let nbDeBombes = 0;
  if (x !== 0 && grille[y][x - 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (x !== 9 && grille[y][x + 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 0 && grille[y - 1][x] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 0 && grille[y - 1][x - 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 0 && grille[y - 1][x + 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 9 && grille[y + 1][x] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 9 && grille[y + 1][x - 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  if (y !== 9 && grille[y + 1][x + 1] === true) {
    nbDeBombes = nbDeBombes + 1;
  }
  return nbDeBombes;
};

const Carre = props => {
  const {
    bombeOuPas,
    grille,
    x,
    y,
    gameOver,
    changeLaValeurDeGameOver
  } = props;
  const [visible, rendsVisible] = useState(false);
  donneUnNombreAuHasard();
  const handleClick = () => {
    rendsVisible(true);
    if (bombeOuPas === true) {
      changeLaValeurDeGameOver(true);
    }
  };
  if (gameOver === true) {
    return (
      <div>
        {bombeOuPas === false ? <CarreVide nbAAfficher={0} /> : <CarreBomb />}
      </div>
    );
  }
  return (
    <div style={{ cursor: "pointer" }} onClick={() => handleClick()}>
      {visible ? (
        <div>
          {bombeOuPas === false ? (
            <CarreVide nbAAfficher={trouveLeNombreDeBombes(grille, x, y)} />
          ) : (
            <CarreBomb />
          )}
        </div>
      ) : (
        <CarreInconnu />
      )}
    </div>
  );
};

const donneUnNombreAuHasard = () => {
  const chiffre = Math.floor(Math.random() * 10);
  return chiffre;
};

const creeUnCarre = () => {
  const nb = donneUnNombreAuHasard();
  if (nb === 3) {
    return true;
  }
  return false;
};

const creeUneLigne = () => {
  let ligne = [];
  for (let x = 0; x < 10; x++) {
    const carre = creeUnCarre();
    ligne.push(carre);
  }
  return ligne;
};

const creeUneGrille = () => {
  let grille = [];
  for (let x = 0; x < 10; x++) {
    const ligne = creeUneLigne();
    grille.push(ligne);
  }
  return grille;
};

const Ligne = props => {
  const { grille, ligne, i, gameOver, changeLaValeurDeGameOver } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      {ligne.map((bombeOuPas, index) => (
        <div key={index}>
          <Carre
            bombeOuPas={bombeOuPas}
            x={index}
            y={i}
            grille={grille}
            gameOver={gameOver}
            changeLaValeurDeGameOver={changeLaValeurDeGameOver}
          />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [gameOver, changeLaValeurDeGameOver] = useState(false);
  const [grille, changeLaValeurDeLaGrille] = useState([]);
  useDidMount(function() {
    changeLaValeurDeLaGrille(creeUneGrille());
  });
  const rejouer = () => {
    window.location.reload();
  };
  return (
    <div
      style={{
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <div
        style={{
          marginBottom: 50,
          height: 250,
          width: 250
        }}
      >
        {grille.map((ligne, i) => (
          <div key={i}>
            <Ligne
              ligne={ligne}
              i={i}
              grille={grille}
              gameOver={gameOver}
              changeLaValeurDeGameOver={changeLaValeurDeGameOver}
            />
          </div>
        ))}
      </div>
      {gameOver && (
        <div style={{ textAlign: "center", margintop: 50 }}>
          <Button
            isColor="success"
            isSize="small"
            style={{ fontWeight: "800", marginBottom: 10 }}
            onClick={() => rejouer()}
          >
            Je voudrais rejouer !
          </Button>
          <div>
            <Button
              href="https://www.logicieleducatif.fr/indexcm2.php"
              isColor="info"
              isSize="small"
              style={{ fontWeight: "800" }}
            >
              Je vais plutôt aller faire mes devoirs.
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
