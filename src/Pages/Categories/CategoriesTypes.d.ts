import { RouterProps } from "../../utils/Router";

export declare type CategoryProps = {
    routerProps: RouterProps;
    key: string;
}

type Category = {
    id: number;
    name: string;
}

export declare type CategoryState = {
    loading: boolean;
    categories: Array<Category> | null;
}