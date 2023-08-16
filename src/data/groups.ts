import { TbPackageImport } from "react-icons/tb";

export enum Group {
  Presets = "presets",
}

export const GROUPS = [
  {
    id: Group.Presets,
    label: "Presets",
    icon: TbPackageImport,
  },
];
