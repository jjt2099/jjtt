$(function () {

    //初始化右侧滚动条
    //这个方法定义在scroll.js中
    resetui();
    //为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {

        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        } else {
            $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
            $('#ipt').val('');
            resetui();
            getMsg(text);
        }
    })
    //发起请求获取聊天信息
    function getMsg(text) {

        $.ajax({
            type: 'GET',
            url: 'http://ajax.frontend.itheima.net:3006/api/robot',
            data: {
                text: text
            },
            success: function (res) {

                if (res.message === 'success') {
                    // 接收聊天消息
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    // 重置滚动条的位置
                    resetui()
                    // 调用 getVoice 函数，把文本转化为语音
                    getVoice(msg)
                }
            }
        })

    }
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://ajax.frontend.itheima.net:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // 如果请求成功，则 res.voiceUrl 是服务器返回的音频 URL 地址
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    $('#ipt').on('keyup',function(e){
        console.log(e.key)
          if(e.key==='Enter'){
            $('#btnSend').click();
          }
    })




})