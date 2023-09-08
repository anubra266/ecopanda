import { css, cx } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { button, input } from "styled-system/recipes";
import { IoSearch, IoMenu } from "react-icons/io5";
import { GROUPS } from "~/data/groups";
import Link from "next/link";
import { ITEMS } from "~/data/items";
import { useState } from "react";
import { handleSearch, handleTagsSearch } from "~/lib/handle-search";
import { extractDomain } from "~/lib/extract-domain";
import { usePathname, useRouter } from "next/navigation";
import { useQueryString } from "~/lib/use-query-string";

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

const feed = shuffle(ITEMS);

export function ResourceList(props: ResourceListProps) {
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { query, createQueryString } = useQueryString();

  const setQuery = (value: string) => {
    const q = createQueryString("query", value);
    router.push(pathname + createQueryString("query", value));
  };

  const _group = props.group ?? "feed";
  const group = GROUPS.find((g) => g.id === _group);

  const getItems = () => {
    if (_group === "tags") return handleTagsSearch(ITEMS, props.resource);
    const groupItems =
      group &&
      ITEMS.filter((i) => i.group.includes(group.id)).sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
    return groupItems ?? feed;
  };
  const items = getItems();

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
          <h1
            className={css({
              textStyle: "md",
              fontWeight: "medium",
              textTransform: "capitalize",
            })}
          >
            {group?.label ?? _group}
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
              data-state={isSearching || query ? "open" : "closed"}
              className={cx(
                "peer",
                input(),
                css({
                  h: "8",
                  opacity: { base: "0", _open: "1" },
                  _open: {
                    animationName: "fadeInRight",
                    animationDuration: "0.4s",
                  },
                })
              )}
              onFocus={(e) => setIsSearching(true)}
              onBlur={(e) => setIsSearching(false)}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              disabled={isSearching}
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
                if (!isSearching) {
                  const input = e.currentTarget
                    .previousSibling as HTMLInputElement;
                  input.focus();
                }
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
        {!items.length && (
          <div
            className={css({
              textAlign: "center",
            })}
          >
            No <b>{group?.label}</b> yet. Check again later
          </div>
        )}
        {handleSearch(items, query).map((item) => {
          const itemGroups = GROUPS.filter((g) => item.group.includes(g.id));
          const getHrefGroup = () => {
            if (_group === "tags") return item.group[0];
            if (item.group.includes(_group as any)) return _group;
            return _group;
          };

          const href = `/${getHrefGroup()}/${item.id}${createQueryString(
            "query",
            query
          )}`;

          return (
            <article key={item.id} className={css({ py: "1" })}>
              <Link
                href={href}
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
                    w: "full",
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
                      {itemGroups.map((i) => i.label).join(", ")} -{" "}
                      {extractDomain(item.url)}
                    </span>
                    {item.authors.map((author, i) => (
                      <span key={i}>{author.label}</span>
                    ))}
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
