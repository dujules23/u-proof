"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { FC } from "react";
import ActionButton from "../buttons/ActionButton";

interface Props {
  placeholder: string;
}

const SearchBar: FC<Props> = ({ placeholder }): JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex">
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 w-48 text-black rounded-sm outline-none"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <ActionButton title={"Search"} />
    </div>
  );
};

export default SearchBar;
