import { FC } from "react";

interface SelectOption {
  label: string;
  value: string | number;
}
interface SelectProps {
  selectName: string;
  options: SelectOption[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  selectName,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled,
}): JSX.Element => {
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   onChange(event.target.value);
  // };

  return (
    <div>
      <label
        htmlFor={selectName.toLocaleLowerCase()}
        className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
      >
        {selectName}
      </label>
      <select
        id={selectName.toLocaleLowerCase()}
        className="cursor-pointer appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light"
        value={value}
        disabled={disabled}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
