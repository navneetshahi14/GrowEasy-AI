import { GoogleGenAI } from "@google/genai";
import { buildExtractionPrompt } from "../prompts/extractor.prompt.js";
import ENV from "../config/ENV.js";
import { extractJson } from "../utlis/extractJson.js";

const ai = new GoogleGenAI({
    apiKey: ENV.GEMINI_API_KEY! 
})

export async function extractCRMData(rows: unknown[]){
    const prompt = buildExtractionPrompt(rows)

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt
    })

    const text = response.text
    
    if (!text){
        throw new Error("Empty response from Gemini")
    }

    const cleaned = extractJson(text as string)


    try{

        return JSON.parse(cleaned)

    }catch(err){
        console.error("Gemini response:",cleaned)
        throw new Error("Invalid Json returned by Gemini")
    }
}