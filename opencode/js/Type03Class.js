class Type03Class extends BaseClass {
  constructor(root ,_settings) {
    super(root, _settings);
    // this.root = root;
    // this.settings = _settings; 
    this.defSettings = {
      width: '100%',
      height: '100px',
    }
  }

  _addIssue (root, data) {
    const _settings = this.settings;
    const issueStr = data? data.issue: 'null';
    const linkArr = _settings.link? _settings.link: [];
    const countDownData= data.statTime? countDown(data.statTime, data.endTime): {day: '-', hour: '-', min: '-', sec: '-'};
    const dateArr = Object.values(countDownData);
    // console.log('>>>>> dateArr', data, dateArr)
    let issue = '第'.concat(_addSpanHtml(issueStr, 'green'), '期 最新开奖结果')
    let date = '下期倒数开奖  '+ dateArr[0] + 'd ' + dateArr[1] + ':' + dateArr[2] + ':' + dateArr[3]; 

    let contentStr = _addDivHtml(issue, 'issue-group') + this._handleMenuHtml(linkArr)+ _addDivHtml(date, 'date-group'); 
    root.append(_addDivHtml(contentStr, 'header-group'))
  } 

  _handleMenuHtml (linkArr) {
    // console.log(' _handleMenuHtml>', linkArr)
    let contenthtml = '';
    linkArr.forEach((item) => {
      contenthtml += _addDivHtml(_addLinkHtml(item, 'link'), 'button');
    })
    return _addDivHtml(contenthtml, 'menu-group');
  }

   _handleBallHtml (val, val2) {
    const fCOlor = this._findColor(val) 
    let ballnumClass = fCOlor[0]? 'ball-num'.concat(' ', fCOlor[1]): 'ball-num'

    const tagImg = '<img src="'.concat( fCOlor[0], '"/>');
    const num = val == '+'?_addDivHtml(val, 'add') :_addDivHtml(val, 'num');
    const imgBallNum = fCOlor[0]? tagImg + num : num; 
 
    // let ballNum = fCOlor[0]? _addDivHtml(imgBallNum, ballnumClass) : _addDivHtml(imgBallNum, ballnumClass.concat(' ', 'ball-add')) 
    let ballNum = fCOlor[0]? _addDivHtml(num, ballnumClass) : _addDivHtml(num, ballnumClass.concat(' ', 'ball-add')) 
    let ballPet = val2 ? _addDivHtml(val2, 'ball-pet'): ''
    let ballGroup = _addDivHtml('', 'ball-space-125') + ballNum + ballPet + _addDivHtml('', 'ball-space-125')

    let ballClassName = fCOlor.length === 3? 'ball'.concat(' ', fCOlor[2]): 'ball'; 
    return _addDivHtml( ballGroup, ballClassName);
  }
}