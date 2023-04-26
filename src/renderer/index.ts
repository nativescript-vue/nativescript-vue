import { createRenderer } from '@vue/runtime-core';

import { patchProp } from './patchProp';
import { nodeOps } from './nodeOps';

export const renderer = createRenderer({
  patchProp,
  ...nodeOps,
});
