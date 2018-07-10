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
			meetEmail : null ,
			chkArr : this.setChkArr( infoDays , infoEmail )
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



	componentDidMount(){
		console.log( 'this.state.chkArr : ', this.state.chkArr ) ;
	}

	componentDidUpdate(){
		console.log( 'componentDidUpdate :', this.state.chkArr ) ;
		this.watchChkArr() ;
	}

	watchChkArr() {
		let crntChkArr = this.state.chkArr ;
		console.log( 'watchChkArr in------> ', crntChkArr ) ;
		/*let result = crntChkArr.filter((item, idx) => {
			console.log( item ) ;
		}) ;*/

		/*let result = crntChkArr.map((item) => {
			return item.reduce((a, b) => a+b) ;
		}, []) ;
		console.log( result ) ;*/
		/*let result = crntChkArr.map((item, idx) => item[idx] ) ;
		console.log( 'result :', result ) ;*/

		/*let result = [] ;
		result = crntChkArr.map((item, idx) => {

		}) ;
		console.log( result ) ;*/

	}

	setChkArr( days, email ){
		let daysLen = days.length
		,	 personLen = email.length ;

		return Array.from({ length : personLen }, v=> []).map( item => Array.from({ length : daysLen}, v => 0)) ;

	}

	handleChkChange = ( n1, n2 ) => {
		let crntChkArr = this.state.chkArr ;
		crntChkArr[n1][n2] = !crntChkArr[n1][n2] * 1;
		this.setState({
			chkArr : crntChkArr
		}) ;
	}

	render () {

		let dateFieldProps = {
			days : this.state.meetDays
		},
		makeChkField = ( mail , idx ) => {
			let props = {
				key : `chk${idx}` ,
				options : {
					no : `row${idx}` ,
					email : mail ,
					days : this.state.meetDays
				} ,
				handler : this.handleChkChange
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
				<div className="btn_area">
					<a href="#;" className="btn">선택 완료</a>
				</div>
				{/*<div className="result">
					<p>최종 선택된 날짜는 <span>------</span>입니다.</p>
				</div>*/}
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
		let tg = event.target
		,	 tgParent = tg.closest('tr')
		,	 tgChkRow = tgParent.getAttribute('data-chk-row')
		, 	 allChk = tgParent.querySelectorAll('input')
		,	 crntIdx = [].indexOf.call( allChk, tg ) ;


		/* 넘겨야할 정보는
		현재 클릭한 chk의 인덱스(자기 그룹안에서)
		현재 클릭한 부모의 인덱스
		이중배열 접근을 위해서임. */

		this.props.handler( Number( tgChkRow.slice(3) ) , crntIdx ) ;
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
			<tr data-chk-row={this.props.options.no}>
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