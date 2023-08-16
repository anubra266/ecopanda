"use client";

import { useTheme } from "next-themes";
import { button } from "styled-system/recipes";
import { Within } from "@theme-toggles/react";
import { cx } from "styled-system/css";
import { sidebarItem } from "~/components/sidebar";

export function ColorModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <li>
      <button
        onClick={toggle}
        className={cx(button({ variant: "ghost" }), sidebarItem())}
      >
        <Within toggled={resolvedTheme === "light"} />
        {resolvedTheme} Mode
      </button>
    </li>
  );
}
