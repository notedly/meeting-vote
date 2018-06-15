"use strict" ; 

/*npm 모듈*/
import gulp from 'gulp' ; 
import webpack from 'gulp-webpack' ; 
import imagemin from 'gulp-imagemin' ; 
import browserSync from 'browser-sync' ; 
import fs from 'fs' ; 
import spritesmith from 'gulp.spritesmith' ; 
import mergeStream from 'merge-stream' ; 
import mustache from 'mustache' ; 
import runSequence from 'run-sequence' ; 
// import gaze from 'gaze' ; 

/*사용자정의 모듈*/
import css from './gulp/css' ; 
import clean from './gulp/clean' ; 
import copyImages from './gulp/images' ; 
import htmlSet from './gulp/htmlSet' ; 
import ejsSet from './gulp/ejsSet' ; 
import libSet from './gulp/libSet' ; 
import jsonSet from './gulp/jsonSet' ; 
import browserSyncSet from './gulp/browserSyncSet' ; 
import getFiles from './gulp/getFiles' ; 
import watch_ejs from './gulp/watch_ejs' ; 
import watch_scss from './gulp/watch_scss' ; 
import watch_css from './gulp/watch_css' ; 
import watch_js from './gulp/watch_js' ; 
import watch_lib from './gulp/watch_lib' ; 
import watch_server from './gulp/watch_server' ; 
import watch_dest_app from './gulp/watch_dest_app' ; 
import webpackSet from './gulp/webpackSet' ; 
import chkEvtFunc from './gulp/chkEvtFunc' ; 
import start from './gulp/start' ; 
import { PATH } from './Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	DEST = PATH.DEST , 
	FILENAME = PATH.FILENAME ; 

let watch = gulp.series( watch_ejs , watch_scss , watch_css , watch_lib , watch_server , watch_js , watch_dest_app ) ; 

/* test */
gulp.task( 'watch_js' , gulp.series( [ watch_js ] ) ) ; 
gulp.task( 'watch' , gulp.series( [ watch ] ) ) ; 

/* default */
gulp.task( 'default' , gulp.series( [ clean , webpackSet , copyImages , css , htmlSet , ejsSet , libSet , jsonSet , 
	start , 
	browserSyncSet , 
	watch , 
] )) ; 