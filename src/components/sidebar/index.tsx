"use client";

import { css, cva, cx } from "styled-system/css";
import { flex, stack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import { IoClose } from "react-icons/io5";
import { BsGithub, BsDiscord, BsTwitter, BsPlus } from "react-icons/bs";
import { GROUPS } from "~/data/groups";
import Link from "next/link";
import { ITEMS } from "~/data/items";
import { ColorModeToggle } from "~/components/sidebar/color-mode-toggle";

export function Sidebar(props: {
  group: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <nav
      data-open={props.isOpen ? "" : undefined}
      className={css({
        position: { base: "absolute", lg: "relative" },
        zIndex: "30",
        inset: "0",
        bg: "background",
        w: { lg: "96", xl: "64" },
        borderRightWidth: "1px",
        display: { base: { base: "none", _open: "block" }, xl: "block" },
      })}
    >
      <section
        className={flex({
          gap: "1",
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
            bg: {
              base: "rgba(255 ,255 ,255, .4)",
              _dark: "rgba(9, 9, 11, 0.4)",
            },
            backdropFilter: "blur(10px)",
          })}
        >
          <div
            className={flex({
              justify: "space-between",
              align: "center",
              px: "3",
              h: "16",
            })}
          >
            <Link
              href="/"
              className={css({ textStyle: "lg", fontWeight: "medium" })}
            >
              🐼 EcoPanda
            </Link>
            <button
              className={cx(
                button({ variant: "ghost", size: "sm" }),
                css({ display: { xl: "none" } })
              )}
              onClick={props.onClose}
            >
              <IoClose />
            </button>
          </div>
        </header>

        <div
          className={flex({
            direction: "column",
            flex: "1",
            px: "2.5",
            w: "full",
            color: "muted.foreground",
          })}
        >
          <div
            className={flex({
              direction: "column",
              flex: "1",
              py: "2",
              divideY: "1px",
            })}
          >
            <div className={css({ textStyle: "sm" })}>
              <div className={css({ px: "3", py: "2" })}>Groups</div>
              <ul
                className={stack({
                  gap: "1",
                  pb: "4",
                })}
              >
                {GROUPS.map((group) => {
                  const itemsCount = ITEMS.filter((i) =>
                    i.group.includes(group.id)
                  )?.length;

                  return (
                    <li key={group.id}>
                      <Link
                        href={`/${group.id}`}
                        className={cx(
                          button({
                            variant:
                              props.group === group.id ? "secondary" : "ghost",
                          }),
                          sidebarItem()
                        )}
                      >
                        <group.icon />
                        {group.label}
                        <span
                          className={stack({
                            ml: "auto",
                          })}
                        >
                          {itemsCount}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul
              className={stack({
                gap: "1",
                py: "4",
                textStyle: "sm",
                mt: "auto",
              })}
            >
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cx(button({ variant: "ghost" }), sidebarItem())}
                  >
                    {l.icon}
                    {l.label}
                  </a>
                </li>
              ))}
              <ColorModeToggle />
            </ul>
          </div>
        </div>
      </section>
    </nav>
  );
}

export const sidebarItem = cva({
  base: {
    px: "3",
    py: "1.5",
    w: "full",
    justifyContent: "start",
    gap: "4",
    transition: "colors",
    textTransform: "capitalize",

    "& > svg": {
      w: "4",
      h: "4",
    },
  },
});

const LINKS = [
  {
    label: "New Item",
    icon: <BsPlus />,
    href: "https://github.com/anubra266/ecopanda",
  },
  {
    label: "Panda Docs",
    icon: (
      <svg
        width="71"
        height="69"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-scope="icon"
      >
        <path
          d="M10.7608 0.390669C9.38613 -0.0126127 7.98396 -0.067426 6.55506 0.0630881C5.75542 0.147945 4.98667 0.310054 4.24518 0.594509C2.64244 1.20936 1.43903 2.27424 0.72147 3.87754C0.207033 5.02698 0.0211109 6.24802 0.0017347 7.50081C-0.0187424 8.8248 0.143717 10.1305 0.401862 11.4249C0.635852 12.5983 0.947463 13.7487 1.39249 14.8591C1.43477 14.9646 1.48743 15.0002 1.60028 15C3.0078 14.9969 4.41533 14.9969 5.82286 14.9969C6.23955 14.9969 6.65623 14.9969 7.07292 14.9968C7.10483 14.9968 7.13673 14.995 7.17342 14.993C7.19215 14.9919 7.21213 14.9908 7.23399 14.9898C7.22553 14.9693 7.21796 14.9504 7.21087 14.9327C7.19692 14.8979 7.18479 14.8676 7.17125 14.838C7.06947 14.6156 6.96558 14.3942 6.86169 14.1728C6.63635 13.6924 6.41101 13.2121 6.20721 12.7224C5.5891 11.2373 5.11575 9.7082 4.9713 8.08959C4.90756 7.37541 4.91641 6.66531 5.11044 5.96941C5.33222 5.17396 5.80814 4.6124 6.59715 4.37763C7.32168 4.16204 8.05629 4.16346 8.77688 4.40144C9.42 4.61383 9.8393 5.06248 10.0176 5.73423C10.1546 6.25013 10.1546 6.77159 10.051 7.29169C9.97115 7.69214 9.81051 8.05756 9.52137 8.34988C9.00271 8.87423 8.35495 8.9948 7.6599 8.95462C7.53624 8.94747 7.41295 8.93362 7.28592 8.91936C7.22642 8.91267 7.16609 8.9059 7.10452 8.89968C7.10629 8.91977 7.10727 8.93828 7.10819 8.95562C7.10999 8.98973 7.11156 9.01931 7.11843 9.04755C7.14805 9.16913 7.17627 9.29115 7.2045 9.41319C7.27249 9.70715 7.3405 10.0012 7.42793 10.289C7.59961 10.8542 7.79925 11.4058 8.02556 11.9443C9.63883 11.8158 11.1248 11.4062 12.7019 10.4393C12.7256 10.4241 12.7471 10.4103 12.7686 10.3966C13.4461 9.96587 13.9944 9.40712 14.3725 8.68563C14.9848 7.51725 15.1042 6.26777 14.9223 4.97808C14.7345 3.64712 14.1497 2.52993 13.1429 1.6536C12.4446 1.0458 11.6371 0.647746 10.7608 0.390669Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    href: "https://panda-css.com/",
  },
  {
    label: "Github",
    icon: <BsGithub />,
    href: "https://github.com/chakra-ui/panda",
  },
  {
    label: "Discord",
    icon: <BsDiscord />,
    href: "https://discord.gg/VQrkpsgSx7",
  },
  {
    label: "Twitter",
    icon: <BsTwitter />,
    href: "https://twitter.com/panda__css",
  },
];
