import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { TopTitle } from '../include/title' ;

/*
	STEP 01
	Title , Location , Memo
*/
class RegistStep03 extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			meetTotal : this.props.meetEmail.length
		}
	}

	daysListMakeHandler( days, idx ){
		return(
			<li key={idx}>{days.month + 1 + '월 ' + days.date + '일 (' + days.day + '요일)'}</li>
		)
	}

	emailListMakeHandler( email, idx ){
		return(
			<li key={idx}>{email}</li>
		)
	}

	render () {

		let topTitleProps = {
			text : 'STEP 03. 미리보기'
		}

		return (
			<div className="wrap_register preview">
				<TopTitle {...topTitleProps} />

				<div className="top">
					<h2>{this.props.title}</h2>
				</div>

				<dl className="contents">
					<dt>주최자</dt>
					<dd>{this.props.name}</dd>
					<dt>모임 투표 날짜</dt>
					<dd>
						<ul className="lst_preview">
							{this.props.meetDays.map( this.daysListMakeHandler , this )}
						</ul>
					</dd>
					<dt>모임 참여자(<span>총 {this.state.meetTotal}명</span>)</dt>
					<dd>
						<ul className="lst_preview">
							{this.props.meetEmail.map( this.emailListMakeHandler , this )}
						</ul>
					</dd>
					<dt>모임 장소</dt>
					<dd>{this.props.loc}</dd>
					<dt>추가 내용</dt>
					<dd>{this.props.memo}</dd>
				</dl>

				<div className="btn_area">
					<a href="/register?step=02" className="btn">이전</a>
					<a href="#;" className="btn">완료</a>
				</div>

			</div>
		) ;
	}
}

export { RegistStep03 } ;