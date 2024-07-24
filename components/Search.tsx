"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 items-center my-4">
            <input
                type="text"
                className="w-full border-2 border-black/50 py-2 pl-10 text-sm outline-2 rounded-2xl"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
            <IoSearch className="absolute top-2 left-3 h-5 w-5 text-gray-500" />
        </div>
    );
};

export default Search;
