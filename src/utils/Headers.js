const token = JSON.parse(localStorage.getItem('token'));

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_HOSTNAME,
    Authorization: 'Bearer ' + token,
    'Access-Control-Allow-Methods': 'DELETE, POST, GET,PUT, PATCH',
    'Access-Control-Allow-Headers':
      'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
  };
};

export { getHeaders };
