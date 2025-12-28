export type Lang = 'en' | 'pl';
export type Metadata = 'splashscreen' | 'main';

export type PageMetadata = {
    type: string;
    lang: string;
    title: string;
    description: string;
}

export type Category = {
    id: string;
    imgSrc: string;
    name: string;
}

export type Specification = {
    id: string;
    type: string;
    name: string;
}

export type ProductSpecification = Specification & {
    values: string[];
    units?: string[];
}

export type Product = {
    id: string;
    url: string;
    category: string;
    name: string;
    subname: string;
    specification: ProductSpecification[];
    imageUrl: string;
}

export type ProductImages = {
    productId: string;
    cdn: string;
    imageIds: string[];
}

export type Language = {
    code: Lang;
    name: string;
}