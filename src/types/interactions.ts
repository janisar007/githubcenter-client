// types/interactions.ts

export const InteractionType = {
  VIEW: 'view',
  CLICK: 'click',
  BID: 'bid',
  SAVE: 'save',
  SHARE: 'share',
  HOVER: 'hover',
  IMPRESSION: 'impression',
} as const;

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];
