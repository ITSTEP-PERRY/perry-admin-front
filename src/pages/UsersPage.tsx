import type {UserData} from "../types/UserData.ts";
import {Avatar,Flex, Space, Table, type TableProps, Tag} from "antd";
import {usersDummyData} from "../data/dummy/usersDummyData.ts";
import Text from "antd/es/typography/Text";
import {text1, text2} from "../theme/textStyles.ts";
import {colors} from "../theme/colors.ts";
import {userPageSelectStyles, usersPageStyles, usersPageTableStyles} from "./css/usersPageStyles.ts";
import {UserOptions} from "../Components/Navigation/UserOptions.tsx";
import {Select} from "../Components/Select/Select.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {Checkbox} from "../Components/Inputs/Checkbox.tsx";
import {type ComponentProps, type ReactElement, type ReactNode, useEffect, useState} from "react";
import {MultipleSelect} from "../Components/Select/MultipleSelect.tsx";
import type {SelectOptions} from "../types/selectOptions.ts";

const roleOptions: SelectOptions[] = [
    {label: "Administrator", value: "Administrator"},
    {label: "Customer", value: "Customer"},
]

export const UsersPage = () => {
    const [rolesSelect, setRolesSelect] = useState<SelectOptions[]>(roleOptions ?? []);
    const columns : TableProps<UserData>["columns"] = [
        {
            title: "User",
            dataIndex: "fullName",
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
                <Text style={text1}>{record.registrationDate.toLocaleDateString()}</Text>
            )
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
            render: (_, record: UserData) => (
                <UserOptions record={record}/>
            ),

        }
    ]
    const [data, setData] = useState<UserData[]>(usersDummyData);
    const allSelected = rolesSelect.length === roleOptions?.length


    const rowSelection: TableProps<UserData>["rowSelection"] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: UserData[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        const existed = rolesSelect.find((v) => opt.value === v.value);
        let newRoleSelected;
        if (existed) {
            newRoleSelected = rolesSelect.filter((v) => v.value !== opt.value)
            setData(usersDummyData.filter(u => u.role !== opt.value))
        }else{
            newRoleSelected = [...rolesSelect, opt];

            setData(usersDummyData.filter(u => u.role === opt.value))
        }

        if(newRoleSelected.length === roleOptions.length) {
            handleAllSelect()
            return;
        }
        if(newRoleSelected.length === 0) {
            setData([])
        }
        setRolesSelect(newRoleSelected);
    }

    useEffect(() => {
        console.log(rolesSelect)
    }, [rolesSelect])

    return (
        <div style={usersPageStyles.root}>
            <Flex gap={16} align={"center"} justify={"space-between"} style={usersPageStyles.header}>
                <Text style={text2}>Role</Text>
                <MultipleSelect style={{ width: "13%" }} options={roleOptions}
                    onSelect={handleOnSelect} onSelectAll={handleAllSelect}
                                values={roleOptions}
                />
                <BaseSearch style={{ width: "70%" }}/>
                <Select style={{ width: "12%" }}/>
            </Flex>
            <Table columns={columns}
                   rowSelection={{type: "checkbox", ...rowSelection}}
                   dataSource={data}
                   styles={usersPageTableStyles}
                   pagination={{placement: ["bottomCenter"], pageSize: 10 }}
                   rowKey={"userId"}
            />

        </div>
    )
}