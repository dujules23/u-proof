import { FC } from "react";

interface Props {
  textAreaName: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<Props> = ({
  textAreaName,
  value,
  onChange,
}): JSX.Element => {
  return (
    <>
      <label
        htmlFor="message"
        className="block font-bold mb-2 text-primary-dark dark:text-primary-light"
      >
        {textAreaName}:
      </label>
      <textarea
        id="message"
        value={value}
        onChange={onChange}
        required
        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light min-h-[7rem] md:min-h-[15rem]"
      />
    </>
  );
};

export default TextArea;
