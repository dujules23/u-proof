import { FC } from "react";

interface Props {
  inputName: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ inputName, value, onChange }): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={inputName}
        className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
      >
        {inputName}
      </label>
      <input
        type="text"
        id={inputName}
        value={value}
        onChange={onChange}
        required
        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light"
      />
    </div>
  );
};

export default Input;
