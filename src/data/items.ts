import { Group } from "~/data/groups";

interface Item {
  id: string;
  group: Group;
  title: string;
  description: string;
  url: string;
  author: string;
  tags: string[];
}

export const ITEMS: Item[] = [
  {
    id: "shadow-panda",
    group: Group.Presets,
    title: "Shadow Panda",
    description:
      "Shadow Panda is an adoption of shadcn/ui, tailored specifically for developers utilizing Panda CSS as an alternative to Tailwind CSS.",
    url: "https://github.com/kumaaa-inc/shadow-panda",
    author: "kumaaa",
    tags: ["shadcn/ui"],
  },
  {
    id: "park-ui",
    group: Group.Presets,
    title: "Park UI",
    description:
      "Beautifully designed components built with Ark UI and Panda CSS.",
    url: "https://github.com/cschroeter/park-ui",
    author: "cschroeter",
    tags: ["shadcn/ui"],
  },
];

//*------------- ------------- ------------- ------------- ------------- ------------- -------------
checkDuplicateIDs(ITEMS);

function checkDuplicateIDs(items: Item[]): void {
  const idMap: Record<string, boolean> = {};
  items.forEach((item) => {
    if (idMap[item.id]) {
      throw new Error(`Duplicate ID found: ${item.id}`);
    }
    idMap[item.id] = true;
  });
}
