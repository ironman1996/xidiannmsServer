const mysql=require('mysql');
const dbInfo=require('./dbInfo').xidiannms;
// 初始化mysql连接信息
var connection=mysql.createConnection(dbInfo);
// 连接数据库
connection.connect();

global.dbQuery=function(cmd,errCallback,resCallback,args){

  connection.query(cmd,function(err,res){
    if(err){
      errCallback();
    }else{
      resCallback(res,args);
    }
  })
}
