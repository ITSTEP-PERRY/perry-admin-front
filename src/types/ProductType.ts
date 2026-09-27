export type AttributeDefinitionsType = {
    id: string,
    code: "string",
    name: string,
    dataType: string | number | boolean,
    unit?: string
    isFilterable: boolean,
    isVariantLevel: boolean,
    sortOrder: number,
}

export type ProductVariantsType = {
    id: string,
    productId: string,
    sku: string
    barcode?:string,
    title?:string,
    price:number,
    oldPrice?:number,
    stockQuantity:number,
    isDefault: boolean,
    isActive: boolean,
    unitOfMeasure?:string,
    netContent?:number,
    netContentUnit?:string
}
export type ProductImageType = {
    id?: string,
    url?: string,
    isPrimary?: boolean,
    isVideo?: boolean,
    altText?: string,
}
export type ProductType = {
    id?: string,
    name?: string,
    description?: string,
    slug?: string,
    sku?: string,
    categoryId?: string,
    category?: {
        id?: string,
        name?: string,
        description?: string,
    }
    brandId?: string,
    status?: string,
    averageRating?: number,
    reviewCount?: number,
    isBestSeller?: boolean,
    createdAt?: string,
    updatedAt?: string,
    imageUrl?: string,
    images?: ProductImageType[],
    price?: number,
    oldPrice?: number,
    discountPercent?: number,
    // attributes? ?: AttributeDefinitionsType[],
    // variants? ?: ProductVariantsType[],
    attributes?: {
        name?: string,
        value?: string,
        isFilterable?: boolean,
    },
    aboutItems?: {
        title?: string,
        description?: string,
    }
}