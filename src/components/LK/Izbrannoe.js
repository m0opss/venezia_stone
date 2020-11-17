import React, { useEffect } from 'react';

import BasketItem from 'components/MyBasket/BasketItem';
import axios from 'axios';

const Izbrannoe = props => {
  const [izbr, setIzbr] = React.useState({});

  let isSubscr = true;
  React.useEffect(() => {
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/showFavourite/`, {
        token: props.token
      })
      .then(response => {
        if (isSubscr) {
          console.log(response.data)
          setIzbr(response.data);
        }
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(2, err.request);
        } else {
          // anything else
          console.log(3, err);
        }
      });

    return () => (isSubscr = false);
  }, [izbr.length]);

  return (
    <div className="lk__izbrannoe basket">
      <div className="basket__items">
        {console.log(izbr)}
        {Object.keys(izbr).length > 0 ? (
          Object.keys(izbr).map((ps) => (
            <BasketItem
              kind="izbr"
              key={izbr[ps].ps}
              link={izbr[ps].route}
              cur={props.cur}
              item={izbr[ps]}
              type={izbr[ps].izd}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Izbrannoe;
