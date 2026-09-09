import type {TableProps} from "antd";
import {type ComponentProps, type ReactElement, useState} from "react";
import {Checkbox} from "../../Components/Inputs/Checkbox.tsx";

type UseAntdTableRowSelectType<Type> = {
    selectedRowKeys: string[],
    setSelectedRowKeys: (selectedRowKeys: string[]) => void,
    rowSelection: TableProps<Type>["rowSelection"],
}

export function useAntdTableRowSelect<Type>(): UseAntdTableRowSelectType<Type> {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

    const rowSelection: TableProps<Type>["rowSelection"] = {
        selectedRowKeys: selectedRowKeys,
        onChange: (rows: React.Key[]) => {
            setSelectedRowKeys(rows as string[])
        },

        renderCell: (checked, _, index, originNode) => {
            const props = (originNode as ReactElement)?.props as ComponentProps<"input">
            return <Checkbox  checked={checked} key={index} onChange={props.onChange}/>
        },
        columnTitle: (originNode) => {
            const props = (originNode as ReactElement)?.props as ComponentProps<typeof Checkbox>

            return <Checkbox  checked={props.checked} onChange={props.onChange}
            indeterminate={props.indeterminate}/>
        },
        columnWidth: 60
    }

    return {selectedRowKeys, setSelectedRowKeys, rowSelection}
}