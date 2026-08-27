import type {FormInstance} from "antd";

export const hasFieldError = (name: string, form: FormInstance) => {
    return form.getFieldError(name).length > 0
}