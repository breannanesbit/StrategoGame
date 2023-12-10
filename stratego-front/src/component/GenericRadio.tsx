import { FC, useEffect, useState } from "react";

export interface GenericRadio {
    id: string;
    name: string;
    value: string;
    label: string;
    isValid: boolean,
    validationText: string,
    option: string[];
    onChange: (value: string) => void;
}

export const useCustomRadioControl = ({
    label,
    validatemessage,
    initialValue = "",
    options,
}: {
    label:string,
    validatemessage: string,
    initialValue?: string,
    options: any[]

}): GenericRadio => {
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

 const output: GenericRadio ={
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

export const GenericRadioInput: FC<{
    control: GenericRadio;
  }> = ({ control }) => {
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          control.onChange(newValue);
        };
  
    return (
        <div>
        <label htmlFor={control.name} className="form-label">
          {control.label}
        </label>
        <div>
          {control.option.map((i) => (
            <div key={i}>
              <input
                type="radio"
                id={`${control.name}-${i}`}
                name={control.name}
                value={i}
                checked={control.value === i}
                onChange={handleInputChange}
              />
              <label htmlFor={`${control.name}-${i}`}>{i}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  