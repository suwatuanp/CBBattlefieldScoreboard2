var sec=60;
var turn=21;
var cturn=0;
var $bar1 = $('#timebar');
var $bar2 = $('#overallbar');
var cset;
var boolp =false;
var cp=0;
var max=obj[0]["Total"];
function keydown(e){
    var key = e.keyCode;
    //p
    if(key == 80){
        pgpause();
    }
    //s
    if(key == 83){
        pgstop();
    }
    //space
    if(key == 32){
        pgstart();
    }
}
function pgstart(){
    if(sec==60 || sec==0){
    sec=60;
    turn=21;  
    count=0;
    $bar1.width(sec*(100/60)+"%");
    $bar2.width(sec*(100/60)+"%");
    tplus();
    progresstime();}
}
function pgstop(){
    sec=0;
    turn=0; 
    cturn=0; 
    $bar1.width(sec*(100/60)+"%");
    $bar2.width(sec*(100/60)+"%");

}
function pgpause(){
    if(cp%2==0){
    clearTimeout(cset);
    $('#btn3').html('RESUME');
    }
    else if(cp%2==1){
    cset=setTimeout("tplus()",1000);  
    $('#btn3').html('PAUSE');
    }
    cp++;
}
function tplus() {
    sec-=1;
    document.getElementById("OutputText").innerHTML="<font color=\'red\'>" + sec + " </font> Sec.";
    document.getElementById("cturn").innerHTML="<font color=\'white\'>"+"Turn:" + cturn + "/21";
    if (sec==0) {
        $bar1.removeClass();
        $bar1.addClass('progress-bar progress-bar-success progress-bar-striped active');
        sec=60;
        turn-=1;
        cturn++;
        getDataFromDb();
        $bar2.width(turn*(100/21)+"%");
    }
    if(sec==30){
        $bar1.removeClass();
         $bar1.addClass('progress-bar progress-bar-warning progress-bar-striped active');
    }
    if(sec==15){
        $bar1.removeClass();
         $bar1.addClass('progress-bar progress-bar-danger progress-bar-striped active');
    }
    if (sec>0) {cset=setTimeout("tplus()",1000);}
}

function progresstime(){
     var progress = setInterval(function() {
    if ($bar1.width()==0) {
        $bar1.width(sec*(100/60)+"%");
    } else {
        $bar1.width(sec*(100/60)+"%");
    }
    if ($bar2.width()==0) {
        clearInterval(progress);
        $bar1.width(0*(100/60)+"%");
        pgstop();
    }
    $bar1.text(sec +"sec");
    $bar2.text(turn+'/21 turn');
    } , 800);
}
function getDataFromDb()
{
  $.ajax({ 
        url: "testgetdata.php" ,
        type: "POST",
        data: ''
      })
      .success(function(result) { 
        var obj = jQuery.parseJSON(result);
        document.getElementById("teamA").innerHTML="<font color=\'red\'>" + obj[0]["Total"] + " </font>";
        document.getElementById("teamB").innerHTML="<font color=\'red\'>" + obj[1]["Total"] + " </font>";
        document.getElementById("teamC").innerHTML="<font color=\'red\'>" + obj[2]["Total"] + " </font>";
        document.getElementById("teamD").innerHTML="<font color=\'red\'>" + obj[3]["Total"] + " </font>";
        document.getElementById("teamE").innerHTML="<font color=\'red\'>" + obj[4]["Total"] + " </font>";
        document.getElementById("teamF").innerHTML="<font color=\'red\'>" + obj[5]["Total"] + " </font>";
        document.getElementById("teamG").innerHTML="<font color=\'red\'>" + obj[6]["Total"] + " </font>";
        document.getElementById("teamH").innerHTML="<font color=\'red\'>" + obj[7]["Total"] + " </font>";

      });
}