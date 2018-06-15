import mysql from 'mysql' ; 

const client = mysql.createConnection({
	user : 'root' , 
	password : '' , 
	dateStrings : true , 
	database : '자신의 데이터베이스 이름' , 
}) ; 

export default client ; 