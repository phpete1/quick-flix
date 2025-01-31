export default class Settings{
    defaults(){
        return {
            theme: 'auto',
            region: 'GB'
        }
    }

    getDefault(key){
        return this.defaults()[key];
    }

    set(key, value){
        localStorage.setItem(key, value);     
        return true;   
    }
    
    get(key){
        if(localStorage.getItem(key) !== null){
            return localStorage.getItem(key);
        }else{
            return this.getDefault(key);
        }
    }

}