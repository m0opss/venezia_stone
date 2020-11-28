import data from 'components/Filter/filterData';

export const headerCreator = (activeFilters, upper_izd, cur, cost, le, he) => {
  let headers = activeFilters;
  let res_materials = activeFilters['materials']
    ? activeFilters['materials']
    : [];
  let colors = [];
  let countries = [];
  let obrabotka = [];
  let thickness = [];
  let sklad = [];
  let le_max = le[1] != null ? [le[0]] : [];
  let le_min = he[0] != null ? [le[1]] : [];
  let he_max = he[1] != null ? [he[0]] : [];
  let he_min = le[0] != null ? [he[1]] : [];
  let cnt_min = cost[0] != null ? [cost[0]] : [];
  let cnt_max = cost[1] != null ? [cost[1]] : [];

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
    sklad: sklad,
    cnt: [cur],
    cnt_min: cnt_min,
    cnt_max: cnt_max,
    le_min: le_max,
    le_max: le_min,
    he_min: he_max,
    he_max: he_min
  };
};
headerCreator;
