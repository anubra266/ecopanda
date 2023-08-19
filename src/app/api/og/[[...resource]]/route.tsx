import { ImageResponse } from "next/server";
import { GROUPS } from "~/data/groups";
import { ITEMS } from "~/data/items";

export const runtime = "edge";
const DIMENSIONS = {
  width: 1200,
  height: 600,
};

const rootStyles = {
  ...DIMENSIONS,
  display: "flex",
  backgroundImage:
    "radial-gradient(circle at 25px 25px, #27272AFF 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272AFF 2%, transparent 0%)",
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

  const getTitle = () => {
    if (!_group) return;
    if (!_item) return group?.label;
    return item?.title;
  };

  const getDescription = () => {
    if (!_group) return "The Panda CSS Ecosystem";
    if (!_item) return `${group?.label} in the Panda CSS Ecosystem`;
    return item?.description;
  };

  const title = getTitle();

  if (!group && !item)
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
              Abraham A
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
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 50,
            gap: 25,
          }}
        >
          <div style={{ fontSize: 40 }}>EcoPanda</div>
          {title && <div style={{ fontSize: 100 }}>{title}</div>}
          <div style={{ fontSize: 20 }}>{getDescription()}</div>
          {item && (
            <div style={{ display: "flex", fontSize: 15 }}>
              By: {item.author.label}
            </div>
          )}
        </div>
      </div>
    ),
    DIMENSIONS
  );
}
