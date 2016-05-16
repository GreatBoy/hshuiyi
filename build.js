var fs = require('fs');
    var nativeCSS = require('native-css');
    var cssObject = nativeCSS.convert('./styles.css');

    toStyleJs(cssObject, './styles.js');
    buildWebReact();

    /**
     * native-css获取到得是一个对象，需要将cssObject转化为js代码
     */
    function toStyleJs(cssObject, name) {
        console.log('build styles.js \n');
        var tab = '    ';
        var str = '';

        str += '/* build header */\n';
        str += 'var styles = {\n';

        for(var key in cssObject) {
            var rules = cssObject[key];
            str += tab + key + ': {\n';
            for(var attr in rules) {
                var rule = rules[attr];
                str += tab + tab + attr + ': ' + format(rule) + ',\n'
            }
            str += tab + '},\n' 
        }

        str += '};\n'
        str += 'module.exports = styles;\n'

        fs.writeFile(name, str)
        function format(rule) {
            if (!isNaN(rule - 0)) {
                return rule;
            }
            return '"' + rule + '"';
        }
    }

    /**
     * 构造web使用的react
     */
    function buildWebReact() {
        console.log('build web bundle');
        var browserify = require('browserify');
        var b = browserify();
        b.add('./index.web.js');

        // 添加es6支持
        b.transform('reactify', {'es6': true});

        // ignore掉react-native 
        b.ignore('react-native')
        var wstream = fs.createWriteStream('./web/index.web.js');
        b.bundle().pipe(wstream);
    }
