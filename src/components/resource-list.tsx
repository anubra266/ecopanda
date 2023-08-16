import { css, cx } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import { IoSearch, IoMenu } from "react-icons/io5";
import { GROUPS } from "~/data/groups";
import Link from "next/link";
import { ITEMS } from "~/data/items";

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
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}

export function ResourceList(props: ResourceListProps) {
  const group = GROUPS.find((g) => g.id === props.group);
  const items = group
    ? ITEMS.filter((i) => i.group === group.id)
    : shuffle(ITEMS);

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
          <button
            className={cx(
              button({ variant: "ghost", size: "sm" }),
              css({ ml: { md: "auto" } })
            )}
          >
            <IoSearch />
          </button>
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
        {items.map((item) => {
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
