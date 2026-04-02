import {Routes, Route} from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EnterList from "./pages/EnterList";
import Results from "./pages/Results";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { generateSecretSantaPairs } from "./utils/SecretSanta";

import type { Participant, Pair } from "./types/participants";


export default function App() {
  const navigate = useNavigate();
  const [data, setData] = useState<Participant []>(() => {
    const stored = localStorage.getItem("participants");
    return stored ? JSON.parse(stored) as Participant[] : [];
  });
  const [pairs, setPairs] = useState<Pair[]>(() => {
    const stored = localStorage.getItem("pairs");
    return stored
  ? (JSON.parse(stored) as Participant[]).filter(
      (p): p is Participant => typeof p?.name === "string"
    )
  : [];
  })

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("pairs", JSON.stringify(pairs));
  }, [pairs])

  const handleGenerate = (): void => {
    try {
      const pairs: Pair[] = generateSecretSantaPairs(data);
      setPairs(pairs);
      navigate("/results")
    } catch (error) {
      alert(error instanceof Error? error.message : "something went wrong");
    }
  }

  return(
    <>
    <Header />
      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enter-list"
         element={
         <EnterList
          data={data}
          setData={setData} 
          handleGenerate={handleGenerate}
          />
        }
        />
        <Route path="/results" element={<Results pairs={pairs}/>}/>
      </Routes>
      </main>
      <Footer />
    </>
  );
}