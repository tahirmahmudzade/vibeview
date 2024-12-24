"use client";

import { Terms } from "@/types/types";
import { Select, SelectItem } from "@nextui-org/react";

export default function TermMenu({
  handleTermChange,
  term,
}: {
  handleTermChange: (term: Terms) => void;
  term: Terms;
}) {
  return (
    <Select
      className="ml-auto w-36 md:w-40 lg:w-48"
      selectedKeys={[term]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as Terms;
        handleTermChange(selected);
      }}
      aria-label="Select time range"
      placeholder=""
    >
      <SelectItem key="short_term">Last 4 Weeks</SelectItem>
      <SelectItem key="medium_term">Last 6 Months</SelectItem>
      <SelectItem key="long_term">Last 1 Year</SelectItem>
    </Select>
  );
}