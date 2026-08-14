import FashionImage from "../../assets/images/Fashion.png"
import type {CategoryType} from "../../types/CategoryType.ts";

export const categoryDummyData: CategoryType = {
    imageUrl: FashionImage,
    id: "guid",
    name: "Fashion",
    description: "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    parentCategoryId: null,
    isActive: true,
    slug: "fashion"
}