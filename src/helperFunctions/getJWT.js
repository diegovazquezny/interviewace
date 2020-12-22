let JWT = null;
document.cookie.split(' ').forEach(cookie => {
  if (cookie.split('=')[0] === 'JWT') JWT = cookie.split('=')[1];
});
//console.log('helper', JWT);

export default JWT;