import { Form, Select } from "antd";

const ColorOption = () =>{
    return (
        <>
            <Form.Item label="Select" name="color">
                <Select>
                    <Select.Option value="Red">Red</Select.Option>
                    <Select.Option value="Orange">Orange</Select.Option>
                    <Select.Option value="Yellow">Yellow</Select.Option>
                    <Select.Option value="White">White</Select.Option>
                    <Select.Option value="Black">Black</Select.Option>
                    <Select.Option value="Grey">Grey</Select.Option>
                    <Select.Option value="Brown">Brown</Select.Option>
                </Select>
            </Form.Item>
        </>
    )

}

export default ColorOption;