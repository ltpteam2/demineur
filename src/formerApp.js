import React, { useState } from "react";

import "./App.css";
import "bulma/css/bulma.css";

import { Columns, Column } from "bloomer";

import bomb from "./images/bomb.png";

const CarreVide = props => {
  return (
    <div
      style={{
        height: 25,
        width: 25,
        margin: 1,
        textAlign:"center",
        backgroundColor: "#d9e5ec",
        fontWeight:"800",
        color: "red"
      }}
    >
      3
      </div>
  );
};

const CarreBomb = props => {
  return (
    <div style={{
      height: 25,
      width: 25,
      margin: 1
    }}>
      <img
        src={bomb}
        alt="Bombe !"
      />
    </div>

  );
};

const CarreInconnu = props => {
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

const Carre = props => {
  console.log(props)
  const [visible, rendsVisible] = useState(false);
  nombreAuHasard();
  const handleClick = () => {
    rendsVisible(true);
  };
  const { carre } = props;
  const { bombeOuPas } = carre;
  return (
    <div style={{ cursor: "pointer" }} onClick={() => handleClick()}>
      {visible ? (
        <div>{bombeOuPas === 0 ? <CarreVide /> : <CarreBomb />}</div>
      ) : (
          <CarreInconnu />
        )}
    </div>
  );
};

const grilleArray = [
  ["1", "2", "3"],
  ["1", "2", "3"],
  ["1", "2", "3"],
]

const nombreAuHasard = () => {
  const chiffre = Math.floor(Math.random() * 10);
  // console.log("chiffre au hasard = ", chiffre);
  return chiffre;
};

const generateCarre = () => {
  const nb = nombreAuHasard();
  let carre = {}
  if (nb === 3) {
    carre.bombeOuPas = 1
    return carre
  }
  carre.bombeOuPas = 0
  return carre;
}

const generateLigne = () => {
  let ligne = [];
  for (let x = 0; x < 10; x++) {
    const carre = generateCarre()
    ligne.push(carre)
  }
  return ligne;
};

const generateGrille = () => {
  let grille = [];
  for (let x = 0; x < 10; x++) {
    const ligne = generateLigne()
    grille.push(ligne)
  }
  return grille;
};

const App = () => {
  const grille = generateGrille();
  return (
    <div
      style={{
        margin: 100,
        height: 250,
        width: 250,
        // backgroundColor: "black",
        padding: 5
      }}
    >
      {grille.map(ligne => {
        return (
          <Columns isPaddingless isMarginless key={ligne}>
            {ligne.map((carre, index) => (
              <Column isPaddingless isMarginless key={index}>
                <Carre carre={carre} grille={grille} />
              </Column>
            ))}
          </Columns>
        )
      }
      )
      }
    </div>
  );
}

const monPrenom = "Louis"

const Louis = {
  nom: "Poirier",
  prenom: monPrenom,
  age: 10,
  taille: 130
}

const carre = {
  bombeOuPas: 0,
  nbDeBombeAutourDeMoi: 2
}


export default App;
