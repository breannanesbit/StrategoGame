import { FC, useEffect, useState } from "react";

export interface GenericSelect {
    id: string;
    name: string;
    value: string;
    label: string;
    isValid: boolean,
    validationText: string,
    option: string[];
    onChange: (value: string) => void;
}

export const useCustomSelectControl = ({
    label,
    validatemessage,
    initialValue = "",
    options,
}: {
    label:string,
    validatemessage: string,
    initialValue?: string,
    options: any[]

}): GenericSelect => {
    const id = Date.now().toString();
    const [value, setValue] = useState("");

   
    
  useEffect(() => {
    if(initialValue)
    {
      setValue(initialValue)
    }
  }, [initialValue])

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const stringOptions = options.map((option) => String(option));

 const output: GenericSelect ={
    id,
    name: label +id,
    value,
    label,
    isValid: !!value,
    validationText: value ? validatemessage : "",
    option: stringOptions,
    onChange
 }
 return output;
}

export const GenericSelectInput: FC<{
    control: GenericSelect;
  }> = ({ control }) => {
      const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newValue = e.target.value;
          control.onChange(newValue);
        };
  
    return (
      <div>
        <label htmlFor={control.name} className="form-label">
          {control.label}
        </label>
        <select
          name={control.name}
          className={"form-control"}
          value={control.value}
          onChange={handleInputChange}
        >
          {control.option.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}  
        </select>
      </div>
    );
  };
  