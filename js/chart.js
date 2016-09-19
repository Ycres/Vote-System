var mychart=echarts.init(document.getElementById('main'),'macarons');
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
mychart.showLoading();
$.ajax({
	url:'',
	dataType:'json',
	data:{
		id:basic_id
	},
	type:'POST',
	success:function(mydata){
		if(mydata.type==1)
		{
			nameText='票数';
		}
		else if(mydata.type==0)
		{
			nameText='分数';
		}
		var option={
			title:{
			text:mydata.basicname,
			left:"center",
			top:"top"},
		tooltip:{},
		xAxis:{
			name:'节目',
			data:mydata.itemname},
		yAxis:{
			name:nameText},
		dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'inside',
            start: 10,
            end: 80},
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider',
            start: 10,
            end: 60}],
		series:[{
			name:'分数',
			type:'bar',
			data:mydata.sgrade}]
		};
		mychart.setOption(option);
		mychart.hideLoading();
	}
})