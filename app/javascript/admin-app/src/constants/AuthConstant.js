export const AUTH_TOKEN = 'auth_token'

const userIsLogged = () => {
  const  token = localStorage.getItem('token');

  if(!token) {
      return false
  }

  const decodedToken = decodeJWT(token);
  const userId = decodedToken.user_id

  return { isUserLogged: !!userId, userId, token }
}

function decodeJWT(token){
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export {
  userIsLogged
}