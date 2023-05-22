(function($){
  //import order js. css.
  document.write('<link rel=stylesheet type="text/css" href="opencode/css/style.css">');
  document.write('<script src="opencode/js/settings.js"></script>');
  document.write('<script src="opencode/js/utils.js"></script>');
  document.write('<script src="opencode/js/BaseClass.js"></script>');

  $.fn.opencode = function(settings){
    const root = $(this)
    const _api = 'http://104.199.176.35/api/IssueOpenInfo/2032/2023138';
    // --defaultSettings
    var defaultSettings = {
      // _info: {
      //   lotteryId: null,
      //   issue: null, 
      //   openCode: null,
      //   pet: null 
      // },
      api: _api,
      apiGetInfoFunc: function (apiUrl) {
        console.log('apiGetInfoFunc url >>>', apiUrl)
        return getInfo(apiUrl)
      }
    };

    // --self settings
    var _settings = $.extend(defaultSettings, settings);
    console.log('-opencode defaultSettings = ', defaultSettings.apiGetInfoFunc )
    console.log('-opencode settings = ', settings, _settings.api)

    _settings.colors = colors
    _settings.info = defaultSettings.apiGetInfoFunc(_settings.api)
    // _settings.getInfo = colors
    // var _width = _settings.width 
    // var _height = _settings.height
    // var _info = getInfo(_settings.api)
    // var _info = _settings.getInfo

    // console.log('-opencode settings = ', $(this).html())
    // console.log('-opencode _info = ', _info)
    var opencode = new BaseClass(root, _settings)
  }
})(jQuery);