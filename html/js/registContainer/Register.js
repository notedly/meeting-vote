import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class Register {
	constructor() {

	}

	getParameter( strParamName ){
		/**
		@strParamName : 주소에서 가져올 파라메타 속성
		*/
		var strURL = location.search
		,	 tmpParam = strURL.substring(1).split("&");

		if(strURL.substring(1).length > 0){
			var Params = new Array;
			for(var i=0;i<tmpParam.length;i++){
				Params = tmpParam[i].split("=");
				if(strParamName == Params[0]){
					return Params[1];
				}
			}
		}
		return "";
	}

	pageMove( dir ){
		/**
		@dir : 페이지 이동할 방향(PREV or NEXT)
		*/
		let pageUrl = '/register?step='
		,	 crntPage = Number( this.getParameter('step') )
		,	 direction = dir.toUpperCase()
		,	 resultPage = null
		, 	 lastPage = 3 ;

		if( direction === 'PREV' ) {
			crntPage -- ;
			if( crntPage < 1 ) {
				resultPage = '/' ;
			}else{
				resultPage = pageUrl+crntPage ;
			}
		}else{
			crntPage ++ ;
			if( crntPage > lastPage ) {
				// 완료 페이지 이동
				resultPage = '/complete'
			}
			resultPage = pageUrl+crntPage ;
		}
		location.href = resultPage ;
	}


}
export default Register ;