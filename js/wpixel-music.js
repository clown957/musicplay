//圆环对象
function MusicDom(objs){
	this.id = objs.id; //对象id
	this.playlist = objs.playlist; //播放列表
};

MusicDom.prototype = {
	constructor:MusicDom,
	init:function(){
		var html = "<div class='music-player' onselectstart='return false;'>" + 
			"<div class='info'>" + 
			"<div class='icon-repeat'>" + 
			"<img id='poster_"+this.id+"' src='"+this.playlist[0].poster+"' width='60'/>" + 
			"<div id='play_"+this.id+"' class='play'>" + 
			"<i class='fa fa-play fa-lg'></i>" + 
			"</div>" + 
			"</div>" + 
			"<div class='info-right'>" + 
			"<div class='ri-top'>" + 
			"<div class='music-desc'>" + 
			"<p id='title_"+this.id+"' class='song-name'>"+this.playlist[0].title+"</p>" + 
			"<p id='author_"+this.id+"' class='singer'>"+this.playlist[0].author+"</p>" + 
			"</div>" + 
			"<div class='music-time'>" + 
			"<p id='ctime_"+this.id+"'></p>" + 
			"<p id='ttime_"+this.id+"'></p>" + 
			"<p id='stopv_"+this.id+"'>&nbsp;&nbsp;<i class='fa fa-volume-up fa-lg'></i></p>" + 
			"<p id='vshow_"+this.id+"'>&nbsp;&nbsp;<i class='fa fa-reorder fa-lg'></i></p>" + 
			"</div>" + 
			"<div class='clear'></div>" + 
			"</div>" + 
			"<div class='ti-bom'>" + 
			"<div id='totalTime' class='total-time'></div>" + 
			"<div id='progress_"+this.id+"' class='progress'></div>" + 
			"<div id='proPoint_"+this.id+"' class='pro-click'></div>" + 
			"</div>" + 
			"</div>" + 
			"<div class='clear'></div>" + 
			"</div>" + 
			"<audio id='music_"+this.id+"' src='"+this.playlist[0].mp3+"'></audio>" + 
			"<div class='controls'>" + 
			"<ul id='lists_"+this.id+"'>";
		for(var i = 0; i < this.playlist.length ; i++){
			var num1 = i;
			var num2 = num1+1;
			html += "<li id='playlist_"+num2+"'>" + 
				"<p>"+num2+"&nbsp;&nbsp;</p>" + 
				"<p>"+this.playlist[i].title+"</p>" + 
				"<p> - </p>" + 
				"<p>"+this.playlist[i].author+"</p>" + 
				"<div class='clear'></div>" + 
				"</li>"; 
		}
			html += "</ul>" + 
				"</div>" + 
				"</div>";
		document.getElementById(this.id).innerHTML = html;
		//初始化事件和参数
		this.setOptions(this.playlist);
	},
	setOptions:function(playlist){
		//歌曲图片
		var poster_Dom = document.getElementById("poster_"+this.id);
		//歌曲名
		var title_Dom = document.getElementById("title_"+this.id);
		//歌曲作者
		var author_Dom = document.getElementById("author_"+this.id);
		//歌曲对象
		var aio_Dom = document.getElementById("music_"+this.id);
		//进度条
		var gress_Dom = document.getElementById("progress_"+this.id);
		//进度条点
		var pro_Dom = document.getElementById("proPoint_"+this.id);
		//播放按钮
		var play_Dom = document.getElementById("play_"+this.id);
		//总时间对象
		var ttime_Dom = document.getElementById("ttime_"+this.id);
		//播放时长
		var ctime_Dom = document.getElementById("ctime_"+this.id);
		//静音对象
		var stopv_Dom = document.getElementById("stopv_"+this.id);
		//列表显示隐藏按钮
		var vshow_Dom = document.getElementById("vshow_"+this.id);
		//播放列表对象
		var playlist_Dom = document.getElementById("lists_"+this.id);
		var arr = playlist_Dom.getElementsByTagName("li");
		var flag = false;
		//获取音乐的总时间并格式化
		var ttime;
		aio_Dom.oncanplaythrough = function(){
			ttime = getTime(aio_Dom.duration);
		};
		//播放和暂停
		play_Dom.onclick = function(){
			if(flag == false){
				aio_Dom.play();
				play_Dom.innerHTML = "<i class='fa fa-pause fa-lg'></i>";
				ttime_Dom.innerHTML = ttime;
				flag = true;
			}else{
				aio_Dom.pause();
				play_Dom.innerHTML = "<i class='fa fa-play fa-lg'></i>";
				flag = false;
			};
		};
		//播放时长
		aio_Dom.ontimeupdate = function(){
			var ctime = this.currentTime; //播放时间
			var ttime = this.duration; //总时间
			ctime_Dom.innerHTML = getTime(ctime) + "/";
			var percent = (ctime / ttime) * 100;
			if(percent == 100){
				play_Dom.innerHTML = "<i class='fa fa-play fa-lg'></i>";
				flag = false;
			};
			gress_Dom.style.width = percent+"%";
			pro_Dom.style.left = percent+"%";
		};
		//静音
		var voice = true;
		stopv_Dom.onclick = function(){
			if(voice){
				aio_Dom.muted = true;
				var off = "&nbsp;&nbsp;<i class='fa fa-volume-off fa-lg'></i>";
				stopv_Dom.innerHTML = off;
				voice = false;
			}else{
				aio_Dom.muted = false;
				var up = "&nbsp;&nbsp;<i class='fa fa-volume-up fa-lg'></i>";
				stopv_Dom.innerHTML = up;
				voice = true;
			};
		};
		//列表显示隐藏
		var playlist_Dom_flag = true;
		vshow_Dom.onclick = function(){
			if(playlist_Dom_flag){
				playlist_Dom.style.display = "none";
				playlist_Dom_flag = false;
			}else{
				playlist_Dom.style.display = "block";
				playlist_Dom_flag = true;
			}
		}
		//播放列表
		function foo(){
			var len = arr.length;
			for(var i = 0; i < len; i++){
				arr[i].onclick = (function(k){
					return function(){
						listplay(k);
					}
				})(i);
			}
		}
		foo();
		//点击列表播放
		function listplay(k){
			poster_Dom.src = playlist[k].poster;
			title_Dom.innerHTML = playlist[k].title;
			author_Dom.innerHTML = playlist[k].author;
			aio_Dom.src = playlist[k].mp3;
			aio_Dom.play();
			play_Dom.innerHTML = "<i class='fa fa-pause fa-lg'></i>";
			ttime_Dom.innerHTML = ttime;
			flag = true;
		};
		drag(pro_Dom, function(nl, ml){
			var per = nl / ml;
			gress_Dom.style.width = per * 100 + "%";
			var ctime = aio_Dom.duration * per;
			aio_Dom.currentTime = ctime;
		});
		
		function drag(dom,callback){
			dom.onmousedown = function(e){
				var ev = e || window.event;
				//鼠标的位置
				var x = ev.clientX;
				//left坐标
				var l = dom.offsetLeft;
				//最大距离
				var mw = dom.parentElement.offsetWidth - dom.offsetWidth;
				var nl;
				document.onmousemove = function(e){
					var ev = e || window.event;
					nl = ev.clientX - x + l;
					if(nl <= 0)nl = 0;
					if(nl >= mw)nl = mw;
					dom.style.left = nl + "px";
				};
				document.onmouseup = function(){
					document.onmousemove = null; 
					document.onmouseup = null;
					//把还要操作的内容返回出去，，就可以回调了
					if(callback)callback.call(dom,nl,mw);
				};
			};
		};

		//格式化时间
		function getTime(timer){
			var m = parseInt(timer / 60);
			var s = parseInt(timer % 60);
			m = m < 10 ? "0" + m : m;
			s = s < 10 ? "0" + s : s;
			return m + ":" + s;
		};
	}
};
