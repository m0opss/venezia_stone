import React from 'react';

import './SocialContacts.scss';


const SocialContacts = props => {
  const phones = {
    Москва: '+7 (499) 645-98-85',
    'Санкт-Петербург': '+7 (812) 313-14-14',
    Краснодар: '+7 (861) 299-51-43',
    Екатеринбург: '+7 (343) 383-19-00',
    Казань: '+7 (843) 249-03-01',
    Крым: '+7 (978) 758-32-02'
  };
  return (
    <div className="top-line__phone">
      {Object.keys(phones).map(city => {
        if (props.city == city) {
          return phones[city];
        }
      })}
    </div>
  );
};
export default SocialContacts;
