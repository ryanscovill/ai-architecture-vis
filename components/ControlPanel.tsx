
import React, { useCallback, useRef } from 'react';
import type { ArchitecturalStyle } from '../types';
import { ArchitecturalStyleEnum } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface ControlPanelProps {
    onImageUpload: (file: File) => void;
    style: ArchitecturalStyle;
    onStyleChange: (style: ArchitecturalStyle) => void;
    materials: string;
    onMaterialsChange: (value: string) => void;
    lighting: string;
    onLightingChange: (value: string) => void;
    environment: string;
    onEnvironmentChange: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    hasImage: boolean;
}

const InputField: React.FC<{ id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = ({ id, label, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
    </div>
);

const SelectField: React.FC<{ id: string; label: string; value: ArchitecturalStyle; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: typeof ArchitecturalStyleEnum }> = ({ id, label, value, onChange, options }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
            {Object.values(options).map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({
    onImageUpload, style, onStyleChange, materials, onMaterialsChange,
    lighting, onLightingChange, environment, onEnvironmentChange,
    onGenerate, isLoading, hasImage
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };
    
    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    }, [onImageUpload]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <div className="space-y-2">
                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">1. Upload Plan</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Upload a 2D floor plan or basic 3D model.</p>
            </div>
            
            <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                <div className="flex flex-col items-center justify-center space-y-2 text-gray-500 dark:text-gray-400">
                    <UploadIcon className="w-12 h-12" />
                    <p className="font-semibold">Click to upload or drag & drop</p>
                    <p className="text-xs">PNG, JPG, or WEBP</p>
                </div>
            </div>

            <div className="space-y-2">
                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">2. Specify Details</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Describe the desired look and feel.</p>
            </div>
            
            <div className="space-y-4">
                <SelectField
                    id="style"
                    label="Architectural Style"
                    value={style}
                    onChange={(e) => onStyleChange(e.target.value as ArchitecturalStyle)}
                    options={ArchitecturalStyleEnum}
                />
                <InputField
                    id="materials"
                    label="Materials"
                    value={materials}
                    onChange={(e) => onMaterialsChange(e.target.value)}
                    placeholder="e.g., exposed brick, polished concrete"
                />
                <InputField
                    id="lighting"
                    label="Lighting"
                    value={lighting}
                    onChange={(e) => onLightingChange(e.target.value)}
                    placeholder="e.g., golden hour, soft morning light"
                />
                <InputField
                    id="environment"
                    label="Environment / View"
                    value={environment}
                    onChange={(e) => onEnvironmentChange(e.target.value)}
                    placeholder="e.g., bustling city street, serene lake"
                />
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !hasImage}
                className="w-full flex items-center justify-center bg-primary-600 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : 'Generate Visualization'}
            </button>
            {!hasImage && <p className="text-xs text-center text-yellow-600 dark:text-yellow-400">Please upload an image to enable generation.</p>}
        </div>
    );
};
