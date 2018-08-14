import React from 'react'


class ComponentePaciente extends React.Component {
	constructor(props) {
		super(props)
		this.llamar = this.llamar.bind(this);


	}

	llamar() {
		this.props.handleVerDetalles(this.props.pos)
	}




	render() {
		return <li>
					<span className="pos tab-col1">#{this.props.pos}</span>
					<span className="sip tab-col2">{this.props.sip}</span> 
					<span className="nombre tab-col3">{this.props.nombre}</span> 
					<span className="apellidos tab-col4">{this.props.apellidos}</span>
					<a className="button-call tab-col5">Call</a>
					<div className="clear"></div>
				</li>
	}
}

export default ComponentePaciente