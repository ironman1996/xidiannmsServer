const logInfo=require('../logInfo');
const strUtil=require('../../utils/strUtil');
module.exports=function(req,res){
  var resData;
  // 未登录
  if(!req.session.authority){
    resData=logInfo.log_331;;
    res.json(resData);
    return;
  }
  // 权限不足
  else if(parseInt(req.session.authority)<2){
    resData=logInfo.log_332;
    res.json(resData);
    return;
  }

  switch(req.body.type){
    case 'change':
    _change(req.body);
    break;
    case 'new':
    _new(req.body);
    break;
    default: // 缺少必要参数
    resData=logInfo.log_302;
    res.json(resData);
  }

  // 修改
  function _change(reqBody){
    // 缺少必要参数
    if(!reqBody.id){
      resData=logInfo.log_302;
      res.json(resData);
      return;
    }
    var prop=strUtil.jsObjToSQLProp_update(reqBody.data);
    var cmd = `update machine set ${prop} where machine_id='${reqBody.id}'`;
    // console.log(cmd)
    
    global.dbQuery(cmd,errCallback,resCallback,reqBody.id);
  }

  // 新建
  function _new(reqBody){
    var prop=strUtil.jsObjToSQLProp_insert(reqBody.data);
    var cmd = `insert into machine ${prop}`;
    // console.log(cmd)

    global.dbQuery(cmd,errCallback,resCallback);
  }

  // 错误回调
  function errCallback(){
    resData=logInfo.log_301;
    res.json(resData);
  }

  // 成功回调
  function resCallback(dbRes,id){
    resData=logInfo.log_230;
    resData.data=dbRes;
    res.json(resData);
    id=id||dbRes.insertId;
    global.EventEmitter.emit('wsInform',{name:'machine',id});
    return;
  }
}