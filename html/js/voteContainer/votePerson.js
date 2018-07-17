import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import VoteDateField from '../include/voteDateField' ;
import VoteCheckField from '../include/voteCheckField' ;

class VotePerson extends Component {
	constructor( props ) {
		super( props ) ;
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
				<div className="btn_area">
					<a href="#;" className="btn" onClick={this.props.sltCompleteHandler.bind(this)}>선택 완료</a>
				</div>
			</div>
		)
	}
}

export default VotePerson ;

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