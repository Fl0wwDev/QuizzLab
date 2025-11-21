'use client';
import {useState, useEffect} from "react";
import { Button } from "@/src/components/ui/button";
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
    const correctOption = options.find(option => option.id === correctId);
    return correctOption ? correctOption.nomRomain : "Réponse inconnue";
  }
  return (
    <p>{findCorrectAnswer(data, "2b171c84-d568-80e2-ae63-e9f62fcc82c8")}</p>
  );
}
