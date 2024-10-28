import { log } from 'console';
import { decode as jwtDecode} from 'jwt-decode';
import type { JwtPayload }  from 'jwt-decode';
import userData  from '../interfaces/userData';

class Auth {
    getProfile() {
        return jwtDecode<userData>(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.exp < Date.now() / 1000) {
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

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new Auth();
