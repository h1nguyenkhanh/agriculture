import { ToolOutlined } from "@ant-design/icons";
import marked from "marked";
import TurndownService from "turndown"

let Tools = {};

Tools.deleteVnMark = (str, space = true)=>{
    str = str.trim();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/  +/g, ' ');
    if(space) str = str.replace(/\s/g, '-');
    str = str.toLowerCase();
    return str;
}

Tools.checkInput = (str)=>{
  const regexStr = /^[a-zA-Z0-9 ]+$/g
  str = str.trim();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/  +/g, ' ');
  return regexStr.test(str)
}

Tools.markIdForHtml = (htmlContent)=>{
    var turndownService = new TurndownService({
        blankReplacement (content, node) {
          const types = ['SCRIPT', 'IFRAME', 'DIV', 'P']
          if (types.indexOf(node.nodeName) !== -1) {
            return `\n\n${node.outerHTML}\n\n`
          } else {
            const output = []
            node.childNodes.forEach((child) => {
              if (types.indexOf(child.nodeName) !== -1) {
                output.push(child.outerHTML)
              }
            })
            if (output.length) {
              return '\n\n' + output.join('\n\n') + '\n\n'
            } else {
              return node.isBlock ? '\n\n' : ''
            }
          }
        }
      })
    turndownService.keep(['span', 'div'])
    turndownService.addRule('keepStyle', {
        filter: (node) => {
            let attributes = ['class', 'style', 'is'],
                attrTest = attributes.some(attr => node.hasAttribute(attr)),
                dataTest = Object.keys(node.dataset).length > 0;
          
            return attrTest || dataTest;
          },
          replacement: (innerHTML, node) => node.outerHTML
      })

    var markdown = turndownService.turndown(htmlContent)

    marked.setOptions({
        headerIds: true
      });
    return marked(markdown)
}

Tools.cloneObject = (obj) => {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

Tools.getNewIdCode = (arr, str) => {
  if(arr.length===0) {
    return str+"0001"
  }
  function getNumber(str) {
    return str.match(/\d+/g).map(Number)[0];
  }
  let maxValue = arr.reduce((a,b)=>{
    console.log(a,b);
    if(getNumber(a.id)>getNumber(b.id)) return a;
    return b;
  })
  let result = getNumber(maxValue.id);
  result = ("000" + ++result).slice(-4)

  console.log(result);
  return str+result
}

export default Tools;