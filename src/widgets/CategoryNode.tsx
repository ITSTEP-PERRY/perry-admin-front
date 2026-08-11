import {Flex} from "antd";
import {Checkbox} from "../Components/Inputs/Checkbox.tsx";

import {ArrowUpIcon} from "../Components/Icon/ArrowUpIcon.tsx";
import {type CSSProperties, useState} from "react";
import {ArrowDownIcon} from "../Components/Icon/ArrowDownIcon.tsx";
import {type CheckboxDataType} from "./CategoryTree.tsx";
import type {CategoryType} from "../types/CategoryType.ts";
import {categoryNodeStyles, secondCategoryNodeStyles} from "./css/categoryTreeStyles.ts";

export type CategoryNodeProps = {
    data: CategoryType;
    style?: CSSProperties;
    onChange: (isChecked: boolean, node: CategoryType) => void;
    checked: CheckboxDataType;
}

export const CategoryNode = ({data, ...props}: CategoryNodeProps) => {
    const [open , setOpen] = useState(false);
    const isOpen = props.checked[data.id]?.checked || props.checked[data.id]?.indeterminate;

    return (
        <>
                <Flex  style={categoryNodeStyles}  key={data.id} vertical>
                <Flex justify="space-between">
                    <Checkbox
                           indeterminate={props.checked[data.id]?.checked ? false : props.checked[data.id]?.indeterminate}
                        onChange={(e) => {
                            props.onChange(e.target.checked, data)
                            setOpen(e.target.checked);
                        }}
                        checked={props.checked[data.id]?.checked}
                    >{data.name}</Checkbox>
                    {data.subCategories && data.subCategories?.length > 0 &&
                        <span onClick={() => setOpen(!open)}>
                        {open ? <ArrowDownIcon size={20}/> : <ArrowUpIcon size={20}/>}
                    </span>
                    }
                </Flex>

                {(isOpen || open) && data.subCategories?.map(category => (
                        <Flex key={category.id} style={secondCategoryNodeStyles} justify="space-between" vertical>
                            <CategoryNode data={category}
                                          checked={props.checked}
                                          onChange={props.onChange}
                            />
                        </Flex>
                    ))
                }
            </Flex>
        </>
    )
}