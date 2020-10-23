import React from 'react';

import BasketItem from 'components/MyBasket/BasketItem';

const WatchHistory = props => {
  const [type, setType] = React.useState(true);

  return (
    <div className="lk__history basket">
      <div className="basket__items">
        <BasketItem kind='history' type={true} />
        <BasketItem kind='history' type={false} />
        <BasketItem kind='history' type={false} />
        <BasketItem kind='history' type={true} />
        <BasketItem kind='history' type={true} />
      </div>
    </div>
  );
};
export default WatchHistory;
