import HomeContent from "~/app/[[...resource]]/content";
import { Metadata, ResolvingMetadata } from "next";
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
    if (!_group) return "Resources";
    if (!_item) return group?.label;
    return item?.title;
  };

  const getDescription = () => {
    if (!_group) return "The Panda CSS Ecosystem";
    if (!_item) return `${group?.label} in the Panda CSS Ecosystem`;
    return item?.description;
  };

  const ogImage = `/api/og?_group=${_group}&_item=${_item}`;

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
