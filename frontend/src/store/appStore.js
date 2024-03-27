/* The above code is defining a Pinia store named 'app' using the composition API in Vue.js. It
includes state properties, actions, and methods to fetch data from various API endpoints related to
weather and environmental data. */
import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useAppStore =  defineStore('app', ()=>{

    /*  
    The composition API way of defining a Pinia store
    ref() s become state properties
    computed() s become getters
    function() s become actions  
    */ 

    // STATES 

    const getAllInRange = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/station/get/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getAllInRange returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
  
            console.error('getAllInRange error:', err.message);
        }
        return []
    }
  

    const getFreqDistro = async (variable, start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/frequency/${variable}/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getFreqDistro returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getFreqDistro error: ', err.message);
        }
        return []
    }   

    
    
 

   const getUpdateData= async (data) => {
       const controller = new AbortController();
       const signal = controller.signal;
       const id= setTimeout(() => controller.abort(), 60000);
       const URL= '/api/update';

         try {
                const response = await fetch(URL, {
                    method: 'POST',
                    signal: signal,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                console.log(result);
                clearTimeout(id);
                return result;
            } catch (error) {
                console.log(error);
                clearTimeout(id);
                return {status: 'getUpdatedata error', message: error.message};
            }
            return [];
    }
  
    const getTemperatureMMAR = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/mmar/temperature/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getTemperatureMMAR returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getTemperatureMMAR error: ', err.message);
        }
        return []
    }
  
  
  
    const getHumidityMMAR = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/mmar/humidity/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getHumidityMMAR returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getHumidityMMAR error: ', err.message);
        }
        return []
    }

    const getSoilMMAR = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/mmar/soil/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getSoilMMAR returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getSoilMMAR error: ', err.message);
        }
        return []
    }
  
  
    const getPressureMMAR = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/mmar/pressure/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getPressureMMAR returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getPressureMMAR error: ', err.message);
        }
        return []
    }

    const getAltitudeMMAR = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/mmar/altitude/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getAltitudeMMAR returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('getAltitudeMMAR error: ', err.message);
        }
        return []
    }   


    // ACTIONS
 
   
 
 
    return { 
    // EXPORTS	
    getAllInRange,
    getUpdateData,
    getTemperatureMMAR,
    getHumidityMMAR,
    getAltitudeMMAR,
    getPressureMMAR,
    getSoilMMAR,
    getFreqDistro,
   }
},{ persist: true  });



