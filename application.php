<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<link rel="stylesheet" href="css/appstyle.css">
	<title>权限申请</title>
</head>
<body>
	<nav>
		权限申请
	</nav>
	<form action="verify.php" method="post">
		<!-- 活动类型 -->
		<div>
	类型: <select  name="basic_id">
	<?php

	    while($n>=0)
	    {
	    	//print_r($n);
	    	print '<option value='.$id[$n].'>'.$name[$n].'</option>';
	    	$n=$n-1;
	    }
	?>
</select></div>

	<div><label >姓名: </label><input type="text" name="name"></div>
	<div><label >备注: </label><input type="text" name="comment"></div>
	<?php print '<input type="hidden" name="openid" value="'.$openid.'">'; ?>
	<input type="submit" value="提 交" name="submit">
	</form>
</body>
</html>