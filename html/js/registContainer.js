import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { RegistStep01 } from './registContainer/registStep01' ;
import { RegistStep02 } from './registContainer/registStep02' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

class RegisterContainer extends Component {
	constructor( props ){
		super( props ) ;

		this.state = {
			pageStep : this.getParameter('step')
		}

	}

	getParameter( strParamName ){
		var strURL = location.search
		,	 tmpParam = strURL.substring(1).split("&");

		if(strURL.substring(1).length > 0){
			var Params = new Array;
			for(var i=0;i<tmpParam.length;i++){
				Params = tmpParam[i].split("=");
				if(strParamName == Params[0]){
					return Params[1];
				}
			}
		}
		return "";
	}

	render () {

		switch( this.state.pageStep ){
			case '01' :
				return ( <RegistStep01 /> ) ;
			break ;
			case '02' :
				return ( <RegistStep02 /> ) ;
			break ;
		}


	}
}

window.addEventListener( 'load' , () => {
	let meetContainer = document.createElement( 'div' ) ;
	meetContainer.classList.add( 'wrapBox') ;
	render( <RegisterContainer /> , meetContainer ) ;
	document.body.appendChild( meetContainer ) ;
}) ;