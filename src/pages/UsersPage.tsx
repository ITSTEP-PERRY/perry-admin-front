import type {UserData, UserFilterRequest, UserRole} from "../types/UserData.ts";
import {Avatar,Flex, Space, Table, type TableProps, Tag} from "antd";
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
import {useUsersQuery} from "../api/userApiSlice.ts";

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
            <Text style={text1}>{dateFormatter.format(new Date(record.registrationDate))}</Text>
        ),
        sorter: (a, b) => Number(
            new Date(a.registrationDate).valueOf() - new Date(b.registrationDate).valueOf() ),
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
    const [userFilter, setUserFilter] = useState<UserFilterRequest>();
    const {data, isFetching} = useUsersQuery(userFilter)
    const [selectedColumns, setSelectedColumns] = useState<SelectOptions[]>(columnsOptions)
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const allSelected = userFilter?.roles?.length === roleOptions?.length

    const rowSelection: TableProps<UserData>["rowSelection"] = {
        selectedRowKeys: selectedRowKeys,
        onChange: (rows: React.Key[]) => {
            setSelectedRowKeys(rows as string[])
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

    const handleSearch = (value: string) => {
        setUserFilter({...userFilter, searchTerm: value})
    }

    const handleAllSelect = () => {
        if( allSelected ){
            setUserFilter({...userFilter, roles: []})
        }
        else{
            const allValues: UserRole[] = roleOptions?.map((option) => option.value as UserRole) || [];
            setUserFilter({...userFilter, roles: allValues})
        }
    }

    const handleOnSelect = (opt : SelectOptions) => {

        setUserFilter({...userFilter, roles: [opt.value as UserRole]})

    }

    const handleSelectColumns = (opt: SelectOptions) => {

        let newColumns: SelectOptions[];
        if (selectedColumns.some(i => i.value === opt.value)){
            newColumns = selectedColumns.filter(i => i.value !== opt.value)
        }else{
            newColumns = [...selectedColumns, opt]
        }
        setSelectedColumns(newColumns)
    }

    const newColumns = columns.map(c => ({
        ...c,
        title: c.title ? c.title : selectedRowKeys.length > 0 ? <UsersOptions users={selectedRowKeys} /> : "",
        hidden: c.key ? false : !selectedColumns.find(i => i.value === c.title),
    }))

    return (
        <div style={usersPageStyles.root}>
            <Flex gap={16} align={"center"} justify={"space-between"} style={usersPageStyles.header}>
                <Text style={text2}>Role</Text>
                <MultipleSelect style={{ width: "13%" }}
                                options={roleOptions}
                                onSelect={handleOnSelect}
                                selectAll
                                onSelectAll={handleAllSelect}
                                values={userFilter?.roles ?? roleOptions.map(v => v.value) as string[]}
                                placeholder={"All"}
                />
                <BaseSearch style={{ width: "70%" }} value={userFilter?.searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}/>
                <MultipleSelect style={{ width: "12%" }}
                                position={"bottomRight"}
                                title={"Columns"}
                                options={columnsOptions}
                                values={selectedColumns.map(v => v.value) as string[]}
                                onSelect={handleSelectColumns}
                />
            </Flex>
            {data && data.length > 0 ?

                <Table columns={newColumns}
                    rowSelection={{type: "checkbox", ...rowSelection}}
                    dataSource={data}
                    styles={usersPageTableStyles}
                    pagination={{
                        placement: ["bottomCenter"],
                        defaultPageSize: 7,
                        pageSizeOptions: [7, 20, 50, 100],
                        onChange: () => {
                            console.log("paggination")
                            setSelectedRowKeys([])
                        }
                }}
                    rowKey={"userId"}
                   loading={isFetching}

            /> :
                <div style={{alignContent: "center", height: "80%"}}>
                    <ItemNotFound  text={"No users in the selected role"} />
                </div>
            }

        </div>
    )
}