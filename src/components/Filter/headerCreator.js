import data from 'components/Filter/filterData';

export const headerCreator = (activeFilters, upper_izd) => {
  let headers = activeFilters;
  let res_materials = activeFilters['materials'];
  // let izdelie = upper_izd;
  let colors = [];
  let countries = [];
  let obrabotka = [];
  let thickness = [];
  let sklad = [];


  // if (
  //   typeof headers['izdelie'] !== 'undefined' &&
  //   headers['izdelie'].length > 0
  // )
  //   izdelie = headers.izdelie;
  if (typeof headers['colors'] !== 'undefined' && headers['colors'].length > 0)
    colors = headers.colors;
  if (
    typeof headers['countries'] !== 'undefined' &&
    headers['countries'].length > 0
  )
    countries = headers.countries;
  if (
    typeof headers['obrabotka'] !== 'undefined' &&
    headers['obrabotka'].length > 0
  )
    obrabotka = headers.obrabotka;
  if (
    typeof headers['thickness'] !== 'undefined' &&
    headers['thickness'].length > 0
  )
    thickness = headers.thickness;
  if (typeof headers['sklad'] !== 'undefined' && headers['sklad'].length > 0)
    sklad = headers.sklad;

  return {
    materials: res_materials,
    colors: colors,
    countries: countries,
    izdelie: upper_izd,
    obrabotka: obrabotka,
    thickness: thickness,
    sklad: sklad
  };
};
headerCreator;
