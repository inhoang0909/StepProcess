"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type FormInputProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "time" | "date" | "textarea" | "select";
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange?: (val: string) => void;
  required?: boolean;
  options?: { label: string; value: string }[]; 
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onSelectChange,
  required = false,
  options = [],
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label htmlFor={name} className="font-medium text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          required={required}
          className="w-full resize-none"
        />
      ) : type === "select" ? (
        <Select
          value={value as string}
          onValueChange={(val) => onSelectChange && onSelectChange(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full"
        />
      )}
    </div>
  );
};

export default FormInput;
