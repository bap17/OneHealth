import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class ComponentePaciente extends React.Component {
	constructor(props) {
		super(props)
		this.llamar = this.llamar.bind(this);


	}

	llamar() {
		this.props.handlellamar(this.props.id)
	}




	render() {
		return <li>
					<span className="pos tab-col1"><FontAwesomeIcon icon="circle" className="connect"/>{/*#{this.props.pos}*/}</span>
					<span className="sip tab-col2">{this.props.sip}</span> 
					<span className="nombre tab-col3">{this.props.nombre}</span> 
					<span className="apellidos tab-col4">{this.props.apellidos}</span>
					<a className=" tab-col5"><FontAwesomeIcon icon="phone" className="button-phone" onClick={this.llamar}/></a>
					<div className="clear"></div>
				</li>
	}
}

export default ComponentePaciente