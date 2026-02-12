import {Routes, Route} from "react-router-dom";
import "./App.css";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import EnterList from "./pages/EnterList";
import Results from "./pages/Results";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SlideShow from "./components/SlideShow";


export default function App() {
  const [data, setData] = useState([]);
  const [pairs, setPairs] = useState([]);

  const shuffled = (arr) => {
    const array = [...arr];
    if (array.length < 2) return array;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const generateSecretSanta = () => {
    if (data.length < 2) {
      alert("Atlest 2 people required");
      return;
    }
    const shuffledArray = shuffled(data);

    const generatedPairs = shuffledArray.map((person, index) => {
      const receiver = shuffledArray[(index + 1) % shuffledArray.length];

      return {giver: person, receiver};
    })
    setPairs(generatedPairs);
  }
  return(
    <>
    <Header />
      <main>
        <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/enter-list" element={<EnterList data={data} setData={setData} generateSecretSanta={generateSecretSanta}/>}/>
        <Route path="/results" element={<Results pairs={pairs}/>}/>
      </Routes>
      </main>
      <Footer />
    </>
  );
}