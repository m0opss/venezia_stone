import React, { Fragment } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
// import { Breadcrumb } from "semantic-ui-react"
// import 'semantic-ui-css/semantic.min.css'



const Contacts = () => {
  return (
    <Fragment>
     

      <YMaps>
        <Map
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 3
          }}
        >
          <Placemark geometry={[55.684758, 37.738521]} />
          <Placemark geometry={[45.684758, 32.738521]} />
        </Map>
      </YMaps>
    </Fragment>
  );
};
export default Contacts;
