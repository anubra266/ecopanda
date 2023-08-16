"use client";

import { css } from "styled-system/css";
import { Sidebar } from "~/components/sidebar";
import { useState } from "react";
import { flex } from "styled-system/patterns";
import { ResourceList } from "~/components/resource-list";
import { Resource } from "~/components/resource";

export default function Home({ params }: { params: { resource?: string[] } }) {
  const isItemView = params.resource?.length === 2;
  const [group, resource] = params.resource || [];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            resource={resource}
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
          <Resource resource={resource} />
        </div>
      </main>
    </>
  );
}
