export interface ProductReview {
    id: string;
    productId: string;
    userId: string;
    authorName: string;
    rating: number;
    title: string;
    body: string;
    isApproved: boolean;
    createdAtUtc: string;
    totalHelpful: number;
    totalReported: number;
    images: ProductReviewImage[];
    tags: ProductReviewTags[];
}

export interface ProductReviewImage{
    id: string;
    reviewId: string;
    url: string;
}

export interface ProductReviewTags {
    id: string;
    reviewId: string;
    name: string;
}

export interface ProductReviewGrade {
    id: string;
    reviewId: string;
    userId: string;
    isHelpful: boolean;
    reported: boolean
}
