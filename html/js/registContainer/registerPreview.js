import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { TopTitle } from '../include/title' ;
import { BtnWrap } from '../include/btnWrap' ;
import Register from './Register' ;

/*
	STEP 01
	Title , Location , Memo
*/
class RegisterPreview extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			meetTotal : this.props.meetPerson.length
		}

		this.register = new Register ;

		this.btns = [
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '이전' ,
				class : 'btn bot' ,
				handler : () => this.register.pageMove('prev')
			} ,
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '완료' ,
				class : 'btn bot' ,
				handler : () => this.props.registerComplete()
			}
		] ;

		console.log( this.props ) ;
	}

	daysListMakeHandler( days, idx ){
		return(
			<li key={idx}>{days.month + 1 + '월 ' + days.date + '일 (' + days.day + '요일)'}</li>
		)
	}

	emailListMakeHandler( person, idx ){
		return(
			<li key={idx}>
				<strong>{person.name}</strong>
				<span>{person.email}</span>
			</li>
		)
	}

	render () {

		let topTitleProps = {
			text : '작성된 내용을 최종적으로 확인하세요.' ,
			subText : '3단계 확인'
		}
		, previewInfo = this.props
		, makeBtns = ( btn, idx ) => {
			let props = {
				key : `btn${idx}` ,
				options : {
					type : btn.type ,
					href : btn.href ,
					label : btn.label ,
					onClick : btn.handler ,
					class : btn.class
				}
			}
			return <BtnWrap {...props} />
		} ;

		return (
			<div className="wrap_register preview">
				<TopTitle {...topTitleProps} />

				<dl className="contents">
					<dt>모임명</dt>
					<dd>{previewInfo.title}</dd>
					<dt>주최자</dt>
					<dd>{previewInfo.name}</dd>
					<dt>모임 장소</dt>
					<dd>{previewInfo.loc}</dd>
					<dt>모임 투표 날짜</dt>
					<dd>
						<ul className="lst_preview">
							{previewInfo.meetDays.map( this.daysListMakeHandler , this )}
						</ul>
					</dd>
					<dt>모임 참여자(<span>총 {this.state.meetTotal}명</span>)</dt>
					<dd>
						<ul className="lst_preview">
							{previewInfo.meetPerson.map( this.emailListMakeHandler , this )}
						</ul>
					</dd>
					<dt>추가 내용</dt>
					<dd>{previewInfo.memo}</dd>
				</dl>

				<div className="btn_area">
					{ this.btns.map( makeBtns ) }
				</div>

			</div>
		) ;
	}
}

export { RegisterPreview } ;