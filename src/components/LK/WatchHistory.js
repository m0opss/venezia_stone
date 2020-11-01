import React from 'react';

import BasketItem from 'components/MyBasket/BasketItem';


const WatchHistory = props => {
  const [hist, setHist] = React.useState([]);
  const [defIzbr, setDefIzbr] = React.useState([]);

  React.useEffect(() => {
    let isSubscr = true;
    // axios
    //   .get(
    //     `https://catalog-veneziastone.ru/account/izbr`
    //   )
    //   .then(response => {
    //     if (isSubscr) {
    //       setHist(response.data.mts[0].grs);
    //       setDefIzbr(response.data.mts[0].grs);
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    return () => (isSubscr = false);
  }, []);
  return (
    <div className="lk__history basket">
      <div className="basket__items">
        {/* {hist.map(item => {
          <BasketItem kind="izbr" type={true} />;
        })} */}
        <BasketItem kind="history" type={true} />
        <BasketItem kind="history" type={false} />
        <BasketItem kind="history" type={false} />
        <BasketItem kind="history" type={true} />
        <BasketItem kind="history" type={true} />
      </div>
    </div>
  );
};
export default WatchHistory;
