import React, { useEffect } from 'react';

import IzbrItem from 'components/MyBasket/IzbrItem';
import axios from 'axios';

const Izbrannoe = props => {
  const [izbr, setIzbr] = React.useState([]);
  const [defIzbr, setDefIzbr] = React.useState([]);

  let isSubscr = true;
  React.useEffect(() => {
    console.log(props.token)
    axios
      .post(`https://catalog-veneziastone.ru/api_v0/showViewed/`, {
        token: props.token
      })
      .then(response => {
        if (isSubscr) {
          setIzbr(response.data);
        }
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
          // props.setAuth(false);
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
        {Object.keys(izbr).map((ps, index) => (
          <IzbrItem
            key={index}
            kind="izbr"
            photo={izbr[ps].photo}
            ps={ps}
            item={izbr[ps]}
            type={izbr[ps].izbr}
            name={izbr[ps].name}
            price={izbr[ps].price}
            le={izbr[ps].le}
            he={izbr[ps].he}
            kw={izbr[ps].kw}
            sklad={izbr[ps].sklad}
          />
        ))}
      </div>
    </div>
  );
};
export default Izbrannoe;
