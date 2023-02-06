import React from "react";
export type SelectOption = {
  label: string | number;
  value: string | number;
};
type DropdownProps = {
  title: string;
  items: SelectOption[];
  handleSelect: (e: React.FormEvent<HTMLSelectElement>) => void;
};

function SelectDropdown({ title, items, handleSelect }: DropdownProps) {
  return (
    <div className="select-container">
      <label htmlFor="select">{title}</label> {}
      <select onChange={handleSelect} id="select" style={{ width: "7rem" }}>
        {items.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDropdown;
