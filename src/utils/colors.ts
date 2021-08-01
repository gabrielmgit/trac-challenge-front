import { gold, green, red } from '@ant-design/colors';
import { ASSET_STATUS } from './types';

export type antdColorTones = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const statusColorPicker = (status: ASSET_STATUS, tone: antdColorTones): string => {
  switch (status) {
    case ASSET_STATUS.Alerting: {
      return gold[tone];
    }
    case ASSET_STATUS.Running: {
      return green[tone];
    }
    default: {
      return red[tone];
    }
  }
};

export const healthColorPicker = (
  health: number,
  tone: antdColorTones,
): string => {
  if (health > 65) {
    return green[tone];
  } if (health < 30) {
    return red[tone];
  }
  return gold[tone];
};

enum COLORS {
  white = '#FFFFFF',
  darkBlue = '#001529',
}

export default COLORS;
