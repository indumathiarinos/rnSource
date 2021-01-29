import React, { Component,} from 'react';
// import {WebView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';

    const testingpage=`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PageVio - Home</title>
        
    
        <!-- CSRF Token -->
        <meta name="csrf-token" content="jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk">
    
        <title>Laravel</title>
    
         
       <!--  <script src="http://pagevio.com/js/app.js"></script> -->
    
        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="http://pagevio.com/assets/web/css/responsive2.css" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Styles
        <link href="http://pagevio.com/css/app.css" rel="stylesheet"> -->
    </head>
    <!DOCTYPE html>
    
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0" />-->
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale = 1.0, shrink-to-fit=no" />-->
    
        <meta name="viewport" content="width=device-width, initial-scale = 1.0, user-scalable = no">
    
        <title>PageVio - Search Publications</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
      <link rel="icon" href="http://pagevio.com/assets/images/icons/favi.png" type="image/gif" sizes="16x16">
    
        <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/js/materialize.min.js"></script>-->
        <link rel="stylesheet" href="http://pagevio.com/assets/web/css/selectbox.min.css" />
        <link rel="stylesheet" href="http://pagevio.com/assets/web/css/custom.css" />
      <!--   <link rel="stylesheet" href="http://pagevio.com/assets/web/css/custom-styles.css" /> -->
      <meta name="csrf-token" content="jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk">
      
      <link rel="stylesheet" href="http://pagevio.com/assets/web/css/responsive2.css" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
    <style type="text/css">
    .profile--hover:hover{
        background:none !important;
        color:inherit;
    }
        /* -----------------------------------------
       Timeline
    ----------------------------------------- */
    .timeline {
      list-style: none;
      padding-left: 0;
      position: relative;
    }
    
    .timeline:after {
      
      height: auto;
      width: 1px;
      background: #e3e3e3;
      position: absolute;
      top: 5px;
      left: 30px;
      bottom: 25px;
    }
    
    .timeline.timeline-sm:after {
      left: 12px;
    }
    
    .timeline li {
      position: relative;
      padding-left: 70px;
      margin-bottom: 20px;
    }
    
    .timeline li:after {
      /*content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #e3e3e3;
      position: absolute;
      left: 24px;
      top: 5px;*/
    }
    
    .timeline li .timeline-date {
      display: inline-block;
      width: 100%;
      color: #a6a6a6;
      font-style: italic;
      font-size: 13px;
    }
    
    .timeline.timeline-icons li {
     padding:10px 10px;
    }
    
    .timeline.timeline-icons li:after {
      width: 32px;
      height: 32px;
      background: #fff;
      border: 1px solid #e3e3e3;
      left: 14px;
      top: 0;
      z-index: 11;
    }
    
    .timeline.timeline-icons li .timeline-icon {
      position: absolute;
      left: 23.5px;
      top: 7px;
      z-index: 12;
    }
    
    .timeline.timeline-icons li .timeline-icon [class*=glyphicon] {
      top: -1px !important;
    }
    
    .timeline.timeline-icons.timeline-sm li {
      padding-left: 15px;
      margin-bottom: 0;
    }
    
    .timeline.timeline-icons.timeline-sm li:after {
      left: -5px;
    }
    
    .timeline.timeline-icons.timeline-sm li .timeline-icon {
      left: 4.5px;
    }
    
    .timeline.timeline-advanced li {
      padding-top: 0;
    }
    
    .timeline.timeline-advanced li:after {
      background: #fff;
      border: 1px solid #29b6d8;
    }
    
    .timeline.timeline-advanced li:before {
      content: "";
      width: 52px;
      height: 52px;
      border: 10px solid #fff;
      position: absolute;
      left: 4px;
      top: -10px;
      border-radius: 50%;
      z-index: 12;
    }
    
    .timeline.timeline-advanced li .timeline-icon {
      color: #29b6d8;
    }
    
    .timeline.timeline-advanced li .timeline-date {
      width: 75px;
      position: absolute;
      right: 5px;
      top: 3px;
      text-align: right;
    }
    
    .timeline.timeline-advanced li .timeline-title {
      font-size: 17px;
      margin-bottom: 0;
      padding-top: 5px;
      font-weight: bold;
    }
    
    .timeline.timeline-advanced li .timeline-subtitle {
      display: inline-block;
      width: 100%;
      color: #a6a6a6;
    }
    
    .timeline.timeline-advanced li .timeline-content {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-right: 70px;
    }
    
    .timeline.timeline-advanced li .timeline-content p {
      margin-bottom: 3px;
    }
    
    .timeline.timeline-advanced li .timeline-content .divider-dashed {
      padding-top: 0px;
      margin-bottom: 7px;
      width: 200px;
    }
    
    .timeline.timeline-advanced li .timeline-user {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
    
    .timeline.timeline-advanced li .timeline-user:before,
    .timeline.timeline-advanced li .timeline-user:after {
      content: " ";
      display: table;
    }
    
    .timeline.timeline-advanced li .timeline-user:after {
      clear: both;
    }
    
    .timeline.timeline-advanced li .timeline-user .timeline-avatar {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      float: left;
      margin-right: 10px;
    }
    
    .timeline.timeline-advanced li .timeline-user .timeline-user-name {
      font-weight: bold;
      margin-bottom: 0;
    }
    
    .timeline.timeline-advanced li .timeline-user .timeline-user-subtitle {
      color: #a6a6a6;
      margin-top: -4px;
      margin-bottom: 0;
    }
    
    .timeline.timeline-advanced li .timeline-link {
      margin-left: 5px;
      display: inline-block;
    }
    
    .timeline-load-more-btn {
      margin-left: 70px;
    }
    
    .timeline-load-more-btn i {
      margin-right: 5px;
    }
    .no-timeline{
        text-align:center;
        margin:25px 0;
        margin-top:60px;
    }
    .do-notify{
        background:#C5F3FB;
    }
    .notify li:hover{
        background:#c5f3fb;
        color:#27A291;
    }
    /* -----------------------------------------
       Dropdown
    ----------------------------------------- */
    .dropdown-menu {
      padding: 0 0 0 0;
      box-shadow:0 3px 6px #27A291;
    }
    
    a.dropdown-menu-header {
      background: #f7f9fe;
      font-weight: bold;
      border-bottom: 1px solid #e3e3e3;
    }
    
    .dropdown-menu>li a {
      padding: 10px 20px;
    }
    
    /* -----------------------------------------
       Badge
    ----------------------------------------- */
    .notify::after {
        left: 18% !important;
    }
    .badge2 {
      padding: 3px 5px 2px;
      position: absolute;
      top: 10px;
      right: 10px;
      display: inline-block;
      min-width: 10px;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      line-height: 1;
      vertical-align: baseline;
      white-space: nowrap;
      text-align: center;
      border-radius: 10px;
    }
    
    .badge-danger {
      background-color: #db5565;
    }
    /* width */
    .timeline::-webkit-scrollbar {
      width: 5px;
    }
    
    /* Track */
    .timeline::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
     
    /* Handle */
    .timeline::-webkit-scrollbar-thumb {
      background: #888; 
    }
    
    /* Handle on hover */
    .timeline::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
    
    /*---notify css starts here ---*/
     .d-flex{
                display:flex;
            }
            .user-icons img{
                width:40px;
                height:40px !important;
                border:2px solid #27A291;
                border-radius:50%;
            }
            .post-icons img{
                width:50px;
                height:40px !important;
            }
            .flex-grow h5{
                font-size:14px;
                font-family:azoSansMedium;
                margin:4px 10px;
                margin-bottom:4px;
            }
            .flex-grow p{
                font-size:12px;
                font-family:azoSansRegular;
                color:#707070;
                margin:0 10px;
            }
            .flex-grow{
                width:100%;
                text-align: left;
            }
    </style>
       
    
    </head>
    
    <!--<header class="header">
        <a href="http://pagevio.com" class="logo">Imozzo</a>
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
        <div class='search-container hidden-xs'>
            <div class='search-area'>
                <input class='community-search' type="text" placeholder="Search by Title or Author" onclick="window.location.href='http://pagevio.com/search'"/>
                <i class="fa fa-search"></i>
            </div>
        </div>
        
            <label for="profile2" class="profile-dropdown">
            <input type="checkbox" id="profile2">
                    <img src="/uploads/profile/http://pagevio.com/uploads/profile/1610538444.png" class="profile--cover">
                    <span>jochals</span>
            <label for="profile2"><i class="fa fa-sort-desc" style="font-size:24px"></i></label>
            <ul class="profile_dropmenu">
                <li>
                            <a href="#"><img src="/uploads/profile/http://pagevio.com/uploads/profile/1610538444.png" class="image--cover"></a>
                           
                
                </li>
                <li>
                    <label style="text-align:center;display:block;">
                        <a href="http://pagevio.com/profile" class="view">View Profile</a>
                    </label>
                </li>
               <li><a href="http://pagevio.com/collections">Collections</a></li>
                <li><a href="http://pagevio.com/readlater">Read Later</a></li>
                <li><a href="http://pagevio.com/reminder">Reminders</a></li>
                <li><a href="http://pagevio.com/notification">Notifications</a></li>
                <li><a href="http://pagevio.com/following">Following</a></li>
                <li><a href="http://pagevio.com/settings">Settings</a></li>
                <li><a href="#">Help</a></li>
                            <li>
                    <a class="dropdown-item" href="http://pagevio.com/logout" onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                        Logout
                    </a>
                    <form id="logout-form" action="http://pagevio.com/logout" method="POST" style="display: none;">
                        <input type="hidden" name="_token" value="jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk">                </form>
                </li>
            </ul>
        </label>
        <ul class="menu">
                        <li>
                <div class="dropdown">            
                    <a class="dropdown-toggle" data-toggle="dropdown" ><i class="fa fa-edit" style="font-size:20px;" title="write"></i></a>
                    <div class="dropdown-menu browse create" style="width: 180px;">
                        <ul class="row" style="overflow: visible;">
                           
                            <li class="col-md-4" style="width: 100% !important;"><a href="http://pagevio.com/create-periodical">Create Periodical</a></li>
                            <li class="col-md-4" style="width: 100% !important;"><a href="http://pagevio.com/create-publication">Create Publication</a> </li>
                            <li class="col-md-4" style="width: 100% !important;"><a href="http://pagevio.com/create-series">Create Series</a></li>                      
                        </ul>
                    </div>
                </div>
            </li>
                   <li><a href="http://pagevio.com/bookmark"><i class="fa fa-bookmark" style="font-size:20px" title="bookmarks"></i></a></li>
            <li><a href="http://pagevio.com/newsfeed"><i class="fa fa-rss" style="font-size:20px" title="newsfeed"></i></a></li>
        </ul>
        
    </header>-->
    
    <header class="header ">
       <!-- <a href="http://pagevio.com" class="logo">Imozzo</a>  -->
        <a href="http://pagevio.com" class="logo" style="padding: 14px;padding-right: 40px;">
            <img src="http://pagevio.com/assets/images/icons/new_logo.png" style="width:110px;" class="hidden-xs"/>
             <img src="http://pagevio.com/assets/images/icons/favi.png" style="width:40px;" class="hidden-lg hidden-md hidden-sm"/>
            </a>  
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
        <div class='search-container hidden-xs'>
            <div class='search-area'>
                <input class='community-search' type="text" id="data" placeholder="Search by Title or Author" />
                <img src="http://pagevio.com/assets/images/icons/search.png" onclick="search(this)" />
            </div>
        </div>
            <label for="profile2" class="profile-dropdown">
            <input type="checkbox" id="profile2">
                         <img src="http://pagevio.com/uploads/profile/1610538444.png" class="profile--cover">
                     <span id="LoginUserName">jochals</span>
            <label for="profile2"><i class="fa fa-sort-desc"></i></label>
            <ul class="profile_dropmenu">
                <li>
                                        <a  class="profile--hover"><img src="http://pagevio.com/uploads/profile/1610538444.png" class="image--cover"></a>
                                </li>
                <li>
                    <label>
                        jochals<br />
                                                 <a href="http://pagevio.com/profile" class="view">View Profile</a>
                                         </label>
                </li>
                <li><a href="http://pagevio.com/collections">Collections</a></li>
                <li><a href="http://pagevio.com/readlater">Read Later</a></li>
                <li><a href="http://pagevio.com/reminder">Reminders</a></li>
                <li><a href="http://pagevio.com/notification/follow">Notifications</a></li>
                <li><a href="http://pagevio.com/following">Following</a></li>
                <li><a href="http://pagevio.com/summary/pages">Summary</a></li>
                <li><a href="http://pagevio.com/settings">Settings</a></li>
                <li><a href="http://pagevio.com/help">Help</a></li>
                                        <li>
                    <a class="dropdown-item" href="http://pagevio.com/logout" onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                        Logout
                    </a>
                    <form id="logout-form" action="http://pagevio.com/logout" method="POST" style="display: none;">
                        <input type="hidden" name="_token" value="jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk">                </form>
                </li>
            </ul>
        </label>
           <ul class="menu" style="margin-right: 10px;">
          <li>
                <div class="dropdown">
                      <a href="#" class="dropdown swap" role="button" data-toggle="dropdown" style="float: left" aria-expanded="true">
                       <!-- <i class="fa fa-bell-o p-0" style="font-size: 20px; float: left; color: black">-->
                          <img id="notify" src="http://pagevio.com/assets/images/icons/notify.png" title="notification">
                        <img id="c_notify" src="http://pagevio.com/assets/images/icons/c_notify.png" title="notification"> 
                        </i>
                      </a>
                     <span class="badge2 badge-danger" id="TotalNotification">0</span>
                      <ul class="dropdown-menu notify" role="menu" aria-labelledby="dropdownMenu1" style="margin-top: 60px;">
                        
                        <!--<div class="no-timeline" style="display:none">No Notifications</div>-->
                        <ul class="timeline timeline-icons timeline-sm" style="width:260px;overflow-y: auto;height: 300px;" id="notificationLoad">
                                                                   <li>
                         <p>No Notification Yet</p>
                         </li>
                                             </ul>
                      </ul>
                  </div>
            </li>
           <!--  <notification :userId="1" :unreads="[]"></notification> -->
    
        </ul>
        <ul class="menu">
                        <li>
                <div class="dropdown">
                    <a class="dropdown-toggle swap" data-toggle="dropdown">
              <img src="http://pagevio.com/assets/images/icons/write.png" title="create">
                    <img src="http://pagevio.com/assets/images/icons/write_hover.png" title="create">
            </a>
                    <div class="dropdown-menu browse create">
                        <ul class="row" style="overflow: visible;">
                            <li class="col-md-4 create-dropdown"><a href="http://pagevio.com/create-page">Create Page</a></li>
                            <!--<li class="col-md-4 create-dropdown"><a href="http://pagevio.com/create-series">Create Series</a></li>
                            <li class="col-md-4 create-dropdown"><a href="http://pagevio.com/create-periodical">Create Periodical</a></li>-->
                            <li class="col-md-4 create-dropdown"><a href="http://pagevio.com/create-publication">Create Publication</a> </li>
                           <!-- <li class="col-md-4 create-dropdown"><a href="http://pagevio.com/summary/pages">Summary</a></li>-->
                           <!-- <li class="col-md-4 create-dropdown"><a href="http://pagevio.com/summary/pages">Create Post</a></li>-->
                        </ul>
                    </div>
                </div>
            </li>
                     <li>
        
        <a href="http://pagevio.com/bookmark" class="swap">
          <img id="book" src="http://pagevio.com/assets/images/icons/bookmark.png" onclick="$('#book').css('display','none');$('#c_book').css('display','block')" title="bookmarks">
              <img id="c_book" src="http://pagevio.com/assets/images/icons/c_bookmark.png"  title="bookmarks">
        </a>
        </li>
            <li>
        <a href="http://pagevio.com/newsfeed" class="swap">
                    <img id="newsfeed" src="http://pagevio.com/assets/images/icons/newsfeed.png" title="newsfeed">
                   <img id="c_newsfeed" src="http://pagevio.com/assets/images/help/green-newsfeed.png" title="newsfeed"> 
        </a>
        </li>
    
        </ul>
         
      
    
     
    </header>
    
    <script type="text/javascript">
    
    $(document).ready(function(){
      var notify=  $('#TotalNotification').text();
      if(notify == '0'){
          $('.no-timeline').show();
          $('#notificationLoad').css('height','auto');
      }
    });
    $('body').keydown(function(e){
       if(e.keyCode==13 && $('#data').val())
        {
            search(e);
        }
    })
        function search(e)
        {
            var val=$('#data').val();
    
            $.ajax({
                type: "post",
                url: "http://pagevio.com/search-session",
                data: {data:val,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){ 
                console.log(data);
                    if (data == 'success') {
                      window.location.href="http://pagevio.com/search";
                    }     
                } 
            });
        }
    </script>
      <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
      <script>
        
        // Enable pusher logging - don't include this in production
        //Pusher.logToConsole = true;
    
        var pusher = new Pusher('eb99579b270892bad050', {
          cluster: 'ap2',
          forceTLS: true
        });
      var channel = pusher.subscribe('my-channel');
      /*  var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
          alert(JSON.stringify(data));
        });*/
    
      Pusher.log = function(message) {
        
        var html ="";
         $.ajax({
            type: "post",
            url: "http://pagevio.com/get-notification",
            data: {"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success: function(response){
             var data = JSON.parse(response);
             if (data.status == 'success') {
                var numCallbackRuns = 0;
                data.result.forEach(function(item, index){
                  numCallbackRuns++;
                    html +='<li><p style="margin-left: 25px;"><a href="'+item.data.actionURL+'/'+item.id+'"><b>'+item.data.user_name+'    </b>'+item.data.heading+'<b>      '+item.data.title+'</b></a><span class="timeline-icon"><i class="'+item.data.icon+'"></i></span><span class="timeline-date">'+item.created_at+'</span></p></li>'; 
                 });
                 /*$('#notificationLoad').html(html);
                $('#TotalNotification').html(numCallbackRuns);-->
                //console.log(numCallbackRuns);*/
               }  
            } 
         });
      };
      function notification(type,ids)
          { 
              //alert(type);
              var url1="http://pagevio.com/notification-read/type1/ids1";
              url1=url1.replace('type1',type);
              url1=url1.replace('ids1',ids);
              $.ajax({
                 type:'post',
                 url:url1,
                 data: {"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                 success:function(){
                     
                 },
              });
            //var url="http://pagevio.com/notification/type";
            //url=url.replace('type',type);
            //window.location.href=url;
          }
      </script>    <body>
              
            <style type="text/css">
    @font-face {
        font-family: azoSansRegular;
        src: url('../assets/fonts/Azo_Sans_W01_Regular.ttf');
    }
    @font-face {
        font-family: MontserratAlternates-Regular;
        src: url('../assets/fonts/MontserratAlternates-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: OpenSans-Regular;
        src: url('../assets/fonts/OpenSans-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: Merriweather-Regular;
        src: url('../assets/fonts/Merriweather-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: Lato-Regular;
        src: url('../assets/fonts/Lato-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: BebasNeue-Regular;
        src: url('../assets/fonts/BebasNeue-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: NotoSans-Regular;
        src: url('../assets/fonts/NotoSans-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: Roboto-BoldItalic;
        src: url('../assets/fonts/Roboto-BoldItalic.ttf');
    }
    @font-face {
        font-family: Roboto;
        src: url('../assets/fonts/Roboto-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: azoSansBold;
        src: url('../assets/fonts/Azo_Sans_W01_Bold.ttf');
    }
    
    @font-face {
        font-family: azoSansMedium;
        src: url('../assets/fonts/Azo_Sans_W01_Medium.ttf');
    }
    @font-face {
        font-family: PlayfairDisplay-Regular;
        src: url('../assets/fonts/PlayfairDisplay-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: Montserrat-Regular;
        src: url('../../fonts/Montserrat-Regular.ttf') format('truetype');
    }
    
    .selectbox{
            margin: 12px;
    }
    .navbar-right {
        margin-top: 8px;
    }
    .head_tabs {
        display: inline-flex;
        padding-left: 0;
        margin: 8px;
        text-align: center;
    }
    .head_tabs li {
        cursor: pointer;
        list-style-type: none;
        margin: 5px;
        margin-right: 45px;
        text-decoration: none;
        color: #707070;
    }
    /* -- Scrollable Progress bar -- */
    .progress {
      position: fixed;
     /* bottom: 0;*/
      top: 62px;
      left: 0;
      width: 100%;
      height: 62px;
      background: white;
      z-index: 6;
      box-shadow: none;
      border-radius:0px;
      display: flex;
      box-shadow: 1px 1px 14px 0 rgba(0,0,0,.1);
      transition: 0.5s ease-out;
    }
    .progress .bar {
      height: 100%;
      width: 10%;
      transition: background 0.15s ease;
    }
    
    .sample-bg{
        padding-top:100px !important;
    }
    
    
    .selectbox-options{
        height:200px;
        overflow-x:hidden;
        overflow-y:auto;
    }
    /* width */
    .selectbox-options::-webkit-scrollbar {
      width: 5px;
    }
    
    /* Track */
    .selectbox-options::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
     
    /* Handle */
    .selectbox-options::-webkit-scrollbar-thumb {
      background: #888; 
    }
    
    /* Handle on hover */
    .selectbox-options::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
    .selectbox__label:after{
        right:0px;
        margin-top:12px;
    }
    .selectbox__label {
        margin-right:0px;
           background: transparent;
        top: -18px;
        display: block;
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        text-overflow: ellipsis;
        padding: 26px 4px 5px 0px;
      }
      .selectbox__option{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chapter-content p span img {
          margin-top:8px;
      }
      .selectbox{
       background: transparent;
       width:172px;
       margin-right: 30px;
      }
      .navbar {
        border: none;
    }
    
    .btn{
            font-family: azoSansRegular;
    }
    .page_margin{
        width: 48%;
        margin: auto;
    
    }
    .subhead 
    {
            margin-bottom:10px;
    }
    .subhead .form-control:focus{
        border:none;
    }
    [type="radio"]:checked + label, [type="radio"]:not(:checked) + label {
        margin-left: 20px;
    }
    [type="file"]
    {
        display:none;
    }
    .form-default label {
        margin-bottom: 15px
    }
    .form-title{
        padding: 6px;
        width: 100%;
        border: none;
        background:transparent;
        margin-bottom:20px;
    }
    .form-title:focus{
        outline:0;
    }
    .form-default .form-control {
        border: 1px solid #707070;
        border-radius: 2px;
    }
    .accordiandiv {
        margin-bottom:20px;
    }
    .accordiandiv .collapse{
        margin: 0;
    }
    /*----------event starts here--------*/
    .event_label {
        color: #000;
        font-family: azoSansRegular;
    }
    .event_form {
        border: 1px solid #707070 !important;
        border-radius: 2px !important;
        margin-bottom: 12px;
        height: 34px;
        padding: 5px;
    }
    .fr-view img.fr-dii{
        margin-left:0 !important;
        margin-right:0 !important;
        max-width:100% !important;
    }
    .upload-btn-wrapper{
        display:none !important;
    }
    
    /*-----------------------*/
    /*Image Navigation*/
    #ImageNavigationdiv{
         width: 58%;
        margin: auto;
        margin-bottom: 10px;
    }
    
    /*------ Programme css starts here----*/
    .quickTable {
         width: 60%;
        margin: auto;
        margin-bottom: 10px;
    }
    .ProgramMaindiv {
        width: 60%;
        margin: auto;
        margin-bottom: 10px;
    }
    .ProgramMaindiv img {
        display:none !important;
    }
    .progtabs_stage th {
        text-align:center;
       background:#fff !important;
       height:30px;
    }
    .ProgramMaindiv {
        width:48%;
        margin: 0 auto;
    }
    .progtabs_stage td {
           border: 1px solid #707070;
        width: 115px;
        height: 40px; 
         word-break: break-all;
    }
    .tab-active{
        border: 2px solid #24D4BC !important;
    }
    .progtabs_nav td {
            border: 1px solid #707070;
        width: 130px;
        height: 85px; 
         word-break: break-all;
    }
    .program_save{
        background: #fff;
        border: none;
        height: 30px;
        color: #707070;
        margin: 0 20px;
        border-radius: 2px;
        width: 80px;
        box-shadow: 0 3px 6px #ccc;
    }
    /*-------------*/
    .QuickEvent  .btn {
        background-color: #fff;
        font-size: 14px;
        border: none;
        width:auto !important;
        cursor: pointer;
        border-radius: 5px;
        color: #707070;
        height: 32px;
        padding: 6px 18px;
        font-family: azoSansRegular;
        text-align: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .QuickProgram{
        width: 78% !important;
        margin: auto;
        margin-bottom: 10px;
    }
    .ProgramToolBar{
        display:none !important;
    }
    .QuickProgram img {
        display:none !important;
    }
    .program_sub{
        display:none !important;
    }
    [src="../../images/cancel.png"]{
        display:none !important;
    }
    .gm-fullscreen-control
    {
        display:none !important;
    }
    .gm-style-mtc
    {
        display:none !important;
    }
    .gmnoprint
    {
        display:none !important;
    }
    .vidfoc{
            width: 48%;
        margin: auto;
        margin-bottom: 10px;
    }
    .form-default .form-control:focus {
        border: 1px solid #707070;
        border-radius: 2px;
    }
    .reportradio label{
        margin-left:0 !important;
    }
    /*---- page style css starts here ---*/
    .sample-bg p{
        width:48% !important;
        margin:auto;
        
    }
    .QuotesToolBar
    {
        display:none !important;
    }
    .page-window .chapter-content p{
        width:48%;
        margin:auto;
        margin-bottom:10px;
    }
    /*--------*/
    body{
    font-family:inherit;
    }
    
      .fr-placeholder
      {
          display:none !important;
      }
      .fr-image-resizer{
          display:none !important;
      }
    .community-search{
        font-family:azoSansRegular;
    }
    
    video{
        max-width:100%;
    }
          #follow{
            background: #fff;
            color: #707070;
            width: 150px;
            height: 32px;
            margin-top: 20px;
         }
         #unfollow{
                background-color: #24d4bc;
              color: #ffff;
                    width: 150px;
                    height: 32px;
                    margin-top: 20px
             }
         .imgcan{
    display:none;
     position: absolute;
        top: 2px;
        right: 2px;
        z-index: 100;
    }
    .subhead img
    {
        display:none !important;
    }
    .subheadtool
    {
        display:none !important;
    }
    .txtarea
    {
        height:30px;
        width:500px;
        overflow:hidden;
        border:none;
    }
    .imageToolbar
    {
      display:none !important;
       
    }
    .subtitle{
        border:none;
        box-shadow:none;
        text-align:left;
        width:100%;
        padding:6px 6px 6px 0;
    }
    .subtitle:focus
    {
         outline:0;
        box-shadow:none;
    }
    input:read-only {
      background-color: white;
    }
    .readonly {
      background-color: white !important;
    }
    .capoverlay
    {
        position:absolute;
        background:transparent;
    }
    .justovelay
    {
        
    }
    /* -- Image Animation -- */
    .animation{
    visibility: visible;
     -webkit-animation-delay: 0.1s;
      -moz-animation-delay: 0.1s;
       animation-delay: 0.1s;
      }
      body{
          overflow-x:hidden;
      }
    .removealert
      {
      }
      .capoverlay
    {
        position:absolute;
        background:transparent;
    }
    .vidfoc img{
        display:none !important;
    }
    .ToolBar{
        display:none !important;
    }
    .removeStxt {
       display:none !important; 
    }
    .delDoubleFld {
      display:none !important;
    }
    .delTxtareaFld {
      display:none !important;
    }
    .delRadioBtnFld {
      display:none !important;
    }
    .eventToolbar5{
          display:none !important;
    }
    .eventToolbar6 {
      display:none !important;
    }
    .eventToolbar2 {
      display:none !important;
    }
    .eventToolbar3 {
      display:none !important;
    }
    .eventToolbar1{
          display:none !important;
    }
    .fa-sm {
      display:none !important;
    }
    #closedIconForm {
        display:none !important;
    }
    .formsendbtn {
       /* display:none !important;*/
    }
    .form-default input:read-only {
        border:none !important;
        box-shadow:none;
    }
    .form-control {
        font-family: azoSansRegular;
    }
    .form-default{
        width:48% !important;
        margin:0 auto;
        
    }
    .FormToolBar
    {
        display:none !important;
    }
    .probtn{
        background-color: #fff;
        color: black;
        font-size: 14px !important;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        color: #707070;
        height: 32px;
        width:auto !important;
        padding: 6px 18px !important;
        font-family: azoSansRegular;
        text-align: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
        background-color: #fff;
        opacity: 1;
    }
    .page_padding{
         width: 48%;
        margin: auto;
        margin-bottom: 10px;
    }
    .seperatorspan, .seperatorspan hr{
            cursor: text !important;
    }
    .event_form:focus{
        outline:0;
    }
    .subhead .subtitlte:focus{
        border-bottom:none;
    }
    #ImageNavigationdiv img{
        display:initial;
        margin:5px !important;
    
    }
    @media  only screen and (max-width:800px){
        .page-window .chapter-content p {
        width: 80% !important;
        }
    }
    .seperatorspan 
    {
        text-align:center;
    }
    .seperatorspan hr{
        display:inline-flex;
        width:100%;
    }
    .sample-bg p
    {
        display:none !important;
    }
    .save_event {
        background-color: #fff;
        color: black;
        font-size: 14px !important;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        color: #707070;
        height: 32px;
        width:auto !important;
        padding: 6px 18px !important;
        font-family: azoSansRegular;
        text-align: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .event_img{
        height: 200px;
        width: 100%;
        object-fit: cover;
        object-position: center;
        margin-left:0;
        margin-right:0;
        max-width:100%;
        margin-bottom: 12px;
        cursor: pointer;
    }
    .chapter-title img
    {
      display:none !important;   
    }
    .chapter-title
    {
      color:black !important;   
    }
    .accordiandiv .btn{
        padding: 6px 18px;
        font-family: azoSansRegular;
        font-size: 14px;
    }
    .hidextracom
    {
        display:none;
    }
    .nav-head
           {
               height:75px !important;
           }
           .out-bookmark{
                cursor:pointer;
                position:absolute !important;
                right:24%;
            }
            .popup-hide-2
            {
                display:none !important;
            }
            .popup-open
            {
                display:block;
            }
            .popup-close
            {
                display:none;
            }
            .highlight
    {
        background-color:#27A291;
        color:#fff;
    }
    .highlight a{
        color:#fff;
    }
    .titlsolidcolor
    {
        width: 50%;
        height: 75px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
    }
    .sample-bg .titlsolidcolor
    {
        width:0;
        height:0;
        background-color:unset;
    }
    .titlsolidcolorpanroma
    {
        width:100%;
    }
    .subheadtitlenavigation
    {
        cursor:pointer;
    }
    
    </style>
    <script>
        <!--< //href="http://www.pinterest.com/pin/create/button/?url=<page url (encoded)>&media=<picture url (encoded)>&description=<HTML-encoded description>" target="_blank" class="pinterest-anchor pinterest-hidden">-->
        
            function myFunction(){
                var x = document.URL;
                document.getElementById("tumblr").setAttribute('href','https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dlink%26title%26canonicalUrl%'+x+'%26shareSource%3Dtumblr_share_button' );
                document.getElementById("fb").setAttribute('href','https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&u='+x+'&display=popup&ref=plugin&src=share_button' );
                document.getElementById("tweet").setAttribute('href','https://twitter.com/intent/tweet?hashtags=pagevio&original_referer=http%3A%2F%2Fpagevio.arinos.co.uk%2Fpublication-cover-description%2F194&ref_src=twsrc%5Etfw&text=Type%20Something&tw_p=tweetbutton&url='+x+'&via=pagevio');
                document.getElementById("pinterest").setAttribute('href','http://www.pinterest.com/pin/create/button/?url='+x+'&"&description=<HTML-encoded description>');    
               // document.getElementById("embed").setAttribute('href','http://api.embed.ly/1/oembed?format=json&url='+x+'');
                document.getElementById("mail").setAttribute('href','mailto:?body='+x+'&message="check this link"');
            }
            function newfunc()
            {
                var v=document.getElementsByClassName('embedly-button')[0];
                var b=v.contentDocument;
                b=b.body;
                b=$(b).find('button');
                b[0].click();
            }
        </script>
      <link rel="stylesheet" href="http://pagevio.com/assets/web/css/popups.css" />
      <link rel="stylesheet" href="http://pagevio.com/assets/web/css/froala_editor.css">
        <link rel="stylesheet" href="http://pagevio.com/assets/web/css/page-sample.css" />
        <!--<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />-->
        <script type="text/javascript" src="http://pagevio.com/assets/web/js/ModifiedAudioPlayer.js"></script>
        <link rel="stylesheet" href="http://pagevio.com/assets/web/css/createpage__audioplayer.css"/>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
        <link rel="stylesheet" href="http://pagevio.com/assets/web/css/froala_style.css">
            <section class="sample-bg">
      <div style="height: 100%; background-color: unset;">
      <p contenteditable="true" placeholder="Title..." style="text-align: center;">
      Testing for quick insert</p><img id="titlorgimg" style="width: 100%; height: 200px; object-fit: cover;" onclick="titshowimgwid(this)" class="panroma" src="http://pagevio.com/uploads/stories/310px-seek=116-Big_Buck_Bunny_4K.webm.jpg"><img src="../../images/cancel.png" onclick="ClearImage(1)" class="imgcan"></div>
      </section>
               
               <div class="page-window">
                   <h2 id="page-title" class="chapter-title"><div style="height: 100%; background-color: unset;"><p contenteditable="true" placeholder="Title..." style="text-align: center;">Testing for quick insert</p><img id="titlorgimg" style="width: 100%; height: 200px; object-fit: cover;" onclick="titshowimgwid(this)" class="panroma" src="http://pagevio.com/uploads/stories/310px-seek=116-Big_Buck_Bunny_4K.webm.jpg"><img src="../../images/cancel.png" onclick="ClearImage(1)" class="imgcan"></div></h2>
                    <span id="page-subtitle" style="" class="chapter-title"></span>
    
                    <div class="chapter-content fr-element fr-view" contenteditable="false">
                        <p><strong>Below attached image</strong></p><p><br></p><p><span class="fr-img-caption fr-fic fr-dib fr-draggable" contenteditable="false" draggable="false" style="width: 538px;"><span class="fr-img-wrap" onclick="shwimgtoolnew(1,this,event)"><img src="/uploads/stories/1610197127.jpg" id="Image_1" class="fr-draggable" onclick="myFunction(event)"><code class="imageToolbar" contenteditable="false" id="Imgcaptool_1" style="display: none;"><i onclick="ImgCapProp('B',event)" class="fa fa-bold" aria-hidden="true"></i><i onclick="ImgCapProp('I',event)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="ImgCapProp('left',event)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="ImgCapProp('center',event)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="ImgCapProp('right',event)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-square" onclick="ImgCapProp('overlay',event)" aria-hidden="true"></i></code><span contenteditable="false" style="text-align:left;"><input id="imgcapinp1_1" type="text" style="margin-right:100px;background:transparent;font-size:15px;" class="subtitle" placeholder="Caption(optional)" value="" onkeydown="Edit2BackspaceInp(this,event)"><input id="imgcapinp2_1" style="margin-right:100px;background:transparent;font-size:13px;" class="subtitle" placeholder="Image Credits(optional)" value="" onkeydown="Edit2BackspaceInp(this,event)"></span></span></span></p><p><strong>Audio</strong></p><div class="vidfoc" contenteditable="false" id="AudioPlayer_1" style="text-align: right;"><img src="../../images/cancel.png" alt="" style="cursor: pointer;" class="fr-draggable"><div class="audioplayer audioplayer-playing" contenteditable="false"><audio id="Audio_1" style="width: 0px; height: 0px; visibility: hidden;"><source src="http://pagevio.com/uploads/stories/file_example_MP3_1MG.mp3"></audio><div class="audioplayer-playpause" contenteditable="false" title=""><a href="#" data-touched="true"></a></div><div class="audioplayer-time audioplayer-time-current" contenteditable="false">00:01</div><div class="audioplayer-bar" contenteditable="false"><div contenteditable="false" class="audioplayer-bar-loaded" style="width: 100%;"></div><div contenteditable="false" class="audioplayer-bar-played" style="width: 0.492514%;"></div></div><div class="audioplayer-time audioplayer-time-duration" contenteditable="false">00:28</div><div class="audioplayer-volume" contenteditable="false"><div class="audioplayer-volume-button" contenteditable="false" title=""><a href="#"></a></div><div class="audioplayer-volume-adjust" contenteditable="false"><div><div style="width: 100%;"><br></div></div></div></div></div><section class="ToolBar" id="audiotoolbar_1" style="top: 105px; display: none;"><i class="fa fa-bold" aria-hidden="true"></i><i class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" aria-hidden="true"></i><i class="fa fa-align-center" aria-hidden="true"></i><i class="fa fa-align-right" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></section><input id="Audiotitle_1" class="form-control subtitle" placeholder="Title.." value="testing audio caption"></div><p><br></p><p><strong>Testing Quotes</strong></p><div class="page_margin" contenteditable="false" id="QuoteId_1" style="position:relative;margin-bottom:10px;" onclick="SetCurrQuoteId('1',this)"><img src="../../images/cancel.png" class="main-form-cancel fr-draggable fr-fir" onclick="RemoveQuote('1')"><code class="QuotesToolBar" contenteditable="false" id="QuotesToolBar_1" style="top: -18px; position: absolute; display: none;"><i class="fa fa-bold" onclick="QuoteProperties('B')" aria-hidden="true"></i><i class="fa fa-italic" onclick="QuoteProperties('I')" aria-hidden="true"></i><i class="fa fa-align-left" onclick="QuoteProperties('left')" aria-hidden="true"></i><i class="fa fa-align-center" onclick="QuoteProperties('center')" aria-hidden="true"></i><i class="fa fa-align-right" onclick="QuoteProperties('right')" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></code><input class="subtitle" style="background:transparent;font-size:15px;" id="QuoteInput_1" type="text" placeholder="Write Quote" value="&quot;inserted data for quotes&quot;" onkeydown="Edit2BackspaceInp(this,event)" oninput="QuotesInput(this,event)"><input style="background:transparent;font-size:13px;" class="subtitle" id="QuoteCitan_1" type="text" placeholder="Citan (optional)" value="citan test" onkeydown="Edit2BackspaceInp(this,event)" oninput="QuotesInput(this,event)"></div><p><strong>Testing</strong></p><div class="page_margin subhead" contenteditable="false" style="position: relative; z-index: 999;"><div><img class="main-form-cancel fr-draggable fr-fir" src="../../images/cancel.png"><code class="subheadtool" id="SubheadToolbar_0" style="top: -15px; display: flex;"><i onclick="SubheadProp('B',getId)" class="fa fa-bold" aria-hidden="true"></i><i onclick="SubheadProp('I',getId)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-align-left" onclick="SubheadProp('left',getId)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="SubheadProp('center',getId)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="SubheadProp('right',getId)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></code><input class="form-control subtitle subheadnavi" id="subheading0" placeholder="Subheading" style="background: transparent;" value="Heading "><input class="form-control subtitle subheadnavi" id="parasubtitle0" placeholder="Subtitle (optional)" style="background: transparent;" value="subtite"></div></div><p><br></p><div class="page_margin subhead" contenteditable="false" style="position: relative; z-index: 999;"></div><p>Testing separator</p><div class="seperatorspan page_padding" contenteditable="false" id="span_2" style="cursor:pointer;"><img id="hrcan_2" src="../../images/cancel.png" style="left: 95%; top: 30px; cursor: pointer;" class="fr-draggable" onclick="hrdel(2)"><hr style="cursor:pointer;" id="HR_2"></div><p><br></p><p>Map</p><div class="page_padding" contenteditable="false" id="map_2"><img src="../../images/cancel.png" class="main-form-cancel fr-draggable fr-fir"><div class="mapCanvas" id="map_canvas_2" style="width: 100%; height: 350px; position: relative; overflow: hidden;"><div style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);"><div class="gm-style" style="position: absolute; z-index: 0; left: 0px; top: 0px; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px;"><div tabindex="0" aria-label="Map" aria-roledescription="map" role="img" style="position: absolute; z-index: 0; left: 0px; top: 0px; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; cursor: url(&quot;https://maps.gstatic.com/mapfiles/openhand_8_8.cur&quot;), default;"><div style="z-index: 1; position: absolute; left: 50%; top: 50%; width: 100%; transform: translate(0px, 0px);"><div style="position: absolute; left: 0px; top: 0px; z-index: 100; width: 100%;"><div style="position: absolute; left: 0px; top: 0px; z-index: 0;"><div style="position: absolute; z-index: 985; transform: matrix(1, 0, 0, 1, -214, -140);"><div style="position: absolute; left: 256px; top: 0px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div><div style="position: absolute; left: 0px; top: 0px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div><div style="position: absolute; left: 0px; top: -256px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div><div style="position: absolute; left: 256px; top: -256px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div><div style="position: absolute; left: 256px; top: 256px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div><div style="position: absolute; left: 0px; top: 256px; width: 256px; height: 256px;"><div style="width: 256px; height: 256px;"></div></div></div></div></div><div style="position: absolute; left: 0px; top: 0px; z-index: 101; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 102; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 103; width: 100%;"><div style="width: 27px; height: 43px; overflow: hidden; position: absolute; left: -14px; top: -43px; z-index: 0;"><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png" draggable="false" style="left: 0px; top: 0px; width: 27px; height: 43px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 0px; top: 0px; z-index: -1;"><div style="position: absolute; z-index: 985; transform: matrix(1, 0, 0, 1, -214, -140);"><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 256px; top: 0px;"></div><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 0px; top: 0px;"></div><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 0px; top: -256px;"></div><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 256px; top: -256px;"></div><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 256px; top: 256px;"></div><div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 0px; top: 256px;"></div></div></div></div><div style="position: absolute; left: 0px; top: 0px; z-index: 0;"><div style="position: absolute; z-index: 985; transform: matrix(1, 0, 0, 1, -214, -140);"><div style="position: absolute; left: 256px; top: 0px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25837!3i16266!4i256!2m3!1e0!2sm!3i538262670!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=83166" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 256px; top: -256px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25837!3i16265!4i256!2m3!1e0!2sm!3i538262694!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=80433" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 256px; top: 256px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25837!3i16267!4i256!2m3!1e0!2sm!3i538262670!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=95256" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 0px; top: 0px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25836!3i16266!4i256!2m3!1e0!2sm!3i538262670!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=326" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 0px; top: 256px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25836!3i16267!4i256!2m3!1e0!2sm!3i538262670!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=12416" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div><div style="position: absolute; left: 0px; top: -256px; width: 256px; height: 256px; transition: opacity 200ms linear 0s;"><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i25836!3i16265!4i256!2m3!1e0!2sm!3i538262670!2m3!1e2!6m1!3e5!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5zOi02MHxwLmw6LTYw!4e0!5m1!5f2&amp;key=AIzaSyAv43_cLHUT0sSGUdaXeE5oKuZRA4T-YzQ&amp;token=119307" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div></div></div></div><div class="gm-style-pbc" style="z-index: 2; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; opacity: 0;"><p class="gm-style-pbt"></p></div><div style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px;"><div style="z-index: 4; position: absolute; left: 50%; top: 50%; width: 100%; transform: translate(0px, 0px);"><div style="position: absolute; left: 0px; top: 0px; z-index: 104; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 105; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"><div title="Pune" aria-label="Pune" role="img" style="width: 43px; height: 59px; overflow: hidden; position: absolute; cursor: pointer; left: -22px; top: -51px; z-index: 0;"><img alt="" src="https://maps.gstatic.com/mapfiles/transparent.png" draggable="false" style="left: 0px; top: 0px; width: 43px; height: 59px; user-select: none; border: 0px; padding: 0px; max-width: none;" class="fr-fil fr-dib fr-draggable"></div></div><div style="position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;"></div></div></div></div><iframe aria-hidden="true" frameborder="0" tabindex="-1" style="z-index: -1; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; border: none;"></iframe><div style="pointer-events: none; width: 100%; height: 100%; box-sizing: border-box; position: absolute; z-index: 1000002; opacity: 0; border: 2px solid rgb(26, 115, 232);"></div><div></div><div></div><div></div><div></div><div><button draggable="false" title="Toggle fullscreen view" aria-label="Toggle fullscreen view" type="button" class="gm-control-active gm-fullscreen-control" style="background: none rgb(255, 255, 255); border: 0px; margin: 10px; padding: 0px; text-transform: none; appearance: none; position: absolute; cursor: pointer; user-select: none; border-radius: 2px; height: 40px; width: 40px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; overflow: hidden; top: 0px; right: 0px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fil fr-dib fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"></button></div><div></div><div></div><div></div><div><div class="gmnoprint gm-bundled-control gm-bundled-control-on-bottom" draggable="false" controlwidth="0" controlheight="0" style="margin: 10px; user-select: none; position: absolute; display: none; bottom: 26px; left: 0px;"><div class="gmnoprint" controlwidth="40" controlheight="40" style="display: none; position: absolute;"><div style="width: 40px; height: 40px;"><button draggable="false" title="Rotate map 90 degrees" aria-label="Rotate map 90 degrees" type="button" class="gm-control-active" style="background: none rgb(255, 255, 255); display: none; border: 0px; margin: 0px 0px 32px; padding: 0px; text-transform: none; appearance: none; position: relative; cursor: pointer; user-select: none; width: 40px; height: 40px; top: 0px; left: 0px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fil fr-dib fr-draggable" style="height: 18px; width: 18px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fic fr-dii fr-draggable" style="height: 18px; width: 18px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fic fr-dii fr-draggable" style="height: 18px; width: 18px;"></button><button draggable="false" title="Tilt map" aria-label="Tilt map" type="button" class="gm-tilt gm-control-active" style="background: none rgb(255, 255, 255); display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: relative; cursor: pointer; user-select: none; width: 40px; height: 40px; top: 0px; left: 0px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fil fr-dib fr-draggable" style="width: 18px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fic fr-dii fr-draggable" style="width: 18px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fic fr-dii fr-draggable" style="width: 18px;"></button></div></div></div></div><div><div class="gmnoprint gm-bundled-control gm-bundled-control-on-bottom" draggable="false" controlwidth="40" controlheight="81" style="margin: 10px; user-select: none; position: absolute; bottom: 95px; right: 40px;"><div class="gmnoprint" controlwidth="40" controlheight="81" style="position: absolute; left: 0px; top: 0px;"><div draggable="false" style="user-select: none; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px; cursor: pointer; background-color: rgb(255, 255, 255); width: 40px; height: 81px;"><button draggable="false" title="Zoom in" aria-label="Zoom in" type="button" class="gm-control-active" style="background: none; display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: relative; cursor: pointer; user-select: none; overflow: hidden; width: 40px; height: 40px; top: 0px; left: 0px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fil fr-dib fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23333%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23111%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"></button><div style="position: relative; overflow: hidden; width: 30px; height: 1px; margin: 0px 5px; background-color: rgb(230, 230, 230); top: 0px;"></div><button draggable="false" title="Zoom out" aria-label="Zoom out" type="button" class="gm-control-active" style="background: none; display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: relative; cursor: pointer; user-select: none; overflow: hidden; width: 40px; height: 40px; top: 0px; left: 0px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fil fr-dib fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A" alt="" style="height: 18px; width: 18px;" class="fr-fic fr-dii fr-draggable"></button></div></div></div></div><div><div style="margin-left: 5px; margin-right: 5px; z-index: 1000000; position: absolute; left: 0px; bottom: 0px;"><a target="_blank" rel="noopener" href="https://maps.google.com/maps?ll=1.29027,103.851959&amp;z=15&amp;t=m&amp;hl=en-IN&amp;gl=US&amp;mapclient=apiv3" title="Open this area in Google Maps (opens a new window)" style="position: static; overflow: visible; float: none; display: inline;"><div style="width: 66px; height: 26px; cursor: pointer;"><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/google4_hdpi.png" draggable="false" style="left: 0px; top: 0px; width: 66px; height: 26px; user-select: none; border: 0px; padding: 0px;" class="fr-fil fr-dib fr-draggable"></div></a></div></div><div></div><div><div class="gmnoprint" style="z-index: 1000001; position: absolute; right: 71px; bottom: 0px; width: 55px;"><div draggable="false" class="gm-style-cc" style="user-select: none; height: 14px; line-height: 14px;"><div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;"><div style="width: 1px;"></div><div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div></div><div style="position: relative; padding-right: 6px; padding-left: 6px; box-sizing: border-box; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(0, 0, 0); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a style="text-decoration: none; cursor: pointer;">Map Data</a><span style="display: none;">Map data ©2021 Google, Urban Redevelopment Authority</span></div></div></div><div class="gmnoprint gm-style-cc" draggable="false" style="z-index: 1000001; user-select: none; height: 14px; line-height: 14px; position: absolute; right: 0px; bottom: 0px;"><div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;"><div style="width: 1px;"></div><div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div></div><div style="position: relative; padding-right: 6px; padding-left: 6px; box-sizing: border-box; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(0, 0, 0); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a href="https://www.google.com/intl/en-IN_US/help/terms_maps.html" target="_blank" rel="noopener" style="text-decoration: none; cursor: pointer; color: rgb(0, 0, 0);">Terms of Use</a></div></div><div class="gmnoscreen" style="position: absolute; right: 0px; bottom: 0px;"><div style="font-family: Roboto, Arial, sans-serif; font-size: 11px; color: rgb(0, 0, 0); direction: ltr; text-align: right; background-color: rgb(245, 245, 245);">Map data ©2021 Google, Urban Redevelopment Authority</div></div></div><div style="background-color: white; padding: 15px 21px; border: 1px solid rgb(171, 171, 171); font-family: Roboto, Arial, sans-serif; color: rgb(34, 34, 34); box-sizing: border-box; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px; z-index: 10000002; display: none; width: 253px; height: 180px; position: absolute; left: 5px; top: 85px;"><div style="padding: 0px 0px 10px; font-size: 16px; box-sizing: border-box;">Map Data</div><div style="font-size: 13px;">Map data ©2021 Google, Urban Redevelopment Authority</div><button draggable="false" title="Close" aria-label="Close" type="button" class="gm-ui-hover-effect" style="background: none; display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: absolute; cursor: pointer; user-select: none; top: 0px; right: 0px; width: 37px; height: 37px;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%3C%2Fsvg%3E%0A" class="fr-fic fr-dib fr-draggable" style="pointer-events: none; width: 13px; height: 13px;"></button></div></div></div><div style="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 1;"><div><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/google_gray.svg" draggable="false" style="padding: 0px; border: 0px; height: 17px; width: 52px; user-select: none;" class="fr-fil fr-dib fr-draggable"></div><div style="line-height: 20px; margin: 15px 0px;"><span style="color: rgba(0, 0, 0, 0.87); font-size: 14px;">This page can't load Google Maps correctly.</span></div><table style="width: 100%;"><tr><td style="line-height: 16px; vertical-align: middle;"><a href="https://developers.google.com/maps/documentation/javascript/error-messages?utm_source=maps_js&amp;utm_medium=degraded&amp;utm_campaign=billing#api-key-and-billing-errors" target="_blank" rel="noopener" style="color: rgba(0, 0, 0, 0.54); font-size: 12px;">Do you own this website?</a></td><td style="text-align: right;"><button class="dismissButton">OK</button></td></tr></table></div></div></div><p><br></p><p><br></p><p>Form</p><p><br></p><p><br></p><p><br></p><p><div class="formclose1" contenteditable="false" id="newformdiv1"><br><br><a contenteditable="false" id="closedIconForm" onclick="formclose(1)"><img src="../../images/cancel.png" class="main-form-cancel fr-draggable fr-fir" contenteditable="false"></a><div class="form-default" style="box-shadow: 0px 3px 6px #27A291;padding: 10px;width: auto;height: auto;"><div class="row" contenteditable="false" id="formIdeField" style="padding: 15px;position:relative;"><code class="FormToolBar" contenteditable="false" style="top: -10px; position: absolute; display: none;"><i class="fa fa-bold" onclick="FormProperties(this,'B')" aria-hidden="true"></i><i class="fa fa-italic" onclick="FormProperties(this,'I')" aria-hidden="true"></i><i class="fa fa-align-left" onclick="FormProperties(this,'left')" aria-hidden="true"></i><i class="fa fa-align-center" onclick="FormProperties(this,'center')" aria-hidden="true"></i><i class="fa fa-align-right" onclick="FormProperties(this,'right')" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i></code><input type="text" class="form-title" id="form_title_1" placeholder="Title" value="test"></div><div contenteditable="false" style="font-size:18px;position:relative;z-index: 99999999;"><img src="http://pagevio.com/assets/images/icons/add.png" style="left: -55px;" class="fa fa-plus-circle fa-sm fr-fil fr-dib fr-draggable" id="frmsectool_1" contenteditable="false" onclick="shwtool(1)" aria-hidden="true"><section id="frmtool_1" contenteditable="false" class="eventToolbar6"><i class="fa fa-pencil fa-sm" onclick="addSingleText(1)" aria-hidden="true"></i><i class="fa fa-pencil-square-o fa-sm" onclick="addDoubleText(1)" aria-hidden="true"></i><i class="fa fa-square-o fa-sm" onclick="addTextarea(1)" aria-hidden="true"></i><i class="fa fa-dot-circle-o fa-sm" onclick="addRadioBtn(1)" aria-hidden="true"></i></section></div><div class="form-group row" contenteditable="false"><div class="col-sm-12 formsendbtn"><button class="btn" style="float:right;box-shadow: 0 3px 6px #ccc;" type="button">Send</button></div></div></div></div></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Event</p><div class="QuickEvent page_padding" contenteditable="false" id="Event_1" style="position: relative;"><img src="../../images/cancel.png" id="cancel_1" style="left: 95%; top: 20px;" class="fr-draggable"><section class="eventToolbar1" contenteditable="false" id="eventtoolbar_1" style="display: none;"><i onclick="ToolbarSty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="ToolbarSty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-align-left" onclick="ToolbarSty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="ToolbarSty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="ToolbarSty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><input type="text" id="titl_1" placeholder="Title" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" value="test" onkeydown="Edit2BackspaceInp(this,event)"><br><div class="upload-btn-wrapper"><i class="fa fa-image round_media_btn" aria-hidden="true"></i><input type="file" name="myfile" value="" onkeydown="Edit2BackspaceInp(this,event)"></div><div style="position: relative;"><section class="eventToolbar2" contenteditable="false" id="desctoolbar_1" style="display: none;"><i onclick="DescbarSty('B',currentdescid)" class="fa fa-bold" aria-hidden="true"></i><i onclick="DescbarSty('I',currentdescid)" class="fa fa-italic" aria-hidden="true"></i><i onclick="DescbarSty('U',currentdescid)" class="fa fa-underline" aria-hidden="true"></i><i onclick="DescbarSty('S',currentdescid)" class="fa fa-strikethrough" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="DescbarSty('left',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="DescbarSty('center',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="DescbarSty('right',currentdescid)" aria-hidden="true"></i><i onclick="DescbarSty('IN',currentdescid)" class="fa fa-indent" aria-hidden="true"></i><i onclick="DescbarSty('OU',currentdescid)" class="fa fa-outdent" aria-hidden="true"></i><i onclick="DescbarSty('CO',currentdescid)" class="fa fa-columns" aria-hidden="true"></i><i onclick="DescbarSty('OL',currentdescid)" class="fa fa-list-ol" aria-hidden="true"></i><i onclick="DescbarSty('UL',currentdescid)" class="fa fa-list-ul" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-list" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><textarea class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" id="desc_1" placeholder="Description" style="resize:none;" value="test">test</textarea></div><span id="add-date"><span class="event_label" style="margin-right: 70px;">Date:</span><input class="event_form" type="date" style="width:140px;" value="2021-01-16" onkeydown="Edit2BackspaceInp(this,event)">&nbsp;&nbsp;&nbsp;<input class="event_form" type="type" value="08:00pm" style="width:85px;" onkeydown="Edit2BackspaceInp(this,event)"></span><div style="position: relative;"><section class="eventToolbar3" contenteditable="false" id="maptoolbar_1" style="display: none;"><i onclick="MapbarSty('B',this)" class="fa fa-bold" aria-hidden="true"></i><i onclick="MapbarSty('I',this)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-map" onclick="MapbarSty('map',this)" aria-hidden="true"></i><span style="display:none"><label>Enter Location</label> <input onkeydown="Edit2BackspaceInp(this,event)" id="Event_location_1" type="text" class="map_input pac-target-input" placeholder="Enter a location" autocomplete="off" value=""></span></section><span class="event_label" style="margin-right: 45px;">Location:</span><input class="event_form" type="text" id="locate_1" placeholder="Location Name" style="width:78%;" value="chennai" onkeydown="Edit2BackspaceInp(this,event)"></div><input class="btn save_event" id="EventBtn_1" type="button" value="Save The Date" onkeydown="Edit2BackspaceInp(this,event)"><br><br><br></div><p>Promotion</p><div class="QuickPromo page_padding" contenteditable="false" id="Event_3" style="position: relative;"><img src="../../images/cancel.png" id="cancel_3" style="left: 95%; top: 20px;" class="fr-draggable"><section class="eventToolbar1" contenteditable="false" id="eventtoolbar_3" style="display: none;"><i onclick="ToolbarSty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="ToolbarSty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-align-left" onclick="ToolbarSty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="ToolbarSty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="ToolbarSty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><input type="text" id="titl_3" placeholder="Title" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" value="test"><br><div class="upload-btn-wrapper"><i class="fa fa-image round_media_btn" aria-hidden="true"></i><input type="file" name="myfile" value=""></div><div style="position: relative;"><section class="eventToolbar2" contenteditable="false" id="desctoolbar_3" style="display: none;"><i onclick="DescbarSty('B',currentdescid)" class="fa fa-bold" aria-hidden="true"></i><i onclick="DescbarSty('I',currentdescid)" class="fa fa-italic" aria-hidden="true"></i><i onclick="DescbarSty('U',currentdescid)" class="fa fa-underline" aria-hidden="true"></i><i onclick="DescbarSty('S',currentdescid)" class="fa fa-strikethrough" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="DescbarSty('left',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="DescbarSty('center',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="DescbarSty('right',currentdescid)" aria-hidden="true"></i><i onclick="DescbarSty('IN',currentdescid)" class="fa fa-indent" aria-hidden="true"></i><i onclick="DescbarSty('OU',currentdescid)" class="fa fa-outdent" aria-hidden="true"></i><i onclick="DescbarSty('CO',currentdescid)" class="fa fa-columns" aria-hidden="true"></i><i onclick="DescbarSty('OL',currentdescid)" class="fa fa-list-ol" aria-hidden="true"></i><i onclick="DescbarSty('UL',currentdescid)" class="fa fa-list-ul" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-list" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><textarea class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" id="desc_3" placeholder="Description" style="resize:none;" value="test">test</textarea></div><br><br><span class="event_label" style="margin-right:35px;">Start Date:</span><input id="promostartd_3" class="event_form" type="date" value="2021-01-17"><br><span class="event_label" style="margin-right:42px;">End Date:</span><input id="promoendd_3" class="event_form" type="date" value="2021-01-28"><div style="position: relative;"><section class="eventToolbar3" contenteditable="false" id="promotoolbar_3" style="display: none;"><i onclick="MapbarSty('B',this)" class="fa fa-bold" aria-hidden="true"></i><i onclick="MapbarSty('I',this)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-map" onclick="MapbarSty('map',this)" aria-hidden="true"></i><span style="display:none"><label>Enter Location</label> <input onkeydown="Edit2BackspaceInp(this,event)" id="Event_location_3" type="text" class="map_input pac-target-input" placeholder="Enter a location" autocomplete="off" value=""></span></section><span class="event_label" style="margin-right: 45px;">Location:</span><input class="event_form" type="text" id="locate_3" placeholder="Location Name" style="width:78%;" value="chennai"></div><input class="btn probtn" id="PromoBtn_3" type="button" value="Save the Date" onclick="reminder(this,'3')"><br><br><br></div><p>Programme</p><div class="ProgramMaindiv" contenteditable="false" id="ProgramCancel_1"><img src="../../images/cancel.png" class="main-form-cancel fr-draggable fr-fir"><table class="ProgramHeadtabl" contenteditable="true" id="Header_tbl_1"><tbody><tr class="progtabs_nav"><td alt="Column_1" class="tab-active" contenteditable="true" href="#Detail_tbl_1" id="MainHead_1" style="height:85.3px;width:132.73px;">test</td><td alt="Column_2" class="" contenteditable="true" href="#Detail_tbl_2" id="MainHead_2" style="height:85.3px;width:132.73px;">test1</td><td align="center" contenteditable="false" style="border:none;height:85.3px;width:132.73px;"><img src="../../images/program_add_icon.png" class="fr-draggable fr-fic fr-dii"></td></tr></tbody></table><table class="progtabs_stage" contenteditable="true" id="Detail_tbl_1" style="display: block;"><thead contenteditable="false"><tr><th style="width:200px;">Topic</th><th style="width:200px;">Speaker</th><th>Time</th><th>Location</th></tr></thead><tbody><tr alt="Row_1"><td>test</td><td>test</td><td>test</td><td>chennai</td><td align="center" contenteditable="false" style="border:none;"><input type="button" id="ProgBtn_1" class="program_save" value="save"></td></tr><tr align=""><td align="center" colspan="5" contenteditable="false" style="border:none;"><img src="../../images/program_add_icon.png" class="fr-draggable fr-fic fr-dii"></td></tr></tbody></table><table class="progtabs_stage" contenteditable="true" id="Detail_tbl_2" style="display: none;"><thead contenteditable="false"><tr><th style="width:200px;">Topic</th><th style="width:200px;">Speaker</th><th>Time</th><th>Location</th></tr></thead><tbody><tr alt="Row_1"><td>test</td><td>test</td><td>test</td><td>chennai</td><td align="center" contenteditable="false" style="border:none;"><input type="button" class="program_save" value="save"></td></tr><tr contenteditable="false"><td align="center" colspan="5" style="border:none;"><img src="../../images/program_add_icon.png" class="fr-draggable fr-fic fr-dii"></td></tr></tbody></table></div><p>Table</p><div class="quickTable" contenteditable="false" id="QuickTable_1"><img src="../../images/cancel.png" class="main-form-cancel fr-draggable fr-fir" contenteditable="false" onclick="quicktableremove(this)"><table contenteditable="true" style="width:100%;"><tbody><tr><td style="width: 50.0000%;">test</td><td style="width: 50.0000%;">test</td></tr><tr><td style="width: 50.0000%;">test</td><td style="width: 50.0000%;">test</td></tr></tbody></table></div><p><br></p><p><br></p><p>Accordian</p><div class="page_margin accordiandiv" contenteditable="false" id="accor_2"><img src="../../images/cancel.png" id="cancelacc_2" style="left: 95%; top: 15px;" class="fr-draggable"><div contenteditable="false" style="position:relative;"><span class="btn" contenteditable="false" data-target="#accordian_3" data-toggle="collapse" id="accbtn_3" style="width:100%;text-align:left;" type="button"><span class="accordianempty" contenteditable="true" style="font-weight:bold;">Item 1&nbsp;&nbsp;</span><i class="fa fa-minus" contenteditable="false" aria-hidden="true"></i></span><code class="eventToolbar5" contenteditable="false" id="acctoolbar_3" style="display: none;"><i onclick="accorsty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="accorsty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="accorsty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="accorsty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="accorsty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></code><textarea class="collapse in" cols="50" id="accordian_3" rows="1" style="width: 100%; resize: none; font-weight: bold;" value="test">test</textarea></div><div style="position:relative;"><span class="btn" contenteditable="false" data-target="#accordian_4" data-toggle="collapse" id="accbtn_4" style="width:100%;text-align:left;" type="button"><span class="accordianempty" contenteditable="true" style="font-weight:bold;">Item 3&nbsp;&nbsp;</span><i class="fa fa-plus" contenteditable="false" aria-hidden="true"></i></span><code class="eventToolbar5" contenteditable="false" id="acctoolbar_4" style="display: none;"><i onclick="accorsty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="accorsty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="accorsty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="accorsty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="accorsty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></code><textarea class="collapse in" cols="50" id="accordian_4" rows="1" style="width: 100%; resize: none;" value="test">test</textarea></div></div><p><br></p><p><br></p><p><br></p>
                    </div>
                </div>
        <div class="container">
        <br><br>
        <!--     <div class="row pagination-bar">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <div class="col-md-6">
                        <p class="pre-nxt">Previous</p>
                        <p class="nav-chapter">Chapter II: The Pool of Tears</p>
                    </div>
                    <div class="col-md-6" style="text-align: right;">
                        <p class="pre-nxt">Next</p>
                        <p class="nav-chapter">Chapter IV: The Rabbit Sends in a Little Bill</p>
                    </div>
                </div>
                <div class="col-md-1"></div>
    
            </div> -->
    
            <div class="row">
                <div class="col-md-3 col-sm-1"></div>
                <div class="col-md-6 col-sm-10">
                    <ul class="cards-list follow follow-padding">
    
                        <li class="card card-comment card--small">
                            <figure class="card-figure">
                                                                     <img src="http://pagevio.com/uploads/profile/1610538444.png" class="image--cover m-0">
                                                        </figure>
                            <div class="card-content m-0">
                                                        <a href="http://pagevio.com/author-profile/1"><h4>jochals</h4></a>
                                
                                                     </div>
                                                </li>
                    </ul>
                    <div class="marg-bottom follow-padding">
    
                        <!-- button for like option          -->
                        <button class="btn like_tab" id="like_button" data-id="3298" >
                            <img src="http://pagevio.com/assets/images/help/like.png" id="white_like1" alt="My Pic" > <span id="page_like"> 2</span>
                        </button>
    
                         <button class="btn like_tab" id="unlike_button" data-id="3298" style="background-color: #24d4bc;color: #fff;display:none">
                            <img src="http://pagevio.com/assets/images/help/white-like.png" id="like1" alt="My Pic">
                            <span id="page_unlike"> 2</span>
                        </button>
    
                        <!-- button for comment option          -->
    
                        <button id="example-popover" onfocus="message_button1()" onfocusout="message_buttonOut1()" tabindex="0" data-trigger="click" role="button" data-placement="bottom" class="btn btn-cmt CommentClick" >
                            <img src="http://pagevio.com/assets/images/help/message.png" id="message1" alt="My Pic">
                            <img src="http://pagevio.com/assets/images/help/white-message.png" id="white_message1" alt="My Pic" class="display-none"><span id="total-comment">0</span>
                        </button>
    
                        <div id="example-popover-content" class="hidden">
                            <ul class="cards-list follow follow1" id="CommentLoad">
    
                                
                            </ul>
                            <div style="display:none;" id="cmtshowmore" class="text-center">
                                <a onclick="$('.hidextracom').css('display','flex');$('#cmtshowmore').hide();" class="show-more">
                                    Show more
                                    <i class="fa fa-sort-down" aria-hidden="true"></i>
                                </a>
                                </div>
                        </div>
    
                        <!-- button for add option       -->
    
                       <span class="dropdown">
                                <button class="btn dropdown-toggle comment-btn" onfocus="add_button1()" onfocusout="add_buttonOut1()" data-toggle="dropdown">
                                    <img src="http://pagevio.com/assets/images/help/add.png" id="add1" alt="My Pic">
                                    <img src="http://pagevio.com/assets/images/help/white-add.png" id="white_add1" alt="My Pic" class="display-none">
                                    add
                                </button>
                                <span class="popuptext1 dropdown-menu">
                                    <ul id="move_publication" class="list-group add-roll"   >
                                                                          <li class="list-group-item add-hover SaveToCollection"  data-id="368+collection-pages+4" data-page-id="3298">
                                                                                    <i style="font-size: 16px;padding-top: 4px;margin-left: 10px;" class="fa fa-globe"></i>&nbsp;
                                                                                          <!--<i class="fa fa-angle-right" style="float:right" onclick="chooseSection()"></i>-->
    
                                          <!--   <input type="submit" id="arrow" onclick="chooseSection()" class="fa form-control" value="&#xf105;"> -->Master Collection</li>
                                     <!--    <li class="list-group-item add-hover">Cats<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Home ideas<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Marvel<i  class="fa fa-globe"></i></li>
                                        <li class="list-group-item add-hover">Performance<i  class="fa fa-globe"></i></li> -->
                                                                          <li class="list-group-item add-hover SaveToCollection"  data-id="423+collection-pages+4" data-page-id="3298">
                                                                                    <i style="font-size: 16px;padding-top: 4px;margin-left: 10px;" class="fa fa-globe"></i>&nbsp;
                                                                                          <!--<i class="fa fa-angle-right" style="float:right" onclick="chooseSection()"></i>-->
    
                                          <!--   <input type="submit" id="arrow" onclick="chooseSection()" class="fa form-control" value="&#xf105;"> -->Master collection 1</li>
                                     <!--    <li class="list-group-item add-hover">Cats<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Home ideas<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Marvel<i  class="fa fa-globe"></i></li>
                                        <li class="list-group-item add-hover">Performance<i  class="fa fa-globe"></i></li> -->
                                                                          <li class="list-group-item add-hover SaveToCollection"  data-id="424+collection-pages+4" data-page-id="3298">
                                                                                    <i style="font-size: 16px;padding-top: 4px;margin-left: 10px;" class="fa fa-globe"></i>&nbsp;
                                                                                          <!--<i class="fa fa-angle-right" style="float:right" onclick="chooseSection()"></i>-->
    
                                          <!--   <input type="submit" id="arrow" onclick="chooseSection()" class="fa form-control" value="&#xf105;"> -->Collection1</li>
                                     <!--    <li class="list-group-item add-hover">Cats<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Home ideas<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Marvel<i  class="fa fa-globe"></i></li>
                                        <li class="list-group-item add-hover">Performance<i  class="fa fa-globe"></i></li> -->
                                                                          <li class="list-group-item add-hover SaveToCollection"  data-id="425+collection-pages+4" data-page-id="3298">
                                                                                     <i style="font-size: 16px;padding-top: 4px;margin-left: 10px;" class="fa fa-ban"></i>&nbsp;
                                                                                          <!--<i class="fa fa-angle-right" style="float:right" onclick="chooseSection()"></i>-->
    
                                          <!--   <input type="submit" id="arrow" onclick="chooseSection()" class="fa form-control" value="&#xf105;"> -->New</li>
                                     <!--    <li class="list-group-item add-hover">Cats<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Home ideas<i  class="fa fa-ban"></i></li>
                                        <li class="list-group-item add-hover">Marvel<i  class="fa fa-globe"></i></li>
                                        <li class="list-group-item add-hover">Performance<i  class="fa fa-globe"></i></li> -->
                                                                      </ul>
                                         <form id="collection-form">
                                        <div id="demo" class="collapse">
                                            <p>Name</p>
                                            <input class="form-control" placeholder="enter collection name" type="text" name="collection-name" id="collection-name">
                                            <p>Privacy</p>
                                            <div class="custom-select">
                                               <select name='privacy' id="privacy">
                                                 <option value="public">Public</option>
                                                 <option value="public">Public</option>
                                                 <option value="private">Private</option>
                                               </select>
                                             </div>
                                        </div>
                                      </form>
                                    <div onclick="collapse()" id="collapse-div" class="add-item add-hover collapse-div" type="button" data-toggle="collapse" data-target="#demo"><img id="collapse-image" src="http://pagevio.com/assets/images/help/white-add.png" ><span id="collapse-text">Create New Collection</span>
                                    </div>
                                  
                                    <div id="create-collection" class="add-item add-hover collapse-div " type="button" data-toggle="collapse" data-target="#demo" style="text-align: center;display: none;"><img id="collapse-image" src="http://pagevio.com/assets/images/help/white-add.png" style="display: none;"><span id="collapse-text">Create</span>
                                    </div>
    
                                </span>
                        </span>
                        <!-- button for share option       -->
                        <span class="dropup">
                            <button class="btn dropdown-toggle comment-btn" onfocus="share_button1()" onfocusout="share_buttonOut1()" data-toggle="dropdown">
                                <img src="http://pagevio.com/assets/images/help/share.png" id="share1" alt="My Pic">
                                <img src="http://pagevio.com/assets/images/help/white-share.png" id="white_share1" alt="My Pic" class="display-none">
                                Share
                            </button>
                            <script>!function(a){var b="embedly-platform",c="script";if(!a.getElementById(b)){var d=a.createElement(c);d.id=b,d.src=("https:"===document.location.protocol?"https":"http")+"://cdn.embedly.com/widgets/platform.js";var e=document.getElementsByTagName(c)[0];e.parentNode.insertBefore(d,e)}}(document);</script>
                                        
                                        <span class="popuptext dropdown-menu share-arrange">
                                            Share on:
                                            <body onload="myFunction()">
                                    <!--<iframe id="test" src="" width="83" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>-->
                                            </body>
                                            <a id="fb" href="" target="_blank" ><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/facebook.png" alt="" width="" height=""></a>
                                            <a id="tweet" href="" target="_blank"><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/twitter.png" alt="" width="" height=""></a>
                                            <img class="icon-margin" src="http://pagevio.com/assets/flat-icons/instagram.png" alt="" width="" height="">
                                            <a id="pinterest" href="" target="_blank"><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/pinterest.png" alt="" width="" height=""></a>
                                            <a id="tumblr" href="" target="_blank"><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/tumblr.png" alt="" width="" height=""></a>
                                            <a id="embedly" onclick="newfunc()" ><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/g_code.png" alt="" width="" height=""></a>
                                            <div style="display:none !important"> 
                                            <a class="embedly-button" href="http://embed.ly/code" data-lang="en"><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/g_code.png" alt="" width="" height=""></a>
                                            </div>
                                            <a id="mail" class="share-email" href=""><img class="icon-margin" src="http://pagevio.com/assets/flat-icons/g_mail.png" alt="" width="" height=""></a>
                                        </span>
                        </span>
    
                        <!-- button for Report option       -->
    
                        <button class="btn-final swap" data-toggle="modal" data-target="#myModal">
                <img src="http://pagevio.com/assets/images/help/flag.png" alt="Report">
                           <img src="http://pagevio.com/assets/images/icons/c_flag.png" alt="Report">
              Report</button>
    
                    </div>
                    <div class="content-whatsapp-bottom follow-padding">
                        <input class="whats-input comment" type="text" placeholder="Leave a comment...">
                        
                        <img class="send-msPopup" src="http://pagevio.com/assets/images/help/send.png" alt="My Pic">
                       
                    </div>
    
                </div>
                <div class="col-md-3 col-sm-1"></div>
            </div>
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <div class="vl">
                        <h3 class="vl-title">More From jochals</h3>
                    </div>
                    <br />
             <div class="main">
                        <div class="special-cards">
                      </div>
            </div>
            
               
                    <div class="vl">
                        <h3 class="vl-title">Page Recommendations</h3>
                    </div>
                    <br />
             <div class="main">
                          <div class="special-cards">
                              <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3341">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/Ripper.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>The Ripper</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">mukesh vb</a></p>
                                     <p>Jan 27, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3341+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3335">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/Image 34.png" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Testing Sample Page</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">mukesh vb</a></p>
                                     <p>Jan 20, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3335+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3334">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/kung fun 333.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Kung fu panda 3</h4>
                                     <p><a href="http://pagevio.com/author-profile/20">bharti</a></p>
                                     <p>Jan 18, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3334+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3325">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/shadow and bone.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Shadow and Bone</h4>
                                     <p><a href="http://pagevio.com/author-profile/20">bharti</a></p>
                                     <p>Jan 13, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3325+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3323">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/Bbb-splash.png" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>How Quick Insert Shows in Mobile App Rea</h4>
                                     <p><a href="http://pagevio.com/author-profile/1">jochals</a></p>
                                     <p>Jan 19, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3323+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3321">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/img (7)-mini.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Testing Title</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">mukesh vb</a></p>
                                     <p>Jan 12, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3321+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3298">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/310px-seek=116-Big_Buck_Bunny_4K.webm.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Testing for quick insert</h4>
                                     <p><a href="http://pagevio.com/author-profile/1">jochals</a></p>
                                     <p>Jan 12, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3298+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3296">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/images/no-book.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>
                    ​The Tokyo 2020 Olym</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">mukesh vb</a></p>
                                     <p>Jan 12, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3296+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3293">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/login-logo.png" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Your Ultimate Guide to PageVio</h4>
                                     <p><a href="http://pagevio.com/author-profile/4">superadmin</a></p>
                                     <p>Jan 19, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3293+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                           <div class="cover_item">
                    <div class="card-article">
                        <div class="card-front" data-image-position="top">
                                          <a href="http://pagevio.com/sample-page/3287">
                  <div class="card-image card-image-top">
                    <img src="http://pagevio.com/uploads/stories/maxresdefault.jpg" >
                  </div>
    
                            <div class="card card--small">
                                <div class="card-content">
                                     <h4>Passengers</h4>
                                     <p><a href="http://pagevio.com/author-profile/20">bharti</a></p>
                                     <p>Jan 7, 2021</p>
                                </div>
                                 <span class="button-group inline-block relative pull-right">
                                    <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                   <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="3287+pages+4">
                                            <span role="button" >
                                            <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              </div>
              </div>
            
               
                    <div class="vl">
                        <h3 class="vl-title">Publication Recommendations</h3>
                    </div>
                    <br />
            <div class="main">
                         <div class="special-cards">
                               <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/174">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1611837230.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/174"></a>
                                <div class="card-content">
                                    <h4>Another Life</h4>
                                     <p><a href="http://pagevio.com/author-profile/20">Aaron Mart</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="174+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/169">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1611213055.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/169"></a>
                                <div class="card-content">
                                    <h4>THE GIFTS OF Imperfection</h4>
                                     <p><a href="http://pagevio.com/author-profile/1">Brené Bro</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="169+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/168">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610958816.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/168"></a>
                                <div class="card-content">
                                    <h4>Your Ultimate Guide to PageVio</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Harry pott</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="168+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/167">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610963270.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/167"></a>
                                <div class="card-content">
                                    <h4>Tattletale</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Harry Pott</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="167+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/166">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610970369.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/166"></a>
                                <div class="card-content">
                                    <h4>Harry potter and the philosoph...</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Christophe</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="166+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/165">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610958816.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/165"></a>
                                <div class="card-content">
                                    <h4>Fatherhood</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Marcus Ber</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="165+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/163">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610445950.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/163"></a>
                                <div class="card-content">
                                    <h4>testing discription</h4>
                                     <p><a href="http://pagevio.com/author-profile/13"></a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="163+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/162">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610170577.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/162"></a>
                                <div class="card-content">
                                    <h4>Design</h4>
                                     <p><a href="http://pagevio.com/author-profile/29">Design</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="162+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/158">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610970369.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/158"></a>
                                <div class="card-content">
                                    <h4>The 100</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Kass Morga</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="158+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                              <div class="cover_item">
                    <div class="card-article series">
                        <div class="card-front" data-image-position="top">
                             <a href="http://pagevio.com/publication-cover-description/137">
                            <div class="card-image card-image-top">
                                <img src="http://pagevio.com/uploads/publication-cover/1610170577.png">
                            </div></a>
                            <div class="card card--small">
                                 <a href="http://pagevio.com/publication-cover-description/137"></a>
                                <div class="card-content">
                                    <h4>Jon snow</h4>
                                     <p><a href="http://pagevio.com/author-profile/13">Imp</a></p>
                                </div>
                                <span class="button-group inline-block relative pull-right">
                                   <span class="btn-no-background dropdown-toggle" data-toggle="dropdown" aria-controls="comment-more-options" aria-expanded="false" aria-label="more options">
                                        <span class="fa fa-more" aria-hidden="true" style="font-size:16px;cursor:pointer;padding-top:10px;"></span>
                                   </span>
                                    <ul class="dropdown-menu align-right">
                                        <li class="readlater" data-id="137+publication+1">
                                            <span role="button">
                                              <!--<span class="fa fa-link fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                             Save to Read Later
                                            </span>
                                        </li>
                                        <!--<li>
                                          <a class="on-report" role="button" href="#">
                                            <!--<span class="fa fa-flag fa-wp-neutral-2 " aria-hidden="true" style="font-size:16px;"></span>-->
                                            <!--Save to Collection
                                          </a>
                                        </li>-->
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
                                 </div>
            </div>
            
            
            
                 
                    <div class="vl" style="display:none">
                        <h3 class="vl-title">Series Recommendations</h3>
                    </div>
                    <br />
            <div class="main" style="display:none">
                         <div class="special-cards">
                                  </div>
            </div>
            
            
                    <div class="vl" style="display:none">
                        <h3 class="vl-title">Periodicals Recommendations</h3>
                    </div>
                    <br />
            <div class="main" style="display:none">
                        <div class="special-cards">
                          </div>
            </div>
            
               
                    <br /><br />
                </div>
    
                <div class="col-md-1"></div>
            </div>
       
            <!--<br /><br /><br />-->
        </div>
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
    
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><img src="http://pagevio.com/../../assets/images/help/close.png" alt="My Pic"></button>
                        <h4 class="modal-title">Report</h4>
                    </div>
                    <div class="modal-body">
                        <p class="model-issue">What's the issue?</p>
                        <span class="reportradio">
                        <input class="text-muted" type="radio" name="gender" value="male" id="radio_1"> <label for="radio_1"> Inappropriate or offensive content </label><br>
                        <input class="text-muted" type="radio" name="gender" value="male" id="radio_2"> <label for="radio_2"> Copyright or trademark infringement </label><br>
                        <input class="text-muted" type="radio" name="gender" value="male" id="radio_3"> <label for="radio_3"> Spam, advertising, solicitation </label><br>
                        <input class="text-muted" type="radio" name="gender" value="male" id="radio_4"> <label for="radio_4"> Other (please explain below) </label><br>
                        </span>
                        <p class="model-textarea">Provide any further necessary details on your issue</p>
                        <textarea class="model-input" rows="" id="ReportAdditional" placeholder="" cols=""></textarea>
                        <p class="text-muted">We review flagged content as soon as possible.For more please see our Content Guidelines and our Terms and service</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" data-target="myModal">Cancel</button>
                        <button type="button" class="btn btn-default" id="modal-hide" data-toggle="modal" onclick="Report_Author()">Report</button>
    
                    </div>
                </div>
    
            </div>
        </div>
        <!-- model 1 ends -->
        <!-- The Modal2 starts -->
        <!-- The Modal2 starts -->
    
        <div class="modal" id="myModal2">
            <div class="modal-dialog modal-sm">
                <div class="modal-content modal-size">
    
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><img src="../../assets/images/help/close.png" alt="My Pic"></button>
                    </div>
    
                    <!-- Modal body -->
                    <div class="modal-body model2">
                        Your Report Was successfully Submitted
                    </div>
    
                    <!-- Modal footer -->
                    <div class="modal-footer  btn-center">
                        <button id="close-modal2" type="button" class="btn">Back</button>
                    </div>
    
                </div>
            </div>
        </div>
         <script>
    
    
        (function ($) {
    
            var SelectionSharer = function (options) {
    
                var self = this;
    
                options = options || {};
                if (typeof options == 'string')
                    options = { elements: options };
    
                this.sel = null;
                this.textSelection = '';
                this.htmlSelection = '';
    
                this.appId = $('meta[property="fb:app_id"]').attr("content") || $('meta[property="fb:app_id"]').attr("value");
                this.url2share = $('meta[property="og:url"]').attr("content") || $('meta[property="og:url"]').attr("value") || window.location.href;
    
                this.getSelectionText = function (sel) {
                    var html = "", text = "";
                    var sel = sel || window.getSelection();
                    if (sel.rangeCount) {
                        var container = document.createElement("div");
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents());
                        }
                        text = container.textContent;
                        html = container.innerHTML
                    }
                    self.textSelection = text;
                    self.htmlSelection = html || text;
                    return text;
                };
    
                this.selectionDirection = function (selection) {
                    var sel = selection || window.getSelection();
                    var range = document.createRange();
                    if (!sel.anchorNode) return 0;
                    range.setStart(sel.anchorNode, sel.anchorOffset);
                    range.setEnd(sel.focusNode, sel.focusOffset);
                    var direction = (range.collapsed) ? "backward" : "forward";
                    range.detach();
                    return direction;
                };
    
                this.showPopunder = function () {
                    self.popunder = self.popunder || document.getElementById('selectionSharerPopunder');
    
                    var sel = window.getSelection();
                    var selection = self.getSelectionText(sel);
    
                    if (sel.isCollapsed || selection.length < 10 || !selection.match(/ /))
                        return self.hidePopunder();
    
                    if (self.popunder.classList.contains("fixed"))
                        return self.popunder.style.bottom = 0;
    
                    var range = sel.getRangeAt(0);
                    var node = range.endContainer.parentNode; // The <p> where the selection ends
    
                    // If the popunder is currently displayed
                    if (self.popunder.classList.contains('show')) {
                        // If the popunder is already at the right place, we do nothing
                        if (Math.ceil(self.popunder.getBoundingClientRect().top) == Math.ceil(node.getBoundingClientRect().bottom))
                            return;
    
                        // Otherwise, we first hide it and the we try again
                        return self.hidePopunder(self.showPopunder);
                    }
    
                    if (node.nextElementSibling) {
                        // We need to push down all the following siblings
                        self.pushSiblings(node);
                    }
                    else {
                        // We need to append a new element to push all the content below
                        if (!self.placeholder) {
                            self.placeholder = document.createElement('div');
                            self.placeholder.className = 'selectionSharerPlaceholder';
                        }
    
                        // If we add a div between two <p> that have a 1em margin, the space between them
                        // will become 2x 1em. So we give the placeholder a negative margin to avoid that
                        var margin = window.getComputedStyle(node).marginBottom;
                        self.placeholder.style.height = margin;
                        self.placeholder.style.marginBottom = (-2 * parseInt(margin, 10)) + 'px';
                        node.parentNode.insertBefore(self.placeholder);
                    }
    
                    // scroll offset
                    var offsetTop = window.pageYOffset + node.getBoundingClientRect().bottom;
                    self.popunder.style.top = Math.ceil(offsetTop) + 'px';
    
                    setTimeout(function () {
                        if (self.placeholder) self.placeholder.classList.add('show');
                        self.popunder.classList.add('show');
                    }, 0);
    
                };
    
                this.pushSiblings = function (el) {
                    while (el = el.nextElementSibling) { el.classList.add('selectionSharer'); el.classList.add('moveDown'); }
                };
    
                this.hidePopunder = function (cb) {
                    cb = cb || function () { };
    
                    if (self.popunder == "fixed") {
                        self.popunder.style.bottom = '-50px';
                        return cb();
                    }
    
                    self.popunder.classList.remove('show');
                    if (self.placeholder) self.placeholder.classList.remove('show');
                    // We need to push back up all the siblings
                    var els = document.getElementsByClassName('moveDown');
                    while (el = els[0]) {
                        el.classList.remove('moveDown');
                    }
    
                    // CSS3 transition takes 0.6s
                    setTimeout(function () {
                        if (self.placeholder) document.body.insertBefore(self.placeholder);
                        cb();
                    }, 600);
    
                };
    
                this.show = function (e) {
                    setTimeout(function () {
                        var sel = window.getSelection();
                        var selection = self.getSelectionText(sel);
                        selectedtext=self.htmlSelection;
                        if (!sel.isCollapsed && selection && selection.length > 10 && selection.match(/ /)) {
                            var range = sel.getRangeAt(0);
                            var topOffset = range.getBoundingClientRect().top - 5;
                            var top = topOffset + window.scrollY - self.$popover.height();
                            var left = 0;
                            if (e) {
                                left = e.pageX;
                            }
                            else {
                                var obj = sel.anchorNode.parentNode;
                                left += obj.offsetWidth / 2;
                                do {
                                    left += obj.offsetLeft;
                                }
                                while (obj = obj.offsetParent);
                            }
                            line_number=1;
                            var obj=sel.anchorNode.parentNode;
                            while(obj.tagName!="P")
                            {
                                obj=obj.parentNode;
                            }
                            $('.chapter-content').find('.selectionShareable').each(function(key,item){
                            if(item==obj)
                            {
                            return false;
                            }
                            else
                            {
                            line_number=line_number+1;
                            }
                            });
                            switch (self.selectionDirection(sel)) {
                                case 'forward':
                                    left -= self.$popover.width();
                                    break;
                                case 'backward':
                                    left += self.$popover.width();
                                    break;
                                default:
                                    return;
                            }
                            $('.commonpopup-hide-2').addClass('popup-hide-2');
                            self.$popover.removeClass("anim").css("top", top + 10).css("left", left).show();
                            setTimeout(function () {
                                self.$popover.addClass("anim").css("top", top);
                            }, 0);
                        }
                    }, 10);
                };
    
                this.hide = function (e) {
                    self.$popover.hide();
                };
    
                this.smart_truncate = function (str, n) {
                    if (!str || !str.length) return str;
                    var toLong = str.length > n,
                        s_ = toLong ? str.substr(0, n - 1) : str;
                    s_ = toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
                    return toLong ? s_ + '...' : s_;
                };
    
                this.getRelatedTwitterAccounts = function () {
                    var usernames = [];
    
                    var creator = $('meta[name="twitter:creator"]').attr("content") || $('meta[name="twitter:creator"]').attr("value");
                    if (creator) usernames.push(creator);
    
    
                    // We scrape the page to find a link to http(s)://twitter.com/username
                    var anchors = document.getElementsByTagName('a');
                    for (var i = 0, len = anchors.length; i < len; i++) {
                        if (anchors[i].attributes.href && typeof anchors[i].attributes.href.value == 'string') {
                            var matches = anchors[i].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i)
                            if (matches && matches.length > 1 && ['widgets', 'intent'].indexOf(matches[1]) == -1)
                                usernames.push(matches[1]);
                        }
                    }
    
                    if (usernames.length > 0)
                        return usernames.join(',');
                    else
                        return '';
                };
    
                this.shareTwitter = function (e) {
                    e.preventDefault();
    
                    var text = "“" + self.smart_truncate(self.textSelection.trim(), 114) + "”";
                    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&related=' + self.relatedTwitterAccounts + '&url=' + encodeURIComponent(window.location.href);
    
                    // We only show the via @twitter:site if we have enough room
                    if (self.viaTwitterAccount && text.length < (120 - 6 - self.viaTwitterAccount.length))
                        url += '&via=' + self.viaTwitterAccount;
    
                    var w = 640, h = 440;
                    var left = (screen.width / 2) - (w / 2);
                    var top = (screen.height / 2) - (h / 2) - 100;
                    window.open(url, "share_twitter", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
                    self.hide();
                    return false;
                };
    
                this.shareFacebook = function (e) {
                    e.preventDefault();
                    var text = self.htmlSelection.replace(/<p[^>]*>/ig, '\n').replace(/<\/p>|  /ig, '').trim();
    
                    var url = 'https://www.facebook.com/dialog/share?' +
                              'app_id=' + self.appId +
                              '&display=popup' +
                              '&name=' + encodeURIComponent(text) +
                              '&link=' + encodeURIComponent(self.url2share) +
                              '&href=' + encodeURIComponent(self.url2share) +
                              '&redirect_uri=' + encodeURIComponent(self.url2share);
                    var w = 640, h = 440;
                    var left = (screen.width / 2) - (w / 2);
                    var top = (screen.height / 2) - (h / 2) - 100;
    
                    window.open(url, "share_facebook", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
                };
    
                this.shareEmail = function (e) {
                    var text = self.htmlSelection.replace(/<p[^>]*>/ig, '\n').replace(/<\/p>|  /ig, '').trim();
                    var email = {};
                    email.subject = encodeURIComponent("Quote from " + document.title);
                    email.body = encodeURIComponent("“" + text + "”") + "%0D%0A%0D%0AFrom: " + document.title + "%0D%0A" + window.location.href;
                    $(this).attr("href", "mailto:?subject=" + email.subject + "&body=" + email.body);
                    self.hide();
                    return true;
                };
    
                this.render = function () {
                    var popoverHTML = '<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">'
                                     + '  <div id="selectionSharerPopover-inner">'
                                     + '    <ul>'
                                   + '      <li><a class="action bookmark" onclick="Bookmarktool()" title="Bookmark this content">Tweet</a></li>'
                                     + '      <li><a class="action pin" onclick="Pintool()" title="Pin this content">Tweet</a></li>'
                                     + '      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>'
                                       + '      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>'
                                     //+ '      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>'
                                     + '    </ul>'
                                     + '  </div>'
                                     + '  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div>'
                                     + '</div>'
                                     +'<span id="popup-hide2-1" style="left:0%;margin-top:31px;" class="popup-open commonpopup-hide-2 popuptext1 dropdown-menu dropdown-menu-add align-right popup-hide-2">'
                                              +'<ul class="popup-open" id="collection-list-item-1" style="left:19%;height:150px;overflow-x:hidden;">'
                                              +'<li class="list-group-item add-hover" style="background:white;color:#27A291;cursor:auto;width:200px;font-size:15px;">Choose Collection</li>'
                                                                                        +'<li  class="list-group-item add-hover" style="border:1px solid white;text-align:left;" onclick="SaveToCollectionSection(this)" data-id="0+368+3298"><span>Master Collection</span>&nbsp;&nbsp'
                                              +'<i style="font-size: 16px;padding-top: 4px;margin-left: 10px;"  class="fa fa-globe"></i>&nbsp'
                                                                                         +'<i onClick="Get_collection_section(event,1,368,3298)" style="font-size:20px;" class="fa fa-angle-right"></i>'
                                                                                         +'</li>'
                                                                                        +'<li  class="list-group-item add-hover" style="border:1px solid white;text-align:left;" onclick="SaveToCollectionSection(this)" data-id="0+423+3298"><span>Master collection 1</span>&nbsp;&nbsp'
                                              +'<i style="font-size: 16px;padding-top: 4px;margin-left: 10px;"  class="fa fa-globe"></i>&nbsp'
                                                                                         +'</li>'
                                                                                        +'<li  class="list-group-item add-hover" style="border:1px solid white;text-align:left;" onclick="SaveToCollectionSection(this)" data-id="0+424+3298"><span>Collection1</span>&nbsp;&nbsp'
                                              +'<i style="font-size: 16px;padding-top: 4px;margin-left: 10px;"  class="fa fa-globe"></i>&nbsp'
                                                                                         +'</li>'
                                                                                        +'<li  class="list-group-item add-hover" style="border:1px solid white;text-align:left;" onclick="SaveToCollectionSection(this)" data-id="0+425+3298"><span>New</span>&nbsp;&nbsp'
                                              +'<i style="font-size: 16px;padding-top: 4px;margin-left: 10px;"  class="fa fa-globe"></i>&nbsp'
                                                                                         +'</li>'
                                                                                      +'</ul>'
                                            +'<div id="section-list-item-1" class="popup-hide-2">'
                                                +'<ul id="popup-hide3-1" style="left:0%;height:150px;overflow-x:hidden;width:208px;" class="dropdown-menu align-right popup-open">'
                                                    +'<li class="list-group-item add-hover" style="background:white;color:#27A291;cursor:auto;width:200px" onclick="collection_popup(1,event)">Choose Section</li>'
                                                +'</ul>'
                                            +'</div>'
                                            +'<div onclick="window.event.stopPropagation();" id="demo-1" style="padding:0 10px;border-top: 1px solid #707070;" class="collapse">'
                                                +'<p class="form-label">Name</p>'
                                                +'<input type="hidden" id="collection-data-1" value="3298" />'
                                                +'<input id="collection-name-1" class="form-control" placeholder="Enter Collection name" type="text" />'
                                                +'<p class="form-label">Privacy</p>'
                                                +'<div class="custom-select">'
                                                     +'<select id="privacy-1">'
                                                     +'<option value="0">Public</option>'
                                                     +'<option value="1">Public</option>'
                                                     +'<option value="2">Private</option>'
                                                     +'</select>'
                                                      
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="dropdown" id="create-colection-1">'
                                                +'<div  data-toggle="dropdown" style="text-align:center;background: #27a291 !important;color:white;cursor:pointer;padding-top:10px;padding-left:0px;" class="add-item add-hover dropdown-toggle" type="button" onclick="NewCollectionbox(3298)" onclick="" id="collapse-div-3298">'
                                                    +'<img src="http://pagevio.com/assets/images/help/white-add.png" />'
                                                    +'<span id="collapse-text">New Collection</span>'
                                                +'</div>'
                                            +'</div>'
                                            +'</span>';
    
                    var popunderHTML = '<div id="selectionSharerPopunder" class="selectionSharer">'
                                     + '  <div id="selectionSharerPopunder-inner">'
                                     + '    <label>Share this selection</label>'
                                     + '    <ul>'
                                    + '      <li><a class="action bookmark" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>'
                                     + '      <li><a class="action pin" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>'
                                     + '      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>'
                                      + '      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>'
                                     //+ '      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>'
                                     + '    </ul>'
                                     + '  </div>'
                                     + '</div>';
                    self.$popover = $(popoverHTML);
                    self.$popover.find('a.tweet').click(self.shareTwitter);
                    self.$popover.find('a.facebook').click(self.shareFacebook);
                    self.$popover.find('a.email').click(self.shareEmail);
    
                    $('body').append(self.$popover);
    
                    self.$popunder = $(popunderHTML);
                    self.$popunder.find('a.tweet').click(self.shareTwitter);
                    self.$popunder.find('a.facebook').click(self.shareFacebook);
                    self.$popunder.find('a.email').click(self.shareEmail);
                    $('body').append(self.$popunder);
    
                    if (self.appId && self.url2share) {
                        $(".selectionSharer a.facebook").css('display', 'inline-block');
                    }
                };
    
                this.setElements = function (elements) {
                    if (typeof elements == 'string') elements = $(elements);
                    self.$elements = elements instanceof $ ? elements : $(elements);
                    self.$elements.mouseup(self.show).mousedown(self.hide).addClass("selectionShareable");
                    $(self.$elements).each(function(i,val){
                        if($(this).attr('id')=='subheadtitle'){}
                        else{
                       $(this).text()=="" ? "" :  $(this).prepend('<span><img onclick="AddBookmark(this,true)" src="http://pagevio.com/assets/images/icons/white_bookmark.png" class="out-bookmark"/></span>');
                        }
                    });
                    self.$elements.bind('touchstart', function (e) {
                        self.isMobile = true;
                    });
    
                    document.onselectionchange = self.selectionChanged;
                };
    
                this.selectionChanged = function (e) {
                    if (!self.isMobile) return;
    
                    if (self.lastSelectionChanged) {
                        clearTimeout(self.lastSelectionChanged);
                    }
                    self.lastSelectionChanged = setTimeout(function () {
                        self.showPopunder(e);
                    }, 300);
                };
    
                this.render();
    
                if (options.elements) {
                    this.setElements(options.elements);
                }
    
            };
    
            // jQuery plugin
            // Usage: $( "p" ).selectionSharer();
            $.fn.selectionSharer = function () {
                var sharer = new SelectionSharer();
                sharer.setElements(this);
                return this;
            };
    
            // For AMD / requirejs
            // Usage: require(["selection-sharer!"]);
            //     or require(["selection-sharer"], function(selectionSharer) { var sharer = new SelectionSharer('p'); });
            if (typeof define == 'function') {
                define(function () {
                    SelectionSharer.load = function (name, req, onLoad, config) {
                        var sharer = new SelectionSharer();
                        sharer.setElements('p');
                        onLoad();
                    };
                    return SelectionSharer;
                });
    
            }
            else {
                // Registering SelectionSharer as a global
                // Usage: var sharer = new SelectionSharer('p');
                window.SelectionSharer = SelectionSharer;
            }
    
        })(jQuery);
    
        $('.chapter-content p').selectionSharer();
    </script>
    
        <script type="text/javascript">
    var selectedtext="";
        function like_button1() {
            $('#like1').hide();
            $('#white_like1').show();
        }
        function like_buttonOut1() {
            $('#like1').show();
            $('#white_like1').hide();
        }
    
        // scripts for comment
        function message_button1() {
            $('#message1').hide();
            $('#white_message1').show();
        }
        function message_buttonOut1() {
            $('#message1').show();
            $('#white_message1').hide();
        }
    
        // scripts for add
    
        function add_button1() {
            $('#add1').hide();
            $('#white_add1').show();
        }
        function add_buttonOut1() {
            $('#add1').show();
            $('#white_add1').hide();
        }
    
        // scripts for share
        function share_button1() {
            $('#share1').hide();
            $('#white_share1').show();
        }
        function share_buttonOut1() {
            $('#share1').show();
            $('#white_share1').hide();
        }
    
    
    
        $('body').on('click', function (e) {
    
            if (!$(e.target).is('.btn-cmt ') && $(e.target).closest('.popover').length == 0) {
                $(".btn-cmt ").popover('hide');
            }
            if (!$(e.target).is('.btn-cmt2 ') && $(e.target).closest('.popover').length == 0) {
                $(".btn-cmt2 ").popover('hide');
            }
            if (!$(e.target).is('.btn-cmt3 ') && $(e.target).closest('.popover').length == 0) {
                $(".btn-cmt3 ").popover('hide');
            }
        });
    
    
    
    
        //comment box
    
        $(function () {
    
            $("#example-popover").popover({
                html: true,
                content: function () {
                    return $("#example-popover-content").html();
                },
                title: function () {
                    return $("#example-popover-title").html();
                },
            });
            $("#example-popover1").popover({
                html: true,
                content: function () {
                    return $("#example-popover-content1").html();
                },
                title: function () {
                    return $("#example-popover-title1").html();
                },
            });
            $("#example-popover2").popover({
    
                html: true,
                content: function () {
                    return $("#example-popover-content2").html();
                    //  var result = $("#mypopover389595").height();
                },
                title: function () {
                    return $("#example-popover-title2").html();
                },
    
            });
    
        });
    
    
    
    
        function color_change() {
            var color = document.getElementById('color-change');
            var element = document.activeElement;
            element.blur();
            //if ($("#color-change").hasClass("focus")) {
            //    alert("Changed");
            //    $("#color-change").removeClass('focus');
            //}
        }
    function reminder(ele,j)
          {
              var alert = $(".alert-container");
            var title=$('#titl_'+j).val();
            var description=$('#desc_'+j).text();
            var dates=$('#Event_'+j).find('#add-date').find('input');
            var startdate=$('#promostartd_'+j).val();
            var enddate=$('#promoendd_'+j).val();
            var location=$('#locate_'+j).val();
            $.ajax({
                type:'post',
                url:"http://pagevio.com/program-details/store",
                data:{post_id:"3298",location:location,from:"3298",description:description,type:'promotion',title:title,startdate:startdate,endate:enddate,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success:function(result){
                    if(result.status=="success")
                    {
                    $('.alert-container').removeClass('alert-container-error');
                    $(".alert-container").addClass("alert-container-success");
                    $('#msg').html("<strong>"+result.msg+"</strong>");
                    $('.alert-container').show();
                    }
                    alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 3000);
                },
            })
          }
          var bookundo=0;
          var line_number=0;
        $(document).ready(function () {
              if($('#page-title').find('#titlsubdiv').length>0)
              {
                    $('.sample-bg').find('#titlsubdiv').hide();
              }
                 var path = window.location.pathname;
              var page = path.split("/");
             console.log( page[1] );
         if(page[1]=="sample-page"){
           document.title="PageVio - Sample Page";
         }
            var box3 = $('.subtitle').attr('placeholder');
            
            $('.chapter-content').find('input').attr('readonly','readonly');
            $('.chapter-content').find('textarea').attr('readonly','readonly');
            $('.user-field').attr('readonly',false);
            $('.chapter-content input ').each(function(){
               $(this).val()=="" && $(this).attr('placeholder') ? $(this).hide()  : "";
             });
             $('.chapter-content textarea').each(function(){
                $(this).val()=="" & $(this).attr('placeholder') ? $(this).css('display','none') : "" ; 
             });
            var editable_elements = document.querySelectorAll("[contenteditable=true]");
           for(var i=0; i<editable_elements.length; i++)
          editable_elements[i].setAttribute("contenteditable", false);
            // for hide model 1
            $('.audioplayer').attr('class','audioplayer');
            $('audio').ModaudioPlayer();
            $("#modal-hide").click(function () {
                $("#myModal").modal('hide');
            });
            $("#close-modal2").click(function () {
                $("#myModal2").modal('hide');
            });
            $('.save_event').click(function(){
                var alert = $(".alert-container");
            var ids=$(this)[0].id.split(/(\d+)/)[1]; 
            var title=$('#titl_'+ids).val();
            var description=$('#desc_'+ids).text();
            var dates=$('#Event_'+ids).find('#add-date').find('input');
            var startdate='';
            var enddate='';
            var location=$('#locate_'+ids).val();
            if(dates.length==4)
            {
                startdate=dates[0].value+' '+dates[1].value;
                enddate=dates[2].value+' '+dates[3].value;
            }
            else
            {
                startdate=dates[0].value+' '+dates[1].value;
            }
            $.ajax({
                type:'post',
                url:"http://pagevio.com/program-details/store",
                data:{post_id:"3298",location:location,from:"3298",description:description,type:'event',len:dates.length,title:title,startdate:startdate,endate:enddate,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success:function(result){
                    if(result.status=="success")
                    {
                    $('.alert-container').removeClass('alert-container-error');
                    $(".alert-container").addClass("alert-container-success");
                    $('#msg').html("<strong>"+result.msg+"</strong>");
                    $('.alert-container').show();
                    }
                    alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                },
            })
          });
           $('.ProgramMaindiv').each(function(){
            var mainid=parseInt($(this)[0].id.split(/(\d+)/)[1]);
            $(this).find('.ProgramHeadtabl td').each(function(td,key){
                key.getAttribute('alt') && key.addEventListener('click',()=>ActivateProgramTable(key,mainid)); 
            });
            $(this).find('.progtabs_stage').hide();
            $(this).find('.progtabs_stage')[0].style.display="block";
            $(this).find('.progtabs_nav td').removeClass('tab-active');
            $(this).find('.progtabs_nav td:first').addClass('tab-active');
            ProgramId=mainid;
        });
           $('.formclose1').each(function(){
               
           })
        });
         $(".readlater").click(function () { 
            
            var id = $(this).data('id');
            var result = id.split("+");
            var alert = $(".alert-container");
            //console.log(result);
                $.ajax({
                    type: "post",
                    url: "http://pagevio.com/read-later",
                    data: {id:result[0],type:result[1],type_id:result[2],"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                    success: function(data){ 
                    console.log(data);
                    if (data.status == 'success') {
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
    
                    }else{
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
                        }
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                        } 
                      });
            });
            function Pintool()
            {
                if(selectedtext)
                {
                    var alert = $(".alert-container"); 
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>Characters length cannot exceed more than 300</strong>");
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 2000);
                    document.getElementById('selectionSharerPopover').style.display="none";
                    document.getElementById('popup-hide2-1').classList.add('popup-hide-2');
                    return false;
                }
             document.getElementById("popup-hide2-1").classList.remove('popup-hide-2'); 
             document.getElementById("collection-list-item-1").classList.remove('popup-hide-2');
             document.getElementById("section-list-item-1").classList.add('popup-hide-2');
             document.getElementById('demo-1').classList.add('collapse');
                document.getElementById('create-colection-'+1).classList.remove('popup-hide-2');
             var v=document.getElementById('create-colection-1');
                var v1=v.getElementsByTagName('span')[0];
                v.getElementsByTagName('img')[0].setAttribute('src',"http://pagevio.com/assets/images/help/white-add.png");
                v1.innerText="New Collection";
                v.getElementsByTagName('div')[0].setAttribute('onclick',"NewCollectionbox()");
                document.getElementById('demo-1').classList.add('collapse');
                document.getElementById('create-colection-1').classList.remove('popup-hide-2');
             window.event.stopPropagation();
            }
            function NewCollectionbox(ids)
            {
                document.getElementById('demo-1').classList.remove('collapse');
                //document.getElementById('create-colection-'+ids).classList.add('popup-hide-2');
                var v=document.getElementById('create-colection-'+1);
                var v1=v.getElementsByTagName('span')[0];
                v.getElementsByTagName('img')[0].setAttribute('src','');
                v1.innerText="Create";
                v.getElementsByTagName('div')[0].setAttribute('onclick','CreateCollection()')
                window.event.stopPropagation();
                
            }
            function CreateCollection()
           {
               
            //var datastring = $("#frm").serialize();
                var alert = $(".alert-container"); 
                var title = document.getElementById('collection-name-'+1).value;
                var privacy="Public";
                var description="";
                var page_id=document.getElementById('collection-data-'+1).value;
    
                 if (title == "") {
                
                     $('#msg').html("<strong>Title must be filled out</strong>");
                          $('.alert-container').show();
                          $(".alert-container").addClass("alert-container-error");
                           alert.slideDown();
                            window.setTimeout(function () {
                               alert.slideUp();
                            }, 3000);   
                    return false;
                  }
    
                $.ajax({
                    type: "post",
                    url: "http://pagevio.com/store-collection",
                    data: {title:title,privacy:privacy,description:description,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                    cache: false,
                    success: function(data){
                        if (data.status == "success") {
                           $.ajax({
                           type: "post",
                           url: "http://pagevio.com/save-to-pins",
                           data: {page_id:page_id,type:'2',collection_id:data.id,section_id:0,Description:selectedtext,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                           success: function(data){ 
                           console.log(data);
    
                           if (data[0].status) {
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>"+data[0].status+"</strong>");
                        document.getElementById('selectionSharerPopover').style.display="none";
                        document.getElementById('popup-hide2-1').classList.add('popup-hide-2');
                        $('.alert-container').show();
                        //$('.clearCollectionpopup').addClass('popup-close');
                        window.location.reload();
    
                    }else{
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>Something went wrong</strong>");
                        $('.alert-container').show();
                        document.getElementById('popup-hide2-1').classList.add('popup-hide-2');
                        }
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                        } 
                      });
                                
                        }else{
                          $('#msg').html("<strong>"+data.msg+"</strong>");
                          $('.alert-container').show();
                          $('#create_shelf').hide();
                          $(".alert-container").addClass("alert-container-error");
                          alert.slideDown();
                          window.setTimeout(function () {
                             alert.slideUp();
                              location.reload();
                          }, 3000);   
                        }
                       
                      } 
                  });
        }
            function Get_collection_section(e,ids,collectionid,pageid)
            {
                             var datas="[{&quot;section_id&quot;:215,&quot;collection_id&quot;:18,&quot;user_id&quot;:10,&quot;title&quot;:&quot;the box car&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;We can now find the box car&quot;,&quot;created_at&quot;:&quot;2020-12-03 03:36:00&quot;,&quot;updated_at&quot;:&quot;2020-12-03 08:36:00&quot;},{&quot;section_id&quot;:224,&quot;collection_id&quot;:222,&quot;user_id&quot;:1,&quot;title&quot;:&quot;Sea section1&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2020-12-07 05:45:05&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:370,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Mammals&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Testing&quot;,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:373,&quot;collection_id&quot;:352,&quot;user_id&quot;:1,&quot;title&quot;:&quot;dsgdfg&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-13 01:45:50&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:374,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;indhu&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:375,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;fhdhjfgasdl&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:376,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;fdsfsd&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:377,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;fsdfgdsg&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:378,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Neww&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:382,&quot;collection_id&quot;:368,&quot;user_id&quot;:1,&quot;title&quot;:&quot;Master Section&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Test&quot;,&quot;created_at&quot;:&quot;2021-01-28 05:30:46&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:385,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Mammals&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Testing&quot;,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:386,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Sea creatures&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Testing&quot;,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:387,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Birds&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Testing&quot;,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:388,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;New section&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:390,&quot;collection_id&quot;:368,&quot;user_id&quot;:1,&quot;title&quot;:&quot;section1&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-19 06:55:55&quot;,&quot;updated_at&quot;:&quot;2021-01-19 06:55:55&quot;},{&quot;section_id&quot;:391,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;s1&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 05:50:25&quot;,&quot;updated_at&quot;:&quot;2021-01-19 08:29:56&quot;},{&quot;section_id&quot;:393,&quot;collection_id&quot;:383,&quot;user_id&quot;:17,&quot;title&quot;:&quot;Section 1&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-20 12:34:50&quot;,&quot;updated_at&quot;:&quot;2021-01-20 12:34:50&quot;},{&quot;section_id&quot;:394,&quot;collection_id&quot;:402,&quot;user_id&quot;:20,&quot;title&quot;:&quot;Testing&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Hhhrrr&quot;,&quot;created_at&quot;:&quot;2021-01-25 00:03:40&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:397,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;s3&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 06:47:07&quot;,&quot;updated_at&quot;:&quot;2021-01-22 11:38:33&quot;},{&quot;section_id&quot;:398,&quot;collection_id&quot;:0,&quot;user_id&quot;:13,&quot;title&quot;:&quot;Rain&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 07:25:30&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:399,&quot;collection_id&quot;:412,&quot;user_id&quot;:13,&quot;title&quot;:&quot;New&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-22 07:34:21&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:402,&quot;collection_id&quot;:401,&quot;user_id&quot;:20,&quot;title&quot;:&quot;Twlight &quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Vampire&quot;,&quot;created_at&quot;:&quot;2021-01-25 00:04:47&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:403,&quot;collection_id&quot;:32,&quot;user_id&quot;:3,&quot;title&quot;:&quot;Section test 5&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:null,&quot;created_at&quot;:&quot;2021-01-25 05:14:07&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:405,&quot;collection_id&quot;:421,&quot;user_id&quot;:20,&quot;title&quot;:&quot;Electrical testing&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Current&quot;,&quot;created_at&quot;:&quot;2021-01-28 02:33:38&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;},{&quot;section_id&quot;:406,&quot;collection_id&quot;:422,&quot;user_id&quot;:20,&quot;title&quot;:&quot;Wamp&quot;,&quot;privacy&quot;:&quot;Public&quot;,&quot;description&quot;:&quot;Wwweddd&quot;,&quot;created_at&quot;:&quot;2021-01-28 03:16:44&quot;,&quot;updated_at&quot;:&quot;-0001-11-30 00:00:00&quot;}]";
                 var html1="<li style='background:white;color:#27A291;cursor:auto;width:200px'> <i onclick='Pintool()' style='float:left;font-size:26px;margin-right:12px;margin-top:-2px;'  class='fa fa-angle-left'></i>Choose Section</li>";
                 datas=JSON.parse(datas.replace(/&quot;/g,'"'));
                 for(var i=0;i<datas.length;i++)
                 {
                     if(datas[i].collection_id==collectionid){
                     html1+='<li onclick="SaveToCollectionSection(this)" class="list-group-item add-hover SaveToCollectionSection" data-id="'+datas[i].section_id+'+'+datas[i].collection_id+'+'+pageid+'"  style="border:1px solid white">'+datas[i].title+'</li>';
                     }
                 }
                 document.getElementById("popup-hide3-1").innerHTML=html1;
                document.getElementById("popup-hide2-1").classList.remove('popup-hide-2'); 
                document.getElementById("collection-list-item-1").classList.add('popup-hide-2');
                document.getElementById("section-list-item-1").classList.remove('popup-hide-2');
                document.getElementById('demo-'+1).classList.add('collapse');
                document.getElementById('create-colection-'+1).classList.add('popup-hide-2');
                e.stopPropagation();
                
            }
            function SaveToCollectionSection(elem)
            {
                var alert = $(".alert-container"); 
                var data=elem.getAttribute('data-id');
                data=data.split('+');
                           $.ajax({
                           type: "post",
                           url: "http://pagevio.com/save-to-pins",
                           data: {page_id:data[2],type:'2',collection_id:data[1],section_id:data[0],Description:selectedtext,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                           success: function(data){ 
                           console.log(data);
    
                           if (data[0].status) {
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html(data[0].status);
                        $('.alert-container').show();
                        //$('.clearCollectionpopup').addClass('popup-close');
                        //window.location.reload();
                        document.getElementById('selectionSharerPopover').style.display="none";
                        document.getElementById('popup-hide2-1').classList.add('popup-hide-2');
    
                       }else{
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>Something went wrong </strong>");
                        $('.alert-container').show();
                        //$('.clearCollectionpopup').addClass('popup-close');
                        document.getElementById('popup-hide2-1').classList.add('popup-hide-2');
                        }
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                        } 
                      });
                   }
    </script>
     <script type="text/javascript">
    
            //Follow
         $('#follow').click(function (){
                
              $('#follow').hide();
              $('#unfollow').show();
    
            var user_id = $(this).data('id'); 
            var alert = $(".alert-container");   
    
            $.ajax({
                type: "post",
                url: "http://pagevio.com/follow",
                data: {user_id:user_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){ 
        
                if (data == 'success') {
                    $('.alert-container').removeClass("alert-container-error")
                    $('#msg').html("<strong>Follow successfully</strong>");
                    $('.alert-container').show();
    
                }else{
                    $('#msg').html("<strong>Some thing went worng</strong>");
                    $('.alert-container').show();
                    $(".alert-container").addClass("alert-container-error");
                    }
                    alert.slideDown();
                        window.setTimeout(function () {
                            alert.slideUp();
                            //location.reload();
                        }, 3000);
                    } 
                  });
            });
    
            $('#unfollow').click(function (e){
                $('#unfollow').hide();
                $('#follow').show();
              var user_id = $(this).data('id'); 
              var alert = $(".alert-container");   
    
             $.ajax({
                type: "post",
                url: "http://pagevio.com/unfollow",
                data: {user_id:user_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){ 
        
                if (data == 'success') {
                    $('.alert-container').removeClass("alert-container-error")
                     $('#follow').show();
                    $('#msg').html("<strong>Unfollow successfully</strong>");
                    $(".alert-container").addClass("alert-container-error");
                    $('.alert-container').show();
                    
    
                }else{
                    $('#msg').html("<strong>Some thing went worng</strong>");
                    $('.alert-container').show();
                    $(".alert-container").addClass("alert-container-error");
                    }
                    alert.slideDown();
                        window.setTimeout(function () {
                            alert.slideUp();
                            //location.reload();
                        }, 3000);
                    } 
                  });
            });
    
        $(document).ready(function () {
            ShowBookmark();
            var user_id="3298";
            if(!(user_id)){
                user_id=0;
            }
               $.ajax({
                type: "post",
                url: "http://pagevio.com/follow_verify",
                data: {user_id:user_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){ 
                    if (data == 'success') {
                         $('#follow').hide();
                        $('#unfollow').show();
                    }else{
                        $('#unfollow').hide();
                        $('#follow').show();  
                    }
                } 
            });        
       }); 
    
    //End Follow
    $('.subheadtitlenavigation').on('click',function(e){
        var ele=$(e.target).attr('data-id');
        var element=document.getElementById(ele);
        $('html, body').animate({
            scrollTop: $(element).offset().top-80
        }, 'slow');
    })
    //like
        $('#like_button').click(function(){
            $('#white_like1').show();
    
            var page_id = $(this).data('id');
            var like =$('#page_like').html(); 
            var alert = $(".alert-container");   
            var from="page";
            $.ajax({
                type: "post",
                url: "http://pagevio.com/page-like",
                data: {page_id:page_id,from:from,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){
              
                if (data.status == 'success') {
                    $('#page_unlike').html(data.result);
                    $('#like_button').hide();
                    $('#unlike_button').show();
                    $('.alert-container').removeClass("alert-container-error")
                    $('#msg').html("<strong>Like</strong>");
                    $('.alert-container').show();
    
                }else{
                    $('#msg').html("<strong>Some thing went worng</strong>");
                    $('.alert-container').show();
                    $(".alert-container").addClass("alert-container-error");
                    }
                    alert.slideDown();
                        window.setTimeout(function () {
                            alert.slideUp();
                            //location.reload();
                        }, 3000);
                    } 
                  });
        });
    
        $('#unlike_button').click(function(){
    
            var page_id = $(this).data('id');
            var like =$('#page_like').html(); 
            var alert = $(".alert-container");   
            $.ajax({
                type: "post",
                url: "http://pagevio.com/page-unlike",
                data: {page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){
              
                if (data.status == 'success') {
                    $('#page_like').html(data.result);
                    $('#like_button').show();
                    $('#unlike_button').hide();
                    $('.alert-container').addClass("alert-container-error")
                    $('#msg').html("<strong>Unlike</strong>");
                    $('.alert-container').show();
    
                }else{
                    $('#msg').html("<strong>Some thing went worng</strong>");
                    $('.alert-container').show();
                    $(".alert-container").addClass("alert-container-error");
                    }
                    alert.slideDown();
                        window.setTimeout(function () {
                            alert.slideUp();
                            //location.reload();
                        }, 3000);
                    } 
                  });
        });
    
         $(document).ready(function () {
    
             var page_id = "3298";
    
               $.ajax({
                type: "post",
                url: "http://pagevio.com/check-like",
                data: {page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success: function(data){
                //console.log(data); 
                    if (data.status == 'success') {
                         $('#like_button').hide();
                        $('#unlike_button').show();
                        $('#page_unlike').html(data.result);
                        $('#page_like').html(data.result);
                    }else{
                        $('#page_like').html(data.result);
                        $('#unlike_button').hide();
                        $('#like_button').show();  
                    }
                }
            });  
    
            //get All Comments
    
            $.ajax({
              type: "post",
              url: "http://pagevio.com/check-total-comment",
              data: {page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
              success: function(data){
                 if (data.status == 'success') { 
                    $('#total-comment').html(data.result);
                 }
                } 
            });       
       }); 
    
    //End likes
    
    //Comment
    
    $('.send-msPopup').click(function(){
    if(ongoingcomment)
        {
            return;
        }
        else
        {
            ongoingcomment=true;
        }
        $('.send-msPopup').css('cursor','wait');
         var msg=$('.comment').val();
         var page_id = "3298";
         var alert = $(".alert-container");   
    
            if (msg == "") {
                
                $('#msg').html("<strong>Comment must be filled out</strong>");
                $('.alert-container').show();
                $(".alert-container").addClass("alert-container-error");
                    alert.slideDown();
                    window.setTimeout(function () {
                    alert.slideUp();
                    }, 3000);   
                return false;
            }
    
         $.ajax({
            type: "post",
            url: "http://pagevio.com/page-comment",
            data: {page_id:page_id,msg:msg,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success: function(data){
    
             if (data.status == 'success') {
                $('.comment').val(" ");
                 $('.send-msPopup').css('cursor','default');
                $('.alert-container').removeClass("alert-container-error")
                $('#msg').html("<strong>Comment Send</strong>");
                $('#total-comment').html(data.comment);
                $('.alert-container').show();
                 ongoingcomment=false;
    
            }else{
                $('#msg').html("<strong>Some thing went worng</strong>");
                $('.alert-container').show();
                $(".alert-container").addClass("alert-container-error");
                 ongoingcomment=false;
            }
            alert.slideDown();
                window.setTimeout(function () {
                alert.slideUp();
                            //location.reload();
                }, 3000);
            } 
        });
    });
    function dateToYMD(date) {
                    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var d = date.getDate();
                    var m = strArray[date.getMonth()];
                    var y = date.getFullYear();
                    return '' + (d <= 9 ? '0' + d : d) + ',' + m + ',' + y;
                }
    
    $('.CommentClick').click(function(){
    
          var page_id = "3298";
          var alert = $(".alert-container");  
    
          var comment='<li class="card card-comment  card--small"><figure class="card-figure"><img src="http://pagevio.com/uploads/profile/1610538444.png" class="image--cover"></figure><div class="card-content"><div class="content-whatsapp-bottom"><input style=" border: 1px solid #27A291;" class="whats-input comment2" type="text"  placeholder="Leave a comment..." /><img class="send-msPopup" onclick="commentSend()" src="http://pagevio.com/assets/images/help/send.png" alt="My Pic"></div></div></li>';
    
          $.ajax({
            type: "post",
            url: "http://pagevio.com/get-all-comments",
            data: {page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success: function(response){
             var data = JSON.parse(response);
             if (data.status == 'success') {
                    var count=0;
                    var replypadding=75;
                var opt='';
                data.result.forEach(function(item, index){    
                 if(count>2)
                  {    if(item.field=='parent')
                      {
                      comment +='<li class="hidextracom card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></figure><a><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" id="CommentReply'+item.id+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      else
                      {
                       comment +='<li style="padding-left:'+replypadding+'px;" class="hidextracom card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></figure></a><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" id="CommentReply'+item.id+'" value="@'+item.username+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\''+"child"+'\')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      $('#cmtshowmore').show();
                  }
                  else
                  {
                      if(item.field=='parent')
                      {
                          ++count;
                      comment +='<li class="card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" id="CommentReply'+item.id+'" type="text"  placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      else
                      {
                       comment +='<li style="padding-left:'+replypadding+'px;" class="card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" id="CommentReply'+item.id+'" type="text" value="@'+item.username+'" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                  }
                 });
    
                $('#CommentLoad').html(comment);
    
               }else{
                    $('#CommentLoad').html(comment);
                    /*$('#msg').html("<strong>Some thing went worng</strong>");
                    $('.alert-container').show();
                    $(".alert-container").addClass("alert-container-error");
                     alert.slideDown();
                    window.setTimeout(function () {
                    alert.slideUp();
                                //location.reload();
                    }, 3000);*/
                }  
            } 
         });
    
    });
    
    var ongoingcomment=false;
    function commentSend(parentId,opt,ids)
    {
        if(ongoingcomment)
        {
            return;
        }
        else
        {
            ongoingcomment=true;
        }
        $('.send-msPopup').css('cursor','wait');
         var msg=$('.comment2').val();
         var page_id = "3298";
         var alert = $(".alert-container");   
         if(parentId)
         {
             msg=$('#CommentReply'+ids).val();
         }
            if (msg == "") {
                
                $('#msg').html("<strong>Comment must be filled out</strong>");
                $('.alert-container').show();
                $(".alert-container").addClass("alert-container-error");
                    alert.slideDown();
                    window.setTimeout(function () {
                    alert.slideUp();
                    }, 3000);   
                return false;
            }
    
         $.ajax({
            type: "post",
            url: "http://pagevio.com/page-comment",
            data: {page_id:page_id,msg:msg,parentId:parentId,opt:opt,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success: function(data){
    
             if (data.status == 'success') {
                $('.comment2').val(" ");
                $('.send-msPopup').css('cursor','default');
                commentReload();
                $('.alert-container').removeClass("alert-container-error")
                $('#msg').html("<strong>Comment Send</strong>");
                 $('#total-comment').html(data.comment);
                $('.alert-container').show();
                ongoingcomment=false;
    
            }else{
                $('#msg').html("<strong>Some thing went worng</strong>");
                $('.alert-container').show();
                $(".alert-container").addClass("alert-container-error");
                ongoingcomment=false;
            }
            alert.slideDown();
                window.setTimeout(function () {
                alert.slideUp();
                            //location.reload();
                }, 3000);
            } 
        });
    }
    
    function commentReload()
    {
         var page_id = "3298";
    
          var comment='<li class="card card-comment  card--small"><figure class="card-figure"><img src="http://pagevio.com/uploads/profile/1610538444.png" class="image--cover"></figure><div class="card-content"><div class="content-whatsapp-bottom"><input class="whats-input comment2" type="text" placeholder="Leave a comment..." /><img class="send-msPopup" onclick="commentSend()" src="http://pagevio.com/assets/images/help/send.png" alt="My Pic"></div></div></li>';
    
          $.ajax({
            type: "post",
            url: "http://pagevio.com/get-all-comments",
            data: {page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success: function(response){
             var data = JSON.parse(response);
             if (data.status == 'success') {
                var count=0;
                var replypadding=75;
                var opt='';
                data.result.forEach(function(item, index){    
            console.log(item.created_at);
                  if(count>2)
                  {    if(item.field=='parent')
                      {
                      comment +='<li class="hidextracom card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" id="CommentReply'+item.id+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      else
                      {
                       comment +='<li style="padding-left:'+replypadding+'px;" class="hidextracom card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" value="@'+item.username+'" id="CommentReply'+item.id+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child" + '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      $('#cmtshowmore').show();
                  }
                  else
                  {
                      if(item.field=='parent')
                      {
                          ++count;
                      comment +='<li class="card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2"  id="CommentReply'+item.id+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                      else
                      {
                       comment +='<li style="padding-left:'+replypadding+'px;" class="card card-comment  card--small" id="AllComments"><figure class="card-figure"><a href="http://pagevio.com/author-profile/'+item.user_id+'"><img src="'+window.location.origin+'/'+item.avatar+'" class="image--cover"></a></figure><div class="card-content"><h4>'+item.username+'<span>'+dateToYMD(new Date(item.created_at))+'</span></h4><p>'+item.text+'</p><a class="reply" onclick="showReply('+index+')" id="reply_'+index+'">Reply</a><div class="content-whatsapp-bottom reply_box" id="reply_box_'+index+'" style="display:none;"><input style="border: 1px solid #27A291;width: 50%;margin-top:0px" class="whats-input comment2" value="@'+item.username+'" id="CommentReply'+item.id+'" type="text" placeholder="Leave a comment..."><img class="send-msPopup" onclick="commentSend('+item.parentId+',\'' +"child"+ '\','+item.id+')" src="https://arinos.co.uk/assets/images/help/send.png" alt="Send Reply" style="margin-top:0 !important;"></div></div></li>';
                      }
                  }
                 });
    
                $('#CommentLoad').html(comment);
    
               }
            } 
         });
    }
    function showReply(i){
              $('.reply').show();
              $('.reply_box').hide();
              $('#reply_'+i).hide();
              $('#reply_box_'+i).show();
          }
    //endcomment
    </script>
     <script>
    //add TO collection
                $('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
        
        
                function collapse() {
                    document.getElementById("demo").style.display = "block";
                    document.getElementById("list-item").style.height = "65px";
                    document.getElementById("collapse-div").style.textAlign = "center"
                    document.getElementById("collapse-image").style.display = "none";
                    document.getElementById("collapse-text").innerHTML = "Create";
                   
                }
        
                var x, i, j, selElmnt, a, b, c;
                /*look for any elements with the class "custom-select":*/
                x = document.getElementsByClassName("custom-select");
                for (i = 0; i < x.length; i++) {
                  selElmnt = x[i].getElementsByTagName("select")[0];
                  /*for each element, create a new DIV that will act as the selected item:*/
                  a = document.createElement("DIV");
                  a.setAttribute("class", "select-selected");
                  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                  x[i].appendChild(a);
                  /*for each element, create a new DIV that will contain the option list:*/
                  b = document.createElement("DIV");
                  b.setAttribute("class", "select-items select-hide");
                  for (j = 1; j < selElmnt.length; j++) {
                    /*for each option in the original select element,
                    create a new DIV that will act as an option item:*/
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.addEventListener("click", function(e) {
                        /*when an item is clicked, update the original select box,
                        and the selected item:*/
                        var y, i, k, s, h;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        h = this.parentNode.previousSibling;
                        for (i = 0; i < s.length; i++) {
                          if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                              y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                          }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                  }
                  x[i].appendChild(b);
                  a.addEventListener("click", function(e) {
                      /*when the select box is clicked, close any other select boxes,
                      and open/close the current select box:*/
                      e.stopPropagation();
                      closeAllSelect(this);
                      this.nextSibling.classList.toggle("select-hide");
                      this.classList.toggle("select-arrow-active");
                      /*document.getElementsByClassName("select-selected").style.color = "#24D4BC"*/
                    });
                }
                function closeAllSelect(elmnt) {
                  /*a function that will close all select boxes in the document,
                  except the current select box:*/
                  var x, y, i, arrNo = [];
                  x = document.getElementsByClassName("select-items");
                  y = document.getElementsByClassName("select-selected");
                  for (i = 0; i < y.length; i++) {
                    if (elmnt == y[i]) {
                      arrNo.push(i)
                    } else {
                      y[i].classList.remove("select-arrow-active");
                    }
                  }
                  for (i = 0; i < x.length; i++) {
                    if (arrNo.indexOf(i)) {
                      x[i].classList.add("select-hide");
                    }
                  }
                }
                /*if the user clicks anywhere outside the select box,
                then close all select boxes:*/
                document.addEventListener("click", closeAllSelect);
         $('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
        
        
                function collapse() {
                    $('#collection-name').val('');
                    document.getElementById("demo").style.display = "block";
        /*            document.getElementById("list-item").style.height = "65px";*/
                    document.getElementById("collapse-div").style.textAlign = "center"
                   /* document.getElementById("collapse-image").style.display = "none";*/
                   /* document.getElementById("collapse-text").innerHTML = "Create";*/
                    $('#collapse-div').hide();
                    $('#create-collection').show();
                    $('#collection-form').show();
                   
                }
    
                  $(".SaveToCollection").click(function () { 
            
            $('#dropdown-collection').removeClass('dropdown open');
            $('#dropdown-collection').addClass('dropdown'); 
    
            var id = $(this).data('id');
            var page_id = $(this).data('page-id');
            var result = id.split("+");
          
            var alert = $(".alert-container");
                $.ajax({
                    type: "post",
                    url: "http://pagevio.com/save-to-collection",
                    data: {id:result[0],type:result[1],type_id:result[2],page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                    success: function(data){ 
     
                    if (data.status == 'success') {
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
    
                    }else{
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
                        }
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                        } 
                      });
            });
    
         function SaveToCollection(e)
         {  
           $('#dropdown-collection').removeClass('dropdown open');
           $('#dropdown-collection').addClass('dropdown');
    
           var id = $(e).data('id');
           var result = id.split("+");
           var page_id = $(e).data('page-id');
           var alert = $(".alert-container");
              $.ajax({
                    type: "post",
                    url: "http://pagevio.com/save-to-collection",
                    data: {id:result[0],type:result[1],type_id:result[2],page_id:page_id,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                    success: function(data){ 
     
                    if (data.status == 'success') {
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
    
                    }else{
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
                        }
                        alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                        } 
                      });
    
              
         }
    
         $('#create-collection').click(function(){
    
             var name = document.forms["collection-form"]["collection-name"].value;
             var privacy = document.forms["collection-form"]["privacy"].value;
             var alert = $(".alert-container");
    
             var page_id = "3298";
    
             if (name == '') {
    
               $('.alert-container').removeClass('alert-container-success');
               $(".alert-container").addClass("alert-container-error");
               $('#msg').html("<strong>Collection name fill out</strong>");
               $('.alert-container').show();
                
                alert.slideDown();
                    window.setTimeout(function () {
                      alert.slideUp();
                        //location.reload();
                 }, 1000);
               return
             }
    
              $.ajax({
                  type: "post",
                  url: "http://pagevio.com/create-collection",
                  data: {title:name,privacy:privacy,"_token": "jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                  success: function(data){ 
                      
                      var html='';
                    if (data.status == 'success') {
        
                      var result = JSON.parse(data.result);
    
                       result.forEach(function(item, index){
                       
    
                        html +='<li class="list-group-item add-hover SaveToCollection" onclick=SaveToCollection(this) data-id="'+item.collection_id+'+collection-pages+4" data-page-id="'+page_id+'">';
                        html += item.title.substr(0, 15)+'<i class="fa fa-globe"></i></li>';    
                            
                        });
                        
                        $('.add-roll').html(html);
    
    
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
                        $('#collection-name').val('');
                        $('#collapse-div').show();
                        $('#collection-form').hide();
                        $('#create-collection').hide();
                        $('.add-roll').css({"height": "165px"});
                        $(".form-control").css({"border-block-end-color": "black", "color": "black"});
    
    
                    }else{
                        $( "#collection-name" ).focus();
                        $(".form-control").css({"border-block-end-color": "red", "color": "red"});
                        $('.alert-container').removeClass('alert-container-success');
                        $(".alert-container").addClass("alert-container-error");
                        $('#msg').html("<strong>"+data.msg+"</strong>");
                        $('.alert-container').show();
                        }
                     alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 2000);
                        } 
                       
                      });
              
    
         });
            </script>
         <script>
            (function() {
                var Util,orgstl,
                  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    
                Util = (function() {
                    function Util() {}
    
                    Util.prototype.extend = function(custom, defaults) {
                        var key, value;
                        for (key in custom) {
                            value = custom[key];
                            if (value != null) {
                                defaults[key] = value;
                            }
                        }
                        return defaults;
                    };
    
                    Util.prototype.isMobile = function(agent) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
                    };
    
                    return Util;
    
                })();
    
                this.WOW = (function() {
                    WOW.prototype.defaults = {
                        boxClass: 'wow',
                        animateClass: 'animated',
                        offset: 0,
                        mobile: true
                    };
    
                    function WOW(options) {
                        if (options == null) {
                            options = {};
                        }
                        this.scrollCallback = __bind(this.scrollCallback, this);
                        this.scrollHandler = __bind(this.scrollHandler, this);
                        this.start = __bind(this.start, this);
                        this.scrolled = true;
                        this.config = this.util().extend(options, this.defaults);
                    }
    
                    WOW.prototype.init = function() {
                        var _ref;
                        this.element = window.document.documentElement;
                        if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
                            return this.start();
                        } else {
                            return document.addEventListener('DOMContentLoaded', this.start);
                        }
                    };
    
                    WOW.prototype.start = function() {
                        var box, _i, _len, _ref;
                        this.boxes = this.element.getElementsByClassName(this.config.boxClass);
                        if (this.boxes.length) {
                            if (this.disabled()) {
                                return this.resetStyle();
                            } else {
                                _ref = this.boxes;
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    box = _ref[_i];
                                    this.applyStyle(box, true);
                                }
                                window.addEventListener('scroll', this.scrollHandler, false);
                                window.addEventListener('resize', this.scrollHandler, false);
                                return this.interval = setInterval(this.scrollCallback, 50);
                            }
                        }
                    };
    
                    WOW.prototype.stop = function() {
                        window.removeEventListener('scroll', this.scrollHandler, false);
                        window.removeEventListener('resize', this.scrollHandler, false);
                        if (this.interval != null) {
                            return clearInterval(this.interval);
                        }
                    };
    
                    WOW.prototype.show = function(box) {
                        this.applyStyle(box,1);
                        return box.className = "" + box.className + " " + this.config.animateClass;
                    };
    
                    WOW.prototype.applyStyle = function(box, hidden) {
                        var delay, duration, iteration;
                        duration = box.getAttribute('data-wow-duration');
                        delay = box.getAttribute('data-wow-delay');
                        iteration = box.getAttribute('data-wow-iteration');
                        if(hidden==1)
                        {
                         return box.setAttribute('style',box.getAttribute('style'));    
                        }
                        else{
                        return box.setAttribute('style',box.getAttribute('style')+ this.customStyle(hidden, duration, delay, iteration));
                        }
                    };
    
                    WOW.prototype.resetStyle = function() {
                        var box, _i, _len, _ref, _results;
                        _ref = this.boxes;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            box = _ref[_i];
                            _results.push(box.setAttribute('style','visibility: visible;'));
                        }
                        return _results;
                    };
    
                    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
                        var style;
                        style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
                        if (duration) {
                            style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
                        }
                        if (delay) {
                            style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
                        }
                        if (iteration) {
                            style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
                        }
                        return style;
                    };
    
                    WOW.prototype.scrollHandler = function() {
                        return this.scrolled = true;
                    };
    
                    WOW.prototype.scrollCallback = function() {
                        var box;
                        if (this.scrolled) {
                            this.scrolled = false;
                            this.boxes = (function() {
                                var _i, _len, _ref, _results;
                                _ref = this.boxes;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    box = _ref[_i];
                                    if (!(box)) {
                                        continue;
                                    }
                                    if (this.isVisible(box)) {
                                        this.show(box);
                                        continue;
                                    }
                                    _results.push(box);
                                }
                                return _results;
                            }).call(this);
                            if (!this.boxes.length) {
                                return this.stop();
                            }
                        }
                    };
    
                    WOW.prototype.offsetTop = function(element) {
                        var top;
                        top = element.offsetTop;
                        while (element = element.offsetParent) {
                            top += element.offsetTop;
                        }
                        return top;
                    };
    
                    WOW.prototype.isVisible = function(box) {
                        var bottom, offset, top, viewBottom, viewTop;
                        offset = box.getAttribute('data-wow-offset') || this.config.offset;
                        viewTop = window.pageYOffset;
                        viewBottom = viewTop + this.element.clientHeight - offset;
                        top = this.offsetTop(box);
                        bottom = top + box.clientHeight;
                        return top <= viewBottom && bottom >= viewTop;
                    };
    
                    WOW.prototype.util = function() {
                        return this._util || (this._util = new Util());
                    };
    
                    WOW.prototype.disabled = function() {
                        return !this.config.mobile && this.util().isMobile(navigator.userAgent);
                    };
    
                    return WOW;
    
                })();
    
            }).call(this);
    
    
            wow = new WOW(
              {
                  animateClass: 'animated',
                  offset: 100
              }
            );
            wow.init();
        </script>
          <script>
    (function($) {
      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author  Sam Sehnert
       * @desc  A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */
    var audio1 = document.getElementById('Audio_1');
      $.fn.visible = function(partial) {
        var $t = $(this),
          $w = $(window),
          viewTop = $w.scrollTop() + 70;
          viewBottom = viewTop + $w.height(),
          _top = $t.offset().top,
          _bottom = _top + $t.height(),
          compareTop = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
        return compareBottom <= viewBottom && compareTop >= viewTop;
      };
    })(jQuery);
    $(window).scroll(function(event) {
      $(".audioplayer").each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          //el.addClass("fadeIn");
            $(".audioinview").trigger('play');
            $(el).addClass("audioplayer-playing");
        } else {
         // el.removeClass("fadeIn");s
        if($(el).find('audio')[0].classList.contains('audiooutview')){$(".audioinview").trigger('pause');
        $(el).removeClass("audioplayer-playing");
        }
        }
      });
    });
    function Report_Author(){
        var reason=$('.reportradio').find('input[type=radio]:checked').next().text();
        var ReportAdditional=$('#ReportAdditional').val();
        $.ajax({
            type:'post',
            url:"http://pagevio.com/report-author",
            data:{authorid:"1",pageid:"3298",type:'page',reason:reason,ReportAdditional:ReportAdditional,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success:function(data){
                if(data.status=="success"){
                $('#myModal2').modal('show');
                }
                else if(data.status=="failed")
                {
                  var alert = $(".alert-container");
                  $(".alert-container").addClass("alert-container-error");
                  $('#msg').html("<strong>"+data.msg+"</strong>");
                  $('.alert-container').show();
                     alert.slideDown();
                  window.setTimeout(function () {
                      alert.slideUp();
                                //location.reload();
                    }, 1000);
                }
            },
            error:function(data){
                
            },
        })
    }
    //Progarm Tab Active
    function ActivateProgramTable(get,ids){
      event.preventDefault();
      $('#ProgramCancel_'+ids).find('.progtabs_nav td').removeClass('tab-active');
      $(get).addClass('tab-active');
      $('#ProgramCancel_'+ids).find('.progtabs_stage').hide();
      $($(get).attr('href')).show();
    }
    //function for subscribe
    function SeriesSubscribe(post_id,author_id,type,status)
    {
        $.ajax({
            type:'post',
            dataType:'json',
            url:"http://pagevio.com/post-subscribe",
            data:{post_id:post_id,author_id:author_id,type:type,status:status,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
            success:function(result)
            {
                if(status==1)
                {
                 if (result.status == 'success' ) {
                        $('#subscribe_btn').hide();
                        $('#unsubscribe_btn').show();
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html(result.msg);
                        $('.alert-container').show();
                    }
                else
                {
                  $('.alert-container').addClass('alert-container-error');
                        $(".alert-container").removeClass("alert-container-success");
                        $('#msg').html("Unable to Subscribe try again later !");
                        $('.alert-container').show();   
                }
                }
                else if(status==0)
                {
                 if (result.status == 'success' ) {
                        $('#subscribe_btn').show();
                        $('#unsubscribe_btn').hide();
                        $('.alert-container').removeClass('alert-container-error');
                        $(".alert-container").addClass("alert-container-success");
                        $('#msg').html(result.msg);
                        $('.alert-container').show();
                    }
                else
                {
                  $('.alert-container').addClass('alert-container-error');
                        $(".alert-container").removeClass("alert-container-success");
                        $('#msg').html(result.msg);
                        $('.alert-container').show();   
                }   
                }
                $('.alert-container').slideDown();
                            window.setTimeout(function () {
                                $('.alert-container').slideUp();
                                //location.reload();
                            }, 1000);
            },
        });
    }
    function Bookmarktool()
         {
              var page_id="3298";
              if(selectedtext>300)
              {
                  alert("Characters should be below 300");
                  return false;
              }
              var alert = $(".alert-container"); 
           $.ajax({
                type:'post',
                url:"http://pagevio.com/add-bookmark",
                data:{page_id:page_id,type:'select',data:selectedtext,line_number:line_number,selected_text:1,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                success:function(data)
                {
                    if(data.status=='success')
                    {
                        $('#msg').html("Bookmark Added");
                       alert.slideDown();
                            window.setTimeout(function () {
                                alert.slideUp();
                                //location.reload();
                            }, 1000);
                    }
                },
                error:function(){},
             });
         }
    function AddBookmark(img)
         {
                 var ln=1;
                 $('.chapter-content').find('.selectionShareable').each(function(key,item){
                     if(item==img.parentElement.parentElement)
                     {
                         return false;
                     }
                     else
                     {
                         ln=ln+1;
                     }
                 });
              var alert = $(".alert-container");
             var page_id="3298";
             var data=img.parentElement.parentElement.innerText;
             var id=img.id;
             img.src=="http://pagevio.com/assets/images/icons/white_bookmark.png" ? 
             (
                 (img.src="http://pagevio.com/assets/images/icons/c_bookmark.png") &&
                 $('#msg').html("<span>Bookmark Added</span>&nbsp;&nbsp;<u style='cursor:pointer' onclick='bookmarkundo()'>undo</u>") &&
                         alert.slideDown() &&
                        window.setTimeout(function () {
                            //location.reload();
                            if(bookundo==0)
                            {
                             $.ajax({
                              type:'post',
                                url:"http://pagevio.com/add-bookmark",
                              data:{page_id:page_id,type:'page',data:data,line_number:ln,selected_text:0,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                              success:function(data)
                              {
                               if(data.status=='success')
                               {
                                   img.src="http://pagevio.com/assets/images/icons/c_bookmark.png" ;
                                   alert.slideUp();
                                img.id=data.id;
                                }
                              },
                             error:function(){
                                 img.src="http://pagevio.com/assets/images/icons/white_bookmark.png" ;
                             },
                              });
                            }
                            else{
                                img.src="http://pagevio.com/assets/images/icons/white_bookmark.png" ;
                                alert.slideUp();
                                bookundo=0;
                            }
                        },3000)
             ) :
             (id && $('#msg').html("<span>Bookmark Deleted</span>&nbsp;&nbsp;<u style='cursor:pointer' onclick='bookmarkundo()'>undo</u>") && alert.slideDown() &&
             (img.src="http://pagevio.com/assets/images/icons/white_bookmark.png") &&
             window.setTimeout(function () {
                 if(bookundo==0)
                 {
                 $.ajax({
                 type:'post',
                 url:"http://pagevio.com/delete-bookmark",
                 data:{id:id,"_token":"jcyTxJzoh1jeOXDIOI5VTECcK7dohDR3p37TOhhk"},
                 success:function(result)
                 {
                     img.src="http://pagevio.com/assets/images/icons/white_bookmark.png";
                     if(result.status=='success')
                     {
                         alert.slideUp();
                        $('#msg').html("<strong>"+result.msg+"</strong>&nbsp;&nbsp;<u>undo</u>");
                            location.reload();
                     }
                 },
                 
                  })
                 }
               else
               {
                   img.src="http://pagevio.com/assets/images/icons/c_bookmark.png";
               alert.slideUp();
               bookundo=0;  
                }
             }, 3000)
             )
             
         }
         function bookmarkundo()
         {
             bookundo=1;
             $('.alert-container').slideUp();
         }
         function ShowBookmark()
         {
            var bookmarks=[];
             var highlightt="";
             var highlighttext="";
             if(highlightt)
             {
                // var parser = new DOMParser;
                 //highlighttext=parser.parseFromString(highlightt.line_data,'text/html').body.textContent;
                highlighttext= highlightt.line_data;  
             }
             //bookmarks=JSON.parse(bookmarks.replace(/&quot;/g,'"'));
             for(var iteration=0;iteration<bookmarks.length;iteration++)
             {
                 var parser = new DOMParser;
                 var l=parser.parseFromString(bookmarks[iteration].line_data,'text/html').body.textContent;
                 $('.selectionShareable').each(function(i,val){
                    var str=$(this).text();
                    var str1=$(this).html();
                    if(highlighttext && (i+1==highlightt.line_number))
                    {
                        if(highlightt.selected_text==0)
                        {
                          //$(this).addClass('highlight');
                          var t=$(this).text();
                          var s=$(this).find('span');
                          $(this).text("");
                          $(this).append(s[0]);
                          $(this).append('<span class="highlight">'+t+'</span>');
                          $('html, body').animate({
                           scrollTop: $(this).offset().top-80
                           }, 'slow');
                            highlighttext="";
                        }
                        else
                        {
                        highlight(highlighttext,$(this));
                        highlighttext="";
                        }
                    }
                    if((!(str.search(l)==-1) || (str.length==l.length)) && (i+1==bookmarks[iteration].line_number))
                    {
                        var v=$(this).find('img');
                        v[0].id=bookmarks[iteration].id;
                        v[0].src="http://pagevio.com/assets/images/icons/c_bookmark.png" ;
                        if(!highlighttext){
                        return false;}
                    }
                 });
             }
         }
         function highlight(text,element)
         {   var found=element[0].innerHTML;
             var t=element[0].innerHTML.indexOf(text);
             if(t!=-1)
             {
                 element[0].innerHTML=found.substring(0,t)+'<span class="highlight">'+found.substring(t,t+text.length)+'</span>'+found.substring(t+text.length);
                 $(element).find('img').attr('src',"http://pagevio.com/assets/images/icons/white_bookmark.png");
                 $('html, body').animate({
                     scrollTop: $(element).offset().top-80
                 }, 'slow');
             }
         }
         
           $('#drop-arrow').click(function () {
            $('header').toggle();
            //$('.progress').addClass('show-menu');
            $('.progress').toggleClass('show-menu').siblings().removeClass('show-menu');
            $('.container').toggleClass('pt').siblings().removeClass('pt');
            $('#drop-arrow').toggleClass('fa-angle-down')
        });
         /*progress bar window scroll starts here*/
    
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.header ').hide();
                $('.progress').addClass('show-menu');
                if (!($('#drop-arrow').hasClass('fa-angle-down')))
                { $('#drop-arrow').toggleClass('fa-angle-down');}
            } else{
                if($(this).scrollTop()==0 || (!($('#drop-arrow').hasClass('fa-angle-down')))){
                    $('#drop-arrow').removeClass('fa-angle-down');
                    $('.progress').removeClass('show-menu');
                    $('.header ').show();
                }
            }
        });
    </script>
      <script>
          function showReply(i){
              $('.reply').show();
              $('.reply_box').hide();
              $('#reply_'+i).hide();
              $('#reply_box_'+i).show();
          }
      function progress() {
    
      var windowScrollTop = $(window).scrollTop();
      var docHeight = $(document).height();
      var windowHeight = $(window).height();
      var progress = (windowScrollTop / (docHeight - windowHeight)) * 100;
      var $bgColor = progress > 99 ? '#c5f3fb ' : '#c5f3fb ';
      var $textColor = progress > 99 ? '#fff' : '#333';
    
      $('.progress .bar').width(progress + '%').css({ backgroundColor: $bgColor });
      //$('h1').text(Math.round(progress) + '%').css({ color: $textColor });
      $('.fill').height(progress + '%').css({ backgroundColor: $bgColor });
    }
    
    progress();
    
    $(document).on('scroll', progress);
      </script>
       
        </body>   
    <style type="text/css">
         .alert a {
              margin-left: 0px !important;
            }
            .alert-container {
             background-color: #27A291;
             color: #fff;
             border: 1px solid #27A291; 
              bottom: 0px ;
             display: none;
            }
            .alert-container-error {
                background-color: #27A291;
                color: #fff;
              background-color: #27A291;
                bottom: 0px;
             }
             .alert-container-success{
                background-color: #27A291;
                color: #fff;
                border: 1px solid #27A291;
                bottom: 0px ;
             }
             .alert>p{
        margin-bottom: 0;
        color:#fff;
    }
    </style>
      <div class="footer">
         <div class="alert-container">
            <div class="alert">
                <p id='msg'></p>
                 
            </div>
        </div>
            <ul id="footer-items">
                <li><a href="#">Download the App</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Get a Creator Account</a></li>
                <li><a href="http://pagevio.com/TermsandConditions">Terms</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="http://pagevio.com/help">Help</a></li>
                <li style="color:#909090">© 2019 PageVio</li>
            </ul>
        </div>
    <script src="http://pagevio.com/assets/web/js/selectbox.min.js"></script>
    <script>
        $(document).on("mouseup", function (event) {
            var p = $('.profile-dropdown');
    
            var offset = p.offset();
            var a = offset.left, b = offset.top, c = $(p).width(), d = $(p).height(), x = event.pageX, y = event.pageY;
            if (((x > a) && (x < (a + c))) && ((y > b) && (y < (d + b)))) {
                $('.profile_dropmenu').toggle();
                //$('#profile2').prop("checked", true);
            }
            else {
                $('.profile_dropmenu').hide();
                $('#profile2').prop("checked", false);
            }
        });
        /* $('input').tagsinput({
          maxTags: 5
        });*/
    </script>
    
    
    
    
    
    </body>
    </html>`
  export default class MyWeb extends Component {
  render() {
    return (
      <WebView
        // source={{html:`<p contenteditable="true" placeholder="Title...">New sample page for event</p><div contenteditable="false" id="Event_1" class="QuickEvent page_padding" style="position: relative;"><img src="../../images/cancel.png" onclick="clearevepromo(1)" id="cancel_1" style="left: 95%; top: 20px;" class="fr-draggable"><section id="eventtoolbar_1" contenteditable="false" class="eventToolbar1" style="display: block;"><i onclick="ToolbarSty('B',currentevenprom)" class="fa fa-bold" aria-hidden="true"></i><i onclick="ToolbarSty('I',currentevenprom)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-align-left" onclick="ToolbarSty('left',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="ToolbarSty('center',currentevenprom)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="ToolbarSty('right',currentevenprom)" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><input type="text" id="titl_1" placeholder="Title" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" onkeydown="Edit2BackspaceInp(this,event)" onclick="showtool(1)" value="New Event"><br><div class="upload-btn-wrapper"><i class="fa fa-image round_media_btn" aria-hidden="true"></i><input type="file" name="myfile" onchange="getImage(this)" value=""></div><div style="position: relative;"><section id="desctoolbar_1" contenteditable="false" class="eventToolbar2" style="display: block;"><i onclick="DescbarSty('B',currentdescid)" class="fa fa-bold" aria-hidden="true"></i><i onclick="DescbarSty('I',currentdescid)" class="fa fa-italic" aria-hidden="true"></i><i onclick="DescbarSty('U',currentdescid)" class="fa fa-underline" aria-hidden="true"></i><i onclick="DescbarSty('S',currentdescid)" class="fa fa-strikethrough" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-link" aria-hidden="true"></i><i class="fa fa-align-left" onclick="DescbarSty('left',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-center" onclick="DescbarSty('center',currentdescid)" aria-hidden="true"></i><i class="fa fa-align-right" onclick="DescbarSty('right',currentdescid)" aria-hidden="true"></i><i onclick="DescbarSty('IN',currentdescid)" class="fa fa-indent" aria-hidden="true"></i><i onclick="DescbarSty('OU',currentdescid)" class="fa fa-outdent" aria-hidden="true"></i><i onclick="DescbarSty('CO',currentdescid)" class="fa fa-columns" aria-hidden="true"></i><i onclick="DescbarSty('OL',currentdescid)" class="fa fa-list-ol" aria-hidden="true"></i><i onclick="DescbarSty('UL',currentdescid)" class="fa fa-list-ul" aria-hidden="true"></i><i onclick="DescbarSty('LI',currentdescid)" class="fa fa-list" aria-hidden="true"></i><i class="fa fa-superscript" aria-hidden="true"></i><i class="fa fa-subscript" aria-hidden="true"></i></section><textarea id="desc_1" placeholder="Description" style="resize:none;" class="col-md-6 col-xs-6 col-lg-6 col-sm-6 form-control event_form" onclick="Desctool(1)" value="Testing for event">Testing for event</textarea></div><span id="add-date"><span class="event_label" style="margin-right: 70px;">Date:</span><input class="event_form" type="date" style="width:140px;" value="2020-01-15">&nbsp;&nbsp;&nbsp;<input class="event_form" type="type" value="11:30am" onkeydown="Edit2BackspaceInp(this,event)" style="width:85px;"></span><div style="position: relative;"><section id="maptoolbar_1" contenteditable="false" class="eventToolbar3" style="display: block;"><i onclick="MapbarSty('B',this)" class="fa fa-bold" aria-hidden="true"></i><i onclick="MapbarSty('I',this)" class="fa fa-italic" aria-hidden="true"></i><i class="fa fa-map" onclick="MapbarSty('map',this)" aria-hidden="true"></i><span style="display:none"><label>Enter Location</label> <input onkeydown="Edit2BackspaceInp(this,event)" id="Event_location_1" type="text" class="map_input pac-target-input" placeholder="Enter a location" autocomplete="off" value=""></span></section><span class="event_label" style="margin-right: 45px;">Location:</span><input class="event_form" type="text" id="locate_1" placeholder="Location Name" onkeydown="Edit2BackspaceInp(this,event)" onclick="Maptool(1)" style="width:78%;" value=""></div><input class="btn save_event" id="EventBtn_1" onclick="evet()" type="button" value="Save The Date"><br><br><br></div><p>Reminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotionReminder issues for event and promotion<br></p>`}}
       source={{html:testingpage}}
      // source={{uri:'http://pagevio.com'}}
        style={{ marginTop: 20 }}
        // startInLoadingState
        // domStorageEnabled
        // geolocationEnabled
        // allowUniversalAccessFromFileURLs
        // injectedJavaScript={INJECTEDJAVASCRIPT}
        // allowFileAccess
      />
    //   <HTMLView
    //   value={audiopage}
    // />
    );
  }
}