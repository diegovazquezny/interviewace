const APIURL = process.env.NODE_ENV !== 'development' 
  ? 'https://tech-notes-app.herokuapp.com/'
  : '';

export default APIURL;