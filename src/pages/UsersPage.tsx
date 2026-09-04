import type {UserData} from "../types/UserData.ts";
import {Avatar,Flex, Space, Table, type TableProps, Tag} from "antd";
import {usersDummyData} from "../data/dummy/usersDummyData.ts";
import Text from "antd/es/typography/Text";
import {text1, text2} from "../theme/textStyles.ts";
import {colors} from "../theme/colors.ts";
import { usersPageStyles, usersPageTableStyles} from "./css/usersPageStyles.ts";
import {UserOptions} from "../Components/Navigation/UserOptions.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {Checkbox} from "../Components/Inputs/Checkbox.tsx";
import {type ComponentProps, type ReactElement, useState} from "react";
import {MultipleSelect} from "../Components/Select/MultipleSelect.tsx";
import type {SelectOptions} from "../types/SelectOptions.ts";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import {UsersOptions} from "../Components/Navigation/UsersOptions.tsx";
import {dateFormatter} from "../shared/formatter.ts";
import {ArrowsUpDownIcon} from "../Components/Icon/ArrowsUpDownIcon.tsx";

const roleOptions: SelectOptions[] = [
    {label: "Administrator", value: "Administrator"},
    {label: "Customer", value: "Customer"},
]

const columns : TableProps<UserData>["columns"] = [
    {
        title: "User",
        dataIndex: "fullName",
        key: "user",
        render: (_, record: UserData) => (
            <Space>
                <Avatar src={record.avatar} size={50} />
                <Flex vertical justify="center">
                    <Text style={{...text1, lineHeight: "24px"}}>{record.fullName}</Text>
                    <Text style={{...text2, lineHeight: "16px"}}>{record.role}</Text>
                </Flex>
            </Space>
        )
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (_, record: UserData) => (
            <Tag color={ record.status ? colors.blue : colors.lightRed } style={usersPageStyles.statusTag}>
                <Text style={text1}>{record.status ? "Active": "Deleted"}</Text>
            </Tag>
        )
    },
    {
        title: "Registration date",
        dataIndex: "registrationDate",
        render: (_, record: UserData) => (
            <Text style={text1}>{dateFormatter.format(record.registrationDate)}</Text>
        ),
        sorter: (a, b) => Number(a.registrationDate.valueOf() - b.registrationDate.valueOf()),
        sortIcon: () =>
        <div style={{padding: "5px 0 0 5px"}}>
            <ArrowsUpDownIcon size={24}/>
        </div>,
        showSorterTooltip: false
    },
    {
        title: "Email",
        dataIndex: "email",
        render: (_, record: UserData) => (
            <Text style={text1}>{record.email}</Text>
        ),

    },
    {
        title: "",
        key: "action",
        width: 10,
        render: (_, record: UserData) => (
            <UserOptions record={record}/>
        ),

    }
]

const columnsOptions = columns.filter(c => c.title && c.key != "user")
    .map(c => ({
    value: c.title as string,
    label: c.title as string,
}))
export const UsersPage = () => {
    const [rolesSelect, setRolesSelect] = useState<SelectOptions[]>(roleOptions ?? []);
    const [selectedColumns, setSelectedColumns] = useState<SelectOptions[]>(columnsOptions)
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [data, setData] = useState<UserData[]>(usersDummyData);
    const allSelected = rolesSelect.length === roleOptions?.length

    const rowSelection: TableProps<UserData>["rowSelection"] = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeys as string[])
        },
        getCheckboxProps: (record: UserData) => ({
            disabled: record.fullName === 'Disabled User', // Column configuration not to be checked
            name: record.userId,

        }),
        renderCell: (checked, _, index, originNode) => {
            const props = (originNode as ReactElement)?.props as ComponentProps<"input">
            return <Checkbox checked={checked} key={index} onChange={props.onChange}/>
        },
        columnTitle: (originNode) => {
            const props = (originNode as ReactElement)?.props as ComponentProps<typeof Checkbox>

            return <Checkbox checked={props.checked} onChange={props.onChange}
                      indeterminate={props.indeterminate}/>
        }

    }

    const handleAllSelect = () => {
        if( allSelected ){
            setRolesSelect([])
            setData([])
        }
        else{
            const allValues = roleOptions?.map((option) => option) || [];
            setRolesSelect(allValues);
            setData(usersDummyData)
        }
    }

    const handleOnSelect = (opt : SelectOptions) => {

        setData(usersDummyData.filter(u => u.role === opt.value))
        setRolesSelect([opt])
    }

    const handleSelectColumns = (opt: SelectOptions) => {

        let newColumns: SelectOptions[];
        if (selectedColumns.some(i => i.value === opt.value)){
            newColumns = selectedColumns.filter(i => i.value !== opt.value)
        }else{
            newColumns = [...selectedColumns, opt]
        }
        console.log(newColumns);

        setSelectedColumns(newColumns)
    }

    const handleSearch = (value: string) => {
        console.log(value)
    }

    const newColumns = columns.map(c => ({
        ...c,
        title: c.title ? c.title : selectedRowKeys.length > 0 ? <UsersOptions /> : "",
        hidden: c.key ? false : !selectedColumns.find(i => i.value === c.title),
    }))

    return (
        <div style={usersPageStyles.root}>
            <Flex gap={16} align={"center"} justify={"space-between"} style={usersPageStyles.header}>
                <Text style={text2}>Role</Text>
                <MultipleSelect style={{ width: "13%" }}
                                options={roleOptions}
                                onSelect={handleOnSelect}
                                selectAll onSelectAll={handleAllSelect}
                                values={rolesSelect}
                                placeholder={"All"}
                />
                <BaseSearch style={{ width: "70%" }} onChange={(e) => handleSearch(e.target.value)}/>
                <MultipleSelect style={{ width: "12%" }}
                                position={"bottomRight"}
                                title={"Columns"}
                                options={columnsOptions}
                                values={selectedColumns}
                                onSelect={handleSelectColumns}
                />
            </Flex>
            {data.length > 0 ?

                <Table columns={newColumns}
                    rowSelection={{type: "checkbox", ...rowSelection}}
                    dataSource={data}
                    styles={usersPageTableStyles}
                    pagination={{placement: ["bottomCenter"], pageSize: 10}}
                    rowKey={"userId"}


            /> :
                <div style={{alignContent: "center", height: "80%"}}>
                    <ItemNotFound  text={"No users in the selected role"} />
                </div>
            }

        </div>
    )
}