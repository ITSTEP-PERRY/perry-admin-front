import {Flex} from "antd";
import NotFound from "../assets/images/not-found-404.png"
import Text from "antd/es/typography/Text";
import {Button} from "../Components/Buttons/Button.tsx";
import {colors} from "../theme/colors.ts";
import {header3} from "../theme/headerStyles.ts";
import {useNavigate} from "react-router";
export const NotFound404Page = () => {
    const navigate = useNavigate();
    return (
       <Flex vertical gap={20} style={{backgroundColor: colors.darkBlue, height: "100vh"}} align={"center"} justify={"center"}>
           <img src={NotFound} alt={"NotFound"} style={{width:"800px"}} />
           <Text style={{...header3, color: colors.objects}}>This page has gone fishing...</Text>
           <Button type={"primary"}
                   style={{padding: "22px 100px"}}
                   onClick={() => navigate("/")}
           >Return to main page</Button>
       </Flex>
    )
}