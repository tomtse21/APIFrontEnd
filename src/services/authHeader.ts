export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    if(true){
    // if (user && user.accessToken) {
      return { 'Authorization': `Basic ${localStorage.getItem('atoken')}` }; 

    } else {
      return { 'Authorization': '' }; 

    }
  }
