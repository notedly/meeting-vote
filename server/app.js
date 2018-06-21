import express from 'express' ;
import session from 'express-session' ;
import mysql from 'mysql' ;
import ejs from 'ejs' ;
import fs from 'fs' ;
import client from './routes/client' ;
import { PATH } from '../dir' ;
import bodyParser from 'body-parser' ;

const app = express() ;
app.set( 'views' , __dirname + '/../html_build/' ) ;
app.set( 'view engine' , 'ejs' ) ;
app.engine( 'html' , require( 'ejs' ).renderFile ) ;

app.use(session({
	secret : 'keyboard cat' ,
	resave : false ,
	saveUninitialzed : true
})) ;
app.use( bodyParser.json() ) ;
app.use( bodyParser.urlencoded({ extended : true }) ) ;

/**
라우터 모음
@/ : 인덱스
*/
app.use( '/' , express.static( __dirname + '/../html_build' )) ;

let DIR = PATH.DIR ;

app.get( '/' , ( req , res ) => {
	res.render( 'index' , {} ) ;
}) ;

app.get( '/register' , ( req , res ) => {
	res.render( 'register' , {} ) ;
}) ;

const server = app.listen( DIR.PORT , () => {
	console.log( 'Express listening on port : ' +  server.address().port) ;
}) ;