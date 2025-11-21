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

    //maping
    const mesDonnees = response.results.map((page: any) => ({
      nom: page.properties["Nom"]?.title?.[0]?.plain_text ?? "",
      definition: page.properties["Definition"]?.rich_text?.[0]?.plain_text ?? ""
    }));

    return NextResponse.json({ data: mesDonnees });
    
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' }, 
      { status: 500 }
    );
  }
}