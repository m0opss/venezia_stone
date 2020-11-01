import React, { useEffect } from 'react';

import BasketItem from 'components/MyBasket/BasketItem';


const Izbrannoe = props => {
  const [izbr, setIzbr] = React.useState([]);
  const [defIzbr, setDefIzbr] = React.useState([]);

  React.useEffect(() => {
    let isSubscr = true;
    // axios
    //   .get(
    //     `https://catalog-veneziastone.ru/account/izbr`
    //   )
    //   .then(response => {
    //     if (isSubscr) {
    //       setIzbr(response.data.mts[0].grs);
    //       setDefIzbr(response.data.mts[0].grs);
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    return () => (isSubscr = false);
  }, []);
  return (
    <div className="lk__izbrannoe basket">
      <div className="basket__items">
        {/* {izbr.map(item => {
          <BasketItem kind="izbr" type={true} />;
        })} */}
        <BasketItem kind="izbr" type={true} />
        <BasketItem kind="izbr" type={false} />
        <BasketItem kind="izbr" type={false} />
        <BasketItem kind="izbr" type={true} />
        <BasketItem kind="izbr" type={true} />
      </div>
    </div>
  );
};
export default Izbrannoe;
