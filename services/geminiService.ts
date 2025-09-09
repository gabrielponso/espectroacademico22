import { GoogleGenAI } from "@google/genai";
// FIX: Import the Source type
import type { Study, Source } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Update function to return both studies and sources
export async function fetchAutismStudies(topic: string): Promise<{ studies: Study[], sources: Source[] }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Encontre os estudos acadêmicos e notícias científicas mais recentes sobre "${topic}" relacionado ao autismo, priorizando fontes de universidades renomadas como USP, UNESP, UNICAMP, Harvard, Oxford, Stanford, e outras instituições de pesquisa de ponta. Para cada estudo, forneça um título, um resumo conciso em Português do Brasil e o link (URI) da fonte original. Formate TODA a sua saída como um único array JSON de objetos, onde cada objeto tem as chaves "title", "summary" e "uri". A chave 'uri' deve conter o URL completo para o artigo original. Não adicione nenhum texto ou formatação fora do array JSON.`,
      config: {
        systemInstruction: "Você é um assistente de pesquisa especializado em Transtorno do Espectro Autista (TEA). Sua tarefa é encontrar e resumir estudos acadêmicos e notícias científicas recentes e confiáveis, baseando-se nos resultados da busca. Sua resposta DEVE ser apenas o JSON solicitado.",
        tools: [{ googleSearch: {} }],
      },
    });
    
    let jsonText = response.text.trim();
    
    // Clean potential markdown formatting from the response
    if (jsonText.startsWith('```json')) {
        jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    let studies: Study[] = [];
    if (jsonText) {
      try {
        const parsedData = JSON.parse(jsonText);
        // Ensure the parsed data is an array and filter out items without a valid URI
        if (Array.isArray(parsedData)) {
            studies = parsedData.filter(item => item && typeof item.uri === 'string' && item.uri.startsWith('http'));
        } else {
            console.warn("Parsed data is not an array:", parsedData);
        }
      } catch (e) {
        console.error("Failed to parse JSON response:", jsonText, e);
        throw new Error("Não foi possível processar a resposta da busca. O formato retornado é inválido.");
      }
    }
    
    // FIX: Extract sources from grounding metadata as required when using googleSearch tool
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: Source) => source.uri && source.title);

    return { studies, sources };
  } catch (error) {
    console.error("Error fetching studies from Gemini API:", error);
    if (error instanceof Error && error.message.includes("processar a resposta")) {
        throw error;
    }
    throw new Error("Não foi possível buscar os estudos. Verifique o tópico pesquisado e tente novamente.");
  }
}