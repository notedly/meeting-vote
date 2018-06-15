import gulp from 'gulp' ; 
import browserSync from 'browser-sync' ; 

import { PATH } from '../Dir' ; 
let DIR = PATH.DIR ; 

let watch_dest_app = () => {
	return new Promise( ( resolve , reject ) => {
	gulp.watch( DIR.DEST + '/**/*.*' ).on( 'change' , ( evt ) => {
		browserSync.reload() ; 
	}) ; 

	gulp.watch( 'app/**/*.*' ).on( 'change' , ( evt ) => {
		browserSync.reload() ; 
	}) ; 

		resolve() ; 
	}) ; 
} ; 

export default watch_dest_app ; 