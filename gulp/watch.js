import gulp from 'gulp' ; 
// import browserSync from 'browser-sync' ; 

import getFiles from './getFiles' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC ; 

let watch = () => {
	console.log( 'in watch' ) ; 	

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

	gulp.watch( SRC.SCSS ).on( 'all' , ( evt , path , stats ) => {
		let scssName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ).replace( '.scss' , '' ) ; 
		let chkInfo = chkEvtFunc( evt , path ) ; 

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

	gulp.watch( SRC.CSS ).on( 'all' , ( evt , path , stats ) => {
		let chkInfo = chkEvtFunc( evt , path ) ; 
		if ( chkInfo.bln ) {
			gulp.src( chkInfo.path )
				.pipe( cache.filter() )
				.pipe( cleanCSS({ compatibility : 'ie8' }) )
				.pipe( cache.cache() )
				.pipe( gulp.dest( DEST.CSS ) ) ; 
		}
	}) ; 

	gulp.watch( SRC.LIB ).on( 'all' , ( evt , path , stats ) => {
		let chkInfo = chkEvtFunc( evt , path ) ; 
		if ( chkInfo.bln ) {
			gulp.src( chkInfo.path )
				.pipe( gulp.dest( DEST.LIB ) ) ; 
		}
	}) ; 

	gulp.watch( SRC.SERVER ).on( 'all' , ( evt , path , stats ) => {
		let chkInfo = chkEvtFunc( evt , path ) ; 
		if ( chkInfo.bln ) {
			gulp.src( SRC.SERVER )
			.pipe( cache.filter() )
			.pipe( babel({
				"presets" : ['es2015', 'es2017', 'stage-3'],
				"plugins" : [
					'transform-decorators-legacy', 
					'transform-class-properties' ,
					'transform-async-to-generator' , 
					'transform-object-assign' , 
					'transform-regenerator' , 
					["transform-runtime", {
						"helpers": false, // defaults to true 
						"polyfill": false, // defaults to true 
						"regenerator": true, // defaults to true 
						"moduleName": "babel-runtime" // defaults to "babel-runtime" 
					}]
				],
			}))
			.pipe( cache.cache() )
			.pipe( gulp.dest( DEST.SERVER ) ) ; 
		}
	}) ; 

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
 
	gulp.watch( SRC.JS ).on( 'all' , ( evt , path , stats ) => {
		let chkInfo = chkEvtFunc( evt , path ) ; 
		// console.log( 'chkInfo : ' , chkInfo ) ; 

		if ( !chkInfo.bln ) return ; // 현재 감지된 파일이 존재하지 않으면( bln == false ) 작업을 멈춥니다.

		let evtPath = chkInfo.path
		let originalPath = chkInfo.path ; 
		let pathArr = originalPath.split( '/' ) ; 
		let fileName = pathArr.pop().replace( /\.js$/ , '' ) ; 
		pathArr.shift() ; 
		let crntDatas = [
			{
				originalPath : originalPath , 
				fileName : fileName , 
				pathArr : pathArr , 
			} , 
		] ; 
		let pathStr = '' ; 

		if ( crntDatas[0].pathArr.length == 1 ) {
			/*길이가 1개라면 최상위폴더로 간주합니다.*/
			pathStr = `/${crntDatas[0].pathArr.join( '/' )}/` ; 
			// console.log( `${__dirname}${pathStr}${crntDatas[0].fileName}.js` ) ; 
			console.log( 'pathStr : ' , pathStr ) ; 
			webpackCompile( crntDatas[0].fileName ) ; 
		} else {
			/*길이가 2개 이상이라면 하위폴더로 간주합니다.*/

			// chkParentFile( crntDatas ) ; 
			// return ; 

			pathStr = `html/${crntDatas[0].pathArr[0]}/${crntDatas[0].pathArr[1]}/` ; 
			// console.log( 'pathStr : ', pathStr ) ; 
			let promises = [] ; 

			console.log( 'getFiles : ' , getFiles ) ; 


			promises.push( getFiles( pathStr ) ) ; 
			Promise.all( promises ).then( result => {
				let findPaths = result ; 
				// console.log( 'findPaths : ' , findPaths ) ; 
				// console.log( 'depth0JSFiles : ' , depth0JSFiles ) ; 

				let promises2 = [] ; 
				promises2.push( chkDepth0Files( findPaths ) ) ; 

				Promise.all( promises2 ).then( result => {
					// console.log( 'chk result : ' , result ) ; 
					result.map( crntFileName => {
						console.log( 'crntFileName : ' , crntFileName ) ; 
						if ( crntFileName == null ) {
							console.log( 'import된 상위 js파일이 존재하지 않습니다. import 하고싶은 파일을 설정하여주십시오.' ) ; 
						} else {
							webpackCompile( crntFileName.replace( '.js' , '' ) ) ; 
						}
					}) ; 
				}) ; 
				
			}) ; 
		}
		
	}) ; 

	gulp.watch( DIR.DEST + '/**/*.*' ).on( 'change' , ( evt ) => {
		console.log( 'zzzzzzzzzzzzzzzzzzzzzzzz' ) ; 
		browserSync.reload() ; 
	}) ; 
	gulp.watch( 'app/**/*.*' ).on( 'change' , ( evt ) => {
		browserSync.reload() ; 
	}) ; 
} ; 

export default watch ; 