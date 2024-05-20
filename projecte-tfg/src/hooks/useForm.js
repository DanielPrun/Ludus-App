import { useState } from 'react';

export const useForm = (inicial = {}) => {
  
    const [formulari, setFormulari] = useState(inicial);

    const serializeForm = (formulari) => {
        const formData = new FormData(formulari);
        const obj = {};

        for(let [name, value] of formData){
            obj[name] = value;
        }

        return obj;
    }

    const enviat = (e) => {
        e.preventDefault();

        let dades = serializeForm(e.target);
        setFormulari(dades);
    }

    const canviat = (e) => {
       
        if(!e.target){
            //quan es el select
            const {label, value} = e;
            setFormulari({
                ...formulari,
                ["tag"]: value
            });
        }
        else{
            const {name, value} = e.target;
            setFormulari({
                ...formulari,
                [name]: value
            });
        }
    }

    return {
        formulari,
        enviat,
        canviat
    }
}
