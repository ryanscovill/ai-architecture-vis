
import React from 'react';

const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 12h.01"/><path d="M12 12h.01"/><path d="M8 12h.01"/>
        <path d="M16 16h.01"/><path d="M12 16h.01"/><path d="M8 16h.01"/>
        <path d="M16 8h.01"/><path d="M12 8h.01"/><path d="M8 8h.01"/>
        <path d="M4 22h16"/><path d="M20 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/>
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <BuildingIcon className="h-8 w-8 text-primary-500"/>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Architectural Visualizer AI
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
};
