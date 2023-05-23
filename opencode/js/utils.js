function test () {
  console.log('>>>>> util/test 123.')
}

function importCSS(src, look_for, onload) {
  var s = document.createElement('link');
  s.setAttribute('rel', 'stylesheet');
  s.setAttribute('type', 'text/css');
  s.setAttribute('href', src);
  if (onload) wait_for_script_load(look_for, onload);
  if (eval("typeof " + look_for) == 'undefined') {
    var head = document.getElementsByTagName('head')[0];
    if (head) head.appendChild(s);
    else document.body.appendChild(s);
  }
}

function importJS(src, look_for, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (onload) wait_for_script_load(look_for, onload);
  if (eval("typeof " + look_for) == 'undefined') {
    var head = document.getElementsByTagName('head')[0];
    if (head) head.appendChild(s);
    else document.body.appendChild(s);
  }
}

function wait_for_script_load(look_for, callback) {
  var interval = setInterval(function() {
  if (eval("typeof " + look_for) != 'undefined') {
    clearInterval(interval);
    callback();      
  }
  }, 50);
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
      const defDate = ['-', '-', '-']
      output = {
        lotteryId: res.data.lotteryId,
        issue: res.data.issue,
        openCode: res.data.openCode,
        pet: res.data.pet,
        date: res.data.date? res.data.date :defDate 
      } 
    }
    // console.log('output = ', output)
  })
  return output
}

/**
 * handle use html 
 */
function _addLinkHtml (data, className) {
  const text = data[0];
  const link = data[1];
  const tagHead = '<a class="'+ className + '" href="'.concat(link, '"target="_blank">');
  const tagEnd = '</a>';
  return tagHead.concat(text, tagEnd)
}
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


/**
 * handle logic  
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function prefixNum (num, length) {
  return (Array(length).join('0') + num).slice(-length)
}

const animalNumsCache = new Map();
function createNumberOfAnimal(animal) {
	if (animalNumsCache.has(animal)) return animalNumsCache.get(animal);
	let all = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
	let curr = animal;
	if (!curr) return {};
	let pos = all.indexOf(curr);
	let tmp = [].concat(all.slice(0, pos + 1).reverse()).concat(all.slice(pos + 1).reverse());
	let ret = {};
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 12; j++) {
			if (Array.isArray(ret[tmp[j]])) {
				let s = i * 12 + parseInt(ret[tmp[j]][0]);
				ret[tmp[j]].push(String(s));
			} else {
				ret[tmp[j]] = [];
				let t = j + 1;
				t = t < 10 ? '0' + t : String(t);
				ret[tmp[j]].push(t);
			}
		}
	}
	ret[curr].push('49');
	if (!animalNumsCache.has(animal)) animalNumsCache.set(animal, ret);
	return ret;
}

// --wuhang
function getWuhang (year, num) {
  // if (this.isLotteryNum(num)) {
  var list = new Array();
  for (var i = 1; i <= 49; i++) {
    var index = year - 1922 - i - 1;
    list[i] = nayin[index % 60];
  }
  return list[Number(num)];
  // }
  // return "";
}
