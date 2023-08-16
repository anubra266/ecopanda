import { css, cx } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { button, input } from "styled-system/recipes";
import { IoSearch, IoMenu } from "react-icons/io5";
import { GROUPS } from "~/data/groups";
import Link from "next/link";
import { ITEMS } from "~/data/items";
import { useState } from "react";
import { handleSearch } from "~/lib/handle-search";

type ResourceListProps = {
  openSidebar: () => void;
  group: string;
  resource: string;
};

function shuffle<T extends any[]>(array: T): T {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function extractDomain(url: string) {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const match = url.match(domainRegex);
  return match ? match[1] : null;
}

export function ResourceList(props: ResourceListProps) {
  const [iseSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const group = GROUPS.find((g) => g.id === props.group);
  const items = group
    ? ITEMS.filter((i) => i.group === group.id)
    : shuffle(ITEMS);

  const filteredItems = handleSearch(items, query);

  return (
    <section
      className={flex({
        direction: "column",
        w: "full",
        minH: "screen",
        lg: {
          maxH: "screen",
          overflowY: "auto",
        },
      })}
    >
      <header
        className={css({
          w: "full",
          px: "2.5",
          borderBottomWidth: { base: "1px", xl: "0px" },

          position: "sticky",
          top: "0",
          bg: { base: "rgba(255 ,255 ,255, .4)", _dark: "rgba(9, 9, 11, 0.4)" },
          backdropFilter: "blur(10px)",
        })}
      >
        <div
          className={flex({
            justify: { base: "space-between", md: "normal" },
            align: "center",
            px: "3",
            h: "16",
            gap: "2",
          })}
        >
          <button
            className={cx(
              button({ variant: "ghost", size: "sm" }),
              css({ display: { xl: "none" } })
            )}
            onClick={props.openSidebar}
          >
            <IoMenu />
          </button>
          <h1 className={css({ textStyle: "md", fontWeight: "medium" })}>
            {group?.label ?? "Resources"}
          </h1>
          <div
            className={flex({
              isolation: "isolate",
              position: "relative",
              ml: { md: "auto" },
            })}
          >
            <input
              placeholder="Search..."
              data-state={iseSearching ? "open" : "closed"}
              className={cx(
                "peer",
                input(),
                css({
                  h: "8",
                  opacity: { base: "0", _open: "1" },
                })
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className={cx(
                button({ variant: "ghost", size: "sm" }),
                css({
                  position: "absolute",
                  right: "0",
                  top: "0",
                  zIndex: "2",
                  h: "full",
                  '.peer:is([data-state="open"]) ~ &': {
                    borderLeftRadius: "0",
                  },
                })
              )}
              onClick={(e) => {
                setIsSearching((prev) => !prev);
                const input = e.currentTarget
                  .previousSibling as HTMLInputElement;
                input.focus();
              }}
            >
              <IoSearch />
            </button>
          </div>
        </div>
      </header>
      <div
        className={flex({
          direction: "column",
          flex: "1",
          px: { base: "2.5", xl: "5" },
          py: "2",
        })}
      >
        {filteredItems.map((item) => {
          const itemGroup = GROUPS.find((g) => g.id === item.group);
          return (
            <article key={item.id} className={css({ py: "1" })}>
              <Link
                href={`/${item.group}/${item.id}`}
                className={cx(
                  button({
                    variant: item.id === props.resource ? "secondary" : "ghost",
                  }),
                  css({
                    w: "full",
                    justifyContent: "flex-start",
                    color: "muted.foreground",
                    h: "auto",
                    px: "0",
                  })
                )}
              >
                <section
                  className={css({
                    p: "2.5",
                    textStyle: "sm",
                  })}
                >
                  <div
                    className={flex({
                      textStyle: "xs",
                      pb: "1.5",
                      justify: "space-between",
                    })}
                  >
                    <span>
                      {itemGroup?.label} - {extractDomain(item.url)}
                    </span>
                    <span>{item.author}</span>
                  </div>
                  <h1
                    className={css({
                      lineClamp: "2",
                      wordBreak: "break-all",
                      color: "foreground",
                    })}
                  >
                    {item.title}
                  </h1>
                  <p
                    className={css({
                      lineClamp: "1",
                      wordBreak: "break-all",
                      textStyle: "xs",
                    })}
                  >
                    {item.description}
                  </p>
                </section>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
