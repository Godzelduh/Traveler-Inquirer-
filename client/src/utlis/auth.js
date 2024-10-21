import { log } from 'console';
import {type JwtPayload, jwtDecode } from 'jwt-decode';
import{ UserData} from '../interfafces/userData';

class Auth{
    getProfile() {
        return jwtDecode<UserData>(this.getToken());
    }

   loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
   }

   isTokenExpired(token) {
       try {
           const decoded = jwtDecode<JwtPayload>(token);
           if(decoded.exp < Date.now() / 1000) {
               return true;
           } else return false;
       } catch (err) {
           return false;
       }
   }


getToken() {
   const loggedUser = localStorage.getItem('id_token');
   return loggedUser;
}

Login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
}

logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
}
}

export default new Auth;
