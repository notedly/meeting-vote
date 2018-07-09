import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

class VotingContainer extends Component {
	constructor( props ){
		super( props ) ;

		let infoSummary = JSON.parse( localStorage.getItem('meetSummary') )
		,	 infoDays = JSON.parse( localStorage.getItem('meetDays') )
		, 	 infoDaysOrigin = JSON.parse( localStorage.getItem('meetDaysOrigin') )
		,	 infoEmail = JSON.parse( localStorage.getItem('meetEmail') ) ;

		console.log( infoSummary ) ;
		console.log( infoDays ) ;
		console.log( infoEmail ) ;

		this.state = {
			name : null ,
			title : null ,
			loc : null ,
			memo : null ,
			meetDays : null ,
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
		}

		if( infoEmail ) {
			this.state.meetEmail = infoEmail ;
		}

	}
	render () {

		let dateFieldProps = {
			days : this.state.meetDays
		},
		makeChkField = ( mail , idx ) => {
			let props = {
				key : `chk${idx}` ,
				options : {
					email : mail ,
					days : this.state.meetDays
				}
			}
			return <MakeCheckField {...props} />
		}

		return (
			<div className="wrap">
				<h1>{this.state.title + '날짜 투표!'}</h1>
				<p>{this.state.memo}</p>
				<table className="tb_voting">
					<MakeDateField {...dateFieldProps} />
					<tbody>
						{this.state.meetEmail.map( makeChkField )}
					</tbody>
				</table>
			</div>
		)
	}
}

class MakeDateField extends Component {
	constructor( props ) {
		super( props ) ;
		console.log( this.props )
	}
	makeDaysMarkup( item, idx ) {
		return <th scope="col" key={idx}>
			{
				item.month + 1 + '월 '
				+ item.date + '일'
				+ '(' + item.day + ')'
			}
		</th>
	}
	render(){
		return(
			<thead>
				<tr>
					<th scope="col">날짜!</th>
					{this.props.days.map( this.makeDaysMarkup, this )}
				</tr>
			</thead>
		)
	}
}

class MakeCheckField extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			chk : false ,
			chkArr : [ true, false, false ]
		}

		this.handleChkChange = this.handleChkChange.bind(this);
	}

	handleChkChange( event ) {
		console.log('chk in') ;
		console.log( event.target.checked ) ;
	}

	makeChkbox( item, idx ){
		return (
			<td key={idx}>
				<input type="checkbox" onChange={this.handleChkChange} />
			</td>
		)
	}

	render(){
		let opts = this.props.options ;
		return(
			<tr>
				<td>{opts.email}</td>
				{opts.days.map( this.makeChkbox, this )}
			</tr>
		)
	}
}



window.addEventListener( 'load' , () => {
	let meetContainer = document.createElement( 'div' ) ;
	meetContainer.classList.add( 'wrapBox') ;
	render( <VotingContainer /> , meetContainer ) ;
	document.body.appendChild( meetContainer ) ;
}) ;