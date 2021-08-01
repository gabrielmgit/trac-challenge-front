import { Drawer } from 'antd';
import React, { useState } from 'react';
import COLORS from '../../../utils/colors';
import { IAsset, IUnit } from '../../../utils/types';
import Assets from './AssetsCards';

interface UnitDrawerProps {
  unit: IUnit;
  setShowUnitDrawer: (value: boolean) => void;
  showUnitDrawer: boolean;
}
const UnitDrawer: React.FC<UnitDrawerProps> = ({
  unit,
  setShowUnitDrawer,
  showUnitDrawer,
}) => {
  const [, setAssets] = useState<IAsset[]>(unit.assets);

  return (
    <Drawer
      title={<b>{unit.name}</b>}
      placement="right"
      onClose={() => setShowUnitDrawer(false)}
      visible={showUnitDrawer}
      width="95%"
      bodyStyle={{ backgroundColor: COLORS.darkBlue }}
    >
      <Assets assets={unit.assets} setAssets={setAssets} />
    </Drawer>
  );
};

export default UnitDrawer;
