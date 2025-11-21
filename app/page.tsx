'use client';
import {useState, useEffect} from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { TypographyH3 } from "@/src/components/ui/h3";

interface Mythologie {
  id: string;
  nom: string;
  definition: string;
  nomRomain: string;
}

export default function Home() {
  const [data, setData] = useState<Mythologie[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
      const response = await fetch('/api/culture-g');
      const json = await response.json();
      setData(json.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
    fetchData();
  }, []);

  function findCorrectAnswer(options: Mythologie[], correctId: string): string {
    if (options.find(option => option.id === correctId)) {
      return "option trouvée";
    } else {  
      return "Réponse inconnue";
    }
  }

  function randomQuestion() {
    if (data.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * data.length);
    console.log(data[randomIndex]); 
    return data[randomIndex];
  }

  
  return (
    <>
      <p>{randomQuestion()?.definition}</p>
      <TypographyH3>{randomQuestion()?.nom}</TypographyH3>
      <Input placeholder="Réponse"></Input>
    </>
  );

}
