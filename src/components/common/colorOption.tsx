import { Form, Select } from "antd";

const ColorOption = (props:any) =>{
    return (
        <>
           
                <Select style={{width:100}} onChange={props.handleChangeColor}>
                    <Select.Option value="Red">Red</Select.Option>
                    <Select.Option value="Orange">Orange</Select.Option>
                    <Select.Option value="Yellow">Yellow</Select.Option>
                    <Select.Option value="White">White</Select.Option>
                    <Select.Option value="Black">Black</Select.Option>
                    <Select.Option value="Grey">Grey</Select.Option>
                    <Select.Option value="Brown">Brown</Select.Option>
                </Select>
           
        </>
    )

}

export default ColorOption;