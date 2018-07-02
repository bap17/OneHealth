//Este es el "archivo inicial" tal y como está configurado en webpack
//La ejecución de js comenzaría por aquí.
//importamos los componentes y los pintamos en el HTML con ReactDOM.render

import React from 'react'
import ReactDOM from 'react-dom'  
//Al ser un export default, al importarlo podemos cambiarle el nombre
//import Saludo from './ComponenteSaludo'
import Connect from './ComponenteConnect'

/*ReactDOM.render(<Saludo nombre="Pepe"/>
            , document.getElementById('componente'));  */

ReactDOM.render(<Connect />, document.getElementById('componente')); 


