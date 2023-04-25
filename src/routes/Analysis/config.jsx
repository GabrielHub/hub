import { PER, League } from './Tabs';

export const TAB_LABELS = [
  {
    label: 'League Averages'
  },
  {
    label: 'PER Leaders'
  }
];

export const TAB_CONFIG = [
  {
    label: 'League Averages',
    component: <League />
  },
  {
    label: 'PER Leaders',
    component: <PER />
  }
];

export default {};
