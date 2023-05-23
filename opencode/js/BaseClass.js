class BaseClass {
  constructor(root ,_settings) {
    this.root = root;
    this.settings = _settings; 
    this.defSettings = {
      // width: '450px',
      width: '100%',
      height: '130px',
    }
    this.cacheNode = {};
    // this.mainClass = 'jq-opencode-type001'; 

    // this.init(_settings);
    // this.loop(_settings.ts?_settings.ts:5000);
  }

  init () {
    const _settings = this.settings;
    // console.log('BaseClass init.', this.cacheNode)
    // console.log('BaseClass init.', _settings.width, _settings.height)
    var _width = _settings.width ?_settings.width :this.defSettings.width; 
    var _height = _settings.height?_settings.height :this.defSettings.height;
    var _info = _settings.info;

    const root = this.root 
    this._addIssue(root, _info)
    this._addBallGroup(root, _info)

    // handle base css
    root.addClass(_settings.mainClass);
    root.css({
      width: _width,
      height: _height,
    });

    this.cacheNode['root'] = root; 
    this.cacheNode['issue'] = root.children('.issue-group').children('span');
    this.cacheNode['opencode'] = root.children('.balls-group').children();

    this.loop();
  }

  loop () {
    const _settings = this.settings;
    const delayTime = _settings.ts?_settings.ts:5000;
    // const cacheNd = this.cacheNode;
    const self = this;
    const root = this.root;

    function updateData () {
      _settings.info = _settings.apiGetInfoFunc(_settings.api)
      // console.log('--updateData', _settings.api, _settings.info)

      // --update info
      // cacheNd['issue'].html(_settings.info.issue);
      // Array.prototype.forEach.call(cacheNd['opencode'], (childNd) => {
      //   console.log('childNd >', childNd)
      //   const numNd = childNd.children[0]; 
      //   const petNd = childNd.children[1]; 

      //   console.log('numNd >', numNd)
      //   console.log('petNd >', petNd)
      // })

      // --re drawing...
      self._clear(root);
      self._addIssue(root, _settings.info)
      self._addBallGroup(root,  _settings.info)
      // setTimeout(updateData, delayTime);
    }
    setTimeout(updateData, delayTime);
  }

  _clear (root) {
    root.html('');
  }
  _addIssue (root, data) {
    const issueStr = data? data.issue: 'null';
    const dateArr = data? data.date: ['-', '-', '-'];
    let issue = '第'.concat(_addSpanHtml(issueStr, ''), '期 最新开奖结果')
    let date = dateArr[0]+'年'+dateArr[1]+'月'+dateArr[2]+'日' 
    let contentStr = _addDivHtml(issue, 'issue-group') + _addDivHtml(date, 'date-group') 
    root.append(_addDivHtml(contentStr, 'header-group'))
  } 
  _findColor (val) {
    const _settings = this.settings 
    if (val === '+') return [null, 'ball-add'];
    let num2color = null;
    let getColor = null;
    Object.keys(_settings.colors).some((color) => {
      let color2NumArr = _settings.colors[color] 
      if (color2NumArr.includes(val)) {
        getColor = color;
        // num2color = 'ball-num-' + color;
        num2color = '';
        return true 
      }
    })
    // console.log('color', num2color)
    if (getColor) {
      switch (getColor) {
        case 'red':
          getColor = base64Img.red; 
          break;
        case 'blue':
          getColor = base64Img.blue; 
          break;
        case 'green':
          getColor = base64Img.green; 
          break;
      }
    }
    return [getColor, num2color]; 
  }

  _findWuXing (val) {
    return getWuhang (year, val);
    // const _settings = this.settings 
    // let getAttr = null;
    // Object.keys(_settings.wuXing).some((attr) => {
    //   let attrNumArr = _settings.wuXing[attr] 
    //   if (attrNumArr.includes(val)) {
    //     getAttr = attr;
    //     return true 
    //   } 
    // })
    // return en2chDict[getAttr] 
  }

  // 生肖每年會變(每一期數的生肖可能會不同)
  _findNum2Pet (val, animalOfIssue) {
    // console.log('_findNum2Pet', val, animalOfIssue)
    let numberOfAnimal = createNumberOfAnimal(animalOfIssue);
    // console.log('_findNum2Pet numberOfAnimal >', numberOfAnimal )
    for (let animal in numberOfAnimal) {
      if (numberOfAnimal[animal].includes(val)) {
        return animal;
      }
    }
  }

  _addBallGroup (root, data) {
    let arr = data.openCode ? data.openCode.split(','): ['-', '-', '-', '-', '-', '-', '-' ]
    const hasPet = data.pet ? data.pet : null
    // handle arr
    const arr1 = arr.slice(0, arr.length-1)
    arr1.push('+')
    const arr2 = arr.slice(arr.length-1)
    arr = arr1.concat(arr2) 

    let balls = ''
    arr.forEach((val, index) => {
      if (val === '+') balls += this._handleBallHtml('+')
      else {
        const petInfoStr = this._findNum2Pet(val, hasPet) +'/'+ this._findWuXing(val)
        balls += this._handleBallHtml(val, petInfoStr)
      } 
    })
    root.append( _addDivHtml(_addDivHtml(balls, 'balls-group'), 'main-group'))
    // root.html(_addDivHtml(balls, 'balls-group'))
  }
  _handleBallHtml (val, val2) {
    const fCOlor = this._findColor(val) 
    let ballnumClass = fCOlor[0]? 'ball-num'.concat(' ', fCOlor[1]): 'ball-num'
    
    const tagImg = '<img src="'.concat( fCOlor[0], '"/>');
    const num = val == '+'?_addDivHtml(val, 'add') :_addDivHtml(val, 'num');
    const imgBallNum = fCOlor[0]? tagImg + num : num; 
 
    let ballNum = _addDivHtml(imgBallNum, ballnumClass) 
    let ballPet = val2 ? _addDivHtml(val2, 'ball-pet'): ''
    let ballGroup = _addDivHtml('', 'ball-space-125') + ballNum + ballPet + _addDivHtml('', 'ball-space-125')
    return _addDivHtml( ballGroup, 'ball')
  }


}