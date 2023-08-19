import { Group } from "~/data/groups";

interface Item {
  id: string;
  group: Group[];
  title: string;
  description: string;
  url: string;
  author: { label: string; url: string; avatar: string };
  tags: string[];
  thumbnail?: { base: string; _dark?: string };
}

export const ITEMS: Item[] = [
  {
    id: "pform-reset",
    group: [Group.Presets],
    title: "Reset for form styles in CSS Panda",
    description:
      "An opinionated form reset designed to make form elements easy to style in CSS Panda. 'Twas Inspired by @tailwindcss/forms",
    url: "https://github.com/anubra266/pform-reset",
    author: {
      label: "anubra266",
      url: "twitter.com/anubra366",
      avatar: "https://github.com/anubra266.png?size=200",
    },
    tags: ["form", "reset"],
  },
  {
    id: "shadow-panda",
    group: [Group.Presets],
    title: "Shadow Panda",
    description:
      "Shadow Panda is an adoption of shadcn/ui, tailored specifically for developers utilizing Panda CSS as an alternative to Tailwind CSS.",
    url: "https://github.com/kumaaa-inc/shadow-panda",
    author: {
      label: "kumaaa",
      url: "github.com/kumaaa",
      avatar: "https://github.com/kumaaa-inc.png?size=200",
    },
    tags: ["shadcn/ui", "radix"],
  },
  {
    id: "park-ui",
    group: [Group.Presets],
    title: "Park UI",
    description:
      "Beautifully designed components built with Ark UI and Panda CSS.",
    url: "https://github.com/cschroeter/park-ui",
    author: {
      label: "cschroeter",
      url: "twitter.com/grizzly_codes",
      avatar: "https://github.com/cschroeter.png?size=200",
    },
    tags: ["ark-ui"],
    thumbnail: {
      base: "https://s3-alpha.figma.com/hub/file/3999030346/f6aa7c94-cafa-4edd-a527-8d1a0d23b3eb-cover.png",
    },
  },
  {
    id: "pandacss-preset-discord",
    group: [Group.Presets],
    title: "Panda CSS preset for Discord branding",
    description: "A preset for Panda CSS that contains Discord's branding",
    url: "https://github.com/NurMarvin/pandacss-preset-discord",
    author: {
      label: "NurMarvin",
      url: "github.com/NurMarvin",
      avatar: "https://github.com/NurMarvin.png?size=200",
    },
    tags: ["discord"],
  },
  {
    id: "pandacss-preset-typography",
    group: [Group.Presets],
    title: "PandaCSS preset for typography",
    description:
      "A 🐼 PandaCSS typography preset inspired by the TailwindCSS typography plugin",
    url: "https://github.com/milandekruijf/pandacss-preset-typography",
    author: {
      label: "milandekruijf",
      url: "github.com/milandekruijf",
      avatar: "https://github.com/milandekruijf.png?size=200",
    },
    tags: ["typography"],
  },
  {
    id: "pandacss-preset-radix-colors",
    group: [Group.Presets],
    title: "PandaCSS preset for Radix Colors",
    description: "Brings Radix Colors to 🐼 PandaCSS",
    url: "https://github.com/milandekruijf/pandacss-preset-radix-colors",
    author: {
      label: "milandekruijf",
      url: "github.com/milandekruijf",
      avatar: "https://github.com/milandekruijf.png?size=200",
    },
    tags: ["radix", "colors"],
  },
  {
    id: "tw2panda",
    group: [Group.Tools, Group.Extensions],
    title: "tw2panda",
    description: "Easily migrate code from tailwind to Panda CSS",
    url: "https://github.com/astahmer/tw2panda",
    author: {
      label: "astahmer",
      url: "twitter.com/astahmer",
      avatar: "https://github.com/astahmer.png?size=200",
    },
    tags: ["tailwind", "cli", "vscode"],
  },
  {
    id: "animated-pandacss",
    group: [Group.Presets],
    title: "Animated PandaCSS",
    description: "Use Animate.css with Panda CSS",
    url: "https://github.com/anubra266/animated-pandacss",
    author: {
      label: "anubra266",
      url: "twitter.com/anubra266",
      avatar: "https://github.com/anubra266.png?size=200",
    },
    tags: ["animate.css", "animations"],
  },
  {
    id: "panda-transitions-css",
    group: [Group.Presets],
    title: "Panda Transitions.css",
    description: "Drop-in CSS transitions from transition.css for Panda CSS.",
    url: "https://github.com/anubra266/panda-transitions-css",
    author: {
      label: "anubra266",
      url: "twitter.com/anubra266",
      avatar: "https://github.com/anubra266.png?size=200",
    },
    tags: ["transition.css", "transitions"],
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
