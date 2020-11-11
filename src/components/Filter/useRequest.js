// import { connect } from 'react-redux';
// import React from 'react';
// import axios from 'axios';
// import axiosActions from 'actions/axiosActions';

// const useRequest = url => {
//   // const [state, dispatch] = React.useState(axios_data);

//   React.useEffect(() => {
//     const source = axios.CancelToken.source();
//     axios
//       .get(url, {
//         cancelToken: source.token
//       })
//       .then(response => {
//         setResponseData({ type: 'fetched', payload: response.data });
//       })
//       .catch(error => {
//         setResponseData({ type: 'error', payload: error });
//       });
//     return source.cancel;
//   }, [url]);

//   return axios_data;
// };

// const mapStateToProps = store => {
//   return {
//     axios_data: store.axios_data
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setResponseData: ({ type, payload }) => {
//       dispatch(axiosActions.setResponseData({ type, payload }));
//     }
//   };
// };


