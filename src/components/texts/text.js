import React from 'react';

const Texto = () =>{
    return(
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <textarea placeholder="Ingresar texto" rows="20" cols="105"/><br/>
                <button id="x" class="btn btn-primary">Guardar</button>
                <button id="x" class="btn btn-primary">Cancelar</button>
            </div>
            <div class="col-lg-2">
            </div>
        </div>            
    )//React router
}

export default Texto