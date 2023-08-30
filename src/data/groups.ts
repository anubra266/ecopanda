import { TbPackageImport, TbTemplate } from "react-icons/tb";
import { PiToolbox } from "react-icons/pi";
import { BiExtension } from "react-icons/bi";

export enum Group {
  Presets = "presets",
  Tools = "tools",
  Extensions = "extensions",
  Templates = "templates",
}

export const GROUPS = [
  {
    id: Group.Presets,
    label: "Presets",
    icon: TbPackageImport,
  },
  {
    id: Group.Tools,
    label: "Tools",
    icon: PiToolbox,
  },
  {
    id: Group.Extensions,
    label: "Extensions",
    icon: BiExtension,
  },
  {
    id: Group.Templates,
    label: "Templates",
    icon: TbTemplate,
  },
];
