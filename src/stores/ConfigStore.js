import { defineStore } from "pinia";

export const useConfigStore = defineStore('configStore', {
    state: () => ({
        theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'auto',
        region: localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
    }),
    actions: {
        setConfig(key, value){
            localStorage.setItem(key, value);
            this[key] = value;
        }
    }
});