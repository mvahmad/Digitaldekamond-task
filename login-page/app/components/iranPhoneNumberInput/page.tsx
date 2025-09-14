'use client'
import { isValidIranPhone, normalizeIranPhone } from "@/app/lib/utils";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface IranPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}


const IranPhoneInput: React.FC<IranPhoneInputProps> = ({
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

  const showError = touched && value && !isValidIranPhone(value) && !error;

  return (
    <div className="flex flex-col gap-4 ">
      <Input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        className={`${showError || error ? "border border-red-300" : "border-[#ccc]" } runded-md p-3 `}
      />
      {(showError || error) ? (
        <span className="text-red-500">
          {error || "Phone Number not suitable (exsample: 09123456789, +989123456789, 00989123456789)"}
        </span>
      ) : null}
    </div>
  );
};
export default IranPhoneInput;