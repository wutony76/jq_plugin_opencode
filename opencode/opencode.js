(function($){
  //import order js. css.
  document.write('<link rel=stylesheet type="text/css" href="opencode/css/style.css">');
  document.write('<script src="opencode/js/settings.js"></script>');


  $.fn.opencode = function(settings){
    var defaultSettings = {
      bind : 'mouseover',
      callback : function(){ 
        $(this).animate({
          opacity: 0.25,
           left: '+=50',
           height: 'toggle'
        }, 3000,function(){
          $("span").html('').append($(this).html() + '完成!').show().fadeOut(1000);
        });
      }
    };  

    var _settings = $.extend(defaultSettings, settings);
    console.log('-opencode settings = ', settings )
    // settings
    // var _settings = settings
    var _width = _settings.width 
    var _height = _settings.height
    var _info = getInfo(_settings.api)
    const root = $(this)

    // console.log('-opencode settings = ', $(this).html())
    console.log('-opencode _info = ', _info)
    addIssue(root, _info.issue)
    addBallGroup(root, _info)

    //
    $(this).css({
      border: "1px solid #000",
      width: _width,
      height: _height,
      "border-radius": "10px"
    });
    // $(this).css("width", _width);

  } 

  function addIssue (root, data) {
    let issue = '第'.concat(_addSpanHtml(data, 'red'), '期')
    root.append(_addDivHtml(issue, 'issue-group'))
  } 

  function addBallGroup (root, data) {
    const arr = data.openCode ? data.openCode.split(','): ['-', '-', '-', '-', '-','-', '-' ]
    const hasPet = data.pet ? data.pet : null
    let balls = ''
    arr.forEach((val) => {
      balls += handleBallHtml(val, hasPet)
    })
    root.append(_addDivHtml(balls, 'balls-group'))
  }

  function getInfo(api) {
    $.ajaxSettings.async=false;
    var output = {};
    $.get(api, (res) => {
      console.log('getInfo = ', res)
      if (res.code == 0) {
        output = {
          lotteryId: res.data.lotteryId,
          issue: res.data.issue,
          openCode: res.data.openCode,
          pet: res.data.pet
        } 
      }
      console.log('output = ', output)
    })
    return output
  }

  // start handle htmlStr
  function handleBallHtml (val, val2) {
    let ballNum = _addDivHtml(val, 'ball-num')
    let ballPet = val2 ? _addDivHtml(val2, 'ball-pet'): ''
    let ballGroup = ballNum + ballPet 
    return _addDivHtml( ballGroup, 'ball')
  }

  function _addSpanHtml (val, className) {
    let headStr; 
    if (className) headStr = "<span class=".concat(className, '>') 
    else headStr= "<span>"
    let endStr = '</span>'
    return headStr.concat(val, endStr)
  }
  function _addDivHtml (val, className) {
    let headStr = "<div class=".concat(className, '>') 
    let endStr = '</div>'
    return headStr.concat(val, endStr)
  }
})(jQuery);