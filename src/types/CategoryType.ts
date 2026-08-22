export type CategoryType = {
    id: string,
    name: string,
    description?: string,
    slug: string,
    imageUrl?: string | null,
    iconUrl?: string | null,
    sortOrder?: number,
    isActive?: boolean,
    parentCategoryId?: string | null,
    subCategories?: CategoryType[]
}