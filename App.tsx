
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ImageViewer } from './components/ImageViewer';
import { generateVisualization } from './services/geminiService';
import type { ArchitecturalStyle, ImageFile } from './types';
import { ArchitecturalStyleEnum } from './types';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<ImageFile | null>(null);
    const [style, setStyle] = useState<ArchitecturalStyle>(ArchitecturalStyleEnum.MidCenturyModern);
    const [materials, setMaterials] = useState<string>('walnut floors, marble countertops');
    const [lighting, setLighting] = useState<string>('sunny afternoon');
    const [environment, setEnvironment] = useState<string>('view of a forest');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageFile({
                base64: reader.result as string,
                mimeType: file.type,
            });
            setGeneratedImage(null); // Clear previous generation
            setError(null);
        };
        reader.onerror = () => {
            setError("Failed to read the file.");
        };
        reader.readAsDataURL(file);
    };

    const handleGenerate = useCallback(async () => {
        if (!imageFile) {
            setError('Please upload an image first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        const prompt = `Render this architectural plan as a photorealistic image. Apply the following specifications: Style: ${style}, Materials: ${materials}, Lighting: ${lighting}, Environment: ${environment}.`;

        try {
            const result = await generateVisualization(imageFile, prompt);
            setGeneratedImage(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, style, materials, lighting, environment]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <ControlPanel
                            onImageUpload={handleImageUpload}
                            style={style}
                            onStyleChange={setStyle}
                            materials={materials}
                            onMaterialsChange={setMaterials}
                            lighting={lighting}
                            onLightingChange={setLighting}
                            environment={environment}
                            onEnvironmentChange={setEnvironment}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                            hasImage={!!imageFile}
                        />
                    </div>
                    <div className="lg:col-span-8">
                        <ImageViewer
                            uploadedImage={imageFile?.base64 || null}
                            generatedImage={generatedImage}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
