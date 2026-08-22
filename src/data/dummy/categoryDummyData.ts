import FashionImage from "../../assets/images/Fashion.png"
import type {CategoryType} from "../../types/CategoryType.ts";
import Hanger from "../../assets/icons/Hanger.svg"
import Bell from "../../assets/icons/bell.svg"
export const categoryDummyData: CategoryType = {
    imageUrl: FashionImage,
    id: "guid",
    name: "Fashion",
    description: "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    parentCategoryId: null,
    isActive: true,
    slug: "fashion",
    iconUrl: Hanger
}

export const subcategoryDummyData: CategoryType = {
    imageUrl: FashionImage,
    id: "subguid",
    name: "Fashion",
    description: "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    parentCategoryId: "guid",
    isActive: true,
    slug: "fashion",
    iconUrl:Bell
}