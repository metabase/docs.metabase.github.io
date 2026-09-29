import type { InkeepJS } from "@inkeep/cxkit-types";

declare global {
  interface Window {
    Inkeep: Required<InkeepJS>;
  }
}
