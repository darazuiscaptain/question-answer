export default class Auth {
   static setLogin(lo){
        localStorage.setItem('auth', lo);
    }
}