import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import VoteDateField from '../include/voteDateField' ;
import VoteCheckField from '../include/voteCheckField' ;

class VoteResult extends Component {
	constructor( props ) {
		super( props ) ;

		console.log( '[voteResult.js] Props : ', this.props ) ;
		console.log( '[voteResult.js] 전달 받은 참여자 정보 : ', this.props.personData ) ;


		this.state = {
			chkArrDays : [] ,
			resultDay : null
		}


		let day = [ '일', '월', '화', '수', '목', '금', '토' ] ;


		let getChkDays = this.props.personData.map( item => item.checkedDays ).reduce((a ,b) => a.concat( b ), []) ;


		let sortChkDays = this.props.days.map( item => {
			return {
				day : item.no ,
				count : getChkDays.filter( elem => elem == item.no ).length
			} ;
		}) ;

		let result = sortChkDays.filter( item => item.count == this.props.personData.length ) ;
		if( result.length > 0 ){
			result = new Date( result[0].day ) ;
			this.state.resultDay =  ( result.getMonth() + 1 ) + '월 ' + result.getDate() + '일 ' + day[ result.getDay() ] + '요일';
		}else{
			this.state.resultDay = '미정' ;
		}


		console.log( 'sortChkDays =============> ', sortChkDays ) ;
		console.log( 'this.state.resultDay =============> ', this.state.resultDay ) ;


		// console.log( '[voteResult.js] getChkDays : ', getChkDays ) ;
		// console.log( '[voteResult.js] daysAll : ', this.props.days ) ;


	}

	render(){

		let dateFieldProps = {
			days : this.props.days
		} ,
		personFieldProps = {
			personData : this.props.personData ,
			days : this.props.days ,
			checkedDays : this.props.checkedDays ,
			handler : this.props.handler
		} ;

		return(
			<div className="vote">
				<h1>{this.props.title + '날짜 투표!'}</h1>
				<p>{this.props.memo}</p>
				<table className="tb_voting">
					<VoteDateField {...dateFieldProps} />
					<VoteCheckField {...personFieldProps} />
				</table>
				<div className="txt_result">
					투표 결과
					<span>{this.state.resultDay}</span>
				</div>
			</div>
		)
	}
}

export default VoteResult ;
