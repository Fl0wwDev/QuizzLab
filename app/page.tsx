import { Button } from "@/src/components/ui/button";

export default async function Home() {
  const posts = await fetch('http://localhost:3000/api/culture-g').then((res) => res.json());
  console.log(posts);
  return (
    <Button> salut</Button>
  );
}
