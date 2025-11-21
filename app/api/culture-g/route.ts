import { NextResponse } from 'next/server'
import { Client } from "@notionhq/client"

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function GET() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: "2b171c84-d568-8068-aec5-000b8e77de73",
    });

  //mapping
  const mesDonnees = response.results.map((page: any) => {
    const objetNettoye: any = {
      id: page.id,
    };
    const props = page.properties;
    Object.keys(props).forEach((nomDeLaColonne) => {
      const laPropriete = props[nomDeLaColonne];
      console.log(laPropriete);
      switch (laPropriete.type) {
        case "title":
          objetNettoye[nomDeLaColonne] = laPropriete.title?.[0]?.plain_text ?? "";
          break;
          
        case "rich_text":
          objetNettoye[nomDeLaColonne] = laPropriete.rich_text?.[0]?.plain_text ?? "";
          break;
          
        default:
          objetNettoye[nomDeLaColonne] = null;
      }
    });

    return objetNettoye;
  });
    return NextResponse.json({ data: mesDonnees });
    
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' }, 
      { status: 500 }
    );
  }
}