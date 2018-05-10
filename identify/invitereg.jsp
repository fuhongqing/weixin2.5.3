<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="css/init.css">
    <link rel="stylesheet" href="css/invite.css">
</head>
<body>
<div id="inviteRegPage">
    <header><img src="img/invite.png" alt=""></header>
    <section>
        <div class="inviteText">
            <p id="inviteName"></p>
            <p>更多新房；更多资讯；更加专业的经纪人平台</p>
        </div>
        <ul>
            <li class="regLi"><span class="label">手机号：</span><input id="regPhoneInput" type="text"><span id="regCodeSpan">获取验证码</span></li>
            <li><span class="label">验证码：</span><input id="regCodeInput" type="text"></li>
        </ul>
    </section>
    <footer>
        <div id="inviteRegBtn">提交</div>
    </footer>
</div>
<!--提示框-->
<div class="modal">
    <div class="toast"></div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/setting.js"></script>
<script type="text/javascript" src="js/inviteReg.js?v=201805081652"></script>
</body>
</html>