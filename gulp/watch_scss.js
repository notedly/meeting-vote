import gulp from 'gulp' ; 
import sass from 'gulp-sass' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC ; 

let watch_scss = () => {
	return new Promise( ( resolve , reject ) => {
		gulp.watch( SRC.SCSS ).on( 'all' , ( evt , path , stats ) => {
			let scssName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ).replace( '.scss' , '' ) ; 
			let chkInfo = chkEvtFunc( evt , path ) ; 

			console.log( 'chkInfo : ' , chkInfo ) ; 

			if ( chkInfo.bln ) {
				if ( chkInfo.path.indexOf( 'ui' ) == -1 ) {
					console.log( 'in' ) ; 
					gulp.src( chkInfo.path )
						.pipe( sass() )
						.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
				} else {
					console.log( 'out' ) ; 
					fs.readdir( 'html/scss' , ( err , fls ) => {
						let [ i , findStr , len , arr ] = [ 0 , `ui/${scssName}` , fls.length , [] ] ; 
						function chkStr () {
							fs.readFile( 'html/scss/' + fls[i] , 'utf8' , ( err , data ) => {
								if ( i < fls.length -1 ) {
									if ( data.indexOf( findStr ) > -1 ) {
										arr.push( fls[i] ) ; 
									}				

									i += 1 ; 				
									setTimeout(() => {
										chkStr() ; 
									}) ; 
								} else {
									arr.forEach(( str , idx ) => {
										gulp.src( DIR.SRC + '/scss/' + str )
										.pipe( cache.filter() )
										.pipe( sass() )
										.pipe( cache.cache() )
										.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
									}) ; 
								}
							}) ; 
						}

						chkStr() ; 
					}) ; 
				}
			} else {
				/*scss 파일의 경우 컴파일 되는 경로가 따로 존재하므로 
				빌드폴더가 아닌 컴파일 폴더의 파일도 삭제하여줍니다.*/
				let delPath = chkInfo.path.replace( /^html_build/ , DIR.SRC ) ; 
				delPath = delPath.replace( /scss/ , 'css' ) ; 
				delPath = delPath.replace( /scss$/ , 'css' ) ; 
				if ( fs.existsSync( delPath ) ) {
					fs.unlink( delPath ) ; 
				} else {
					console.log( 'not exists file' ) ; 
				}
			}
		}) ; 

		resolve() ; 
	}) ; 
} ; 

export default watch_scss ; 