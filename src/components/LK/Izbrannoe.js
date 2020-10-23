import React from 'react';

import BasketItem from 'components/MyBasket/BasketItem';

const Izbrannoe = props => {
  const [type, setType] = React.useState(true);

  return (
    <div className="lk__izbrannoe basket">
      <div className="basket__items">
        <BasketItem kind='izbr' type={true} />
        <BasketItem kind='izbr' type={false} />
        <BasketItem kind='izbr' type={false} />
        <BasketItem kind='izbr' type={true} />
        <BasketItem kind='izbr' type={true} />
      </div>
    </div>
  );
};
export default Izbrannoe;
