
export enum ArchitecturalStyleEnum {
    MidCenturyModern = 'Mid-century modern',
    Modern = 'Modern',
    Minimalist = 'Minimalist',
    Industrial = 'Industrial',
    Scandinavian = 'Scandinavian',
    Bohemian = 'Bohemian',
    Coastal = 'Coastal',
    Farmhouse = 'Farmhouse',
    Neoclassical = 'Neoclassical',
}

export type ArchitecturalStyle = ArchitecturalStyleEnum;

export interface ImageFile {
    base64: string;
    mimeType: string;
}
