import 'babel-polyfill';
import gulp from 'gulp' ; 
import Cache from 'gulp-file-cache' ; 
import babel from 'gulp-babel' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	cache = new Cache() , 
	DEST = PATH.DEST ; 

let watch_server = () => {
	return new Promise( ( resolve , reject ) => {
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
		
		resolve() ; 
	}) ; 
} ; 

export default watch_server ; 