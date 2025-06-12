import { logger } from '../util/logger';

export const TransitionGroup = {
  new() {
    logger.warn('TransitionGroup is not supported');
    return { $props: {} };
  },
};
