import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { RegisterSummary } from './registContainer/registerSummary' ;
import { RegisterDetail } from './registContainer/registerDetail' ;
import { RegisterPreview } from './registContainer/registerPreview' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

class RegisterContainer extends Component {
	constructor( props ){
		super( props ) ;


		let infoSummary = JSON.parse( localStorage.getItem('meetSummary') )
		,	 infoDays = JSON.parse( localStorage.getItem('meetDays') )
		, 	 infoDaysOrigin = JSON.parse( localStorage.getItem('meetDaysOrigin') )
		,	 infoEmail = JSON.parse( localStorage.getItem('meetEmail') ) ;

		this.state = {
			pageStep : this.getParameter('step') ,
			name : null ,
			title : null ,
			loc : null ,
			memo : null ,
			meetDays : null ,
			meetDaysOrigin : null ,
			meetEmail : null
		}

		if( infoSummary ) {
			this.state.name = infoSummary.name ;
			this.state.title = infoSummary.title ;
			this.state.loc = infoSummary.loc ;
			this.state.memo = infoSummary.memo ;
		}

		if( infoDays ) {
			this.state.meetDays = infoDays ;
			this.state.meetDaysOrigin = infoDaysOrigin ;
		}

		if( infoEmail ) {
			this.state.meetEmail = infoEmail ;
		}

		console.log( 'infoDaysOrigin : ', infoDaysOrigin ) ;

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

	/*

		아래 스위치문을 위에서 처리해서 값 하나만 넘긴다?
		render(){
			return(
				valiable
			)
		}

	*/

	update = ( data ) => {
		localStorage.setItem( 'meetSummary' , JSON.stringify( data ) ) ;
		return true ;
	}

	validationChk = ( data ) => {

		let { name , title, loc, memo } = data;

		if ( name == '' || name == undefined ) {
			alert( '주최자를 적어주세요.' ) ;
			this.registerContents.nameInput.focus() ;
			return false;
		}
		if ( title == '' || title == undefined ) {
			alert( '모임명을 적어주세요.' ) ;
			this.registerContents.titleInput.focus() ;
			return false;
		}

		return this.update( data );

	}

	goToNextStep = ( data ) => {

		let chk = this.validationChk( data ) ;
		if( chk ) {
			location.href = '/register?step=02' ;
		}

	}

	render () {

		let regSummaryProps = {
			name : this.state.name ,
			title : this.state.title ,
			loc : this.state.loc ,
			memo : this.state.memo ,
			goToNextStep : this.goToNextStep ,
			ref : registerContents => this.registerContents = registerContents
		}

		let regDetailProps = {
			meetDays : this.state.meetDays ,
			meetDaysOrigin : this.state.meetDaysOrigin ,
			meetEmail : this.state.meetEmail ,
		}

		let regPreviewProps = {
			name : this.state.name ,
			title : this.state.title ,
			loc : this.state.loc ,
			memo : this.state.memo ,
			meetDays : this.state.meetDays ,
			meetEmail : this.state.meetEmail ,
		}

		switch( this.state.pageStep ){
			case '01' :
				return ( <RegisterSummary {...regSummaryProps} /> ) ;
			break ;
			case '02' :
				return ( <RegisterDetail {...regDetailProps} /> ) ;
			break ;
			case '03' :
				return ( <RegisterPreview {...regPreviewProps} /> ) ;
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