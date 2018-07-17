import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import VoteDateField from '../include/voteDateField' ;
import VoteCheckField from '../include/voteCheckField' ;

class VoteResult extends Component {
	constructor( props ) {
		super( props ) ;
		console.log( '[voteResult.js] 전달 받은 참여자 정보 : ', this.props.personData ) ;
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
			<div className="wrap">
				<h1>{this.props.title + '날짜 투표!'}</h1>
				<p>{this.props.memo}</p>
				<table className="tb_voting">
					<VoteDateField {...dateFieldProps} />
					<VoteCheckField {...personFieldProps} />
				</table>
			</div>
		)
	}
}

export default VoteResult ;

/*
<table className="tb_voting">
	<VoteDateField {...dateFieldProps} />
	<tbody>
		<VoteCheckField {...personFieldProps} />
	</tbody>
</table>
<div className="btn_area">
	<a href="#;" className="btn" onClick={this.sltCompleteHandler.bind(this)}>선택 완료</a>
</div>
*/