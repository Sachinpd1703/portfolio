declare module "*.svg" {
  import type { ComponentType, SVGProps } from "react";

  const SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}
