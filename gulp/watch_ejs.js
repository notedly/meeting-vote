import gulp from 'gulp' ; 
import ejsmin from 'gulp-ejsmin' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC ; 

let watch_ejs = () => {
	return new Promise( ( resolve , reject ) => {
		gulp.watch( SRC.EJS ).on( 'all' , ( evt , path , stats ) => {
			let chkInfo = chkEvtFunc( evt , path ) ; 
			if ( chkInfo.bln ) {
				/*이벤트 타입이 삭제인 경우 선택된 파일을 가공하여 
				빌드폴더로 복제합니다.*/
				gulp.src( chkInfo.path )
				.pipe(ejsmin({removeComment: true}))
				.pipe( gulp.dest( DIR.DEST )) ; 
			} 
		}) ; 

		resolve() ; 
	}) ; 
} ; 

export default watch_ejs ; 