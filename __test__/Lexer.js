const {Lexer} = require('../lib/Lexer');
const StringifyLexer = str => JSON.stringify(Lexer(str));
const {expect} = require('chai');

describe('Lexer', function(){
    it('case - 0', function(){
        expect(StringifyLexer('<div>') === '[{"type":"TAGNAME","content":"div"}]').to.be.equal(true);
    });


    it('case - 1', function(){
        expect(StringifyLexer('<div >') === '[{"type":"TAGNAME","content":"div"}]').to.be.equal(true);
    });



    it('case - 2', function(){
        expect(StringifyLexer('<div id>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"}]').to.be.equal(true);
    });



    it('case - 3', function(){
        expect(StringifyLexer('<div id=>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"}]').to.be.equal(true);
    });



    it('case - 4', function(){
        expect(StringifyLexer('<div id=1>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"1"}]').to.be.equal(true);
    });



    it('case - 5', function(){
        expect(StringifyLexer('<div></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 6', function(){
        expect(StringifyLexer('<div id></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 7', function(){
        expect(StringifyLexer('<div id=></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 8', function(){
        expect(StringifyLexer('<div id=1></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"1"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 9', function(){
        expect(StringifyLexer('<div id="xxxx"></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"\\"xxxx\\""},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 10', function(){
        expect(StringifyLexer('<div id=xxxx></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"xxxx"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 11', function(){
        expect(StringifyLexer('<div id=1 class=2></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"1"},{"type":"ATTR","content":"class"},{"type":"VALUE","content":"2"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 12', function(){
        expect(StringifyLexer('<div id= 1 class= 2></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"1"},{"type":"ATTR","content":"class"},{"type":"VALUE","content":"2"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 13', function(){
        expect(StringifyLexer('<div id="a 1" class= 2></div>') === '[{"type":"TAGNAME","content":"div"},{"type":"ATTR","content":"id"},{"type":"VALUE","content":"\\"a 1\\""},{"type":"ATTR","content":"class"},{"type":"VALUE","content":"2"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 14', function(){
        expect(StringifyLexer('{aaa}') === '[{"type":"EXPR","content":"aaa"}]').to.be.equal(true);
    });



    it('case - 15', function(){
        expect(StringifyLexer('<div>a{aaa}</div>') === '[{"type":"TAGNAME","content":"div"},{"type":"TEXT","content":"a"},{"type":"EXPR","content":"aaa"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 16', function(){
        expect(StringifyLexer('<<div>a{aaa}</div>') === '[{"type":"TAGNAME","content":"<div"},{"type":"TEXT","content":"a"},{"type":"EXPR","content":"aaa"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 17', function(){
        expect(StringifyLexer('<<div>>{{{aaa}</div>') === '[{"type":"TAGNAME","content":"<div"},{"type":"TEXT","content":">{{"},{"type":"EXPR","content":"aaa"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 18', function(){
        expect(StringifyLexer('<d<iv>{aaa}</div>') === '[{"type":"TAGNAME","content":"d<iv"},{"type":"EXPR","content":"aaa"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });



    it('case - 19', function(){
        expect(StringifyLexer(`< d

<iv>{aaa}</div>`) === '[{"type":"TEXT","content":" d\\n\\n"},{"type":"TAGNAME","content":"iv"},{"type":"EXPR","content":"aaa"},{"type":"END_TAG","content":"div"}]').to.be.equal(true);
    });

    it('case - 20', function(){
        expect(StringifyLexer('<block $if={a=1}></block>') === '[{"type":"TAGNAME","content":"block"},{"type":"ATTR","content":"$if"},{"type":"VALUE","content":"{a=1}"},{"type":"END_TAG","content":"block"}]').to.be.equal(true);
    });

});
