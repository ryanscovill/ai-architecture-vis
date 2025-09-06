
import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageFile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateVisualization(image: ImageFile, prompt: string): Promise<string> {
    const base64Data = image.base64.split(',')[1];
    
    if (!base64Data) {
        throw new Error("Invalid image file format. Could not extract Base64 data.");
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: image.mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart?.inlineData) {
             return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
        } else {
            // Check for text response which might contain an error or explanation
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            if (textPart?.text) {
                throw new Error(`API returned text instead of an image: ${textPart.text}`);
            }
            throw new Error('No image was generated. The model may not have been able to process the request.');
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate image. Please check your prompt and uploaded file.");
    }
}
