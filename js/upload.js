	// ajax请求uptoken
  var id="";
  var token="a";
  var token_url="/";
  $.ajax({
    url:"uptoken.php",
    type:"POST",
    async:false,
    dataType:"json",
    data:{
      'pw':"yanggehaoshuai"
    },
    success:function(data)
    {
      window.token=data['uptoken'];
    },
    error:function(a,b,c)
    {
      console.log(a+b+c);
    }
  });
  // 实例化uploader
  $(function(){
    var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4', 
                browse_button: 'pickfiles',
                uptoken: window.token,
                nique_names: false , 
                save_key: false ,
                domain: 'http://qiniu-plupload.qiniudn.com/',
                container: 'container',
                max_file_size: '100mb',
                flash_swf_url: 'Moxie.swf',
                max_retries: 3,
                dragdrop: true, 
                drop_element: 'container',
                chunk_size: '4mb',
                multi_selection: false,
                auto_start: false,
                init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                      showPreview(file);
                      var Split=file['name'].split('.');
                      var type=Split[Split.length-1];
                      $.ajax({
                          url:"uptoken.php",
                          type:"POST",
                          async:false,
                          dataType:"json",
                          data:{
                            'pw':"yanggehaoshuai",
                            'type':type,
                            'basicId':1
                          },
                          success:function(data)
                          {
                            file['name']=data['key'];
                            window.id=data['id'];
                            console.log('newFilename:'+file['name']);
                          },
                          error:function(a,b,c)
                          {
                            console.log(a+b+c);
                          }
                        });
                    });
                },
                'BeforeUpload': function(up, file) {
                  alert('abc');
                },
                'UploadProgress': function(up, file) {
                },
                'UploadComplete': function() {
                  alert('成功上传');
                },
                'FileUploaded': function(up, file, info) {
                },
                'Error': function(up, err, errTip) {
                }
            }
            });
  $(document).ready(function(){
    $('#up_load').on('click',function(){
      uploader.start();
    $.ajax({
    url:"",//请求地址
    type:"POST",
    dataType:"json",
    data:{
      'pw':"yanggehaoshuai",
      'name':$('#name').val(),
      'info':$('#info').val()
    },
    success:function(data)
    {
      console.log('表单数据提交成功');
    },
    error:function(a,b,c)
    {
      console.log(a+b+c);
    }
  });
  });
});
  });
function showPreview (file) {
    var image = new Image();
    var preloader = new mOxie.Image();
    preloader.onload = function() {
        preloader.downsize( 600, 600 );
        image.setAttribute( "src", preloader.getAsDataURL() );
        $('#container').empty();
        $('#container').append(image);
    };
    preloader.load( file.getSource() );
}