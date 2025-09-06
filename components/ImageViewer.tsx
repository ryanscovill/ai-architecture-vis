
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageViewerProps {
    uploadedImage: string | null;
    generatedImage: string | null;
    isLoading: boolean;
    error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-10 rounded-lg">
        <svg className="animate-spin h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold text-white">Generating your visualization...</p>
        <p className="text-sm text-gray-300 mt-1">This may take a moment.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <UploadIcon className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-500" />
        <h3 className="text-xl font-semibold">Upload a Plan</h3>
        <p className="mt-2 text-center max-w-sm">Your uploaded plan and generated visualization will appear here.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-red-500 dark:text-red-400 p-4">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="text-xl font-semibold">An Error Occurred</h3>
        <p className="mt-2 text-center max-w-md">{message}</p>
    </div>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ uploadedImage, generatedImage, isLoading, error }) => {
    const displayImage = generatedImage || uploadedImage;

    return (
        <div className="bg-gray-200 dark:bg-gray-900/50 rounded-lg shadow-inner w-full aspect-square relative flex items-center justify-center p-4">
            {isLoading && <LoadingSpinner />}
            {error && !isLoading && <ErrorDisplay message={error} />}
            {!displayImage && !isLoading && !error && <Placeholder />}
            {displayImage && !error && (
                 <div className="relative w-full h-full">
                    <img
                        src={displayImage}
                        alt={generatedImage ? "Generated Visualization" : "Uploaded Plan"}
                        className="object-contain w-full h-full rounded-md"
                    />
                     <span className={`absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full ${generatedImage ? 'bg-primary-600' : 'bg-gray-600'}`}>
                        {generatedImage ? "Generated Visualization" : "Uploaded Plan"}
                    </span>
                 </div>
            )}
        </div>
    );
};
