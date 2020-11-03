// import React from 'react';
// import { Menu } from 'antd';

// import colors from './filterColors.json';

// const FilterSubmenu = props => {
//   const Menu = props.Menu
//   const {SubMenu} = Menu
//   return (
//     <SubMenu key={props.filter} title={props.title}>
//       {props.filters[props.filter].map((material, ind) => {
//         return (
//           <Menu.Item
//             key={`${props.index}${ind}`}
//             style={{ display: 'flex', alignItems: 'center' }}
//             onClick={props.filterItemClicked}
//           >
//             {material === 'krd' ? (
//               'Краснодар'
//             ) : material === 'kzn' ? (
//               'Казань'
//             ) : material === 'ekb' ? (
//               'Екатеринбург'
//             ) : material === 'spb' ? (
//               'Санкт-Петербург'
//             ) : material === 'msc' ? (
//               'Москва'
//             ) : props.index == 2 && material === 'Белый' ? (
//               <>
//                 <div
//                   className="filter__color border-color"
//                   style={{ background: colors[material] }}
//                 />
//                 {material}
//               </>
//             ) : props.index == 2 && material !== 'Белый' ? (
//               <>
//                 <div
//                   className="filter__color"
//                   style={{ background: colors[material] }}
//                 />
//                 {material}
//               </>
//             ) : (
//               material
//             )}
//           </Menu.Item>
//         );
//       })}
//     </SubMenu>
//   );
// };
// export default FilterSubmenu;
