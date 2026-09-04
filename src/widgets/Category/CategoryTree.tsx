import {Button, Divider, Flex} from "antd";
import {dividerStyles} from "../../pages/css/categoryPageStyles.ts";
import type {CategoryType} from "../../types/CategoryType.ts";
import {
    categoryTreeStyles,
} from "./css/categoryTreeStyles.ts";
import {useState} from "react";
import {CategoryNode} from "./CategoryNode.tsx";
import {Checkbox} from "../../Components/Inputs/Checkbox.tsx";
import {CreateOrUpdateCategoryModal} from "./CreateOrUpdateCategoryModal.tsx";
import {useCategoryByIdQuery} from "../../api/categoryApiSlice.ts";
import {LoadingDiv} from "../../Components/General/LoadingDiv.tsx";
import {colors} from "../../theme/colors.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getCurrentCategory, setCurrentCategory} from "../../app/slices/categorySlice.ts";
import {text1} from "../../theme/textStyles.ts";
import Text from "antd/es/typography/Text";
import {DeleteModal} from "../../Components/Inputs/DeleteModal.tsx";

export type CategoryTreeProps = {
    categoryId: string;
}

export type CheckboxDataType = Record<string,{
    checked: boolean,
    indeterminate: boolean,
}>


export const CategoryTree = (props: CategoryTreeProps) => {
    const {data: categoryDetails, isLoading} = useCategoryByIdQuery(props.categoryId);
    const selectCategory = useAppSelector(getCurrentCategory)
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState<CheckboxDataType>({})

    const isAnyChecked = () => {
        for (const [_, values] of Object.entries(checked))
        {
            if (values.checked) return true
        }
        return false
    }

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
                if(!child.subCategories || child.subCategories.length === 0) {
                    return newState[child.id]?.checked
                }

                const allChild = child.subCategories?.map(c => updateParent(c))
                const all = allChild.every(r=>r)
                createOrUpdateCheckboxData(child.id, all)
                return all
            }



            const updateIndeterminate = (child: CategoryType): boolean => {
                if(!child.subCategories || child.subCategories.length === 0) {
                    return newState[child.id]?.checked
                }
                const someChild = child.subCategories?.map(c => updateIndeterminate(c))
                const some = someChild.some(r=>r)
                createOrUpdateCheckboxData(child.id, newState[child.id].checked, some)
                return some
            }

            updateChildren(node)
            if (categoryDetails) {
                updateParent(categoryDetails)
                updateIndeterminate(categoryDetails)
            }
            return newState
        })

    }


    return (
        <Flex vertical style={categoryTreeStyles.root}>
            <Divider style={dividerStyles} />
            { categoryDetails && <LoadingDiv isLoading={isLoading}>
                <Flex justify={"space-between"} align={"center"}
                      style={{...categoryTreeStyles.parentCategory,
                          backgroundColor: selectCategory.id === props.categoryId ? colors.lightBlue : ""
                            }}
                      onClick={() => dispatch(setCurrentCategory(categoryDetails))}
                >
                    <Checkbox
                        indeterminate={checked[categoryDetails.id]?.checked ? false : checked[categoryDetails.id]?.indeterminate}
                        checked={checked[categoryDetails.id]?.checked}
                        onChange={e => {
                            handleChange(e.target.checked, categoryDetails)
                        }}
                    >{categoryDetails.name}</Checkbox>
                    {isAnyChecked() ?
                        <DeleteModal style={{width: "fit-content"}} body={
                            <Text style={text1}>Removing the selected categories you will not be able to recover; products will be deactivated.</Text>
                        }>
                            <Button type={"text"} style={{padding: 0}} onClick={() => {}}>
                                <Text style={{...text1, color: colors.destructive}}>Delete</Text>
                            </Button>
                        </DeleteModal>
                        :
                        <CreateOrUpdateCategoryModal/>
                    }
                </Flex>
                <Divider style={dividerStyles}/>
                {categoryDetails.subCategories?.map(category => (
                    <CategoryNode key={category.id} data={category}
                                  checked={checked}
                                  onChange={handleChange}
                    />
                ))}
            </LoadingDiv>}
        </Flex>
    )
}