import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

/*
	STEP 01
	Title , Location , Memo
*/
class RegistStep01 extends Component {
	constructor( props ) {
		super( props ) ;

		let loadDate = JSON.parse( localStorage.getItem('meetSummary') ) ;
		this.state = loadDate || { name : '' , title : '' , loc : '' , memo : ''} ;

	}

	handleInputChange( targetName, event ) {
		switch( targetName ) {
			case 'name' :
				this.setState({ name : event.target.value }) ;
				break ;
			case 'title' :
				this.setState({ title : event.target.value }) ;
				break ;
			case 'location' :
				this.setState({ loc : event.target.value }) ;
				break ;
			case 'memo' :
				this.setState({ memo : event.target.value }) ;
				break ;
		}
	}


	nextBtnClickHandler( event ){

		/*
			1. 입력한 값 체크( 필수항목 입력되있는 지? )
			2. 입력한 값 로컬 스토리지에 저장
			3. step02 페이지로 이동
		*/
		event.preventDefault() ;

		let { name, title, loc , memo } = this.state
		,	 nextUrl = event.target.getAttribute('href') ;

		console.log( nextUrl ) ;

		if( name === '' ) {
			alert( '이름을 적어주세요.' ) ;
		}else if( title === '' ){
			alert( '제목을 적어주세요.' ) ;
		}else{

			let meetSummary = { name, title, loc, memo } ;

			let saveData = new Promise((resolve, reject) => {
				// 입력한 정보 로컬스토리지에 저장
				localStorage.setItem( 'meetSummary' , JSON.stringify( meetSummary ) ) ;
				resolve('Success!') ;
			});

			saveData.then((successMessage) => {
				// STEP02 페이지로 이동
				console.log("Yay! " + successMessage);
				location.href = nextUrl ;
			});
		}

	}

	render () {
		return (
			<div className="wrap_register">
				<div className="title"><h1>STEP 01. 무슨 모임이야?</h1></div>
				<div className="form">

					<div className="ct">
						<ul>
							<li>
								<label>주최자 : <input type="text" onChange={this.handleInputChange.bind(this, 'name')} value={this.state.name} /></label>
							</li>
							<li>
								<label>모임명 : <input type="text" onChange={this.handleInputChange.bind(this, 'title')} value={this.state.title} /></label>
							</li>
							<li>
								<label>위치 : <input type="text" onChange={this.handleInputChange.bind(this, 'location')} value={this.state.loc} /></label>
							</li>
							<li>
								<label>메모 : <textarea onChange={this.handleInputChange.bind(this, 'memo')} value={this.state.memo}></textarea></label>
							</li>
						</ul>
					</div>

				</div>
				<div className="btn_area">
					<a href="/register?step=02" className="btn" onClick={this.nextBtnClickHandler.bind(this)}>다음</a>
				</div>
			</div>
		) ;
	}
}

export { RegistStep01 } ;