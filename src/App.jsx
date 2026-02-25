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

export default function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("participants");
    return stored ? JSON.parse(stored) : [];
  });
  const [pairs, setPairs] = useState(() => {
    const stored = localStorage.getItem("pairs");
    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("pairs", JSON.stringify(pairs));
  }, [pairs])

  const handleGenerate = () => {
    try {
      const pairs = generateSecretSantaPairs(data);
      setPairs(pairs);
      navigate("/results")
    } catch (error) {
      alert(error.message)
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