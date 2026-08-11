export type CategoryType = {
    id: string,
    name: string,
    slug: string,
    imageUrl?: string | null,
    sortOrder?: number,
    isActive?: boolean,
    parentCategoryId?: string | null,
    subCategories?: CategoryType[]
}