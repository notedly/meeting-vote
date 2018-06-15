import gulp from 'gulp' ; 
import webpack from 'gulp-webpack' ; 
import fs from 'fs' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import getFiles from './getFiles' ; 
import { PATH } from '../Dir' ; 

let SRC = PATH.SRC , 
	DEST = PATH.DEST , 
	depth0JSFiles = [] ; 

let chkDepth0Files = ( findPaths ) => {
	return new Promise( resolve => {
		console.log( 'findPaths : ' , findPaths ) ; 
		console.log( 'depth0JSFiles : ' , depth0JSFiles ) ; 

		findPaths.map(( findFileName , idx ) => {
			// console.log( 'findFileName : ' , findFileName ) ; 
			depth0JSFiles.map(( depth0FileName , jdx ) => {
				// console.log( 'depth0FileName : ' , depth0FileName ) ; 
				fs.readFile( `html/js/${depth0FileName}` , 'utf8' , ( err , fileData ) => {
					// console.log( '------------------------------------\n' , fileData , '\n------------------------------------' ) ; 
					// console.log( 'findFileName : ' , findFileName ) ; 
					let re = new RegExp( '^import.*?\/' + findFileName.replace( '.js' , '' ) , 'gm' ) ; 
					let result = re.exec( fileData ) ; 
					// console.log( '-- result : ' , result ) ; 

					if ( result != null ) {
						resolve( depth0FileName ) ; 
					} else {
						resolve( null ) ; 
					}

				}) ; 
			}) ; 
		}) ; 
	}) ; 
} ;  

let chkParentFiles = ( crntDatas ) => {
	return new Promise( resolve => {
		let crntData = crntDatas[0] ; 
		let fileName = crntData.fileName ; 
		let pathArr = crntData.pathArr ; 
		pathArr.pop() ; 
		pathArr = pathArr.join( '/' ) ; 

		let promises = [] ; 
		promises.push( getFiles( `html/${pathArr}/` ) ) ; 
		Promise.all( promises ).then( result => {
			resolve( result[0] ) ; 
		}) ; 
	}) ; 
} ; 

let dirchkJS = () => {	
	console.log( 'in dirchkJS' ) ; 
	let promises = [] ; 
	return new Promise( ( resolve , reject ) => {
		promises.push( getFiles( 'html/js/' ) ) ; 

		Promise.all( promises ).then( result => {
			depth0JSFiles = result[0] ; 
			console.log( 'depth0JSFiles : ' , depth0JSFiles ) ; 
			resolve() ; 
		}) ; 
	}) ; 
} ; 

function webpackCompile ( jsName ) {
	webpack({
		entry : {
			entryName : `${__dirname}/../html/js/${jsName}.js`
		} , 
		output : {
			filename : `${jsName}.js`
		} , 
		module : {
			loaders : [
				{
					test : /\.js$/ , 
					loader : 'babel-loader' , 
					exclude : '/node_modules/' , 
					query : {
						cacheDirectory : true , 
						"presets" : ['es2015', 'es2017', 'stage-3', 'react'],
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
					}
				}
			]   
		} 
	}).pipe( gulp.dest( DEST.JS ) ) ; 
}

let watch_js = () => {
	return new Promise( ( resolve , reject ) => {
		gulp.watch( SRC.JS ).on( 'all' , ( evt , path , stats ) => {
			let chkInfo = chkEvtFunc( evt , path ) ; 
			if ( !chkInfo.bln ) return ; // 현재 감지된 파일이 존재하지 않으면( bln == false ) 작업을 멈춥니다.

			let evtPath = chkInfo.path , 
				originalPath = chkInfo.path , 
				pathArr = originalPath.split( '/' ) , 
				fileName = pathArr.pop().replace( /\.js$/ , '' ) , 
				crntData = null , 
				pathStr = '' ; 

			pathArr.shift() ; 

			crntData = {
				originalPath : originalPath , 
				fileName : fileName , 
				pathArr : pathArr , 
			} ; 

			console.log( 'crntData : ' , crntData ) ; 

			if ( crntData.pathArr[1] == 'include' ) {
				console.log( 'common' ) ; 
				let promises = [] ; 
				promises.push( getFiles( 'html/js/' ) ) ;

				Promise.all( promises ).then( result => {
					console.log( 'result' , result[0] ) ; 
					result[0].map( fileName => {
						console.log( 'fileName : ' , fileName ) ; 
						webpackCompile( fileName.replace( '.js' , '' ) ) ; 
					}) ; 
				}) ; 
			} else {
				console.log( 'none common' ) ; 

				if ( crntData.pathArr.length == 1 ) {
					/*현재 저장된 파일의 폴더 뎁스가 1개라면 
					저장된 파일의 위치를 취상위로 간주 합니다.*/
					pathStr = `/${crntData.pathArr.join( '/' )}/` ; 
					webpackCompile( crntData.fileName ) ; 
				} else {
					pathStr = `html/${crntData.pathArr[0]}/${crntData.pathArr[1]}/` ; 
					console.log( 'pathStr : ', pathStr ) ; 
					let promises = [] ; 
					// console.log( 'getFiles : ' , getFiles ) ; 
					promises.push( getFiles( pathStr ) ) ; 
					Promise.all( promises ).then( result => {
						let findPaths = result[0] ; 
						console.log( 'findPaths : ' , findPaths ) ; 
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
			}
		}) ; 

		gulp.watch( SRC.LIB ).on( 'all' , ( evt , path , stats ) => {
			depth0JSFiles.map( fileName => {
				webpackCompile( fileName.replace( '.js' , '' ) ) ; 
			}) ; 
		}) ; 

		resolve () ; 
	}) ;  
} ;

dirchkJS() ; 

export default watch_js ; 