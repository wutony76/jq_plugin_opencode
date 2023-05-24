document.write('<link rel=stylesheet type="text/css" href="opencode/css/style.css">');
let importClassArr = [];
function importJS(src, look_for, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (onload) wait_for_script_load(look_for, onload);
  if (eval("typeof " + look_for) == 'undefined') {
    var head = document.getElementsByTagName('head')[0];
    if (!importClassArr.includes(src)) {
      if (head) head.appendChild(s);
      else document.body.appendChild(s);
      importClassArr.push(look_for);
    }
  }
}
function importJS2(src, look_for, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (onload) wait_for_script_load2(look_for, onload);
  if (eval("typeof " + look_for) == 'undefined') {
    var head = document.getElementsByTagName('head')[0];
    if (!importClassArr.includes(src)) {
      if (head) head.appendChild(s);
      else document.body.appendChild(s);
      importClassArr.push(look_for);
    }
  }
}
function wait_for_script_load(look_for, callback) {
  var interval = setInterval(function() {
  // console.log(look_for, eval("typeof " + look_for))
  // if (eval("typeof " + look_for) != 'undefined') {
  //   clearInterval(interval);
  //   callback();      
  // }
  if (importClassArr.includes(look_for)) {
    clearInterval(interval);
    callback();      
  }
  }, 50);
}
function wait_for_script_load2(look_for, callback) {
  var interval = setInterval(function() {
  console.log(look_for, eval("typeof " + look_for))
  if (eval("typeof " + look_for) != 'undefined') {
    clearInterval(interval);
    callback();      
  }
  }, 50);
}

console.log(importClassArr)
document.addEventListener("DOMContentLoaded", () => {
  importJS2("https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js", "jQuery", () => {
    console.log('success jquery');
    importJS("opencode/js/settings.js", "settings", () => {});
    importJS("opencode/js/utils.js", "utils", () => {});
    importJS("opencode/js/BaseClass.js", "BaseClass", () => {});
    importJS("opencode/opencode.js", "opencode", () => {
      console.log('success opendcode');
      $(function () { 
        /**
         * use opencode example. 
         * 
         * width -寬度
         * height -高度
         * 
         * colors -顏色設定表 
         * wuXing -五行設定表 
         * api -API設定 
         * ts -API更新頻率 (微秒 1000 = 1秒，預設 5秒)
         * apiGetInfoFunc -自定義解析api資料
        */
        $("#open-code-test").opencode({
          // colors: colors,
          // wuXing: wuXing,
          width: '450px',
          height: '115px',
          type: 'type001',
          // ts: 5000,
          // api: 'http://104.199.176.35/api/IssueOpenInfo/2032/2023138'
          api: 'http://www.google.com',
          apiGetInfoFunc: function () {
            // const api = 'http://104.199.176.35/api/IssueOpenInfo/2032/2023138';
            // return getInfo(api)

            // test output Random data.
            let arr = []
            for (let i = 0; arr.length<= 6; i++) {
              const n = getRandomInt(1, 49) 
              arr.push(prefixNum(n, 2))
            }
            return {
              lotteryId: 2032,
              issue: getRandomInt(1000000, 9999999).toString(),
              openCode: arr.join(','),
              pet: '兔',
              date: ['2023', '05', '18']
            }
          }
        });
        $("#open-code-test2").opencode({});

        $("#open-code-test3").opencode({
          width: '450px',
          // height: '115px',
          link: [
            ['開講直播','https:www.google.com'],
            ['開獎歷史', 'https:www.google.com'],
            ['b1', 'https:www.google.com'],
            ['b2', 'https:www.google.com'],
            ['b3', 'https:www.google.com'],
          ],
          type: 'type002',
          apiGetInfoFunc: function () {
            let arr = []
            for (let i = 0; arr.length <= 6; i++) {
              const n = getRandomInt(1, 49)
              arr.push(prefixNum(n, 2))
            }
            return {
              lotteryId: 2032,
              issue: getRandomInt(1000000, 9999999).toString(),
              openCode: arr.join(','),
              pet: '兔',
              date: ['2023', '05', '18']
            }
          }
        });
        $("#open-code-test4").opencode({ 
          type: 'type002',
          link: [
            ['開講直播', 'https:www.google.com'],
            ['開獎歷史', 'https:www.google.com'],
            ['b1', 'https:www.google.com'],
            ['b2', 'https:www.google.com'],
            ['b3', 'https:www.google.com'],
          ],
        });


        $("#open-code-test5").opencode({
          width: '450px',
          type: 'type003',
          apiGetInfoFunc: function () {
            let arr = []
            const _statTime = getDateNow(); 
            const _endTime = '2023-05-30 12:12:12'; 
            const _time = new Date(_endTime).getTime() - new Date(_statTime).getTime(); 
            for (let i = 0; arr.length <= 6; i++) {
              const n = getRandomInt(1, 49)
              arr.push(prefixNum(n, 2))
            }

            return {
              lotteryId: 2032,
              issue: getRandomInt(1000000, 9999999).toString(),
              openCode: arr.join(','),
              pet: '兔',
              date: ['2023', '05', '18'],
              statTime: _statTime,
              endTime: _endTime,
              countDownData: countDown(_statTime, _endTime) 
            }
          }
        });
        $("#open-code-test6").opencode({
          type: 'type003',
        });
      })

    });
  });
});


    