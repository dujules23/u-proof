import { FC } from "react";
import ActionButton from "../buttons/ActionButton";

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search..."
        className="p-3 w-48 text-black rounded-sm outline-none"
      />
      <ActionButton title={"Search"} />
    </div>
  );
};

export default SearchBar;
