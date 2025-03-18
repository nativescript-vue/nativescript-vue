import { warn } from '@vue/runtime-core';

const baseLogger = '[NativeScript-Vue]';

export const logger = {
  warn(msg: string) {
    warn(`${baseLogger} ${msg}`);
  },
};
