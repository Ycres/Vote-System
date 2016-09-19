var num=0;//节目数量
// 请求节目数量
    // var GET = $.urlGet(); //获取URL的Get参数
    // var id = GET['id']; //取得id的值
    function queryString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null) {
        return "";
    }
    else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
var basic_id = queryString("id");
var openid= queryString("from");

$(document).ready(function(){
        $.ajax({
            url:"http://wx.hduhelp.com/addons/vote/template/mobile/upgrade.php",//请求地址
            type:"POST",
            async:false,
            dataType:"json",
            data:{
                'id':basic_id,
                'openid':openid
            },
            success:function(data){
               window.num = data['num'];
               window.max=data['max'];
               for(var i=0;i<num;i++)
               {
                name=data['information'][i]['name'];
                imgSrc=data['information'][i]['image'];
                detail=data['information'][i]['detail'];
                if(data['information'][i]['flag']==0)
                {
                    $('.section').append('<div class="slide" id="'+data['information'][i]['id']+'">\
                <img src="http://qiniu.hduhelp.com//image/vote/'+imgSrc+'">\
                <div class="info"><label>名称：</label><p class="name">'+name+'</p></div>\
                <div class="info"><label>简介：</label><p class="intro">'+detail+'</p></div>\
                <div class="info">\
                    <label>分数：</label><input type="text" name="grade" class="gradeSub" placeholder="请输入成绩(0~'+max+')">\
                </div>\
                <input type="submit" value="提 交">\
                <span class="tip">提交成功！</span>\
                <footer><small>Copyright &copy 2016 杭电助手</small></footer>\
                </div>');
                }
                else
                {
                    $('.section').append('<div class="slide" id="'+data['information'][i]['id']+'">\
                <img src="http://qiniu.hduhelp.com//image/vote/'+imgSrc+'">\
                <div class="info"><label>名称：</label><p class="name">'+name+'</p></div>\
                <div class="info"><label>简介：</label><p class="intro">'+detail+'</p></div>\
                <div class="info"><label>分数：</label><p class="intro">'+data['information'][i]['score'][0]+'</p></div>\
                <footer><small>Copyright &copy 2016 杭电助手</small></footer>\
                </div>');
                }
               }
            },
            error:function(a,b,c){
                console.log(a+b+c);
            }
        });
    for(var i=0;i<num;i++)
    {
        var str=':submit:eq('+i+')';
        $(str).on('click',Submit);
    }
    // // 分数提交
    function Submit()
    {
        var btn=$(this);
        var value=btn.prev().find('.gradeSub').val();
        if(value=='')
        {
            alert('请输入成绩');
        }
        else if(value>window.max||value<0)
        {
            alert('打分区间为0~'+window.max);
        }
        else
        {
            $.ajax({
                url:"http://wx.hduhelp.com/addons/vote/template/mobile/savegrade.php",
                type:"POST",
                dataType:"json",
                data:{
                    grade:btn.prev().find('.gradeSub').val(),
                    id:btn.parent().attr('id'),
                    basic_id:basic_id,
                    openid:openid
                },
                success:function(){
                    alert('提交成功！');
                    btn.next().css('display','block');
                    btn.css('display','none');
                },
                error:function(a,b,c){
                    console.log(a+b+c);
                }
            });
        }
    }
});
