import gulp from 'gulp' ; 
import webpack from 'gulp-webpack' ; 
import fs from 'fs' ; 

import { PATH } from '../Dir' ; 

let DEST = PATH.DEST ; 

function webpackFun ( evt ) {
	// console.log( '---- evt : ' , evt ) ; 
	let path = evt.path ; 
	let jsName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ) ; 
	let entryName = {} ; 
	let entryPath = {} ; 

	// console.log( 'jsName : ' , jsName ) ; 
	// console.log( 'path : ' , path ) ; 

	if ( path.indexOf( 'ui' ) == -1 ) { /* 상위 */

		// console.log( 'entryName : ' , entryName ) ; 
		// console.log( 'entryPath : ' , entryPath ) ; 
		// console.log( 'jsName : ' , jsName ) ; 

		webpack({
			entry : {
				entryName : __dirname + '/../html/js/' + jsName
			} , 
			output : {
				filename : jsName
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
	} else { /* 하위 */
		// gulp.watch( SRC.JS , [ 'webpack' ] ) ; 
		fs.readdir( 'html/js/' , ( err , fls ) => {
			let arr = [] ; 
			fls.forEach(( file ) => {
				if ( file.indexOf( '.js' ) > -1 ) {
					// arr.push( file ) ; 
					// let evt = { path : __dirname + '\\html\\js\\' + file } ; 

					let filePath = __dirname + '\\html\\js\\' + file ; 
					let findStr = jsName.replace( '.js' , '' ) ; 
					// console.log( 'filePath : ' , filePath ) ; 
					// console.log( 'file : ' , file ) ; 
					// console.log( 'findStr : ' , findStr ) ; 

					fs.readFile( filePath , 'utf8' , ( err , data ) => {
						if ( err != null ) return console.log( 'err : ' , err ) ; 
						if ( data.indexOf( './ui/' + findStr ) != -1 ) {
							let evt = { path : __dirname + '\\html\\js\\' + file } ; 
							// console.log( 'evt : ' , evt ) ; 
							webpackFun( evt ) ; 
						}
					}) ; 
				}
			}) ;  
		}) ; 
	}
}

let webpackSet = () => {
	console.log( 'in webpackSet' ) ; 
	return new Promise( ( resolve , reject ) => {
		fs.readdir( 'html/js/' , ( err , fls ) => {
			console.log( 'err : ' , err ) ; 
			let arr = [] ; 
			fls.forEach(( file ) => {
				if ( file.indexOf( '.js' ) > -1 ) {
					// console.log( 'file : ' , file ) ; 
					let evt = { path : __dirname + '\\html\\js\\' + file } ; 
					webpackFun( evt ) ; 
				}
			}) ;  
		}) ; 
		resolve() ; 
	}) ; 
} ; 

export default webpackSet ; 