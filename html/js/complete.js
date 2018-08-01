import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

class CompleteContainer extends Component {
	render () {
		return (
			<div className="complete layer">
				<h1>전송을 완료했습니다.</h1>
				<div className="btn_area">
					<a href="/voting?page=result" className="btn bot">투표 현황보러가기</a>
				</div>
			</div>
		) ;
	}
}

window.addEventListener( 'load' , () => {
	let elem_blogContainer = document.createElement( 'div' ) ;
	elem_blogContainer.classList.add( 'wrapBox') ;
	render( <CompleteContainer /> , elem_blogContainer ) ;
	document.body.appendChild( elem_blogContainer ) ;
}) ;