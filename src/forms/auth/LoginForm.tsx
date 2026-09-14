import {Flex, Form} from "antd";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {PasswordInput} from "../../Components/Inputs/PasswordInput.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import {useState} from "react";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../../theme/headerStyles.ts";
import type {LoginRequestDto} from "../../types/dto/LoginRequestDto.ts";
import {useLoginMutation} from "../../api/authApiSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {setUser} from "../../app/slices/userSlice.ts";
import type {LoginResponseDto} from "../../types/dto/LoginResponseDto.ts";
import {useNavigate} from "react-router";

export const LoginForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [login, {isLoading}] = useLoginMutation()
    const navigate = useNavigate();
    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        email: false,
        password: false,
        remember: false,
    });
    const onFinishFailed = () => {
        const er = form.getFieldsError();
        setHasErrors({...er.hasErrorsOf()})
    }

    const onFinish = async (data: LoginRequestDto) => {
        const result = await login(data)
        if (result.data) {
            dispatch(setUser(result.data as LoginResponseDto))
            navigate("/")
        }
    }

    return (
        <Form styles={loginFormStyles} onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title style={header1}>Welcome to admin panel</Title>
                    <Title style={header3}>Login into your account</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"} gap={8}>
                    <Form.Item  name="email" rules={[{required: true, type: "email", message: "Wrong or invalid email address"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="Email" placeholder="Enter your email" styles={hasErrors["email"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                    <Form.Item name="password" style={loginFormItemStyles} rules={[{required: true, message: "Incorrect password"}]} validateTrigger={"onSubmit"}>
                        <PasswordInput prefix="Password" placeholder="Enter your password" styles={hasErrors["password"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                </Flex>
                <Button loading={isLoading} type="primary" htmlType="submit" style={{width: '100%', height: '52px'}}>
                    Log in
                </Button>
            </Flex>
        </Form>
    )
}