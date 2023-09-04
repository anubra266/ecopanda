import { ImageResponse } from "next/server";
import { GROUPS } from "~/data/groups";
import { ITEMS } from "~/data/items";
import { handleTagsSearch } from "~/lib/handle-search";

export const runtime = "edge";
const DIMENSIONS = {
  width: 1200,
  height: 600,
};

const rootStyles = {
  ...DIMENSIONS,
  display: "flex",
  backgroundImage:
    "radial-gradient(circle at 25px 25px, #E5868689 2%, transparent 0%), radial-gradient(circle at 75px 75px, #E5868689 2%, transparent 0%)",
  backgroundSize: "100px 100px",
  backgroundColor: "hsl(240 10% 3.9%)",
  color: "white",
  fontFamily: "Inter",
  lineHeight: 1,
};

export async function GET(
  _: Request,
  { params }: { params: { resource?: string[] } }
) {
  const [_group, _item] = params.resource || [];

  const group = GROUPS.find((g) => g.id === _group);
  const item = ITEMS.find((i) => i.id === _item);

  const isGroup = !!group && !item;
  const isTag = _group === "tags";

  const getGroupCount = () => {
    if (isTag) return handleTagsSearch(ITEMS, _item).length;
    return ITEMS.filter((i) => i.group.includes(_group as any)).length;
  };

  const getTitle = () => {
    if (_group === "tags") return `${_item.toLocaleUpperCase()} tag`;
    if (!_item) return group?.label;
    return item?.title;
  };

  const getDescription = () => {
    if (_group === "tags")
      return `Resources with ${_item} tag in the Panda CSS Ecosystem`;
    if (!_item) return `${group?.label} in the Panda CSS Ecosystem`;
    return item?.description;
  };

  const getGroupLabel = () => {
    if (!isGroup && !isTag) return;
    const label = isTag ? "Resources" : group!.label;
    if (label.endsWith("s") && getGroupCount() === 1) return label.slice(0, -1);
    return label;
  };

  if (!group && !item && _group !== "tags")
    return new ImageResponse(
      (
        <div
          style={{
            ...rootStyles,
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              position: "absolute",
              bottom: 60,
              left: 120,
              alignItems: "center",
            }}
          >
            <img
              src="https://github.com/anubra266.png?size=200"
              alt="Creator Avatar"
              style={{
                width: 40,
                borderRadius: "50%",
                border: "solid 1px orange",
              }}
            />
            <span
              style={{
                fontSize: 25,
                fontWeight: 500,
              }}
            >
              With ❤️ from @anubra266
            </span>
          </div>
          <div
            style={{
              color: "#F4F5F5FF",
              fontSize: 100,
              display: "flex",
              flexDirection: "column",
              paddingLeft: 120,
              gap: 40,
              paddingBottom: 20,
            }}
          >
            <span>EcoPanda</span>
            <span style={{ color: "#A1A1AAFF", fontSize: 40 }}>
              The Panda CSS Ecosystem
            </span>
          </div>
        </div>
      ),
      DIMENSIONS
    );

  return new ImageResponse(
    (
      <div
        style={{
          ...rootStyles,
          letterSpacing: "-0.05em",
          alignItems: "center",
          padding: 100,
        }}
      >
        <div
          style={{
            flex: "1",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                fontWeight: 900,
                fontSize: 30,
                gap: 8,
              }}
            >
              🐼 <span>Ecopanda</span>
            </div>
            <div
              style={{
                color: "#F4F5F5FF",
                fontSize: 70,
                display: "flex",
                flexDirection: "column",
                gap: 40,
                fontWeight: 900,
              }}
            >
              {getTitle()}
            </div>
            <span
              style={{
                color: "#A1A1AAFF",
                fontSize: 30,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {getDescription()}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {isGroup || isTag ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {isGroup && (
                  <span
                    style={{
                      fontSize: 25,
                      height: 40,
                      width: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      border: "solid 2px white",
                    }}
                  >
                    <group.icon />
                  </span>
                )}
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 500,
                  }}
                >
                  {getGroupCount()} {getGroupLabel()}
                </span>
              </div>
            ) : (
              item?.authors.map((author, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={author.avatar}
                    alt="Creator Avatar"
                    style={{
                      width: 40,
                      borderRadius: "50%",
                      border: "solid 1px orange",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 25,
                      fontWeight: 500,
                    }}
                  >
                    @{author.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    ),
    DIMENSIONS
  );
}
