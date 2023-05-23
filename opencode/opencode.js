(function($){
  // import order js. css.
  // public 
  document.write('<script src="opencode/js/settings.js"></script>');
  document.write('<script src="opencode/js/utils.js"></script>');
  // type001
  document.write('<link rel=stylesheet type="text/css" href="opencode/css/style.css">');
  document.write('<script src="opencode/js/BaseClass.js"></script>');
  // type002
  // document.write('<link rel=stylesheet type="text/css" href="opencode/css/style02.css">');
  // document.write('<script src="opencode/js/Type02Class.js"></script>');

  $.fn.opencode = function(settings){
    // importJS("somePath/jquery-1.2.6.js", "jQuery", () => {
    //   console.log('success')
    // });
    const root = $(this)
    const _api = 'http://104.199.176.35/api/IssueOpenInfo/2032/2023138';
    // --defaultSettings
    var defaultSettings = {
      colors: colors,
      wuXing: wuXing,
      api: _api,
      ts: 5000,
      type: 'type001',
      apiGetInfoFunc: function (apiUrl) {
        return getInfo(apiUrl)
      }
    };

    // --self settings
    var _settings = $.extend(defaultSettings, settings);
    _settings.info = _settings.apiGetInfoFunc(_settings.api);
    let type = _settings.type;
    console.log('set type', type)
    switch(type){
      case TYPE.type01:
        _settings.mainClass = 'jq-opencode-type001';
        new BaseClass(root, _settings).init();
        break;
      case TYPE.type02:
        _settings.mainClass = 'jq-opencode-type002';
        importCSS("opencode/css/style02.css", "style02", () => {
          importJS("opencode/js/Type02Class.js", "Type02Class", () => { 
            new Type02Class(root, _settings).init();
          });
        });

        break;
      default:
        _settings.mainClass = 'jq-opencode-type001';
        new BaseClass(root, _settings).init();
        break;
    }

  }
})(jQuery);