import type {ProductType} from "../ProductType.ts";

export interface ResponseProductsDto {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    items: ProductType[]
}

export interface PopularProductsDto {
    take?: number;
    userId?: string
    items: ProductType[];
}