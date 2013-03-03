 (function($){
  //定义外部接口
  $.fn.map = function(options){
    var defaults = {
      point_x: "118.768692",
      point_y: "32.066374",
       //标注点数组
       title:"我的标记",
       content:"我的备注",
       markerArr: [{isOpen:0,icon:{w:21,h:22,l:42,t:0,x:6,lb:5}}],

     };

     var options = $.extend(defaults, options);

     var map;

     function initMap(options){
        createMap(options);//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker(options);//向地图中添加marker
      }
     
    //创建地图函数：
    function createMap(options){
        map = new BMap.Map("map-div");//在百度地图容器中创建一个地图
        var point = new BMap.Point(options.point_x, options.point_y);//定义一个中心点坐标
        map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
      }

    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
      }

    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
        // var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE });
        // map.addControl(ctrl_nav);
        // //向地图中添加缩略图控件
        // var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        // map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
      }


    //创建marker
    function addMarker(options){
      for(var i=0;i<options.markerArr.length;i++){
        var json = options.markerArr[i];
        var point = new BMap.Point(options.point_x,options.point_y);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(options.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
          font: "14px bolder",
          color:"#CC3333",
          border: "1px solid #999999",
          "border-radius": "4px",
          "box-shadow": "2px 2px rgba(0,0,0,.6)",
          padding:"2px",
          margin: "10px",
          cursor:"pointer",
        });

        (function(){
          var index = i;
          var _iw = createInfoWindow(i);
          var _marker = marker;
          _marker.addEventListener("click",function(){
            this.openInfoWindow(_iw);
          });
          _iw.addEventListener("open",function(){
            _marker.getLabel().hide();
          })
          _iw.addEventListener("close",function(){
            _marker.getLabel().show();
          })
          label.addEventListener("click",function(){
            _marker.openInfoWindow(_iw);
          })
          if(!!json.isOpen){
            label.hide();
            _marker.openInfoWindow(_iw);
          }
        })()
      }
    }
    //创建InfoWindow
    function createInfoWindow(i){
      var json = options.markerArr[i];
      var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + options.title + "'>" + options.title + "</b><div class='iw_poi_content'>"+options.content+"</div>");
      return iw;
    }
    //创建一个Icon
    function createIcon(json){
      var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
      return icon;
    }
    
    initMap(options);
    // return this;
  };
})(jQuery);
