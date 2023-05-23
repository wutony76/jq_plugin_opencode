class Type02Class extends BaseClass {
  constructor(root ,_settings) {
    // console.log('Type02Class');
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
    // const dateArr = data? data.date: ['-', '-', '-'];
    let issue = '第'.concat(_addSpanHtml(issueStr, 'green'), '期 最新开奖结果')
    // let date = dateArr[0]+'年'+dateArr[1]+'月'+dateArr[2]+'日' 

    let contentStr = _addDivHtml(issue, 'issue-group') + this._handleMenuHtml(linkArr); 
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
}