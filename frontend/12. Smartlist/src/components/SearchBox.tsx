"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set("search", value);

      router.push(`/?${params.toString()}`);
    }, 400); // debounce delay

    return () => clearTimeout(timer);
  }, [value]);


  return (
    <input
      type="text" 
      placeholder="Search items..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className=" mb-5
        w-full 
        p-3 
        rounded 
        border 
        border-gray-700 
        bg-black 
        text-white 
        placeholder-gray-500 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-500 
        focus:border-gray-500 
        transition
      "
    />
  );
}
