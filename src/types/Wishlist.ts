export interface WishListStats {
    year: number,
    total: number,
    byMonth: WishListStatsByMonth[]
}
export interface WishListStatsByMonth {
    year: number,
    month: number
    monthName: string,
    label: string,
    count: number

}
export interface WishListByProductStats {
    productId: string,
    wishlistUserCount: number,
    totalAdds: number,
    firstAddedAtUtc: string,
    lastAddedAtUtc: string,
    byMonth: WishListStatsByMonth[]
}

export interface WishListSummaryStats {
    take: number,
    items: WishListByProductStats & {
        name: string,
        brand: string,
        slug: string,
        imageUrl: string,
    }[]
}