import type {SelectOptions} from "../../types/SelectOptions.ts";
import type {CategoryType} from "../../types/CategoryType.ts";

export const searchCategoryToSelectOptions = (id: string | undefined,categories : CategoryType[] | undefined): SelectOptions | undefined => {
    if(!id || !categories) return;
    for (const cat of categories) {
        if (id === cat.id) {
            return {
                value: cat.id,
                label: cat.name,
            }
        }
        if(cat.subCategories) {
            const result = searchCategoryToSelectOptions(id, cat.subCategories)
            if(result) return result
        }
    }
}

export const findCategoryByCategoryId = (id: string | undefined, categories : CategoryType[] | undefined) => {
    if(!id || !categories) return;
    for (const cat of categories) {
        if (id === cat.id) {
            return cat
        }
        if(cat.subCategories) {
            const result = searchCategoryToSelectOptions(id, cat.subCategories)
            if(result) return result
        }
    }
}