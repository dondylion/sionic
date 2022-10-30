type Product = {
    name: string;
    category_id: number;
    description: string;
    id: number;
}

type Images = {
    image_name: string;
    product_id: number;
    image_url: string;
}

type Variation = {
    product_id: number;
    prise: number;
    stock: number;
}

export declare type ProductsProps = {
    routerProps: RouterProps;
    key: string;
}

export declare type ProductsState = {
    products: Array<Product> | null;
    images: Array<Images> | null;
    variations: Array<Variation> | null;
    productsQuantity: number | null;
    imagesQuantity: number | null;
    variationsQuantity: number | null;
}
