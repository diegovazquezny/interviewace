const APIURL = process.env.NODE_ENV !== 'development' 
  ? 'https://interview-ace.herokuapp.com'
  : '';

export default APIURL;