import { gold, green, red } from '@ant-design/colors';
import faker from 'faker';
import { antdColorTones, healthColorPicker, statusColorPicker } from '../../utils/colors';
import { ASSET_STATUS } from '../../utils/types';

describe('#healthColorPicker', () => {
  test('Should return the correct color', async () => {
    const tones: antdColorTones[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const tone: antdColorTones = tones[
      faker.datatype.number({ min: 0, max: 9 })
    ];

    const greenHealth = faker.datatype.number({ min: 66, max: 100 });
    const goldHealth = faker.datatype.number({ min: 30, max: 65 });
    const redHealth = faker.datatype.number({ min: 0, max: 29 });

    expect(healthColorPicker(greenHealth, tone)).toStrictEqual(green[tone]);
    expect(healthColorPicker(goldHealth, tone)).toStrictEqual(gold[tone]);
    expect(healthColorPicker(redHealth, tone)).toStrictEqual(red[tone]);
  });
});

describe('#statusColorPicker', () => {
  test('Should return the correct color', async () => {
    const tones: antdColorTones[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const tone: antdColorTones = tones[
      faker.datatype.number({ min: 0, max: 9 })
    ];

    expect(statusColorPicker(ASSET_STATUS.Running, tone)).toStrictEqual(green[tone]);
    expect(statusColorPicker(ASSET_STATUS.Alerting, tone)).toStrictEqual(gold[tone]);
    expect(statusColorPicker(ASSET_STATUS.Stopped, tone)).toStrictEqual(red[tone]);
  });
});
