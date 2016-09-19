var oldHistory=[];
var votes=0;
var selectedNum=0;//已选择对象数量
var app=angular.module('app',[]);
var ratio=1;
app.controller('MyController',function($scope,$http){
	$http.post(window.dataUrl,{'pw':'yanggehaoshuai'}).success(function(res){
		$scope.viewList=res.show;//对象数组
		window.ratio=parseInt(res.ratio);
		if(res.history[0]==0)
		{
			window.oldHistory=[];
		}
		else
		{
			window.oldHistory=res.history;
		}	
		window.votes=res.num;//投票最高限额
		$scope.title=res.bigName+'投票页面';//晚会标题
		for(num in $scope.viewList)
		{
			$scope.viewList[num].sum=parseInt($scope.viewList[num].sum);
			$scope.viewList[num].ratio=parseInt($scope.viewList[num].ratio);
			if($scope.viewList[num].voteIf)
			{
				$scope.viewList[num].ico="http://qiniu.hduhelp.com//image/vote/redheart.png";
				selectedNum++;
			}
			else
				$scope.viewList[num].ico="http://qiniu.hduhelp.com//image/vote/blockheart.png";
		}//点赞样式更改
	});
	$scope.viewList=[{voteIf:false,sum:11,name:'aaa'},{voteIf:false,sum:11,name:'ada'},{voteIf:true,sum:11,name:'ccc'},{voteIf:false,sum:12,name:'bbb'},{voteIf:true,sum:13,name:'ddd'},{voteIf:false,sum:14,name:'eee'}];
	$scope.click=function(view){
		if(view.voteIf)
		{
			view.voteIf=false;
			view.ico="http://qiniu.hduhelp.com//image/vote/blockheart.png";
			console.log("sum:"+view.sum);
			view.sum-=ratio;
			selectedNum--;
			for(i in oldHistory)
			{
				if(oldHistory[i]==view.id)
				{
					oldHistory.splice(i,1);
					return;
				}
			}
		}
		else
		{
			if(selectedNum>=votes)
			{
				alert('提示：投票超过限制，每人最多投'+votes+'票');
			}
			else
			{
				view.voteIf=true;
				view.ico="http://qiniu.hduhelp.com//image/vote/redheart.png";
				console.log("sum:"+view.sum);
				view.sum+=ratio;
				selectedNum++;
				oldHistory.push(view.id);
			}
			
		}
	};
	$scope.submit=function(){
	    if(window.oldHistory[0]==0)
	    {
	    	window.oldHistory.push(0);
	    }
		$http.post(window.subUrl,{'newHistory': window.oldHistory}).success(function(data){
			alert('提交成功！');
		}).error(function(){
			alert('提交失败，请稍后重试或联系工作人员')
		});
	}
});