import store from './Store';
import axios from 'axios';

export const serviceCall=(url,params)=>{
    return new Promise((success,failed)=>{
        let headers={
            'Content-Type':'application/json',
            'Accept':'application/json'
        }

        const config = {
            method:'POST',
            url,
            headers,
            params
        }
        axios.create({
            baseURL:'http://162.250.120.20:444/Login/',
            timeout:45000,
        })(config)
        .then((response)=>{
            const {data,status} = response;
            if(status===200){
                try{
                    return data;
                }catch(e){
                    throw{status,message:e}
                }
            }else{
                throw{status,message:e}
            }
        })
        .then(response=>{
            success(response);
        }).catch(err=>{
            failed(err)
        })
    })
}