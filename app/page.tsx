'use client';
import {useState, useEffect} from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { TypographyH3 } from "@/src/components/ui/h3";

interface Mythologie {
  id: string;
  nom: string;
  Definition: string;
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
    const listeNomsRomains = data.map((dieu: { nomRomain: any; }) => dieu.nomRomain);
    const definitionMythologie = data.map((dieu: { Definition: any; }) => dieu.Definition);
    return definitionMythologie[randomIndex];
  }

  const tamerr = (document.getElementById("input") as HTMLInputElement)?.value;
  console.log(tamerr)
  
  return (
    <>
      <p>Qui est ? : {randomQuestion()}</p>
      <Input id="input" placeholder="Réponse" type="text"></Input>
    </>
  );
}