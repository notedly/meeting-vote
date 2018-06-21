import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

/*
	STEP 02
	날짜 , 참여자
*/
class RegistStep02 extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			meetInfo : JSON.parse( localStorage.getItem('meetInfo') )
		}
		console.log( this.state.meetInfo ) ;
	}

	handleTitleChange(){

	}

	render(){
		return(
			<div className="wrap_register">
				<div className="title"><h1>RegistStep02</h1></div>
				<div className="form">

					<div className="ct">
						<ul>
							<li>
								<button type="button">날짜선택</button>
							</li>
							<li>
								<label>참여자 : </label>
								<ul>
									<li>
										<input type="text" />
										<span className="btn_area">
											<button type="button">추가</button>
										</span>
									</li>
								</ul>
							</li>
						</ul>
					</div>

				</div>
				<div className="btn_area">
					<a href="/register?step=01" className="btn">이전</a>
					<a href="/register?step=03" className="btn">다음</a>
				</div>
			</div>
		)
	}
}

export { RegistStep02 } ;
