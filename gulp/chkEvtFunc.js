let chkEvtFunc = ( evt , path ) => {
	console.log( '\n\n======================================\ncheck event , path\n----------------------------' ) ; 
	console.log( `evt : ${evt} | path : ${path}` ) ; 
	/* '\\' 경로일 경우 gulp의 dest 명령시 선택된 파일이 복제되는것이아닌 
	선택된 파일을 포함하고있는 경로상의 폴더까지 복제되기 때문에 
	cmd 경로 '\\' 를 js 경로 '/' 로 변경합니다. */

	/**
	@newPath : 전달받은 경로를 \\ 가 아닌 / 로 변경한 새로문 문자열 
	@bln : 파일의 존재 유무 
	@delPath : 삭제되어야할 파일 경로 
	*/
	let [ newPath , bln , delPath ] = [ 
		path.replace( /\\/g , '/' ) , 
		true , 
		null 
	] ; 

	// console.log( 'newPath : ' , newPath ) ; 
	switch( evt ) {
		case 'change' : 
			break ; 
		case 'add' : 
			break ; 
		case 'unlink' : 
			bln = false ; 
			break ; 
		default : break ; 
	} 

	if ( !bln ) {
		/*이벤트 타입이 삭제인 경우 빌드폴더에 있는 해당 파일을 삭제합니다.*/
		delPath = newPath.replace( /^html/ , DIR.DEST ) ; 
		if ( fs.existsSync( delPath ) ) {
			fs.unlink( delPath ) ; 
		} else {
			console.log( 'not exists file' ) ; 
		}
	}
	console.log( '======================================\n\n' ) ; 
	return {
		path : newPath , 
		bln : bln , 
	}
} ; 

export default chkEvtFunc ; 