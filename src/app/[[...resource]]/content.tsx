"use client";

import { css } from "styled-system/css";
import { Sidebar } from "~/components/sidebar";
import { useState } from "react";
import { flex } from "styled-system/patterns";
import { ResourceList } from "~/components/resource-list";
import { Resource } from "~/components/resource";

export default function HomeContent({
  params,
}: {
  params: { resource?: string[] };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isItemView = params.resource?.length === 2;
  const [group, item] = params.resource || [];

  return (
    <>
      <Sidebar
        group={group}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className={flex({ flex: "1" })}>
        <div
          data-hidden={isItemView ? "" : undefined}
          className={css({
            w: { base: "full", lg: "96" },
            borderRightWidth: { lg: "1px" },
            "&[data-hidden]": { display: { base: "none", lg: "block" } },
          })}
        >
          <ResourceList
            group={group}
            resource={item}
            openSidebar={() => setIsSidebarOpen(true)}
          />
        </div>
        <div
          data-hidden={!isItemView ? "" : undefined}
          className={flex({
            flex: "1",
            "&[data-hidden]": { display: { base: "none", lg: "flex" } },
          })}
        >
          <Resource resource={item} />
        </div>
      </main>
    </>
  );
}
