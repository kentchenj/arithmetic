var rows = 20;
var cols = 5;
var selVal = "0"; //下拉框选中的值

/**
 * 获得随机数，min，max
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 产生数据
 */
function buildData(){
  var result = [];
  var length = rows * cols;
  if(selVal == "0"){
    return [];
  }
  for(var i=0; i<length; i++){
    switch(selVal){
      case "1" : 
        result.push(buildPlusOrMinusLessThen20());
        break;
      case "2" :
        result.push(buildCarryPlusOrMinusLessThan20());
        break;
      case "3" :
        result.push(buildPlusOrMinusWithBlankLessThen20());
        break;   
      case "4" :
        result.push(buildPlusOrMinusLessThen100());     
    }
  }
  return result;
}

/**
 * 创建一个20以内的加减表达式，不包括加减1，不包括加2，不包括加10，不包括减法结果是10
 */
function buildPlusOrMinusLessThen20(){
  var operator = getRandomInt(1,2)
  if(operator == 1){//加法
    var left = getRandomInt(3, 20)
    var right = getRandomInt(3, 20)
    if((left + right <= 20) && (left != 10) && (right != 10)){
      return left + ' + ' + right + ' = ';
    }else{
      return buildPlusOrMinusLessThen20();
    }  
  }else{
    var left = getRandomInt(2, 20)
    var right = getRandomInt(2, 20)
    if((left - right > 1) && (left - right !=10) && (right != 10)){
      return left + ' - ' + right + ' = ';
    }else{
      return buildPlusOrMinusLessThen20();
    }
  }
}

/**
 * 创建一个20以内的进位加减法
 */
function buildCarryPlusOrMinusLessThan20(){
  var operator = getRandomInt(1,2)
  var left = getRandomInt(2,9)
  var right = getRandomInt(2,9)
  var result = left + right
  if(result > 10 && result < 19 && left != right){
    if(operator == 1){ //加法
      return left + ' + ' + right + ' = '
    }else{
      return result + ' - ' + left + ' = '
    }
  }else{
    return buildCarryPlusOrMinusLessThan20()
  }
}

/**
 * 创建20以内加减法，允许填空，不包括+-1
 */
function buildPlusOrMinusWithBlankLessThen20(){
  var operator = getRandomInt(1,2)
  var pos
  var result
  if(operator == 1){//加法
    var left = getRandomInt(2, 20)
    var right = getRandomInt(2, 20)
    if(left + right <= 20){
      pos = getRandomInt(1,3) //定义位置
      switch(pos){
        case 1: result =  "____  + " + right + " = " + (left + right); break;
        case 2: result =  left + " +  ____ = " + (left + right); break; 
        case 3: result = left + ' + ' + right + ' = ____'; break;
      }
      return result;
    }else{
      return buildPlusOrMinusWithBlankLessThen20();
    }  
  }else{
    var left = getRandomInt(2, 20)
    var right = getRandomInt(2, 20)
    if(left - right > 1){
      pos = getRandomInt(1,3) //定义位置
      switch(pos){
        case 1: result = "____ - " + right + " = " + (left - right); break;
        case 2: result = left + " -  ____ = " + (left - right); break;
        case 3: result = left + " - " + right + ' = ____'; break;
      }
      return result;  
    }else{
      return buildPlusOrMinusWithBlankLessThen20();
    }
  }  
}

/**
 * 100以内加减法，不包括加减1，最小数为3
 */
function buildPlusOrMinusLessThen100() {
  var operator = getRandomInt(1,2)
  if(operator == 1){//加法
    var left = getRandomInt(3, 99)
    var right = getRandomInt(3, 99)
    if(left + right <= 99){
      return left + ' + ' + right + ' = ';
    }else{
      return buildPlusOrMinusLessThen100();
    }  
  }else{
    var left = getRandomInt(3, 99)
    var right = getRandomInt(3, 99)
    if(left - right > 1){
      return left + ' - ' + right + ' = ';
    }else{
      return buildPlusOrMinusLessThen100();
    }
  }  
}

/**
 * 创建表格数据
 * @param fn 
 */
function buildTableData(fn){
  var list = fn();
  var result = [];
  var pos = 0;
  for(var row = 0; row < rows; row++){
    var oneLine = [];
    for(var col=0; col<cols; col++){
      oneLine.push(list[pos]);
      pos ++;
    }
    result.push(oneLine);
  }
  return result;
}

$('#dropdown').change(function(){
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  selVal = $(this).val();
  var data = buildTableData(buildData);
  var html = template(data);
  $("#resultTable").html(html);

})


