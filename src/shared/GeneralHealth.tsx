/* eslint-disable no-nested-ternary */
import React from 'react';
import { SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons';
import { green, gold, red } from '@ant-design/colors';

const GeneralHealth: React.FC<{ health: number; healthText: string }> = ({
  health,
  healthText,
}) => {
  const GENERAL_HEALTH = `${healthText} ${health.toFixed(2)}%`;

  const IconSmile = health > 65 ? (
    <SmileTwoTone twoToneColor={green[5]} />
  ) : health < 30 ? (
    <FrownTwoTone twoToneColor={red[4]} />
  ) : (
    <MehTwoTone twoToneColor={gold[5]} />
  );

  return (
    <span>
      {GENERAL_HEALTH}
      {' '}
      {IconSmile}
    </span>
  );
};

export default GeneralHealth;
