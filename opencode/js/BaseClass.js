class BaseClass {
  constructor(root ,_settings) {
    console.log('BaseClass');
    test()
    this.root = root;
    this.settings = _settings; 
    this.cacheNode = {};
    this.init(_settings);
  }

  init (_settings) {
    console.log('BaseClass init.', this.cacheNode)
    var _width = _settings.width; 
    var _height = _settings.height;
    // var _info = getInfo(_settings.api)
    var _info = _settings.info;

    // const root = $(this)
    const root = this.root 
    console.log(root)
    addIssue(root, _info? _info.issue: 'null')
    addBallGroup(root, _info)

    //
    root.css({
      border: "1px solid #000",
      width: _width,
      height: _height,
      "border-radius": "10px"
    });

    // function
    function addIssue (root, data) {
      let issue = '第'.concat(_addSpanHtml(data, 'red'), '期 最新开奖结果')
      root.append(_addDivHtml(issue, 'issue-group'))
    } 

    function addBallGroup (root, data) {
      const arr = data.openCode ? data.openCode.split(','): ['-', '-', '-', '-', '-', '-', '-' ]
      const hasPet = data.pet ? data.pet : null
      let balls = ''
      arr.forEach((val, index) => {
        // console.log('--index', index)
        if (index == arr.length-1-1) balls += handleBallHtml('+')
        else balls += handleBallHtml(val, hasPet)
      })
      root.append(_addDivHtml(balls, 'balls-group'))
    }

    function findColor (val) {
      // console.log('findColor', _settings.colors, val)
      if (val === '+') return 'ball-add';

      let num2color = null;
      Object.keys(_settings.colors).some((color) => {
        let color2NumArr = _settings.colors[color] 
        if (color2NumArr.includes(val)) {
          num2color = 'ball-num-' + color;
          return true 
        }
      })
      // console.log('color', num2color)
      return num2color; 
    }

    // start handle htmlStr
    function handleBallHtml (val, val2) {
      let ballnumClass = findColor(val)? 'ball-num'.concat(' ', findColor(val)): 'ball-num'
      // console.log('ballnumClass >>', ballnumClass)
      let ballNum = _addDivHtml(val, ballnumClass) 
      let ballPet = val2 ? _addDivHtml(val2, 'ball-pet'): ''
      let ballGroup = ballNum + ballPet 
      return _addDivHtml( ballGroup, 'ball')
    }
  }
}