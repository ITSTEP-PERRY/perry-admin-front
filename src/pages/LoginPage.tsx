import {LoginForm} from "../forms/auth/LoginForm.tsx";
import {Flex} from "antd";

export const LoginPage = () => {
    return (
        <Flex vertical justify={"center"} align={"center"} style={{height: "100vh"}} >
            <LoginForm />
        </Flex>
    )
}