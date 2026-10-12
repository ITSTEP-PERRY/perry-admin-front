import type {PagedList} from "../FilterOptions.ts";
import type {ProductReview} from "../ProductReview.ts";
import type {StatisticType} from "../StatisticType.ts";

export interface ProductReviewDto {
    pagedList: PagedList<ProductReview>;
    statistic: {
        totalReviews: number;
        totalComments: number;
        statistics: StatisticType<number>[]
    }
}

export interface PostProductReviewDto {
    productId: string;
    rating: number;
    authorName?: string;
    title?: string;
    body?: string;
    images?: string[],
    tags?: string[],
}