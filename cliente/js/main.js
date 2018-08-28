import React from 'react'
import ReactDOM from 'react-dom'  
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faPhone, faCircle, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faSyncAlt)
library.add(faPhone)
library.add(faCircle)
library.add(faTrashAlt)
library.add(faInfoCircle)


import Connect from './ComponenteConnect'
import Inicio from './ComponenteInicio'
import Index from './ComponenteIndex'



/*ReactDOM.render(<Saludo nombre="Pepe"/>
            , document.getElementById('componente'));  */

//ReactDOM.render(<Connect />, document.getElementById('componente')); 


//ReactDOM.render(<Inicio />, document.getElementById('componente')); 

ReactDOM.render(<Index />, document.getElementById('componente')); 

