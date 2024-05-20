export const Global =  {
    url: "http://localhost:3900/api/"
};


export const Ajax = async(url, metode, dadesGuardar = "", files = false) => {
  
    let cargant = true;

    let params = {
        method: metode
    }
    
    if(metode == "POST" || metode == "PUT"){

        if(files){
            params["body"] = dadesGuardar;
        }else{
            params["body"] = JSON.stringify(dadesGuardar);
            params["headers"] = { "Content-Type" : "application/json"} 
        }
    }
    
    let peticio = await fetch(url, params);
    let dades = await peticio.json();
    
    cargant = false;

    return {
        dades,
        cargant
    }
}

export const getTags = async () => {
    const {dades} = await Ajax(Global.url+"articles", "GET");
    let Tags = [];
    
    if(dades.status === "success"){
        //posem al estat tags totes les categories menys null, u
        const uniqueTags = {};
        
        Tags = (dades.articles
            .filter(objeto => objeto.tag !== 'null')
            .map(objeto => {
            if(!uniqueTags[objeto.tag]){
                uniqueTags[objeto.tag] = true;
                return {
                value: objeto.tag,
                label: objeto.tag
                }
            }
            })
            .filter(element => element !== undefined));
    }
    
    return Tags;
}