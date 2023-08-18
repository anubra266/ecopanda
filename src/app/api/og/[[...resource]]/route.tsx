import { ImageResponse } from "next/server";
import { GROUPS } from "~/data/groups";
import { ITEMS } from "~/data/items";

export const runtime = "edge";

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

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient( 135deg, black 10%, #444 100%)",
          color: "white",
          fontFamily: "Inter",
          letterSpacing: "-0.05em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
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
    {
      width: 1200,
      height: 630,
    }
  );
}
