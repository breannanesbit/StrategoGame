import React, { FC, useEffect, useState } from "react";

export interface GenericInput {
  id: string;
  name: string;
  value: string;
  label: string;
  isValid: boolean;
  validationText: string;
  onChange: (value: string) => void;
}


export const useCustomInputControl = ({ 
  label,
  validatemessage,
  initialValue = "",
}: {
  label:string,
  validatemessage: string,
  initialValue?: string,
}): GenericInput => {
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
  

  const output: GenericInput = {
    id,
    name:label + id,
    value,
    label,
    isValid: !!value,
    validationText: value ? validatemessage : "",
    onChange
  }
  return output;
}

export const GenericTextInput: FC<{
  control: GenericInput
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
      <input
        name={control.name}
        className={control.isValid ? "form-control is-valid" : "form-control is-invalid"}
        value={control.value}
        type="text"
        onChange={handleInputChange}
        required
      />
      <div id={`${control.name}input`} className={control.isValid ? "valid-feedback" : "invalid-feedback"}>
        {control.isValid ? control.validationText : "Invalid input"}
      </div>
    </div>
  );
};