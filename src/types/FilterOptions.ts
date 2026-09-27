export interface FilterOptions<T> {
    page?: number;
    currentPage?: number;
    pageSize?: number;
    sort?: string;
    search?: string;
    categoryId?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    orderPropertyName?: keyof T;
    descendingOrder?: boolean;
    searchPropertyName?: keyof T;
    searchTerm?: string;
    filterObjects?: FilterObject<T>[];
    compareObjects?: CompareObject<T>[];
}

export interface FilterObject<T> {
    propertyName: keyof T;
    value: string;
}

export interface CompareObject<T> {
    propertyName: keyof T;
    moreValue?: string;
    lessValue?: string;
}

export interface PagedList<T>{
    page: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    options?: FilterOptions<T>;
    items: T[];
}