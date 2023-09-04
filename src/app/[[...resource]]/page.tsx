import HomeContent from "~/app/[[...resource]]/content";
import { Metadata } from "next";
import { GROUPS } from "~/data/groups";
import { ITEMS } from "~/data/items";

type Props = {
  params: { resource?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [_group, _item] = params.resource || [];

  const group = GROUPS.find((g) => g.id === _group);
  const item = ITEMS.find((i) => i.id === _item);

  const getTitle = () => {
    if (!_group || _group === "feed") return "Feed";
    if (_group === "tags") return `${_item.toLocaleUpperCase()} tag`;
    if (!_item) return group?.label;
    return item?.title;
  };

  const getDescription = () => {
    if (!_group || _group === "feed") return "The Panda CSS Ecosystem";
    if (_group === "tags")
      return `Resources with ${_item} tag in the Panda CSS Ecosystem`;
    if (!_item) return `${group?.label} in the Panda CSS Ecosystem`;
    return item?.description;
  };

  const ogImage = `/api/og/${[_group, _item].filter(Boolean).join("/")}`;

  return {
    metadataBase: new URL("https://ecopanda.dev"),
    title: `${getTitle()} | EcoPanda`,
    description: getDescription(),
    icons: [
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐼</text></svg>",
    ],
    keywords: ["Panda CSS", "Components"],
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://ecopanda.dev",
      title: `${getTitle()} | EcoPanda`,
      description: getDescription(),
      images: [ogImage],
    },
    twitter: {
      creator: "@anubra266",
      title: `${getTitle()} | EcoPanda`,
      description: getDescription(),
      images: [ogImage],
      creatorId: "anubra266",
      card: "summary_large_image",
    },
  };
}

export default function Home({ params }: Props) {
  return <HomeContent params={params} />;
}
