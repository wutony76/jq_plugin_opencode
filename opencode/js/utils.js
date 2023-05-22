
function test () {
  console.log('>>>>> util/test 123.')
}

/**
 * default api
 * handle use api 
 */
function getInfo(api) {
  $.ajaxSettings.async=false;
  var output = {};
  $.get(api, (res) => {
    // console.log('getInfo = ', res)
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

/**
 * handle use html 
 */
 function _addSpanHtml (val, className) {
  let headStr; 
  if (className) headStr = '<span class="'.concat(className, '">') 
  else headStr= "<span>"
  let endStr = '</span>'
  return headStr.concat(val, endStr)
}
function _addDivHtml (val, className) {
  let headStr = '<div class="'.concat(className, '">') 
  let endStr = '</div>'
  return headStr.concat(val, endStr)
}


