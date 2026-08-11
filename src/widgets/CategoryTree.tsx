import {Divider, Flex} from "antd";
import {dividerStyles} from "../pages/css/categoryPageStyles.ts";
import type {CategoryType} from "../types/CategoryType.ts";
import {
    categorySelectedStyles,
    categoryTreeStyles,
} from "./css/categoryTreeStyles.ts";
import {useState} from "react";
import {CategoryNode} from "./CategoryNode.tsx";
import {Checkbox} from "../Components/Inputs/Checkbox.tsx";

export type CategoryTreeProps = {
    categoryId: string;
}

const mainCategoryData: CategoryType = {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    isActive: true,
    sortOrder: 1,
    parentCategoryId: null,
    subCategories: [
        {
            id: "electronics",
            name: "Electronics",
            slug: "electronics",
            imageUrl: null,
            subCategories: [
                {
                    id: "streaming-devices",
                    name: "Streaming devices",
                    slug: "streaming-devices",
                    imageUrl: null,
                    subCategories: [
                        { id: "microphone", name: "Microphone", slug: "microphone", imageUrl: null },
                        { id: "microphone1", name: "Microphone1", slug: "microphone1", imageUrl: null }
                    ]
                },
                { id: "pcs-accessories", name: "PCs & Accessories", slug: "pcs-accessories", imageUrl: null }
            ]
        },
        {
            id: "close-fashion",
            name: "Close Fashion",
            slug: "close-fashion",
            imageUrl: null,
            subCategories: [
                { id: "womens-fashion",
                    name: "Women's fashion",
                    slug: "womens-fashion",
                    imageUrl: null,
                    subCategories: [
                        { id: "skirt", name: "Skirt", slug: "skirt", imageUrl: null },
                        { id: "shoes", name: "Shoes", slug: "shoes", imageUrl: null }
                    ]
                }
            ]
        }
    ]
}

export type CheckboxDataType = Record<string,{
    checked: boolean,
    indeterminate: boolean,
}>


export const CategoryTree = (props: CategoryTreeProps) => {
    const categoryDetails = {...mainCategoryData};
    const [selectedCategory, setSelectedCategory] = useState({
        styles: categoryTreeStyles.parentCategory,
        selected: "",
    })

    const [checked, setChecked] = useState<CheckboxDataType>({})
    const handleChange = (isChecked: boolean, node: CategoryType) => {
        setChecked(prev => {
            const newState: CheckboxDataType = { ...prev, [node.id]: {
                    checked: isChecked,
                    indeterminate: prev[node.id]?.indeterminate,
                }}

            const createOrUpdateCheckboxData = (id:string, checked: boolean, indeterminate = false) => {
                if(newState[id]){
                    newState[id].checked = checked
                    newState[id].indeterminate = indeterminate
                }else{
                    newState[id] = {
                        checked,
                        indeterminate
                    }
                }
            }

            const updateChildren = (child: CategoryType) => {
                child.subCategories?.forEach(c => {
                    createOrUpdateCheckboxData(c.id, isChecked)
                    if(c.subCategories) updateChildren(c)
                })
            }
            const updateParent = (child: CategoryType): boolean => {
                if(!child.subCategories) {
                    return newState[child.id]?.checked
                }

                const allChild = child.subCategories?.map(c => updateParent(c))
                const all = allChild.every(r=>r)
                createOrUpdateCheckboxData(child.id, all)
                return all
            }



            const updateIndeterminate = (child: CategoryType): boolean => {
                if(!child.subCategories) {
                    return newState[child.id]?.checked
                }
                const someChild = child.subCategories?.map(c => updateIndeterminate(c))
                const some = someChild.some(r=>r)
                createOrUpdateCheckboxData(child.id, newState[child.id].checked, some)
                return some
            }

            updateChildren(node)
            updateParent(mainCategoryData)
            updateIndeterminate(mainCategoryData)
            console.log(newState)
            return newState
        })

    }


    return (
        <Flex vertical style={categoryTreeStyles.root}>
            <Divider style={dividerStyles} />
            <Flex style={selectedCategory.styles}
                  onClick={() => {
                      setSelectedCategory({
                          ...selectedCategory,
                          styles: selectedCategory.selected ? categorySelectedStyles : categoryTreeStyles.parentCategory,
                          selected: categoryDetails.id
                      })

                  }}
            >
                <Checkbox indeterminate={checked[categoryDetails.id]?.checked ? false : checked[categoryDetails.id]?.indeterminate}
                    checked={checked[categoryDetails.id]?.checked}
                          onChange={e => {
                              setSelectedCategory({...selectedCategory, checked: e.target.checked})
                            handleChange(e.target.checked, categoryDetails)
                        }}
                >{categoryDetails.name}</Checkbox>
            </Flex>
            <Divider style={dividerStyles} />
            {categoryDetails.subCategories?.map(category => (
                <CategoryNode key={category.id} data={category}
                              checked={checked}
                              onChange={handleChange}
                />
            ))}

        </Flex>
    )
}