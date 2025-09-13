import { isValidIranPhone, normalizeIranPhone } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface IranPhoneInputProps {
  value: string;
  onChange: (value: string) => void; 
  placeholder?: string;
  error?: string;
}


export const IranPhoneInput: React.FC<IranPhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Phone Number",
  error,
}) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const normalized = normalizeIranPhone(raw);
    onChange(normalized);
  };

  const showError = touched && !isValidIranPhone(value);

  return (
    <div className="flex flex-col gap-4 ">
      <Input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        style={{
          border: showError ? "1px solid red" : "1px solid #ccc",
          borderRadius: 4,
          padding: "8px 12px",
        }}
      />
      {showError || error ? (
        <span style={{ color: "red", fontSize: 12 }}>
          {error || "Phone Number not suitable (exsample: 09123456789, +989123456789, 00989123456789)"}
        </span>
      ) : null}
    </div>
  );
};