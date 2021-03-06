/*!
 * ====================================================
 * Kity Formula - v1.0.0 - 2014-05-09
 * https://github.com/kitygraph/formula
 * GitHub: https://github.com/kitygraph/formula.git 
 * Copyright (c) 2014 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
/**
 * cmd 内部定义
 * build用
 */

// 模块存储
var _modules = {};

function define ( id, deps, factory ) {

    _modules[ id ] = {

        exports: {},
        value: null,
        factory: null

    };

    if ( arguments.length === 2 ) {

        factory = deps;

    }

    if ( _modules.toString.call( factory ) === '[object Object]' ) {

        _modules[ id ][ 'value' ] = factory;

    } else if ( typeof factory === 'function' ) {

        _modules[ id ][ 'factory' ] = factory;

    } else {

        throw new Error( 'define函数未定义的行为' );

    }

}

function require ( id ) {

    var module = _modules[ id ],
        exports = null;

    if ( !module ) {

        return null;

    }

    if ( module.value ) {

        return module.value;

    }

    exports = module.factory.call( null, require, module.exports, module );

    // return 值不为空， 则以return值为最终值
    if ( exports ) {

        module.exports = exports;

    }

    module.value = module.exports;

    return module.value;

}

function use ( id ) {

    return require( id );

}
/**
 * 字符类
 */
define("char/char", [ "kity", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("Char", {
        base: require("signgroup"),
        constructor: function(value, type) {
            var currentData;
            // 默认是标准字体
            type = type || "std";
            currentData = CHAR_DATA[type][value];
            if (!currentData) {
                currentData = CHAR_DATA["std"][value];
            }
            if (!currentData) {
                throw new Error("invalid character: " + value);
            }
            this.callBase();
            this.value = value;
            this.contentShape = new kity.Group();
            this.box = new kity.Rect(currentData.size[0] + currentData.offset.x * 2, currentData.size[1]).fill("transparent");
            this.char = new kity.Path(currentData.path).fill("black");
            this.char.translate(currentData.offset.x, currentData.offset.y);
            this.contentShape.addShape(this.box);
            this.contentShape.addShape(this.char);
            this.addShape(this.contentShape);
        },
        getBaseWidth: function() {
            return this.char.getWidth();
        },
        getBaseHeight: function() {
            return this.char.getHeight();
        },
        getBoxWidth: function() {
            return this.box.getWidth();
        }
    });
});
/*!
 * 字符配置
 */
define("char/conf", [], function(require) {
    return {
        // 默认字体
        defaultFont: "KF AMS MAIN"
    };
});
/*!
 * Created by hn on 14-4-4.
 */
define("char/map", [], function(require) {
    return {
        // char
        Alpha: "Α",
        Beta: "Β",
        Gamma: "Γ",
        Delta: "Δ",
        Epsilon: "Ε",
        Zeta: "Ζ",
        Eta: "Η",
        Theta: "Θ",
        Iota: "Ι",
        Kappa: "Κ",
        Lambda: "Λ",
        Mu: "Μ",
        Nu: "Ν",
        Xi: "Ξ",
        Omicron: "Ο",
        Pi: "Π",
        Rho: "Ρ",
        Sigma: "Σ",
        Tau: "Τ",
        Upsilon: "Υ",
        Phi: "Φ",
        Chi: "Χ",
        Psi: "Ψ",
        Omega: "Ω",
        alpha: "α",
        beta: "β",
        gamma: "γ",
        delta: "δ",
        epsilon: "ε",
        varepsilon: "ε",
        zeta: "ζ",
        eta: "η",
        theta: "θ",
        iota: "ι",
        kappa: "κ",
        lambda: "λ",
        mu: "μ",
        nu: "ν",
        xi: "ξ",
        omicron: "ο",
        pi: "π",
        rho: "ρ",
        sigma: "σ",
        tau: "τ",
        upsilon: "υ",
        phi: "φ",
        varphi: "φ",
        chi: "χ",
        psi: "ψ",
        omega: "ω",
        // symbol
        doublecap: "⋒",
        Cap: "⋒",
        dobulecup: "⋓",
        Cup: "⋓",
        ast: "∗",
        divideontimes: "⋇",
        rightthreetimes: "⋌",
        leftthreetimes: "⋋",
        cdot: "·",
        dotplus: "∔",
        rtimes: "⋊",
        ltimes: "⋉",
        centerdot: "▪",
        doublebarwedge: "⒀",
        setminus: "⒁",
        amalg: "∐",
        circ: "◦",
        bigcirc: "©",
        gtrdot: "⋗",
        lessdot: "⋖",
        smallsetminus: "⒅",
        circledast: "⊛",
        circledcirc: "⊚",
        intercal: "⊺",
        sqcap: "⊓",
        sqcup: "⊔",
        barwedge: "⊼",
        circleddash: "⊝",
        star: "⒆",
        bigtriangledown: "▽",
        bigtriangleup: "△",
        cup: "a",
        cap: "9",
        times: "×",
        mp: "∓",
        pm: "±",
        triangleleft: "⊲",
        triangleright: "⊳",
        boxdot: "⊡",
        curlyvee: "⋏",
        curlywedge: "⋎",
        boxminus: "⊟",
        ominus: "⊖",
        oplus: "⊕",
        oslash: "⊘",
        otimes: "⊗",
        uplus: "⊎",
        boxplus: "⊞",
        dagger: "†",
        ddagger: "‡",
        vee: "∨",
        lor: "∨",
        veebar: "⊻",
        bullet: "•",
        diamond: "⋄",
        wedge: "∧",
        land: "∧",
        div: "÷",
        wr: "≀",
        geqq: "≧",
        lll: "⒈",
        llless: "⒈",
        ggg: "⒉",
        gggtr: "⒉",
        preccurlyeq: "⒊",
        geqslant: "⒋",
        lnapprox: "≨",
        preceq: "≼",
        gg: "≫",
        lneq: "⒐",
        precnapprox: "⒒",
        approx: "≈",
        lneqq: "⒓",
        precneqq: "⒔",
        approxeq: "⒥",
        gnapprox: "≩",
        lnsim: "⋦",
        precnsim: "⋨",
        asymp: "≍",
        gneq: "⒑",
        lvertneqq: "⒖",
        precsim: "≾",
        backsim: "∽",
        gneqq: "⒘",
        ncong: "≇",
        risingdotseq: "≓",
        backsimeq: "⋍",
        gnsim: "⋧",
        sim: "∼",
        simeq: "≃",
        bumpeq: "⒙",
        gtrapprox: "⒛",
        ngeq: "≱",
        Bumpeq: "⒚",
        gtreqless: "⋛",
        ngeqq: "ⓠ",
        succ: "≻",
        circeq: "⒜",
        gtreqqless: "ⓤ",
        ngeqslant: "ⓦ",
        succapprox: "⒝",
        cong: "⒡",
        gtrless: "≷",
        ngtr: "≯",
        succcurlyeq: "⒍",
        curlyeqprec: "⒢",
        gtrsim: "≳",
        nleq: "≰",
        succeq: "≽",
        curlyeqsucc: "⒣",
        gvertneqq: "⒗",
        nleqq: "ⓡ",
        succnapprox: "⒤",
        doteq: "⒟",
        leq: "≤",
        le: "≤",
        nleqslant: "ⓥ",
        succneqq: "⒕",
        doteqdot: "≑",
        Doteq: "≑",
        leqq: "≦",
        nless: "≮",
        succnsim: "⋩",
        leqslant: "⒌",
        nprec: "⊀",
        succsim: "≿",
        eqsim: "≂",
        lessapprox: "⒦",
        npreceq: "⋠",
        eqslantgtr: "⋝",
        lesseqgtr: "⋚",
        nsim: "≁",
        eqslantless: "⒩",
        lesseqqgtr: "ⓤ",
        nsucc: "⊁",
        triangleq: "≜",
        eqcirc: "≖",
        equiv: "≡",
        lessgtr: "≶",
        nsucceq: "⋡",
        fallingdotseq: "≒",
        lesssim: "≲",
        prec: "≺",
        geq: "≥",
        ge: "≥",
        ll: "≪",
        precapprox: "⒞",
        // arrows
        uparrow: "↑",
        downarrow: "↓",
        updownarrow: "↕",
        Uparrow: "⇑",
        Downarrow: "⇓",
        Updownarrow: "⇕",
        circlearrowleft: "↺",
        circlearrowright: "↻",
        curvearrowleft: "↶",
        curvearrowright: "↷",
        downdownarrows: "⇊",
        downharpoonleft: "⇃",
        downharpoonright: "⇂",
        leftarrow: "←",
        gets: "←",
        Leftarrow: "⇐",
        leftarrowtail: "↢",
        leftharpoondown: "⒬",
        leftharpoonup: "⒪",
        leftleftarrows: "⒮",
        leftrightarrow: "↔",
        Leftrightarrow: "⇔",
        leftrightarrows: "⇄",
        leftrightharpoons: "⇋",
        leftrightsquigarrow: "↭",
        Llfetarrow: "⇚",
        looparrowleft: "↫",
        looparrowright: "↬",
        multimap: "⊸",
        nLeftarrow: "⇍",
        nRightarrow: "⇏",
        nLeftrightarrow: "⇎",
        nearrow: "↗",
        nleftarrow: "⒰",
        nleftrightarrow: "↮",
        nrightarrow: "⒱",
        nwarrow: "↖",
        rightarrow: "→",
        to: "→",
        Rightarrow: "⇒",
        rightarrowtail: "↣",
        rightharpoondown: "⒭",
        rightharpoonup: "⒫",
        rightleftarrows: "⇆",
        rightleftharpoons: "⇌",
        rigtrightarrows: "⒯",
        rightsquigarrow: "⇝",
        Rightarrow: "⇛",
        searrow: "↘",
        swarrow: "↙",
        twoheadleftarrow: "↞",
        twoheadrightarrow: "↠",
        upharpoonleft: "↿",
        upharpoonright: "↾",
        restriction: "be",
        upuparrows: "⇈",
        // relation
        backepsilon: "℈",
        because: "∵",
        therefore: "∴",
        between: "≬",
        blacktriangleleft: "◀",
        blacktriangleright: "▸",
        dashv: "⊣",
        frown: "⌢",
        "in": "∈",
        mid: "Ⓦ",
        parallel: "d0",
        models: "⊨",
        ni: "∋",
        owns: "∋",
        nmid: "∤",
        nparallel: "∦",
        nshortmid: "⒵",
        nshortparallel: "Ⓐ",
        nsubseteq: "⊈",
        nsubseteqq: "Ⓑ",
        nsupseteq: "⊉",
        nsupseteqq: "Ⓒ",
        ntriangleleft: "⋪",
        ntrianglelefteq: "⋬",
        ntriangleright: "⋫",
        ntrianglerighteq: "⋭",
        nvdash: "⊬",
        nVdash: "Ⓚ",
        nvDash: "Ⓛ",
        nVDash: "⊯",
        perp: "⊥",
        pitchfork: "⋔",
        propto: "∝",
        shortmid: "⒃",
        shortparallel: "⒄",
        smile: "⌣",
        sqsubset: "⊏",
        sqsubseteq: "⊑",
        sqsupset: "⊐",
        sqsupseteq: "⊒",
        subset: "⊂",
        Subset: "⋐",
        subseteq: "⊆",
        subseteqq: "Ⓗ",
        subsetneq: "⊊",
        subsetneqq: "Ⓓ",
        supset: "⊃",
        Supset: "⋑",
        supseteq: "⊇",
        supseteqq: "Ⓘ",
        supsetneq: "⊋",
        supsetneqq: "Ⓔ",
        trianglelefteq: "⊴",
        trianglerighteq: "⊵",
        varpropto: "⒲",
        varsubsetneq: "⒳",
        varsubsetneqq: "Ⓕ",
        varsupsetneq: "⒴",
        varsupsetneqq: "Ⓖ",
        vdash: "⊢",
        Vdash: "⊩",
        vDash: "⊨",
        Vvdash: "⊪",
        vert: "|",
        Vert: "ǁ",
        "|": "ǁ",
        backslash: "ǂ",
        langle: "〈",
        rangle: "〉",
        lceil: "⌈",
        rceil: "⌉",
        lbrace: "{",
        rbrace: "}",
        lfloor: "⌊",
        rfllor: "⌋",
        colon: "Ǆ",
        "#": "#",
        bot: "⊥"
    };
});
/**
 * 文本
 */
define("char/text", [ "kity", "font/manager", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), FontManager = require("font/manager");
    return kity.createClass("Text", {
        base: require("signgroup"),
        constructor: function(content, fontFamily) {
            this.callBase();
            this.fontFamily = fontFamily;
            this.content = content || "";
            this.translationContent = this.translation(this.content);
            this.contentShape = new kity.Group();
            this.contentNode = this.createContent();
            this.contentShape.addShape(this.contentNode);
            this.contentShape.translate(0, 40);
            this.addShape(this.contentShape);
        },
        createContent: function() {
            var contentNode = new kity.Text(this.translationContent);
            contentNode.setAttr({
                "font-family": this.fontFamily,
                "font-size": 50,
                x: 0,
                y: 0
            });
            return contentNode;
        },
        getBaseHeight: function() {
            var chars = this.contentShape.getItems(), currentChar = null, index = 0, height = 0;
            while (currentChar = chars[index]) {
                height = Math.max(height, currentChar.getHeight());
                index++;
            }
            return height;
        },
        translation: function(content) {
            var fontFamily = this.fontFamily;
            return content.replace(/\\([a-zA-Z,{}]+)\\/g, function(match, input) {
                if (input === ",") {
                    return "￼ ￼";
                }
                var data = FontManager.getCharacterValue(input, fontFamily);
                if (!data) {
                    console.error(input + "丢失");
                }
                return data;
            });
        }
    });
});
/*!
 * 全局定义
 */
define("conf", [ "font/kf-ams-main", "font/kf-ams-cal", "font/kf-ams-roman" ], function(require) {
    return {
        font: {
            defaultFont: "KF AMS MAIN",
            list: [ require("font/kf-ams-main"), require("font/kf-ams-cal"), require("font/kf-ams-roman") ]
        }
    };
});
/**
 * 定义公式中各种对象的类型
 */
define("def/gtype", [], function() {
    return {
        UNKNOWN: -1,
        EXP: 0,
        COMPOUND_EXP: 1,
        OP: 2
    };
});
/**
 * 定义公式中上下标的类型
 */
define("def/script-type", [], function() {
    return {
        SIDE: "side",
        FOLLOW: "follow"
    };
});
/**
 * 分数表达式
 */
define("expression/compound-exp/binary-exp/fraction", [ "kity", "operator/binary-opr/fraction", "operator/binary-opr/up-down", "expression/compound-exp/binary-exp/up-down", "expression/compound-exp/binary" ], function(require, exports, modules) {
    var kity = require("kity"), FractionOperator = require("operator/binary-opr/fraction");
    return kity.createClass("FractionExpression", {
        base: require("expression/compound-exp/binary-exp/up-down"),
        constructor: function(upOperand, downOperand) {
            this.callBase(upOperand, downOperand);
            this.setFlag("Fraction");
            this.setOperator(new FractionOperator());
        }
    });
});
/**
 * 左右结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/left-right", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightExpression", {
        base: require("expression/compound-exp/binary"),
        getLeftOperand: function() {
            return this.getFirstOperand();
        },
        setLeftOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRightOperand: function() {
            return this.getLastOperand();
        },
        setRightOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * 方根表达式
 */
define("expression/compound-exp/binary-exp/radical", [ "kity", "operator/binary-opr/radical", "operator/binary", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity"), RadicalOperator = require("operator/binary-opr/radical");
    return kity.createClass("RadicalExpression", {
        base: require("expression/compound-exp/binary"),
        /**
         * 构造开方表达式
         * @param radicand 被开方数
         * @param exponent 指数
         */
        constructor: function(radicand, exponent) {
            this.callBase(radicand, exponent);
            this.setFlag("Radicand");
            this.setOperator(new RadicalOperator());
        },
        setRadicand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRadicand: function() {
            return this.getFirstOperand();
        },
        setExponent: function(operand) {
            return this.setLastOperand(operand);
        },
        getExponent: function() {
            return this.getLastOperand();
        }
    });
});
/**
 * 下标表达式
 */
define("expression/compound-exp/binary-exp/subscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SubscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, subscript) {
            this.callBase(operand, null, subscript);
            this.setFlag("Subscript");
        }
    });
});
/**
 * 上标表达式
 */
define("expression/compound-exp/binary-exp/superscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SuperscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, superscript) {
            this.callBase(operand, superscript, null);
            this.setFlag("Superscript");
        }
    });
});
/**
 * 上下结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/up-down", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownExpression", {
        base: require("expression/compound-exp/binary"),
        getUpOperand: function() {
            return this.getFirstOperand();
        },
        setUpOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getDownOperand: function() {
            return this.getLastOperand();
        },
        setDownOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * 二元操作表达式
 * @abstract
 */
define("expression/compound-exp/binary", [ "kity", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryExpression", {
        base: require("expression/compound"),
        constructor: function(firstOperand, lastOperand) {
            this.callBase();
            this.setFirstOperand(firstOperand);
            this.setLastOperand(lastOperand);
        },
        setFirstOperand: function(operand) {
            return this.setOperand(operand, 0);
        },
        getFirstOperand: function() {
            return this.getOperand(0);
        },
        setLastOperand: function(operand) {
            return this.setOperand(operand, 1);
        },
        getLastOperand: function() {
            return this.getOperand(1);
        }
    });
});
/**
 * 自动增长括号表达式
 */
define("expression/compound-exp/brackets", [ "kity", "operator/brackets", "font/manager", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), BracketsOperator = require("operator/brackets");
    return kity.createClass("BracketsExpression", {
        base: require("expression/compound"),
        /**
         * 构造函数调用方式：
         *  new Constructor( 左括号, 右括号, 表达式 )
         *  或者
         *  new Constructor( 括号, 表达式 ), 该构造函数转换成上面的构造函数，是： new Constructor( 括号, 括号, 表达式 )
         * @param left 左括号
         * @param right 右括号
         * @param exp 表达式
         */
        constructor: function(left, right, exp) {
            this.callBase();
            this.setFlag("Brackets");
            // 参数整理
            if (arguments.length === 2) {
                exp = right;
                right = left;
            }
            this.leftSymbol = left;
            this.rightSymbol = right;
            this.setOperator(new BracketsOperator());
            this.setOperand(exp, 0);
        },
        getLeftSymbol: function() {
            return this.leftSymbol;
        },
        getRightSymbol: function() {
            return this.rightSymbol;
        }
    });
});
/**
 * 组合表达式
 * 可以组合多个表达式
 */
define("expression/compound-exp/combination", [ "kity", "operator/combination", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), CombinationOperator = require("operator/combination");
    return kity.createClass("CombinationExpression", {
        base: require("expression/compound"),
        constructor: function() {
            this.callBase();
            this.setFlag("Combination");
            this.setOperator(new CombinationOperator());
            kity.Utils.each(arguments, function(operand, index) {
                this.setOperand(operand, index);
            }, this);
        }
    });
});
/**
 * 函数表达式
 */
define("expression/compound-exp/func", [ "kity", "operator/func", "char/text", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), FunctionOperator = require("operator/func");
    return kity.createClass("FunctionExpression", {
        base: require("expression/compound"),
        /**
         * function表达式构造函数
         * @param funcName function名称
         * @param expr 函数表达式
         * @param sup 上标
         * @param sub 下标
         */
        constructor: function(funcName, expr, sup, sub) {
            this.callBase();
            this.setFlag("Func");
            this.setOperator(new FunctionOperator(funcName));
            this.setExpr(expr);
            this.setSuperscript(sup);
            this.setSubscript(sub);
        },
        setExpr: function(expr) {
            return this.setOperand(expr, 0);
        },
        setSuperscript: function(sub) {
            return this.setOperand(sub, 1);
        },
        setSubscript: function(sub) {
            return this.setOperand(sub, 2);
        }
    });
});
/**
 * 积分表达式
 */
define("expression/compound-exp/integration", [ "kity", "operator/integration", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), IntegrationOperator = require("operator/integration"), IntegrationExpression = kity.createClass("IntegrationExpression", {
        base: require("expression/compound"),
        /**
             * 构造积分表达式
             * @param integrand 被积函数
             * @param supOperand 上限
             * @param subOperand 下限
             */
        constructor: function(integrand, superscript, subscript) {
            this.callBase();
            this.setFlag("Integration");
            this.setOperator(new IntegrationOperator());
            this.setIntegrand(integrand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setType: function(type) {
            this.getOperator().setType(type);
            return this;
        },
        resetType: function() {
            this.getOperator().resetType();
            return this;
        },
        setIntegrand: function(integrand) {
            this.setOperand(integrand, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
    return IntegrationExpression;
});
/**
 * 上标表达式
 */
define("expression/compound-exp/script", [ "kity", "operator/script", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptOperator = require("operator/script");
    return kity.createClass("ScriptExpression", {
        base: require("expression/compound"),
        constructor: function(operand, superscript, subscript) {
            this.callBase();
            this.setFlag("Script");
            this.setOperator(new ScriptOperator());
            this.setOpd(operand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setOpd: function(operand) {
            this.setOperand(operand, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
});
/**
 * 求和表达式
 * @abstract
 */
define("expression/compound-exp/summation", [ "kity", "operator/summation", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), SummationOperator = require("operator/summation");
    return kity.createClass("SummationExpression", {
        base: require("expression/compound"),
        /**
         * 构造求和表达式
         * @param expr 求和表达式
         * @param upOperand 上标
         * @param downOperand 下标
         */
        constructor: function(expr, superscript, subscript) {
            this.callBase();
            this.setFlag("Summation");
            this.setOperator(new SummationOperator());
            this.setExpr(expr);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setExpr: function(expr) {
            this.setOperand(expr, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
});
/**
 * 复合表达式
 * @abstract
 */
define("expression/compound", [ "kity", "def/gtype", "expression/expression", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype"), Expression = require("expression/expression");
    return kity.createClass("CompoundExpression", {
        base: require("expression/expression"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.COMPOUND_EXP;
            this.operands = [];
            this.operator = null;
            this.operatorBox = new kity.Group();
            this.operatorBox.setAttr("data-type", "kf-editor-exp-op-box");
            this.operandBox = new kity.Group();
            this.operandBox.setAttr("data-type", "kf-editor-exp-operand-box");
            this.setChildren(0, this.operatorBox);
            this.setChildren(1, this.operandBox);
        },
        // 操作符存储在第1位置
        setOperator: function(operator) {
            if (operator === undefined) {
                return this;
            }
            if (this.operator) {
                this.operator.remove();
            }
            this.operatorBox.addShape(operator);
            this.operator = operator;
            this.operator.setParentExpression(this);
            // 表达式关联到操作符
            operator.expression = this;
            return this;
        },
        getOperator: function() {
            return this.operator;
        },
        // 操作数存储位置是从1开始
        setOperand: function(operand, index, isWrap) {
            // 不包装操作数
            if (isWrap === false) {
                this.operands[index] = operand;
                return this;
            }
            operand = Expression.wrap(operand);
            if (this.operands[index]) {
                this.operands[index].remove();
            }
            this.operands[index] = operand;
            this.operandBox.addShape(operand);
            return this;
        },
        getOperand: function(index) {
            return this.operands[index];
        },
        getOperands: function() {
            return this.operands;
        },
        addedCall: function() {
            this.operator.applyOperand.apply(this.operator, this.operands);
            return this;
        }
    });
});
/**
 * 空表达式
 * 该表达式主要用途是用于站位
 */
define("expression/empty", [ "kity", "expression/expression", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), Expression = require("expression/expression"), EmptyExpression = kity.createClass("EmptyExpression", {
        base: Expression,
        constructor: function() {
            this.callBase();
            this.setFlag("Empty");
        }
    });
    // 注册打包函数
    Expression.registerWrap("empty", function(operand) {
        if (operand === null || operand === undefined) {
            return new EmptyExpression();
        }
    });
    return EmptyExpression;
});
/**
 * 基础表达式， 该类是表达式和操作数的高层抽象
 * @abstract
 */
define("expression/expression", [ "kity", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), // 打包函数列表
    WRAP_FN = [], // 注册的打包函数的名称与其在注册器列表中的索引之间的对应关系
    WRAP_FN_INDEX = {}, Expression = kity.createClass("Expression", {
        base: require("signgroup"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.EXP;
            this.children = [];
            this.box.fill("transparent").setAttr("data-type", "kf-editor-exp-box");
            this.box.setAttr("data-type", "kf-editor-exp-bg-box");
            this.expContent = new kity.Group();
            this.expContent.setAttr("data-type", "kf-editor-exp-content-box");
            this.addShape(this.expContent);
        },
        getChildren: function() {
            return this.children;
        },
        getChild: function(index) {
            return this.children[index] || null;
        },
        setFlag: function(flag) {
            this.setAttr("data-flag", flag || "Expression");
        },
        setChildren: function(index, exp) {
            // 首先清理掉之前的表达式
            if (this.children[index]) {
                this.children[index].remove();
            }
            this.children[index] = exp;
            this.expContent.addShape(exp);
        },
        translateElement: function(x, y) {
            this.expContent.translate(x, y);
        },
        expand: function(width, height) {
            var renderBox = this.getFixRenderBox();
            this.setBoxSize(renderBox.width + width, renderBox.height + height);
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        getBaseHeight: function() {
            return this.getHeight();
        },
        updateBoxSize: function() {
            var renderBox = this.expContent.getFixRenderBox();
            this.setBoxSize(renderBox.width, renderBox.height);
        },
        getBox: function() {
            return this.box;
        }
    });
    // 表达式自动打包
    kity.Utils.extend(Expression, {
        registerWrap: function(name, fn) {
            WRAP_FN_INDEX[name] = WRAP_FN.length;
            WRAP_FN.push(fn);
        },
        revokeWrap: function(name) {
            var fn = null;
            if (name in WRAP_FN_INDEX) {
                fn = WRAP_FN[WRAP_FN_INDEX[name]];
                WRAP_FN[WRAP_FN_INDEX[name]] = null;
                delete WRAP_FN_INDEX[name];
            }
            return fn;
        },
        // 打包函数
        wrap: function(operand) {
            var result = undefined;
            kity.Utils.each(WRAP_FN, function(fn) {
                if (!fn) {
                    return;
                }
                result = fn(operand);
                if (result) {
                    return false;
                }
            });
            return result;
        }
    });
    return Expression;
});
/**
 * Text表达式
 */
define("expression/text", [ "char/text", "kity", "font/manager", "signgroup", "char/conf", "expression/expression", "def/gtype" ], function(require, exports, module) {
    var Text = require("char/text"), kity = require("kity"), FONT_CONF = require("char/conf"), Expression = require("expression/expression"), TextExpression = kity.createClass("TextExpression", {
        base: require("expression/expression"),
        constructor: function(content, fontFamily) {
            this.callBase();
            this.fontFamily = fontFamily || FONT_CONF.defaultFont;
            this.setFlag("Text");
            this.content = content + "";
            this.textContent = new Text(this.content, this.fontFamily);
            this.setChildren(0, this.textContent);
            this.setChildren(1, new kity.Rect(0, 0, 0, 0).fill("transparent"));
        },
        addedCall: function() {
            var box = this.textContent.getFixRenderBox();
            this.getChild(1).setSize(box.width, box.height);
            this.updateBoxSize();
            return this;
        }
    });
    // 注册文本表达式的打包函数
    Expression.registerWrap("text", function(operand) {
        var operandType = typeof operand;
        if (operandType === "number" || operandType === "string") {
            operand = new TextExpression(operand);
        }
        return operand;
    });
    return TextExpression;
});
/*!
 * 字体管理器
 */
define("font/installer", [ "kity" ], function(require) {
    var kity = require("kity"), NS = "http://www.w3.org/2000/svg";
    return kity.createClass("FontInstaller", {
        constructor: function(paper) {
            this.paper = paper;
        },
        // 挂载字体
        mount: function(fontData) {
            var chardata = fontData.data, font = document.createElementNS(NS, "font"), attr = fontData.meta.attr;
            font.setAttribute("horiz-adv-x", fontData.meta.x);
            var strArr = [ "<font-face " + attr + ' font-family="' + fontData.meta.fontFamily + '" units-per-em="' + fontData.meta["units-per-em"] + '"></font-face>' ];
            kity.Utils.each(chardata, function(char, key) {
                strArr.push('<glyph unicode="' + key + '"' + (char.x !== null ? ' horiz-adv-x="' + char.x + '"' : "") + ' d="' + char.d + '"/>');
            });
            strArr = strArr.join("");
            font.innerHTML = strArr;
            this.paper.addResource({
                node: font
            });
        }
    });
});
/*!
 * 书法字体
 */
define("font/kf-ams-cal", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS CAL",
            x: 724,
            "units-per-em": 1e3,
            attr: 'panose-1="2 0 6 3 0 0 0 0 0 0" ascent="800" descent="-200" cap-height="683" bbox="50 -135 1139 775" underline-thickness="50" underline-position="-100" unicode-range="U+0041-005A"'
        },
        data: {
            A: {
                x: 871,
                d: "M618 165h-272c-22 -35 -137 -215 -206 -215c-47 0 -90 44 -90 84c0 28 22 76 37 76c4 0 6 -6 7 -8c9 -36 40 -60 77 -60c54 0 158 163 217 254c52 81 126 202 205 371l7 11c18 27 59 44 73 44c11 0 11 -4 11 -20c0 -24 -1 -50 -1 -74c0 -102 4 -204 11 -306\nc8 -137 17 -177 24 -210c12 -60 18 -87 46 -87c2 0 4 0 11 4c3 2 24 13 37 13c5 0 9 -2 9 -7c0 -20 -77 -65 -122 -65c-43 0 -48 22 -59 67c-5 19 -17 65 -22 128zM598 599h-1c-13 -25 -40 -83 -90 -172c-6 -11 -64 -115 -134 -223c26 16 41 16 57 16h183\nc-5 52 -9 127 -10 147c-3 58 -5 116 -5 174v58z"
            },
            B: {
                x: 735,
                d: "M300 679l-20 -132c121 150 249 159 283 159c74 0 122 -43 122 -101c0 -94 -117 -166 -197 -200c102 -19 158 -82 158 -166c0 -161 -207 -261 -348 -261c-108 0 -147 66 -147 69c0 18 51 49 73 49c8 0 9 -2 13 -7c13 -14 50 -56 127 -56c91 0 197 40 197 164\nc0 95 -82 155 -183 155c-21 0 -44 -4 -48 -4c-3 0 -10 1 -10 7c0 25 69 49 81 53c104 35 199 67 199 155c0 53 -49 88 -103 88c-63 0 -105 -30 -151 -95c-71 -103 -109 -234 -131 -320c-30 -116 -68 -189 -81 -212c-16 -28 -58 -46 -74 -46c-2 0 -10 0 -10 7c0 1 0 3 5 12\nc49 97 68 158 105 328c18 86 42 214 54 312c-19 -9 -45 -23 -57 -23c-4 0 -11 0 -11 6c0 18 38 37 84 60c20 10 50 25 61 25c9 0 11 -3 11 -10c0 -3 0 -5 -2 -16z"
            },
            C: {
                x: 622,
                d: "M534 157c0 -25 -133 -181 -294 -181c-116 0 -190 81 -190 227c0 52 12 207 131 351c46 56 165 151 310 151c36 0 81 -8 81 -63c0 -51 -58 -149 -60 -153c-12 -16 -49 -38 -69 -38c-6 0 -11 0 -11 7c0 2 0 4 6 15c12 20 49 91 49 126c0 37 -24 51 -62 51\nc-103 0 -157 -52 -201 -116c-53 -79 -89 -198 -89 -288c0 -150 81 -215 171 -215c65 0 109 34 140 81c12 17 16 24 36 37c1 0 25 15 42 15c5 0 10 -1 10 -7z"
            },
            D: {
                x: 845,
                d: "M233 0h-103c-22 0 -23 1 -23 7c0 10 24 33 61 46c70 175 121 366 137 575c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 8 19 91 152 150c84 36 143 36 229 36c95 0 187 0 273 -56c49 -31 91 -87 91 -176\nc0 -273 -329 -451 -562 -451zM238 55h54c242 0 418 157 418 353c0 220 -256 220 -323 220c-14 -120 -35 -294 -149 -573z"
            },
            E: {
                x: 637,
                d: "M261 363c-49 17 -94 53 -94 112c0 122 170 230 306 230c45 0 114 -9 114 -68c0 -57 -62 -96 -92 -96c-3 0 -10 0 -10 7c0 3 3 8 5 11c4 6 12 20 12 36c0 52 -76 55 -95 55c-140 0 -155 -109 -155 -132c0 -40 28 -109 169 -115c5 0 10 -1 10 -7c0 -11 -35 -46 -82 -48\nc-158 -6 -214 -154 -214 -203c0 -75 79 -112 150 -112c89 0 131 58 152 87c23 31 61 44 73 44c5 0 10 -1 10 -7c0 -21 -134 -179 -301 -179c-95 0 -169 48 -169 124c0 24 11 153 211 261z"
            },
            F: {
                x: 913,
                d: "M863 645c0 -27 -54 -57 -78 -57c-3 0 -6 1 -8 3c-3 5 0 15 -2 21c-18 22 -88 17 -113 17h-132c-18 -92 -52 -180 -78 -270h240c12 0 19 1 19 -6c0 -31 -57 -59 -79 -59c-4 0 -10 3 -10 7c0 1 1 2 2 3h-193c-26 -60 -92 -224 -125 -262c-32 -37 -91 -74 -142 -74\nc-49 0 -94 27 -112 74c-1 2 -2 4 -2 6c0 17 55 49 78 49c7 0 7 -4 10 -10c18 -39 51 -63 95 -63c14 12 68 137 74 150c44 98 103 253 142 436c0 1 4 19 4 19h-62c-31 0 -61 -2 -92 -2c-14 -15 -44 -33 -66 -33c-6 0 -8 1 -10 7c16 54 105 83 155 83h377c31 0 108 7 108 -39z\n"
            },
            G: {
                x: 657,
                d: "M442 159c-66 -53 -143 -91 -218 -91c-129 0 -174 103 -174 204c0 235 203 433 429 433c14 0 48 0 85 -12c12 -4 43 -14 43 -55c0 -34 -40 -90 -48 -101c-27 -37 -60 -64 -89 -64c-6 0 -11 0 -11 7c0 4 3 8 7 12c4 6 56 70 56 104c0 32 -25 40 -36 43c-25 8 -54 11 -73 11\nc-113 0 -162 -53 -189 -85c-58 -70 -89 -173 -89 -250c0 -113 57 -192 154 -192c124 0 183 148 193 182c7 25 8 30 31 45c21 14 38 19 47 19s11 -3 11 -9c0 -4 -21 -84 -41 -153c-3 -12 -20 -69 -46 -125c-75 -163 -193 -201 -265 -201c-93 0 -161 41 -161 50\nc0 11 35 46 80 48c59 -40 130 -43 147 -43c34 0 55 2 94 70c10 16 36 62 63 153z"
            },
            H: {
                x: 880,
                d: "M360 335h268c30 102 61 203 101 301c4 9 10 14 11 16c19 17 48 31 63 31c4 0 10 0 10 -7c0 -2 0 -4 -3 -11c-86 -228 -135 -416 -152 -527c-3 -22 -10 -77 -10 -89c0 -31 23 -43 41 -43c1 0 20 1 31 3c19 3 20 4 24 12c15 39 68 53 76 53c5 0 10 -2 10 -8\nc0 -32 -74 -115 -207 -115c-43 0 -60 26 -60 55c0 79 41 242 52 284c-16 -10 -35 -10 -46 -10h-225c-26 -92 -56 -182 -91 -270c-4 -10 -6 -12 -11 -18c-20 -20 -51 -33 -65 -33c-2 0 -10 0 -10 7c0 1 0 3 9 26c46 122 74 218 95 288h-72c-22 0 -23 1 -23 7\nc0 15 46 47 74 48h36c21 86 24 104 29 132c12 69 15 116 15 117c0 16 -7 44 -48 44c-90 0 -119 -38 -146 -89c-21 -38 -68 -50 -76 -50c-3 0 -10 0 -10 7c0 5 26 72 107 127c47 32 115 60 191 60c12 0 67 0 67 -56c0 -12 -7 -79 -19 -146c-10 -48 -23 -99 -36 -146z"
            },
            I: {
                x: 759,
                d: "M429 683h257c22 0 23 -1 23 -7c0 -12 -23 -28 -32 -33c-26 -15 -35 -15 -55 -15h-85c-20 0 -21 -1 -27 -10c-41 -61 -65 -158 -92 -267c-34 -136 -64 -235 -135 -296h191c50 0 53 6 60 27c10 25 57 48 74 48c3 0 11 0 11 -7c0 -36 -87 -123 -204 -123h-342\nc-22 0 -23 1 -23 7c0 10 22 27 33 33c25 15 36 15 55 15h64c27 0 28 1 38 12c41 53 64 131 93 249c36 144 65 251 128 312h-91c-34 0 -67 -2 -101 -6c-67 -9 -70 -18 -82 -56c-8 -22 -56 -47 -74 -47c-6 0 -11 1 -11 8c0 13 23 81 125 124c24 9 78 32 202 32z"
            },
            J: {
                x: 893,
                d: "M618 683h202c22 0 23 -1 23 -7c0 -11 -34 -45 -79 -48c-23 -2 -27 -5 -43 -23c-75 -84 -123 -266 -160 -411c-18 -71 -36 -144 -128 -223c-49 -42 -130 -90 -215 -90c-98 0 -168 60 -168 152c0 47 11 57 23 66c28 21 51 26 57 26c9 0 10 -6 10 -9c0 -4 -5 -21 -5 -41\nc0 -87 71 -139 149 -139c101 0 162 100 186 193c66 260 112 411 222 499h-133c-98 0 -170 -43 -203 -149c-6 -18 -51 -46 -74 -46c-4 0 -10 0 -10 7c0 2 12 86 121 164c46 33 129 79 225 79z"
            },
            K: {
                x: 803,
                d: "M216 638c-48 -24 -50 -24 -59 -24c-4 0 -11 0 -11 6c0 18 38 37 84 60c20 10 50 25 61 25s11 -4 11 -16c0 -4 -2 -45 -7 -85c-30 -254 -160 -581 -165 -588c-16 -19 -52 -38 -70 -38c-2 0 -10 0 -10 7c0 1 0 3 5 15c59 156 150 420 161 638zM747 127c0 -3 -4 -28 -30 -60\nc-38 -48 -119 -89 -197 -89c-30 0 -51 13 -86 47c-72 73 -173 289 -173 375c0 62 107 138 149 169c79 56 217 136 285 136c37 0 58 -26 58 -60c0 -49 -48 -52 -50 -52c-9 0 -12 5 -12 11c0 4 2 9 2 16c0 26 -15 42 -36 42c-47 0 -224 -102 -298 -175\nc-35 -36 -38 -46 -38 -62c0 -90 141 -404 238 -404c2 0 100 0 127 76c5 16 7 19 19 27c14 11 25 12 30 12c12 0 12 -8 12 -9z"
            },
            L: {
                x: 803,
                d: "M199 93c13 3 27 4 40 4c50 0 105 -16 133 -24c66 -18 116 -33 164 -33c15 0 16 0 24 12c4 6 10 14 15 30c6 17 8 23 35 40c17 12 41 23 57 23c1 0 7 0 7 -7c0 -3 -6 -28 -26 -55c-32 -44 -114 -105 -195 -105c-51 0 -102 15 -153 29c-63 18 -98 27 -148 28\nc-23 -24 -25 -26 -42 -36c-26 -17 -47 -21 -51 -21c-7 0 -9 4 -9 6c0 5 10 23 37 48c14 13 40 57 47 69c30 60 38 91 56 160c19 75 66 255 146 337c98 99 186 107 218 107c56 0 84 -41 84 -95c0 -41 -9 -51 -27 -65c-25 -18 -52 -29 -68 -29c-1 0 -7 0 -7 7c0 5 5 19 5 37\nc0 14 -2 83 -71 83c-32 0 -40 -9 -52 -22c-62 -69 -100 -189 -135 -327c-13 -53 -30 -117 -84 -201z"
            },
            M: {
                x: 1189,
                d: "M408 559c-28 -144 -84 -302 -131 -415c-20 -51 -79 -194 -141 -194c-5 0 -29 1 -54 14c-32 17 -32 29 -32 38c0 28 22 73 36 73c2 0 4 0 9 -5c22 -20 59 -28 72 -28c19 0 41 0 121 213c70 191 90 323 102 407c3 21 45 43 63 43c3 0 8 0 11 -5c0 -2 5 -29 8 -43\nc17 -97 34 -180 63 -293c35 -140 53 -178 78 -231c99 84 391 434 485 548c19 22 20 23 24 23c7 0 8 -11 8 -15c0 -8 -1 -10 -2 -17c-29 -124 -73 -427 -73 -538c0 -4 0 -34 3 -66c2 -23 4 -39 28 -42c11 7 31 16 44 16c3 0 9 -1 9 -7c0 -20 -76 -64 -118 -64s-46 29 -47 40\nc-3 27 -4 53 -4 80c0 117 36 342 50 427l-219 -255c-70 -80 -122 -138 -198 -211c-18 -18 -20 -18 -24 -18c-10 0 -21 22 -43 65c-57 116 -101 330 -128 460z"
            },
            N: {
                x: 1107,
                d: "M385 574c-19 -107 -50 -256 -115 -437c-16 -46 -67 -187 -131 -187c-28 0 -89 20 -89 51c0 24 21 74 37 74c1 0 3 0 8 -4c26 -24 65 -29 75 -29c20 0 32 18 40 33c27 48 121 311 149 577c1 11 2 20 12 29c29 24 49 24 51 24c9 0 10 -1 16 -21c27 -90 59 -194 112 -336\nc48 -129 79 -208 134 -291c31 129 63 259 98 387c46 167 70 240 98 276c12 13 57 55 157 55c14 0 20 0 20 -16c0 -22 -19 -75 -39 -76c-123 -2 -143 -40 -144 -42c-20 -46 -96 -320 -156 -583c-11 -49 -12 -50 -26 -63c-11 -8 -32 -20 -46 -20c-9 0 -10 1 -24 22\nc-61 95 -89 157 -152 327c-45 123 -67 198 -85 250z"
            },
            O: {
                x: 820,
                d: "M770 482c0 -308 -286 -504 -481 -504c-166 0 -239 128 -239 268c0 300 296 459 331 459c2 0 10 0 10 -7c0 -13 -30 -31 -40 -37c-146 -86 -216 -236 -216 -372c0 -143 78 -256 220 -256c185 0 330 202 330 406c0 131 -62 211 -159 211c-40 0 -60 -15 -84 -42\nc-37 -42 -60 -91 -69 -111c-11 -23 -12 -26 -30 -39c-15 -11 -31 -21 -50 -21c-5 0 -10 1 -10 7c0 2 30 92 110 171c7 6 95 90 199 90c122 0 178 -96 178 -223z"
            },
            P: {
                x: 812,
                d: "M377 683h134c116 0 251 -45 251 -159c0 -165 -236 -319 -418 -319c-13 0 -19 0 -19 7c0 6 8 17 26 29c28 18 39 18 60 19c194 6 266 146 266 221c0 100 -117 147 -239 147h-52c-30 -278 -112 -508 -164 -630c-11 -26 -59 -48 -75 -48c-7 0 -10 4 -10 7c0 1 0 3 6 18\nc84 209 144 428 162 653c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 2 3 31 38 71c41 47 148 115 289 115z"
            },
            Q: {
                x: 774,
                d: "M160 28h29c164 0 237 34 302 93c95 84 136 197 136 296c0 133 -76 233 -202 233c-177 0 -290 -195 -290 -320c0 -103 65 -173 155 -173c10 0 52 1 93 24c14 7 31 17 45 17c4 0 11 0 11 -6c0 -24 -114 -90 -215 -90c-111 0 -174 80 -174 186c0 208 237 417 441 417\nc147 0 221 -110 221 -246c0 -241 -218 -414 -391 -463c144 -49 189 -65 255 -65c27 0 48 3 62 43c5 13 7 20 30 35c16 11 37 19 47 19c5 0 9 -3 9 -8c0 -41 -97 -144 -214 -144c-79 0 -150 25 -219 50c-100 35 -141 44 -208 47c-5 0 -10 0 -10 7c0 12 24 28 32 33\nc25 15 36 15 55 15z"
            },
            R: {
                x: 916,
                d: "M434 628h-47c-31 -320 -158 -602 -160 -607c-11 -19 -53 -43 -73 -43c-2 0 -10 0 -10 7c0 1 0 3 5 14c44 107 81 217 108 329c34 146 43 239 48 300c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 8 18 91 152 150\nc84 36 140 36 240 36c151 0 319 0 319 -125c0 -104 -98 -209 -243 -262c23 -27 41 -64 62 -114c34 -78 65 -149 116 -149c49 0 71 31 87 54c21 29 60 43 72 43c3 0 11 0 11 -7c0 -22 -115 -145 -236 -145c-59 0 -85 46 -131 151c-52 118 -72 138 -114 145c-1 0 -5 0 -5 6\nc0 11 34 46 83 48c165 6 213 126 213 187c0 66 -50 113 -242 113z"
            },
            S: {
                x: 803,
                d: "M147 219c-7 -16 -12 -34 -12 -52c0 -68 82 -134 184 -134c152 0 201 84 201 151c0 84 -91 130 -162 162c-48 21 -135 61 -135 145c0 114 160 214 291 214c14 0 60 0 107 -22c27 -12 53 -26 53 -75c0 -39 -11 -52 -24 -62c-20 -17 -44 -27 -57 -27c-4 0 -10 0 -10 7\nc0 3 1 7 2 10c3 11 4 16 4 30c0 43 -26 55 -45 64c-43 19 -85 20 -96 20c-14 0 -70 -3 -100 -29c-31 -27 -40 -66 -40 -87c0 -57 46 -98 116 -130c81 -36 181 -82 181 -177c0 -136 -189 -249 -352 -249c-122 0 -203 74 -203 146c0 100 98 143 132 143c6 0 12 0 12 -7\nc0 -14 -35 -36 -47 -41z"
            },
            T: {
                x: 900,
                d: "M502 621l-112 -446c-21 -83 -65 -185 -71 -195c-15 -21 -64 -48 -84 -48c-5 0 -9 1 -9 7c0 2 0 4 6 16c29 65 50 128 62 177l114 453c2 10 6 25 23 36h-199c-44 0 -52 -8 -62 -20c-20 -26 -22 -45 -23 -62c-2 -24 -65 -57 -89 -57c-8 0 -8 6 -8 12c0 82 139 189 263 189\nh437c19 0 21 0 29 6c25 18 51 28 62 28c5 0 9 -2 9 -7c0 -13 -50 -89 -182 -89h-166z"
            },
            U: {
                x: 805,
                d: "M560 296l-1 1c-43 -58 -88 -118 -157 -183c-102 -95 -193 -136 -255 -136c-71 0 -97 54 -97 120c0 58 21 122 87 272c42 96 78 178 78 222c0 22 -9 36 -31 36c-27 0 -43 -10 -50 -15c-16 -11 -34 -19 -46 -19c-4 0 -11 0 -11 6c0 21 96 83 173 83c18 0 50 -1 50 -48\nc0 -45 -30 -116 -66 -198c-60 -137 -99 -227 -99 -297c0 -66 30 -107 78 -107c71 0 169 116 200 151c99 116 198 281 231 376c12 37 14 42 27 77c8 19 53 46 74 46c4 0 10 0 10 -7c0 -8 -13 -49 -25 -77c-29 -74 -143 -424 -143 -546c0 -14 7 -24 20 -26c11 6 29 15 41 15\nc5 0 10 -2 10 -7c0 -20 -75 -63 -115 -63c-24 0 -41 12 -41 39c0 77 35 201 58 285z"
            },
            V: {
                x: 726,
                d: "M286 86c172 134 346 339 346 420c0 24 -12 77 -79 85c-12 1 -17 1 -17 16c0 13 14 76 43 76c41 0 97 -31 97 -116c0 -67 -38 -156 -89 -234c-127 -193 -369 -378 -380 -378c-7 0 -7 12 -7 17c0 4 0 6 2 18c12 67 25 187 25 288c0 113 -12 342 -158 355c-14 1 -19 1 -19 8\nc0 14 35 42 69 42c182 0 182 -298 182 -369c0 -15 0 -105 -15 -228z"
            },
            W: {
                x: 1102,
                d: "M257 129h1c166 209 256 378 317 493c-2 5 -6 14 -6 18c0 18 43 43 62 43c10 0 11 -4 14 -11c41 -110 99 -339 110 -554c1 -23 1 -24 2 -24c7 0 251 308 251 422c0 66 -46 73 -60 75c-7 1 -12 2 -12 16c0 15 15 76 42 76c31 0 74 -26 74 -106c0 -173 -214 -464 -338 -603\nc-16 -18 -17 -19 -22 -19c-3 0 -6 4 -6 8c-1 3 -2 49 -2 53c-1 53 -6 114 -12 167c-19 163 -53 301 -83 394c-4 -7 -30 -59 -69 -128c-109 -190 -220 -342 -331 -474c-16 -19 -17 -20 -22 -20c-7 0 -7 12 -7 16c0 9 1 13 4 26c6 23 41 197 41 348c0 43 -3 119 -24 182\nc-27 81 -70 102 -113 106c-13 1 -18 1 -18 8c0 14 35 42 69 42c33 0 87 -11 126 -90c34 -72 34 -184 34 -213c0 -85 -9 -169 -22 -251z"
            },
            X: {
                x: 858,
                d: "M479 551l15 -153c69 42 111 68 141 88c85 58 88 73 88 98c0 39 -24 43 -32 44c-1 0 -7 1 -7 7c0 14 46 48 77 48c29 0 47 -22 47 -56c0 -42 0 -77 -311 -263c10 -104 13 -130 16 -162c8 -84 14 -147 71 -147c2 0 7 0 10 1c19 34 63 47 73 47c6 0 11 0 11 -7\nc0 -28 -65 -96 -160 -96c-74 0 -81 66 -89 145c-2 17 -17 167 -17 169c-52 -33 -110 -65 -171 -105c-106 -71 -106 -83 -106 -110c0 -39 24 -43 32 -44c4 -1 7 -2 7 -7c0 -15 -46 -48 -76 -48s-48 22 -48 56c0 29 2 59 116 140c72 50 207 131 243 151l-14 147\nc-10 103 -23 134 -78 134l-2 -1c-18 -34 -62 -47 -73 -47c-5 0 -11 0 -11 7c0 28 65 96 160 96c70 0 80 -57 88 -132z"
            },
            Y: {
                x: 786,
                d: "M427 97c222 216 269 394 269 425c0 29 -15 76 -74 83c-15 2 -19 3 -19 18c0 10 9 60 38 60c38 0 95 -31 95 -116c0 -52 -35 -224 -235 -454c-87 -101 -252 -248 -328 -248c-85 0 -123 73 -123 114c0 25 19 59 31 59c6 0 7 -6 9 -13c19 -83 100 -83 108 -83\nc49 0 149 84 151 86c2 1 2 3 3 11c1 13 5 82 5 142c0 91 -7 180 -26 260c-30 126 -87 191 -175 192c-22 -29 -53 -34 -59 -34c-2 0 -10 0 -10 8c0 15 61 76 130 76c209 0 214 -361 214 -466c0 -28 -1 -82 -4 -120z"
            },
            Z: {
                x: 830,
                d: "M481 351l-290 -265c19 4 43 4 49 4c53 0 128 -10 178 -16c92 -12 127 -12 157 -12c31 35 41 69 47 88c9 29 69 58 88 58c5 0 9 -1 9 -7s-18 -77 -79 -131c-32 -29 -91 -70 -164 -70c-49 0 -116 8 -164 15c-46 5 -111 13 -156 13c-16 0 -33 0 -51 -10\nc-13 -8 -34 -18 -47 -18c-7 0 -8 4 -8 7c0 7 19 24 32 35c83 70 155 135 157 137c130 117 177 164 184 172h-91c-17 0 -26 0 -26 9c0 4 9 34 62 34h100c87 89 133 140 186 202c-11 -3 -23 -3 -35 -3c-36 0 -77 8 -127 17c-60 11 -88 11 -97 11c-68 0 -81 -22 -94 -61\nc-9 -27 -69 -56 -88 -56c-8 0 -9 5 -9 8c0 1 8 59 98 116c53 32 113 55 177 55c39 0 75 -7 130 -17c58 -11 83 -11 101 -11c29 22 55 28 62 28s8 -4 8 -7c0 -10 -133 -160 -228 -255c-8 -9 -24 -24 -24 -26c0 -1 14 -2 16 -2c23 -1 65 -6 65 -31c0 -21 -31 -38 -47 -38\nc-5 0 -13 0 -13 10c-1 2 -2 6 -3 7c-6 5 -25 9 -65 10z"
            }
        }
    };
});
/**
 * Created by hn on 14-4-4.
 */
define("font/kf-ams-main", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS MAIN",
            x: 911,
            "units-per-em": 1e3,
            attr: 'panose-1="2 0 6 3 0 0 0 0 0 0" ascent="800" descent="-200" x-height="441" cap-height="683" bbox="50 -463 1699 1003" underline-thickness="50" underline-position="-100" unicode-range="U+0021-3009"'
        },
        data: {
            "0": {
                x: 482,
                d: "M432 321c0 -97 -11 -171 -34 -223c-33 -76 -85 -114 -157 -114c-73 0 -126 39 -159 117c-21 52 -32 125 -32 220c0 109 15 191 44 246c33 63 82 94 147 94s115 -32 148 -95c29 -55 43 -136 43 -245zM241 0c23 0 46 10 68 28s38 51 47 100c8 39 12 107 12 204\nc0 95 -5 163 -14 204c-9 37 -24 64 -45 82s-44 27 -68 27c-23 0 -46 -9 -68 -27s-37 -45 -46 -84c-9 -41 -13 -108 -13 -202c0 -95 4 -162 11 -201c7 -40 21 -71 41 -95s44 -36 75 -36z"
            },
            "1": {
                x: 397,
                d: "M229 639v-566c0 -19 4 -32 13 -38s34 -9 75 -9h30v-26c-64 1 -113 2 -146 2s-82 -1 -146 -2v26h30c40 0 65 3 74 9s14 19 14 38v527c-33 -20 -74 -30 -123 -30c0 15 0 24 1 25s4 2 9 2c69 3 121 24 154 64c7 0 12 -1 13 -3s2 -8 2 -19z"
            },
            "2": {
                x: 476,
                d: "M426 155l-24 -155h-352v23l199 225c72 82 108 158 108 227c0 46 -13 85 -40 115s-61 45 -104 45c-32 0 -61 -11 -86 -33s-43 -53 -52 -94c4 2 9 3 16 3c9 0 18 -3 27 -9s13 -17 13 -31c0 -15 -4 -26 -13 -32s-18 -9 -27 -9c-5 0 -11 0 -16 2s-11 7 -17 14s-8 16 -8 28\nc0 48 17 92 50 130s75 57 127 57c55 0 102 -17 141 -51s58 -78 58 -135c0 -31 -8 -61 -23 -91s-30 -54 -45 -70s-37 -38 -64 -64c-84 -81 -148 -145 -191 -192h192c57 0 88 3 91 8c8 12 15 42 22 89h18z"
            },
            "3": {
                x: 492,
                d: "M238 340h-49c-10 0 -16 1 -18 2s-3 3 -3 6c0 5 4 8 11 9c1 0 6 0 15 1s15 1 17 1c15 1 27 3 35 4s18 5 30 12s23 16 32 28c25 33 38 73 38 122c0 42 -11 71 -32 88s-44 25 -69 25c-26 0 -53 -6 -81 -18s-49 -31 -62 -60c3 1 7 2 13 2c11 0 21 -3 28 -10s11 -16 11 -29\ns-4 -22 -11 -29s-17 -10 -28 -10c-9 0 -19 3 -27 9s-12 17 -12 32c0 39 16 71 50 97s74 39 121 39c46 0 86 -13 119 -39s50 -58 50 -96c0 -43 -14 -82 -44 -114s-65 -52 -105 -61c49 -6 91 -25 125 -58s50 -73 50 -120c0 -51 -19 -96 -57 -133s-84 -56 -139 -56\nc-53 0 -99 16 -138 48s-58 71 -58 116c0 17 4 28 13 35s19 10 30 10s21 -4 29 -11s13 -18 13 -31s-4 -23 -12 -31s-18 -11 -30 -11c-7 0 -12 1 -15 2c12 -35 35 -60 68 -77s65 -26 98 -26s62 14 86 42s36 69 36 124c0 48 -10 88 -32 119s-54 47 -96 47z"
            },
            "4": {
                x: 518,
                d: "M366 647v-451h102v-26h-102v-98c0 -19 4 -32 11 -38s28 -8 61 -8h19v-26c-21 1 -61 2 -120 2s-99 -1 -120 -2v26h19c33 0 54 2 61 8s11 19 11 38v98h-258v26l297 473c9 0 15 -1 17 -3s2 -8 2 -19zM311 581l-241 -385h241v385z"
            },
            "5": {
                x: 476,
                d: "M123 585v-225c35 37 77 55 128 55c49 0 90 -20 124 -61s51 -92 51 -152c0 -63 -20 -115 -60 -156s-88 -62 -141 -62c-51 0 -92 18 -125 54s-50 78 -50 124c0 28 13 42 38 42c11 0 20 -4 27 -10s11 -15 11 -28c0 -14 -4 -24 -12 -30s-17 -8 -26 -8c-3 0 -8 1 -16 3\nc9 -37 27 -67 56 -89s61 -34 95 -34c46 0 82 21 107 62c20 31 30 76 30 136c0 40 -4 74 -12 102s-17 47 -30 59s-24 20 -35 25s-22 7 -33 7c-53 0 -95 -21 -126 -64c-4 -6 -8 -9 -12 -9c-5 0 -7 1 -8 4s-2 9 -2 19v290c0 14 2 21 6 21c2 0 7 -2 14 -5c39 -17 80 -26 124 -26\nc42 0 84 9 126 27c5 3 9 4 11 4c4 0 6 -4 6 -13c-14 -14 -27 -26 -38 -35s-30 -18 -55 -28s-51 -16 -80 -16c-34 0 -65 6 -93 17z"
            },
            "6": {
                x: 482,
                d: "M118 345v-34c26 73 70 110 131 110c51 0 95 -20 130 -61s53 -93 53 -155c0 -65 -18 -118 -56 -159s-82 -62 -133 -62c-17 0 -34 3 -51 8s-34 16 -52 31s-33 35 -46 59s-24 56 -32 96s-12 86 -12 138c0 105 25 188 74 251s106 94 170 94c35 0 64 -9 86 -27s33 -41 33 -72\nc0 -15 -4 -25 -12 -30s-16 -8 -24 -8c-9 0 -17 3 -25 9s-11 15 -11 27c0 23 15 35 46 35c-15 29 -45 43 -92 43c-15 0 -29 -2 -43 -7s-30 -13 -47 -27s-31 -31 -43 -52s-24 -50 -32 -86s-12 -76 -12 -121zM243 8c44 0 77 21 100 64c14 27 21 71 21 134c0 61 -6 104 -18 130\nc-22 46 -55 69 -99 69c-42 0 -74 -18 -95 -55s-32 -78 -32 -121c0 -14 0 -27 1 -39s3 -29 7 -54s10 -45 18 -62s20 -32 37 -46s37 -20 60 -20z"
            },
            "7": {
                x: 505,
                d: "M455 623l-138 -205c-49 -74 -74 -188 -74 -341v-46c0 -31 -12 -47 -36 -47s-36 15 -36 46c0 64 11 132 34 202s53 133 91 190l111 165h-220c-61 0 -93 -3 -97 -8c-7 -11 -15 -41 -22 -89h-18l29 187h18c2 -8 5 -13 8 -17s15 -7 33 -10s45 -5 82 -5h235v-22z"
            },
            "8": {
                x: 492,
                d: "M289 360l52 -37c14 -9 25 -18 33 -25s20 -17 32 -30s21 -28 27 -46s9 -38 9 -59c0 -51 -19 -93 -58 -127s-85 -52 -139 -52c-51 0 -97 15 -136 46s-59 72 -59 121c0 26 6 49 16 71s25 40 44 56s34 28 46 36s27 16 44 25c-45 31 -71 51 -79 59c-30 29 -45 65 -45 106\nc0 45 16 82 50 112s74 45 121 45c43 0 82 -13 117 -39s52 -62 52 -105c0 -61 -42 -114 -127 -157zM158 448l105 -71c5 -4 9 -6 10 -6c4 0 15 5 31 16s33 28 51 52s27 50 27 78c0 33 -14 61 -40 85s-58 36 -97 36c-37 0 -68 -10 -95 -31s-40 -46 -40 -76c0 -14 4 -28 11 -41\ns15 -23 21 -29s11 -10 16 -13zM342 243l-125 85c-37 -17 -68 -40 -93 -72s-37 -67 -37 -104c0 -40 15 -74 46 -102s69 -42 114 -42c43 0 80 13 111 38s47 55 47 92c0 39 -21 74 -63 105z"
            },
            "9": {
                x: 482,
                d: "M364 296v39c-3 -10 -8 -20 -14 -31s-13 -23 -23 -36s-23 -24 -40 -32s-35 -12 -54 -12c-51 0 -95 21 -130 62s-53 93 -53 154c0 65 19 118 58 159s84 62 136 62c21 0 42 -5 62 -14s40 -25 60 -47s36 -58 48 -104s18 -101 18 -166c0 -105 -23 -189 -70 -252\ns-101 -94 -162 -94c-38 0 -69 8 -94 25s-37 41 -37 74c0 15 4 25 12 30s16 8 24 8c9 0 17 -3 25 -9s11 -15 11 -27c0 -11 -3 -19 -10 -26s-15 -10 -26 -10c-1 0 -2 1 -4 1h-5c17 -28 51 -42 102 -42c45 0 83 23 116 69s50 119 50 219zM235 240c29 0 55 10 75 30s34 44 41 69\ns11 51 11 78v31s-2 24 -4 44s-6 36 -11 51s-12 29 -20 45s-19 28 -33 37s-31 13 -50 13c-41 0 -73 -18 -98 -55c-13 -20 -21 -40 -24 -60s-4 -48 -4 -84c0 -63 7 -108 21 -134c23 -43 55 -65 96 -65z"
            },
            "!": {
                x: 182,
                d: "M132 670l-31 -483c-1 -5 -1 -9 -1 -11s-2 -4 -3 -5s-3 -2 -6 -2s-5 1 -6 2s-3 3 -3 5s0 6 -1 11l-31 483c0 13 4 23 13 30s18 10 28 10s19 -3 28 -10s13 -17 13 -30zM132 41c0 -11 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 18 -12 29s4 21 12 29s18 12 29 12\ns21 -4 29 -12s12 -18 12 -29z"
            },
            "#": {
                x: 779,
                d: "M489 143l-80 -316c-3 -15 -10 -22 -19 -22c-5 0 -10 1 -13 5s-5 8 -5 13c0 3 1 9 4 18l77 302h-181l-80 -316c-4 -15 -10 -22 -19 -22c-5 0 -9 1 -13 5s-5 8 -5 13c0 3 1 9 4 18l77 302h-152c-23 0 -34 6 -34 18c0 11 10 17 30 17h166l34 143h-200c-20 0 -30 6 -30 17\nc0 12 11 18 34 18h206l80 316c4 15 10 22 19 22c5 0 9 -2 13 -5s5 -8 5 -13c0 -3 -1 -9 -4 -18l-77 -302h181l80 316c3 15 10 22 19 22c5 0 10 -2 13 -5s5 -8 5 -13c0 -3 -1 -9 -4 -18l-77 -302h152c23 0 34 -6 34 -18c0 -11 -10 -17 -30 -17h-166l-34 -143h200\nc20 0 30 -6 30 -17c0 -12 -11 -18 -34 -18h-206zM282 178h181l34 143h-181z"
            },
            $: {
                x: 466,
                d: "M246 676v-285c19 -5 34 -9 44 -12s23 -10 38 -19s28 -20 39 -33c33 -39 49 -84 49 -136c0 -51 -16 -96 -47 -134s-72 -59 -123 -64v-48h-26v47c-53 3 -95 21 -125 56s-45 79 -45 130c0 27 12 41 36 41c9 0 16 -3 24 -9s12 -14 12 -27c0 -11 -4 -21 -11 -27s-16 -9 -25 -9\nc-7 0 -12 1 -16 3c8 -45 27 -78 56 -98s60 -32 94 -34v312c-24 7 -41 12 -51 15s-21 9 -34 17s-25 17 -37 30c-32 36 -48 78 -48 126s16 89 48 124s73 55 122 60v47h26v-47c56 -3 98 -21 127 -54s43 -73 43 -118c0 -27 -12 -41 -36 -41c-9 0 -18 3 -25 9s-11 16 -11 27\nc0 13 4 21 12 27s15 9 24 9c6 0 11 -1 15 -3c-15 74 -65 113 -149 118zM220 399v276c-40 -4 -72 -20 -95 -47s-35 -57 -35 -90c0 -35 13 -67 39 -95c19 -20 50 -35 91 -44zM246 323v-304c39 4 70 21 94 51s36 63 36 100c0 40 -13 75 -40 106c-21 23 -51 38 -90 47z"
            },
            "%": {
                x: 779,
                d: "M729 146c0 -57 -13 -106 -37 -144s-53 -57 -87 -57c-36 0 -67 19 -95 57s-42 85 -42 144s14 106 42 144s59 57 95 57c34 0 63 -19 87 -57s37 -87 37 -144zM606 -39c28 0 53 17 74 53s31 80 31 132s-10 96 -31 132s-46 53 -74 53c-8 0 -17 -2 -26 -7s-18 -12 -29 -24\ns-19 -32 -26 -58s-10 -58 -10 -96c0 -37 3 -69 10 -96s15 -46 26 -58s20 -19 29 -24s18 -7 26 -7zM642 714l-476 -753c-7 -11 -13 -16 -19 -16c-5 0 -9 2 -13 5s-5 8 -5 13c0 3 3 10 9 19l432 684l-1 1c-40 -27 -85 -41 -135 -41c-52 0 -101 15 -147 44\nc16 -32 24 -73 24 -122c0 -57 -13 -106 -37 -144s-53 -57 -87 -57c-36 0 -67 19 -95 57s-42 85 -42 144s14 106 42 144s59 57 95 57c21 0 43 -10 66 -31c53 -51 113 -76 180 -76c77 0 136 31 179 92c9 10 16 15 21 15c11 0 17 -6 17 -18c0 -3 -3 -8 -8 -17zM188 363\nc28 0 53 17 74 53s31 80 31 132s-10 96 -31 132s-46 53 -74 53c-8 0 -17 -2 -26 -7s-18 -12 -29 -24s-19 -32 -26 -58s-10 -58 -10 -96c0 -37 3 -69 10 -96s15 -46 26 -58s20 -19 29 -24s18 -7 26 -7z"
            },
            "&": {
                x: 745,
                d: "M84 214l124 144c-25 73 -38 140 -38 201c0 46 12 83 36 110s52 41 84 41c15 0 29 -4 40 -13s19 -19 24 -33s8 -28 10 -40s4 -24 4 -36c0 -43 -38 -110 -114 -201c33 -88 88 -180 163 -275c25 28 54 69 85 124c44 74 66 116 66 127c0 13 -6 23 -17 30s-26 11 -43 11v26\nc19 -1 55 -2 106 -2c41 0 68 1 81 2v-26c-35 -1 -64 -11 -87 -30c-9 -8 -29 -40 -62 -96c-44 -80 -83 -140 -117 -181c13 -15 24 -28 33 -37s22 -20 42 -32s39 -18 57 -18c26 0 51 10 75 29s35 47 36 82h18c-1 -41 -14 -74 -40 -99s-56 -38 -93 -38c-53 0 -107 26 -162 77\nc-54 -51 -112 -77 -174 -77c-47 0 -88 14 -121 42s-50 61 -50 102c0 31 11 60 34 86zM248 406c68 79 102 140 102 183c0 7 -1 14 -2 23s-3 20 -6 34s-9 25 -18 34s-20 14 -33 14c-19 0 -36 -9 -51 -28s-22 -48 -22 -88c0 -60 10 -117 30 -172zM215 341l-62 -71\nc-26 -30 -39 -67 -39 -112c0 -37 10 -71 30 -102s49 -46 86 -46c55 0 106 22 152 65c-67 77 -123 166 -167 266z"
            },
            "(": {
                x: 316,
                d: "M266 -194c0 -4 -2 -6 -7 -6s-15 8 -31 22s-34 35 -56 64s-40 60 -55 91c-45 96 -67 204 -67 323c0 115 21 220 64 315c15 33 33 65 56 95s42 52 58 67s26 22 31 22s7 -2 7 -5c0 -1 0 -3 -1 -4l-1 -2c-15 -15 -28 -28 -38 -40s-24 -34 -42 -64s-34 -60 -45 -92\ns-22 -74 -31 -126s-14 -108 -14 -167c0 -209 56 -372 169 -487c2 -2 3 -4 3 -6z"
            },
            ")": {
                x: 316,
                d: "M266 299c0 -115 -21 -220 -64 -315c-15 -33 -33 -65 -56 -95s-42 -52 -58 -67s-26 -22 -31 -22s-7 2 -7 6c0 1 1 2 2 5c15 15 28 29 38 41s24 32 42 62s34 62 45 94s22 74 31 126s14 107 14 166s-5 114 -14 166s-20 93 -31 125s-26 63 -45 93s-33 52 -43 64\ns-22 25 -37 40c-1 3 -2 4 -2 5c0 4 2 6 7 6s15 -7 31 -21s34 -37 56 -66s40 -59 55 -90c45 -96 67 -204 67 -323z"
            },
            ",": {
                x: 208,
                d: "M158 -4c0 -35 -7 -67 -20 -98s-27 -54 -40 -69s-21 -22 -25 -22c-7 0 -10 3 -10 10c0 3 4 8 11 16c43 48 64 102 64 163c0 13 -1 19 -2 19s-3 -1 -4 -2c-9 -9 -20 -13 -33 -13c-16 0 -29 5 -37 15s-12 21 -12 34c0 12 4 23 13 33s20 15 35 15c20 0 35 -9 45 -27\ns15 -43 15 -74z"
            },
            ".": {
                x: 197,
                d: "M147 48c0 -13 -5 -24 -14 -34s-21 -14 -35 -14c-13 0 -24 5 -34 14s-14 21 -14 35c0 13 5 23 14 33s21 15 35 15c13 0 23 -5 33 -14s15 -21 15 -35z"
            },
            "/": {
                x: 481,
                d: "M425 713l-335 -941c-5 -15 -12 -22 -22 -22c-5 0 -8 2 -12 6s-6 8 -6 13c0 1 1 4 3 9l3 9l335 941c5 15 13 22 22 22c5 0 9 -2 13 -6s5 -8 5 -13c0 -1 -1 -4 -3 -9z"
            },
            ":": {
                x: 182,
                d: "M132 389c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29zM132 41c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29z"
            },
            ";": {
                x: 185,
                d: "M132 389c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29zM119 -11v21c-7 -7 -16 -10 -28 -10c-11 0 -21 4 -29 11s-12 17 -12 30s4 23 12 30s18 11 29 11c29 0 44 -30 44 -91\nc0 -35 -6 -67 -17 -98s-22 -53 -32 -67s-16 -20 -19 -20c-5 0 -8 3 -8 9c0 2 2 5 6 10c36 51 54 105 54 164z"
            },
            "?": {
                x: 439,
                d: "M215 225v-35c0 -7 -1 -12 -1 -14s-1 -4 -2 -5s-3 -2 -6 -2c-4 0 -7 1 -8 3s-1 9 -1 18v39c0 94 30 173 90 238c8 9 15 16 19 22s8 17 12 31s7 30 7 49c0 11 0 20 -1 27s-3 18 -7 30s-9 22 -17 30s-20 15 -36 21s-34 9 -56 9c-29 0 -57 -7 -82 -22s-42 -37 -52 -66\nc4 1 8 2 12 2c9 0 18 -4 25 -10s11 -15 11 -26c0 -13 -4 -22 -12 -28s-16 -8 -24 -8c-3 0 -7 0 -11 1s-9 4 -15 11s-10 16 -10 27c0 35 14 67 44 94s69 41 116 41c57 0 101 -13 132 -38s47 -58 47 -100c0 -43 -18 -78 -54 -105c-37 -29 -67 -65 -88 -105s-32 -83 -32 -129z\nM247 41c0 -11 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 18 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -18 12 -29z"
            },
            A: {
                x: 772,
                d: "M186 111l350 586c7 11 15 17 25 17c6 0 11 -1 13 -4s3 -9 4 -18l61 -624c1 -17 5 -27 11 -32s22 -7 48 -7c16 0 24 -3 24 -10c0 -6 -2 -10 -4 -13s-4 -6 -6 -6h-8h-3h-8s-7 1 -12 1h-16c-6 0 -12 1 -19 1h-24h-24h-57c-6 0 -15 0 -27 -1s-21 -1 -27 -1\nc-10 0 -15 4 -15 11c0 12 7 18 22 18c45 0 67 11 67 32c0 13 -5 62 -15 149c0 3 0 7 -1 13s-1 10 -1 13h-255l-76 -126c-13 -21 -19 -37 -19 -47c0 -20 14 -31 42 -34c9 0 14 -3 14 -10c0 -13 -6 -19 -18 -19c-9 0 -24 0 -44 1s-35 1 -45 1c-6 0 -20 0 -41 -1s-34 -1 -40 -1\nc-8 0 -12 3 -12 10c0 8 1 13 4 15s8 3 15 4c25 1 46 9 64 21s36 32 53 61zM306 265h235l-34 336z"
            },
            B: {
                x: 795,
                d: "M368 615l-62 -250h144c62 0 113 20 153 59s60 80 60 125c0 5 -1 10 -1 15s-2 14 -6 26s-11 21 -18 30s-18 17 -33 24s-34 10 -55 10h-130c-20 0 -33 -2 -38 -6s-9 -15 -14 -33zM537 357c43 -4 79 -18 109 -43s44 -58 44 -97c0 -53 -26 -102 -80 -148s-118 -69 -191 -69\nh-343c-11 0 -18 1 -21 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8s15 18 20 37l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 6 16s11 3 22 3h321c55 0 100 -13 133 -39s49 -59 49 -99c0 -45 -20 -84 -61 -119\ns-90 -58 -147 -69zM395 29c59 0 109 20 150 61s61 86 61 137v15s-4 16 -8 30s-10 24 -17 34s-19 19 -35 27s-36 12 -58 12h-188l-70 -282c-3 -12 -4 -19 -4 -22c0 -4 1 -7 2 -8s5 -2 10 -3c4 -1 11 -1 22 -1h135z"
            },
            C: {
                x: 797,
                d: "M747 695l-63 -255c-2 -9 -4 -14 -6 -16s-5 -3 -10 -3c-9 0 -13 3 -13 9c0 1 1 4 1 9s0 12 1 20s1 16 1 23c0 55 -13 101 -40 138s-67 55 -119 55c-45 0 -90 -12 -134 -35s-81 -51 -110 -85c-26 -30 -49 -63 -67 -101s-31 -73 -38 -106s-11 -60 -14 -80s-4 -37 -4 -50\nc0 -67 18 -120 56 -156s85 -54 142 -54c55 0 111 20 166 61s94 97 115 170c3 7 7 10 12 10c7 0 11 -3 11 -9c0 -5 -3 -16 -9 -33s-18 -40 -37 -69s-41 -54 -67 -76c-65 -55 -135 -83 -208 -83c-75 0 -137 25 -187 75s-76 115 -76 196c0 57 12 114 38 170s59 105 100 146\ns88 74 142 100s107 38 160 38c73 0 128 -31 165 -94l69 84c5 7 10 10 14 10c6 0 9 -3 9 -9z"
            },
            D: {
                x: 842,
                d: "M160 74l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 6 16s11 3 22 3h321c70 0 126 -24 167 -71s62 -107 62 -180s-19 -143 -57 -210s-88 -120 -150 -161s-126 -61 -192 -61h-317c-11 0 -19 1 -22 2s-4 4 -4 9c0 8 2 13 6 15\ns12 3 23 3c33 0 53 3 61 8s15 18 20 37zM371 615l-138 -552c-3 -12 -4 -19 -4 -22c0 -4 1 -7 2 -8s5 -2 10 -3c4 -1 11 -1 22 -1h114c50 0 93 11 131 33s67 44 88 69c42 48 72 105 90 172s27 121 27 162c0 65 -17 112 -51 143s-77 46 -129 46h-110c-20 0 -32 -2 -37 -6\ns-10 -15 -15 -33z"
            },
            E: {
                x: 807,
                d: "M699 232l-91 -215c-3 -8 -7 -13 -10 -15s-9 -2 -20 -2h-502c-11 0 -18 1 -21 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8s15 18 20 37l135 540c3 10 4 17 4 20c0 5 -1 8 -2 10s-7 4 -17 6s-24 2 -43 2c-10 0 -16 1 -19 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3\nh488c11 0 18 0 22 -1s5 -5 5 -10c0 -1 0 -3 -1 -7s-1 -7 -1 -8l-21 -175c-1 -15 -6 -22 -13 -22s-11 4 -11 11c0 3 1 7 2 12c3 22 4 43 4 62c0 40 -10 69 -30 85s-59 24 -118 24h-143c-20 0 -32 -2 -37 -6s-10 -14 -15 -32l-62 -246h95c43 0 74 7 90 20s29 39 39 79\nc2 8 3 13 5 15s5 3 9 3c7 0 10 -3 10 -10l-57 -232c-6 -13 -11 -20 -14 -21c-7 0 -11 3 -11 10c0 3 1 7 3 11c5 20 7 36 7 49c0 17 -5 29 -15 36s-33 11 -69 11h-99l-69 -276c-3 -12 -4 -19 -4 -22c0 -4 1 -7 2 -8s5 -2 10 -3c4 -1 11 -1 22 -1h146c40 0 73 4 100 11\ns49 20 69 38s36 38 49 60s27 52 44 91c7 15 10 23 11 23c3 3 6 4 9 4c7 0 10 -3 10 -10c0 -1 -1 -6 -4 -14z"
            },
            F: {
                x: 793,
                d: "M301 326l-64 -255c-3 -9 -4 -16 -4 -20c0 -6 1 -10 3 -13s10 -4 22 -6s31 -3 56 -3c12 0 20 0 23 -1s5 -5 5 -10c0 -12 -7 -18 -21 -18c-7 0 -19 0 -34 1s-27 1 -34 1h-130c-6 0 -16 0 -29 -1s-23 -1 -29 -1c-10 0 -15 4 -15 11c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8\ns15 18 20 37l135 540c3 10 4 17 4 20c0 5 -1 8 -2 10s-7 4 -17 6s-24 2 -43 2c-10 0 -16 1 -19 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3h474c11 0 18 0 22 -1s5 -5 5 -10c0 -1 0 -3 -1 -7s-1 -7 -1 -8l-21 -175c-1 -15 -6 -22 -13 -22s-11 4 -11 11c0 6 1 13 3 21\nc2 17 3 35 3 54c0 39 -10 66 -28 83s-56 25 -115 25h-134c-20 0 -32 -2 -37 -6s-10 -14 -15 -32l-65 -259h91c43 0 72 6 88 19s29 38 40 77c2 9 3 15 5 17s5 4 9 4c7 0 10 -3 10 -10l-58 -233c-2 -9 -4 -15 -5 -17s-4 -3 -8 -3c-7 0 -11 4 -11 11c0 3 1 7 3 11\nc5 21 7 37 7 49c0 17 -5 29 -15 36s-32 10 -67 10h-96z"
            },
            G: {
                x: 796,
                d: "M746 695l-63 -255c-2 -9 -3 -14 -5 -16s-6 -3 -11 -3c-9 0 -13 3 -13 9c0 5 1 14 2 26s2 21 2 26c0 33 -4 64 -14 92s-27 51 -52 71s-57 30 -94 30c-43 0 -86 -11 -130 -33s-82 -51 -114 -88c-43 -50 -73 -107 -92 -170s-29 -118 -29 -163c0 -41 7 -75 20 -105\ns31 -52 53 -67s43 -25 64 -31s43 -10 65 -10c33 0 67 7 100 20s59 33 76 59c5 9 11 25 17 47s12 41 16 58s5 26 5 27c0 6 -1 10 -3 13s-8 5 -20 7s-31 3 -56 3h-25h-1c-1 1 -2 1 -3 2s-2 2 -3 4s-1 3 -1 5c0 12 7 18 21 18c13 0 34 0 63 -1s50 -1 64 -1h54c6 0 15 0 27 1\ns22 1 27 1c9 0 13 -3 13 -10c0 -13 -5 -19 -16 -19c-27 -1 -44 -3 -50 -7s-12 -16 -17 -35c-3 -11 -6 -25 -10 -40s-7 -28 -9 -37l-16 -64c-1 -5 -4 -12 -6 -21s-4 -18 -6 -24s-2 -9 -2 -10l-2 -2c-1 -1 -3 -1 -5 -1c-4 0 -10 6 -19 19s-16 29 -21 46\nc-23 -29 -55 -52 -94 -66s-79 -21 -119 -21c-76 0 -139 25 -189 75s-75 115 -75 196c0 77 22 150 65 221s99 127 167 169s136 64 207 64c39 0 72 -9 101 -27c24 -14 45 -36 64 -66l69 83c5 7 10 10 14 10c6 0 9 -3 9 -9z"
            },
            H: {
                x: 912,
                d: "M752 610l-137 -547c-1 -5 -2 -11 -2 -16c0 -4 1 -7 2 -9s7 -4 16 -6s24 -3 43 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3s-16 0 -29 1s-23 1 -30 1h-118c-7 0 -17 0 -30 -1s-22 -1 -28 -1c-9 0 -14 3 -14 10c0 9 2 14 5 16s9 3 16 3c23 1 39 1 47 2\ns17 3 24 7s12 12 15 22c1 1 6 21 15 58s18 78 30 125c18 70 18 70 25 98h-303l-69 -278c-1 -5 -2 -11 -2 -16c0 -4 1 -7 2 -9s7 -4 16 -6s24 -3 43 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3s-16 0 -29 1s-23 1 -30 1h-118c-7 0 -17 0 -30 -1s-22 -1 -28 -1\nc-9 0 -14 3 -14 10c0 9 2 14 6 16s11 3 24 3c33 0 53 3 61 8s14 18 19 37l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-23 3 -42 3h-13c-2 0 -4 0 -7 1s-4 2 -5 3s-1 3 -1 6c0 13 6 19 19 19c7 0 17 0 30 -1s23 -1 29 -1h118c7 0 16 0 29 1s23 1 29 1c10 0 15 -4 15 -11\nc0 -8 -2 -13 -6 -15s-11 -3 -22 -3c-33 0 -54 -3 -62 -8s-15 -17 -20 -36l-60 -240h302l61 242c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-23 3 -42 3h-13c-2 0 -4 0 -7 1s-4 2 -5 3s-1 3 -1 6c0 13 6 19 19 19c7 0 17 0 30 -1s23 -1 29 -1h118c7 0 16 0 29 1s23 1 29 1\nc10 0 15 -4 15 -11c0 -8 -2 -13 -6 -15s-11 -3 -22 -3c-33 0 -54 -3 -62 -8s-15 -17 -20 -36z"
            },
            I: {
                x: 541,
                d: "M377 609l-135 -537c-3 -11 -4 -18 -4 -23s1 -9 2 -11s6 -4 16 -6s25 -3 44 -3c12 0 20 0 23 -1s5 -5 5 -10c0 -12 -7 -18 -20 -18c-7 0 -17 0 -31 1s-24 1 -31 1h-123c-6 0 -16 0 -29 -1s-23 -1 -29 -1c-10 0 -15 3 -15 10c0 9 2 14 6 16s12 3 25 3c34 0 55 3 64 8\ns15 18 20 37l135 539c3 12 4 19 4 22c0 5 -1 8 -2 10s-6 4 -16 6s-25 3 -44 3h-13c-3 0 -5 0 -8 1s-4 2 -5 3s-2 3 -2 6c0 9 2 14 5 16s8 3 14 3c7 0 17 0 31 -1s25 -1 32 -1h123c6 0 16 0 29 1s23 1 29 1c9 0 14 -3 14 -10c0 -9 -2 -14 -6 -16s-12 -3 -24 -3\nc-34 0 -55 -3 -64 -8s-15 -18 -20 -37z"
            },
            J: {
                x: 640,
                d: "M505 614l-118 -471c-12 -47 -39 -86 -81 -117s-85 -47 -132 -47c-36 0 -66 10 -89 30s-35 46 -35 77c0 28 7 47 20 58s26 17 40 17c13 0 23 -3 30 -11s10 -17 10 -26c0 -15 -6 -28 -18 -40s-25 -18 -41 -18c-3 0 -8 1 -13 2c5 -24 18 -41 36 -52s37 -17 58 -17\nc27 0 54 13 82 40s47 64 59 111l115 457c3 11 4 19 4 24c0 6 -1 10 -3 13s-9 5 -21 7s-31 3 -56 3h-25h-1c-1 1 -2 1 -3 2s-2 2 -3 4s-1 3 -1 5c0 12 7 18 21 18s35 0 64 -1s50 -1 64 -1h55c6 0 15 0 27 1s22 1 27 1c9 0 13 -4 13 -11c0 -8 -2 -13 -6 -15s-10 -3 -20 -3\nc-23 0 -37 -3 -43 -8s-11 -15 -16 -32z"
            },
            K: {
                x: 928,
                d: "M504 404l139 -330c7 -18 15 -30 24 -36s22 -8 41 -9c13 0 19 -3 19 -10c0 -13 -6 -19 -17 -19c-5 0 -13 0 -24 1s-18 1 -23 1h-48c-11 0 -29 0 -53 -1s-42 -1 -54 -1c-9 0 -14 3 -14 10c0 9 2 14 5 16s8 3 14 3c33 0 49 10 49 31c0 6 -2 12 -5 19\nc-67 161 -108 258 -123 290l-152 -119l-39 -155c-7 -27 -10 -43 -10 -48c0 -4 1 -7 2 -9s7 -4 16 -6s24 -3 43 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3s-16 0 -29 1s-23 1 -30 1h-117c-6 0 -16 0 -29 -1s-23 -1 -29 -1c-10 0 -15 4 -15 11c0 8 2 13 6 15\ns12 3 23 3c33 0 53 3 61 8s15 18 20 37l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 5 16s8 3 14 3s16 0 29 -1s23 -1 29 -1h118c7 0 16 0 29 1s23 1 29 1c10 0 15 -3 15 -10c0 -9 -2 -14 -6 -16s-11 -3 -22 -3\nc-33 0 -54 -3 -62 -8s-15 -17 -20 -36l-83 -330l392 305c25 19 38 36 38 50c0 11 -8 18 -24 19c-9 0 -13 4 -13 11c0 12 6 18 19 18c10 0 26 0 47 -1s36 -1 47 -1h38c3 0 9 0 17 1s13 1 17 1c7 0 11 -4 11 -11c0 -5 -2 -9 -4 -12s-4 -4 -5 -4s-4 -1 -8 -2\nc-32 -3 -62 -12 -91 -30s-81 -56 -156 -115l-97 -76c-12 -9 -18 -14 -18 -15s0 -2 1 -4s1 -4 2 -6s2 -3 2 -4z"
            },
            L: {
                x: 685,
                d: "M371 606l-136 -543c-3 -12 -4 -19 -4 -22c0 -4 1 -7 2 -8s5 -2 10 -3c4 -1 11 -1 22 -1h96c33 0 62 4 88 13s47 20 63 32s30 27 44 48s23 38 29 52s13 33 22 56c6 15 9 22 10 22c1 3 4 4 8 4c7 0 10 -3 10 -10c0 -3 -1 -7 -4 -14l-77 -213c-3 -9 -7 -15 -10 -17\ns-9 -2 -20 -2h-448c-11 0 -18 1 -21 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8s15 18 20 37l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 5 16s8 3 14 3s16 0 30 -1s24 -1 30 -1h134c7 0 17 0 31 1s25 1 32 1\nc10 0 15 -3 15 -10c0 -9 -2 -14 -6 -16s-13 -3 -28 -3c-41 0 -67 -2 -77 -8s-18 -19 -23 -40z"
            },
            M: {
                x: 1069,
                d: "M909 610l-137 -547c-1 -5 -2 -11 -2 -16c0 -4 1 -7 2 -9s7 -4 16 -6s24 -3 43 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3s-15 0 -28 1s-22 1 -27 1h-118c-5 0 -14 0 -27 -1s-22 -1 -27 -1c-10 0 -15 4 -15 11c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8\ns15 18 20 37l145 579h-1l-402 -636c-6 -11 -13 -17 -21 -17c-5 0 -8 1 -9 4s-3 11 -4 23l-83 621h-1l-138 -551c-3 -9 -4 -18 -4 -25c0 -27 22 -42 65 -43c9 0 14 -3 14 -10c0 -6 -1 -10 -3 -13s-5 -6 -7 -6h-8c-5 0 -13 0 -23 1s-17 1 -22 1h-48c-7 0 -22 0 -46 -1\ns-38 -1 -45 -1c-9 0 -13 4 -13 11c0 12 5 18 15 18c33 1 56 8 71 19s25 29 31 54l128 510c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 6 16s11 3 22 3h124c13 0 21 -1 24 -3s5 -8 6 -19l75 -572l365 577c5 8 10 12 14 14s11 3 23 3h120\nh13c2 0 4 0 7 -1s4 -2 5 -3s1 -3 1 -6c0 -9 -2 -14 -6 -16s-11 -3 -22 -3c-33 0 -55 -3 -63 -8s-14 -17 -19 -36z"
            },
            N: {
                x: 912,
                d: "M744 578l-140 -558c-2 -9 -4 -14 -6 -16s-4 -4 -9 -4c-6 0 -11 6 -16 18l-238 593c-5 11 -8 18 -10 21l-135 -535c-3 -11 -4 -19 -4 -25c0 -27 22 -42 65 -43c9 0 14 -3 14 -10c0 -6 -1 -10 -3 -13s-5 -6 -7 -6h-8c-5 0 -13 0 -23 1s-17 1 -22 1h-48c-7 0 -22 0 -46 -1\ns-38 -1 -45 -1c-9 0 -13 3 -13 10c0 13 5 19 15 19c32 1 56 8 71 19s25 29 31 54l133 530c2 6 3 10 3 13c0 6 -21 9 -64 9h-13c-2 0 -4 0 -7 1s-4 2 -5 3s-1 3 -1 6c0 9 2 14 6 16s12 3 23 3h122c11 0 17 -1 20 -3s7 -6 10 -14l214 -532l113 451c3 13 4 21 4 26\nc0 8 -1 14 -3 19s-8 11 -18 16s-24 7 -43 8c-10 0 -15 3 -15 10c0 13 6 19 18 19c5 0 12 0 23 -1s18 -1 23 -1h48c7 0 22 0 46 1s38 1 45 1c9 0 13 -4 13 -11c0 -12 -5 -18 -15 -18c-35 -1 -59 -8 -73 -20s-23 -31 -30 -56z"
            },
            O: {
                x: 778,
                d: "M728 438c0 -58 -13 -115 -38 -172s-58 -107 -98 -148s-86 -74 -138 -100s-104 -39 -155 -39c-73 0 -132 24 -179 73s-70 113 -70 191c0 75 20 149 62 221s96 130 163 174s135 66 205 66c72 0 131 -24 178 -72s70 -113 70 -194zM305 2c39 0 80 13 122 38s81 62 116 111\nc32 45 58 99 77 160s28 116 28 163c0 68 -16 120 -50 155s-75 53 -123 53c-36 0 -74 -10 -113 -30s-76 -52 -111 -94c-38 -46 -67 -102 -86 -166s-29 -122 -29 -174c0 -73 17 -126 50 -162s73 -54 119 -54z"
            },
            P: {
                x: 793,
                d: "M299 318l-64 -255c-1 -7 -2 -12 -2 -17c0 -4 1 -7 3 -9s7 -3 16 -5s23 -3 42 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3c-7 0 -17 0 -30 1s-23 1 -29 1h-117c-7 0 -16 0 -29 -1s-23 -1 -29 -1c-10 0 -15 4 -15 11c0 8 2 13 6 15s12 3 23 3c33 0 53 3 61 8\ns15 18 20 37l135 538c3 10 4 18 4 23s-1 8 -2 10s-7 4 -16 6s-24 3 -43 3c-16 0 -24 3 -24 10c0 9 2 14 6 16s11 3 22 3h309c60 0 107 -14 141 -43s51 -65 51 -106c0 -56 -28 -106 -85 -150s-121 -66 -191 -66h-168zM371 615l-68 -273h141c69 0 121 19 156 56\nc20 20 34 46 44 78s15 59 15 79c0 66 -46 99 -137 99h-99c-20 0 -32 -2 -37 -6s-10 -15 -15 -33z"
            },
            Q: {
                x: 778,
                d: "M428 6c3 -41 9 -69 18 -86s26 -26 51 -26c23 0 47 9 69 27s38 42 49 72c3 11 6 16 11 16c6 0 9 -3 9 -10c0 -3 -1 -11 -5 -23s-10 -28 -18 -48s-19 -38 -31 -56s-28 -33 -47 -46s-40 -20 -62 -20c-53 0 -80 35 -80 104c0 16 2 44 6 84c-32 -10 -65 -15 -99 -15\nc-73 0 -132 24 -179 73s-70 113 -70 191c0 75 20 149 62 221s96 130 163 174s135 66 205 66c72 0 131 -24 178 -72s70 -113 70 -194c0 -90 -29 -176 -86 -258s-128 -139 -214 -174zM248 11c-5 9 -8 20 -8 33c0 25 10 48 30 70s44 33 70 33c49 0 78 -37 85 -111\nc44 25 81 60 113 102s55 85 70 129s25 83 31 116s9 62 9 85c0 65 -16 117 -48 156s-74 58 -126 58c-42 0 -85 -14 -130 -42s-86 -69 -121 -123c-30 -46 -53 -97 -69 -155s-23 -108 -23 -149c0 -48 10 -90 30 -127s49 -62 87 -75zM400 23c1 4 1 11 1 20c0 27 -4 49 -13 63\ns-25 21 -48 21c-21 0 -40 -9 -56 -27s-24 -36 -24 -55c0 -29 15 -44 45 -44s62 7 95 22z"
            },
            R: {
                x: 793,
                d: "M371 615l-66 -263h113c38 0 71 5 100 16s52 23 67 38s27 32 37 52s16 38 19 52s4 27 4 40c0 69 -50 104 -150 104h-72c-20 0 -32 -2 -37 -6s-10 -15 -15 -33zM510 340c65 -21 97 -59 97 -116c0 -8 -2 -24 -5 -49c-1 -5 -3 -23 -7 -56s-6 -54 -6 -64c0 -21 4 -36 11 -44\ns17 -12 30 -12c15 0 31 7 48 21s31 36 42 68c2 9 6 14 12 14c7 0 11 -3 11 -10s-4 -20 -11 -36s-21 -32 -40 -50s-41 -27 -65 -27c-36 0 -65 9 -89 27s-36 43 -36 77c0 11 5 37 14 76c11 42 17 69 17 80c0 23 -8 43 -25 63s-46 30 -88 30h-120l-67 -269c-1 -5 -2 -11 -2 -16\nc0 -4 1 -7 2 -9s7 -4 16 -6s24 -3 43 -3c16 0 24 -3 24 -10c0 -9 -2 -14 -5 -16s-8 -3 -14 -3s-16 0 -29 1s-22 1 -28 1h-118c-7 0 -17 0 -30 -1s-22 -1 -28 -1c-9 0 -14 3 -14 10c0 9 2 14 6 16s11 3 24 3c33 0 53 3 61 8s14 18 19 37l135 538c3 10 4 18 4 23s-1 8 -2 10\ns-7 4 -16 6s-23 3 -42 3h-13c-2 0 -4 0 -7 1s-4 2 -5 3s-1 3 -1 6c0 9 2 14 6 16s12 3 23 3h271c67 0 120 -15 159 -44s59 -65 59 -106c0 -43 -21 -82 -63 -118s-95 -61 -158 -75z"
            },
            S: {
                x: 684,
                d: "M634 695l-54 -220c-2 -9 -4 -14 -6 -16s-4 -3 -8 -3c-7 0 -11 3 -11 9c0 1 0 4 1 10c1 9 0 9 2 23c1 9 2 17 2 24c0 49 -12 87 -36 114s-60 41 -108 41c-47 0 -88 -18 -125 -53s-55 -74 -55 -117c0 -30 10 -55 30 -75c9 -8 18 -14 28 -18s32 -10 66 -19\nc49 -13 80 -22 94 -27s27 -13 37 -23c32 -31 48 -70 48 -116c0 -63 -25 -121 -75 -173s-108 -77 -172 -77c-79 0 -135 25 -169 76l-46 -60c-9 -11 -14 -16 -17 -16c-7 0 -10 3 -10 9l2 7c1 5 2 7 2 8l51 205c2 9 4 14 5 16s4 3 9 3c7 0 10 -3 10 -9c0 -1 -1 -2 -1 -4v-6\nc-5 -15 -7 -33 -7 -53c0 -51 17 -89 51 -112s74 -35 122 -35c49 0 93 20 130 59s56 83 56 130c0 30 -8 55 -24 75c-10 11 -20 18 -30 22s-28 11 -55 18c-48 11 -81 20 -100 27c-27 9 -49 26 -67 49s-27 52 -27 87c0 57 25 109 74 157s105 72 168 72c68 0 115 -25 141 -76\nl11 14c7 9 15 18 23 28s12 16 14 18c9 11 14 16 17 16c6 0 9 -3 9 -9z"
            },
            T: {
                x: 768,
                d: "M443 610l-134 -533c-3 -11 -4 -19 -4 -24c0 -6 1 -10 3 -13s10 -6 24 -8s34 -3 63 -3h17c3 0 6 0 9 -1s5 -2 6 -3s1 -3 1 -6c0 -9 -2 -14 -5 -16s-9 -3 -16 -3c-9 0 -22 0 -39 1s-30 1 -38 1h-156c-8 0 -21 0 -38 -1s-30 -1 -38 -1c-11 0 -16 3 -16 10c0 9 2 14 6 16\ns12 3 26 3c35 0 61 2 76 5s26 8 30 13s8 16 12 31l134 537c3 12 5 20 5 23c0 5 -3 9 -7 10s-13 1 -27 1h-67c-22 0 -42 -1 -58 -4s-30 -7 -43 -15s-23 -16 -31 -23s-16 -19 -24 -36s-15 -31 -20 -43s-11 -31 -20 -56c-3 -11 -8 -17 -14 -17c-7 0 -10 3 -10 10c0 4 1 9 4 14\nl61 180c3 9 6 15 9 17s10 2 21 2h547c11 0 18 -1 21 -2s5 -4 5 -9c0 -3 -1 -8 -2 -14l-29 -177c-3 -13 -5 -19 -8 -20c-1 -1 -3 -1 -5 -1c-7 0 -10 3 -10 10l1 12c7 41 10 71 10 90c0 36 -10 59 -31 68s-60 14 -116 14c-36 0 -57 -1 -62 -2c-7 -2 -11 -5 -14 -10\ns-6 -14 -9 -27z"
            },
            U: {
                x: 771,
                d: "M488 230l89 355c3 9 4 18 4 26s-1 14 -3 19s-8 11 -18 16s-24 7 -43 8c-10 0 -15 3 -15 10c0 13 6 19 18 19h2c1 0 3 -1 6 -1h10h14h17s13 -1 21 -1h25h47c5 0 12 0 23 1s18 1 23 1c9 0 13 -4 13 -11c0 -11 -4 -17 -12 -18c-21 -1 -39 -3 -52 -7s-24 -11 -31 -21\ns-13 -18 -16 -25s-6 -19 -10 -36l-38 -150c-2 -7 -8 -30 -18 -70s-16 -67 -20 -80c-8 -37 -15 -64 -22 -79c-25 -62 -62 -112 -112 -150s-100 -57 -152 -57c-55 0 -100 17 -135 53s-53 81 -53 136c0 21 3 43 9 65l87 350c8 27 12 45 12 52c0 5 -1 8 -2 10s-7 4 -16 6\ns-23 3 -42 3h-12c-2 0 -5 0 -8 1s-4 2 -5 3s-1 3 -1 6c0 13 6 19 19 19c6 0 16 0 29 -1s23 -1 30 -1h118c7 0 17 0 30 1s22 1 28 1c10 0 15 -4 15 -11c0 -8 -2 -13 -6 -15s-11 -3 -22 -3c-33 0 -55 -3 -63 -8s-14 -17 -19 -36l-98 -393c-7 -29 -11 -55 -11 -78\nc0 -41 11 -73 33 -96s51 -35 88 -35c50 0 99 20 147 61s81 94 98 161z"
            },
            V: {
                x: 799,
                d: "M615 572l-361 -574c-8 -13 -17 -19 -27 -19c-7 0 -11 1 -13 3s-3 10 -4 21l-80 617c-1 14 -6 24 -12 28s-21 6 -45 6c-9 0 -16 1 -19 2s-4 4 -4 9c0 12 6 18 18 18h2c1 0 3 -1 6 -1h10h14h20s15 -1 24 -1h28h56c5 0 14 0 27 1s22 1 27 1c9 0 14 -3 14 -10\nc0 -9 -2 -14 -5 -16s-10 -3 -19 -3c-42 0 -63 -10 -63 -31l70 -539l314 498c1 1 3 3 5 7s4 9 6 15s4 12 4 17c0 20 -14 31 -41 33c-9 0 -13 3 -13 10c0 9 2 14 5 16s8 3 13 3c9 0 24 0 43 -1s34 -1 44 -1c6 0 19 0 39 1s34 1 40 1c7 0 11 -3 11 -10c0 -8 -1 -13 -4 -15\ns-7 -3 -14 -4c-25 -2 -47 -9 -64 -22s-35 -33 -52 -60z"
            },
            W: {
                x: 1073,
                d: "M900 572l-329 -574c-7 -13 -14 -19 -21 -19c-4 0 -7 1 -9 3s-3 3 -3 6s-1 7 -2 14l-37 517l-298 -521c-7 -13 -14 -19 -21 -19c-4 0 -7 1 -9 3s-3 3 -3 6s-1 7 -2 14l-44 614c-1 17 -4 28 -9 32s-18 6 -41 6c-15 0 -22 3 -22 10c0 13 6 19 18 19c5 0 13 0 24 -1\ns19 -1 24 -1h52c12 0 30 0 54 1s43 1 54 1c10 0 15 -4 15 -11c0 -12 -7 -18 -22 -18c-16 0 -29 -1 -39 -4s-16 -6 -20 -11s-7 -8 -8 -11s-1 -7 -1 -11l37 -516l259 455l-3 36c-2 31 -6 49 -10 54s-17 8 -40 8h-14s-5 2 -7 3s-3 4 -3 7c0 13 6 19 18 19c5 0 13 0 24 -1\ns19 -1 24 -1h52c12 0 30 0 54 1s43 1 54 1c10 0 15 -3 15 -10c0 -9 -1 -14 -5 -16s-10 -3 -18 -3c-45 -1 -67 -11 -67 -32l36 -521l273 478c9 16 14 28 14 37c0 23 -17 36 -52 38c-9 0 -14 3 -14 10c0 13 6 19 18 19c9 0 24 0 44 -1s36 -1 46 -1h32c10 0 17 1 22 1h12\ns6 1 7 1h2c8 0 12 -4 12 -11s-2 -12 -5 -14s-7 -3 -13 -4c-19 -2 -35 -7 -49 -16s-26 -18 -32 -27s-14 -22 -24 -39z"
            },
            X: {
                x: 913,
                d: "M500 406l175 188c8 9 13 18 14 29l1 2c0 17 -11 26 -33 29c-9 0 -13 4 -13 11c0 12 6 18 19 18c10 0 27 0 49 -1s38 -1 49 -1h46c5 0 11 0 21 1s17 1 22 1c9 0 13 -4 13 -11c0 -5 -1 -9 -3 -12s-5 -4 -7 -4s-5 -1 -10 -2c-25 -1 -49 -7 -70 -17s-38 -20 -49 -30\ns-26 -25 -45 -44c-18 -20 -32 -35 -42 -45l-127 -136l132 -310c9 -19 16 -32 24 -36s26 -6 55 -7c13 0 19 -3 19 -10c0 -6 -2 -10 -4 -13s-4 -6 -6 -6h-8c-5 0 -14 0 -26 1s-22 1 -28 1h-110c-6 0 -15 0 -27 -1s-21 -1 -27 -1c-10 0 -15 3 -15 10c0 13 6 19 17 19\nc15 1 27 4 38 11s16 13 16 18c0 2 -2 6 -5 13l-105 246c-9 -9 -26 -27 -52 -55s-40 -43 -45 -48l-89 -97c-12 -13 -20 -21 -24 -26s-9 -10 -12 -16s-5 -12 -5 -17c0 -17 11 -27 33 -29c9 0 13 -4 13 -11c0 -12 -6 -18 -19 -18c-10 0 -26 0 -48 1s-39 1 -50 1h-47\nc-5 0 -11 0 -21 -1s-17 -1 -22 -1c-8 0 -12 3 -12 10c0 8 1 13 4 15s9 3 16 4c55 3 106 30 153 81l217 232l-119 278c-4 9 -8 16 -11 20s-8 7 -18 10s-24 4 -43 4c-15 0 -22 3 -22 10c0 9 2 14 5 16s8 3 13 3h3c2 0 5 -1 8 -1h12h16h20s14 -1 22 -1h25h58c5 0 14 0 27 1\ns22 1 27 1c10 0 15 -4 15 -11c0 -12 -6 -18 -17 -18c-27 -2 -46 -12 -55 -29z"
            },
            Y: {
                x: 814,
                d: "M605 572l-251 -289c-5 -6 -10 -17 -15 -33l-36 -144c-9 -35 -13 -54 -13 -59s1 -8 2 -10s6 -3 16 -5s25 -3 44 -3c10 0 17 0 20 -1s4 -5 4 -10c0 -12 -6 -18 -19 -18c-6 0 -16 0 -29 1s-22 1 -28 1h-118c-7 0 -17 0 -30 -1s-22 -1 -28 -1c-9 0 -14 3 -14 10\nc0 9 2 14 5 16s10 3 20 3c31 1 51 3 61 7s17 13 21 26l27 108c17 67 25 101 25 102c0 3 -1 9 -4 17l-124 333c-5 13 -11 22 -19 26s-25 6 -48 6c-16 0 -24 3 -24 10c0 6 2 11 4 14s4 4 6 4s5 1 8 1c5 0 14 0 26 -1s22 -1 28 -1h111c5 0 14 0 27 1s22 1 27 1\nc10 0 15 -4 15 -11c0 -8 -2 -13 -6 -15s-9 -3 -17 -3c-35 0 -53 -8 -53 -23c0 -3 2 -9 6 -18l113 -304l238 273c19 21 28 38 28 49c0 14 -10 22 -30 23c-9 0 -13 3 -13 10c0 6 2 11 4 14s4 4 6 4s5 1 8 1c9 0 24 0 44 -1s34 -1 44 -1h41c4 0 11 0 19 1s14 1 18 1\nc8 0 12 -3 12 -10c0 -5 -1 -9 -3 -12s-5 -4 -7 -5s-5 -1 -10 -2c-43 -3 -81 -23 -116 -59z"
            },
            Z: {
                x: 754,
                d: "M693 652l-549 -621h173c43 0 78 4 107 13s54 23 73 43s34 41 45 63s23 51 35 88c4 13 7 20 9 22s4 4 8 4c7 0 10 -3 10 -10c0 -3 -1 -8 -3 -14l-70 -221c-3 -9 -6 -15 -9 -17s-10 -2 -21 -2h-427c-10 0 -17 0 -20 1s-4 3 -4 7c0 7 4 15 13 26l548 620h-164\nc-73 0 -127 -14 -161 -43s-62 -73 -83 -134c-3 -11 -8 -17 -14 -17c-7 0 -10 3 -10 10c0 3 1 7 3 14l55 180c3 9 6 14 9 16s10 3 21 3h413c11 0 18 0 20 -1s4 -4 4 -7c0 -7 -4 -14 -11 -23z"
            },
            "[": {
                x: 229,
                d: "M179 -249h-129v998h129v-35h-94v-928h94v-35z"
            },
            "\\": {
                x: 489,
                d: "M396 -226l-341 940c-3 8 -5 13 -5 16c0 5 2 10 6 14s9 6 14 6c6 0 10 -2 13 -5s6 -10 9 -19l342 -940c3 -8 5 -13 5 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-9 0 -17 8 -23 24z"
            },
            "]": {
                x: 229,
                d: "M179 749v-998h-129v35h94v928h-94v35h129z"
            },
            a: {
                x: 545,
                d: "M311 119l49 196c3 5 4 11 4 16c0 6 -2 15 -5 27s-12 26 -25 41s-29 22 -49 22s-41 -9 -63 -27s-40 -45 -57 -79c-11 -23 -22 -58 -33 -103s-17 -80 -17 -106c0 -30 6 -53 17 -70s27 -26 47 -26c38 0 76 24 113 71c9 12 15 25 19 38zM375 375c5 31 19 47 42 47\nc7 0 14 -2 19 -7s7 -11 7 -18c0 -4 -15 -68 -46 -192c-3 -9 -6 -23 -10 -39s-7 -28 -10 -37c-8 -35 -12 -59 -12 -73c0 -31 10 -46 31 -46c13 0 24 7 34 20s19 27 24 42s11 35 17 60c2 9 3 14 5 16s5 4 9 4c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -19s-6 -25 -11 -41\ns-10 -29 -15 -39c-18 -36 -42 -54 -72 -54c-19 0 -37 6 -54 18s-28 31 -33 58c-43 -51 -86 -76 -130 -76c-35 0 -66 14 -90 42s-36 67 -36 115c0 73 24 141 74 202s104 92 161 92c41 0 71 -22 90 -66z"
            },
            b: {
                x: 458,
                d: "M236 669l-73 -291c40 42 79 63 118 63c37 0 67 -15 91 -44s36 -67 36 -113c0 -73 -24 -140 -74 -202s-104 -92 -162 -92c-35 0 -64 14 -87 41s-35 65 -35 114c0 20 2 38 5 55c1 6 25 101 71 285l24 96l12 54c0 5 -1 8 -2 10s-5 4 -13 6s-20 3 -36 3c-13 0 -20 3 -20 10\nc0 9 1 14 5 16s13 4 26 5c6 1 15 2 26 3s19 1 24 1c30 3 48 5 55 5c8 0 12 -3 12 -10c0 -2 -1 -7 -3 -15zM173 10c22 0 44 10 65 30s39 43 52 72c13 26 25 62 36 108s17 81 17 105c0 28 -6 51 -17 69s-26 27 -47 27c-20 0 -41 -7 -62 -23s-38 -32 -49 -46s-17 -23 -18 -28\nc-6 -19 -14 -49 -23 -90c-14 -55 -21 -95 -21 -122c0 -36 7 -62 20 -78s28 -24 47 -24z"
            },
            c: {
                x: 478,
                d: "M401 376c-14 30 -43 45 -88 45c-29 0 -57 -11 -83 -31s-45 -43 -60 -70c-16 -31 -28 -66 -38 -107s-15 -72 -15 -93c0 -29 7 -55 22 -77s38 -33 69 -33c29 0 62 7 99 22s70 41 98 78c7 7 11 10 13 10s4 -2 6 -4s4 -4 4 -7s-4 -9 -10 -17s-16 -18 -29 -30s-28 -23 -45 -34\ns-38 -20 -63 -27s-50 -11 -75 -11c-49 0 -86 16 -114 48s-42 72 -42 118c0 71 27 137 82 196s115 89 180 89c34 0 62 -8 83 -24s32 -36 32 -61c0 -19 -5 -33 -15 -44s-23 -16 -36 -16c-10 0 -18 2 -24 8s-10 14 -10 24c0 15 6 27 17 36c9 8 23 12 42 12z"
            },
            d: {
                x: 566,
                d: "M513 669l-141 -560c-5 -19 -7 -36 -7 -53c0 -31 10 -46 31 -46c13 0 24 7 34 20s19 27 24 42s11 35 17 60c2 9 3 14 5 16s5 4 9 4c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -19s-6 -25 -11 -41s-10 -29 -15 -39c-18 -36 -42 -54 -72 -54c-19 0 -37 6 -54 18s-28 31 -33 58\nc-43 -51 -86 -76 -130 -76c-35 0 -66 14 -90 42s-36 67 -36 115c0 73 24 141 74 202s104 92 161 92c41 0 71 -22 90 -66l61 243c2 6 3 12 3 17c0 4 -1 7 -2 9s-5 5 -13 7s-20 3 -35 3s-22 3 -22 10c0 9 2 14 6 16s13 4 26 5c6 1 14 2 25 3s20 1 25 1c17 3 35 5 55 5\nc8 0 12 -3 12 -10c0 -2 -1 -7 -3 -15zM311 119l49 196c3 5 4 11 4 16c0 6 -2 15 -5 27s-12 26 -25 41s-29 22 -49 22s-41 -9 -63 -27s-40 -45 -57 -79c-11 -23 -22 -58 -33 -103s-17 -80 -17 -106c0 -30 6 -53 17 -70s27 -26 47 -26c38 0 76 24 113 71c9 12 15 25 19 38z\n"
            },
            e: {
                x: 473,
                d: "M184 232h-53c-10 -43 -15 -77 -15 -103c0 -37 7 -66 22 -87s37 -32 65 -32c29 0 62 7 99 22s70 41 98 78c7 7 11 10 13 10s5 -2 7 -4s3 -4 3 -7s-3 -9 -9 -17s-17 -18 -30 -30s-29 -23 -46 -34s-37 -20 -62 -27s-50 -11 -75 -11c-45 0 -81 17 -109 50s-42 75 -42 128\nc0 56 14 105 43 148s62 75 100 95s76 30 113 30c32 0 57 -9 76 -25s28 -36 28 -59c0 -9 -1 -19 -4 -29s-10 -24 -24 -40s-32 -27 -55 -36c-35 -13 -83 -20 -143 -20zM136 252h42c135 0 202 35 202 105c0 19 -6 35 -20 47s-32 17 -54 17c-11 0 -22 -1 -34 -5s-28 -11 -46 -21\ns-34 -27 -50 -52s-30 -55 -40 -91z"
            },
            f: {
                x: 595,
                d: "M445 402h-85c-25 -151 -49 -275 -72 -373c-34 -155 -86 -233 -155 -233c-21 0 -40 6 -57 18s-26 27 -26 47c0 17 5 31 16 41s22 14 34 14c10 0 18 -2 24 -8s10 -14 10 -24c0 -3 -1 -8 -2 -13s-6 -12 -14 -21s-20 -14 -35 -15c12 -13 29 -19 50 -19c12 0 22 4 31 12\ns16 20 22 37s12 33 16 47s8 36 13 64c7 31 15 75 26 130s21 114 33 176s20 101 23 120h-64c-11 0 -18 1 -21 2s-5 4 -5 9c0 8 2 13 6 15s12 3 23 3h67c18 104 35 171 51 202c11 20 26 37 45 51s39 20 60 20c23 0 44 -6 61 -18s25 -27 25 -47c0 -17 -5 -31 -16 -41\ns-22 -14 -34 -14c-10 0 -19 2 -25 8s-9 14 -9 24c0 11 5 22 13 32s21 16 38 18c-13 12 -31 18 -52 18c-13 0 -24 -5 -34 -14s-16 -20 -19 -33c-7 -31 -21 -99 -41 -206h81h11c2 0 5 0 8 -1s5 -2 6 -3s1 -3 1 -6c0 -9 -1 -14 -5 -16s-12 -3 -23 -3z"
            },
            g: {
                x: 549,
                d: "M370 127l47 192l3 14c0 5 -2 14 -5 26s-12 25 -25 40s-30 22 -49 22c-21 0 -42 -9 -63 -27s-38 -40 -53 -69c-11 -23 -23 -57 -35 -103s-17 -82 -17 -107c0 -32 7 -55 19 -71s27 -24 45 -24c39 0 77 24 114 72c9 11 16 23 19 35zM432 375c3 31 17 47 41 47\nc7 0 14 -2 19 -7s7 -11 7 -18c0 -3 -1 -8 -3 -16l-111 -448c-8 -33 -30 -64 -67 -93s-84 -44 -142 -44c-43 0 -76 5 -96 14s-30 23 -30 43c0 16 6 29 16 39s21 14 34 14c11 0 19 -4 25 -10s9 -13 9 -22c0 -8 -4 -17 -10 -27s-16 -17 -30 -21c21 -7 47 -10 80 -10\nc40 0 74 14 101 41c11 11 20 23 27 35s13 23 16 32s7 25 13 48l22 90c-37 -41 -77 -62 -118 -62c-35 0 -64 13 -89 40s-38 66 -38 115c0 73 24 138 74 197s103 89 159 89c41 0 71 -22 91 -66z"
            },
            h: {
                x: 580,
                d: "M276 669l-77 -307c41 53 91 79 148 79c37 0 64 -10 83 -29s28 -45 28 -76c0 -37 -21 -112 -63 -224c-11 -29 -16 -52 -16 -69c0 -22 9 -33 26 -33c20 0 39 11 57 32s32 51 43 90c2 7 4 11 5 13s2 4 3 5s4 2 7 2c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -18s-7 -23 -14 -39\ns-15 -30 -24 -44s-22 -26 -37 -36s-32 -16 -49 -16c-23 0 -42 8 -57 23s-22 35 -22 58c0 12 5 30 14 55c41 111 61 186 61 225c0 47 -18 70 -54 70c-55 0 -102 -30 -141 -89c-13 -19 -23 -43 -30 -72c-2 -7 -5 -18 -9 -32s-6 -26 -7 -33l-45 -181c-7 -16 -19 -24 -35 -24\nc-18 0 -27 9 -27 26c0 5 1 13 4 23l145 579c2 6 3 12 3 17c0 4 -1 7 -2 9s-6 5 -14 7s-19 3 -34 3s-22 3 -22 10c0 9 2 14 6 16s13 4 26 5c6 1 15 2 26 3s19 1 24 1c17 3 35 5 55 5c8 0 12 -3 12 -10c0 -2 -1 -7 -3 -15z"
            },
            i: {
                x: 356,
                d: "M306 143c0 -3 -3 -12 -8 -27s-12 -32 -21 -52s-23 -37 -41 -52s-37 -22 -58 -22c-23 0 -42 8 -57 23s-22 35 -22 58c0 12 4 29 12 50l70 186c14 39 21 66 21 81c0 22 -9 33 -26 33c-20 0 -39 -10 -57 -31s-33 -52 -44 -93c-2 -8 -3 -13 -5 -15s-5 -3 -9 -3\nc-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -12 -3 -27 -10 -45l-70 -186c-15 -42 -23 -71 -23 -87c0 -22 9 -33 26 -33c19 0 37 10 55 30s33 50 45 92c2 7 4 11 5 13s2 4 3 5s4 2 7 2c7 0 10 -3 10 -9z\nM298 624c0 -11 -5 -22 -15 -32s-22 -16 -35 -16c-8 0 -15 3 -22 8s-11 14 -11 25c0 13 5 23 15 33s22 15 34 15c10 0 18 -4 24 -11s10 -14 10 -22z"
            },
            j: {
                x: 504,
                d: "M413 317l-93 -370c-12 -47 -36 -84 -73 -111s-74 -40 -112 -40c-23 0 -42 4 -59 14s-26 25 -26 44c0 15 5 27 15 37s22 15 35 15c11 0 19 -4 25 -10s9 -13 9 -22c0 -12 -4 -22 -12 -31s-19 -14 -31 -17c13 -7 27 -10 44 -10c27 0 51 12 73 36s38 56 48 94l95 377\nc5 21 7 38 7 52c0 31 -11 46 -32 46s-43 -11 -66 -31s-43 -52 -62 -97c-6 -9 -11 -13 -14 -14c-7 0 -10 3 -10 9c0 2 2 8 6 18s11 24 20 39s18 31 30 45s26 26 44 36s36 15 55 15c24 0 45 -9 62 -25s26 -38 26 -65c0 -12 -1 -23 -4 -34zM454 624c0 -13 -6 -24 -16 -34\ns-21 -14 -33 -14c-10 0 -19 3 -25 10s-9 15 -9 23c0 11 5 23 15 33s22 15 35 15c8 0 16 -3 23 -8s10 -14 10 -25z"
            },
            k: {
                x: 546,
                d: "M276 669l-103 -411c30 11 58 33 84 64c38 43 70 74 95 92s50 27 76 27c21 0 38 -5 50 -17s18 -26 18 -42s-5 -30 -15 -40s-22 -15 -36 -15c-9 0 -16 3 -23 8s-10 13 -10 24s4 22 13 32s21 16 38 18c-9 8 -21 12 -36 12c-22 0 -44 -8 -65 -23s-47 -39 -77 -73\nc-34 -37 -63 -62 -86 -76c97 -13 145 -47 145 -104c0 -9 -1 -19 -4 -31c-5 -20 -8 -39 -8 -56c0 -32 11 -48 33 -48c16 0 31 7 43 22s21 30 26 44s11 33 17 56c2 9 3 14 5 16s5 4 9 4c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -18s-7 -23 -13 -39s-11 -29 -17 -40\nc-21 -37 -47 -56 -78 -56c-26 0 -47 9 -64 27s-25 41 -25 70c0 11 1 22 4 32c2 10 3 18 3 25c0 24 -10 43 -30 58s-48 24 -85 28l-47 -187c-3 -13 -7 -22 -9 -28s-6 -12 -12 -17s-12 -8 -21 -8c-18 0 -27 9 -27 26c0 5 1 13 4 23l143 572c3 12 5 20 5 24c0 5 -1 8 -2 10\ns-5 4 -13 6s-20 3 -36 3c-13 0 -20 3 -20 10c0 9 1 14 5 16s13 4 26 5c6 1 15 2 26 3s19 1 24 1c30 3 48 5 55 5c8 0 12 -3 12 -10c0 -2 -1 -7 -3 -15z"
            },
            l: {
                x: 311,
                d: "M258 669l-141 -560c-5 -19 -7 -36 -7 -53c0 -31 10 -46 30 -46c18 0 33 10 44 30s21 51 32 92c2 9 4 14 6 16s4 4 8 4c7 0 10 -3 10 -9c0 -2 -1 -9 -4 -20s-7 -25 -12 -41s-10 -29 -15 -39c-18 -35 -42 -53 -71 -53c-25 0 -46 9 -63 26s-25 39 -25 64c0 11 2 23 5 35\nl124 496c3 12 5 20 5 24c0 5 -1 8 -2 10s-5 4 -13 6s-20 3 -36 3c-13 0 -20 3 -20 10c0 9 1 14 5 16s13 4 26 5c6 1 15 2 26 3s19 1 24 1c30 3 48 5 55 5c8 0 12 -3 12 -10c0 -2 -1 -7 -3 -15z"
            },
            m: {
                x: 900,
                d: "M229 293l-33 -132l-22 -90c-9 -35 -14 -55 -16 -60c-7 -14 -19 -21 -34 -21c-7 0 -13 2 -18 7s-8 11 -8 18s6 33 18 78c7 27 14 55 20 82l28 108c11 50 17 81 17 92c0 31 -10 46 -31 46c-18 0 -33 -10 -44 -31s-21 -50 -30 -87c-3 -11 -4 -19 -6 -21s-5 -3 -9 -3\nc-7 0 -11 3 -11 9c0 2 1 9 4 20s7 24 12 40s11 30 16 41c17 35 41 52 71 52c23 0 44 -7 61 -23s26 -38 27 -65c42 59 93 88 154 88c35 0 62 -9 81 -27s29 -41 30 -70c44 65 98 97 161 97c37 0 64 -10 83 -29s28 -45 28 -76c0 -37 -21 -112 -63 -224c-11 -29 -16 -52 -16 -69\nc0 -22 9 -33 26 -33c20 0 39 11 57 32s32 51 43 90c2 7 4 11 5 13s2 4 3 5s4 2 7 2c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -18s-7 -23 -14 -39s-15 -30 -24 -44s-22 -26 -37 -36s-32 -16 -49 -16c-23 0 -42 8 -57 23s-22 35 -22 58c0 12 5 30 14 55c41 111 61 186 61 225\nc0 47 -18 70 -54 70c-21 0 -40 -4 -59 -13s-34 -19 -46 -31s-23 -25 -32 -39s-16 -24 -20 -33s-6 -14 -7 -17l-60 -239c-4 -15 -7 -27 -9 -33s-6 -12 -12 -18s-14 -8 -23 -8c-7 0 -13 2 -18 7s-8 11 -8 18c0 5 3 20 10 45c3 13 12 52 29 115l25 103c8 31 12 56 12 73\nc0 47 -18 70 -54 70c-37 0 -70 -13 -99 -40c-11 -9 -23 -21 -33 -35s-17 -26 -22 -35s-8 -15 -9 -18z"
            },
            n: {
                x: 628,
                d: "M229 293l-33 -132l-22 -90c-9 -35 -14 -55 -16 -60c-7 -14 -19 -21 -34 -21c-7 0 -13 2 -18 7s-8 11 -8 18s6 33 18 78c7 27 14 55 20 82l28 108c11 50 17 81 17 92c0 31 -10 46 -31 46c-18 0 -32 -11 -43 -31s-21 -49 -31 -87c-3 -11 -4 -19 -6 -21s-5 -3 -9 -3\nc-7 0 -11 3 -11 9c0 2 1 8 4 19s7 25 12 41s11 29 16 40c18 35 42 53 71 53c23 0 44 -7 61 -23s26 -38 27 -65c42 59 93 88 154 88c37 0 64 -10 83 -29s28 -45 28 -76c0 -36 -21 -111 -62 -224c-11 -27 -17 -50 -17 -69c0 -22 9 -33 26 -33c20 0 39 10 57 31s32 51 43 91\nc2 7 4 11 5 13s2 4 3 5s4 2 7 2c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -18s-7 -23 -14 -39s-15 -30 -24 -44s-22 -26 -37 -36s-32 -16 -49 -16c-23 0 -42 8 -57 23s-22 35 -22 58c0 12 5 30 14 55c41 110 61 185 61 225c0 47 -18 70 -54 70c-37 0 -70 -13 -99 -40\nc-11 -9 -23 -21 -33 -35s-17 -26 -22 -35s-8 -15 -9 -18z"
            },
            o: {
                x: 515,
                d: "M465 275c0 -71 -27 -135 -81 -195s-115 -90 -181 -90c-45 0 -83 16 -111 47s-42 71 -42 119c0 71 28 136 82 196s114 89 180 89c45 0 82 -16 110 -47s43 -71 43 -119zM204 10c22 0 46 8 70 23s46 39 65 70c17 28 32 64 43 107s16 77 16 101c0 34 -8 61 -24 81\ns-38 29 -63 29c-23 0 -48 -9 -73 -25s-48 -42 -69 -78c-13 -24 -25 -57 -36 -99s-16 -75 -16 -99c0 -34 9 -60 25 -80s37 -30 62 -30z"
            },
            p: {
                x: 609,
                d: "M124 -127l113 450c5 21 7 38 7 52c0 31 -10 46 -31 46c-18 0 -32 -10 -43 -31s-22 -50 -31 -87c-3 -11 -5 -19 -7 -21s-4 -3 -8 -3c-7 0 -11 3 -11 9c0 2 1 9 4 20s7 24 12 40s11 30 16 41c17 35 41 52 71 52c21 0 40 -7 56 -20s27 -32 31 -56c7 9 15 18 25 27\ns24 20 44 32s41 17 60 17c37 0 68 -15 92 -44s35 -67 35 -113c0 -73 -25 -140 -75 -202s-103 -92 -160 -92c-43 0 -73 22 -90 67c-34 -130 -51 -199 -51 -207c0 -10 16 -15 49 -15c10 0 17 0 20 -1s4 -5 4 -10c0 -12 -6 -18 -18 -18c-7 0 -23 0 -47 1s-39 1 -46 1h-43\nc-5 0 -11 0 -20 -1s-15 -1 -20 -1c-8 0 -12 3 -12 10c0 9 2 14 6 16s9 3 16 3c19 0 32 2 38 7s10 15 14 31zM297 312l-49 -196c-2 -10 -3 -15 -3 -16c0 -5 2 -14 5 -26s11 -26 24 -41s30 -23 50 -23c22 0 44 10 65 30s39 43 52 72c13 26 25 62 36 108s17 81 17 105\nc0 28 -5 51 -16 69s-27 27 -48 27c-27 0 -54 -13 -82 -38c-29 -25 -46 -48 -51 -71z"
            },
            q: {
                x: 502,
                d: "M452 431l-139 -562c-3 -11 -4 -18 -4 -19c0 -10 17 -15 50 -15c15 0 23 -3 23 -10c0 -13 -6 -19 -18 -19c-5 0 -12 0 -23 1s-19 1 -24 1h-102c-5 0 -12 0 -23 -1s-18 -1 -23 -1c-9 0 -13 3 -13 10c0 9 2 14 5 16s9 3 16 3c19 1 32 1 39 2s13 3 19 7s10 12 13 22l9 36\nl38 150l-1 1c-39 -42 -78 -63 -118 -63c-35 0 -66 14 -90 42s-36 67 -36 115c0 73 24 141 74 202s104 92 161 92c42 0 73 -24 92 -72c9 16 21 31 36 47s25 24 30 24c6 0 9 -3 9 -9zM311 119l49 196c3 5 4 11 4 16c0 6 -2 15 -5 27s-12 26 -25 41s-29 22 -49 22\ns-41 -9 -63 -27s-40 -45 -57 -79c-11 -23 -22 -58 -33 -103s-17 -80 -17 -106c0 -30 6 -53 17 -70s27 -26 47 -26c38 0 76 24 113 71c9 12 15 25 19 38z"
            },
            r: {
                x: 499,
                d: "M412 409c-11 8 -26 12 -45 12c-28 0 -54 -11 -79 -34c-11 -9 -22 -23 -34 -42s-19 -31 -21 -38c-3 -15 -7 -30 -11 -43c-1 -7 -4 -18 -8 -32s-6 -26 -8 -33c-1 -5 -6 -23 -14 -53s-14 -60 -21 -86s-10 -40 -11 -43c-5 -18 -17 -27 -36 -27c-7 0 -13 2 -18 7s-8 11 -8 18\ns6 33 18 78c7 27 14 55 20 82l28 108c11 50 17 81 17 92c0 31 -10 46 -31 46c-18 0 -33 -10 -44 -31s-21 -50 -30 -87c-3 -11 -4 -19 -6 -21s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 2 1 9 4 20s7 24 12 40s11 30 16 41c19 35 42 52 71 52c21 0 40 -7 57 -21s27 -33 30 -58\nc36 53 79 79 128 79c24 0 43 -5 58 -17s23 -26 23 -43c0 -15 -5 -27 -15 -38s-22 -16 -36 -16c-9 0 -16 3 -23 8s-10 13 -10 24s5 21 13 31s19 16 34 19z"
            },
            s: {
                x: 462,
                d: "M227 200c-65 14 -97 46 -97 97c0 12 3 25 8 40s14 31 26 47s29 29 52 40s49 17 80 17c37 0 66 -8 86 -25s30 -37 30 -60c0 -19 -5 -32 -14 -40s-19 -13 -28 -13c-6 0 -12 3 -18 7s-10 11 -10 20c0 3 1 6 2 11s4 10 12 17s19 11 32 11c-5 17 -16 30 -33 39s-37 13 -60 13\nc-18 0 -34 -3 -48 -8s-25 -12 -33 -19s-15 -15 -20 -24s-8 -17 -10 -24s-2 -12 -2 -17c0 -14 5 -26 14 -35s16 -14 24 -17s19 -5 32 -8c31 -6 53 -11 66 -16s26 -13 37 -24c21 -21 32 -46 32 -75c0 -15 -3 -31 -10 -48s-17 -35 -31 -53s-35 -33 -62 -45s-59 -18 -94 -18\nc-41 0 -74 9 -100 26s-40 41 -40 70c0 21 5 36 16 46s22 16 35 16c23 0 34 -11 34 -32c0 -11 -5 -22 -15 -33s-22 -16 -37 -16c-1 0 -3 1 -4 1h-4c14 -39 53 -58 116 -58c27 0 51 4 71 13s35 19 45 32s17 25 21 36s7 22 7 31c0 33 -19 56 -58 68c-1 0 -8 1 -21 4\ns-22 5 -29 6z"
            },
            t: {
                x: 400,
                d: "M229 402l-78 -313c-2 -8 -3 -19 -3 -32c0 -31 11 -47 32 -47c26 0 50 12 72 37s40 52 53 83c5 11 8 17 9 18c1 3 4 4 8 4c7 0 10 -3 10 -9c0 -2 -2 -9 -6 -19s-11 -23 -20 -38s-18 -30 -30 -44s-26 -27 -44 -37s-36 -15 -55 -15c-27 0 -49 8 -65 26s-24 39 -24 64\nc0 7 4 26 11 58l66 264h-89h-12c-2 0 -5 0 -8 1s-4 2 -5 3s-1 3 -1 6c0 9 2 14 6 16s12 3 23 3h94l39 159c6 23 19 35 39 35c7 0 13 -2 18 -7s8 -11 8 -18c0 -6 -1 -14 -4 -23l-37 -146h88c11 0 18 0 21 -1s5 -5 5 -10c0 -8 -2 -13 -6 -15s-12 -3 -23 -3h-92z"
            },
            u: {
                x: 601,
                d: "M364 58c-8 -9 -14 -17 -19 -22s-12 -11 -23 -20s-23 -16 -36 -20s-26 -6 -41 -6c-13 0 -25 1 -37 4s-24 8 -37 16s-24 20 -32 37s-12 37 -12 61c0 36 16 98 49 187c17 44 26 75 26 93c0 22 -9 33 -26 33c-20 0 -39 -10 -57 -31s-33 -52 -44 -93c-2 -8 -3 -13 -5 -15\ns-5 -3 -9 -3c-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -13 -6 -35 -17 -65c-36 -93 -54 -161 -54 -204c0 -55 21 -82 62 -82c10 0 20 1 29 4s18 7 25 12s15 10 21 16s11 12 16 18s9 11 12 16s6 9 7 12l3 4\nc7 37 31 133 71 289c3 11 5 19 7 25s6 12 12 17s14 8 23 8c7 0 14 -2 19 -7s8 -11 8 -18c0 -3 -2 -13 -7 -30l-41 -163c-4 -19 -11 -46 -20 -82c-9 -37 -13 -62 -13 -75c0 -31 10 -46 30 -46c18 0 32 10 43 30s22 51 33 92c2 9 3 14 5 16s5 4 9 4c7 0 10 -3 10 -9\nc0 -1 -1 -7 -3 -18s-7 -24 -12 -40s-10 -29 -15 -40c-17 -37 -41 -55 -72 -55c-17 0 -34 6 -51 16s-28 27 -34 52z"
            },
            v: {
                x: 530,
                d: "M480 374c0 -14 -2 -35 -7 -62s-13 -60 -24 -98s-25 -73 -41 -106s-38 -61 -64 -84s-56 -34 -87 -34c-39 0 -71 10 -95 31c-23 21 -34 51 -34 91c0 37 16 98 48 183c17 44 26 75 26 93c0 10 -2 18 -5 23s-6 8 -9 9s-7 1 -12 1c-20 0 -39 -10 -57 -31s-33 -52 -44 -93\nc-2 -8 -3 -13 -5 -15s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -13 -7 -37 -20 -71c-33 -89 -50 -153 -50 -192c0 -59 24 -88 73 -88c28 0 55 12 79 36s42 53 56 86s25 64 33 92s12 49 12 62\nc0 37 -12 67 -36 88c-7 7 -11 15 -11 23c0 10 4 19 14 29s21 15 32 15c5 0 9 -1 14 -3s11 -9 17 -20s9 -25 9 -44z"
            },
            w: {
                x: 748,
                d: "M367 61c-27 -47 -61 -71 -102 -71c-15 0 -29 2 -43 5s-29 9 -44 17s-27 22 -36 39s-14 38 -14 63c0 35 19 103 57 204c11 29 17 53 17 70c0 22 -9 33 -26 33c-20 0 -38 -11 -56 -31s-33 -51 -45 -93c-2 -8 -3 -13 -5 -15s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 4 3 13 8 28\ns12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -13 -6 -35 -17 -64c-35 -92 -52 -157 -52 -195c0 -61 26 -92 79 -92c20 0 39 9 58 28l3 5c3 3 6 7 9 11s7 10 10 16s6 10 8 16s3 11 3 16c0 22 1 39 4 50c5 27 23 103 56 230c3 11 5 18 7 24\ns6 12 12 17s14 8 23 8c7 0 14 -2 19 -7s8 -11 8 -18c0 -2 -5 -22 -14 -59l-42 -168c-9 -37 -13 -64 -13 -81c0 -59 25 -88 74 -88c47 0 86 34 117 101c11 25 22 55 33 93s16 65 16 82c0 35 -12 65 -35 88c-8 7 -12 14 -12 23c0 10 4 19 14 29s21 15 32 15c5 0 9 -1 14 -3\ns11 -9 17 -20s9 -25 9 -44c0 -27 -7 -67 -20 -120s-27 -96 -40 -129c-37 -90 -86 -135 -149 -135c-64 0 -105 24 -122 71z"
            },
            x: {
                x: 586,
                d: "M496 408c-14 9 -31 13 -51 13c-22 0 -41 -10 -58 -29s-29 -44 -37 -75l-35 -136c-13 -55 -20 -90 -20 -104c0 -21 5 -37 14 -49s23 -18 40 -18c25 0 49 12 74 34s43 54 56 95c3 9 8 13 13 13c7 0 10 -3 10 -9c0 -7 -3 -17 -10 -33s-18 -34 -30 -52s-29 -34 -50 -48\ns-43 -20 -66 -20c-22 0 -42 6 -62 19s-34 33 -41 60c-27 -53 -61 -79 -103 -79c-24 0 -45 5 -63 16s-27 26 -27 45c0 15 6 28 16 38s21 15 34 15c10 0 18 -2 24 -8s10 -14 10 -24c0 -9 -3 -18 -10 -28s-18 -18 -34 -21c14 -9 31 -13 51 -13c45 0 78 38 97 115l34 137\nc12 48 18 79 18 93c0 17 -4 31 -12 45s-22 21 -42 21c-13 0 -26 -3 -40 -9s-29 -19 -47 -40s-32 -49 -43 -83c-3 -7 -7 -10 -12 -10c-7 0 -11 3 -11 9c0 7 4 18 11 34s16 32 28 50s29 34 50 48s44 21 67 21c53 0 87 -26 103 -79c5 10 11 20 18 30s18 21 34 32s33 17 52 17\nc23 0 44 -5 62 -16s28 -26 28 -45c0 -14 -4 -26 -14 -37s-22 -16 -37 -16c-9 0 -16 3 -23 8s-10 13 -10 24s4 21 11 31s18 15 33 18z"
            },
            y: {
                x: 551,
                d: "M286 -112c11 15 20 31 28 48s14 32 18 44s8 30 14 55l-1 1c-29 -31 -63 -46 -100 -46c-31 0 -59 8 -83 26s-35 48 -35 91c0 38 16 101 49 188c17 44 26 75 26 93c0 10 -2 18 -5 23s-6 8 -9 9s-7 1 -12 1c-20 0 -39 -10 -57 -31s-33 -52 -44 -93c-2 -8 -3 -13 -5 -15\ns-5 -3 -9 -3c-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -12 -6 -33 -17 -63c-36 -96 -54 -165 -54 -206c0 -55 20 -82 61 -82c38 0 72 21 101 62c5 7 9 17 13 31l74 294c6 23 19 34 38 34c7 0 14 -2 19 -7\ns8 -11 8 -18c0 -1 -1 -7 -3 -17l-98 -390c-14 -56 -44 -103 -88 -143s-91 -60 -141 -60c-29 0 -52 8 -71 24s-29 37 -29 62c0 21 6 36 17 46s23 15 34 15c9 0 17 -2 24 -7s10 -13 10 -24c0 -12 -4 -24 -14 -34s-22 -15 -36 -15c-5 0 -8 0 -10 1c11 -32 36 -48 75 -48\nc43 0 81 24 115 72z"
            },
            z: {
                x: 517,
                d: "M134 81c6 3 16 4 30 4c16 0 37 -5 64 -16c25 -11 45 -16 62 -16c23 0 46 7 70 21s40 35 50 62c3 9 7 14 12 14c7 0 11 -3 11 -10c0 -21 -15 -50 -45 -90s-67 -60 -109 -60c-10 0 -20 3 -29 8s-16 10 -20 14s-10 11 -19 21c-10 13 -18 21 -25 25s-15 7 -26 7\nc-30 0 -58 -21 -85 -62c-5 -9 -10 -13 -14 -13c-7 0 -11 3 -11 8c0 3 4 10 11 22s19 28 35 48s33 39 52 58l101 93c69 63 113 105 132 128c-3 -1 -9 -1 -16 -1c-17 0 -39 5 -64 16s-45 16 -62 16c-15 0 -30 -3 -47 -10s-30 -20 -37 -37c-3 -7 -7 -11 -12 -11\nc-7 0 -10 3 -10 9c0 17 12 40 35 69s50 43 82 43c21 0 44 -14 67 -42c17 -22 34 -33 51 -33c25 0 50 21 75 64c5 7 10 11 14 11c7 0 10 -3 10 -8c0 -3 -4 -11 -11 -23s-19 -27 -36 -48s-37 -43 -58 -64c-17 -19 -51 -49 -100 -92c-58 -52 -101 -94 -128 -125z"
            },
            "{": {
                x: 455,
                d: "M261 617v-240c0 -63 -39 -105 -118 -127c37 -11 63 -24 78 -39c16 -16 27 -31 32 -43s8 -29 8 -52v-210c0 -25 1 -41 3 -47c7 -25 22 -46 44 -61s49 -24 81 -26c3 -1 6 -1 7 -1s2 0 4 -1s3 -2 4 -3s1 -3 1 -6c0 -7 -6 -11 -19 -11c-23 0 -49 3 -76 10s-50 17 -68 31\nc-21 17 -35 33 -40 49s-8 37 -8 63v198c0 25 -1 42 -3 49c-5 25 -19 46 -42 62s-50 25 -83 27c-3 1 -6 1 -7 1s-3 0 -5 1s-2 2 -3 3s-1 3 -1 6c0 6 3 10 9 11c40 2 72 13 95 32c18 15 30 30 34 45s6 34 6 59v228c1 36 20 65 58 89s83 36 134 36c13 0 19 -4 19 -11\nc0 -6 -3 -10 -9 -11c-49 -3 -83 -16 -104 -38s-31 -47 -31 -73z"
            },
            "}": {
                x: 455,
                d: "M194 -117v240c0 63 39 105 118 127c-37 11 -63 24 -78 39c-16 16 -27 31 -32 43s-8 29 -8 52v210c0 25 -1 41 -3 47c-7 25 -21 46 -43 61s-50 24 -82 26c-3 1 -6 1 -7 1s-3 0 -5 1s-2 2 -3 3s-1 3 -1 6c0 7 7 11 20 11c21 0 46 -3 74 -10s51 -17 69 -31\nc21 -17 35 -33 40 -49s8 -37 8 -63v-198c0 -25 1 -42 3 -49c5 -25 19 -46 42 -62s50 -25 83 -27c3 -1 6 -1 7 -1s2 0 4 -1s3 -2 4 -3s1 -3 1 -6c0 -6 -3 -10 -9 -11c-40 -2 -72 -13 -95 -32c-18 -15 -29 -30 -33 -45s-7 -34 -7 -59v-228c-1 -37 -20 -67 -58 -90\ns-82 -35 -133 -35c-13 0 -20 4 -20 11c0 6 3 10 9 11c49 3 83 16 104 38s31 47 31 73z"
            },
            "¬": {
                x: 656,
                d: "M606 320v-195v-18s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v18v191h-481h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h486c16 0 25 -2 29 -6s6 -13 6 -30z"
            },
            "ð": {
                x: 571,
                d: "M284 6c43 0 78 18 106 56s41 91 41 160c1 5 1 13 1 24c0 49 -13 92 -40 131s-65 58 -114 58c-52 0 -92 -25 -119 -75c-15 -27 -23 -74 -23 -140c0 -25 0 -45 1 -58s3 -28 8 -46s12 -33 21 -47c29 -42 68 -63 118 -63zM320 615l-198 -84c-10 -5 -20 -7 -29 -7\nc-13 0 -21 2 -24 5s-4 11 -4 23v46c0 9 0 15 1 18s3 6 7 8s11 3 20 3s15 -1 19 -3s7 -4 8 -6s1 -5 1 -9v-48l171 74c-53 35 -118 53 -193 56c-10 0 -15 4 -15 13c0 5 1 9 4 10s8 2 16 2c75 0 152 -21 230 -63l109 47c16 7 28 10 35 10c13 0 21 -2 24 -6s4 -11 4 -23v-46\nc0 -12 -1 -20 -4 -23s-11 -5 -24 -5c-9 0 -16 1 -20 3s-6 4 -7 6s-1 6 -1 11v45c-39 -17 -68 -30 -87 -38c47 -33 84 -74 113 -123c30 -51 45 -109 45 -172c0 -65 -7 -121 -20 -169s-32 -87 -55 -114s-48 -46 -75 -59s-57 -19 -88 -19c-28 0 -53 4 -77 13s-42 18 -53 27\ns-24 20 -39 35c-43 44 -64 99 -64 166c0 35 5 67 16 95s31 55 59 83c41 40 91 60 152 60c72 0 124 -39 157 -117l1 1c0 51 -7 96 -20 135s-27 68 -42 86s-32 36 -53 53z"
            },
            "ø": {
                x: 505,
                d: "M391 752l-23 -84c58 -55 87 -163 87 -323c0 -98 -10 -173 -29 -225c-35 -95 -93 -142 -174 -142c-28 0 -55 7 -81 21c-3 -13 -8 -28 -13 -45c-3 -9 -5 -14 -6 -18s-3 -7 -6 -10s-7 -4 -12 -4c-6 0 -10 2 -14 6s-6 9 -6 14c0 3 8 31 23 82c-58 52 -87 159 -87 321\nc0 115 15 203 44 264c17 36 40 63 69 81s59 26 90 26c26 0 53 -7 81 -21c3 13 8 28 13 45l6 18s4 7 7 10s6 4 11 4c6 0 11 -2 15 -6s5 -9 5 -14zM150 70l175 596c-22 19 -46 28 -72 28s-51 -10 -74 -30s-39 -50 -48 -93s-14 -114 -14 -214c0 -145 11 -241 33 -287zM355 626\nl-174 -597c22 -19 46 -29 71 -29c29 0 56 11 78 34s37 60 46 109c8 45 12 116 12 214c0 44 0 78 -1 103s-4 54 -9 88s-13 60 -23 78z"
            },
            "ı": {
                x: 356,
                d: "M306 143c0 -3 -3 -12 -8 -27s-12 -32 -21 -52s-23 -37 -41 -52s-37 -22 -58 -22c-23 0 -42 8 -57 23s-22 35 -22 58c0 12 4 29 12 50l70 186c14 39 21 66 21 81c0 22 -9 33 -26 33c-20 0 -39 -10 -57 -31s-33 -52 -44 -93c-2 -8 -3 -13 -5 -15s-5 -3 -9 -3\nc-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -12 -3 -27 -10 -45l-70 -186c-15 -42 -23 -71 -23 -87c0 -22 9 -33 26 -33c19 0 37 10 55 30s33 50 45 92c2 7 4 11 5 13s2 4 3 5s4 2 7 2c7 0 10 -3 10 -9z"
            },
            "ȷ": {
                x: 467,
                d: "M413 317l-93 -370c-11 -45 -34 -81 -68 -109s-71 -42 -109 -42c-25 0 -46 5 -65 14s-28 24 -28 44c0 15 5 27 15 37s22 15 35 15c11 0 19 -4 25 -10s9 -13 9 -22c0 -4 0 -9 -2 -14s-6 -12 -13 -19s-15 -12 -26 -15c15 -7 31 -10 50 -10c27 0 51 13 70 38s34 55 43 92\nl95 377c5 21 7 38 7 52c0 31 -11 46 -32 46s-43 -9 -66 -29s-43 -53 -62 -99c-6 -9 -11 -13 -14 -14c-7 0 -10 3 -10 9c0 2 2 8 6 18s11 24 20 39s18 31 30 45s26 26 44 36s36 15 55 15c24 0 45 -9 62 -25s26 -38 26 -65c0 -12 -1 -23 -4 -34z"
            },
            "Α": {
                x: 746,
                d: "M390 691l222 -628c6 -17 14 -27 24 -31s31 -6 60 -6v-26c-16 1 -49 2 -100 2c-55 0 -93 -1 -112 -2v26c41 0 62 9 62 27c0 4 -2 10 -5 18l-60 170h-262l-53 -149c-3 -8 -4 -15 -4 -20s1 -11 3 -17s8 -13 17 -19s20 -9 34 -10v-26c-16 1 -46 2 -89 2c-39 0 -65 -1 -77 -2\nv26c47 0 79 22 94 65l212 600c4 11 10 16 17 16s13 -5 17 -16zM350 611l-122 -344h244z"
            },
            "Β": {
                x: 655,
                d: "M50 683h318c62 0 113 -17 152 -51s59 -73 59 -117c0 -38 -15 -72 -45 -101s-70 -49 -118 -58c53 -3 98 -22 134 -56s55 -73 55 -118c0 -48 -19 -90 -59 -127s-91 -55 -152 -55h-344v26c36 0 58 2 67 6s13 18 13 39v541c0 21 -4 34 -13 38s-31 7 -67 7v26zM193 363h144\nc51 0 92 15 123 45s46 66 46 107c0 35 -13 67 -38 97s-60 45 -105 45h-128c-19 0 -31 -3 -35 -7s-7 -15 -7 -32v-255zM235 26h130c51 0 91 16 121 48s45 69 45 109c0 41 -14 79 -41 113s-64 51 -112 51h-185v-282c0 -17 3 -29 7 -33s16 -6 35 -6z"
            },
            "Γ": {
                x: 591,
                d: "M517 681l24 -221h-18c-3 23 -5 40 -7 51s-4 25 -8 42s-7 30 -12 37s-11 16 -20 27s-19 18 -30 22s-26 8 -42 11s-35 5 -56 5h-110c-19 0 -32 -3 -36 -7s-6 -15 -6 -32v-544c0 -19 4 -32 12 -38s30 -8 66 -8h22v-26c-27 1 -71 2 -130 2c-58 0 -97 -1 -116 -2v26\nc37 0 60 2 68 6s12 18 12 39v539c0 21 -4 34 -12 38s-31 7 -68 7v26h467z"
            },
            "Δ": {
                x: 797,
                d: "M419 690l323 -673c3 -7 5 -11 5 -12c0 -3 -6 -5 -19 -5h-659c-13 0 -19 2 -19 5c0 1 2 5 5 12l324 674c4 7 7 11 9 13s5 3 11 3c8 0 15 -6 20 -17zM374 631l-278 -575h555z"
            },
            "Ε": {
                x: 656,
                d: "M606 253l-36 -253h-520v26c37 0 60 2 68 6s12 18 12 39v539c0 21 -4 34 -12 38s-31 7 -68 7v26h506l24 -221h-18c-4 38 -9 67 -14 88s-13 40 -26 58s-32 31 -55 38s-54 11 -92 11h-137c-19 0 -32 -3 -36 -7s-6 -15 -6 -32v-249h94c44 0 72 9 84 25s19 47 19 92h18v-260\nh-18c0 45 -7 76 -19 92s-40 25 -84 25h-94v-276c0 -17 2 -29 6 -33s17 -6 36 -6h139c25 0 47 2 66 6s36 7 49 12s25 14 35 26s18 22 24 31s12 23 17 43s8 37 10 50s6 32 10 59h18z"
            },
            "Ζ": {
                x: 575,
                d: "M520 663l-394 -635h174c27 0 50 2 71 7s38 10 52 16s26 16 36 29s18 24 23 34s10 24 14 44s5 36 6 48s3 30 5 55h18l-14 -261h-439h-15s-4 2 -5 4s-2 4 -2 9s2 12 7 19l387 625h-165c-39 0 -72 -4 -98 -13s-45 -23 -59 -42s-24 -40 -30 -61s-10 -48 -11 -79h-18l10 221\nh425c11 0 17 -1 19 -3s3 -8 3 -17z"
            },
            "Η": {
                x: 690,
                d: "M560 612v-541c0 -21 4 -35 12 -39s31 -6 68 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c37 0 60 2 68 6s12 18 12 39v271h-298v-271c0 -21 4 -35 12 -39s31 -6 68 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c37 0 60 2 68 6s12 18 12 39v541c0 21 -4 34 -12 38\ns-31 7 -68 7v26c19 -1 57 -2 113 -2s94 1 113 2v-26c-37 0 -60 -3 -68 -7s-12 -17 -12 -38v-244h298v244c0 21 -4 34 -12 38s-31 7 -68 7v26c19 -1 57 -2 113 -2s94 1 113 2v-26c-37 0 -60 -3 -68 -7s-12 -17 -12 -38z"
            },
            "Θ": {
                x: 727,
                d: "M677 340c0 -99 -31 -183 -93 -252s-135 -104 -221 -104c-85 0 -158 34 -220 103s-93 153 -93 253c0 101 30 186 92 255s136 104 222 104c85 0 158 -35 220 -104s93 -154 93 -255zM364 1c29 0 56 7 84 21s54 33 77 60s42 62 57 107s22 95 22 151c0 109 -24 194 -73 254\ns-105 89 -168 89c-29 0 -57 -7 -84 -21s-53 -34 -77 -61s-42 -63 -57 -108s-22 -96 -22 -153c0 -108 24 -191 73 -250s105 -89 168 -89zM551 404v-124h-18v34h-339v-34h-18v124h18v-34h339v34h18z"
            },
            "Ι": {
                x: 334,
                d: "M200 612v-541c0 -21 5 -35 14 -39s32 -6 70 -6v-26c-21 1 -60 2 -117 2s-96 -1 -117 -2v26c38 0 61 2 70 6s14 18 14 39v541c0 21 -5 34 -14 38s-32 7 -70 7v26c21 -1 60 -2 117 -2s96 1 117 2v-26c-38 0 -61 -3 -70 -7s-14 -17 -14 -38z"
            },
            "Κ": {
                x: 734,
                d: "M368 419l223 -341c15 -23 28 -37 39 -43s29 -9 54 -9v-26c-15 1 -45 2 -88 2c-53 0 -90 -1 -111 -2v26c27 0 41 9 41 26c0 7 -4 18 -13 33l-189 290l-128 -127v-177c0 -21 4 -35 12 -39s31 -6 68 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c37 0 60 2 68 6\ns12 18 12 39v541c0 21 -4 34 -12 38s-31 7 -68 7v26c19 -1 57 -2 113 -2s94 1 113 2v-26c-37 0 -60 -3 -68 -7s-12 -17 -12 -38v-339l332 333c5 8 8 16 8 24c0 3 -1 7 -2 10s-4 6 -9 10s-11 6 -19 7v26c17 -1 51 -2 100 -2c17 0 38 1 65 2v-26c-44 -1 -87 -23 -130 -65z"
            },
            "Λ": {
                x: 694,
                d: "M363 690l207 -629c5 -16 12 -25 22 -29s27 -6 52 -6v-26c-15 1 -47 2 -94 2c-55 0 -92 -1 -111 -2v26c42 0 63 9 63 28c0 3 -2 10 -5 19l-174 528l-166 -505c-3 -11 -5 -19 -5 -23c0 -5 0 -9 2 -15s7 -13 16 -20s22 -11 38 -12v-26c-16 1 -45 2 -88 2\nc-24 0 -47 -1 -70 -2v26c41 1 69 23 84 66l197 598c3 8 5 12 6 14s5 3 10 3s9 -1 10 -3s3 -6 6 -14z"
            },
            "Μ": {
                x: 843,
                d: "M206 667l216 -586l216 586c3 7 6 11 8 13s9 3 20 3h127v-26c-36 0 -58 -3 -67 -7s-13 -17 -13 -38v-541c0 -21 4 -35 13 -39s31 -6 67 -6v-26c-18 1 -55 2 -111 2c-55 0 -92 -1 -110 -2v26c37 0 60 2 68 6s12 18 12 39v587h-1l-237 -642c-4 -11 -9 -16 -14 -16\ns-10 5 -14 16l-235 637h-1v-555c0 -9 1 -16 2 -22s4 -13 8 -22s12 -16 24 -21s27 -7 46 -7v-26c-15 1 -45 2 -90 2s-75 -1 -90 -2v26c19 0 34 2 46 7s20 12 24 21s7 16 8 22s2 13 2 22v514c0 21 -4 34 -12 38s-31 7 -68 7v26h128c11 0 18 -1 20 -3s5 -6 8 -13z"
            },
            "Ν": {
                x: 690,
                d: "M204 671l336 -549v463c0 9 -1 17 -2 23s-4 13 -8 22s-12 15 -24 20s-27 7 -46 7v26c15 -1 45 -2 90 -2s75 1 90 2v-26c-19 0 -34 -2 -46 -7s-20 -11 -24 -20s-7 -16 -8 -22s-2 -14 -2 -23v-563v-14s-2 -5 -3 -6s-4 -2 -7 -2c-5 0 -10 4 -15 12l-371 607\nc-7 10 -12 16 -14 18v-539c0 -9 1 -16 2 -22s4 -13 8 -22s12 -16 24 -21s27 -7 46 -7v-26c-15 1 -45 2 -90 2s-75 -1 -90 -2v26c19 0 34 2 46 7s20 12 24 21s7 16 8 22s2 13 2 22v553c-12 4 -32 6 -61 6h-19v26h127c9 0 15 -1 18 -2s6 -5 9 -10z"
            },
            "Ξ": {
                x: 648,
                d: "M586 680l1 -19c1 -37 3 -77 6 -119h-18c-2 40 -5 65 -10 76c-4 7 -29 10 -75 10h-332c-45 0 -69 -3 -73 -9c-5 -7 -9 -33 -12 -77h-18l1 19c1 37 3 77 6 119h524zM57 0l-7 149h18c2 -46 5 -74 10 -84c4 -9 30 -13 79 -13h334c48 0 74 4 78 12s8 36 11 85h18l-7 -149h-534\nzM506 420v-132h-18v40h-328v-40h-18v132h18v-40h328v40h18z"
            },
            "Ο": {
                x: 727,
                d: "M677 340c0 -99 -31 -183 -93 -252s-135 -104 -221 -104c-85 0 -158 34 -220 103s-93 153 -93 253c0 101 30 186 92 255s136 104 222 104c85 0 158 -35 220 -104s93 -154 93 -255zM364 2c29 0 57 8 84 22s53 34 76 62s42 65 56 111s21 98 21 156c0 55 -7 105 -22 149\ns-33 78 -57 103s-49 44 -76 57s-55 19 -83 19c-27 0 -53 -6 -80 -19s-52 -31 -76 -56s-44 -59 -59 -103s-22 -94 -22 -150c0 -111 24 -197 72 -259s103 -92 166 -92z"
            },
            "Π": {
                x: 690,
                d: "M560 610v-539c0 -21 4 -35 12 -39s31 -6 68 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c37 0 60 2 68 6s12 18 12 39v584h-298v-584c0 -21 4 -35 12 -39s31 -6 68 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c37 0 60 2 68 6s12 18 12 39v539c0 21 -4 34 -12 38\ns-31 7 -68 7v26h590v-26c-37 0 -60 -3 -68 -7s-12 -17 -12 -38z"
            },
            "Ρ": {
                x: 629,
                d: "M196 321v-250c0 -21 4 -35 13 -39s31 -6 67 -6v-26c-19 1 -57 2 -113 2s-94 -1 -113 -2v26c36 0 58 2 67 6s13 18 13 39v541c0 21 -4 34 -13 38s-31 7 -67 7v26h306c64 0 118 -18 160 -55s63 -79 63 -128s-21 -91 -64 -126s-96 -53 -159 -53h-160zM194 342h143\nc111 0 166 53 166 158s-55 157 -166 157h-101c-19 0 -32 -3 -36 -7s-6 -15 -6 -32v-276z"
            },
            "Σ": {
                x: 675,
                d: "M327 329l-231 -295h276c83 0 141 12 174 38s53 78 61 157h18l-24 -229h-529c-14 0 -21 2 -21 7c0 2 2 6 7 12l223 286l-231 356c0 11 1 17 3 19s8 3 19 3h529l24 -221h-18c-9 79 -29 130 -60 156s-89 39 -173 39h-242l197 -303c3 -7 5 -11 5 -12c0 -3 -2 -8 -7 -13z"
            },
            "Τ": {
                x: 711,
                d: "M644 680l17 -221h-18c-3 46 -7 79 -11 101s-14 42 -27 58s-30 26 -51 30s-52 6 -92 6c-31 0 -50 0 -55 -1c-8 -2 -13 -6 -15 -11s-3 -14 -3 -27v-542c0 -19 4 -32 13 -38s34 -9 73 -9h28v-26c-64 1 -113 2 -147 2s-83 -1 -147 -2v26h28c39 0 64 3 73 9s13 19 13 38v542\nc0 9 -1 16 -1 20s-1 7 -4 11s-8 6 -14 7c-5 1 -24 1 -55 1c-27 0 -49 0 -66 -2s-33 -6 -47 -12s-23 -12 -30 -20s-14 -20 -19 -37s-9 -33 -11 -51s-5 -42 -8 -73h-18l17 221h577z"
            },
            "Υ": {
                x: 727,
                d: "M397 353v-281c0 -19 4 -32 12 -38s30 -8 66 -8h22v-26c-28 1 -72 2 -133 2s-105 -1 -133 -2v26h22c36 0 58 2 66 8s12 19 12 38v281c0 17 -1 35 -2 54s-5 43 -11 73s-16 56 -26 78s-26 42 -47 59s-46 25 -74 25c-21 0 -42 -7 -63 -21s-33 -37 -37 -70c-1 -3 -1 -6 -1 -7\ns-2 -1 -3 -2s-3 -2 -6 -2c-5 0 -8 0 -9 2s-2 6 -2 11c0 33 11 65 32 97s51 49 90 49c29 0 55 -7 78 -21s40 -31 53 -49s23 -40 33 -67s17 -48 20 -62s5 -29 8 -46h1c2 13 5 24 7 36s6 29 12 50s13 39 22 56s21 33 34 50s29 30 49 39s42 14 66 14c27 0 49 -9 69 -27\ns34 -37 42 -58s11 -41 11 -61c0 -5 -1 -9 -2 -11s-4 -2 -9 -2h-5s-2 1 -3 2s-2 3 -2 4v5c-4 33 -16 56 -37 70s-42 21 -63 21c-57 0 -99 -32 -126 -95c-22 -53 -33 -117 -33 -194z"
            },
            "Φ": {
                x: 675,
                d: "M368 129v-57c0 -19 4 -32 12 -38s30 -8 66 -8h22v-26c-27 1 -71 2 -131 2c-61 0 -105 -1 -132 -2v26h22c36 0 58 2 66 8s12 19 12 38v57c-75 7 -135 31 -183 72s-72 88 -72 141c0 51 23 98 70 140s109 65 185 72v57c0 19 -4 31 -12 37s-30 9 -66 9h-22v26\nc27 -1 71 -2 132 -2c60 0 104 1 131 2v-26h-22c-36 0 -58 -3 -66 -9s-12 -18 -12 -37v-57c77 -7 139 -31 186 -72s71 -88 71 -141c0 -51 -24 -97 -71 -139s-109 -66 -186 -73zM305 146v391c-51 -5 -94 -24 -129 -55s-52 -78 -52 -141c0 -61 17 -108 52 -139s78 -50 129 -56z\nM368 537v-391c21 2 42 7 61 14s39 17 58 31s35 34 47 60s17 56 17 91c0 34 -6 64 -17 90s-27 45 -46 59s-38 25 -58 32s-40 12 -62 14z"
            },
            "Χ": {
                x: 766,
                d: "M402 379l220 -320c10 -14 20 -23 31 -27s32 -6 63 -6v-26c-16 1 -49 2 -100 2c-55 0 -93 -1 -114 -2v26c15 1 27 4 34 10s10 12 10 17c0 4 -3 10 -8 17l-174 254l-160 -232c-7 -9 -10 -18 -10 -27c0 -23 13 -36 40 -39v-26c-17 1 -50 2 -99 2c-41 0 -70 -1 -85 -2v26\nc55 0 98 21 127 63l174 253l-193 282c-11 15 -22 24 -34 28s-32 5 -61 5v26c16 -1 49 -2 100 -2c55 0 93 1 114 2v-26c-15 -1 -26 -3 -33 -9s-11 -12 -11 -18c0 -3 3 -8 8 -17l148 -216l132 191c8 11 12 21 12 30c0 23 -13 36 -40 39v26c17 -1 50 -2 99 -2c41 0 70 1 85 2\nv-26c-25 0 -47 -4 -66 -13s-32 -17 -39 -24s-14 -17 -22 -28z"
            },
            "Ψ": {
                x: 726,
                d: "M393 611v-464c97 21 146 105 147 254c1 53 7 92 20 117s36 38 68 38h26c9 0 15 0 18 -1s4 -3 4 -7s-4 -7 -12 -8c-41 -8 -61 -48 -61 -121c0 -13 -1 -23 -1 -33s-1 -25 -4 -45s-7 -37 -12 -53s-12 -33 -23 -52s-23 -36 -37 -50s-33 -26 -56 -36s-48 -17 -77 -20v-58\nc0 -19 4 -32 12 -38s30 -8 66 -8h22v-26c-27 1 -71 2 -131 2c-61 0 -105 -1 -132 -2v26h22c36 0 58 2 66 8s12 19 12 38v58c-41 5 -77 17 -106 36s-50 43 -64 71s-23 55 -29 80s-9 52 -9 79c0 31 -2 58 -6 78s-10 35 -18 44s-15 14 -20 16s-13 5 -23 7c-3 0 -5 2 -5 7\nc0 4 1 6 4 7s8 1 17 1h26c31 0 53 -12 67 -36s20 -59 21 -108c0 -157 48 -246 145 -265v464c0 19 -4 31 -12 37s-30 9 -66 9h-22v26c27 -1 71 -2 132 -2c60 0 104 1 131 2v-26h-22c-36 0 -58 -3 -66 -9s-12 -18 -12 -37z"
            },
            "Ω": {
                x: 695,
                d: "M645 146l-29 -146h-151c-11 0 -17 1 -19 2s-3 6 -3 14c0 46 17 113 52 202c15 37 27 66 34 87s15 45 21 73s9 53 9 77c0 70 -21 126 -63 167s-91 61 -149 61c-56 0 -105 -20 -147 -61s-64 -96 -64 -167c0 -54 21 -131 62 -232c36 -91 54 -160 54 -207c0 -7 -1 -12 -3 -14\ns-8 -2 -19 -2h-151l-29 146h18c9 -43 15 -68 18 -75c2 -6 4 -11 6 -13s9 -4 18 -6s23 -3 41 -3h81c-5 27 -14 53 -25 77s-29 56 -54 95c-21 35 -37 61 -47 79s-21 43 -31 72s-15 56 -15 82c0 67 28 125 84 173s123 72 204 72c79 0 147 -24 203 -72s84 -106 84 -173\nc0 -26 -5 -53 -15 -82s-20 -54 -30 -72s-27 -46 -50 -83c-43 -69 -69 -125 -77 -168h81c27 0 44 2 51 5s12 9 15 18c5 15 10 39 17 74h18z"
            },
            "α": {
                x: 649,
                d: "M473 253v-85c45 59 78 127 101 204c2 9 4 16 5 18s4 3 9 3c7 0 11 -3 11 -9c0 -4 -3 -16 -9 -37s-19 -53 -40 -95s-47 -81 -77 -117v-31c0 -7 0 -16 1 -28s2 -21 3 -27s3 -12 5 -19s4 -13 8 -16s9 -4 14 -4c11 0 22 5 33 14s18 20 23 33c3 7 7 11 12 11c7 0 10 -3 10 -9\nc0 -11 -8 -25 -23 -43s-35 -26 -58 -26c-45 0 -74 28 -88 84c-66 -56 -135 -84 -207 -84c-49 0 -86 16 -114 48s-42 72 -42 118c0 71 27 137 82 196s115 89 180 89c51 0 90 -18 118 -55s43 -81 43 -133zM410 98c-1 15 -2 27 -2 36v38s1 30 1 38c0 23 -1 42 -1 55\ns-2 31 -5 54s-9 40 -15 53s-15 24 -28 34s-29 15 -48 15c-24 0 -48 -8 -74 -25s-49 -43 -68 -76c-15 -26 -28 -60 -38 -102s-15 -74 -15 -98c0 -29 7 -54 21 -76s38 -34 70 -34c69 0 137 29 202 88z"
            },
            "β": {
                x: 640,
                d: "M590 582c0 -78 -39 -137 -116 -178c19 -14 33 -29 43 -45c20 -31 30 -67 30 -108c0 -73 -28 -134 -84 -185s-121 -76 -194 -76c-29 0 -56 10 -80 30s-39 44 -44 72l-70 -280c-1 -4 -5 -6 -13 -6s-11 3 -9 10l158 627c7 28 18 56 31 85s29 57 48 84s42 50 70 67\ns57 26 88 26c43 0 78 -12 104 -37s38 -54 38 -86zM416 405c-14 4 -31 6 -50 6c-22 0 -37 -3 -46 -9c12 -3 24 -5 35 -5h10c20 0 37 3 51 8zM538 591c0 26 -8 49 -22 67s-37 27 -70 27c-47 0 -90 -25 -129 -73s-68 -107 -85 -176l-65 -263c-3 -10 -4 -22 -4 -37\nc0 -36 10 -66 29 -90s47 -36 82 -36s70 11 104 34s60 52 76 88c23 53 35 102 35 148c0 49 -15 85 -46 110c-30 -9 -54 -13 -73 -13h-12c-40 0 -60 8 -60 24c0 20 24 30 73 30h8c23 0 45 -4 67 -12c30 17 52 42 68 75s24 66 24 97z"
            },
            "γ": {
                x: 613,
                d: "M409 122c21 57 44 113 68 167c37 85 60 131 67 138c1 3 4 4 9 4c7 0 10 -3 10 -8c0 -1 -1 -4 -3 -9s-6 -12 -10 -20s-6 -13 -8 -17c-35 -70 -66 -141 -94 -213s-43 -117 -45 -133c-7 -54 -18 -111 -35 -172c-13 -49 -25 -73 -35 -73c-7 0 -11 6 -11 17\nc0 29 17 101 52 214c9 29 13 63 13 104c0 23 -1 44 -3 65s-6 43 -13 67s-16 44 -27 61s-26 32 -46 44s-43 17 -70 17c-34 0 -65 -11 -94 -32s-49 -48 -60 -79c-7 -9 -11 -14 -14 -15c-7 0 -10 3 -10 9c0 8 4 21 13 40s20 39 35 61s36 41 61 57s52 25 81 25\nc57 0 100 -34 127 -103c25 -58 39 -130 42 -216z"
            },
            "δ": {
                x: 504,
                d: "M270 436c-39 77 -59 134 -59 172c0 19 4 36 11 50s15 23 24 30s19 12 32 16s23 6 29 6h19c21 0 47 -3 78 -10c15 -3 25 -6 30 -8s10 -4 14 -8s6 -8 6 -14c0 -9 -3 -17 -10 -25s-16 -12 -26 -12c-11 0 -26 6 -45 19c-33 19 -59 28 -80 28c-19 0 -34 -5 -43 -15\ns-14 -21 -14 -32c0 -33 32 -90 97 -172c45 -59 67 -118 67 -178c0 -45 -8 -90 -24 -135s-40 -83 -71 -114s-66 -46 -103 -46c-42 0 -78 15 -108 45s-44 71 -44 122c0 60 22 118 64 174s94 92 156 107zM281 417c-32 -9 -60 -26 -84 -51s-42 -53 -54 -84s-21 -60 -27 -86\ns-8 -50 -8 -69c0 -42 10 -72 30 -91s41 -28 65 -28c27 0 52 15 73 44s35 60 44 95s14 67 14 96c0 30 -3 55 -10 75s-21 54 -43 99z"
            },
            "ε": {
                x: 421,
                d: "M295 227h-166c-7 -33 -11 -61 -11 -85c0 -45 11 -78 32 -100s47 -32 77 -32c33 0 68 12 105 37c4 3 7 5 10 5c6 0 9 -4 9 -12c0 -4 -5 -10 -17 -18s-29 -15 -50 -22s-41 -10 -60 -10c-50 0 -91 17 -124 52s-50 79 -50 134c0 75 27 136 80 184s112 71 178 71h34\nc7 0 13 -1 16 -1s6 -1 9 -3s4 -5 4 -9c0 -11 -11 -16 -32 -16h-29c-44 0 -81 -13 -110 -38s-50 -61 -63 -108h162h15s6 -2 9 -4s4 -5 4 -9c0 -11 -11 -16 -32 -16z"
            },
            "ζ": {
                x: 521,
                d: "M194 49l92 -32c13 -4 24 -7 32 -11s17 -10 28 -18s20 -18 26 -30s9 -26 9 -43c0 -28 -10 -55 -31 -81s-47 -38 -77 -38c-15 0 -30 3 -45 10s-28 14 -36 21s-12 13 -12 17c0 7 3 10 10 10c3 0 7 -2 11 -6c21 -21 45 -32 72 -32c17 0 31 7 42 22s16 30 16 46\nc0 15 -4 27 -13 38s-17 18 -26 22s-23 9 -41 15c-19 7 -38 14 -58 20c-15 5 -26 9 -35 13s-22 11 -37 21s-28 21 -37 33s-17 29 -24 50s-10 44 -10 70c0 87 28 174 83 258s115 143 179 176c-8 14 -12 31 -12 51c0 30 5 45 16 45c7 0 10 -3 10 -10c0 -1 0 -3 -1 -6\ns-1 -8 -2 -13s-1 -11 -1 -16c0 -15 3 -29 9 -42c17 7 38 11 63 11c51 0 77 -8 77 -25c0 -19 -29 -29 -86 -29c-28 0 -48 6 -60 17c-61 -35 -113 -92 -157 -170s-67 -152 -67 -221c0 -71 31 -119 93 -143zM347 593c7 -5 20 -7 39 -7c29 0 49 3 62 8c-16 4 -34 6 -55 6\ns-36 -2 -46 -7z"
            },
            "η": {
                x: 556,
                d: "M498 277l-115 -458c-6 -23 -19 -34 -38 -34c-7 0 -14 2 -19 7s-8 11 -8 18c0 1 1 7 3 17l116 460c6 23 9 44 9 64c0 47 -18 70 -54 70c-37 0 -70 -13 -99 -40c-11 -9 -23 -21 -33 -35s-17 -26 -22 -35s-8 -15 -9 -18l-33 -132l-22 -90c-9 -35 -14 -55 -16 -60\nc-7 -14 -19 -21 -34 -21c-7 0 -13 2 -18 7s-8 11 -8 18s6 33 18 78c7 27 14 55 20 82l28 108c11 50 17 81 17 92c0 31 -10 46 -31 46c-18 0 -33 -10 -44 -31s-21 -50 -30 -87c-3 -11 -4 -19 -6 -21s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 2 1 9 4 20s7 24 12 40s11 30 16 41\nc17 35 41 52 71 52c23 0 44 -7 61 -23s26 -38 27 -65c42 59 93 88 154 88c37 0 64 -10 83 -29s28 -45 28 -76c0 -18 -3 -38 -8 -59z"
            },
            "θ": {
                x: 503,
                d: "M453 503c0 -74 -14 -151 -43 -231s-66 -148 -111 -202s-90 -80 -134 -80c-25 0 -45 8 -62 24s-28 35 -35 60s-12 47 -14 65s-4 35 -4 52c0 73 14 149 42 229s66 147 112 202s90 82 135 82c38 0 66 -19 85 -58s29 -86 29 -143zM150 362h211c21 83 32 149 32 198\nc0 83 -18 124 -55 124c-35 0 -73 -36 -112 -108c-26 -47 -51 -118 -76 -214zM354 332h-212c-21 -88 -32 -154 -32 -199c0 -82 19 -123 56 -123c33 0 69 33 106 98c30 53 57 127 82 224z"
            },
            "ι": {
                x: 361,
                d: "M311 143c0 -24 -17 -56 -53 -95s-78 -58 -127 -58c-26 0 -46 8 -60 24s-21 36 -21 57c0 13 5 33 15 60s16 43 17 48c2 8 4 15 6 21s4 13 7 22c9 26 19 62 30 107c1 5 5 19 11 41s9 38 12 45c7 17 19 26 36 26c7 0 13 -2 18 -7s8 -11 8 -18c0 -3 -4 -20 -11 -50\ns-19 -70 -33 -120s-29 -94 -44 -135c-11 -30 -16 -53 -16 -68c0 -9 1 -17 4 -22s7 -8 10 -9s8 -2 13 -2c27 0 56 11 87 32s53 54 68 97c3 9 7 13 13 13c7 0 10 -3 10 -9z"
            },
            "κ": {
                x: 580,
                d: "M208 250c23 -1 43 -3 60 -5s37 -6 60 -13s40 -18 53 -32s19 -32 19 -53c0 -5 -2 -16 -5 -33c-5 -20 -8 -39 -8 -56c0 -32 11 -48 33 -48c12 0 22 4 32 12s19 18 26 32s12 27 16 38s8 24 12 40c2 9 4 14 6 16s4 4 8 4c7 0 10 -3 10 -9c0 -2 -1 -8 -4 -18s-6 -23 -12 -39\ns-12 -29 -18 -41c-21 -37 -48 -55 -79 -55c-25 0 -46 8 -63 26s-25 42 -25 71c0 11 1 23 4 36c2 7 3 14 3 21c0 53 -57 82 -170 87c-1 -2 -9 -33 -24 -93s-23 -94 -25 -101c-2 -10 -4 -18 -6 -23s-6 -10 -12 -16s-14 -8 -23 -8c-7 0 -13 2 -18 7s-8 11 -8 18c0 5 1 12 3 20\nl93 371c6 23 19 35 39 35c7 0 13 -2 18 -7s8 -11 8 -18l-38 -159c19 6 37 15 55 27s42 32 73 59c22 18 39 32 51 41s28 19 50 30s43 17 62 17c11 0 19 -2 25 -7s10 -10 11 -14s1 -7 1 -11c0 -11 -5 -22 -14 -33s-21 -16 -36 -16c-7 0 -15 2 -22 7s-11 13 -11 25\nc0 9 2 16 5 21c-19 -7 -36 -16 -51 -27s-38 -29 -69 -56c-41 -35 -73 -58 -95 -70z"
            },
            "λ": {
                x: 582,
                d: "M306 623l201 -575c6 -19 13 -32 20 -41c3 -3 5 -6 5 -9c0 -5 -4 -8 -11 -8h-19c-14 0 -23 0 -27 1s-8 3 -13 8c-9 9 -17 23 -24 42c-30 81 -60 165 -89 254c-23 -27 -55 -66 -98 -117s-78 -94 -105 -126s-42 -50 -47 -55s-12 -8 -21 -8c-8 0 -15 2 -20 7s-8 12 -8 19\nc0 9 7 20 20 33l260 263c6 6 9 9 9 10s-9 27 -26 77s-35 101 -54 154s-30 83 -33 89c-7 13 -14 21 -20 25s-14 7 -23 8c-7 1 -11 5 -11 10c0 7 6 10 17 10c61 0 100 -24 117 -71z"
            },
            "μ": {
                x: 632,
                d: "M166 22l-47 -186c-3 -12 -5 -20 -7 -26s-6 -12 -12 -17s-14 -8 -23 -8c-7 0 -14 2 -19 7s-8 11 -8 18c0 1 1 7 3 17l145 579c6 23 19 35 39 35c7 0 13 -2 18 -7s8 -11 8 -18c0 -5 -4 -24 -13 -57l-45 -180c-9 -37 -13 -64 -13 -81c0 -59 25 -88 74 -88c43 0 81 24 114 71\nc8 10 14 23 18 38l70 278c6 23 19 34 38 34c7 0 14 -2 19 -7s8 -11 8 -18c0 -2 -6 -26 -17 -71c-7 -27 -14 -55 -20 -82l-28 -108c-11 -46 -16 -76 -16 -89c0 -31 10 -46 31 -46c13 0 25 7 35 20s18 27 23 42s11 35 17 60c2 9 4 14 6 16s4 4 8 4c7 0 10 -3 10 -9\nc0 -2 -1 -8 -4 -19s-7 -25 -12 -41s-9 -29 -14 -39c-18 -36 -42 -54 -72 -54c-20 0 -38 6 -55 18s-27 31 -32 56c-37 -49 -80 -74 -131 -74c-41 0 -73 11 -96 32z"
            },
            "ν": {
                x: 561,
                d: "M217 431l-99 -401c72 24 138 68 198 132s103 146 131 245c7 23 19 34 38 34c7 0 13 -2 18 -7s8 -11 8 -18c0 -2 -1 -8 -3 -16s-6 -21 -12 -39s-14 -37 -24 -57s-25 -43 -44 -70s-40 -53 -64 -78c-35 -36 -75 -66 -121 -92s-82 -44 -109 -52s-44 -12 -53 -12h-21\nc-7 0 -10 3 -10 10l88 353c2 8 3 15 3 20c0 4 -1 7 -3 9s-6 4 -14 6s-18 3 -33 3s-22 3 -22 10c0 5 1 10 3 13s6 4 8 5s5 1 10 2c4 0 24 2 59 5s54 5 57 5c7 0 11 -3 11 -10z"
            },
            "ξ": {
                x: 517,
                d: "M289 -5l60 -24c33 -14 49 -37 49 -70c0 -24 -10 -48 -29 -71s-44 -34 -74 -34c-17 0 -34 3 -51 10s-30 14 -40 21s-15 13 -15 17c0 7 3 10 10 10c3 0 7 -2 12 -7c27 -21 55 -31 84 -31c16 0 28 6 37 18s14 24 14 37c0 15 -6 26 -18 35c-12 7 -36 17 -73 30l-90 36\nc-15 6 -27 12 -35 16s-19 11 -34 22s-26 25 -34 41s-12 34 -12 54c0 19 4 41 14 66s27 51 50 79s51 50 83 67c-45 25 -67 61 -67 108c0 36 14 71 44 107s73 62 129 78c-5 10 -7 24 -7 41c0 30 5 45 16 45c7 0 10 -3 10 -10c0 -1 0 -3 -1 -6s-1 -8 -2 -13s-1 -11 -1 -16\nc0 -15 2 -27 6 -36c19 3 40 5 63 5c53 0 80 -8 80 -25c0 -19 -29 -29 -86 -29c-30 0 -51 7 -63 21c-37 -17 -65 -42 -85 -75s-30 -64 -30 -95c0 -36 11 -63 34 -82c24 8 52 12 83 12c53 0 79 -8 79 -25c0 -19 -30 -29 -90 -29c-29 0 -53 3 -71 8c-6 2 -11 3 -14 3\nc-8 0 -22 -8 -42 -24s-38 -40 -56 -68s-28 -55 -28 -81c0 -41 29 -72 86 -94zM340 595c7 -6 21 -9 42 -9c29 0 49 3 62 8c-16 4 -35 6 -56 6s-37 -2 -48 -5zM261 321c12 -5 29 -8 52 -8c30 0 51 3 63 8c-17 4 -36 6 -57 6c-23 0 -42 -2 -58 -6z"
            },
            "ο": {
                x: 515,
                d: "M465 275c0 -71 -27 -135 -81 -195s-115 -90 -181 -90c-45 0 -83 16 -111 47s-42 71 -42 119c0 71 28 136 82 196s114 89 180 89c45 0 82 -16 110 -47s43 -71 43 -119zM204 10c22 0 46 8 70 23s46 39 65 70c17 28 32 64 43 107s16 77 16 101c0 34 -8 61 -24 81\ns-38 29 -63 29c-23 0 -48 -9 -73 -25s-48 -42 -69 -78c-13 -24 -25 -57 -36 -99s-16 -75 -16 -99c0 -34 9 -60 25 -80s37 -30 62 -30z"
            },
            "π": {
                x: 627,
                d: "M283 377l-58 -226c-8 -33 -17 -64 -26 -93c-5 -17 -8 -30 -11 -38s-8 -14 -14 -20s-15 -10 -24 -10c-18 0 -27 9 -27 26c0 5 3 13 8 24c54 115 97 227 129 337h-57c-51 0 -94 -27 -129 -82c-5 -6 -10 -9 -13 -9c-7 0 -11 3 -11 8c0 3 7 15 20 36s26 39 38 52\nc31 33 65 49 103 49h329c8 0 14 -1 18 -1s8 -2 12 -6s7 -8 7 -15c0 -21 -15 -32 -46 -32h-112c-14 -60 -21 -116 -21 -167c0 -62 9 -116 27 -162c5 -10 7 -17 7 -22c0 -9 -4 -16 -12 -24s-17 -12 -27 -12c-27 0 -41 41 -41 122c0 55 15 143 44 265h-113z"
            },
            "ρ": {
                x: 563,
                d: "M53 -173l98 390c16 65 46 119 91 161s91 63 137 63c37 0 69 -14 95 -42s39 -67 39 -118c0 -74 -26 -141 -77 -201s-106 -90 -164 -90c-45 0 -77 24 -96 71c-9 -33 -18 -72 -29 -115s-19 -75 -25 -98s-9 -36 -10 -39c-7 -16 -18 -24 -35 -24c-7 0 -14 2 -19 7s-8 11 -8 18\nc0 1 1 7 3 17zM271 10c25 0 50 11 74 33s44 51 59 86c10 24 20 57 30 97s14 72 14 95c0 30 -6 55 -18 73s-30 27 -52 27c-5 0 -11 0 -18 -1s-17 -6 -31 -14s-27 -17 -39 -30s-26 -34 -40 -62s-27 -60 -36 -97c-1 -4 -3 -15 -8 -34s-10 -36 -14 -53s-6 -27 -6 -29\nc0 -7 2 -16 6 -29s13 -26 27 -40s31 -22 52 -22z"
            },
            "ς": {
                x: 470,
                d: "M240 25l-97 55c-11 7 -21 13 -28 18s-17 13 -29 24s-20 24 -26 40s-10 34 -10 53c0 57 27 109 81 156s117 70 189 70c24 0 47 -3 68 -8s32 -13 32 -22c0 -3 -1 -7 -4 -10s-7 -5 -11 -5c-3 0 -6 1 -11 4c-31 14 -57 21 -79 21c-55 0 -104 -17 -149 -53s-67 -77 -67 -123\nc0 -15 1 -28 5 -39s11 -22 22 -32s20 -17 28 -22s21 -12 39 -23l56 -31c1 -1 7 -4 21 -12s23 -13 27 -16c27 -15 41 -38 41 -71c0 -25 -10 -49 -30 -72s-43 -34 -71 -34c-11 0 -23 3 -37 7s-21 9 -21 15s3 9 10 9c3 0 6 -1 10 -3c13 -5 25 -8 38 -8c15 0 27 6 35 18\ns13 24 13 37c0 10 -2 19 -7 26s-9 13 -14 16s-13 8 -24 15z"
            },
            "σ": {
                x: 616,
                d: "M520 377h-111c22 -30 33 -67 33 -110c0 -73 -26 -137 -78 -193s-108 -84 -169 -84c-44 0 -79 15 -105 45s-40 67 -40 111c0 30 7 61 20 94s30 64 52 92s49 52 82 71s68 28 104 28h221c8 0 14 -1 18 -1s9 -2 13 -6s6 -8 6 -15c0 -21 -15 -32 -46 -32zM196 10\nc23 0 47 8 72 24s46 39 63 68c16 26 28 57 37 92s14 64 14 85c0 35 -8 60 -26 75s-40 23 -65 23c-28 0 -53 -7 -75 -21s-41 -32 -54 -53s-23 -44 -32 -69s-15 -47 -18 -66s-4 -36 -4 -50c0 -34 8 -61 24 -80s38 -28 64 -28z"
            },
            "τ": {
                x: 573,
                d: "M311 377l-68 -346c-5 -28 -18 -42 -39 -42c-9 0 -16 2 -20 7s-7 11 -7 18c0 3 2 10 5 20l104 343h-83c-51 0 -94 -27 -129 -82c-5 -6 -10 -9 -13 -9c-7 0 -11 3 -11 8c0 3 7 15 20 36s26 39 38 52c31 33 65 49 103 49h275c8 0 14 -1 18 -1s8 -2 12 -6s7 -8 7 -15\nc0 -21 -15 -32 -46 -32h-166z"
            },
            "υ": {
                x: 585,
                d: "M535 374c0 -28 -7 -70 -21 -126s-36 -106 -67 -151c-49 -71 -103 -107 -163 -107c-43 0 -80 10 -110 30s-45 53 -45 99c0 35 19 101 56 199c11 29 17 53 17 70c0 22 -9 33 -26 33c-20 0 -38 -11 -56 -31s-33 -51 -45 -93c-2 -8 -3 -13 -5 -15s-5 -3 -9 -3\nc-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -57c0 -12 -6 -34 -17 -65c-34 -88 -51 -151 -51 -188c0 -31 8 -56 25 -73s41 -25 72 -25c30 0 59 12 86 34s50 49 67 80s31 60 41 90s15 54 15 72c0 35 -12 65 -35 88\nc-8 7 -12 14 -12 23c0 10 5 19 14 29s20 15 32 15c5 0 10 -1 15 -3s10 -9 16 -20s9 -25 9 -44z"
            },
            "φ": {
                x: 611,
                d: "M433 685l-59 -242c55 -3 100 -22 135 -55s52 -74 52 -125c0 -65 -30 -126 -89 -183s-129 -87 -212 -92l-37 -149c-1 -3 -2 -8 -4 -15s-4 -12 -5 -16s-2 -7 -3 -8c-1 -3 -4 -4 -9 -4c-7 0 -10 3 -10 8s7 35 22 90c3 10 7 26 12 47s8 37 11 47c-54 3 -99 21 -134 53\ns-53 74 -53 127c0 65 28 124 85 180s125 87 205 94c6 0 9 1 10 3c1 1 3 6 5 15l54 215c2 9 4 14 5 16s4 3 9 3c7 0 10 -3 10 -9zM368 423l-103 -414c37 3 71 13 102 31s56 41 75 68s33 56 43 86s15 61 15 90c0 45 -13 79 -38 102s-57 35 -94 37zM242 8l104 414\nc-46 -3 -87 -18 -124 -46s-64 -63 -83 -104s-28 -82 -28 -125c0 -26 4 -48 13 -67s20 -34 34 -43s28 -16 42 -21s28 -7 42 -8z"
            },
            "χ": {
                x: 651,
                d: "M349 161l226 258c7 7 12 11 16 11c7 0 10 -3 10 -10c0 -3 -3 -7 -9 -14l-237 -270c24 -89 46 -158 66 -209c11 -26 20 -47 28 -63s15 -28 21 -34s9 -11 12 -12s7 -2 12 -2c9 0 20 4 30 12s18 17 23 30c3 8 7 12 12 12c7 0 11 -3 11 -9c0 -11 -8 -25 -23 -41\ns-35 -24 -60 -24c-26 0 -48 6 -66 16s-30 20 -36 30s-13 24 -20 41c-8 20 -29 84 -64 193l-116 -132c-69 -80 -108 -124 -116 -132c-3 -3 -7 -5 -10 -5c-6 0 -9 3 -9 10c0 3 3 9 9 16l236 268c-25 91 -46 157 -63 200c-30 80 -55 120 -75 120c-5 0 -9 -1 -15 -3\ns-13 -6 -21 -13s-14 -17 -19 -29c-1 -6 -5 -9 -11 -9c-7 0 -11 3 -11 9c0 11 8 24 23 40s35 25 60 25c37 0 66 -9 87 -28c6 -6 11 -11 14 -15s7 -14 14 -29s15 -36 25 -63c9 -25 18 -50 25 -74s14 -48 21 -71z"
            },
            "ψ": {
                x: 693,
                d: "M493 670l-164 -660c71 0 135 31 191 94c29 33 50 66 64 99s20 61 20 83c0 35 -12 64 -36 88c-7 7 -11 15 -11 23c0 10 5 19 14 29s20 15 32 15c5 0 10 -1 15 -3s10 -9 16 -20s9 -26 9 -44c0 -23 -4 -52 -12 -88s-15 -61 -22 -78c-17 -44 -44 -86 -80 -125\nc-60 -62 -129 -93 -206 -93c-3 -16 -11 -52 -25 -106s-22 -82 -24 -84c-1 -3 -4 -4 -8 -4c-7 0 -11 3 -11 9c0 4 8 35 23 92c3 10 7 26 12 47s8 37 11 47c-50 4 -91 17 -123 39s-47 56 -47 101c0 30 18 92 54 187c11 29 17 53 17 70c0 22 -9 33 -26 33\nc-20 0 -39 -10 -57 -31s-33 -52 -44 -93c-2 -8 -3 -13 -5 -15s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 4 3 13 8 28s12 32 22 51s22 36 40 51s38 23 59 23c23 0 42 -7 57 -23s22 -35 22 -58c0 -11 -6 -34 -18 -67c-31 -83 -47 -139 -47 -169c0 -65 38 -103 114 -112l165 662\nc2 9 4 14 6 16s4 4 8 4c7 0 11 -3 11 -9c0 -1 -1 -3 -2 -8z"
            },
            "ω": {
                x: 682,
                d: "M632 376c0 -27 -6 -67 -18 -118s-26 -91 -39 -120c-44 -99 -97 -148 -160 -148s-100 36 -111 109c-15 -27 -36 -52 -62 -75s-57 -34 -94 -34c-34 0 -58 13 -74 40s-24 59 -24 96c0 47 8 96 24 148s37 98 63 138c1 1 3 4 5 7s3 6 4 7s3 4 5 6s5 3 7 4s5 1 8 1\nc9 0 13 -6 13 -18c0 -1 -6 -10 -17 -27c-55 -77 -83 -150 -83 -220c0 -77 28 -116 85 -116c29 0 56 11 81 32s44 44 56 67c-1 12 1 33 7 63s12 49 19 59c5 8 11 12 20 12c11 0 17 -7 17 -20c0 -25 -11 -64 -34 -117c6 -31 17 -54 32 -71s37 -25 66 -25c25 0 48 10 70 29\ns41 44 56 73c25 49 38 91 38 124c0 35 -11 65 -34 91c-8 9 -12 17 -12 24c0 10 5 20 14 30s19 15 29 15c29 0 43 -22 43 -66z"
            },
            "ϑ": {
                x: 620,
                d: "M520 356l28 -7c15 -3 22 -6 22 -11c0 -7 -3 -11 -9 -11c-3 0 -19 3 -46 9c-14 -55 -34 -108 -59 -159s-56 -95 -92 -132s-72 -55 -108 -55c-40 0 -71 8 -94 25c-24 19 -36 48 -36 87c0 18 3 39 8 62l18 73c1 5 4 16 8 34s8 31 10 39c7 29 11 51 11 65c0 31 -10 46 -31 46\nc-18 0 -33 -10 -44 -31s-21 -50 -30 -87c-3 -11 -4 -19 -6 -21s-5 -3 -9 -3c-7 0 -11 3 -11 9c0 2 1 9 4 20s7 24 12 40s11 30 16 41c17 35 41 52 71 52c23 0 43 -7 61 -23s26 -38 26 -67c0 -12 -3 -30 -10 -54c-3 -13 -7 -29 -12 -48c-3 -11 -6 -25 -10 -42s-8 -28 -9 -35\nc-9 -38 -13 -65 -13 -82c0 -53 24 -80 73 -80c20 0 39 9 57 28s38 49 59 90c28 57 53 133 75 227c-18 6 -36 13 -52 21s-32 19 -50 32s-32 30 -42 50s-16 41 -16 64c0 41 14 82 43 122s62 60 101 60c21 0 39 -7 54 -20s27 -30 34 -52s11 -42 14 -62s4 -40 4 -61\nc0 -45 -7 -96 -20 -153zM456 375c19 86 29 149 29 190c0 17 0 31 -1 43s-4 24 -7 37s-9 22 -17 29s-17 10 -28 10c-31 0 -60 -18 -84 -54s-36 -72 -36 -107c0 -67 48 -116 144 -148z"
            },
            "ϕ": {
                x: 658,
                d: "M302 44c75 0 140 26 196 76s85 104 85 163c0 29 -9 54 -25 74s-39 30 -70 30c-43 0 -82 -20 -118 -61s-61 -94 -77 -159c-2 -7 -5 -20 -9 -39s-7 -38 -10 -54s-4 -24 -4 -25c0 -3 11 -5 32 -5zM259 -8c-1 -4 -3 -21 -9 -52s-12 -60 -17 -87s-8 -42 -9 -45\nc-7 -16 -19 -24 -36 -24s-26 8 -26 25c0 4 2 11 5 21l52 169c-46 10 -86 31 -119 64s-50 75 -50 127c0 45 13 96 40 154s48 87 63 87c7 0 10 -3 10 -8c0 -3 -4 -8 -11 -17c-25 -31 -44 -68 -58 -111s-21 -74 -21 -95c0 -36 14 -67 41 -94s67 -45 122 -56c11 35 19 63 25 82\ns15 44 26 76s21 58 30 76s20 39 34 62s27 40 41 52s30 21 48 30s37 13 57 13c39 0 67 -14 85 -41s26 -58 26 -94c0 -80 -32 -153 -96 -218s-138 -98 -219 -98c-15 0 -26 1 -34 2z"
            },
            "ϖ": {
                x: 872,
                d: "M211 431h574c8 0 14 -1 18 -1s9 -2 13 -6s6 -8 6 -15c0 -15 -7 -25 -22 -30c-4 -1 -21 -2 -50 -2c7 -25 11 -50 11 -75c0 -27 -6 -57 -17 -92s-25 -69 -44 -102s-44 -61 -74 -84s-62 -34 -95 -34c-67 0 -101 44 -101 132c0 12 1 24 2 36l-1 1c-26 -51 -58 -92 -95 -123\ns-77 -46 -119 -46c-57 0 -85 37 -85 112c0 91 36 182 107 275c-34 0 -56 -1 -67 -3s-22 -6 -35 -14c-25 -15 -46 -36 -63 -64c-4 -7 -8 -10 -13 -10c-7 0 -11 3 -11 8c0 3 7 15 20 36s26 39 38 52c31 33 65 49 103 49zM727 377h-461c-71 -86 -107 -167 -107 -242\nc0 -61 22 -91 67 -91c42 0 85 19 128 58s77 100 100 181c3 7 7 10 12 10c7 0 11 -3 11 -9c0 -2 -2 -11 -6 -28c-8 -32 -12 -65 -12 -98c0 -76 27 -114 81 -114c35 0 68 14 100 42s56 60 73 100s26 79 26 116c0 27 -4 52 -12 75z"
            },
            "Ϝ": {
                x: 764,
                d: "M230 251l-78 -309c-3 -9 -4 -14 -6 -16s-6 -5 -11 -6c-9 -2 -21 -3 -36 -3c-33 0 -49 4 -49 12c0 4 1 9 2 14l164 654c12 5 30 8 54 8h390c19 0 33 -1 44 -4c5 -1 8 -2 8 -3s1 -2 2 -3c-1 -1 -2 -2 -2 -3s-3 -2 -8 -3c-11 -3 -25 -4 -44 -4h-347l-78 -314h182\nc19 0 33 -1 44 -4c5 -1 8 -2 8 -3s1 -2 2 -3c-1 -1 -2 -2 -2 -3s-3 -2 -8 -3c-11 -3 -25 -4 -44 -4h-187z"
            },
            "Ϟ": {
                x: 756,
                d: "M519 270l-382 -254c-22 -14 -40 -21 -55 -21c-21 0 -32 9 -32 26c0 5 2 9 4 13s4 6 6 8s8 6 15 11l66 44c10 7 18 11 24 15s9 7 11 8s4 2 5 3c15 10 35 43 60 100s38 98 38 124c0 8 -1 14 -3 18c-31 0 -59 -4 -82 -13s-36 -18 -41 -28c-5 -8 -9 -12 -14 -12\nc-8 0 -12 4 -12 12c0 19 16 42 47 68s67 40 108 40c9 0 16 -2 20 -7s6 -10 7 -15s1 -12 1 -23c0 -33 -8 -72 -24 -116s-32 -81 -50 -111l383 255c21 14 40 21 55 21c7 0 15 -2 22 -6s10 -11 10 -20c0 -3 -2 -9 -7 -18c-1 -1 -34 -23 -99 -68c-15 -11 -25 -18 -30 -23\ns-12 -14 -22 -29c-21 -34 -39 -70 -52 -110s-20 -66 -20 -78c0 -5 1 -11 4 -18c32 1 60 5 82 13s36 17 42 28c3 8 8 12 13 12c8 0 12 -4 12 -12c0 -20 -15 -43 -47 -69s-68 -39 -108 -39c-9 0 -17 3 -22 9s-7 17 -7 36c0 62 25 137 74 226z"
            },
            "ϰ": {
                x: 756,
                d: "M519 270l-382 -254c-22 -14 -40 -21 -55 -21c-21 0 -32 9 -32 26c0 5 2 9 4 13s4 6 6 8s8 6 15 11l66 44c10 7 18 11 24 15s9 7 11 8s4 2 5 3c15 10 35 43 60 100s38 98 38 124c0 8 -1 14 -3 18c-31 0 -59 -4 -82 -13s-36 -18 -41 -28c-5 -8 -9 -12 -14 -12\nc-8 0 -12 4 -12 12c0 19 16 42 47 68s67 40 108 40c9 0 16 -2 20 -7s6 -10 7 -15s1 -12 1 -23c0 -33 -8 -72 -24 -116s-32 -81 -50 -111l383 255c21 14 40 21 55 21c7 0 15 -2 22 -6s10 -11 10 -20c0 -3 -2 -9 -7 -18c-1 -1 -34 -23 -99 -68c-15 -11 -25 -18 -30 -23\ns-12 -14 -22 -29c-21 -34 -39 -70 -52 -110s-20 -66 -20 -78c0 -5 1 -11 4 -18c32 1 60 5 82 13s36 17 42 28c3 8 8 12 13 12c8 0 12 -4 12 -12c0 -20 -15 -43 -47 -69s-68 -39 -108 -39c-9 0 -17 3 -22 9s-7 17 -7 36c0 62 25 137 74 226z"
            },
            "ϱ": {
                x: 518,
                d: "M101 102c-16 -66 -24 -117 -24 -154c0 -29 8 -48 25 -56s53 -13 109 -13c30 0 52 0 65 -1s26 -2 40 -5s24 -7 29 -14s7 -16 7 -27c0 -17 -5 -26 -14 -26c-7 0 -10 3 -10 10c-1 0 -1 1 -1 2v3c-3 5 -18 8 -46 8c-11 0 -27 -1 -47 -2s-37 -2 -49 -2c-31 0 -57 3 -77 9\ns-35 16 -42 28s-12 22 -14 30s-2 17 -2 30c0 49 18 146 55 291c18 69 50 125 95 166s90 62 134 62c37 0 69 -14 95 -42s39 -67 39 -118c0 -73 -26 -141 -77 -201s-106 -90 -165 -90c-29 0 -56 9 -78 28s-38 47 -47 84zM227 10c23 0 47 10 71 32s45 51 61 87\nc10 24 19 57 29 97s15 72 15 95c0 30 -7 55 -19 73s-29 27 -51 27c-23 0 -47 -10 -71 -30s-42 -44 -56 -73c-16 -31 -28 -68 -38 -109s-15 -73 -15 -94c0 -28 7 -52 19 -73s30 -32 55 -32z"
            },
            "ϵ": {
                x: 496,
                d: "M163 228c-30 -16 -52 -35 -67 -57s-23 -43 -23 -62c0 -17 4 -31 13 -43s21 -21 36 -27s31 -10 46 -13s32 -4 49 -4c81 0 133 20 156 59c4 6 8 9 11 9c6 0 9 -3 9 -9c0 -3 -3 -9 -7 -16s-10 -16 -20 -26s-22 -19 -36 -28s-30 -17 -52 -23s-45 -9 -70 -9\nc-47 0 -85 11 -114 35s-44 54 -44 89c0 25 8 50 24 75s39 45 68 61c-27 19 -41 43 -41 72c0 37 22 69 67 98s95 43 151 43c32 0 61 -7 87 -20s40 -25 40 -36c0 -6 -3 -12 -8 -17s-11 -8 -17 -8c-3 0 -9 2 -16 7c-28 21 -60 31 -95 31c-48 0 -92 -9 -130 -27s-57 -42 -57 -71\nc0 -26 14 -46 43 -60c28 12 58 18 90 18c47 0 70 -8 70 -25c0 -19 -26 -29 -78 -29c-35 0 -64 4 -85 13zM194 240c13 -3 31 -5 54 -5c25 0 44 3 55 8c-16 4 -32 6 -49 6c-22 0 -42 -3 -60 -9z"
            },
            "Ϲ": {
                x: 470,
                d: "M240 25l-97 55c-11 7 -21 13 -28 18s-17 13 -29 24s-20 24 -26 40s-10 34 -10 53c0 57 27 109 81 156s117 70 189 70c24 0 47 -3 68 -8s32 -13 32 -22c0 -3 -1 -7 -4 -10s-7 -5 -11 -5c-3 0 -6 1 -11 4c-31 14 -57 21 -79 21c-55 0 -104 -17 -149 -53s-67 -77 -67 -123\nc0 -15 1 -28 5 -39s11 -22 22 -32s20 -17 28 -22s21 -12 39 -23l56 -31c1 -1 7 -4 21 -12s23 -13 27 -16c27 -15 41 -38 41 -71c0 -25 -10 -49 -30 -72s-43 -34 -71 -34c-11 0 -23 3 -37 7s-21 9 -21 15s3 9 10 9c3 0 6 -1 10 -3c13 -5 25 -8 38 -8c15 0 27 6 35 18\ns13 24 13 37c0 10 -2 19 -7 26s-9 13 -14 16s-13 8 -24 15z"
            },
            "…": {
                x: 647,
                d: "M538 111c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s5 29 17 41s25 17 40 17zM322 111c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s5 29 17 41\ns25 17 40 17zM107 111c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s6 29 18 41s24 17 39 17z"
            },
            "′": {
                x: 333,
                d: "M274 475l-177 -414c-5 -11 -9 -16 -13 -16c-5 0 -12 1 -21 5s-13 8 -13 13l2 7c1 4 2 6 2 7l119 437c8 30 26 45 53 45c15 0 29 -5 40 -15s17 -23 17 -38c0 -6 -3 -16 -9 -31z"
            },
            "‵": {
                x: 333,
                d: "M160 511l119 -434c0 -1 1 -3 2 -7l2 -7c0 -5 -4 -9 -12 -12c-1 -1 -1 -1 -2 -1c-11 -3 -17 -5 -20 -5s-5 1 -6 3s-4 6 -7 13l-179 417c-5 11 -7 20 -7 29c0 15 6 27 17 37s24 15 39 15c27 0 45 -16 54 -48z"
            },
            "ℎ": {
                x: 591,
                d: "M250 550l-46 -184c42 51 91 76 148 76c35 0 63 -10 84 -28s31 -45 31 -80c0 -40 -21 -113 -62 -220c-11 -32 -17 -55 -17 -70c0 -22 8 -33 25 -33s35 9 54 28s34 51 47 96c3 11 7 16 10 17c1 1 3 1 5 1c8 0 12 -3 12 -10c0 -2 -1 -8 -4 -18s-8 -23 -15 -39\ns-15 -30 -24 -44s-22 -28 -38 -38s-32 -15 -50 -15c-23 0 -42 8 -58 23s-24 35 -24 60c0 13 4 30 11 49c43 109 64 186 64 230c0 46 -18 69 -54 69c-23 0 -45 -6 -65 -16s-38 -24 -52 -40s-24 -29 -30 -39s-11 -19 -15 -27c0 -1 -1 -4 -3 -10s-3 -13 -5 -21s-4 -14 -5 -19\ns-4 -17 -8 -34c-6 -26 -6 -26 -8 -34l-23 -89c-11 -46 -17 -71 -19 -75c-2 -7 -7 -14 -14 -19s-14 -8 -23 -8c-19 0 -29 9 -29 28c0 5 1 13 4 23l128 510h-53h-17s-6 2 -8 4s-3 4 -3 8c0 6 3 10 7 11s12 2 24 2h56c9 37 14 57 14 60c0 4 -1 7 -2 9s-6 4 -14 6s-19 2 -34 2\nc-16 0 -24 4 -24 11c0 13 6 20 19 21c80 7 121 10 122 10c9 0 14 -4 14 -12c0 -3 -5 -22 -14 -55c-6 -26 -10 -43 -13 -52h185c8 0 14 -1 17 -1s7 -1 10 -3s4 -5 4 -9c0 -8 -9 -12 -28 -12h-194z"
            },
            "ℏ": {
                x: 591,
                d: "M242 519l-38 -153c42 51 91 76 148 76c35 0 63 -10 84 -28s31 -45 31 -80c0 -40 -21 -113 -62 -220c-11 -32 -17 -55 -17 -70c0 -22 8 -33 25 -33s35 9 54 28s34 51 47 96c3 11 7 16 10 17c1 1 3 1 5 1c8 0 12 -3 12 -10c0 -2 -1 -8 -4 -18s-8 -23 -15 -39\ns-15 -30 -24 -44s-22 -28 -38 -38s-32 -15 -50 -15c-23 0 -42 8 -58 23s-24 35 -24 60c0 13 4 30 11 49c43 109 64 186 64 230c0 46 -18 69 -54 69c-23 0 -45 -6 -65 -16s-38 -24 -52 -40s-24 -29 -30 -39s-11 -19 -15 -27c0 -1 -1 -4 -3 -10s-3 -13 -5 -21s-4 -14 -5 -19\ns-4 -17 -8 -34c-6 -26 -6 -26 -8 -34l-23 -89c-11 -46 -17 -71 -19 -75c-2 -7 -7 -14 -14 -19s-14 -8 -23 -8c-19 0 -29 9 -29 28c0 5 1 13 4 23l114 456c-44 -15 -69 -22 -74 -22c-8 0 -12 4 -12 12c0 5 6 10 17 15c4 1 15 5 35 11s34 9 42 12c17 71 26 108 26 111\nc0 4 -1 7 -2 9s-6 4 -14 6s-19 2 -34 2c-16 0 -24 4 -24 11c0 13 6 20 19 21c80 7 121 10 122 10c9 0 14 -4 14 -12l-34 -135l220 69c7 2 12 3 14 3c8 0 12 -4 12 -12c0 -6 -6 -11 -19 -15z"
            },
            "ℑ": {
                x: 738,
                d: "M282 336c0 -7 -6 -11 -17 -11c-32 0 -65 7 -97 21s-60 36 -83 66s-35 64 -35 103c0 53 21 98 63 135s93 55 154 55c12 0 25 -1 37 -2s29 -6 51 -13s43 -16 63 -27s40 -29 63 -52s42 -51 59 -82c7 -14 13 -23 18 -27s11 -5 18 -5c3 0 6 1 9 1s9 0 18 2s16 4 23 7\ns14 7 20 14s10 14 11 23c1 5 1 6 1 8s2 3 4 4s6 2 10 2c11 0 16 -4 16 -13c0 -19 -11 -35 -32 -49s-48 -21 -82 -21c-27 0 -52 7 -76 20s-42 26 -54 39s-29 33 -49 59c-25 32 -47 55 -65 69s-41 21 -67 21c-47 0 -90 -16 -127 -48s-55 -72 -55 -120c0 -13 2 -26 5 -39\ns10 -27 19 -42s21 -29 35 -41s31 -23 54 -31s49 -13 78 -15c7 -2 10 -6 10 -11zM77 183h40c33 0 61 -7 85 -21s56 -40 96 -77c1 -1 4 -4 10 -9s12 -12 20 -18s15 -11 20 -15c29 -21 51 -31 66 -31c9 0 23 4 40 11s36 21 54 42s27 45 27 73c0 23 -13 49 -40 79\nc-13 15 -23 26 -29 33s-11 17 -16 29s-8 24 -8 37c0 31 13 58 38 81s56 34 92 34c34 0 62 -9 84 -28s32 -40 32 -63c0 -9 -5 -14 -16 -14c-9 0 -14 4 -15 13c-2 13 -7 25 -13 34s-13 16 -20 21s-14 8 -23 10s-15 4 -19 4s-6 1 -8 1c-32 0 -48 -30 -48 -90c0 -13 3 -26 8 -37\ns16 -27 34 -47c19 -21 33 -38 40 -51s11 -29 11 -46c0 -47 -21 -86 -64 -115c-15 -11 -32 -19 -49 -24s-32 -8 -43 -9s-28 -1 -51 -1c-43 0 -76 5 -99 15s-59 37 -109 82c-25 22 -47 39 -66 50s-32 18 -42 20s-22 4 -37 5c-6 1 -9 4 -9 11c0 5 2 9 6 10s10 1 21 1z"
            },
            "ℓ": {
                x: 481,
                d: "M129 170v19c0 36 5 77 15 123s17 79 24 100s12 37 17 48c6 17 14 35 23 56s23 46 40 78s38 58 60 79s44 31 65 31c39 0 58 -25 58 -75c0 -118 -81 -261 -244 -429c-5 -5 -7 -25 -7 -60c0 -88 20 -132 61 -132c32 0 72 23 119 69c13 13 20 19 23 19s5 -2 7 -4s3 -4 3 -7\nc0 -4 -8 -13 -23 -27s-28 -25 -38 -33c-33 -25 -63 -37 -92 -37c-19 0 -35 5 -49 14s-25 22 -33 38s-14 32 -18 49s-7 34 -9 53c-5 -6 -17 -18 -37 -36s-31 -28 -33 -28c-7 0 -11 4 -11 11c0 2 26 29 79 81zM189 232c51 53 92 102 123 147c65 93 97 177 97 251\nc0 36 -12 54 -36 54c-17 0 -35 -15 -54 -44c-25 -41 -49 -98 -71 -170s-37 -124 -44 -158s-12 -60 -15 -80z"
            },
            "℘": {
                x: 630,
                d: "M139 121c19 -27 40 -53 61 -79c19 -25 31 -44 36 -54s7 -23 7 -40c0 -39 -14 -76 -41 -111s-56 -52 -89 -52c-42 0 -63 26 -63 77s16 123 49 216c-17 23 -29 40 -34 53s-8 31 -8 55c0 63 17 123 53 180s72 86 108 86c7 0 11 -3 11 -8c0 -7 -4 -11 -12 -12\nc-32 -7 -60 -34 -83 -82s-34 -94 -34 -136c0 -31 8 -55 24 -73c41 79 84 139 130 180c63 59 130 88 199 88c40 0 71 -14 93 -43s34 -64 34 -105c0 -67 -24 -129 -71 -186s-99 -85 -154 -85c-24 0 -45 8 -62 22s-26 34 -26 60c0 27 8 41 25 41c11 0 17 -6 17 -17\nc0 -12 -7 -19 -20 -22c0 -24 7 -41 21 -50s30 -14 45 -14c22 0 43 9 64 26s38 37 52 62c15 27 27 61 37 100s15 70 15 94c0 29 -6 52 -18 70s-30 27 -54 27c-63 0 -123 -26 -179 -77s-100 -115 -133 -191zM114 57c-9 -24 -18 -57 -28 -99s-14 -74 -14 -95\nc0 -39 14 -58 41 -58c21 0 41 12 59 36s27 50 27 79c0 17 -4 31 -12 42z"
            },
            "ℜ": {
                x: 768,
                d: "M577 701l134 -241c5 -5 7 -10 7 -15c0 -3 -2 -7 -5 -10l-7 -4s-8 -4 -18 -10c-7 -4 -15 -8 -24 -13s-20 -11 -30 -16s-20 -11 -30 -16s-22 -10 -32 -14s-19 -7 -26 -10c0 -1 1 -18 3 -52s3 -54 4 -62c0 -8 1 -26 3 -54s3 -47 3 -58c0 -3 -1 -7 -2 -13s-2 -13 -2 -20\nc0 -35 15 -62 46 -82c53 44 82 66 86 66c3 0 6 -2 11 -5s8 -6 8 -9s-4 -8 -13 -15l-72 -56c-13 -9 -24 -14 -34 -14c-33 0 -61 11 -83 34s-33 50 -33 81c0 7 1 14 2 21s2 11 2 12l-13 219h-115v-73c0 -95 -15 -167 -45 -218s-66 -76 -105 -76c-53 0 -92 36 -118 107\nc-6 -4 -12 -6 -18 -6c-3 0 -5 1 -7 3s-4 5 -4 8s3 7 8 10s9 4 13 5c-3 4 -4 8 -4 13c0 3 2 5 5 8s5 5 8 5c7 0 11 -6 13 -17c9 5 16 7 21 7c2 0 4 -1 7 -3s4 -5 4 -8c0 -4 -3 -8 -9 -11s-11 -5 -14 -5c10 -31 23 -54 40 -70s36 -24 55 -24c15 0 27 9 37 27s17 41 20 69\ns5 48 6 62s2 25 2 35v295c0 58 -9 105 -26 141s-39 54 -66 54c-24 0 -43 -10 -58 -30s-23 -42 -23 -66c0 -18 13 -39 39 -62c21 -19 37 -38 48 -56s18 -32 20 -41s2 -21 2 -34c0 -12 -1 -24 -2 -35s-4 -27 -8 -47s-12 -37 -24 -50s-28 -19 -47 -19c-15 0 -27 6 -37 17\ns-16 21 -18 32s-3 20 -3 29c0 10 4 15 12 15c9 0 13 -5 13 -16c2 -37 13 -55 33 -55c33 0 49 40 49 119c0 15 -1 26 -2 33s-6 17 -14 30s-22 28 -40 46c-11 12 -20 22 -26 29s-12 17 -17 28s-8 23 -8 35c0 31 10 58 31 83s48 37 81 37s62 -11 86 -33s42 -46 54 -69\nc23 38 59 66 107 85s93 28 136 28c7 0 12 -1 14 -2s5 -6 9 -13zM634 427l-133 240l-2 3c-1 2 -3 4 -4 6s-2 2 -3 2s-6 0 -14 -2s-19 -6 -34 -11s-30 -11 -44 -19s-28 -20 -42 -34s-24 -30 -31 -48c13 -37 20 -84 20 -139v-49h145c12 0 22 1 30 2s21 6 40 14s43 19 72 35z\n"
            },
            "℧": {
                x: 733,
                d: "M653 662l27 -110c2 -8 3 -13 3 -15c0 -8 -4 -12 -13 -12c-5 0 -9 3 -11 8c-1 1 -3 9 -6 22c-8 32 -14 51 -19 58c-3 6 -23 9 -59 9h-82c6 -27 16 -52 29 -76s33 -57 61 -98c29 -43 50 -82 65 -115s23 -68 23 -104c0 -69 -30 -128 -89 -177s-131 -74 -216 -74\ns-157 25 -216 74s-88 108 -88 177c0 36 7 71 22 104s37 72 66 115c28 41 49 74 62 98s22 49 28 76h-82c-36 0 -56 -3 -60 -10c-5 -9 -11 -29 -18 -59c-3 -13 -6 -21 -8 -24s-4 -4 -9 -4c-9 0 -13 4 -13 12c0 2 1 7 3 15l27 109c3 11 5 17 8 19s10 3 23 3h130\nc13 0 20 -1 23 -3s4 -7 4 -17c0 -47 -18 -119 -55 -216c-36 -94 -54 -167 -54 -219c0 -71 21 -128 62 -168s90 -60 146 -60c54 0 102 20 144 60s63 96 63 168c0 49 -18 123 -55 221c-36 96 -54 167 -54 214c0 10 2 15 5 17s10 3 23 3h130c12 0 19 -1 22 -3s5 -8 8 -18z"
            },
            "Ⅎ": {
                x: 543,
                d: "M493 659v-624c0 -16 -2 -25 -6 -29s-14 -6 -29 -6h-373h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h368v287h-218c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h218v291c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17z"
            },
            "ℵ": {
                x: 600,
                d: "M465 112l-283 323c-25 -53 -37 -115 -37 -188c0 -17 2 -31 7 -42s18 -29 37 -52c31 -37 46 -69 46 -94c0 -39 -34 -59 -102 -59h-56c-11 0 -17 1 -21 2s-6 4 -6 9c0 7 6 11 17 11c17 1 30 2 41 5s18 6 22 11s5 9 6 12s2 7 2 11c0 20 -8 45 -25 75c-23 44 -35 79 -35 105\nc0 61 27 135 81 220l-59 68c-15 19 -27 35 -35 49s-12 24 -13 30s-2 12 -2 21c0 16 2 29 6 39s8 17 11 20s6 5 9 5c6 0 9 -3 10 -10c2 -33 18 -66 49 -101l278 -317c3 29 10 73 21 134c8 45 13 86 16 123c-27 27 -45 48 -54 62s-13 29 -13 45s2 29 6 39s8 17 11 20s6 5 9 5\nc4 0 7 -3 10 -10c5 -11 16 -32 34 -61s32 -49 43 -58c23 -21 37 -37 44 -48s10 -25 10 -42c0 -16 -2 -30 -6 -40s-8 -17 -11 -20s-6 -4 -9 -4c-7 0 -10 4 -10 13c-2 26 -13 49 -34 70l-39 -260l59 -68c15 -19 27 -35 35 -49s12 -24 13 -30s2 -12 2 -21c0 -16 -2 -29 -6 -39\ns-8 -17 -11 -20s-6 -5 -9 -5c-6 0 -9 3 -10 10c-2 33 -18 66 -49 101z"
            },
            "ℶ": {
                x: 778,
                d: "M666 604v-500h40c15 -1 22 -8 22 -20c0 -7 -5 -15 -15 -24l-68 -68c-6 -6 -11 -9 -14 -10s-11 -2 -22 -2h-524h-17s-8 3 -12 6s-6 8 -6 14c0 5 6 14 17 25l67 68c6 5 11 8 14 9s11 2 23 2h455v449c0 17 -3 27 -10 32s-14 8 -20 9s-20 2 -41 2h-324c-20 0 -34 0 -43 1\ns-20 3 -32 7s-21 10 -26 18s-8 21 -12 36s-6 35 -6 59c0 13 0 23 1 28s2 10 5 13s7 5 14 5c9 0 15 -5 19 -16c4 -10 10 -18 17 -23s13 -8 18 -9s13 -1 22 -1h367c30 0 53 -7 68 -22s23 -44 23 -88z"
            },
            "ℷ": {
                x: 507,
                d: "M208 714h170c15 0 27 -2 38 -6s19 -8 24 -13s9 -10 12 -17s4 -11 4 -14s1 -6 1 -9c0 -5 -1 -11 -3 -18s-7 -14 -15 -22s-18 -14 -31 -17c1 -9 2 -24 2 -46s1 -39 2 -52c19 -234 29 -376 29 -425c0 -39 -2 -64 -5 -75c-8 -28 -20 -42 -35 -42c-7 0 -12 3 -15 8\ns-6 12 -8 23c-1 7 -2 13 -3 19s-1 11 -2 17s-1 10 -2 13c-34 -34 -52 -51 -53 -52c-5 -4 -14 -6 -29 -6h-204h-17s-8 3 -12 6s-6 8 -6 14c0 5 6 14 17 25l67 68c6 5 11 8 14 9s11 2 23 2h197v492h-165c-37 0 -61 9 -73 28s-18 50 -18 93c0 13 0 23 1 28s2 10 5 13s7 5 14 5\nc9 0 15 -5 19 -16c4 -10 10 -18 17 -23s13 -8 18 -9s13 -1 22 -1z"
            },
            "ℸ": {
                x: 668,
                d: "M529 596h-388c-37 0 -61 9 -73 28s-18 50 -18 93c0 13 0 23 1 28s2 10 5 13s7 5 14 5c9 0 15 -5 19 -16c4 -10 10 -18 17 -23s13 -8 18 -9s13 -1 22 -1h393c15 0 28 -2 39 -6s19 -8 24 -13s8 -10 11 -17s5 -11 5 -14v-9c0 -5 -1 -11 -3 -18s-7 -14 -15 -22\ns-18 -14 -31 -17c1 -9 1 -24 1 -46s2 -39 3 -52c19 -234 29 -376 29 -425c0 -39 -2 -64 -5 -75c-8 -28 -20 -42 -35 -42c-8 0 -13 3 -16 10s-7 21 -11 44c-4 27 -6 53 -6 78v506z"
            },
            "⅁": {
                x: 636,
                d: "M224 269h-134v-206c0 -9 1 -16 2 -20s6 -7 14 -11s20 -7 37 -9c24 -3 56 -5 97 -5c18 0 34 1 46 2s30 5 52 10s44 16 66 30s42 32 61 55c54 64 81 140 81 227c0 86 -28 161 -82 226s-122 97 -205 97c-58 0 -111 -13 -160 -40c-11 -5 -18 -8 -21 -8c-5 0 -10 2 -14 6\ns-6 9 -6 14c0 7 2 12 6 15s13 8 24 13c56 27 113 40 171 40c94 0 172 -36 234 -108s93 -157 93 -256c0 -54 -10 -104 -30 -151s-44 -86 -74 -116c-23 -23 -46 -41 -69 -55s-46 -24 -69 -29s-42 -9 -55 -10s-30 -2 -49 -2c-37 0 -67 2 -92 5s-44 7 -57 11s-23 10 -29 19\ns-9 15 -10 21s-2 14 -2 25v215c0 16 2 26 6 30s14 5 29 5h139c24 0 36 -7 36 -20s-12 -20 -36 -20z"
            },
            "⅌": {
                x: 618,
                d: "M368 463h147c8 0 13 -1 17 -1s8 -1 11 -4s5 -8 5 -13c0 -9 -7 -15 -20 -17c-26 -4 -65 -28 -118 -73c-30 -25 -54 -47 -72 -65c7 -9 39 -51 97 -124s92 -114 103 -124c3 -3 7 -5 14 -7c11 -3 16 -9 16 -17s-3 -13 -8 -15s-14 -3 -26 -3h-177h-17s-8 3 -11 6s-5 7 -5 12\nc0 11 10 17 31 18c3 1 6 1 7 2s2 2 5 2c-5 13 -13 27 -26 42c-8 11 -25 33 -51 66s-42 52 -46 57l-11 -9v-99c0 -38 9 -59 28 -62c11 -3 17 -8 17 -17c0 -8 -3 -13 -8 -15s-14 -3 -25 -3h-162h-17s-8 3 -11 6s-5 7 -5 12c0 9 5 14 15 17c6 1 11 3 15 5s6 10 10 22s6 29 6 52\nv457c0 50 -9 76 -28 79c-1 0 -3 0 -6 1s-5 2 -8 5s-4 7 -4 11c0 8 3 13 8 15s14 3 25 3h116c15 0 25 -2 29 -5s5 -14 5 -31v-403c4 3 19 16 46 40s44 40 52 48c27 23 41 45 41 66c0 17 -6 26 -19 28c-13 0 -19 6 -19 17c0 8 3 13 8 15s14 3 26 3zM407 398l39 30h-44\nc3 -7 5 -17 5 -30zM131 573v-461c0 -34 -4 -60 -12 -77h90c-7 15 -11 35 -11 60v555h-79c8 -17 12 -43 12 -77zM270 228l115 -144c11 -17 17 -33 17 -49h93l-184 231z"
            },
            "∀": {
                x: 656,
                d: "M601 656l-251 -657c-5 -14 -13 -21 -22 -21c-10 0 -18 8 -23 23l-249 655c-4 9 -6 15 -6 18c0 5 2 10 6 14s9 6 14 6c10 0 18 -8 23 -23l83 -220h304l83 220c5 15 13 23 23 23c6 0 10 -2 14 -6s6 -9 6 -14s-2 -11 -5 -18zM192 411l136 -356l136 356h-272z"
            },
            "∁": {
                x: 488,
                d: "M438 218v-96c0 -35 -11 -65 -34 -88s-49 -38 -76 -45s-55 -11 -84 -11c-21 0 -41 2 -62 6s-41 12 -62 22s-37 25 -50 45s-20 44 -20 71v581c0 35 11 64 34 87s49 39 76 46s55 11 84 11c21 0 41 -3 62 -7s41 -11 62 -21s37 -25 50 -45s20 -44 20 -71v-96\nc0 -34 -13 -51 -40 -51s-40 19 -40 56v84c0 9 -1 17 -2 22s-4 10 -10 17s-14 13 -26 18c-23 9 -48 14 -76 14c-32 0 -59 -5 -81 -16c-11 -5 -18 -11 -23 -17s-8 -12 -9 -17s-1 -12 -1 -21v-567c0 -9 1 -16 2 -21s4 -11 10 -18s14 -13 26 -18c23 -9 48 -14 76 -14\nc32 0 59 5 81 16c11 5 18 12 23 18s8 11 9 16s1 12 1 21v84c0 37 13 56 40 56s40 -17 40 -51z"
            },
            "∂": {
                x: 615,
                d: "M466 334h1c19 71 29 130 29 175c0 56 -13 100 -39 133s-61 49 -105 49c-66 0 -114 -27 -144 -81c29 0 44 -10 44 -31c0 -11 -4 -22 -13 -33s-21 -16 -37 -16c-12 0 -21 3 -26 10s-8 14 -8 21c0 9 4 21 10 36s16 33 29 51s33 34 59 47s57 20 90 20c63 0 114 -25 152 -73\ns57 -109 57 -182c0 -29 -4 -63 -12 -102s-21 -81 -39 -126s-40 -86 -65 -123s-57 -68 -96 -93s-80 -37 -125 -37c-32 0 -60 7 -84 19s-43 27 -56 46s-23 39 -29 58s-9 36 -9 53c0 79 30 149 89 210s125 92 196 92c41 0 73 -13 94 -37s34 -53 37 -86zM231 6c36 0 69 12 99 36\ns52 52 69 86s29 67 38 98s13 57 13 78c0 35 -9 65 -26 92s-45 41 -86 41c-24 0 -46 -5 -68 -15s-40 -24 -54 -40s-25 -30 -33 -42s-14 -24 -19 -34c-9 -21 -18 -52 -28 -93s-15 -71 -15 -91c0 -13 2 -24 5 -36s7 -25 14 -38s18 -22 34 -30s35 -12 57 -12z"
            },
            "∃": {
                x: 545,
                d: "M495 658v-622c0 -17 -1 -26 -5 -30s-14 -6 -30 -6h-375h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h370v287h-356c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h356v287h-370h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h375\nc16 0 26 -2 30 -6s5 -13 5 -30z"
            },
            "∄": {
                x: 543,
                d: "M398 819l-28 -125h88c16 0 26 -2 30 -6s5 -14 5 -29v-624c0 -16 -2 -25 -6 -29s-14 -6 -29 -6h-244c-7 -31 -17 -79 -32 -142c-3 -16 -10 -24 -21 -24c-3 0 -5 1 -8 2s-5 3 -8 6s-4 7 -4 12c0 1 1 6 3 14s3 18 6 31s5 22 6 27c4 15 7 28 9 38s5 21 8 36h-88h-17\ns-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h97l64 287h-147c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h156l65 287h-235h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h244l31 140c3 17 11 26 22 26c3 0 5 -1 8 -2s5 -3 8 -6s4 -7 4 -12\nc0 -1 -1 -8 -4 -21zM297 367h156v287h-92zM223 40h230v287h-165z"
            },
            "∅": {
                x: 765,
                d: "M701 543l-73 -64l-6 -6l-5 -4c39 -56 59 -115 59 -178c0 -79 -28 -148 -84 -206s-127 -87 -210 -87c-37 0 -73 7 -107 21s-57 27 -70 37s-23 19 -30 27l-78 -68c-12 -11 -21 -17 -27 -17c-13 0 -20 7 -20 20c0 5 2 8 4 11s8 9 18 18c39 33 64 56 76 67\nc-39 57 -59 117 -59 178c0 82 29 151 87 208s126 85 207 85c34 0 67 -6 99 -18s55 -24 70 -35s28 -21 38 -32l77 67c13 12 23 18 28 18c2 0 5 0 7 -1s5 -3 8 -6s5 -7 5 -13c0 -7 -5 -14 -14 -22zM178 140l381 333c-5 5 -11 11 -18 17s-18 12 -33 22s-34 18 -56 24\ns-45 9 -70 9c-69 0 -128 -24 -178 -73s-75 -110 -75 -181c0 -55 16 -105 49 -151zM586 443l-380 -333c5 -5 11 -10 18 -16s18 -14 33 -24s33 -17 55 -23s46 -9 71 -9c69 0 129 25 179 74s74 109 74 180c0 56 -17 106 -50 151z"
            },
            "∇": {
                x: 838,
                d: "M783 661l-337 -675c-4 -7 -7 -12 -10 -15s-9 -4 -17 -4s-14 1 -17 4s-6 8 -10 15l-337 675c-3 5 -5 9 -5 14c0 3 2 6 4 7s9 1 20 1h690c11 0 18 0 20 -1s4 -4 4 -7c0 -5 -2 -9 -5 -14zM174 611l275 -550l274 550h-549z"
            },
            "√": {
                x: 880,
                d: "M366 -95l421 874c7 14 14 21 23 21c6 0 10 -2 14 -6s6 -9 6 -14c0 -4 -2 -11 -7 -20l-454 -940c-3 -5 -5 -10 -7 -12s-3 -4 -6 -6s-7 -2 -12 -2c-9 0 -16 5 -21 16l-197 433c-17 -12 -27 -20 -32 -24c-20 -15 -31 -22 -34 -22c-7 0 -10 4 -10 11c0 4 4 9 13 16l95 72\nc7 5 13 8 17 8c5 0 10 -5 15 -16z"
            },
            "∞": {
                x: 989,
                d: "M503 271c70 114 152 171 247 171c55 0 101 -23 136 -68s53 -98 53 -158c0 -61 -18 -114 -54 -159s-82 -68 -139 -68s-111 21 -163 63c-15 12 -27 24 -38 36s-30 35 -59 72c-70 -114 -152 -171 -247 -171c-55 0 -101 23 -136 68s-53 98 -53 158c0 61 18 114 54 159\ns82 68 139 68s111 -21 163 -63c15 -12 27 -23 38 -35s30 -36 59 -73zM529 237c60 -77 96 -123 109 -137c42 -42 83 -63 124 -63c43 0 80 18 110 53s45 77 45 126c0 50 -14 94 -43 134s-68 60 -117 60c-86 0 -162 -58 -228 -173zM460 194c-60 77 -96 123 -109 137\nc-42 42 -83 63 -124 63c-43 0 -80 -17 -110 -52s-45 -78 -45 -127c0 -50 14 -95 43 -135s68 -59 117 -59c86 0 162 58 228 173z"
            },
            "∠": {
                x: 709,
                d: "M648 653l-534 -613h510h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-538c-24 0 -36 7 -36 20c0 5 4 12 12 21l555 639c9 9 16 14 22 14c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -4 -13 -11 -21z"
            },
            "∡": {
                x: 709,
                d: "M648 673l-325 -385c61 -74 97 -157 106 -248h195h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-193c-1 -13 -8 -20 -20 -20c-11 0 -18 7 -20 20h-305c-24 0 -36 7 -36 20c0 5 4 12 12 21l555 659c8 9 15 14 22 14c5 0 10 -2 14 -6s6 -9 6 -14\ns-4 -12 -11 -21zM113 40h276c-8 83 -39 155 -93 216z"
            },
            "∢": {
                x: 709,
                d: "M638 508l-118 -58c28 -63 42 -129 42 -200s-14 -137 -42 -200l116 -58c15 -7 23 -14 23 -23c0 -6 -2 -11 -6 -15s-9 -5 -14 -5c-3 0 -9 2 -18 7l-551 272c-13 7 -20 14 -20 22s6 15 19 22l552 272c9 5 15 7 18 7c5 0 10 -1 14 -5s6 -9 6 -15c0 -9 -7 -16 -21 -23z\nM115 250l369 -182c25 59 38 120 38 182c0 63 -13 123 -38 182z"
            },
            "⊤": {
                x: 768,
                d: "M404 628v-592v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v592h-278c-24 0 -36 7 -36 20s12 20 36 20h597h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-279z"
            },
            "⊥": {
                x: 768,
                d: "M404 632v-592h279h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-597c-24 0 -36 7 -36 20s12 20 36 20h278v592c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "⋮": {
                x: 216,
                d: "M107 674c15 0 29 -6 41 -18s18 -25 18 -40s-6 -28 -18 -40s-26 -18 -42 -18c-15 0 -28 6 -39 18s-17 25 -17 40s6 28 18 40s24 18 39 18zM107 329c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s6 29 18 41\ns24 17 39 17zM107 -26c15 0 29 -6 41 -18s18 -25 18 -40s-6 -28 -18 -40s-26 -18 -42 -18c-15 0 -28 6 -39 18s-17 25 -17 40s6 28 18 40s24 18 39 18z"
            },
            "⋯": {
                x: 882,
                d: "M440 329c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s5 29 17 41s25 17 40 17zM107 329c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s6 29 18 41\ns24 17 39 17zM773 329c15 0 29 -5 41 -17s18 -26 18 -41s-6 -29 -18 -41s-26 -17 -42 -17c-15 0 -28 5 -39 17s-17 26 -17 41s6 29 18 41s24 17 39 17z"
            },
            "⋰": {
                x: 685,
                d: "M383 318c11 -11 17 -25 17 -42s-5 -30 -16 -41s-26 -16 -42 -16s-30 6 -41 17s-15 24 -15 40s5 30 16 41s24 17 40 17s30 -5 41 -16zM148 553c11 -11 16 -24 16 -41s-4 -31 -15 -42s-24 -16 -41 -16s-32 7 -43 18c-10 10 -15 24 -15 40s6 29 17 40s25 16 41 16\ns29 -4 40 -15zM619 82c11 -11 16 -24 16 -41s-5 -30 -16 -41s-24 -16 -41 -16s-31 6 -42 17c-10 10 -15 23 -15 40s5 30 16 41s24 16 41 16s30 -5 41 -16z"
            },
            "Ⓢ": {
                x: 986,
                d: "M936 267c0 -123 -43 -227 -130 -313s-192 -130 -313 -130c-79 0 -153 20 -221 59s-122 93 -162 161s-60 142 -60 223c0 60 12 117 35 171s55 102 94 142s86 70 141 94s112 36 173 36c123 0 227 -43 313 -130s130 -192 130 -313zM493 -136c111 0 206 39 285 118\ns118 174 118 285s-40 206 -118 285s-173 118 -285 118s-207 -39 -285 -118s-118 -174 -118 -285s39 -206 118 -285s174 -118 285 -118zM501 226c-50 11 -83 20 -98 26s-30 15 -44 29c-29 29 -44 63 -44 101c0 40 15 74 45 103s67 43 112 43c50 0 92 -16 125 -49l14 19\nc9 13 14 20 15 21c4 6 8 9 12 9c5 0 7 -2 8 -5s2 -10 2 -21v-132v-16s-2 -6 -4 -8s-4 -2 -9 -2c-7 0 -11 3 -12 10c-1 1 -1 2 -1 3c-1 10 -3 20 -5 29s-6 21 -13 37s-14 30 -24 41s-24 20 -43 29s-40 13 -64 13c-32 0 -57 -10 -77 -29s-30 -41 -30 -66c0 -17 5 -35 16 -51\ns27 -29 50 -38c1 -1 22 -6 62 -15c46 -11 76 -19 90 -25s31 -18 48 -36l2 -2c1 -2 4 -5 6 -8s5 -8 8 -12s5 -9 8 -15s6 -12 8 -19s4 -14 5 -22s2 -17 2 -26c0 -41 -15 -78 -45 -109s-67 -47 -114 -47c-61 0 -109 16 -146 49l-14 -19c-9 -13 -14 -20 -15 -21\nc-4 -6 -8 -9 -12 -9c-5 0 -8 2 -9 5s-1 10 -1 21v131c0 8 1 14 1 17s1 5 3 7s5 3 9 3c7 0 11 -3 12 -9c2 -50 18 -87 49 -111c32 -26 73 -39 123 -39c33 0 58 10 78 31s30 46 30 73c0 33 -11 58 -32 75c-11 10 -21 17 -30 20s-28 9 -57 16z"
            },
            "■": {
                x: 765,
                d: "M715 652v-617c0 -16 -1 -25 -5 -29s-14 -6 -31 -6h-593c-17 0 -26 2 -30 6s-6 14 -6 30v616c0 16 2 26 6 30s14 5 29 5h595c16 0 26 -2 30 -6s5 -14 5 -29z"
            },
            "▲": {
                x: 653,
                d: "M348 556l250 -540c3 -7 5 -12 5 -16c0 -13 -12 -20 -35 -20h-483c-23 0 -35 7 -35 20c0 4 2 10 6 18l248 538c6 13 14 20 23 20c4 0 7 -1 10 -3s4 -3 5 -5z"
            },
            "△": {
                x: 870,
                d: "M457 697l357 -661c4 -8 6 -13 6 -16c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-699c-24 0 -36 7 -36 20c0 4 3 10 8 19l355 657c4 9 7 14 10 16s7 4 12 4c7 0 14 -5 20 -16c1 -1 1 -2 2 -3zM435 654l-332 -614h664z"
            },
            "▸": {
                x: 711,
                d: "M641 227l-553 -260c-9 -5 -15 -7 -18 -7c-7 0 -11 2 -14 6c-4 5 -6 9 -6 12v17v508v18c0 3 2 7 6 12c3 4 8 6 15 6c3 0 8 -2 17 -7l553 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22z"
            },
            "▼": {
                x: 653,
                d: "M597 538l-255 -552c-4 -4 -9 -6 -15 -6c-9 0 -17 7 -23 20l-249 540c-3 7 -5 12 -5 16c0 13 12 20 35 20h483c23 0 35 -7 35 -20c0 -4 -2 -10 -6 -18z"
            },
            "▽": {
                x: 870,
                d: "M812 461l-355 -657c-4 -9 -7 -14 -10 -16s-7 -4 -12 -4c-7 0 -14 5 -20 16c-1 1 -1 2 -2 3l-356 660c-5 9 -7 15 -7 17c0 13 12 20 36 20h699h17s8 -3 12 -6s6 -8 6 -14c0 -4 -3 -10 -8 -19zM103 460l331 -613h2l331 613h-664z"
            },
            "◀": {
                x: 711,
                d: "M70 272l553 261c8 4 14 6 18 6c7 0 11 -2 14 -6c3 -5 5 -9 5 -12v-7s1 -7 1 -10v-509c0 -3 -1 -5 -1 -9v-8c0 -3 -2 -7 -5 -12c-3 -4 -7 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23z"
            },
            "◆": {
                x: 654,
                d: "M595 272l-246 -388c-7 -11 -15 -17 -22 -17s-15 6 -22 17l-248 390l-1 3c-1 2 -3 4 -4 7s-2 5 -2 7c0 5 3 11 9 20l246 388c7 11 15 17 22 17s15 -6 22 -17l248 -390l1 -3c1 -2 3 -4 4 -7s2 -5 2 -7c0 -5 -3 -11 -9 -20z"
            },
            "◇": {
                x: 654,
                d: "M595 272l-246 -388c-7 -11 -15 -17 -22 -17s-15 6 -22 17l-248 390l-1 3c-1 2 -3 4 -4 7s-2 5 -2 7c0 5 3 11 9 20l246 388c7 11 15 17 22 17s15 -6 22 -17l248 -390l1 -3c1 -2 3 -4 4 -7s2 -5 2 -7c0 -5 -3 -11 -9 -20zM94 291l232 -366h2l232 367l-233 367z"
            },
            "★": {
                x: 944,
                d: "M881 369l-239 -174l92 -281c2 -6 3 -11 3 -14c0 -7 -4 -11 -11 -11c-5 0 -10 3 -15 9l-239 173l-239 -173c-7 -6 -12 -9 -15 -9c-7 0 -11 4 -11 11l2 7l2 7l91 281l-240 174c-8 6 -12 11 -12 15c0 5 2 9 6 10s11 1 22 1h289l90 278c4 13 9 20 15 20c4 0 7 -1 8 -3\ns3 -7 6 -15l91 -280h289c11 0 18 0 22 -1s6 -5 6 -10c0 -3 -4 -8 -13 -15z"
            },
            "♠": {
                x: 768,
                d: "M397 -130h-26h-17s-8 3 -12 6s-6 8 -6 14c0 3 1 7 3 12c16 56 24 112 25 168h-50c-1 -19 -6 -36 -16 -49s-24 -23 -39 -29s-29 -9 -41 -11s-23 -3 -34 -3c-27 0 -51 8 -70 24s-34 36 -42 62s-14 49 -17 71s-5 45 -5 68c0 54 15 103 44 148s75 95 138 151\nc51 45 95 115 132 208c4 11 11 17 20 17c10 0 16 -4 18 -13c12 -30 22 -53 30 -70s22 -41 41 -70s41 -53 64 -74c63 -55 108 -105 137 -149s44 -93 44 -148c0 -21 -1 -42 -4 -63s-9 -45 -17 -72s-22 -50 -41 -66s-43 -24 -72 -24c-9 0 -18 0 -28 2s-25 5 -42 10\ns-31 15 -42 29s-17 31 -18 51h-50c0 -54 8 -109 24 -164c3 -7 4 -13 4 -16c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "♡": {
                x: 768,
                d: "M384 605c13 28 34 54 63 77s63 34 104 34c55 0 97 -20 125 -62s42 -97 42 -165c0 -29 -5 -57 -14 -86s-19 -54 -30 -75s-28 -44 -51 -71s-42 -48 -57 -63s-37 -37 -66 -64c-40 -37 -72 -86 -96 -146c-4 -11 -11 -17 -20 -17s-17 7 -22 22c-17 44 -39 81 -65 112\nc-7 9 -28 30 -63 61c-69 66 -117 125 -144 176s-40 101 -40 151c0 67 14 121 42 163s70 64 125 64c41 0 76 -12 105 -35s49 -49 62 -76zM384 39c15 31 30 55 46 74s42 45 79 80c69 65 114 121 136 167s33 89 33 129c0 52 -9 95 -27 130c-20 38 -53 57 -100 57\nc-30 0 -59 -11 -88 -32s-48 -57 -58 -107c-3 -15 -10 -23 -21 -23s-17 7 -20 20c-5 25 -12 46 -22 64s-21 32 -32 42s-24 18 -37 24s-25 9 -33 10s-16 2 -23 2c-27 0 -49 -6 -67 -19s-31 -30 -39 -51s-14 -42 -17 -60s-4 -37 -4 -57c0 -47 15 -96 44 -147s83 -112 164 -184\nc35 -32 64 -72 86 -119z"
            },
            "♢": {
                x: 768,
                d: "M55 295l24 23c112 105 206 234 282 387c3 7 6 11 7 13s3 4 6 6s6 3 10 3c9 0 15 -5 19 -14c41 -85 89 -163 142 -233s105 -128 156 -173c11 -11 17 -20 17 -25c0 -6 -5 -13 -14 -22c-118 -106 -217 -240 -297 -401c-3 -7 -6 -11 -7 -13s-3 -4 -6 -6s-6 -3 -10 -3\nc-9 0 -15 5 -19 14c-79 161 -179 297 -298 406c-11 11 -17 20 -17 25c0 4 2 8 5 13zM384 -98c67 123 138 225 214 308c28 31 51 55 70 72c-21 19 -44 42 -67 69c-79 85 -151 188 -217 311c-67 -123 -138 -225 -214 -308c-28 -31 -51 -55 -70 -72c21 -19 44 -42 67 -69\nc79 -85 151 -188 217 -311z"
            },
            "♣": {
                x: 822,
                d: "M424 -130h-26h-17s-8 3 -12 6s-6 8 -6 14c0 3 1 7 3 12c16 56 24 112 25 168h-50c-1 -19 -6 -36 -16 -49s-23 -23 -37 -29s-26 -9 -37 -11s-21 -3 -30 -3c-48 0 -88 20 -121 58s-50 84 -50 138c0 52 14 97 40 136s61 58 106 58c37 0 68 -14 92 -43l22 46\nc-51 41 -76 94 -76 161c0 53 17 98 51 137s76 58 126 58s92 -19 126 -57s51 -85 51 -138c0 -67 -25 -120 -76 -161l22 -46c24 29 55 43 92 43c45 0 80 -19 106 -58s40 -84 40 -136c0 -54 -17 -100 -50 -138s-73 -58 -121 -58c-14 0 -28 1 -43 4s-32 13 -49 28s-27 35 -28 60\nh-50c0 -54 8 -109 24 -164c3 -7 4 -13 4 -16c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "♭": {
                x: 372,
                d: "M72 724v-310c27 30 66 45 117 45c37 0 68 -13 94 -39s39 -60 39 -99c0 -99 -59 -195 -178 -286c-50 -37 -78 -56 -83 -56s-8 2 -9 5s-2 10 -2 21v718c0 11 1 17 2 21s4 6 9 6s8 -2 9 -5s2 -10 2 -21zM72 344v-332c117 105 176 208 176 309c0 9 -1 18 -2 27s-4 21 -8 34\ns-12 24 -22 32s-23 12 -38 12c-31 0 -57 -7 -77 -21c-13 -9 -21 -17 -24 -26s-5 -20 -5 -35z"
            },
            "♮": {
                x: 320,
                d: "M270 479v-668v-15s-2 -6 -4 -8s-4 -4 -8 -4c-5 0 -7 2 -8 5s-2 10 -2 21v185l-171 -63c-9 -4 -15 -6 -17 -6c-5 0 -7 2 -8 5s-2 10 -2 21v746v12c0 2 1 5 2 8s2 5 4 6s3 1 6 1c7 0 10 -9 10 -26v-263l171 63c9 4 15 6 17 6c5 0 7 -2 8 -5s2 -10 2 -21zM72 5l176 65v356\nl-176 -65v-356z"
            },
            "♯": {
                x: 372,
                d: "M256 -17l-140 -41v-131v-15s-2 -6 -4 -8s-4 -3 -8 -3c-7 0 -10 9 -10 26v125c-1 -1 -5 -2 -10 -4s-10 -3 -15 -4s-8 -2 -9 -2c-5 0 -7 2 -8 5s-2 10 -2 21v21c0 11 1 18 2 21s4 5 11 8c1 0 3 1 7 2s10 2 15 4s8 2 9 2v357c-1 -1 -5 -1 -10 -3s-10 -4 -15 -5s-8 -2 -9 -2\nc-5 0 -7 2 -8 5s-2 10 -2 21v21v16s2 6 4 8s4 3 9 5c1 0 3 0 7 1s10 2 15 4s8 3 9 3v200v15s2 6 4 8s4 4 8 4c5 0 7 -2 8 -5s2 -10 2 -21v-194l140 41v200v15s2 6 4 8s4 3 8 3c7 0 10 -9 10 -26v-194c1 1 5 1 10 3s10 4 15 5s8 2 9 2c5 0 7 -2 8 -5s2 -10 2 -21v-22\nc0 -11 -1 -17 -2 -20s-5 -5 -11 -8c-4 -1 -7 -2 -9 -3s-4 -1 -5 -1h-1s-1 -1 -2 -1h-4s-6 -2 -10 -3v-357c1 1 5 2 10 4s10 3 15 4s8 2 9 2c5 0 7 -2 8 -5s2 -10 2 -21v-22c0 -11 -1 -17 -2 -20s-5 -5 -11 -8c-4 -1 -7 -2 -9 -3s-4 -1 -5 -1h-1h-2s-2 -2 -4 -2s-6 -1 -10 -2\nv-131v-15s-2 -6 -4 -8s-4 -4 -8 -4c-5 0 -7 2 -8 5s-2 10 -2 21v125zM256 414l-140 -41v-356l140 41v356z"
            },
            "〈": {
                x: 323,
                d: "M268 712l-177 -462l177 -464c3 -7 5 -13 5 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-9 0 -17 8 -23 24l-175 459c-3 8 -5 14 -5 17c0 2 2 8 5 18l175 459c6 15 14 23 23 23c5 0 10 -2 14 -6s6 -9 6 -14s-2 -11 -5 -18z"
            },
            "〉": {
                x: 323,
                d: "M268 233l-177 -463c-5 -13 -12 -20 -21 -20c-5 0 -10 2 -14 6s-6 9 -6 14s2 11 5 18l177 462l-177 464c-3 7 -5 13 -5 16c0 5 2 10 6 14s9 6 14 6c10 0 18 -8 23 -23l175 -460c3 -8 5 -14 5 -17s-2 -9 -5 -17z"
            },
            "+": {
                x: 927,
                d: "M481 232v-265c0 -21 -6 -31 -18 -31c-11 0 -17 10 -17 31v265h-265c-21 0 -31 6 -31 18c0 11 10 17 31 17h265v265c0 21 6 31 18 31c11 0 17 -10 17 -31v-265h265c21 0 31 -6 31 -18c0 -11 -10 -17 -31 -17h-265z"
            },
            "-": {
                x: 941,
                d: "M726 230h-541h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h541h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "<": {
                x: 941,
                d: "M772 498l-553 -248l553 -248c1 0 1 0 2 -1c11 -5 17 -12 17 -20c0 -7 -2 -12 -7 -15s-9 -5 -13 -5c-3 0 -8 2 -17 5l-585 262c-13 6 -19 13 -19 22c0 7 7 15 20 22l600 268c14 -1 21 -8 21 -21l-1 -2v-3v-4c0 -1 0 -1 -1 -1l-2 -1l-3 -3c0 -1 -1 -1 -2 -2l-4 -1\nc-1 -1 -2 -1 -3 -2z"
            },
            "=": {
                x: 927,
                d: "M747 321h-567c-20 0 -30 6 -30 17c0 12 11 18 34 18h559c23 0 34 -6 34 -18c0 -11 -10 -17 -30 -17zM743 143h-559c-23 0 -34 6 -34 18c0 11 10 17 30 17h567c20 0 30 -6 30 -17c0 -12 -11 -18 -34 -18z"
            },
            ">": {
                x: 941,
                d: "M771 228l-600 -268c-5 1 -10 3 -15 8c-4 4 -6 8 -6 12c0 8 6 15 19 22l553 248l-553 248c-13 7 -19 14 -19 22c0 5 2 9 6 13s9 6 14 6c3 0 8 -2 17 -5l585 -262c13 -6 19 -13 19 -22c0 -7 -7 -15 -20 -22z"
            },
            "±": {
                x: 967,
                d: "M504 313v-273h278h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-597h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h279v273h-279c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h279v279c0 23 7 34 20 34s20 -12 20 -37v-276\nh278c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-278z"
            },
            "·": {
                x: 406,
                d: "M256 250c0 -15 -6 -28 -16 -38s-22 -15 -37 -15s-27 5 -37 15s-16 23 -16 38s6 28 16 38s22 15 37 15s27 -5 37 -15s16 -23 16 -38z"
            },
            "×": {
                x: 783,
                d: "M392 278l198 198c10 10 18 15 23 15c6 0 11 -2 15 -6s5 -9 5 -14c0 -2 -2 -6 -5 -13c-2 -2 -6 -6 -13 -12s-11 -11 -12 -13l-183 -183l74 -74c35 -35 66 -67 94 -94s42 -41 42 -42c2 -3 3 -7 3 -11c0 -5 -1 -10 -5 -14s-9 -6 -15 -6c-2 0 -7 2 -15 6l-207 207l-199 -199\nc-9 -9 -17 -14 -22 -14s-10 2 -14 6s-6 9 -6 14s4 11 13 20l200 201l-200 201c-9 9 -13 15 -13 20s2 10 6 14s9 6 14 6s13 -5 22 -14z"
            },
            "÷": {
                x: 968,
                d: "M548 466c0 -17 -6 -31 -18 -44s-27 -19 -46 -19c-18 0 -34 6 -46 19s-18 27 -18 44s6 31 18 44s27 19 46 19c18 0 34 -6 46 -19s18 -27 18 -44zM548 34c0 -17 -6 -31 -18 -44s-27 -19 -46 -19c-18 0 -34 6 -46 19s-18 27 -18 44s6 31 18 44s27 19 46 19\nc18 0 34 -6 46 -19s18 -27 18 -44zM185 270h598h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-598h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17z"
            },
            "†": {
                x: 633,
                d: "M327 420c1 -21 5 -49 12 -85c7 -38 11 -77 11 -117c0 -67 -3 -154 -9 -262c-3 -57 -6 -109 -11 -154c-1 -5 -1 -8 -2 -10s-2 -4 -4 -6s-4 -2 -8 -2c-8 0 -12 7 -13 20c-13 145 -20 283 -20 414c0 40 4 79 11 118c7 37 11 65 12 84c-19 -3 -39 -7 -60 -12\nc-26 -7 -46 -11 -59 -11s-23 4 -29 11s-8 14 -8 23c0 4 1 9 2 13s5 8 11 13s14 7 24 7c16 0 40 -5 73 -14c10 -3 25 -6 46 -9c0 22 -3 55 -10 99c-9 59 -13 100 -13 123c0 28 11 42 34 42c22 0 33 -14 33 -42c0 -19 -4 -59 -12 -118c-7 -44 -11 -79 -11 -104\nc19 3 39 7 60 12c26 7 46 11 59 11s22 -3 28 -10s9 -15 9 -24c0 -4 -1 -8 -2 -12s-5 -9 -11 -14s-14 -7 -24 -7c-16 0 -40 5 -73 14c-10 3 -25 6 -46 9z"
            },
            "‡": {
                x: 633,
                d: "M327 467c1 -20 5 -51 12 -92c7 -36 11 -64 11 -85c0 -27 -11 -40 -34 -40c-22 0 -33 13 -33 40c0 21 4 55 13 100c6 31 9 57 10 77c-19 -3 -39 -7 -60 -12c-26 -7 -46 -11 -59 -11s-23 3 -29 10s-8 15 -8 24c0 4 1 8 2 12s5 9 11 14s14 7 24 7c16 0 40 -5 73 -14\nc10 -3 25 -6 46 -9c-1 20 -5 51 -12 92c-7 36 -11 64 -11 85c0 27 11 40 34 40c22 0 33 -13 33 -40c0 -21 -4 -55 -13 -100c-6 -31 -9 -57 -10 -77c19 3 39 7 60 12c26 7 46 11 59 11s22 -4 28 -11s9 -14 9 -23c0 -4 -1 -9 -2 -13s-5 -8 -11 -13s-14 -7 -24 -7\nc-16 0 -40 5 -73 14c-10 3 -25 6 -46 9zM327 12c1 -22 5 -55 13 -99c7 -35 10 -61 10 -78c0 -27 -11 -40 -34 -40c-22 0 -33 13 -33 40c0 19 4 48 12 89c6 37 10 66 11 88c-15 -1 -30 -5 -46 -10c-34 -9 -59 -13 -76 -13c-11 0 -19 4 -25 11s-9 14 -9 22c0 9 2 16 8 23\ns15 10 26 10c17 0 38 -4 64 -11c1 0 5 -1 12 -3s14 -3 23 -5s16 -3 23 -4c-1 22 -5 55 -13 99c-7 35 -10 61 -10 78c0 27 11 40 33 40c23 0 34 -13 34 -40c0 -19 -4 -48 -12 -89c-6 -37 -10 -66 -11 -88c15 1 30 5 46 10c34 9 59 13 76 13c11 0 19 -4 25 -11s9 -14 9 -22\nc0 -9 -3 -16 -9 -23s-14 -10 -25 -10c-17 0 -39 4 -64 11c-1 0 -5 1 -12 3s-14 3 -23 5s-16 3 -23 4z"
            },
            "•": {
                x: 689,
                d: "M539 250c0 -53 -19 -99 -57 -137s-84 -57 -137 -57c-54 0 -100 19 -138 57s-57 84 -57 137s19 98 57 136s84 58 138 58c53 0 99 -19 137 -57s57 -84 57 -137z"
            },
            "←": {
                x: 1188,
                d: "M1002 230h-743c36 -27 67 -59 92 -97c13 -20 23 -41 31 -63s14 -38 16 -49s4 -17 4 -20c0 -8 -7 -12 -20 -12c-8 0 -14 1 -16 3s-4 5 -5 12c-25 111 -90 189 -196 233c-10 4 -15 8 -15 13s5 10 15 13c105 43 170 119 195 228c2 9 4 15 6 17s8 3 16 3c13 0 20 -4 20 -12\nc0 -3 -2 -9 -4 -19s-7 -28 -16 -50s-20 -43 -33 -64c-21 -34 -51 -66 -90 -96h743h18s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-18z"
            },
            "↑": {
                x: 766,
                d: "M403 555v-713c0 -8 -1 -14 -1 -18s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 18v713c-23 -35 -50 -65 -82 -89c-17 -12 -35 -22 -55 -31s-35 -14 -45 -17s-16 -4 -19 -4c-8 0 -12 6 -12 19c0 8 0 13 2 15s7 4 15 7c55 15 100 41 135 79s58 85 69 141\nc2 12 6 18 12 18s10 -3 11 -9c11 -61 34 -110 69 -147c36 -39 79 -66 130 -80c11 -3 18 -7 20 -9s3 -7 3 -15c0 -13 -4 -19 -12 -19c-3 0 -9 1 -19 4s-26 9 -47 18s-40 20 -58 34c-30 23 -56 51 -77 85z"
            },
            "→": {
                x: 1188,
                d: "M929 230h-743h-18s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h18h743c-36 27 -67 59 -92 97c-13 20 -23 41 -31 63s-14 38 -16 49s-4 17 -4 20c0 8 7 12 20 12c8 0 14 -1 16 -3s4 -5 5 -12c26 -115 94 -193 203 -235c5 -3 8 -6 8 -11s-5 -10 -15 -13\nc-104 -43 -169 -119 -195 -228c-2 -9 -4 -15 -6 -17s-8 -3 -16 -3c-13 0 -20 4 -20 12c0 3 2 9 4 19s7 28 16 50s20 43 33 64c21 34 51 66 90 96z"
            },
            "↓": {
                x: 766,
                d: "M403 658v-713c23 35 50 65 82 89c17 12 35 22 55 31s35 14 45 17s16 4 19 4c8 0 12 -6 12 -19c0 -8 0 -13 -2 -15s-7 -4 -15 -7c-55 -15 -100 -42 -135 -80s-58 -85 -69 -142c-3 -11 -7 -16 -12 -16c-6 0 -10 3 -11 10c-12 60 -35 109 -69 146c-36 39 -79 66 -130 80\nc-11 3 -18 7 -20 9s-3 7 -3 15c0 13 4 19 12 19c3 0 9 -1 19 -4s26 -9 47 -18s40 -20 58 -34c30 -23 56 -51 77 -85v713c0 8 1 14 1 18s2 8 5 12s8 6 14 6s11 -2 14 -6s5 -8 5 -12s1 -10 1 -18z"
            },
            "↔": {
                x: 1187,
                d: "M259 270h669c-36 27 -67 59 -92 97c-13 20 -24 41 -32 63s-14 38 -16 49s-3 17 -3 20c0 8 7 12 20 12c8 0 13 -1 15 -3s5 -5 6 -12c26 -115 94 -193 203 -235c5 -3 8 -6 8 -11s-5 -10 -15 -13c-104 -43 -169 -119 -195 -228c-2 -9 -5 -15 -7 -17s-7 -3 -15 -3\nc-13 0 -20 4 -20 12c0 3 1 9 3 19s8 28 17 50s20 43 33 64c21 34 51 66 90 96h-669c36 -27 67 -59 92 -97c13 -20 23 -41 31 -63s14 -38 16 -49s4 -17 4 -20c0 -8 -7 -12 -20 -12c-8 0 -14 1 -16 3s-4 5 -5 12c-25 111 -90 189 -196 233c-10 4 -15 8 -15 13s5 10 15 13\nc105 43 170 119 195 228c2 9 4 15 6 17s8 3 16 3c13 0 20 -4 20 -12c0 -3 -2 -9 -4 -19s-7 -28 -16 -50s-20 -43 -33 -64c-21 -34 -51 -66 -90 -96z"
            },
            "↕": {
                x: 766,
                d: "M403 633v-766c23 35 50 65 82 89c17 12 35 22 55 31s35 14 45 17s16 4 19 4c8 0 12 -6 12 -19c0 -8 0 -13 -2 -15s-7 -4 -15 -7c-55 -15 -100 -43 -135 -81s-58 -85 -69 -141c-3 -11 -7 -16 -12 -16c-6 0 -10 3 -11 10c-12 60 -35 109 -69 146c-37 39 -80 66 -130 80\nc-11 3 -18 7 -20 9s-3 7 -3 15c0 13 4 19 12 19c2 0 8 -1 18 -4s27 -9 48 -18s40 -21 58 -34c30 -23 56 -51 77 -85v766c-23 -35 -50 -65 -82 -89c-17 -12 -35 -22 -55 -31s-35 -14 -45 -17s-16 -4 -19 -4c-8 0 -12 6 -12 19c0 11 3 18 10 20c56 15 103 42 141 81\nc35 39 59 86 70 141c2 12 6 18 12 18s10 -3 11 -9c11 -59 33 -108 68 -147c37 -40 81 -67 131 -80c11 -3 18 -7 20 -9s3 -7 3 -15c0 -13 -4 -19 -12 -19c-2 0 -8 1 -18 4s-27 9 -48 18s-40 21 -58 34c-30 23 -56 51 -77 85z"
            },
            "↖": {
                x: 1214,
                d: "M270 628l779 -780c10 -10 15 -18 15 -23s-2 -10 -6 -14s-8 -6 -14 -6c-5 0 -13 5 -22 14l-781 780c3 -17 5 -36 5 -58c0 -44 -8 -86 -23 -127c-23 -54 -39 -81 -50 -81c-3 0 -8 3 -14 9s-9 11 -9 14s2 7 5 13c35 53 52 111 52 173c0 47 -9 90 -28 129c-2 5 -3 9 -3 12\nc0 7 3 10 10 10c3 0 7 -1 12 -4c37 -18 80 -27 129 -27c63 0 120 17 173 52c5 3 10 5 13 5s8 -3 14 -9s9 -11 9 -14c0 -10 -27 -27 -81 -50c-43 -15 -85 -23 -127 -23c-20 0 -39 2 -58 5z"
            },
            "↗": {
                x: 1214,
                d: "M973 599l-781 -780c-9 -9 -17 -14 -22 -14s-10 2 -14 6s-6 9 -6 14s5 13 15 23l779 780c-17 -3 -36 -5 -58 -5c-43 0 -84 8 -125 23c-16 6 -33 14 -53 25s-30 19 -30 25c0 3 3 8 9 14s11 9 14 9c4 0 8 -2 13 -5c53 -35 110 -52 173 -52c47 0 90 9 129 28c5 2 9 3 12 3\nc7 0 10 -3 10 -10c0 -3 -1 -7 -4 -12c-18 -37 -27 -80 -27 -129c0 -61 17 -119 52 -173c3 -6 5 -10 5 -13s-3 -8 -9 -14s-11 -9 -14 -9c-11 0 -27 27 -50 81c-15 43 -23 85 -23 127c0 20 2 39 5 58z"
            },
            "↘": {
                x: 1214,
                d: "M944 -128l-779 780c-10 10 -15 18 -15 23s2 10 6 14s8 6 14 6c5 0 13 -5 22 -14l781 -780c-3 17 -5 36 -5 58c0 44 8 86 23 127c23 54 39 81 50 81c3 0 8 -3 14 -9s9 -11 9 -14s-2 -7 -5 -13c-35 -53 -52 -111 -52 -173c0 -47 9 -90 28 -129c2 -5 3 -9 3 -12\nc0 -7 -3 -10 -10 -10c-3 0 -7 1 -12 4c-37 18 -80 27 -129 27c-63 0 -120 -17 -173 -52c-5 -3 -9 -5 -13 -5c-3 0 -8 3 -14 9s-9 11 -9 14c0 10 27 27 81 50c43 15 85 23 127 23c20 0 39 -2 58 -5z"
            },
            "↙": {
                x: 1214,
                d: "M1049 652l-779 -780c17 3 36 5 58 5c43 0 84 -8 125 -23c16 -6 33 -14 53 -25s30 -19 30 -25c0 -3 -3 -8 -9 -14s-11 -9 -14 -9s-8 2 -13 5c-53 35 -110 52 -173 52c-47 0 -90 -9 -129 -28c-5 -2 -9 -3 -12 -3c-7 0 -10 3 -10 10c0 3 1 7 4 12c18 37 27 80 27 129\nc0 61 -17 119 -52 173c-3 6 -5 10 -5 13s3 8 9 14s11 9 14 9c11 0 27 -27 50 -81c15 -43 23 -85 23 -127c0 -20 -2 -39 -5 -58l781 780c9 9 17 14 22 14s10 -2 14 -6s6 -9 6 -14s-5 -13 -15 -23z"
            },
            "↚": {
                x: 1186,
                d: "M603 230l-100 -151c-7 -10 -14 -15 -22 -15c-5 0 -9 2 -13 6s-6 8 -6 14c0 4 6 15 17 33l76 113h-321c23 -17 42 -37 60 -60s31 -43 38 -58s10 -24 10 -28c0 -8 -5 -12 -15 -12c-7 0 -13 5 -17 14c-15 33 -34 62 -57 87s-53 46 -91 64c-8 5 -12 9 -12 13c0 3 0 6 2 7\ns6 4 12 7c31 14 58 32 80 54s36 41 44 54s16 28 23 46c3 7 9 10 16 10c10 0 15 -4 15 -12c0 -4 -3 -13 -10 -28s-20 -35 -38 -58s-37 -43 -60 -60h348l100 151c7 10 14 15 22 15c5 0 10 -2 14 -6s5 -8 5 -14c0 -4 -6 -15 -17 -33l-76 -113h371h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17h-398z"
            },
            "↛": {
                x: 1186,
                d: "M604 230l-100 -151c-7 -10 -14 -15 -22 -15c-5 0 -10 2 -14 6s-5 8 -5 14c0 4 6 15 17 33l76 113h-371h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h398l100 151c7 10 14 15 22 15c5 0 9 -2 13 -6s6 -8 6 -14c0 -4 -6 -15 -17 -33l-76 -113h321\nc-23 17 -42 37 -60 60s-31 43 -38 58s-10 24 -10 28c0 8 5 12 15 12c7 0 13 -5 17 -14c19 -42 41 -74 66 -97s54 -42 87 -57c1 0 2 0 3 -1s1 -1 2 -3s2 -4 2 -6c0 -5 -5 -9 -14 -14c-67 -31 -116 -83 -147 -154c-3 -7 -9 -10 -16 -10c-10 0 -15 4 -15 12c0 4 3 13 10 28\ns20 35 38 58s37 43 60 60h-348z"
            },
            "↞": {
                x: 1186,
                d: "M1001 230h-589c7 -5 15 -13 24 -22s22 -26 38 -50s30 -49 39 -75h-31c-23 62 -62 111 -116 147h-136c45 -40 78 -89 101 -147h-31c-25 71 -75 126 -150 167c73 39 123 94 150 167h31c-23 -58 -56 -107 -101 -147h136c55 38 94 87 116 147h31c-21 -59 -55 -108 -101 -147\nh589h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-7 -6 -11 -6h-18z"
            },
            "↠": {
                x: 1186,
                d: "M820 270h136c-45 40 -78 89 -101 147h31c25 -71 75 -126 150 -167c-73 -39 -123 -94 -150 -167h-31c23 58 56 107 101 147h-136c-55 -38 -94 -87 -116 -147h-31c21 59 55 108 101 147h-589h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s7 6 11 6h18h589c-7 5 -15 13 -24 22\ns-22 26 -38 50s-30 49 -39 75h31c23 -62 62 -111 116 -147z"
            },
            "↢": {
                x: 1283,
                d: "M986 230h-756c44 -40 78 -89 101 -147h-31c-28 75 -78 130 -150 167c73 37 123 93 150 167h31c-23 -59 -56 -108 -101 -147h756c53 35 91 84 116 147h31c-21 -59 -55 -108 -102 -147v-40c47 -41 81 -90 102 -147h-31c-25 63 -63 112 -116 147z"
            },
            "↣": {
                x: 1283,
                d: "M297 270h756c-44 40 -78 89 -101 147h31c28 -75 78 -130 150 -167c-73 -37 -123 -93 -150 -167h-31c23 59 56 108 101 147h-756c-53 -35 -91 -84 -116 -147h-31c21 59 55 108 102 147v40c-47 41 -81 90 -102 147h31c25 -63 63 -112 116 -147z"
            },
            "↫": {
                x: 1206,
                d: "M755 230v-237c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 17v237h-485c45 -40 78 -89 101 -147h-31c-25 71 -75 126 -150 167c73 39 123 94 150 167h31c-23 -58 -56 -107 -101 -147h485v60c0 84 11 146 35 186s69 60 136 60\nc113 0 170 -57 170 -172c0 -65 -19 -111 -57 -136s-99 -38 -182 -38h-62zM755 270h59c78 0 132 10 160 30s42 54 42 104c0 47 -10 82 -31 102s-54 30 -99 30c-50 0 -84 -15 -103 -44s-28 -84 -28 -165v-57z"
            },
            "↬": {
                x: 1206,
                d: "M491 230v-237c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v236h-62c-83 0 -144 13 -182 38s-57 71 -57 136c0 115 57 172 170 172c67 0 112 -20 136 -60s35 -102 35 -186v-60h485c-45 40 -78 89 -101 147h31c25 -71 75 -126 150 -167\nc-73 -39 -123 -94 -150 -167h-31c23 58 56 107 101 147h-485zM392 270h59v57c0 81 -10 136 -29 165s-53 44 -102 44c-45 0 -78 -10 -99 -30s-31 -55 -31 -102c0 -50 14 -84 42 -104s82 -30 160 -30z"
            },
            "↭": {
                x: 1574,
                d: "M1344 230h-134c-13 0 -21 1 -26 4s-14 13 -29 28l-42 42l-78 -79c-40 -43 -64 -67 -73 -74c-3 -3 -7 -4 -12 -4s-13 4 -22 13l-34 34s-29 30 -35 37c-21 22 -45 46 -72 73c-27 -26 -50 -50 -71 -72l-40 -40c-2 -3 -7 -9 -16 -18l-17 -17c-8 -7 -14 -10 -19 -10\ns-10 1 -13 4c-13 12 -34 34 -65 67c-43 42 -72 71 -85 86c-23 -22 -39 -37 -47 -46s-14 -15 -18 -19c-7 -6 -17 -9 -32 -9h-134c45 -40 78 -89 101 -147h-31c-25 71 -75 126 -150 167c73 39 123 94 150 167h31c-23 -58 -56 -107 -101 -147h141l54 55c14 14 22 23 25 25\ns7 3 11 3c6 0 13 -5 22 -14l141 -143l150 153l1 1c1 0 2 0 3 1s2 1 4 1s3 1 5 1c6 0 13 -4 22 -13l142 -144c9 10 36 37 80 82s67 69 69 70c4 3 8 5 13 5c4 0 8 -2 12 -5s15 -14 34 -32l44 -46h141c-44 39 -78 88 -101 147h31c27 -72 77 -128 150 -167\nc-72 -37 -122 -92 -150 -167h-31c23 59 57 108 101 147z"
            },
            "↮": {
                x: 1185,
                d: "M603 230l-100 -151c-7 -10 -14 -15 -22 -15c-5 0 -9 2 -13 6s-6 8 -6 14c0 4 6 15 17 33l76 113h-321c23 -17 42 -37 60 -60s31 -43 38 -58s10 -24 10 -28c0 -8 -5 -12 -15 -12c-7 0 -13 5 -17 14c-15 33 -34 62 -57 87s-53 46 -91 64c-8 5 -12 9 -12 13c0 3 0 6 2 7\ns6 4 12 7c31 14 58 32 80 54s36 41 44 54s16 28 23 46c3 7 9 10 16 10c10 0 15 -4 15 -12c0 -4 -3 -13 -10 -28s-20 -35 -38 -58s-37 -43 -60 -60h348l100 151c7 10 14 15 22 15c5 0 10 -2 14 -6s5 -8 5 -14c0 -4 -6 -15 -17 -33l-76 -113h321c-23 17 -43 37 -61 60\ns-29 43 -36 58s-11 24 -11 28c0 8 5 12 15 12c7 0 13 -5 17 -14c19 -42 41 -74 66 -97s54 -42 87 -57c1 0 1 0 2 -1s3 -1 4 -3s1 -4 1 -6c0 -5 -5 -9 -14 -14c-67 -31 -116 -83 -147 -154c-3 -7 -9 -10 -16 -10c-10 0 -15 4 -15 12c0 4 4 13 11 28s18 35 36 58s38 43 61 60\nh-348z"
            },
            "↰": {
                x: 686,
                d: "M536 540v-505v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 7 -6 11v18v500h-266c45 -39 79 -88 101 -146h-31c-14 37 -34 70 -61 99s-56 51 -89 67c73 39 123 94 150 167h31c-25 -60 -58 -109 -101 -147h271c16 0 25 -1 29 -5s6 -14 6 -30z"
            },
            "↱": {
                x: 686,
                d: "M456 535h-266v-500v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 7 -6 11v18v505c0 16 2 26 6 30s13 5 29 5h271c-46 41 -80 90 -101 147h31c27 -73 77 -128 150 -167c-71 -37 -121 -92 -150 -166h-31c21 57 55 105 101 146z"
            },
            "↶": {
                x: 1235,
                d: "M350 88c20 25 42 47 66 64s44 29 56 34s19 7 22 7c7 0 11 -5 11 -15c0 -6 -1 -10 -3 -12s-6 -4 -14 -8c-66 -29 -115 -75 -146 -140c-3 -8 -6 -12 -8 -14s-4 -3 -7 -3c-4 0 -8 3 -12 10c-32 70 -84 120 -155 151c-7 2 -10 7 -10 15c0 11 4 16 11 16c4 0 14 -4 29 -11\ns34 -19 58 -37s43 -39 60 -62c13 118 58 211 134 278s160 101 254 101c59 0 114 -14 164 -40s91 -60 123 -102s57 -86 75 -136s27 -99 27 -148c0 -7 -1 -13 -1 -17s-2 -7 -5 -11s-8 -6 -14 -6c-9 0 -15 3 -17 10s-3 18 -3 34c-1 31 -5 64 -15 98s-24 68 -44 101\ns-43 63 -70 89s-60 48 -98 64s-79 24 -122 24c-91 0 -168 -33 -234 -98s-103 -143 -112 -236z"
            },
            "↷": {
                x: 1236,
                d: "M928 83c17 23 36 44 60 62s43 30 58 37s25 11 29 11c7 0 11 -5 11 -16c0 -5 0 -9 -2 -11s-6 -3 -13 -6c-69 -30 -119 -81 -152 -153c-2 -4 -5 -6 -10 -6s-9 4 -13 12c-31 68 -80 116 -145 144c-10 5 -15 7 -17 9s-3 6 -3 12c0 10 4 15 11 15c3 0 12 -2 24 -7\ns30 -16 54 -34s46 -39 66 -64c-8 92 -44 171 -110 236s-145 98 -237 98c-98 0 -180 -39 -247 -116s-101 -169 -102 -274c0 -20 -7 -30 -20 -30c-6 0 -11 2 -14 6s-6 7 -6 11v17c0 49 9 98 27 148s43 96 75 138s74 75 124 101s105 39 163 39c98 0 184 -34 259 -104\ns118 -162 130 -275z"
            },
            "↺": {
                x: 965,
                d: "M622 393l-30 9c-10 55 -34 101 -73 139c-8 8 -13 13 -16 14s-7 2 -14 3c-13 0 -19 4 -19 12c0 9 7 13 21 13c5 0 11 0 18 -1s13 -1 19 -2s9 -1 10 -1c3 0 10 1 21 5s27 12 48 24s41 28 58 47c17 -5 27 -7 29 -8c-26 -30 -62 -57 -109 -80c75 -27 132 -70 171 -129\ns59 -121 59 -188c0 -91 -32 -170 -97 -235s-144 -98 -236 -98c-91 0 -169 32 -234 97s-98 144 -98 236c0 39 6 75 18 110s28 64 45 86s36 41 55 58s36 29 49 36s22 11 27 11c8 0 12 -4 12 -12c0 -5 -5 -10 -14 -15c-33 -18 -61 -39 -84 -64s-41 -50 -52 -76s-19 -48 -24 -70\ns-7 -43 -7 -64c0 -85 30 -158 90 -218s133 -90 218 -90c84 0 157 30 217 90s90 133 90 218c0 67 -20 127 -60 182s-93 93 -160 113l-5 -20c30 -40 49 -84 57 -132z"
            },
            "↻": {
                x: 965,
                d: "M400 525l-5 20c-67 -20 -120 -58 -160 -113s-60 -115 -60 -182c0 -85 30 -158 90 -218s133 -90 218 -90c84 0 157 30 217 90s90 133 90 218c0 20 -2 41 -7 62s-12 45 -23 71s-28 52 -52 77s-53 46 -86 65c-9 5 -13 9 -13 14c0 8 4 12 12 12c5 0 14 -4 27 -11\ns30 -19 49 -36s38 -36 55 -59s32 -51 44 -85s19 -71 19 -110c0 -91 -32 -170 -97 -235s-144 -98 -236 -98c-91 0 -169 32 -234 97s-98 144 -98 236c0 67 19 129 58 188s97 102 172 129c-47 23 -83 50 -109 80c2 1 12 3 29 8c17 -19 36 -35 57 -47s38 -20 49 -24s18 -5 21 -5\nc1 0 3 0 9 1s13 1 20 2s13 1 18 1c14 0 21 -4 21 -13c0 -8 -7 -12 -21 -12c-9 0 -21 -8 -36 -24c-35 -39 -56 -83 -65 -132l-30 -9c8 47 27 91 57 132z"
            },
            "↼": {
                x: 1188,
                d: "M236 196h766c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-18h-852v20c71 35 121 91 150 168h32c-19 -59 -51 -108 -96 -148z"
            },
            "↽": {
                x: 1188,
                d: "M150 344h854h17s7 -3 11 -6s6 -8 6 -14s-2 -11 -6 -14s-6 -6 -10 -6h-18h-768c45 -40 77 -89 96 -148h-30c-15 39 -36 73 -64 102s-57 51 -88 66v20z"
            },
            "↾": {
                x: 487,
                d: "M190 608v-767v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 7 -6 11v18v853h20c15 -31 37 -61 65 -88s62 -48 102 -63v-31c-58 19 -107 51 -147 96z"
            },
            "↿": {
                x: 487,
                d: "M337 694v-853c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 7 -5 11s-1 10 -1 18v767c-40 -45 -89 -77 -147 -96v31c40 15 74 36 102 63s50 57 65 88h20z"
            },
            "⇀": {
                x: 1188,
                d: "M184 196h768c-45 40 -77 89 -96 148h30c15 -39 36 -73 64 -102s57 -51 88 -66v-20h-854h-17s-7 3 -11 6s-6 8 -6 14s2 11 6 14s6 6 10 6h18z"
            },
            "⇁": {
                x: 1188,
                d: "M186 344h852v-20c-71 -35 -121 -91 -150 -168h-32c19 59 51 108 96 148h-766c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 6 12 6h18z"
            },
            "⇂": {
                x: 487,
                d: "M190 659v-767c40 45 89 77 147 96v-31c-40 -15 -75 -36 -103 -63s-49 -57 -64 -88h-20v853v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -7 6 -11v-18z"
            },
            "⇃": {
                x: 487,
                d: "M337 659v-853h-20c-15 31 -37 61 -65 88s-62 48 -102 63v31c58 -19 107 -51 147 -96v767c0 7 1 13 1 17s2 8 5 12s8 6 14 6s11 -2 14 -6s5 -7 5 -11s1 -10 1 -18z"
            },
            "⇄": {
                x: 1187,
                d: "M1002 480h-771c45 -40 78 -89 101 -147h-31c-25 71 -75 126 -150 167c73 39 123 94 150 167h31c-23 -58 -56 -107 -101 -147h771h17s8 -3 12 -6s6 -8 6 -14s-1 -11 -5 -14s-8 -6 -12 -6h-18zM956 147h-771c-8 0 -14 1 -18 1s-7 2 -11 5s-6 8 -6 14s2 11 6 14s8 5 12 5\ns10 1 18 1h770c-45 40 -79 89 -101 146h31c14 -37 35 -70 62 -99s56 -51 88 -67c-74 -40 -124 -96 -150 -167h-31c23 58 56 107 101 147z"
            },
            "⇆": {
                x: 1187,
                d: "M956 480h-771h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s7 6 11 6h18h771c-44 39 -78 88 -101 147h31c25 -71 75 -126 150 -167c-73 -39 -123 -94 -150 -167h-31c23 58 56 107 101 147zM1002 147h-771c46 -41 80 -90 101 -147h-31c-27 72 -77 128 -150 167c33 17 62 39 89 67\ns47 62 61 99h31c-21 -58 -55 -107 -101 -146h770c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-1 -11 -5 -14s-8 -5 -12 -5s-10 -1 -18 -1z"
            },
            "⇇": {
                x: 1187,
                d: "M1004 397h-774c49 -47 83 -96 102 -147c-19 -51 -53 -100 -102 -147h774c8 0 14 -1 18 -1s7 -2 10 -5s5 -8 5 -14s-3 -11 -7 -14s-8 -5 -12 -5s-10 -1 -19 -1h-768c48 -45 82 -94 101 -146h-31c-15 37 -34 69 -58 96s-55 50 -93 71c70 33 120 88 151 166\nc-29 75 -80 130 -151 167c71 35 121 91 151 166h31c-19 -52 -53 -101 -101 -146h768c9 0 15 -1 19 -1s8 -2 12 -5s7 -8 7 -14s-2 -11 -5 -14s-6 -5 -10 -5s-10 -1 -18 -1z"
            },
            "⇈": {
                x: 966,
                d: "M670 613v-770v-19s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 6 -6 10v18v774c-47 -49 -96 -83 -147 -102c-51 19 -100 53 -147 102v-774v-18s-3 -6 -6 -10s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v19v770c-40 -45 -89 -78 -146 -101v31c73 27 128 78 167 151\nc16 -35 39 -65 68 -91s62 -46 98 -60c75 29 131 79 167 151c37 -73 92 -124 166 -151v-31c-59 25 -108 58 -146 101z"
            },
            "⇉": {
                x: 1187,
                d: "M957 397h-774c-8 0 -13 1 -17 1s-8 2 -11 5s-5 8 -5 14s2 11 6 14s9 5 13 5s10 1 19 1h768c-48 45 -82 94 -101 146h31c15 -37 34 -69 58 -96s55 -50 93 -71c-70 -33 -120 -88 -151 -166c29 -75 80 -130 151 -167c-71 -35 -121 -91 -151 -166h-31c19 52 53 101 101 146\nh-768c-9 0 -15 1 -19 1s-9 2 -13 5s-6 8 -6 14s2 11 5 14s7 5 11 5s9 1 17 1h774c-49 47 -83 96 -102 147c19 51 53 100 102 147z"
            },
            "⇊": {
                x: 966,
                d: "M670 657v-770c40 45 89 78 146 101v-31c-75 -28 -130 -78 -166 -151h-1c-16 35 -39 65 -68 91s-62 46 -98 60c-75 -29 -131 -79 -167 -151c-37 73 -92 124 -166 151v31c59 -25 108 -58 146 -101v770v19s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -6 6 -10v-18v-774\nc47 49 96 83 147 102c51 -19 100 -53 147 -102v774v18s3 6 6 10s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-19z"
            },
            "⇋": {
                x: 1187,
                d: "M1002 327h-852v20c31 15 61 37 88 65s48 62 63 102h31c-19 -58 -51 -107 -96 -147h766c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-1 -11 -5 -14s-8 -5 -12 -5s-10 -1 -18 -1zM951 133h-766c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s7 5 11 5s10 1 18 1h852v-20\nc-31 -15 -61 -37 -88 -65s-48 -62 -63 -102h-31c19 58 51 107 96 147z"
            },
            "⇌": {
                x: 1187,
                d: "M1037 327h-852c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s7 5 11 5s10 1 18 1h766c-45 40 -77 89 -96 147h31c15 -40 36 -74 63 -102s57 -50 88 -65v-20zM1002 133h-766c45 -40 77 -89 96 -147h-31c-15 40 -36 74 -63 102s-57 50 -88 65v20h852c7 0 13 -1 17 -1\ns8 -2 12 -5s6 -8 6 -14s-1 -11 -5 -14s-8 -5 -12 -5s-10 -1 -18 -1z"
            },
            "⇍": {
                x: 1186,
                d: "M745 327l-65 -154h320c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-338l-62 -147c-5 -13 -12 -19 -21 -19c-5 0 -10 2 -14 5s-6 8 -6 15c0 2 20 51 60 146h-207c24 -27 44 -53 61 -77s27 -41 32 -51s7 -16 7 -18\nc0 -8 -7 -12 -20 -12c-7 0 -12 1 -15 3l-13 22c-65 120 -164 199 -299 237c-11 3 -16 7 -16 13s6 10 17 13c136 39 236 120 301 243c5 9 9 14 11 16s7 3 14 3c13 0 20 -4 20 -12c0 -2 -2 -9 -7 -19s-15 -28 -32 -52s-37 -49 -61 -75h306l61 144c3 8 7 14 10 17s7 5 12 5\ns10 -2 14 -5s6 -8 6 -15c0 -1 -2 -7 -6 -18l-54 -128h239c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-255zM702 327h-314c-11 0 -18 -1 -21 -2c-1 0 -8 -5 -19 -14c-21 -16 -57 -36 -107 -61c49 -25 87 -47 114 -67\nc9 -7 20 -10 33 -10h249z"
            },
            "⇎": {
                x: 1229,
                d: "M713 497l-41 -130h186c-18 21 -34 43 -48 67s-24 43 -30 56s-8 20 -8 23c0 8 6 12 19 12c7 0 13 -1 15 -3s5 -7 9 -16c50 -114 136 -196 257 -246c5 0 7 -3 7 -10c0 -5 -2 -8 -6 -10c-121 -49 -207 -132 -258 -247c-4 -9 -7 -13 -9 -15s-7 -3 -15 -3c-13 0 -19 4 -19 12\nc0 3 2 11 8 24s16 31 30 55s31 46 48 67h-260c-3 -10 -18 -58 -45 -145c-5 -14 -13 -21 -22 -21c-2 0 -4 0 -7 1s-6 4 -9 7s-4 7 -4 12c0 7 7 31 22 71c3 8 7 22 13 42s9 31 10 33h-185c18 -21 34 -43 48 -67s23 -43 29 -56s9 -20 9 -23c0 -8 -6 -12 -19 -12\nc-7 0 -12 1 -14 3s-6 7 -10 16c-50 114 -136 196 -257 246c-5 0 -7 3 -7 10c0 5 2 8 6 10c121 49 207 132 258 247c4 9 7 13 9 15s7 3 15 3c13 0 19 -4 19 -12c0 -3 -3 -11 -9 -24s-16 -31 -30 -55s-30 -46 -47 -67h260c3 10 18 58 45 145c5 14 13 21 22 21c2 0 5 0 8 -1\ns5 -4 8 -7s4 -7 4 -12c0 -4 -2 -9 -5 -16zM331 173h238l49 154h-287c-27 -27 -62 -52 -105 -77c43 -25 78 -50 105 -77zM660 327l-49 -154h287c27 27 62 52 105 77c-43 25 -78 50 -105 77h-238z"
            },
            "⇏": {
                x: 1186,
                d: "M620 495l-54 -128h207c-24 27 -44 53 -61 77s-27 41 -32 51s-7 16 -7 18c0 8 7 12 20 12c7 0 12 -1 15 -3l13 -22c65 -120 164 -199 299 -237c11 -3 16 -7 16 -13s-6 -10 -17 -13c-136 -39 -236 -120 -301 -243c-5 -9 -9 -14 -11 -16s-7 -3 -14 -3c-13 0 -20 4 -20 12\nc0 2 2 9 7 19s15 28 32 52s37 49 61 75h-306l-62 -147c-5 -13 -12 -19 -21 -19c-5 0 -10 2 -14 5s-6 8 -6 15c0 2 20 51 60 146h-239c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h255l65 154h-320c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h338\nl61 144c3 8 7 14 10 17s7 5 12 5s10 -2 14 -5s6 -8 6 -15c0 -1 -2 -7 -6 -18zM484 173h314c11 0 18 1 21 2c1 0 7 5 19 14c21 16 57 36 107 61c-49 25 -87 47 -114 67c-9 7 -20 10 -33 10h-249z"
            },
            "⇐": {
                x: 1188,
                d: "M1003 133h-591c22 -21 44 -49 66 -83s34 -56 34 -64c0 -7 -6 -11 -19 -11c-7 0 -11 1 -14 3s-7 8 -12 18c-29 55 -69 104 -119 146s-107 73 -172 92c-11 3 -18 6 -22 8l-3 2c-1 1 -1 3 -1 6s1 5 2 6c2 2 9 5 20 9c71 21 133 55 188 103c20 18 38 37 54 58s28 36 34 46\ns15 26 26 45c3 5 9 8 19 8c13 0 19 -4 19 -11c0 -8 -12 -29 -34 -64s-44 -62 -66 -83h591c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-635c-34 -29 -76 -55 -126 -77c51 -23 93 -49 126 -77h635c8 0 14 -1 18 -1s8 -2 12 -5\ns6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⇑": {
                x: 848,
                d: "M541 430v-588c0 -8 -1 -14 -1 -18s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v634c-29 35 -55 77 -77 126c-21 -49 -47 -91 -77 -126v-634c0 -8 -1 -14 -1 -18s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 18v588c-26 -24 -49 -43 -69 -57\nc-42 -29 -68 -43 -77 -43c-7 0 -11 7 -11 20c0 11 3 17 8 20c129 66 214 170 255 312c2 7 6 11 11 11c6 0 9 -3 10 -8c42 -144 126 -248 252 -313c6 -3 9 -6 10 -8s2 -7 2 -14c0 -13 -4 -20 -11 -20c-9 0 -35 15 -77 44c-22 15 -45 33 -69 56z"
            },
            "⇒": {
                x: 1188,
                d: "M821 327h-635c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h591c-22 21 -44 49 -66 83s-34 56 -34 64c0 7 6 11 19 11c7 0 11 -1 14 -3s7 -8 12 -18c29 -55 69 -104 119 -146s107 -73 172 -92c11 -3 18 -6 22 -8l3 -2c1 -1 1 -3 1 -6s-1 -5 -2 -6\nc-2 -2 -9 -5 -20 -9c-71 -21 -133 -55 -188 -103c-20 -18 -38 -37 -54 -58s-28 -36 -34 -46s-15 -26 -26 -45c-3 -5 -9 -8 -19 -8c-13 0 -19 4 -19 11c0 8 12 29 34 64s44 62 66 83h-591c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h635c34 29 76 55 126 77\nc-51 23 -93 49 -126 77z"
            },
            "⇓": {
                x: 848,
                d: "M541 658v-588c26 24 49 43 69 57c42 29 68 43 77 43c7 0 11 -7 11 -20c0 -11 -3 -17 -8 -20c-129 -67 -214 -171 -255 -312c-2 -7 -6 -11 -11 -11c-6 0 -9 3 -10 8c-41 143 -125 248 -252 313c-6 3 -9 6 -10 8s-2 7 -2 14c0 13 4 20 11 20c9 0 35 -15 77 -44\nc22 -15 45 -33 69 -56v588c0 8 1 14 1 18s2 8 5 12s8 6 14 6s11 -2 14 -6s5 -8 5 -12s1 -10 1 -18v-634c29 -35 55 -77 77 -126c21 49 47 91 77 126v634c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -18z"
            },
            "⇔": {
                x: 1231,
                d: "M370 367h491c-17 19 -33 41 -47 64s-25 42 -31 56s-9 23 -9 26c0 8 7 12 20 12c11 0 17 -3 20 -10c52 -119 133 -201 243 -247c13 -6 21 -10 23 -12c1 -1 1 -3 1 -6s-1 -6 -3 -7s-7 -4 -14 -7c-115 -49 -197 -129 -246 -240c-5 -10 -8 -16 -10 -18s-7 -3 -14 -3\nc-13 0 -20 4 -20 12c0 3 3 12 9 26s17 33 31 56s30 45 47 64h-491c17 -19 34 -41 48 -64s24 -42 30 -56s9 -23 9 -26c0 -8 -7 -12 -20 -12c-11 0 -17 3 -20 10c-52 119 -133 201 -243 247c-13 6 -21 10 -23 12c-1 1 -1 3 -1 6s1 6 3 7s7 4 14 7c115 49 197 129 246 240\nc5 10 8 16 10 18s7 3 14 3c13 0 20 -4 20 -12c0 -3 -3 -12 -9 -26s-16 -33 -30 -56s-31 -45 -48 -64zM331 173h569c25 25 60 51 105 77c-43 25 -78 51 -105 77h-569c-25 -25 -60 -51 -105 -77c43 -25 78 -51 105 -77z"
            },
            "⇕": {
                x: 848,
                d: "M541 550v-600c20 17 41 32 65 46s42 25 56 31s22 9 25 9c7 0 11 -6 11 -19c0 -9 -1 -15 -3 -16c-1 -1 -8 -5 -20 -11c-109 -48 -188 -130 -237 -246c-5 -10 -9 -15 -14 -15s-10 5 -14 16c-50 117 -134 200 -251 251c-6 3 -9 10 -9 21c0 13 4 19 11 19c3 0 11 -3 25 -9\ns32 -16 56 -30s45 -30 65 -47v600c-20 -17 -41 -32 -65 -46s-42 -25 -56 -31s-22 -9 -25 -9c-7 0 -11 6 -11 19c0 9 1 15 3 16c1 1 8 5 20 11c109 48 188 130 237 246c5 10 9 15 14 15s10 -5 14 -16c50 -117 134 -200 251 -251c6 -3 9 -10 9 -21c0 -13 -4 -19 -11 -19\nc-3 0 -11 3 -25 9s-32 16 -56 30s-45 30 -65 47zM347 590v-680c30 -31 56 -66 77 -105c21 39 47 74 77 105v680c-30 31 -56 66 -77 105c-21 -39 -47 -74 -77 -105z"
            },
            "⇚": {
                x: 1166,
                d: "M981 230h-738c54 -37 105 -85 154 -144c4 -5 7 -7 10 -8s9 -2 18 -2h555c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-547c31 -51 55 -100 72 -147h-47c-56 158 -159 278 -309 361c150 82 253 202 309 361h47c-15 -44 -39 -93 -72 -147h547h17s8 -3 12 -6\ns6 -8 6 -14c0 -13 -12 -20 -36 -20h-555c-9 0 -15 -1 -18 -2s-6 -4 -10 -9c-50 -60 -101 -108 -154 -143h738h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-7 -6 -11 -6h-18z"
            },
            "⇛": {
                x: 1166,
                d: "M741 424h-556h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s7 6 11 6h18h547c-31 51 -55 100 -72 147h47c56 -158 159 -278 309 -361c-150 -82 -253 -202 -309 -361h-47c15 44 39 93 72 147h-547h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s7 6 11 6h18h556c9 0 15 1 18 2s6 4 10 9\nc50 60 101 108 154 143h-738h-19s-6 3 -10 6s-6 8 -6 14c0 9 3 15 8 17s14 3 27 3h738c-54 37 -105 85 -154 144c-4 5 -7 7 -10 8s-9 2 -18 2z"
            },
            "⇝": {
                x: 1187,
                d: "M284 342l164 -148c6 5 23 20 50 45s54 47 78 69s36 33 37 34c9 7 15 11 20 11c6 0 15 -5 27 -16c5 -4 29 -26 73 -67h224c-45 40 -78 89 -101 147h31c25 -71 75 -126 150 -167c-73 -39 -123 -94 -150 -167h-31c23 58 56 107 101 147h-216c-15 0 -27 3 -34 10l-74 66\nl-75 -68l-79 -71c-15 -13 -25 -20 -31 -20s-14 5 -23 14c-1 1 -4 4 -8 7s-8 7 -11 10s-5 4 -6 4l-137 124c-10 -9 -23 -20 -38 -34s-25 -22 -30 -26c-11 -11 -20 -16 -25 -16s-10 2 -14 6s-6 9 -6 14c0 6 5 14 16 24l68 60c13 13 23 19 29 19s13 -4 21 -11z"
            },
            "∈": {
                x: 800,
                d: "M615 230h-424c6 -67 34 -122 85 -165s112 -65 183 -65h156h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-158c-85 0 -157 28 -217 85s-90 125 -90 205s30 148 90 205s132 85 217 85h158h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-156\nc-71 0 -132 -22 -183 -65s-79 -98 -85 -165h424h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "∋": {
                x: 800,
                d: "M341 500h-156h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h158c85 0 157 -28 217 -85s90 -125 90 -205s-30 -148 -90 -205s-132 -85 -217 -85h-158h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h156c71 0 132 22 183 65s79 98 85 165h-424h-17s-8 3 -12 6\ns-6 8 -6 14s2 11 6 14s8 6 12 6h17h424c-6 67 -34 122 -85 165s-112 65 -183 65z"
            },
            "∍": {
                x: 629,
                d: "M385 174h-162c-10 0 -18 1 -23 2s-7 5 -7 12c0 11 11 17 34 17h166c7 33 11 61 11 84c0 47 -11 80 -34 101c-22 20 -47 30 -74 30c-33 0 -69 -13 -108 -39c-3 -3 -6 -4 -10 -4c-7 0 -10 5 -10 14c0 4 6 10 18 18s29 16 51 23c20 7 40 10 61 10c53 0 96 -18 130 -53\ns51 -80 51 -136c0 -73 -27 -133 -81 -181s-115 -72 -183 -72h-35c-11 0 -19 1 -24 2c-4 1 -6 5 -6 12s3 12 8 14s14 3 25 3h30c45 0 82 13 111 39c29 25 49 60 61 104z"
            },
            "∐": {
                x: 979,
                d: "M726 605v-527c0 -21 3 -35 10 -40s27 -7 62 -7c10 0 17 -1 20 -1s6 -2 8 -4s3 -6 3 -11c0 -7 -2 -12 -5 -13s-11 -2 -23 -2h-623c-11 0 -18 1 -22 2s-6 6 -6 13s2 11 5 13s10 3 21 3c37 0 59 2 66 7s11 19 11 40v527c0 21 -3 34 -10 39s-27 8 -62 8h-20s-6 2 -8 4\ns-3 7 -3 12c0 10 6 15 17 15c7 0 17 0 32 -1s25 -1 32 -1s17 -1 32 -1h32c9 0 31 1 64 2s55 1 64 1c11 0 17 -5 17 -15c0 -7 -2 -12 -5 -14s-10 -2 -21 -2c-37 0 -59 -3 -66 -8s-11 -18 -11 -39v-574h305v574c0 21 -3 34 -10 39s-27 8 -62 8h-20s-6 2 -8 4s-3 7 -3 12\nc0 10 6 15 17 15c7 0 18 0 32 -1s25 -1 32 -1s18 -1 32 -1h32c9 0 31 1 64 2s55 1 64 1c11 0 17 -5 17 -15c0 -7 -2 -12 -5 -14s-10 -2 -21 -2c-37 0 -60 -3 -67 -8s-10 -18 -10 -39z"
            },
            "∓": {
                x: 967,
                d: "M504 147v-276c0 -25 -7 -37 -20 -37s-20 11 -20 34v279h-279c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h279v273h-279h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h597h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-278\nv-273h278c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-278z"
            },
            "∔": {
                x: 966,
                d: "M503 230v-289c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 17v289h-278h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h278v289c0 7 1 13 1 17s2 8 5 12s8 6 14 6s11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-289h278h17s8 -3 12 -6\ns6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-278zM533 716c0 -14 -5 -26 -15 -36s-22 -14 -35 -14s-25 5 -35 14s-15 21 -15 36c0 14 5 26 15 36s21 14 35 14s25 -4 35 -14s15 -22 15 -36z"
            },
            "∝": {
                x: 966,
                d: "M816 32v-39c-12 -3 -24 -4 -37 -4c-49 0 -96 19 -141 58c-17 14 -32 27 -42 41s-26 38 -49 73c-8 -16 -18 -33 -29 -49s-25 -34 -44 -54s-41 -37 -68 -50s-55 -19 -84 -19c-52 0 -94 23 -125 68s-47 98 -47 158c0 61 16 114 48 159s74 68 127 68c49 0 96 -19 141 -58\nc17 -14 32 -28 42 -42s26 -37 49 -72c8 16 18 32 29 48s25 36 44 56s41 36 68 49s55 19 84 19c13 0 24 -1 31 -3c2 -2 3 -12 3 -29c-7 2 -16 3 -27 3c-23 0 -44 -4 -65 -13s-40 -21 -54 -34s-28 -28 -41 -46s-24 -33 -31 -46s-13 -26 -19 -39c29 -44 45 -69 48 -75\nc16 -24 29 -44 41 -59s30 -31 54 -47s47 -24 71 -24c1 0 4 0 11 1s11 1 12 1zM525 196c-29 44 -45 69 -48 75c-16 24 -29 44 -41 59s-30 31 -54 47s-47 24 -71 24c-41 0 -74 -18 -100 -55s-39 -80 -39 -131s13 -97 38 -137s60 -60 105 -60c23 0 44 5 65 14s40 19 54 32\ns28 28 41 46s24 33 31 46s13 27 19 40z"
            },
            "∣": {
                x: 340,
                d: "M190 714v-928v-18s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v18v928v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "∤": {
                x: 617,
                d: "M453 478l-124 -111v-582c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 17v545l-89 -80c-13 -13 -23 -20 -30 -20c-5 0 -10 2 -14 6s-6 9 -6 14s5 13 15 22l124 112v331c0 7 1 13 1 17s2 8 5 12s8 6 14 6s11 -2 14 -6s5 -8 5 -12\ns1 -10 1 -17v-294l89 79c13 13 23 20 29 20c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -5 -13 -14 -22z"
            },
            "∥": {
                x: 535,
                d: "M190 716v-932c0 -23 -7 -34 -20 -34s-20 12 -20 37v926c0 25 7 37 20 37s20 -11 20 -34zM385 713v-926c0 -25 -7 -37 -20 -37s-20 11 -20 34v932c0 23 7 34 20 34s20 -12 20 -37z"
            },
            "∦": {
                x: 839,
                d: "M675 478l-138 -138v-552c0 -25 -7 -38 -20 -38c-6 0 -11 2 -14 6s-5 7 -5 11s-1 10 -1 17v516l-155 -157v-359v-17s-3 -7 -6 -11s-8 -6 -14 -6c-13 0 -20 13 -20 38v315l-104 -103c-13 -13 -23 -20 -28 -20s-10 2 -14 6s-6 9 -6 14c0 6 5 14 14 23l138 137v552\nc0 25 7 38 20 38c6 0 11 -2 14 -6s6 -7 6 -11v-17v-516l155 157v359c0 7 1 13 1 17s2 7 5 11s8 6 14 6c13 0 20 -13 20 -38v-315l100 100c16 15 27 23 32 23s10 -2 14 -6s6 -9 6 -14s-5 -13 -14 -22z"
            },
            "∧": {
                x: 856,
                d: "M451 577l249 -563c4 -8 6 -13 6 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-9 0 -17 7 -23 21l-235 530l-235 -530c-6 -14 -14 -21 -23 -21c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 2 10 7 20l249 559c3 8 6 14 9 17s7 4 13 4c9 0 16 -7 23 -21z"
            },
            "∨": {
                x: 856,
                d: "M699 558l-249 -559c-3 -8 -6 -14 -9 -17s-7 -4 -13 -4c-9 0 -16 7 -23 21l-249 563c-4 8 -6 13 -6 16c0 5 2 10 6 14s9 6 14 6c9 0 17 -7 23 -21l235 -530l235 529c7 15 14 22 23 22c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -2 -10 -7 -20z"
            },
            "∩": {
                x: 856,
                d: "M706 380v-366v-18s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v18v361c0 61 -26 107 -77 140c-45 29 -98 43 -161 43c-22 0 -46 -3 -70 -8s-49 -14 -76 -26s-49 -30 -66 -56s-26 -57 -26 -92v-362v-18s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v18v367\nc0 47 15 87 44 121s63 59 104 74s85 22 130 22c33 0 64 -4 96 -13s62 -22 90 -39s49 -39 66 -68s26 -62 26 -98z"
            },
            "∪": {
                x: 856,
                d: "M706 562v-367c0 -47 -15 -87 -44 -121s-63 -59 -104 -74s-85 -22 -130 -22c-33 0 -64 4 -96 13s-62 22 -90 39s-49 39 -66 68s-26 62 -26 98v366v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18v-361c0 -61 26 -107 77 -140c45 -29 98 -43 161 -43c22 0 46 3 70 8\ns49 14 76 26s49 30 66 56s26 57 26 92v362v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "∴": {
                x: 906,
                d: "M506 411c0 -15 -5 -27 -16 -37s-23 -16 -37 -16c-15 0 -27 6 -37 16s-16 22 -16 37s6 27 16 37s22 16 37 16s27 -6 37 -16s16 -22 16 -37zM756 -22c0 -15 -6 -28 -16 -38s-22 -15 -37 -15s-27 5 -37 15s-16 23 -16 38s6 28 16 38s22 15 37 15s27 -5 37 -15s16 -23 16 -38\nzM256 -22c0 -15 -6 -28 -16 -38s-22 -15 -37 -15s-27 5 -37 15s-16 23 -16 38s6 28 16 38s22 15 37 15s27 -5 37 -15s16 -23 16 -38z"
            },
            "∵": {
                x: 906,
                d: "M256 411c0 -15 -5 -27 -16 -37s-23 -16 -37 -16c-15 0 -27 6 -37 16s-16 22 -16 37s6 27 16 37s22 16 37 16s27 -6 37 -16s16 -22 16 -37zM506 -22c0 -15 -6 -28 -16 -38s-22 -15 -37 -15s-27 5 -37 15s-16 23 -16 38s6 28 16 38s22 15 37 15s27 -5 37 -15s16 -23 16 -38\nzM756 411c0 -15 -5 -27 -16 -37s-23 -16 -37 -16c-15 0 -27 6 -37 16s-16 22 -16 37s6 27 16 37s22 16 37 16s27 -6 37 -16s16 -22 16 -37z"
            },
            "∼": {
                x: 967,
                d: "M817 334c0 -51 -15 -97 -46 -138c-31 -42 -72 -63 -122 -63c-21 0 -43 5 -65 15c-23 11 -41 21 -53 31c-23 19 -41 35 -53 46c-28 24 -45 38 -51 43c-11 9 -28 18 -49 28s-41 15 -60 15c-35 0 -67 -13 -95 -39s-43 -64 -45 -115c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9\nc-9 0 -14 11 -14 32c0 51 15 97 46 138c31 42 71 63 122 63c21 0 43 -5 65 -15c23 -11 41 -21 53 -31c23 -19 41 -35 53 -46c28 -24 45 -38 51 -43c11 -9 28 -18 49 -28s41 -15 60 -15c37 0 69 14 96 41s42 64 44 110c1 17 6 26 14 26c9 0 14 -11 14 -32z"
            },
            "∽": {
                x: 966,
                d: "M816 166c0 -21 -5 -32 -14 -32c-7 0 -12 11 -14 33c-3 43 -18 77 -44 103c-27 27 -59 41 -94 41c-19 0 -39 -5 -60 -14c-22 -10 -39 -20 -50 -29c-21 -17 -38 -32 -51 -44c-17 -15 -36 -31 -55 -46c-13 -9 -30 -19 -53 -30c-22 -10 -44 -15 -65 -15c-49 0 -89 21 -120 62\ns-46 87 -46 139c0 21 5 32 14 32c8 0 13 -11 14 -33c3 -40 17 -74 44 -103c25 -27 57 -41 94 -41c19 0 39 5 60 14c22 10 39 20 50 29c21 17 38 32 51 44c17 15 36 31 55 46c13 9 30 19 53 30c22 10 44 15 65 15c49 0 89 -21 120 -62s46 -87 46 -139z"
            },
            "≀": {
                x: 467,
                d: "M316 -69c0 -9 -10 -14 -29 -14c-43 0 -77 17 -101 51s-36 74 -36 121c0 19 3 39 9 59c7 23 14 41 19 52c11 23 22 43 32 60c34 62 51 112 51 151c0 34 -8 66 -23 97c-15 29 -35 45 -60 47c-18 2 -27 7 -27 14c0 9 10 14 30 14c43 0 77 -17 101 -51c23 -33 35 -74 35 -121\nc0 -19 -3 -39 -9 -59c-7 -23 -13 -41 -19 -52c-11 -23 -22 -43 -32 -60c-34 -62 -51 -112 -51 -151c0 -35 7 -67 21 -95c17 -32 40 -48 68 -49c14 -2 21 -7 21 -14z"
            },
            "≁": {
                x: 965,
                d: "M478 214l-140 -167c-8 -10 -15 -15 -22 -15c-5 0 -10 2 -14 6s-6 9 -6 14s4 13 12 22l138 165c-47 35 -90 53 -129 53c-37 0 -69 -13 -96 -38c-25 -24 -38 -54 -39 -90c-2 -20 -7 -30 -16 -30c-11 0 -16 13 -16 40c0 52 16 97 47 136c31 38 71 57 120 57\nc21 0 42 -4 63 -13c19 -8 36 -17 52 -28c23 -15 41 -29 55 -40l140 167c9 10 16 15 22 15s11 -2 15 -6c3 -3 5 -8 5 -14c0 -5 -4 -13 -12 -22l-138 -165c47 -35 90 -53 129 -53c37 0 69 13 96 38c25 24 38 54 39 90c1 20 6 30 16 30c11 0 16 -13 16 -40\nc0 -52 -16 -97 -47 -136c-31 -38 -71 -57 -120 -57c-20 0 -41 4 -62 13s-38 18 -53 28c-23 15 -41 29 -55 40z"
            },
            "≂": {
                x: 965,
                d: "M780 424h-595h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 7 2 11 6 14c5 4 9 6 12 6h17h595h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17zM815 226c0 -49 -16 -93 -47 -132s-71 -58 -120 -58c-20 0 -41 5 -64 14c-17 7 -34 17 -51 28\nc-15 11 -32 23 -49 38c-13 11 -33 26 -58 46c-9 7 -26 16 -50 27c-19 9 -39 13 -59 13c-33 0 -64 -12 -93 -36s-44 -59 -46 -106c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32c0 49 15 92 46 131s71 58 121 58c19 0 40 -5 63 -14c19 -8 36 -17 52 -28\nc15 -11 32 -23 49 -38c13 -11 33 -26 58 -46c9 -7 26 -16 50 -27c19 -9 39 -13 59 -13c32 0 63 12 92 36s45 59 47 106c0 3 1 8 3 14s6 9 11 9c9 0 14 -10 14 -31z"
            },
            "≃": {
                x: 967,
                d: "M817 432c0 -50 -16 -93 -47 -128c-32 -36 -72 -54 -120 -54c-20 0 -41 5 -64 14s-41 19 -54 28c-20 14 -38 28 -55 41c-20 16 -38 29 -53 39c-11 7 -27 15 -50 24c-20 8 -39 12 -57 12c-21 0 -40 -4 -59 -12c-20 -9 -38 -23 -54 -44c-17 -21 -25 -47 -26 -78\nc0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 10 -14 31c0 49 16 92 48 128s72 54 119 54c20 0 41 -5 64 -14s41 -19 54 -28c20 -14 38 -28 55 -41c22 -18 39 -31 52 -39c11 -7 27 -15 50 -24c20 -8 39 -12 58 -12c35 0 66 12 94 36s43 55 45 94c1 18 5 27 14 27\ns14 -10 14 -31zM186 76h595c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-597h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20z"
            },
            "≅": {
                x: 965,
                d: "M815 305c0 -33 -6 -64 -19 -93c-13 -30 -32 -55 -58 -76c-25 -21 -55 -31 -89 -31c-18 0 -34 2 -48 7c-17 6 -33 14 -47 23c-18 12 -31 22 -40 29c-10 8 -24 20 -42 36s-34 29 -48 40s-30 20 -48 28c-21 9 -41 14 -60 14c-15 0 -29 -3 -44 -8c-14 -5 -28 -13 -42 -24\nc-15 -12 -27 -28 -36 -48c-10 -23 -15 -47 -16 -73c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8c-9 0 -14 11 -14 32c0 33 6 64 19 94c13 31 33 57 58 78s55 31 89 31h6c15 0 29 -2 42 -6c19 -6 35 -14 48 -23c8 -6 21 -16 38 -29c11 -8 25 -20 43 -37l3 -2l4 -4\nc12 -11 27 -24 46 -39c11 -9 27 -18 46 -27s38 -13 57 -13c37 0 68 14 95 41s41 62 43 105c0 20 5 30 14 30s14 -11 14 -32zM753 -174h-541h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z\nM753 20h-541h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "≇": {
                x: 965,
                d: "M477 201l-88 -154h389c3 0 6 -1 10 -1h8c3 0 7 -2 12 -5s7 -8 7 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-414l-80 -140c-9 -16 -18 -24 -25 -24c-6 0 -11 2 -15 6c-3 3 -5 8 -5 14c0 2 2 8 6 17c5 7 29 50 73 127h-135c-3 0 -5 1 -9 1h-8\nc-3 0 -7 2 -12 5c-4 3 -6 7 -6 14c0 6 2 11 6 14c5 3 9 5 13 5h7s8 1 11 1h156l88 154h-246c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 13 5h7s8 1 11 1h267l98 172c-15 8 -28 15 -38 21c-19 12 -32 20 -37 24c-7 5 -19 13 -35 22\nc-47 30 -88 45 -125 45c-19 0 -38 -4 -58 -11c-19 -7 -37 -20 -54 -37c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116c33 31 72 47 119 47c18 0 39 -4 63 -13s42 -17 55 -24c7 -4 26 -16 57 -37c47 -32 75 -48 85 -48c1 0 4 4 9 12l96 167\nc7 13 14 19 22 19c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -3 -9 -8 -20l-98 -171c9 -2 20 -3 31 -3c36 0 67 10 94 31s42 48 44 79c1 18 5 27 14 27s14 -10 14 -31c0 -43 -16 -81 -47 -114c-31 -32 -70 -48 -119 -48c-22 0 -42 3 -60 10l-89 -156h278c3 0 6 -1 10 -1h8\nc3 0 7 -2 12 -5s7 -8 7 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-303z"
            },
            "≈": {
                x: 967,
                d: "M817 452c0 -46 -16 -85 -49 -116s-72 -47 -118 -47c-21 0 -42 4 -64 12c-23 8 -40 16 -53 24c-17 11 -36 23 -56 36c-29 20 -58 36 -85 49c-25 11 -50 17 -75 17c-19 0 -38 -4 -58 -11c-19 -7 -37 -20 -54 -37c-17 -18 -26 -40 -27 -66c0 -4 -1 -9 -4 -14\nc-3 -6 -6 -9 -10 -9c-9 0 -14 10 -14 30c0 47 16 85 48 116c33 31 72 47 119 47c20 0 41 -4 63 -12c25 -9 43 -17 54 -24c17 -11 36 -23 56 -36c31 -21 59 -37 84 -49c25 -11 50 -17 76 -17c34 0 65 10 94 31c28 20 43 46 45 79c1 18 5 27 14 27s14 -10 14 -30zM817 218\nc0 -44 -16 -82 -48 -114s-72 -48 -119 -48c-21 0 -42 4 -64 12c-23 8 -40 16 -53 24c-17 11 -36 23 -56 36c-32 22 -60 39 -85 50c-23 11 -48 16 -75 16c-21 0 -40 -3 -58 -10c-19 -7 -37 -19 -54 -38c-17 -18 -26 -40 -27 -66c0 -4 -1 -9 -4 -14c-3 -6 -6 -9 -10 -9\nc-9 0 -14 10 -14 30c0 46 16 85 48 116c33 31 72 47 119 47c20 0 41 -4 63 -12c25 -9 43 -17 54 -24c17 -11 36 -23 56 -36c33 -23 61 -39 84 -50s49 -16 76 -16c35 0 66 10 94 30s43 47 45 80c1 18 5 27 14 27s14 -10 14 -31z"
            },
            "≊": {
                x: 977,
                d: "M821 549c0 -46 -16 -85 -49 -116s-72 -47 -117 -47c-21 0 -41 4 -62 12c-27 10 -43 17 -50 21c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-20 0 -39 -3 -57 -10c-19 -7 -37 -19 -54 -38c-17 -18 -26 -40 -27 -66\nc0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116c33 31 72 47 118 47c21 0 41 -4 62 -12c27 -10 43 -17 50 -21c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c34 0 65 10 93 30s43 47 45 80c2 18 7 27 14 27\nc9 0 14 -10 14 -30zM186 7h605c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-607c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM821 315c0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-22 0 -43 4 -62 11\nc-23 9 -40 16 -50 22c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11s-37 -4 -57 -11c-19 -7 -37 -20 -54 -37c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116c33 31 72 47 118 47c22 0 43 -4 62 -11\nc23 -9 40 -16 50 -22c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c35 0 66 10 93 31s42 46 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "≍": {
                x: 967,
                d: "M817 464c0 -5 -2 -10 -5 -13l-35 -28c-99 -71 -197 -107 -294 -107c-59 0 -119 14 -181 41c-23 11 -39 18 -46 23c-7 4 -20 13 -40 26c-2 1 -7 5 -15 10s-14 8 -17 11c-12 9 -19 15 -21 17l-8 6c-3 5 -5 9 -5 14s2 10 6 14s9 6 14 6c4 0 11 -4 22 -13\nc99 -77 196 -115 292 -115s192 37 287 112c11 11 20 16 26 16s11 -2 15 -6c3 -3 5 -8 5 -14zM817 36c0 -6 -2 -11 -5 -14c-4 -4 -9 -6 -15 -6c-4 0 -11 4 -22 13c-99 77 -197 115 -292 115c-96 0 -192 -37 -287 -112c-11 -11 -20 -16 -26 -16c-5 0 -10 2 -14 6s-6 9 -6 14\ns2 10 5 13l35 28c99 71 197 107 294 107c59 0 119 -14 181 -41c23 -11 38 -18 46 -23c13 -8 27 -17 41 -26s24 -16 30 -21c2 -2 5 -5 8 -7s6 -4 8 -6s5 -3 6 -4l8 -6c3 -5 5 -9 5 -14z"
            },
            "≎": {
                x: 965,
                d: "M626 367h154c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-156c-16 0 -26 2 -29 5c-4 4 -6 13 -7 26c-1 23 -11 44 -31 64s-45 30 -74 30c-27 0 -51 -10 -72 -29s-31 -41 -32 -66c-1 -13 -3 -22 -8 -25\ns-14 -5 -28 -5h-156c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h154c6 39 23 70 51 92s59 33 93 33c33 0 64 -11 91 -32c27 -22 45 -53 52 -93zM623 173h156c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7\ns-7 -1 -10 -1h-154c-6 -39 -23 -70 -51 -92s-59 -33 -93 -33c-33 0 -64 11 -91 32c-27 22 -45 53 -52 93h-154c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h156c16 0 26 -2 29 -5c4 -4 6 -13 7 -26c1 -22 11 -43 32 -64c20 -20 44 -30 73 -30\nc27 0 51 10 72 29s31 41 32 66c1 14 3 22 7 25c5 3 14 5 29 5z"
            },
            "≏": {
                x: 965,
                d: "M626 367h154c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-156c-16 0 -26 2 -29 5c-4 4 -6 13 -7 26c-1 23 -11 44 -31 64s-45 30 -74 30c-27 0 -51 -10 -72 -29s-31 -41 -32 -66c-1 -13 -3 -22 -8 -25\ns-14 -5 -28 -5h-156c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h154c6 39 23 70 51 92s59 33 93 33c33 0 64 -11 91 -32c27 -22 45 -53 52 -93zM186 173h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7\ns-7 -1 -10 -1h-595c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20z"
            },
            "≐": {
                x: 965,
                d: "M537 541c0 -16 -6 -29 -17 -39c-12 -11 -25 -16 -38 -16s-26 5 -37 15s-17 23 -17 40c0 16 5 29 16 39c12 11 25 16 39 16s26 -5 37 -15s17 -23 17 -40zM186 173h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1\nh-595c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM185 367h595c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "≑": {
                x: 965,
                d: "M537 541c0 -16 -6 -29 -17 -39c-12 -11 -25 -16 -38 -16s-26 5 -37 15s-17 23 -17 40c0 16 5 29 16 39c12 11 25 16 39 16s26 -5 37 -15s17 -23 17 -40zM537 -41c0 -17 -6 -30 -17 -40s-23 -15 -37 -15s-27 5 -39 16c-11 10 -16 23 -16 39s5 29 16 39c12 11 25 16 39 16\ns26 -5 37 -15s17 -23 17 -40zM186 173h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-595c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM185 367h595c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5\nc4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "≒": {
                x: 1031,
                d: "M256 541c0 -14 -5 -26 -16 -37s-23 -16 -37 -16s-26 5 -37 16s-16 23 -16 37s5 26 16 37s23 16 37 16s26 -5 37 -16s16 -23 16 -37zM881 -41c0 -15 -5 -27 -15 -37c-11 -11 -23 -16 -38 -16s-27 5 -38 16c-10 10 -15 22 -15 37s5 27 15 37c11 11 23 16 38 16\ns27 -5 38 -16c10 -10 15 -22 15 -37zM219 173h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-8s-6 -1 -9 -1h-595c-3 0 -6 1 -10 1h-7c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM218 367h595c3 0 5 -1 9 -1h8\nc3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h7s7 1 10 1z"
            },
            "≓": {
                x: 1031,
                d: "M881 541c0 -15 -5 -27 -15 -37c-11 -11 -23 -16 -38 -16s-27 5 -38 16c-10 10 -15 22 -15 37s5 27 15 37c11 11 23 16 38 16s27 -5 38 -16c10 -10 15 -22 15 -37zM256 -41c0 -14 -5 -26 -16 -37s-23 -16 -37 -16s-26 5 -37 16s-16 23 -16 37s5 26 16 37s23 16 37 16\ns26 -5 37 -16s16 -23 16 -37zM813 133h-595c-3 0 -6 1 -10 1h-7c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-8s-6 -1 -9 -1zM812 327h-593c-24 0 -36 7 -36 20\nc0 6 2 11 6 14c5 3 9 5 12 5h7s7 1 10 1h595c3 0 5 -1 9 -1h8c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1z"
            },
            "≖": {
                x: 965,
                d: "M559 173h220c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-595c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h220c-21 21 -32 47 -32 77c0 26 11 52 32 77h-220c-24 0 -36 7 -36 20\nc0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h595c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-220c21 -21 32 -47 32 -77c0 -26 -11 -52 -32 -77zM502 327h-39c-9 0 -14 0 -17 -1c-5 -1 -9 -3 -14 -6\ns-11 -8 -18 -17c-11 -15 -17 -33 -17 -53c0 -21 6 -39 19 -54c9 -11 17 -18 22 -20c6 -2 14 -3 25 -3h39c9 0 15 0 18 1s8 3 13 6s11 8 18 17c11 15 17 33 17 53c0 21 -6 39 -19 54c-9 11 -17 18 -22 20c-6 2 -14 3 -25 3z"
            },
            "≗": {
                x: 965,
                d: "M592 611c0 -29 -11 -54 -32 -77c-21 -21 -47 -32 -78 -32s-56 11 -77 32c-21 23 -32 48 -32 77c0 31 11 57 33 78c23 21 48 32 77 32s55 -10 76 -31c22 -21 33 -48 33 -79zM483 542c25 0 42 5 53 16s16 28 16 53c0 24 -5 42 -15 53s-28 17 -55 17s-46 -6 -55 -17\ns-14 -29 -14 -53c0 -26 6 -44 17 -54s28 -15 53 -15zM186 173h593c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-595c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM185 367h595\nc3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "≜": {
                x: 966,
                d: "M505 842l192 -334c0 -12 -2 -19 -7 -22s-14 -4 -29 -4h-356h-18c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 5 3 12 8 21l184 319c7 11 15 17 22 17s15 -6 22 -17zM483 799l-160 -277h320zM186 173h594c3 0 6 -1 10 -1h8c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14\nc-5 -3 -9 -5 -12 -5h-8s-6 -1 -9 -1h-596c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20zM185 367h596c3 0 5 -1 9 -1h8c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-8s-7 -1 -10 -1h-594c-24 0 -36 7 -36 20\nc0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "≡": {
                x: 967,
                d: "M781 424h-595c-24 0 -36 7 -36 20c0 7 2 11 6 14c5 4 9 6 12 6h17h597h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14c0 -13 -12 -20 -36 -20zM782 36h-597h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h595c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6\nh-17zM782 230h-597h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 7 2 11 6 14c5 4 9 6 12 6h17h597h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "≤": {
                x: 941,
                d: "M742 594l-525 -248l523 -246c14 -7 21 -14 21 -23c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c6 0 11 -2 15 -6c3 -3 5 -8 5 -14c0 -9 -6 -16 -19 -22zM726 -137h-541c-3 0 -5 1 -9 1h-8\nc-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1z"
            },
            "≥": {
                x: 941,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 21 23l523 247l-525 247c-13 6 -19 13 -19 22c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22zM726 -137h-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5\nc-4 3 -6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1z"
            },
            "≦": {
                x: 941,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM726 -174h-541h-17c-3 0 -7 2 -12 6\nc-4 3 -6 7 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17zM726 20h-541h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "≧": {
                x: 941,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -7 20 -15 20 -23c0 -9 -7 -16 -20 -22zM726 -174h-541h-17\nc-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17zM726 20h-541h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "≨": {
                x: 941,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM557 20l-147 -154h315c24 0 36 -7 36 -20\nc0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-355c-34 -37 -61 -65 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c3 3 5 5 7 8s4 5 7 8c22 25 38 41 47 49h-131h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h168l147 154h-316h-17\nc-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h354c34 37 61 65 80 84c13 12 22 18 26 18c5 0 10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18l-2 -3l-5 -5l-5 -5l-2 -3c-22 -25 -38 -41 -47 -49h130c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-169z"
            },
            "≩": {
                x: 941,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -7 20 -15 20 -23c0 -9 -7 -16 -20 -22zM557 20l-147 -154h315\nc24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-355c-34 -37 -61 -65 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c3 3 5 5 7 8s4 5 7 8c22 25 38 41 47 49h-131h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h168\nl147 154h-316h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h354c34 37 61 65 80 84c13 12 22 18 26 18c5 0 10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18l-2 -3l-5 -5l-5 -5l-2 -3c-22 -25 -38 -41 -47 -49h130c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14\nc-5 -4 -9 -6 -12 -6h-17h-169z"
            },
            "≪": {
                x: 1189,
                d: "M714 524l-502 -274l502 -274c13 -8 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -12 2 -19 7l-526 287c-11 7 -17 13 -18 16c-1 1 -1 3 -1 6c0 7 5 14 16 20l1 1s1 1 2 1l527 288c8 4 14 6 18 6c5 0 9 -2 14 -5c4 -3 6 -8 6 -15s-7 -14 -20 -22zM1019 524l-502 -274\nl502 -274c13 -8 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -12 2 -19 7l-526 287c-11 7 -17 13 -18 16c-1 1 -1 3 -1 6c0 7 5 14 16 20c1 0 1 0 1 1l2 1l527 288c8 4 14 6 18 6c5 0 9 -2 14 -5c4 -3 6 -8 6 -15s-7 -14 -20 -22z"
            },
            "≫": {
                x: 1189,
                d: "M715 228l-539 -294c-17 0 -26 7 -26 20c0 7 7 14 20 22l502 274l-502 274c-13 8 -20 15 -20 22s2 12 6 15c5 3 9 5 14 5c4 0 10 -2 18 -6l527 -288c11 -7 17 -13 18 -16c1 -1 1 -3 1 -6c0 -7 -5 -14 -16 -20l-1 -1s-1 -1 -2 -1zM1020 228l-539 -294c-17 0 -26 7 -26 20\nc0 7 7 14 20 22l502 274l-502 274c-13 8 -20 15 -20 22s2 12 6 15c5 3 9 5 14 5c4 0 10 -2 18 -6l527 -288c11 -7 17 -13 18 -16c1 -1 1 -3 1 -6c0 -7 -5 -14 -16 -20c-1 0 -1 0 -1 -1z"
            },
            "≬": {
                x: 651,
                d: "M346 -129c33 -35 73 -66 118 -93c9 -5 14 -10 14 -15c0 -9 -4 -13 -12 -13c-3 0 -12 4 -26 12c-13 7 -31 20 -53 37c-26 20 -47 37 -62 52c-18 -18 -38 -35 -60 -51c-31 -22 -49 -35 -54 -38c-14 -8 -23 -12 -26 -12c-8 0 -12 4 -12 13c0 4 4 9 12 14c47 28 87 59 120 94\nc-15 19 -30 37 -44 55c-11 15 -27 39 -48 74c-21 34 -36 72 -47 114s-16 87 -16 136s5 94 16 136s26 80 47 114c21 35 37 59 48 74c14 19 29 37 44 55c-33 35 -73 66 -118 93c-9 5 -14 10 -14 15c0 9 4 13 12 13c3 0 11 -4 25 -12c15 -9 33 -21 54 -37c26 -20 47 -37 62 -52\nc18 18 38 35 60 51c31 22 49 35 54 38c14 8 23 12 26 12c8 0 12 -4 12 -13c0 -5 -4 -9 -12 -14c-47 -28 -87 -59 -120 -94c15 -18 30 -36 44 -55c11 -15 27 -39 48 -74c19 -32 35 -70 46 -114s17 -89 17 -136s-6 -92 -17 -136s-27 -82 -46 -114c-21 -35 -37 -59 -48 -74\nc-14 -18 -29 -36 -44 -55zM326 -107c18 21 36 46 54 74c15 25 32 65 50 120c17 54 26 108 26 163c0 45 -5 88 -15 130s-23 78 -39 108c-19 35 -32 59 -41 72c-13 19 -25 35 -36 47c-18 -21 -36 -46 -54 -74c-17 -27 -34 -67 -51 -120c-17 -52 -25 -106 -25 -163\nc0 -45 5 -88 15 -130c11 -44 23 -80 38 -108c16 -30 30 -54 42 -72c13 -19 25 -35 36 -47z"
            },
            "≮": {
                x: 941,
                d: "M560 412l-132 -261c4 -2 10 -5 19 -9s21 -10 37 -18s31 -14 44 -21c21 -10 49 -23 85 -40s57 -26 63 -29c47 -22 72 -34 75 -36c7 -7 10 -12 10 -17c0 -7 -2 -12 -7 -15s-9 -5 -13 -5c-3 0 -12 3 -25 9l-36 17l-271 128c-100 -201 -154 -305 -161 -314\nc-3 -5 -7 -7 -14 -7c-5 0 -10 2 -14 6s-6 9 -6 14s5 16 14 33l145 285l-203 96c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21s6 15 19 22l362 170l125 245c7 13 14 19 21 19c5 0 10 -2 14 -6s6 -9 6 -14c0 -4 -3 -11 -8 -20l-99 -196l135 64c9 3 14 5 16 5c4 0 8 -2 13 -5\ns7 -8 7 -15c0 -9 -7 -16 -20 -22zM502 384l-285 -134l174 -82z"
            },
            "≯": {
                x: 941,
                d: "M742 228l-362 -171l-123 -241c-5 -9 -9 -15 -12 -18s-6 -4 -11 -4s-10 2 -14 6s-6 9 -6 14c0 10 36 82 107 215l-81 -37l-36 -18c-18 -9 -29 -13 -34 -13s-10 2 -14 6s-6 8 -6 13c0 9 7 17 20 23l181 85l133 261l-314 148c-13 6 -20 14 -20 23c0 5 2 9 6 13s9 6 14 6\nc4 0 10 -2 18 -6l314 -148l154 302c7 13 14 19 21 19c5 0 10 -2 14 -6s6 -9 6 -14c0 -4 -3 -11 -8 -20l-151 -298l203 -96c1 0 1 0 2 -1c12 -6 18 -13 18 -21c0 -10 -6 -17 -19 -22zM520 332l-111 -216l285 134z"
            },
            "≰": {
                x: 941,
                d: "M452 191l-119 -288h393c3 0 6 -1 10 -1h8c3 0 7 -2 12 -5c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-408l-59 -142c-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-86c-25 0 -37 7 -37 20c0 6 2 11 6 14c5 3 8 5 11 5h8s7 1 10 1h104l128 305\nl-246 116c-14 7 -21 14 -21 23s7 16 21 23l389 183l102 244c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-77 -186l108 52c7 4 13 6 19 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -1 -10 -4 -12c-1 -1 -1 -1 -3 -2s-5 -2 -8 -4s-5 -3 -7 -4l-148 -71l-123 -295\nl271 -127c2 -1 4 -2 7 -3l3 -2c1 -1 3 -3 6 -5c2 -1 4 -3 5 -6c1 -1 1 -4 1 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -49 21 -137 63zM537 498l-320 -151l215 -102z"
            },
            "≱": {
                x: 941,
                d: "M451 188l-118 -285h393c3 0 6 -1 10 -1h8c3 0 7 -2 12 -5c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-408l-59 -142c-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-86c-25 0 -37 7 -37 20c0 6 2 11 6 14c5 3 8 5 11 5h8s7 1 10 1h104l109 260\nl-212 -100c-8 -4 -13 -6 -16 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l250 118l90 216l-338 160c-2 1 -4 2 -7 3l-6 3s-4 3 -7 6c-1 1 -2 5 -2 10s2 10 6 14s9 6 14 6s12 -2 21 -7l335 -158l136 326c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19\nl-129 -311l180 -84c13 -6 19 -13 19 -22c0 -5 -2 -10 -5 -13s-8 -6 -17 -10zM546 417l-72 -174l220 104z"
            },
            "≲": {
                x: 965,
                d: "M769 690l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM815 -26c0 -51 -15 -97 -46 -138\ns-71 -62 -120 -62c-21 0 -44 5 -67 16s-41 21 -54 31c-7 6 -26 22 -56 48c-22 20 -38 34 -48 41c-12 9 -28 18 -48 27c-21 9 -41 14 -60 14c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15c21 -9 39 -20 54 -32c14 -11 33 -27 57 -48c21 -19 37 -33 47 -40c14 -11 30 -20 48 -28c21 -9 41 -14 61 -14c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32z"
            },
            "≳": {
                x: 965,
                d: "M768 420l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -7 20 -15 20 -23c0 -9 -7 -16 -20 -22zM815 -26c0 -51 -15 -97 -46 -138\ns-71 -62 -120 -62c-21 0 -44 5 -67 16s-41 21 -54 31c-7 6 -26 22 -56 48c-22 20 -38 34 -48 41c-12 9 -28 18 -48 27c-21 9 -41 14 -60 14c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15c21 -9 39 -20 54 -32c14 -11 33 -27 57 -48c21 -19 37 -33 47 -40c14 -11 30 -20 48 -28c21 -9 41 -14 61 -14c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32z"
            },
            "≶": {
                x: 990,
                d: "M816 639l-589 -218l589 -217c2 -1 4 -1 6 -2c3 -2 3 -2 5 -3c1 -1 2 -1 3 -1c2 -1 4 -3 6 -6c3 -4 4 -7 4 -10c0 -5 -2 -10 -6 -14s-9 -6 -15 -6c-2 0 -8 2 -18 6l-631 232c-13 5 -20 13 -20 22s7 17 21 22l630 231c9 3 15 5 18 5c6 0 11 -2 15 -6s6 -8 6 -13\nc0 -3 -1 -7 -4 -11c-2 -3 -4 -5 -6 -6c-1 0 -3 -1 -6 -2s-5 -2 -8 -3zM762 9l-592 218c-13 5 -20 12 -20 21c0 13 6 20 19 20c3 0 10 -2 20 -6l627 -231c3 -1 5 -2 8 -3s5 -2 6 -2c2 -1 4 -3 6 -6c3 -4 4 -8 4 -11s-1 -7 -4 -11c-2 -3 -4 -5 -6 -6c-1 0 -3 -1 -6 -2\ns-5 -2 -8 -3l-632 -233c-6 -3 -11 -4 -15 -4c-5 0 -9 2 -13 6s-6 9 -6 14c0 10 7 17 21 22z"
            },
            "≷": {
                x: 941,
                d: "M739 399l-550 -231c-9 -4 -15 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 1 6 4 10s5 6 6 7c1 0 3 1 6 2s5 3 7 4l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM728 -246l-557 233\nc-14 6 -21 13 -21 22c0 5 2 10 5 13c2 2 8 5 19 10l547 230c9 4 15 6 20 6s10 -2 14 -6s6 -9 6 -14c0 -8 -7 -15 -22 -22l-517 -217l517 -217c15 -6 22 -14 22 -23c0 -5 -2 -9 -6 -13s-9 -6 -14 -6c-3 0 -7 1 -13 4z"
            },
            "≺": {
                x: 941,
                d: "M439 249c97 -19 172 -49 225 -90c27 -21 49 -47 65 -77c15 -29 25 -51 28 -66c3 -13 4 -24 4 -34c0 -15 -7 -22 -20 -22c-11 0 -18 7 -21 22c-2 15 -4 26 -6 35c-1 5 -7 19 -18 42c-9 19 -20 35 -34 49s-34 29 -60 44s-57 29 -94 40c-83 24 -186 36 -308 37\nc-16 0 -26 0 -30 1c-6 1 -11 3 -14 5c-4 3 -6 8 -6 14c0 13 10 20 29 20c165 1 292 20 383 57s143 98 157 184c3 19 11 29 22 29c5 0 10 -2 14 -6s6 -9 6 -16c0 -9 -2 -22 -7 -40c-5 -21 -12 -39 -20 -54c-48 -88 -146 -146 -295 -174z"
            },
            "≻": {
                x: 941,
                d: "M472 249c-56 11 -105 26 -146 45c-42 19 -73 39 -93 58s-38 41 -53 67c-8 13 -15 31 -22 53c-5 18 -8 33 -8 45c0 7 2 12 6 16s9 6 14 6c11 0 18 -8 21 -24c9 -53 30 -96 63 -129c77 -77 229 -116 457 -117c17 0 27 0 31 -1c6 -1 11 -3 14 -5c3 -3 5 -7 5 -14\nc0 -13 -10 -20 -29 -20c-145 -1 -256 -14 -335 -39c-35 -11 -66 -25 -91 -40c-28 -17 -48 -32 -59 -44c-14 -15 -25 -31 -33 -48c-9 -20 -15 -34 -17 -42c-1 -5 -1 -6 -3 -18c-2 -8 -3 -14 -4 -18c-1 -13 -8 -20 -20 -20c-13 0 -20 7 -20 22c0 9 1 19 4 32c3 16 13 38 28 67\nc17 31 38 57 64 77c51 41 127 71 226 91z"
            },
            "≼": {
                x: 941,
                d: "M188 310h29c26 0 64 2 115 6c47 5 91 12 132 21c36 8 69 18 98 29c23 9 46 22 69 39c19 15 34 28 45 41s19 27 26 44c8 19 13 32 14 38c2 9 4 20 6 35c0 2 2 5 5 10c3 4 8 6 14 6c7 0 12 -2 15 -7s5 -9 5 -14c0 -33 -12 -70 -36 -110c-47 -78 -143 -131 -288 -159\nc97 -16 177 -49 238 -98c24 -21 43 -46 57 -73c13 -27 22 -49 25 -64c3 -13 4 -24 4 -33c0 -5 -2 -10 -7 -15c-4 -4 -8 -6 -13 -6c-11 0 -18 9 -21 26c-15 108 -95 179 -240 214c-83 19 -168 29 -256 29c-36 0 -56 0 -59 1c-10 5 -15 12 -15 20c0 13 13 20 38 20zM650 -133\nc0 -6 -2 -11 -6 -15s-9 -6 -14 -6c-11 0 -18 8 -21 25c-7 47 -26 87 -55 120s-67 58 -112 75s-89 30 -131 38c-39 7 -83 11 -131 11c-20 0 -30 7 -30 20c0 9 3 15 9 17s16 3 31 3c122 0 228 -26 317 -77c25 -14 47 -32 68 -54s35 -40 43 -54c10 -18 17 -35 22 -52\nc5 -19 8 -31 9 -36s1 -10 1 -15z"
            },
            "≽": {
                x: 941,
                d: "M694 310h29c25 0 38 -7 38 -20c0 -6 -2 -11 -7 -14c-4 -3 -9 -5 -14 -6c-3 -1 -12 -1 -27 -1c-116 0 -212 -10 -289 -31c-50 -13 -90 -29 -120 -47c-32 -19 -55 -39 -70 -61c-15 -23 -26 -42 -31 -57c-6 -18 -10 -36 -13 -55c-2 -12 -9 -18 -20 -18c-5 0 -10 2 -14 6\ns-6 9 -6 15c0 33 12 70 36 110c47 78 142 131 285 158v1c-95 16 -174 49 -235 98c-23 21 -42 45 -56 72c-15 29 -23 51 -26 64s-4 25 -4 34c0 14 7 21 20 21c11 0 18 -9 21 -26c17 -107 97 -179 240 -214c83 -19 170 -29 263 -29zM761 135c0 -13 -9 -20 -26 -20\nc-40 0 -76 -2 -109 -7c-42 -6 -78 -14 -109 -24c-36 -11 -69 -26 -99 -44c-29 -17 -55 -41 -76 -70s-34 -61 -40 -98c-3 -17 -10 -26 -21 -26c-5 0 -9 2 -13 6c-5 5 -7 10 -7 15c0 6 0 11 1 15c1 9 5 21 10 38c7 24 15 42 22 54c9 15 25 34 48 56s49 41 76 56\nc87 46 188 69 303 69c4 0 9 -1 14 -1h9c5 0 9 -1 12 -4s5 -8 5 -15z"
            },
            "≾": {
                x: 965,
                d: "M815 -26c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-21 0 -44 5 -67 16s-41 21 -54 31c-7 6 -26 22 -56 48c-22 20 -38 34 -48 41c-12 9 -28 18 -48 27c-21 9 -41 14 -60 14c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14\nc-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15c21 -9 39 -20 54 -32c14 -11 33 -27 57 -48c21 -19 37 -33 47 -40c14 -11 30 -20 48 -28c21 -9 41 -14 61 -14c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32z\nM467 442c150 -29 248 -86 294 -173c18 -35 27 -66 27 -95c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 46 -26 86 -57 121c-32 36 -84 64 -156 85c-83 24 -186 36 -307 37c-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 229 10 305 31\nc39 10 72 22 101 37s52 30 67 43c16 14 29 30 39 49c12 23 19 38 21 47c3 13 6 28 9 45c3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88c-23 -45 -56 -82 -100 -111s-110 -53 -197 -70z"
            },
            "≿": {
                x: 965,
                d: "M815 -26c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-21 0 -44 5 -67 16s-41 21 -54 31c-7 6 -26 22 -56 48c-22 20 -38 34 -48 41c-12 9 -28 18 -48 27c-21 9 -41 14 -60 14c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14\nc-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15c21 -9 39 -20 54 -32c14 -11 33 -27 57 -48c21 -19 37 -33 47 -40c14 -11 30 -20 48 -28c21 -9 41 -14 61 -14c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32z\nM740 422c-64 0 -121 -3 -172 -10c-55 -7 -108 -19 -158 -34c-51 -16 -94 -40 -128 -72c-35 -33 -55 -72 -62 -117c-2 -15 -4 -25 -7 -29c-3 -5 -8 -7 -16 -7c-13 0 -20 7 -20 21c0 35 12 72 37 111c47 77 140 129 281 156v1c-97 19 -171 50 -223 92c-27 21 -48 47 -64 78\nc-17 33 -26 55 -28 68c-2 14 -3 24 -3 31c0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c9 -67 42 -120 100 -159c57 -39 143 -65 256 -78c51 -7 106 -10 166 -10h13h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-13z"
            },
            "⊀": {
                x: 941,
                d: "M455 206l-206 -406c-4 -4 -9 -6 -15 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 3 11 8 20l192 379c-70 11 -143 17 -220 17h-24c-4 0 -9 2 -14 6c-4 3 -6 8 -6 14c0 7 2 11 6 14c5 3 9 5 12 5c1 0 4 1 8 1h10c120 0 209 8 268 24c1 1 3 5 8 13l200 393c4 4 9 6 15 6\ns11 -2 15 -6c3 -3 5 -8 5 -14c0 -4 -3 -11 -8 -20l-181 -358c37 11 68 25 94 40c29 17 50 32 62 44c13 13 25 30 34 50c9 19 14 33 16 42c4 21 6 33 7 36c2 13 9 19 20 19c13 0 20 -7 20 -21c0 -26 -8 -56 -25 -89c-22 -44 -54 -79 -95 -105c-42 -27 -95 -48 -159 -65l-4 -8\nl-3 -6c-1 -1 -1 -2 -1 -3c39 -8 74 -19 106 -33c34 -15 60 -29 77 -43c21 -17 38 -33 51 -50c14 -18 24 -34 30 -48c8 -19 13 -33 16 -43c4 -15 6 -25 6 -30v-7s1 -5 1 -6c0 -6 -2 -11 -7 -16c-4 -4 -8 -6 -13 -6c-11 0 -18 9 -21 28c-17 111 -106 184 -265 218z"
            },
            "⊁": {
                x: 941,
                d: "M455 206l-206 -406c-4 -4 -9 -6 -15 -6c-5 0 -10 2 -14 6s-6 9 -6 14l17 39l67 131c1 1 3 4 6 11s7 15 12 26c3 7 8 15 13 25l11 22c7 13 11 21 12 22l51 102c-37 -11 -68 -25 -94 -40c-28 -17 -48 -31 -61 -44s-25 -30 -34 -50c-11 -23 -17 -37 -18 -43\nc-2 -11 -4 -23 -6 -37c-2 -12 -9 -18 -20 -18c-5 0 -10 2 -14 6s-6 9 -6 16c0 27 8 56 25 89c23 46 56 82 97 107c42 26 94 47 157 63l4 8l3 6c1 1 1 2 1 3c-39 8 -75 19 -107 33s-57 28 -76 43s-36 32 -50 50c-17 22 -27 38 -32 48c-6 15 -11 29 -15 43c-5 17 -7 27 -7 30\nv13c0 14 7 21 20 21c5 0 9 -2 12 -5s5 -6 6 -8c1 -3 2 -7 3 -14c17 -112 106 -185 265 -218l206 406c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -4 -3 -11 -8 -20l-192 -379c77 -11 151 -17 220 -17h25c3 0 8 -2 13 -6c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14\nc-5 -4 -9 -6 -12 -6h-18c-103 0 -193 -8 -270 -24z"
            },
            "⊂": {
                x: 941,
                d: "M726 500h-267c-77 0 -141 -25 -192 -74s-77 -108 -77 -176s26 -127 77 -176s115 -74 192 -74h267h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-269c-85 0 -158 28 -217 85c-60 57 -90 125 -90 205s30 148 90 205c59 57 132 85 217 85h269\nh17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "⊃": {
                x: 941,
                d: "M452 500h-267h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14s2 11 6 14c5 4 9 6 12 6h17h269c86 0 159 -28 218 -85s89 -125 89 -205s-30 -148 -89 -205s-132 -85 -218 -85h-269h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14s2 11 6 14c5 4 9 6 12 6h17h267c77 0 141 25 192 74\ns77 108 77 176s-26 127 -77 176s-115 74 -192 74z"
            },
            "⊆": {
                x: 941,
                d: "M726 596h-267c-77 0 -141 -25 -192 -74s-77 -108 -77 -176c0 -69 25 -127 76 -176s115 -73 193 -73h267c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-269c-84 0 -156 28 -217 85c-60 56 -90 124 -90 205\nc0 79 30 147 90 204c59 57 132 85 217 85h269h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17zM205 -97h521c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-521c-3 0 -5 1 -9 1h-8\nc-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "⊇": {
                x: 941,
                d: "M452 596h-267h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14s2 11 6 14c5 4 9 6 12 6h17h269c85 0 157 -28 217 -84s90 -125 90 -206c0 -79 -30 -147 -89 -204s-132 -85 -218 -85h-269c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h267\nc77 0 141 24 192 73s77 108 77 177c0 67 -26 126 -77 175s-115 74 -192 74zM706 -137h-521c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h521c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5\nh-7s-7 -1 -10 -1z"
            },
            "⊈": {
                x: 941,
                d: "M621 596l-206 -496c13 -2 28 -3 45 -3h266c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-269c-20 0 -39 2 -58 5l-66 -159h393c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14\nc-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-410l-59 -142c-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-68c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h84l71 169c-59 17 -108 49 -148 98\nc-41 51 -62 110 -62 177c0 81 30 149 90 205s132 84 216 84h138l68 161c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-53 -128h88h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-105zM578 596h-119c-77 0 -141 -25 -192 -74\ns-77 -108 -77 -176c0 -57 18 -107 53 -150s79 -72 132 -87z"
            },
            "⊉": {
                x: 941,
                d: "M691 764l-72 -173c39 -23 73 -56 101 -99c27 -42 41 -91 41 -146c0 -81 -30 -150 -89 -205c-60 -56 -132 -84 -217 -84h-58l-64 -154h373c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-390l-59 -142\nc-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-88c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h104l65 154h-169c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h185\nl198 476c-38 15 -77 23 -117 23h-266h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14s2 11 6 14c5 4 9 6 12 6h17h269c48 0 91 -9 130 -27l78 188c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19zM603 554l-189 -457c25 0 50 1 74 2c17 1 40 6 69 17\nc27 10 53 25 77 46c58 49 87 111 87 185c0 38 -10 76 -29 113s-49 69 -89 94z"
            },
            "⊊": {
                x: 941,
                d: "M726 596h-267c-77 0 -141 -25 -192 -74s-77 -108 -77 -176s25 -126 76 -175s116 -74 194 -74h266c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-269c-85 0 -157 28 -217 84s-90 125 -90 206s30 149 90 205\ns132 84 216 84h270h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17zM726 -137h-263l-85 -78c-13 -13 -23 -19 -29 -19c-13 0 -20 7 -20 20c0 4 5 12 14 23l1 1l2 2s2 2 4 3s4 3 5 4c9 8 18 16 25 23c9 9 16 16 23 21h-198c-3 0 -5 1 -9 1h-8\nc-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h243l85 78c13 13 23 19 29 19c5 0 9 -1 12 -4s5 -6 6 -8c1 -4 2 -7 2 -8c0 -6 -5 -14 -14 -23l-1 -1c-1 -1 -2 -1 -3 -2s-2 -2 -4 -3s-3 -3 -4 -4c-14 -12 -23 -20 -26 -23c-11 -11 -19 -18 -22 -21h218\nc3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1z"
            },
            "⊋": {
                x: 941,
                d: "M451 596h-266h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14s2 11 6 14c5 4 9 6 12 6h17h269c85 0 158 -28 218 -84c59 -55 89 -124 89 -206c0 -81 -30 -150 -89 -205c-60 -56 -132 -84 -217 -84h-270c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5\nh8s6 1 9 1h267c77 0 141 24 192 73s77 108 77 177c0 68 -25 126 -76 175s-116 74 -194 74zM706 -137h-242c-45 -51 -69 -78 -70 -79c-11 -12 -19 -18 -25 -18c-13 0 -20 7 -20 20c0 4 4 11 12 21c0 1 8 10 23 27c12 14 21 24 26 29h-225c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5\nc-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h262c36 41 59 67 70 78c12 13 20 19 25 19s9 -1 12 -4s5 -6 6 -8c1 -4 2 -7 2 -8c0 -6 -4 -13 -12 -21l-49 -56h205c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1\nz"
            },
            "⊎": {
                x: 856,
                d: "M448 285v-142c0 -23 -7 -35 -20 -35s-20 12 -20 35v142h-142c-24 0 -36 7 -36 20s12 20 36 20h142v143v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17v-143h142c24 0 36 -7 36 -20s-12 -20 -36 -20h-142zM706 562v-367c0 -47 -15 -87 -44 -121s-63 -59 -104 -74\ns-85 -22 -130 -22c-33 0 -64 4 -96 13s-62 22 -90 39s-49 39 -66 68s-26 62 -26 98v366v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18v-361c0 -61 26 -107 77 -140c45 -29 98 -43 161 -43c22 0 46 3 70 8s49 14 76 26s49 30 66 56s26 57 26 92v362v18s3 8 6 12\ns8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "⊏": {
                x: 941,
                d: "M726 499h-536v-499h535c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-541c-16 0 -25 2 -29 6s-6 14 -6 29v508c0 17 2 27 6 31s14 5 30 5h540c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⊐": {
                x: 951,
                d: "M801 504v-509c0 -16 -2 -25 -6 -29s-14 -6 -29 -6h-581h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h575v499h-576c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h581c16 0 26 -2 30 -6s5 -14 5 -29z"
            },
            "⊑": {
                x: 931,
                d: "M746 596h-545v-499h544c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-550c-16 0 -26 1 -30 5s-5 14 -5 31v507c0 16 2 26 6 30s14 6 30 6h549h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17zM746 -137h-561c-7 0 -13 1 -17 1\ns-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h559c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⊒": {
                x: 931,
                d: "M770 600v-507c0 -17 -2 -27 -6 -31s-13 -5 -29 -5h-550c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h544v499h-545h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h550c16 0 25 -2 29 -6s6 -13 6 -30zM186 -97h559c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-561c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20z"
            },
            "⊓": {
                x: 844,
                d: "M694 562v-526v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v522h-464v-522v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v526c0 17 2 26 6 30s13 6 29 6h474c16 0 25 -2 29 -6s6 -13 6 -30z"
            },
            "⊔": {
                x: 844,
                d: "M694 562v-526c0 -17 -2 -26 -6 -30s-13 -6 -30 -6h-472c-16 0 -26 2 -30 6s-6 14 -6 30v526v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18v-522h464v522v18s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "⊕": {
                x: 967,
                d: "M817 250c0 -91 -32 -170 -97 -235s-144 -98 -237 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 236 98c91 0 170 -32 235 -97s98 -144 98 -236zM175 263h296v295c-79 -4 -147 -33 -204 -88s-87 -124 -92 -207zM496 558v-295h296\nc-5 83 -35 152 -92 207s-125 84 -204 88zM471 -58v296h-296c5 -84 35 -153 92 -208s125 -84 204 -88zM792 238h-296v-296c79 4 147 33 204 88s87 124 92 208z"
            },
            "⊖": {
                x: 967,
                d: "M817 250c0 -91 -32 -170 -97 -235s-144 -98 -237 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 236 98c91 0 170 -32 235 -97s98 -144 98 -236zM175 263h617c-5 86 -38 157 -98 212s-130 83 -211 83c-79 0 -149 -27 -210 -82s-93 -126 -98 -213\nzM792 238h-617c5 -87 37 -158 98 -213s131 -83 211 -83c79 0 149 27 210 82s93 126 98 214z"
            },
            "⊗": {
                x: 967,
                d: "M817 250c0 -91 -32 -170 -97 -235s-144 -98 -237 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 236 98c91 0 170 -32 235 -97s98 -144 98 -236zM285 465l199 -198l208 209c-58 55 -128 82 -209 82c-37 0 -73 -7 -107 -20s-60 -26 -76 -39\ns-24 -20 -24 -23c0 -1 3 -5 9 -11zM256 41l209 209l-209 209c-54 -61 -81 -131 -81 -209c0 -79 27 -149 81 -209zM710 459l-208 -209l209 -209c54 61 81 131 81 209c0 81 -27 151 -82 209zM682 35l-199 198l-208 -209c58 -55 128 -82 209 -82c37 0 74 7 108 20s59 26 75 39\ns24 20 24 23c0 1 -3 5 -9 11z"
            },
            "⊘": {
                x: 967,
                d: "M817 250c0 -91 -32 -170 -97 -235s-144 -98 -237 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 236 98c91 0 170 -32 235 -97s98 -144 98 -236zM266 51l426 425c-58 55 -128 82 -209 82c-85 0 -157 -30 -217 -90s-91 -133 -91 -218\nc0 -38 7 -74 21 -108s26 -60 38 -76s20 -23 23 -23l2 1c2 3 4 5 7 7zM710 459l-435 -435c58 -55 128 -82 209 -82c85 0 158 30 218 90s90 133 90 218c0 81 -27 151 -82 209z"
            },
            "⊙": {
                x: 967,
                d: "M817 250c0 -91 -32 -170 -97 -235s-144 -98 -237 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 236 98c91 0 170 -32 235 -97s98 -144 98 -236zM484 -58c85 0 158 30 218 90s90 133 90 218s-30 158 -90 218s-133 90 -219 90\nc-85 0 -157 -30 -217 -90s-91 -133 -91 -218s30 -158 90 -218s133 -90 219 -90zM552 250c0 -19 -7 -34 -20 -48s-30 -21 -49 -21s-35 7 -48 21s-20 29 -20 48s7 34 20 48s30 21 49 21s35 -7 48 -21s20 -29 20 -48z"
            },
            "⊚": {
                x: 966,
                d: "M816 250c0 -91 -33 -170 -98 -235s-143 -98 -235 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 235 98c91 0 170 -32 235 -97s98 -144 98 -236zM483 -58c85 0 157 30 217 90s91 133 91 218s-31 158 -91 218s-132 90 -217 90s-157 -30 -217 -90\ns-91 -133 -91 -218s31 -158 91 -218s132 -90 217 -90zM622 250c0 -38 -14 -71 -41 -98s-60 -41 -98 -41s-71 14 -98 41s-41 59 -41 98c0 38 14 71 41 98s60 41 98 41s71 -14 98 -41s41 -59 41 -98zM483 151c27 0 51 10 70 29s29 43 29 70s-10 50 -29 70s-43 29 -70 29\ns-51 -10 -70 -29s-29 -43 -29 -70s10 -50 29 -70s43 -29 70 -29z"
            },
            "⊛": {
                x: 966,
                d: "M816 250c0 -91 -33 -170 -98 -235s-143 -98 -235 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 235 98c91 0 170 -32 235 -97s98 -144 98 -236zM483 -58c85 0 157 30 217 90s91 133 91 218s-31 158 -91 218s-132 90 -217 90s-157 -30 -217 -90\ns-91 -133 -91 -218s31 -158 91 -218s132 -90 217 -90zM604 150l-109 79l5 -54c0 -6 1 -13 2 -23s1 -19 2 -26l1 -11c0 -1 1 -10 3 -27s2 -26 2 -27c0 -8 -2 -14 -8 -19s-12 -7 -19 -7s-13 2 -19 7s-8 11 -8 19l15 168l-111 -80c-19 -13 -30 -20 -34 -20c-7 0 -14 3 -19 9\ns-8 12 -8 19s1 12 4 15s8 6 17 11l140 67l-141 68c-13 7 -20 15 -20 25c0 7 3 13 8 19s12 9 19 9c3 0 15 -7 36 -21l109 -79l-14 156v13c-1 7 1 13 7 18s12 8 19 8c17 0 26 -11 26 -32v-7l-14 -157l127 94c7 5 13 7 18 7c7 0 14 -3 19 -9s8 -12 8 -19s-1 -12 -4 -15\ns-8 -6 -17 -11l-140 -67c18 -9 38 -20 59 -30s39 -18 53 -24s23 -11 26 -13c7 -3 12 -6 14 -7s4 -4 6 -7s3 -7 3 -12c0 -7 -3 -13 -8 -19s-12 -9 -19 -9c-3 0 -15 7 -36 21z"
            },
            "⊝": {
                x: 966,
                d: "M816 250c0 -91 -33 -170 -98 -235s-143 -98 -235 -98c-91 0 -170 32 -235 97s-98 144 -98 236c0 91 33 170 98 235s143 98 235 98c91 0 170 -32 235 -97s98 -144 98 -236zM483 -58c85 0 157 30 217 90s91 133 91 218s-31 158 -91 218s-132 90 -217 90s-157 -30 -217 -90\ns-91 -133 -91 -218s31 -158 91 -218s132 -90 217 -90zM346 263h274c8 0 13 -1 16 -1s6 -1 9 -3s4 -5 4 -9c0 -5 -3 -9 -7 -10s-11 -2 -22 -2h-274h-16s-6 2 -9 4s-4 5 -4 9c0 5 3 9 7 10s11 2 22 2z"
            },
            "⊞": {
                x: 965,
                d: "M815 652v-617c0 -16 -1 -25 -5 -29s-14 -6 -31 -6h-593c-17 0 -26 2 -30 6s-6 14 -6 30v616c0 16 2 26 6 30s14 5 29 5h595c16 0 26 -2 30 -6s5 -14 5 -29zM190 364h273v283h-273v-283zM775 647h-272v-283h272v283zM190 40h273v284h-273v-284zM775 324h-272v-284h272v284\nz"
            },
            "⊟": {
                x: 965,
                d: "M815 652v-617c0 -16 -1 -25 -5 -29s-14 -6 -31 -6h-593c-17 0 -26 2 -30 6s-6 14 -6 30v616c0 16 2 26 6 30s14 5 29 5h595c16 0 26 -2 30 -6s5 -14 5 -29zM190 364h585v283h-585v-283zM190 40h585v284h-585v-284z"
            },
            "⊠": {
                x: 965,
                d: "M815 652v-617c0 -16 -2 -25 -6 -29s-14 -6 -29 -6h-594c-17 0 -26 2 -30 6s-6 14 -6 30v616c0 16 2 26 6 30s14 5 29 5h595c16 0 26 -2 30 -6s5 -14 5 -29zM217 647l266 -274l265 274h-531zM190 70l264 273l-264 274v-547zM775 617l-264 -273l264 -274v547zM748 40\nl-266 274l-265 -274h531z"
            },
            "⊡": {
                x: 965,
                d: "M815 652v-617c0 -16 -1 -25 -5 -29s-14 -6 -31 -6h-593c-17 0 -26 2 -30 6s-6 14 -6 30v616c0 16 2 26 6 30s14 5 29 5h595c16 0 26 -2 30 -6s5 -14 5 -29zM190 647v-607h585v607h-585zM536 344c0 -15 -6 -28 -16 -38s-22 -15 -37 -15s-27 5 -37 15s-16 23 -16 38\ns6 28 16 38s22 15 37 15s27 -5 37 -15s16 -23 16 -38z"
            },
            "⊢": {
                x: 800,
                d: "M615 327h-425v-291v-18c0 -3 -2 -7 -6 -12c-3 -4 -7 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c7 0 11 -2 14 -6c4 -5 6 -9 6 -12v-18v-291h425c3 0 5 -1 9 -1h8c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-8s-6 -1 -9 -1z"
            },
            "⊣": {
                x: 800,
                d: "M650 658v-622v-18c0 -3 -2 -7 -6 -12c-3 -4 -7 -6 -14 -6c-13 0 -20 12 -20 36v291h-424c-24 0 -36 7 -36 20s12 20 36 20h424v291c0 24 7 36 20 36c7 0 11 -2 14 -6c4 -5 6 -9 6 -12v-18z"
            },
            "⊨": {
                x: 798,
                d: "M613 230h-423v-195v-17s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17v-195h423h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20h-422v-154h422c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "⊩": {
                x: 909,
                d: "M190 659v-624v-17s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17zM384 327v-292v-17s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17v-292h340\nc7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-340z"
            },
            "⊪": {
                x: 1076,
                d: "M190 659v-624v-17s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17zM552 327v-292v-17s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17v-292h339\nc7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-339zM371 659v-624c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17z"
            },
            "⊬": {
                x: 909,
                d: "M464 327l-163 -187v-105c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v58l-66 -75c-11 -13 -19 -19 -26 -19c-5 0 -9 2 -13 6s-6 9 -6 14s1 9 4 14c9 9 15 16 17 19c52 59 82 93 90 102v503c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12\ns1 -10 1 -17v-292h144l272 311c9 11 17 16 22 16s10 -2 14 -6s6 -8 6 -14s-4 -13 -12 -22l-248 -285h225c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-260zM410 327h-109v-125z"
            },
            "⊭": {
                x: 909,
                d: "M548 424l-134 -154h309c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-345l-78 -89v-106c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v58l-66 -75c-11 -13 -19 -19 -26 -19c-5 0 -9 2 -13 6s-6 9 -6 14s1 9 4 14c9 9 15 16 17 19\nc52 59 82 93 90 102v503c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-195h229l187 214c9 11 17 16 22 16s10 -2 14 -6s6 -8 6 -14s-4 -13 -12 -22l-164 -188h141h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20h-175zM301 424v-154h60l134 154h-194z\nM325 230h-24v-28z"
            },
            "⊮": {
                x: 1020,
                d: "M857 653l-297 -286h275c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-317c-11 -9 -18 -17 -23 -22v-270c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v230l-154 -148v-83c0 -7 -1 -13 -1 -17s-2 -8 -5 -12\ns-8 -6 -14 -6c-13 0 -20 12 -20 36v44l-45 -44c-25 -24 -40 -36 -46 -36c-13 0 -20 7 -20 20c0 7 10 20 31 39l73 70c5 4 7 13 7 26v503c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-485l154 148v336c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17\nv-292c1 1 3 1 5 1s3 0 4 1l321 309c11 11 19 16 25 16c5 0 10 -2 14 -6s6 -8 6 -14s-4 -13 -13 -21z"
            },
            "⊯": {
                x: 1020,
                d: "M619 424l-124 -119v-35h339c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-340v-195c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v230l-154 -148v-83c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v44l-45 -44\nc-25 -24 -40 -36 -46 -36c-13 0 -20 7 -20 20c0 7 10 20 31 39l73 70c5 4 7 13 7 26v503c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-485l154 148v336c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-195h108c16 14 39 36 70 67c8 8 33 32 75 72\nl76 73c12 12 21 18 26 18s10 -2 14 -6s6 -8 6 -14s-4 -13 -13 -21l-196 -189h174h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20h-215zM561 424h-66v-63z"
            },
            "⊲": {
                x: 941,
                d: "M170 272l553 261c8 4 14 6 18 6c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-509c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23zM217 249l504 -238v477z"
            },
            "⊳": {
                x: 941,
                d: "M741 227l-553 -260c-9 -5 -15 -7 -18 -7c-6 0 -11 2 -14 6s-6 8 -6 12v17v508v18s3 8 6 12s8 6 15 6c3 0 8 -2 17 -7l553 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22zM694 250l-504 238v-477z"
            },
            "⊴": {
                x: 941,
                d: "M170 369l553 261c8 4 14 6 18 6c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-509c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23zM217 346l504 -238v477zM186 -97h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14\ns-8 -5 -12 -5s-10 -1 -17 -1h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20z"
            },
            "⊵": {
                x: 941,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-6 0 -11 2 -14 6s-6 8 -6 12v17v508v18s3 8 6 12s8 6 15 6c3 0 8 -2 17 -7l553 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22zM694 347l-504 238v-477zM726 -137h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h539\nc24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⊸": {
                x: 1298,
                d: "M832 230h-647h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s7 6 11 6h18h647c5 41 24 74 54 100s65 39 104 39c43 0 81 -15 112 -46s46 -68 46 -113c0 -44 -15 -81 -46 -112s-68 -47 -113 -47c-39 0 -73 13 -103 38s-48 59 -54 101zM990 131c32 0 60 12 83 35s35 51 35 84\ns-11 61 -34 84s-52 35 -85 35c-32 0 -60 -12 -83 -35s-35 -51 -35 -84s12 -61 35 -84s51 -35 84 -35z"
            },
            "⊺": {
                x: 744,
                d: "M412 351v-511c0 -35 -13 -53 -40 -53s-40 18 -40 53v511h-129c-35 0 -53 13 -53 40s18 40 53 40h338c35 0 53 -13 53 -40s-18 -40 -53 -40h-129z"
            },
            "⊻": {
                x: 798,
                d: "M641 676l-220 -462c-6 -13 -13 -20 -22 -20s-16 6 -22 19l-221 465c-4 10 -6 16 -6 18c0 5 2 10 6 14s9 6 14 6c9 0 17 -6 22 -19l207 -437l207 436c0 1 0 1 1 2c6 12 13 18 21 18c5 0 10 -2 14 -6s6 -9 6 -14c0 -4 -2 -11 -7 -20zM186 40h427h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17h-427c-24 0 -36 7 -36 20s12 20 36 20z"
            },
            "⊼": {
                x: 798,
                d: "M612 676h-426c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 6 12 6h17h428h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20zM421 503l220 -465c5 -9 7 -15 7 -18c0 -5 -2 -10 -6 -14s-8 -6 -14 -6c-8 0 -15 6 -22 19l-207 437l-207 -436c0 -1 0 -1 -1 -2\nc-6 -12 -13 -18 -21 -18c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 2 11 7 20l220 462c6 13 13 20 22 20s16 -6 22 -19z"
            },
            "⋄": {
                x: 776,
                d: "M410 474l203 -203c9 -9 13 -16 13 -21s-2 -10 -5 -13l-24 -25l-171 -171l-25 -24c-3 -3 -8 -5 -13 -5c-2 0 -4 0 -6 1s-3 1 -4 2l-2 1c-3 5 -12 13 -25 25l-142 143c-35 35 -53 53 -55 54c-3 5 -4 9 -4 12c0 5 4 11 13 20l205 205c9 9 15 13 20 13s13 -5 22 -14zM388 440\nl-189 -190l190 -190l189 190z"
            },
            "⋆": {
                x: 789,
                d: "M394 172l-130 -144c-6 -7 -11 -10 -15 -10c-6 0 -9 3 -9 9c0 1 2 6 7 14l96 169l-180 81c-9 5 -13 9 -13 12c0 6 3 9 10 9l202 -41l22 192c4 13 8 19 11 20c5 0 8 -5 10 -16v-3l22 -193l202 41c7 0 10 -3 10 -9c0 -3 -1 -5 -3 -6s-5 -3 -11 -6l-179 -81l98 -171\nc3 -5 5 -9 5 -12c0 -6 -3 -9 -9 -9c-3 0 -7 2 -10 5z"
            },
            "⋇": {
                x: 965,
                d: "M545 466c0 -17 -7 -32 -19 -44s-26 -18 -43 -18s-31 6 -43 18s-19 27 -19 44s7 32 19 44s26 18 43 18s31 -6 43 -18s19 -27 19 -44zM545 34c0 -17 -7 -32 -19 -44s-26 -18 -43 -18s-31 6 -43 18s-19 27 -19 44s7 32 19 44s26 18 43 18s31 -6 43 -18s19 -27 19 -44z\nM710 449l-178 -179h248h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-248l178 -179c9 -9 14 -17 14 -22s-2 -10 -6 -14s-8 -6 -14 -6c-7 0 -12 2 -14 6l-46 46c-27 27 -58 58 -92 91s-57 57 -70 70l-199 -199c-9 -9 -17 -14 -22 -14s-10 2 -14 6s-6 9 -6 14\nc0 6 5 14 14 23l178 178h-248h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h248l-178 179c-9 9 -14 17 -14 22s2 10 6 14s9 6 14 6s13 -5 22 -14l200 -199l199 199c9 9 17 14 22 14s10 -2 14 -6s6 -9 6 -14s-5 -13 -14 -22z"
            },
            "⋈": {
                x: 783,
                d: "M619 449l-198 -199c22 -22 21 -22 73 -74c34 -34 66 -64 92 -91s40 -41 42 -43c3 -4 5 -8 5 -13s-1 -10 -5 -14s-9 -6 -15 -6c-7 0 -12 2 -14 6l-46 46c-27 27 -57 58 -91 91s-58 57 -71 70l-199 -199c-9 -9 -17 -14 -22 -14c-13 0 -20 12 -20 36v410c0 24 7 36 20 36\nc5 0 13 -5 22 -14l200 -199l199 199c9 9 17 14 22 14s10 -2 14 -6s6 -9 6 -14s-5 -13 -14 -22zM190 77l172 173l-172 172v-345zM392 278l199 199c9 9 17 14 22 14c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-412c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6\nc-7 0 -12 2 -14 6l-46 46c-27 27 -57 58 -91 91s-58 57 -71 70l-199 -199c-9 -9 -17 -14 -22 -14s-10 2 -14 6s-6 9 -6 14c0 6 5 14 14 23l198 198l-198 199c-9 9 -14 17 -14 22s2 10 6 14s9 6 14 6s13 -5 22 -14zM421 250l172 -172v345z"
            },
            "⋉": {
                x: 783,
                d: "M619 449l-198 -199c22 -22 21 -22 73 -74c34 -34 66 -64 92 -91s40 -41 42 -43c3 -4 5 -8 5 -13s-1 -10 -5 -14s-9 -6 -15 -6c-7 0 -12 2 -14 6l-46 46c-27 27 -57 58 -91 91s-58 57 -71 70l-199 -199c-9 -9 -17 -14 -22 -14c-13 0 -20 12 -20 36v410c0 24 7 36 20 36\nc5 0 13 -5 22 -14l200 -199l199 199c9 9 17 14 22 14s10 -2 14 -6s6 -9 6 -14s-5 -13 -14 -22zM190 77l172 173l-172 172v-345z"
            },
            "⋊": {
                x: 783,
                d: "M392 278l199 199c9 9 17 14 22 14c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-412c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-7 0 -12 2 -14 6l-46 46c-27 27 -57 58 -91 91s-58 57 -71 70l-199 -199c-9 -9 -17 -14 -22 -14s-10 2 -14 6s-6 9 -6 14c0 6 5 14 14 23\nl198 198l-198 199c-9 9 -14 17 -14 22s2 10 6 14s9 6 14 6s13 -5 22 -14zM421 250l172 -172v345z"
            },
            "⋋": {
                x: 965,
                d: "M455 336l-293 316c-8 9 -12 16 -12 22s2 10 6 14s9 6 14 6c6 0 13 -5 22 -14l611 -660c8 -9 12 -16 12 -22s-2 -10 -6 -14s-9 -6 -14 -6c-6 0 -13 4 -21 13l-292 315l-291 -315c-8 -9 -15 -13 -21 -13c-5 0 -10 2 -14 6s-6 8 -6 14s4 13 12 22z"
            },
            "⋌": {
                x: 965,
                d: "M510 336l293 -316c8 -9 12 -16 12 -22s-2 -10 -6 -14s-9 -6 -14 -6c-6 0 -13 4 -21 13l-292 315l-291 -315c-8 -9 -15 -13 -21 -13c-5 0 -10 2 -14 6s-6 8 -6 14s4 13 12 22l611 660c9 9 16 14 22 14c5 0 10 -2 14 -6s6 -8 6 -14s-4 -13 -12 -22z"
            },
            "⋍": {
                x: 966,
                d: "M816 282c0 -21 -5 -31 -14 -31c-8 0 -13 11 -14 33c-3 33 -18 62 -43 87s-57 37 -96 37c-41 0 -90 -23 -149 -68c-30 -23 -51 -39 -64 -48s-32 -18 -56 -28c-23 -9 -44 -14 -63 -14c-49 0 -90 19 -121 56s-46 78 -46 125c0 21 5 32 14 32c8 0 13 -11 14 -33\nc2 -32 16 -61 42 -86c27 -25 59 -38 97 -38c41 0 90 23 149 68c30 23 51 39 64 48s32 18 56 28c23 9 44 14 63 14c49 0 89 -18 120 -55s47 -80 47 -127zM186 76h594c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-596h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14\nc0 13 12 20 36 20z"
            },
            "⋎": {
                x: 891,
                d: "M446 305c-19 -99 -51 -175 -94 -229c-23 -29 -50 -52 -82 -68s-54 -25 -68 -27s-24 -3 -31 -3c-14 0 -21 7 -21 20c0 11 7 18 22 21c49 7 92 27 127 58s64 82 87 152c25 80 39 179 40 298c0 23 0 34 1 35c0 3 1 5 4 8c3 5 8 8 15 8c13 0 20 -8 20 -24\nc1 -140 16 -252 44 -335c11 -34 25 -64 41 -89s31 -43 45 -56s30 -24 49 -33s33 -15 43 -17s22 -4 36 -6c11 -2 17 -9 17 -20c0 -13 -7 -20 -21 -20c-3 0 -8 1 -16 2s-22 5 -40 10s-33 12 -48 20c-84 49 -141 148 -170 295z"
            },
            "⋏": {
                x: 891,
                d: "M446 251c21 103 54 182 101 237c13 16 28 30 45 42s32 21 46 27s28 11 41 14s23 5 29 6s9 1 12 1c14 0 21 -7 21 -20c0 -11 -9 -18 -27 -21c-49 -8 -90 -29 -125 -63s-63 -83 -84 -150c-25 -79 -38 -178 -39 -295c0 -23 0 -34 -1 -35c0 -3 -1 -5 -4 -8\nc-3 -5 -8 -8 -15 -8c-13 0 -20 8 -20 24c-1 142 -17 257 -47 345c-39 113 -109 177 -212 191c-11 2 -17 9 -17 20c0 13 7 20 21 20c9 0 21 -2 37 -5s38 -12 66 -27s53 -35 72 -59c48 -59 81 -137 100 -236z"
            },
            "⋐": {
                x: 941,
                d: "M470 155h256c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-107c-20 0 -50 -1 -89 -1h-89c-39 0 -71 13 -97 40s-40 59 -40 96s14 69 40 96s58 40 97 40h15s13 -1 17 -1h253c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14\ns-8 -5 -12 -5s-10 -1 -17 -1h-256c-3 0 -8 1 -15 1h-14c-27 0 -50 -9 -69 -28s-28 -42 -28 -68s9 -49 28 -68s42 -28 69 -28h14s12 1 15 1zM459 0h267h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-270c-84 0 -156 28 -216 84s-90 125 -90 206s30 150 90 206\ns132 84 216 84h270h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-267c-77 0 -142 -25 -193 -74s-76 -107 -76 -176s26 -127 77 -176s115 -74 192 -74z"
            },
            "⋑": {
                x: 941,
                d: "M441 345h-256c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h253c4 0 9 1 16 1h16c39 0 72 -13 98 -40s39 -59 39 -96s-13 -69 -39 -96s-59 -40 -98 -40h-16s-12 1 -16 1h-253c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5\ns10 1 17 1h256c3 0 8 -1 15 -1h14c27 0 50 9 69 28s28 42 28 68s-9 49 -28 68s-42 28 -69 28h-14s-12 -1 -15 -1zM452 500h-267h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h270c84 0 156 -28 216 -84s90 -125 90 -206s-30 -150 -90 -206s-132 -84 -216 -84h-270h-17\ns-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h267c77 0 141 25 192 74s77 107 77 176s-26 127 -77 176s-115 74 -192 74z"
            },
            "⋒": {
                x: 854,
                d: "M550 320v-307v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v304c0 27 -8 48 -23 63c-16 16 -36 24 -60 24c-25 0 -45 -8 -61 -25c-15 -15 -22 -35 -22 -62v-304v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v307c0 23 5 44 14 61s20 31 34 39\ns26 14 39 18s25 6 36 6c16 0 32 -3 49 -9s34 -19 50 -39s24 -45 24 -76zM704 379v-366v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v363c0 57 -24 103 -73 136c-47 31 -101 46 -164 46c-24 0 -49 -3 -74 -9s-51 -16 -76 -29s-47 -31 -63 -56s-24 -55 -24 -88\nv-363v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v366c0 48 14 89 44 123s65 59 106 74s83 22 127 22c32 0 63 -4 95 -13s62 -22 90 -39s49 -39 66 -68s26 -62 26 -99z"
            },
            "⋓": {
                x: 854,
                d: "M550 563v-307c0 -23 -5 -44 -14 -61s-20 -31 -34 -39s-26 -14 -39 -18s-25 -6 -36 -6c-16 0 -32 3 -49 9s-34 19 -50 39s-24 45 -24 76v307v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17v-304c0 -27 8 -48 23 -63c16 -16 36 -24 60 -24c25 0 45 8 61 25\nc15 15 22 35 22 62v304v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17zM704 563v-366c0 -48 -14 -89 -44 -123s-65 -59 -106 -74s-83 -22 -127 -22c-32 0 -63 4 -95 13s-62 22 -90 39s-49 39 -66 68s-26 62 -26 99v366v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17\nv-363c0 -57 24 -103 73 -136c47 -31 101 -46 164 -46c24 0 49 3 74 9s51 16 76 29s47 31 63 56s24 55 24 88v363v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17z"
            },
            "⋔": {
                x: 855,
                d: "M705 332v-319c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 17v316c0 48 -20 86 -59 113c-41 27 -94 42 -158 45v-474v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v474c-63 -2 -113 -16 -152 -41\nc-15 -10 -28 -21 -38 -32s-17 -22 -20 -33s-5 -20 -6 -27s-2 -15 -2 -25v-316v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v319c0 33 8 61 23 86s33 44 53 57s44 25 71 33s48 14 65 16s32 3 46 4v173v17s3 8 6 12s8 6 14 6s11 -2 14 -6s6 -8 6 -12v-17v-173\nc12 -1 26 -2 41 -4s37 -6 64 -14s52 -19 73 -32s39 -32 55 -58s24 -55 24 -88z"
            },
            "⋖": {
                x: 941,
                d: "M662 250c0 -17 -6 -32 -18 -44s-28 -19 -46 -19c-17 0 -31 6 -44 18s-19 27 -19 45s6 33 19 45s27 18 44 18c18 0 34 -7 46 -19s18 -27 18 -44zM741 497l-524 -247l524 -248c13 -6 20 -13 20 -21c0 -7 -3 -12 -7 -15s-8 -5 -13 -5c-3 0 -9 2 -18 6l-553 261\nc-1 0 -1 0 -2 1c-12 6 -18 13 -18 21s6 15 19 22l556 262c8 3 13 5 16 5c5 0 9 -2 13 -5s7 -8 7 -15c0 -9 -7 -16 -20 -22z"
            },
            "⋗": {
                x: 941,
                d: "M376 250c0 -18 -6 -33 -19 -45s-27 -18 -44 -18c-18 0 -33 7 -45 19s-19 27 -19 44s7 32 19 44s27 19 45 19c17 0 31 -6 44 -18s19 -27 19 -45zM188 533l553 -261c1 0 1 0 2 -1c12 -6 18 -13 18 -21s-6 -15 -19 -22l-556 -262c-8 -3 -13 -5 -16 -5c-5 0 -10 2 -14 6\ns-6 8 -6 13c0 9 7 17 20 23l524 247l-524 247c-13 6 -20 14 -20 23c0 5 2 9 6 13s9 6 14 6c3 0 9 -2 18 -6z"
            },
            "⋘": {
                x: 1520,
                d: "M712 524l-500 -274l500 -274c13 -7 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -12 2 -19 7l-523 287c-9 5 -15 9 -16 10c-3 3 -4 7 -4 12c0 7 5 14 16 20l1 1s1 1 2 1l525 287c9 5 15 7 18 7c5 0 10 -2 14 -6s6 -9 6 -14c0 -7 -7 -15 -20 -22zM1350 524l-500 -274\nl500 -274c13 -7 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -12 2 -19 7l-523 287c-9 5 -14 9 -16 10c-3 3 -4 7 -4 12c0 7 5 14 16 20l1 1c1 1 1 1 2 1l525 287c9 5 15 7 18 7c5 0 10 -2 14 -6s6 -9 6 -14c0 -7 -7 -15 -20 -22zM1031 524l-500 -274l500 -274\nc13 -7 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -12 2 -19 7l-523 287c-11 6 -16 9 -17 10c-2 2 -3 6 -3 12c0 7 5 14 16 20c1 0 1 0 1 1l2 1l525 287c9 5 15 7 18 7c5 0 9 -2 13 -6c5 -5 7 -9 7 -14c0 -7 -7 -15 -20 -22z"
            },
            "⋙": {
                x: 1520,
                d: "M733 228l-544 -287c-9 -5 -15 -7 -19 -7c-13 0 -20 7 -20 20c0 7 7 15 20 22l520 274l-520 274c-13 7 -20 15 -20 22c0 5 2 10 6 14s9 6 14 6c2 0 8 -2 18 -6l545 -288c13 -7 19 -14 19 -22s-6 -15 -19 -22zM1351 228l-544 -287c-9 -5 -15 -7 -19 -7c-13 0 -20 7 -20 20\nc0 3 0 6 1 7s2 3 5 6l4 4l8 4l521 275l-520 275c-3 2 -6 4 -9 5s-5 3 -6 4c-3 3 -4 5 -4 6v6c0 6 2 11 5 14c1 1 4 2 9 5c1 1 3 1 6 1c2 0 8 -2 18 -6l544 -288c12 -7 18 -12 19 -16c1 -1 1 -3 1 -6c0 -8 -6 -15 -19 -22zM1042 228l-544 -287c-9 -5 -15 -7 -19 -7\nc-13 0 -20 7 -20 20c0 5 1 9 4 12s8 6 16 10l519 274l-521 275c-12 6 -18 13 -18 21c0 7 2 12 7 15s9 5 13 5c2 0 8 -2 18 -6l544 -288c10 -5 16 -8 17 -10c2 -3 3 -7 3 -12c0 -8 -6 -15 -19 -22z"
            },
            "⋚": {
                x: 891,
                d: "M718 843l-492 -188l494 -189c14 -5 21 -13 21 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-531 203c-14 5 -21 12 -21 22c0 9 8 17 23 23l530 202c9 4 15 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -23 -23zM718 -178l-529 -202c-9 -4 -15 -6 -19 -6\nc-5 0 -10 2 -14 6s-6 9 -6 14c0 9 8 17 24 23l491 188l-494 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 18 -6l532 -203c14 -6 21 -13 21 -22c0 -10 -8 -18 -23 -23zM706 230h-521h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h519\nc24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "⋛": {
                x: 891,
                d: "M718 632l-529 -202c-9 -4 -15 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 8 17 23 23l492 188l-494 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 18 -6l532 -203c14 -5 21 -12 21 -22s-8 -18 -23 -23zM718 33l-492 -188l494 -189c14 -6 21 -13 21 -22\nc0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-531 203c-14 5 -21 12 -21 22c0 9 8 17 24 23l529 202c9 4 15 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -23 -23zM706 230h-521h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h519c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "⋞": {
                x: 941,
                d: "M650 712l-2 -18c-1 -11 -5 -25 -10 -42s-14 -34 -26 -53c-24 -37 -57 -69 -98 -95s-84 -44 -129 -54c-37 -8 -74 -15 -113 -20c-30 -4 -57 -6 -82 -6h-22c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 9 20 26 20c47 0 92 4 136 12c43 8 87 21 132 38c43 17 79 42 110 75\nc29 33 48 72 55 118c3 17 10 26 21 26c6 0 11 -2 14 -5c4 -4 6 -9 6 -16zM188 310h29c26 0 64 2 115 6c47 5 91 12 132 21c36 8 69 18 98 29c23 9 46 22 69 39c19 15 34 28 45 41s19 27 26 44c8 19 13 32 14 38c2 9 4 20 6 35c0 2 2 5 5 10c3 4 8 6 14 6c7 0 12 -2 15 -7\ns5 -9 5 -14c0 -33 -12 -70 -36 -110c-47 -78 -143 -131 -288 -159c97 -16 177 -49 238 -98c24 -21 43 -46 57 -73c13 -27 22 -49 25 -64c3 -13 4 -24 4 -33c0 -5 -2 -10 -7 -15c-4 -4 -8 -6 -13 -6c-11 0 -18 9 -21 26c-15 108 -95 179 -240 214c-83 19 -168 29 -256 29\nc-36 0 -56 0 -59 1c-10 5 -15 12 -15 20c0 13 13 20 38 20z"
            },
            "⋟": {
                x: 941,
                d: "M761 444c0 -9 -3 -15 -9 -17s-16 -3 -31 -3c-27 0 -58 2 -91 6c-26 3 -65 11 -116 24c-45 11 -87 30 -126 56c-40 27 -71 58 -92 94c-23 39 -35 75 -35 108c0 6 2 11 7 16c3 3 8 5 13 5c11 0 18 -8 21 -25c5 -38 18 -72 41 -101c23 -30 48 -53 77 -70\nc31 -18 64 -32 101 -43c44 -13 80 -21 107 -24c34 -4 68 -6 103 -6c20 0 30 -7 30 -20zM471 289v1c-95 16 -174 49 -235 98c-23 21 -42 45 -56 72c-15 29 -23 51 -26 64s-4 25 -4 34c0 14 7 21 20 21c11 0 18 -9 21 -26c17 -107 97 -179 240 -214c83 -19 170 -29 263 -29h29\nc25 0 38 -7 38 -20c0 -6 -2 -11 -7 -14c-4 -3 -9 -5 -14 -6c-3 -1 -12 -1 -27 -1c-116 0 -212 -10 -289 -31c-50 -13 -90 -29 -120 -47c-32 -19 -55 -39 -70 -61c-15 -23 -26 -42 -31 -57c-6 -18 -10 -36 -13 -55c-2 -12 -9 -18 -20 -18c-5 0 -10 2 -14 6s-6 9 -6 15\nc0 33 12 70 36 110c47 78 142 131 285 158z"
            },
            "⋠": {
                x: 941,
                d: "M495 293l-162 -390h393c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-410l-59 -142c-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-88c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14\ns2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h104l167 400c-75 16 -161 24 -258 24c-15 0 -25 0 -28 1c-7 1 -11 3 -14 5c-4 3 -6 8 -6 14c0 9 3 15 10 17c6 2 19 3 38 3c115 0 215 11 299 34l165 396c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-144 -346\nc36 14 66 30 89 48c24 18 41 37 52 56s18 36 23 50c3 10 7 25 10 45c2 13 9 19 20 19c13 0 20 -7 20 -21c0 -27 -9 -59 -28 -96c-35 -69 -104 -119 -207 -150l-15 -39c77 -22 138 -55 183 -100c22 -23 39 -51 50 -82c11 -32 17 -55 17 -69c0 -7 -2 -12 -7 -17\nc-3 -3 -8 -5 -13 -5c-11 0 -18 9 -21 28c-16 103 -91 172 -225 208zM442 346l30 -6l5 15l-35 -8v-1z"
            },
            "⋡": {
                x: 941,
                d: "M502 311l-169 -408h393c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-410l-59 -142c-7 -16 -15 -24 -23 -24c-5 0 -10 2 -14 6s-6 9 -6 14s20 53 59 146h-88c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14\ns2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h104l166 399c-77 -14 -139 -40 -186 -79c-44 -35 -70 -85 -79 -148c-2 -12 -9 -18 -20 -18c-6 0 -11 2 -14 5c-4 4 -6 10 -6 17c0 25 8 54 24 87c21 43 54 80 99 110c47 31 112 54 195 70v1c-144 29 -239 84 -286 164c-9 15 -16 32 -21 49\nc-5 18 -8 31 -9 39v5s-2 4 -2 5v3v3c0 14 7 21 20 21c5 0 9 -1 12 -4s5 -6 6 -10c1 -3 2 -8 3 -13c9 -61 38 -109 87 -145c50 -37 121 -63 212 -79l172 412c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-160 -385c40 -5 70 -8 91 -9l109 -3\nc20 0 30 -7 30 -20c0 -9 -3 -15 -9 -17s-17 -3 -32 -3c-88 0 -161 -5 -218 -16z"
            },
            "⋦": {
                x: 965,
                d: "M769 690l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM486 -144l-97 -177c-8 -13 -12 -21 -13 -22\nc-2 -3 -6 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62\nc27 0 53 -7 78 -20c22 -12 50 -33 85 -62l97 177c3 5 8 13 14 22c2 3 6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138s-71 -62 -120 -62\nc-28 0 -54 7 -79 20c-20 11 -48 31 -84 62z"
            },
            "⋧": {
                x: 965,
                d: "M768 420l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -7 20 -15 20 -23c0 -9 -7 -16 -20 -22zM486 -144l-97 -177\nc-8 -13 -12 -21 -13 -22c-2 -3 -6 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138\ns71 62 120 62c27 0 53 -7 78 -20c22 -12 50 -33 85 -62l97 177c3 5 8 13 14 22c2 3 6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138\ns-71 -62 -120 -62c-28 0 -54 7 -79 20c-20 11 -48 31 -84 62z"
            },
            "⋨": {
                x: 965,
                d: "M486 -144l-97 -177c-8 -13 -12 -21 -13 -22c-2 -3 -6 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c27 0 53 -7 78 -20c22 -12 50 -33 85 -62l97 177c3 5 8 13 14 22c2 3 6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32\nc0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-28 0 -54 7 -79 20c-20 11 -48 31 -84 62zM467 442c150 -29 248 -86 294 -173c18 -35 27 -66 27 -95c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 46 -26 86 -57 121c-32 36 -84 64 -156 85c-83 24 -186 36 -307 37\nc-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 229 10 305 31c39 10 72 22 101 37s52 30 67 43c16 14 29 30 39 49c12 23 19 38 21 47c3 13 6 28 9 45c3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88\nc-23 -45 -56 -82 -100 -111s-110 -53 -197 -70z"
            },
            "⋩": {
                x: 965,
                d: "M486 -144l-97 -177c-8 -13 -12 -21 -13 -22c-2 -3 -6 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-21 0 -40 -4 -58 -13c-20 -9 -38 -26 -54 -50c-17 -25 -25 -55 -26 -90c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c27 0 53 -7 78 -20c22 -12 50 -33 85 -62l97 177c3 5 8 13 14 22c2 3 6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 63 43 104c0 20 5 30 14 30s14 -11 14 -32\nc0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-28 0 -54 7 -79 20c-20 11 -48 31 -84 62zM498 442c-98 19 -173 50 -226 92c-27 21 -48 47 -64 78c-17 33 -26 55 -28 68c-2 14 -3 24 -3 31c0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c11 -73 49 -129 114 -168\nc66 -39 161 -64 286 -74c48 -3 88 -5 120 -5c22 0 33 0 34 -1c3 0 5 -1 8 -4c5 -3 8 -8 8 -15c0 -13 -10 -20 -29 -20c-334 -2 -514 -80 -539 -233c-2 -15 -4 -25 -7 -29c-3 -5 -8 -7 -16 -7c-13 0 -20 7 -20 21c0 35 12 72 37 111c47 78 142 130 284 157z"
            },
            "⋪": {
                x: 941,
                d: "M516 435l111 250c7 14 14 21 23 21c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -2 -9 -7 -19l-91 -206l150 72c7 4 13 6 19 6s11 -1 14 -5s5 -8 5 -12s1 -10 1 -18v-508c0 -24 -7 -36 -20 -36c-3 0 -28 11 -74 33l-251 118c-13 -27 -31 -67 -54 -119s-42 -96 -58 -133\ns-26 -57 -27 -58c-9 -5 -15 -7 -16 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 9 25 28 66l111 249l-209 98c-14 7 -21 14 -21 23s7 16 21 23zM491 379l-274 -129l179 -85zM547 406l-115 -258l289 -136v476z"
            },
            "⋫": {
                x: 941,
                d: "M663 667l-132 -296l211 -99c13 -7 19 -14 19 -22c0 -9 -6 -16 -18 -21l-315 -149l-30 -14c-2 -2 -6 -8 -11 -18l-50 -114c-3 -5 -13 -28 -31 -68s-26 -60 -27 -61c-4 -7 -10 -11 -18 -11c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 7 21 22 52l76 172c-109 -52 -166 -78 -169 -78\nc-13 0 -20 12 -20 36v508v17s3 8 6 12s8 6 14 6s12 -2 19 -6l306 -145l132 297c7 14 14 21 23 21c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -2 -9 -7 -19zM419 120l275 130l-179 84zM364 94l115 258l-289 136v-476z"
            },
            "⋬": {
                x: 941,
                d: "M419 207l-248 117c-14 7 -21 14 -21 23s7 16 21 23l370 174l87 236c5 13 10 20 14 22c3 1 5 1 8 1c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -2 -9 -5 -17l-72 -198l129 62c7 4 13 6 19 6s11 -2 14 -6s5 -7 5 -11s1 -10 1 -18v-508c0 -24 -7 -36 -20 -36c-3 0 -13 4 -30 13\nl-256 120l-105 -287h376c8 0 14 -1 18 -1s8 -2 12 -5s5 -8 5 -14c0 -13 -12 -20 -37 -20h-388l-52 -142c-2 -6 -4 -10 -5 -13s-4 -6 -7 -8s-6 -3 -11 -3s-10 2 -14 6s-6 9 -6 14c0 1 9 26 26 74c3 7 11 31 26 72h-106c-25 0 -37 7 -37 20c0 6 2 11 6 14s7 5 11 5s10 1 18 1\nh123zM522 491l-305 -144l215 -102zM469 228l252 -119v476l-148 -70z"
            },
            "⋭": {
                x: 941,
                d: "M739 324l-284 -134l-105 -287h376c8 0 14 -1 18 -1s8 -2 12 -5s5 -8 5 -14c0 -13 -12 -20 -37 -20h-388l-52 -142c-2 -6 -4 -10 -5 -13s-4 -6 -7 -8s-6 -3 -11 -3s-10 2 -14 6s-6 9 -6 14c0 1 9 26 26 74c3 7 11 31 26 72h-106c-25 0 -37 7 -37 20c0 6 2 11 6 14\ns7 5 11 5s10 1 18 1h123l95 262l-217 -102c-8 -4 -13 -6 -16 -6c-13 0 -20 12 -20 36v508v17s3 8 6 12s8 6 14 6c5 0 12 -2 21 -7l325 -154l112 305c5 13 10 20 14 22c3 1 5 1 8 1c5 0 10 -2 14 -6s6 -9 6 -14c0 -3 -2 -8 -5 -17l-113 -308l190 -89c13 -6 19 -13 19 -22\nc0 -6 -2 -10 -5 -13s-8 -6 -17 -10zM694 347l-155 73l-65 -177zM190 109l233 110l80 218l-313 148v-476z"
            },
            "⌈": {
                x: 548,
                d: "M362 710h-172v-924v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v928c0 16 2 26 6 30s14 6 30 6h176c24 0 36 -7 36 -20s-12 -20 -36 -20z"
            },
            "⌉": {
                x: 548,
                d: "M398 714v-928v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v924h-172c-24 0 -36 7 -36 20s12 20 36 20h177c16 0 25 -2 29 -6s6 -13 6 -30z"
            },
            "⌊": {
                x: 548,
                d: "M362 -250h-176c-16 0 -26 2 -30 6s-6 14 -6 30v928c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-18v-924h172c24 0 36 -7 36 -20s-12 -20 -36 -20z"
            },
            "⌋": {
                x: 548,
                d: "M398 714v-928c0 -17 -2 -26 -6 -30s-13 -6 -29 -6h-177c-24 0 -36 7 -36 20s12 20 36 20h172v924c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "⌢": {
                x: 1168,
                d: "M1018 142c0 -7 -3 -10 -10 -10c-4 0 -8 3 -13 9c-47 66 -104 115 -173 146c-73 33 -152 50 -238 50c-94 0 -177 -19 -250 -56c-30 -15 -56 -33 -80 -53s-41 -35 -50 -46s-20 -25 -32 -42c-4 -5 -8 -8 -12 -8c-7 0 -10 3 -10 10c0 3 5 13 16 29s30 35 54 59s52 47 84 69\ns74 41 124 57s101 23 156 23s106 -7 156 -23s92 -35 124 -57s60 -45 84 -69s43 -43 54 -59s16 -26 16 -29z"
            },
            "⌣": {
                x: 1168,
                d: "M1018 358c0 -3 -5 -13 -16 -28s-30 -34 -54 -56s-52 -44 -84 -65s-74 -38 -124 -53s-101 -22 -156 -22s-106 7 -156 22s-92 33 -124 54s-60 42 -84 64s-43 41 -54 56s-16 25 -16 28c0 7 3 10 10 10c4 0 7 -2 10 -5c43 -57 94 -100 154 -131c76 -37 163 -56 260 -56\nc183 0 320 61 412 184c3 5 7 8 12 8c7 0 10 -3 10 -10z"
            },
            "⌭": {
                x: 798,
                d: "M612 773h-426c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h428c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14c0 -13 -12 -20 -36 -20zM421 406l221 -465c4 -10 6 -16 6 -18c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-9 0 -17 6 -22 19l-207 437l-207 -436c0 -1 0 -1 -1 -2\nc-6 -12 -13 -18 -21 -18c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 2 11 7 20l220 462c6 13 13 20 22 20s16 -6 22 -19zM185 619h428c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14c0 -13 -12 -20 -36 -20h-426c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "⌮": {
                x: 941,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM726 -174h-250v-64c0 -25 -7 -38 -20 -38\nc-6 0 -11 2 -14 6c-4 5 -6 9 -6 10v17v69h-251h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h250v154h-251h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h250v69v17c0 1 2 5 6 10c3 4 8 6 14 6c13 0 20 -13 20 -38v-64h249c24 0 36 -7 36 -20\nc0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-250v-154h249c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "⌯": {
                x: 941,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -7 20 -15 20 -23c0 -9 -7 -16 -20 -22zM726 -174h-250v-64\nc0 -25 -7 -38 -20 -38c-6 0 -11 2 -14 6c-4 5 -6 9 -6 10v17v69h-251h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h250v154h-251h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h250v69v17c0 1 2 5 6 10c3 4 8 6 14 6c13 0 20 -13 20 -38v-64h249\nc24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-250v-154h249c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17z"
            },
            "⌰": {
                x: 941,
                d: "M613 651l-110 -323l127 -59l124 -59c5 -9 7 -14 7 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-4 0 -23 8 -57 25l-62 30c-9 5 -23 11 -40 19s-27 13 -30 14c-5 3 -13 6 -22 10c-2 1 -4 1 -6 2l-6 4c-2 1 -3 1 -4 2c-3 1 -6 3 -10 4l-4 2c-1 1 -1 1 -2 1l-4 2c0 1 -1 1 -2 1\ns-1 0 -2 1l-78 -231h314h18c3 0 7 -2 12 -6c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-326l-52 -154h380h18c3 0 7 -2 12 -6c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-392l-76 -222c-5 -16 -13 -24 -22 -24c-5 0 -10 2 -14 6s-6 9 -6 14c0 2 2 9 5 20l71 206h-103\nc-25 0 -37 7 -37 20c0 7 2 11 6 14c5 4 9 6 11 6h18h118l53 154h-169c-25 0 -37 7 -37 20c0 7 2 11 6 14c5 4 9 6 11 6h18h185l84 248l-283 133c-14 7 -21 15 -21 23s7 16 21 23l410 193l74 216c5 16 12 24 22 24c6 0 11 -2 15 -6c3 -3 5 -8 5 -14c0 -2 -2 -9 -5 -20\nl-60 -176c67 33 104 49 109 49c6 0 11 -2 14 -5c4 -4 6 -9 6 -15c0 -5 -1 -9 -4 -11c-6 -4 -12 -8 -18 -11zM217 464l250 -118l96 281z"
            },
            "⌱": {
                x: 941,
                d: "M739 441l-235 -111l-92 -270h314h18c3 0 7 -2 12 -6c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-326l-52 -154h380h18c3 0 7 -2 12 -6c3 -3 5 -7 5 -14c0 -13 -12 -20 -37 -20h-392l-76 -222c-5 -16 -13 -24 -22 -24c-5 0 -10 2 -14 6s-6 9 -6 14c0 2 2 9 5 20l71 206h-103\nc-25 0 -37 7 -37 20c0 7 2 11 6 14c5 4 9 6 11 6h18h118l53 154h-169c-25 0 -37 7 -37 20c0 7 2 11 6 14c5 4 9 6 11 6h18h185l84 246l-268 -126c-8 -4 -13 -6 -16 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l302 142l61 181l-361 171c-7 3 -11 6 -13 7s-4 3 -7 6\nc-1 1 -2 4 -2 9c0 6 2 11 6 15c3 3 8 5 14 5c5 0 12 -2 21 -7l355 -168l109 318c5 16 12 24 22 24c6 0 11 -2 15 -6c3 -3 5 -8 5 -14c0 -2 -2 -9 -5 -20l-109 -319l159 -75c13 -7 19 -14 19 -22c0 -5 -2 -10 -5 -13s-8 -6 -17 -10zM694 464l-124 59l-48 -141z"
            },
            "⌲": {
                x: 941,
                d: "M591 523l-123 -295l271 -127c2 -1 4 -2 7 -3l3 -2c1 -1 3 -3 6 -5c2 -1 4 -3 5 -6c1 -1 1 -4 1 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -49 21 -137 63l-152 71l-51 -125l340 -160c13 -6 20 -14 20 -23c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -13 4 -30 13l-250 118\nc-1 0 -1 1 -3 2s-5 2 -8 3s-7 3 -11 5c-9 4 -20 9 -35 16c-3 1 -6 3 -9 4l-6 3l-2 1c-3 0 -5 -4 -8 -13l-130 -312c-4 -4 -9 -6 -15 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 2 10 6 19l129 311l-172 81c-10 5 -16 7 -17 8c-3 2 -5 4 -7 7s-3 7 -3 10c0 5 2 10 6 14s9 6 14 6\nl45 -20c13 -7 22 -11 27 -13c17 -7 25 -11 26 -11l97 -46l52 125l-246 116c-14 7 -21 14 -21 23s7 16 21 23l389 183l102 244c4 4 9 6 15 6s11 -2 15 -6c3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-77 -186l108 52c7 4 13 6 19 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -1 -10 -4 -12\nc-1 -1 -1 -1 -3 -2s-5 -2 -8 -4s-5 -3 -7 -4zM217 347l215 -102l105 253z"
            },
            "⌳": {
                x: 941,
                d: "M739 130l-388 -183l-102 -244c-4 -4 -9 -6 -15 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 3 2 10 6 19l77 185c-80 -39 -122 -58 -127 -58s-10 2 -14 6s-6 9 -6 14c0 7 1 11 4 13c6 4 14 9 25 14l140 65c0 1 1 3 3 6s3 9 6 16s7 15 10 23c3 9 9 23 17 42s14 33 19 44\nc4 9 8 18 11 26s6 15 8 20s3 9 4 10l-211 -99c-8 -4 -13 -6 -16 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l250 118l90 216l-338 160c-2 1 -4 2 -7 3l-6 3s-4 3 -7 6c-1 1 -2 5 -2 10s2 10 6 14s9 6 14 6s12 -2 21 -7l335 -158l136 326c4 4 9 6 15 6s11 -2 15 -6\nc3 -3 5 -8 5 -14c0 -3 -2 -10 -6 -19l-129 -311l180 -84c13 -6 19 -13 19 -22c0 -5 -2 -10 -5 -13s-8 -6 -17 -10l-288 -136l-77 -186l86 40l100 48l142 67c22 11 35 16 39 16c5 0 10 -2 14 -6s6 -9 6 -14s-2 -10 -5 -13s-8 -6 -17 -10zM546 417l-72 -174l220 104z"
            },
            "⏐": {
                x: 340,
                d: "M190 396v-383v-17c0 -3 -2 -7 -6 -12c-3 -4 -7 -6 -14 -6s-11 2 -14 6c-4 5 -6 9 -6 12v17v382c0 24 7 36 20 36c7 0 11 -2 14 -6c4 -5 6 -9 6 -12v-17z"
            },
            "⏑": {
                x: 576,
                d: "M190 393v-377c0 -25 -7 -38 -20 -38c-7 0 -11 2 -14 6c-4 5 -6 9 -6 11v17v385v17c0 3 2 7 6 12c3 3 7 5 14 5c13 0 20 -13 20 -38zM426 397v-385v-17c0 -2 -2 -6 -6 -11c-3 -4 -7 -6 -14 -6c-13 0 -20 13 -20 38v377c0 25 7 38 20 38c7 0 11 -2 14 -5c4 -5 6 -9 6 -12\nv-17z"
            },
            "⏒": {
                x: 561,
                d: "M301 243v-230c0 -3 -1 -5 -1 -9v-8c0 -3 -2 -7 -5 -12c-3 -4 -8 -6 -14 -6s-11 2 -14 6c-3 5 -5 9 -5 12v8s-1 6 -1 9v187c-15 -15 -29 -29 -41 -42l-27 -28c-11 -9 -18 -14 -23 -14s-10 2 -14 6s-6 9 -6 14c0 4 5 11 14 22l22 23l75 77v137c0 24 7 36 20 36\nc6 0 11 -2 14 -6c3 -5 5 -9 5 -12v-7s1 -7 1 -10v-95l23 23c3 3 8 8 14 15s11 11 14 14l15 15c10 11 18 16 24 16s11 -2 15 -6c3 -3 5 -8 5 -14c0 -5 -4 -13 -13 -22l-22 -22c-25 -28 -50 -54 -75 -77z"
            },
            "⏓": {
                x: 728,
                d: "M266 215l196 116v62c0 25 7 38 20 38c7 0 11 -2 14 -5c4 -5 6 -9 6 -12v-17v-42c18 10 27 15 27 16c13 9 23 13 29 13c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -4 -12 -13 -19l-63 -37v-296v-17c0 -2 -2 -6 -6 -11c-3 -4 -7 -6 -14 -6c-13 0 -20 13 -20 38v269l-196 -116v-153\nc0 -25 -7 -38 -20 -38c-7 0 -11 2 -14 6c-4 5 -6 9 -6 11v17v133c-18 -10 -27 -15 -27 -16c-13 -9 -23 -13 -29 -13c-5 0 -10 2 -14 6s-6 9 -6 14c0 6 4 12 13 19l63 37v205v17c0 3 2 7 6 12c3 3 7 5 14 5c13 0 20 -13 20 -38v-178z"
            },
            "⏔": {
                x: 941,
                d: "M546 57l-129 -154h309c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-343l-74 -90c-9 -10 -15 -16 -17 -18s-6 -3 -11 -3c-6 0 -11 2 -15 6s-5 9 -5 14s4 13 13 22c3 4 12 14 27 32s25 30 30 37h-126c-7 0 -13 1 -17 1s-8 2 -12 5\ns-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h160l128 154c-32 0 -58 1 -77 3s-44 8 -76 20s-63 29 -90 52c-67 57 -100 128 -100 215c0 81 30 149 90 205s131 84 216 84h270h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-267c-77 0 -141 -25 -192 -74\ns-77 -107 -77 -176c0 -67 25 -126 76 -175s115 -74 194 -74h68l74 90c9 10 16 16 18 18s5 3 10 3c6 0 10 -2 14 -6s6 -9 6 -14s-4 -13 -13 -22c-3 -4 -12 -14 -27 -32s-25 -30 -30 -37h146c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1\nh-180z"
            },
            "⏕": {
                x: 941,
                d: "M706 -137h-452l-60 -91c-9 -13 -17 -20 -24 -20c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 4 12 12 25l44 66h-37c-13 1 -19 8 -19 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h49l102 154h-151c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h178l61 91\nc9 13 17 20 24 20s12 -2 15 -6s5 -9 5 -14s-4 -13 -13 -25l-44 -66h41c77 0 141 24 192 73s77 108 77 177c0 67 -25 126 -76 175s-115 74 -194 74h-266h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h269c85 0 158 -28 218 -84s89 -125 89 -206s-29 -149 -89 -205\ns-132 -84 -217 -84h-71l-102 -154h424c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⏖": {
                x: 941,
                d: "M645 174l-99 -154h180h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-206l-99 -154h305h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-331l-59 -91c-7 -12 -13 -18 -18 -19c-1 -1 -3 -1 -5 -1c-6 0 -11 2 -15 6s-5 9 -5 14s4 14 13 27l41 64\nh-162h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h188l99 154h-287h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h313l99 154h-140c-85 0 -157 28 -217 84s-90 125 -90 206s30 149 90 205s131 84 216 84h270c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14\ns-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-267c-77 0 -141 -24 -192 -73s-77 -108 -77 -177c0 -67 25 -126 76 -175s115 -74 194 -74h163l58 91c6 9 11 15 13 17s6 3 11 3s10 -2 14 -6s6 -9 6 -14s-4 -14 -13 -27c-19 -28 -32 -49 -41 -64h55h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17h-81z"
            },
            "⏗": {
                x: 941,
                d: "M423 174l-63 -154h366h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-382l-63 -154h445h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-461l-32 -79c-5 -11 -8 -18 -10 -21s-5 -6 -7 -8s-5 -3 -10 -3s-10 2 -14 6s-6 9 -6 14c0 3 6 17 17 44\nl18 47h-46c-17 0 -25 7 -25 20c0 6 2 11 6 14s8 6 12 6h17h53l63 154h-116h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h132l63 154h-195h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h212c15 37 27 68 38 92c4 13 11 19 20 19c13 0 20 -7 20 -20\nc0 -3 -5 -18 -16 -45l-19 -46c81 0 148 23 199 69c55 48 82 108 82 181c0 67 -25 126 -76 175s-115 74 -194 74h-266c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h269c85 0 158 -28 218 -84s89 -125 89 -206c0 -46 -9 -88 -29 -125\ns-43 -65 -68 -86c-22 -19 -44 -34 -65 -45s-43 -19 -66 -23s-41 -7 -55 -8s-32 -2 -55 -2z"
            },
            "▪": {
                x: 465,
                d: "M315 152v-117c0 -16 -2 -25 -6 -29s-14 -6 -29 -6h-94c-17 0 -26 2 -30 6s-6 14 -6 30v116c0 16 2 26 6 30s14 5 29 5h95c16 0 26 -2 30 -6s5 -14 5 -29z"
            },
            "◦": {
                x: 689,
                d: "M539 250c0 -53 -19 -99 -57 -137s-84 -57 -137 -57c-54 0 -100 19 -138 57s-57 84 -57 137s19 98 57 136s84 58 138 58c53 0 99 -19 137 -57s57 -84 57 -137zM345 96c42 0 79 15 109 45s45 66 45 109s-15 79 -45 109s-67 45 -109 45c-43 0 -79 -16 -109 -46\ns-46 -66 -46 -108s15 -78 45 -108s67 -46 110 -46z"
            },
            "◯": {
                x: 1189,
                d: "M1039 250c0 -129 -44 -239 -131 -330s-191 -136 -314 -136c-79 0 -154 21 -222 62s-122 96 -162 168s-60 151 -60 236c0 129 43 239 130 330s192 136 315 136c79 0 153 -21 221 -62s123 -96 163 -168s60 -151 60 -236zM595 -176c111 0 206 41 285 124s119 183 119 302\nc0 118 -40 219 -119 302s-174 124 -286 124c-111 0 -207 -41 -286 -124s-118 -183 -118 -302c0 -118 39 -219 118 -302s175 -124 287 -124z"
            },
            "⟵": {
                x: 1544,
                d: "M259 282h1102c14 0 23 -2 27 -6s6 -9 6 -14s-2 -10 -6 -14s-12 -6 -25 -6l-1104 -1c14 -9 29 -22 44 -37c31 -31 55 -66 74 -106c16 -43 24 -71 24 -84c0 -5 -1 -8 -2 -9c-2 -2 -7 -3 -16 -3s-15 1 -17 3c-1 1 -3 6 -5 13c-13 62 -42 115 -86 159c-33 33 -70 57 -111 72\nc-5 3 -9 5 -10 6c-3 3 -4 5 -4 7s1 4 4 7c2 2 6 4 11 6c38 13 75 37 110 72c45 45 73 98 86 159c1 6 2 10 5 13c2 2 8 3 17 3s14 -1 16 -3c1 -1 2 -5 2 -10c0 -7 -8 -35 -24 -83c-19 -40 -43 -75 -74 -106c-15 -15 -30 -28 -44 -38z"
            },
            "⟶": {
                x: 1544,
                d: "M1285 241l-1102 1c-14 0 -23 2 -27 6s-6 9 -6 14s2 10 6 14s13 6 26 6l1103 1c-14 9 -29 22 -44 37c-31 31 -55 66 -74 106c-16 43 -24 71 -24 84c0 5 1 8 2 9c2 2 8 3 17 3s14 -1 16 -3c3 -3 5 -7 6 -13c13 -63 42 -116 85 -159c33 -33 70 -57 111 -72c7 -3 10 -5 11 -6\nc2 -2 3 -4 3 -7s-1 -5 -3 -7s-6 -4 -12 -6c-38 -13 -75 -37 -110 -72c-44 -44 -72 -97 -85 -159c-1 -5 -3 -10 -6 -13c-2 -2 -7 -3 -16 -3s-15 1 -17 3c-1 1 -2 5 -2 10c0 7 8 35 24 83c19 40 43 75 74 106c13 13 28 26 44 37z"
            },
            "⟷": {
                x: 1824,
                d: "M259 270h1306c-36 27 -67 59 -92 97c-13 20 -23 41 -31 63s-14 38 -16 49s-4 17 -4 20c0 8 7 12 20 12c8 0 14 -1 16 -3s4 -5 5 -12c26 -115 94 -193 203 -235c5 -3 8 -6 8 -11s-5 -10 -15 -13c-104 -43 -169 -119 -195 -228c-2 -9 -4 -15 -6 -17s-8 -3 -16 -3\nc-13 0 -20 4 -20 12c0 3 2 9 4 19s7 28 16 50s20 43 33 64c21 34 51 66 90 96h-1306c36 -27 67 -59 92 -97c13 -20 23 -41 31 -63s14 -38 16 -49s4 -17 4 -20c0 -8 -7 -12 -20 -12c-8 0 -14 1 -16 3s-4 5 -5 12c-25 111 -90 189 -196 233c-10 4 -15 8 -15 13s5 10 15 13\nc105 43 170 119 195 228c2 9 4 15 6 17s8 3 16 3c13 0 20 -4 20 -12c0 -3 -2 -9 -4 -19s-7 -28 -16 -50s-20 -43 -33 -64c-21 -34 -51 -66 -90 -96z"
            },
            "⟸": {
                x: 1594,
                d: "M1409 133h-997c22 -21 44 -49 66 -83s34 -56 34 -64c0 -7 -6 -11 -19 -11c-7 0 -11 1 -14 3s-7 8 -12 18c-29 55 -69 104 -119 146s-107 73 -172 92c-11 3 -18 6 -22 8l-3 2c-1 1 -1 3 -1 6s1 5 2 6c2 2 9 5 20 9c71 21 133 55 188 103c20 18 38 37 54 58s28 36 34 46\ns15 26 26 45c3 5 9 8 19 8c13 0 19 -4 19 -11c0 -8 -12 -29 -34 -64s-44 -62 -66 -83h997c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-1041c-34 -29 -76 -55 -126 -77c51 -23 93 -49 126 -77h1041c8 0 14 -1 18 -1s8 -2 12 -5\ns6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "⟹": {
                x: 1594,
                d: "M185 367h997c-22 21 -44 49 -66 83s-34 56 -34 64c0 7 6 11 19 11c7 0 11 -1 14 -3s7 -8 12 -18c29 -55 69 -104 119 -146s107 -73 172 -92c11 -3 18 -6 22 -8l3 -2c1 -1 1 -3 1 -6s-1 -5 -2 -6c-2 -2 -9 -5 -20 -9c-71 -21 -133 -55 -188 -103c-20 -18 -38 -37 -54 -58\ns-28 -36 -34 -46s-15 -26 -26 -45c-3 -5 -9 -8 -19 -8c-13 0 -19 4 -19 11c0 8 12 29 34 64s44 62 66 83h-997c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 18 1h1041c34 29 76 55 126 77c-51 23 -93 49 -126 77h-1041c-8 0 -14 1 -18 1s-8 2 -12 5\ns-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "⟺": {
                x: 1694,
                d: "M370 367h954c-17 19 -34 41 -48 64s-24 42 -30 56s-9 23 -9 26c0 8 7 12 20 12c11 0 17 -3 20 -10c52 -119 133 -201 243 -247c13 -6 21 -10 23 -12c1 -1 1 -3 1 -6s-1 -6 -3 -7s-7 -4 -14 -7c-115 -49 -197 -129 -246 -240c-5 -10 -8 -16 -10 -18s-7 -3 -14 -3\nc-13 0 -20 4 -20 12c0 3 3 12 9 26s16 33 30 56s31 45 48 64h-954c17 -19 34 -41 48 -64s24 -42 30 -56s9 -23 9 -26c0 -8 -7 -12 -20 -12c-11 0 -17 3 -20 10c-52 119 -133 201 -243 247c-13 6 -21 10 -23 12c-1 1 -1 3 -1 6s1 6 3 7s7 4 14 7c115 49 197 129 246 240\nc5 10 8 16 10 18s7 3 14 3c13 0 20 -4 20 -12c0 -3 -3 -12 -9 -26s-16 -33 -30 -56s-31 -45 -48 -64zM331 173h1032c25 25 60 51 105 77c-43 25 -78 51 -105 77h-1032c-25 -25 -60 -51 -105 -77c43 -25 78 -51 105 -77z"
            },
            "⩽": {
                x: 941,
                d: "M742 594l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM723 -130l-553 260c-13 6 -20 13 -20 22\nc0 5 2 10 6 14s9 6 14 6c4 0 10 -2 19 -7l552 -260c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7z"
            },
            "⩾": {
                x: 941,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -261c13 -6 20 -13 20 -22s-7 -16 -20 -22zM741 130l-553 -260c-9 -5 -15 -7 -18 -7\nc-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l566 267c17 0 26 -7 26 -20c0 -9 -7 -16 -20 -22z"
            },
            "⪅": {
                x: 965,
                d: "M765 719l-516 -217l518 -217l8 -4l6 -4c2 -1 4 -3 5 -6s2 -5 2 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-4 0 -10 2 -19 6l-550 231c-15 7 -22 14 -22 22c0 9 7 17 22 23l551 231c11 4 17 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -2 -11 -5 -14s-9 -6 -18 -9zM815 -125\nc0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-22 0 -43 4 -62 11c-23 9 -40 16 -50 22c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8\nc-9 0 -14 10 -14 30c0 45 16 84 48 116c31 31 71 47 118 47c22 0 43 -4 62 -11c23 -9 40 -16 50 -22c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108\nc0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-21 0 -41 4 -62 12c-27 10 -43 17 -50 21c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9\nc-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48c20 0 41 -4 62 -12c27 -10 43 -17 50 -21c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "⪆": {
                x: 965,
                d: "M766 480l-550 -231c-9 -4 -15 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14s1 8 3 11c1 2 4 4 8 6l12 6l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM815 -125c0 -45 -16 -83 -48 -115\nc-31 -31 -71 -47 -118 -47c-22 0 -43 4 -62 11c-23 9 -40 16 -50 22c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8c-9 0 -14 10 -14 30\nc0 45 16 84 48 116c31 31 71 47 118 47c22 0 43 -4 62 -11c23 -9 40 -16 50 -22c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108\nc0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-21 0 -41 4 -62 12c-27 10 -43 17 -50 21c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9\nc-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48c20 0 41 -4 62 -12c27 -10 43 -17 50 -21c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "⪇": {
                x: 941,
                d: "M742 594l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM726 -137h-262l-81 -81c-9 -11 -17 -16 -24 -16\nc-13 0 -20 7 -20 20c0 5 4 13 13 22c19 18 37 36 55 55h-222c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h262l80 81c11 11 19 16 24 16s9 -1 12 -4s5 -6 6 -8c1 -4 2 -7 2 -8c0 -6 -5 -14 -15 -24l-52 -53h220c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1z"
            },
            "⪈": {
                x: 941,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -261c13 -6 20 -13 20 -22s-7 -16 -20 -22zM726 -137h-262l-81 -81\nc-9 -11 -17 -16 -24 -16c-13 0 -20 7 -20 20c0 5 4 13 13 22c19 18 37 36 55 55h-222c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14c0 13 12 20 36 20h262l80 81c11 11 19 16 24 16s9 -1 12 -4s5 -6 6 -8c1 -4 2 -7 2 -8c0 -6 -5 -14 -15 -24l-52 -53h220\nc24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1z"
            },
            "⪉": {
                x: 965,
                d: "M765 719l-516 -217l518 -217l8 -4l6 -4c2 -1 4 -3 5 -6s2 -5 2 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-4 0 -10 2 -19 6l-550 231c-15 7 -22 14 -22 22c0 9 7 17 22 23l551 231c11 4 17 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -2 -11 -5 -14s-9 -6 -18 -9zM445 -214\nl-60 -145c-5 -13 -13 -20 -22 -20c-5 0 -10 2 -13 5c-5 5 -7 9 -7 14c0 1 25 61 74 181c-33 20 -67 30 -101 30c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116c31 31 71 47 118 47\nc35 0 70 -10 105 -30c7 -5 12 -7 14 -7c1 0 3 4 8 13l51 123c-49 32 -83 53 -103 62c-22 11 -47 16 -75 16c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48c43 0 95 -20 156 -60\nc23 -17 37 -26 40 -26s5 4 8 13l60 145c5 13 13 20 22 20c5 0 10 -2 14 -6s6 -8 6 -13c0 -1 -25 -61 -74 -181c33 -20 67 -30 101 -30c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -44 -16 -82 -48 -114s-71 -48 -118 -48\nc-35 0 -70 10 -105 30c-7 5 -12 7 -14 7c-1 0 -4 -4 -8 -13l-51 -123c45 -29 79 -50 103 -61s49 -17 75 -17c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-43 0 -95 20 -156 60\nc-23 17 -37 26 -40 26s-5 -4 -8 -13z"
            },
            "⪊": {
                x: 965,
                d: "M766 480l-550 -231c-9 -4 -15 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14s1 8 3 11c1 2 4 4 8 6l12 6l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM445 -214l-60 -145\nc-5 -13 -13 -20 -22 -20c-5 0 -10 2 -13 5c-5 5 -7 9 -7 14c0 1 25 61 74 181c-33 20 -67 30 -101 30c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116c31 31 71 47 118 47c35 0 70 -10 105 -30\nc7 -5 12 -7 14 -7c1 0 3 4 8 13l51 123c-49 32 -83 53 -103 62c-22 11 -47 16 -75 16c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48c43 0 95 -20 156 -60c23 -17 37 -26 40 -26\ns5 4 8 13l60 145c5 13 13 20 22 20c5 0 10 -2 14 -6s6 -8 6 -13c0 -1 -25 -61 -74 -181c33 -20 67 -30 101 -30c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-35 0 -70 10 -105 30c-7 5 -12 7 -14 7\nc-1 0 -4 -4 -8 -13l-51 -123c45 -29 79 -50 103 -61s49 -17 75 -17c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-43 0 -95 20 -156 60c-23 17 -37 26 -40 26s-5 -4 -8 -13z"
            },
            "⪋": {
                x: 941,
                d: "M737 960l-509 -188l512 -189c14 -5 21 -12 21 -22c0 -5 -2 -10 -7 -15c-3 -3 -8 -5 -13 -5c-3 0 -9 2 -18 6l-552 203c-14 5 -21 13 -21 22s8 17 23 23l549 202c10 4 16 6 19 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -24 -23zM174 -420l509 188l-512 189\nc-14 5 -21 12 -21 22c0 6 2 11 6 15c3 3 8 5 14 5c3 0 9 -2 18 -6l552 -203c14 -6 21 -13 21 -22s-8 -17 -23 -23l-549 -202c-10 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 10 8 18 24 23zM185 193h541c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14\nc0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1zM185 387h541c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1\nh-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "⪌": {
                x: 941,
                d: "M738 749l-550 -202c-9 -4 -15 -6 -18 -6c-6 0 -11 2 -14 5c-4 4 -6 9 -6 15c0 9 8 17 23 23l510 188l-512 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 19 -6l551 -203c14 -5 21 -13 21 -22c0 -10 -8 -18 -23 -23zM738 -44l-510 -188l512 -189\nc14 -5 21 -12 21 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -19 6l-551 203c-14 5 -21 12 -21 22c0 11 8 18 24 23l549 202c9 4 15 6 18 6c5 0 10 -2 13 -5c5 -5 7 -10 7 -15c0 -9 -8 -17 -23 -23zM726 153h-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14\nc0 13 12 20 36 20h539c3 0 7 -1 11 -1h7c3 0 7 -2 12 -5c4 -3 6 -7 6 -14c0 -6 -2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1zM725 347h-539c-24 0 -36 7 -36 20c0 6 2 11 6 14c5 3 9 5 12 5h8s6 1 9 1h541c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14\ns-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-8 -1 -11 -1z"
            },
            "⪕": {
                x: 941,
                d: "M742 594l-556 -262c-9 -3 -14 -5 -16 -5c-5 0 -10 2 -14 6s-6 8 -6 13c0 9 7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM723 -130l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 9 -2 13 -6\nc5 -5 7 -9 7 -14c0 -8 -6 -15 -19 -22l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7z"
            },
            "⪖": {
                x: 941,
                d: "M723 333l-553 261c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -261c13 -6 20 -13 20 -21c0 -7 -2 -12 -7 -15s-9 -5 -13 -5c-3 0 -9 2 -18 6zM741 130l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22\nl525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6s11 -2 20 -7l551 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22z"
            },
            "⪯": {
                x: 941,
                d: "M439 346c97 -19 172 -49 225 -90c27 -21 49 -47 65 -77c15 -29 25 -51 28 -67c3 -13 4 -24 4 -33c0 -15 -7 -22 -20 -22c-11 0 -18 7 -21 22c-2 15 -4 26 -6 35s-8 23 -17 42c-9 17 -20 33 -35 48c-17 17 -37 33 -60 46c-24 14 -55 27 -94 39c-83 24 -186 36 -308 37\nc-16 0 -26 0 -30 1c-6 1 -11 3 -14 5c-4 3 -6 7 -6 14c0 13 10 20 29 20c165 1 292 20 383 57s143 98 157 184c3 19 11 29 22 29c5 0 10 -2 14 -6s6 -9 6 -16c0 -9 -2 -22 -7 -40c-5 -21 -12 -39 -20 -54c-48 -88 -146 -146 -295 -174zM185 -97h541c3 0 6 -1 10 -1h7\nc3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "⪰": {
                x: 941,
                d: "M472 346c-58 11 -107 26 -146 44c-42 19 -73 39 -93 58c-19 18 -36 41 -53 68c-8 13 -15 31 -22 54c-5 18 -8 33 -8 44c0 7 2 12 6 16s9 6 14 6c11 0 18 -8 21 -24c9 -53 30 -96 63 -129c77 -77 229 -116 457 -117c17 0 27 0 31 -1c6 -1 11 -3 14 -5c3 -3 5 -7 5 -14\nc0 -13 -10 -20 -29 -20c-145 -1 -256 -14 -335 -39c-33 -11 -62 -24 -89 -39c-25 -15 -45 -29 -60 -44s-26 -30 -34 -46c-9 -17 -14 -31 -16 -42c0 -1 -1 -6 -3 -14s-3 -15 -4 -20c-2 -17 -9 -25 -21 -25c-13 0 -20 7 -20 22c0 9 1 20 4 33c3 15 13 37 28 66\nc17 31 38 57 64 77c51 41 127 71 226 91zM185 -97h541c3 0 6 -1 10 -1h7c3 0 7 -2 12 -5c4 -3 6 -8 6 -14s-2 -11 -6 -14c-5 -3 -9 -5 -12 -5h-7s-7 -1 -10 -1h-541c-3 0 -5 1 -9 1h-8c-3 0 -7 2 -12 5c-4 3 -6 8 -6 14s2 11 6 14c5 3 9 5 12 5h8s6 1 9 1z"
            },
            "⪵": {
                x: 941,
                d: "M217 443h-29c-25 0 -38 7 -38 20c0 7 2 12 6 15c3 2 8 4 15 5c3 1 12 1 27 1c116 0 212 10 289 31c50 13 90 29 120 47c32 19 56 40 71 62s25 41 30 56c6 18 10 36 13 55c2 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -33 -12 -70 -36 -110\nc-47 -78 -143 -131 -288 -159c97 -16 177 -49 238 -98c25 -21 44 -45 57 -72s22 -49 25 -64c3 -13 4 -25 4 -34c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-17 107 -97 179 -240 214c-83 19 -170 29 -263 29zM557 20l-147 -154h315c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14\nc-5 -4 -9 -6 -12 -6h-17h-355c-34 -37 -61 -65 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c3 3 5 5 7 8s4 5 7 8c22 25 38 41 47 49h-131h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h168l147 154h-316h-17c-3 0 -7 2 -12 6\nc-4 3 -6 8 -6 14c0 13 12 20 36 20h354c34 37 61 65 80 84c13 12 22 18 26 18c5 0 10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18l-2 -3l-5 -5l-5 -5l-2 -3c-22 -25 -38 -41 -47 -49h130c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-169z"
            },
            "⪶": {
                x: 941,
                d: "M723 443h-29c-25 0 -64 -2 -115 -6c-120 -11 -212 -36 -275 -73c-65 -38 -102 -92 -113 -162c-3 -19 -10 -28 -21 -28c-13 0 -20 7 -20 21c0 33 12 70 36 110c47 78 142 131 285 158v1c-95 16 -174 49 -235 98c-23 21 -42 45 -56 72c-15 29 -23 51 -26 64s-4 25 -4 34\nc0 6 2 11 6 15s9 6 14 6c11 0 18 -9 21 -26c17 -107 97 -179 240 -214c87 -19 174 -29 262 -29c30 0 48 -1 53 -2c10 -1 15 -8 15 -19c0 -13 -13 -20 -38 -20zM557 20l-147 -154h315c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-355\nc-34 -37 -61 -65 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c3 3 5 5 7 8s4 5 7 8c22 25 38 41 47 49h-131h-17c-3 0 -7 2 -12 6c-4 3 -6 7 -6 14c0 13 12 20 36 20h168l147 154h-316h-17c-3 0 -7 2 -12 6c-4 3 -6 8 -6 14c0 13 12 20 36 20h354\nc34 37 61 65 80 84c13 12 22 18 26 18c5 0 10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18l-2 -3l-5 -5l-5 -5l-2 -3c-22 -25 -38 -41 -47 -49h130c24 0 36 -7 36 -20c0 -7 -2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-169z"
            },
            "⪷": {
                x: 965,
                d: "M467 442c150 -29 248 -86 294 -173c18 -35 27 -66 27 -95c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 46 -26 86 -57 121c-32 36 -84 64 -156 85c-83 24 -186 36 -307 37c-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 229 10 305 31\nc39 10 72 22 101 37s52 30 67 43c16 14 29 30 39 49c12 23 19 38 21 47c3 13 6 28 9 45c3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88c-23 -45 -56 -82 -100 -111s-110 -53 -197 -70zM815 -125c0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47\nc-22 0 -43 4 -62 11c-23 9 -40 16 -50 22c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116c31 31 71 47 118 47\nc22 0 43 -4 62 -11c23 -9 40 -16 50 -22c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108c0 -44 -16 -82 -48 -114s-71 -48 -118 -48\nc-21 0 -41 4 -62 12c-27 10 -43 17 -50 21c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48\nc20 0 41 -4 62 -12c27 -10 43 -17 50 -21c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "⪸": {
                x: 965,
                d: "M740 422c-64 0 -121 -3 -172 -10c-55 -7 -108 -19 -158 -34c-51 -16 -94 -40 -128 -72c-35 -33 -55 -72 -62 -117c-2 -15 -4 -25 -7 -29c-3 -5 -8 -7 -16 -7c-13 0 -20 7 -20 21c0 35 12 72 37 111c47 77 140 129 281 156v1c-97 19 -171 50 -223 92c-27 21 -48 47 -64 78\nc-17 33 -26 55 -28 68c-2 14 -3 24 -3 31c0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c9 -67 42 -120 100 -159c57 -39 143 -65 256 -78c51 -7 106 -10 166 -10h13h17c3 0 7 -2 12 -6c4 -3 6 -7 6 -14s-2 -11 -6 -14c-5 -4 -9 -6 -12 -6h-17h-13zM815 -125\nc0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-22 0 -43 4 -62 11c-23 9 -40 16 -50 22c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -2 -1 -7 -4 -15c-2 -5 -5 -8 -10 -8\nc-9 0 -14 10 -14 30c0 45 16 84 48 116c31 31 71 47 118 47c22 0 43 -4 62 -11c23 -9 40 -16 50 -22c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c36 0 67 10 94 31c26 21 41 45 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108\nc0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-21 0 -41 4 -62 12c-27 10 -43 17 -50 21c-12 7 -28 17 -48 30c-35 23 -57 37 -64 41c-15 9 -32 16 -51 23c-21 7 -40 11 -58 11c-32 0 -63 -10 -92 -29s-44 -47 -46 -85c0 -1 -1 -6 -4 -14c-2 -6 -5 -9 -10 -9\nc-9 0 -14 10 -14 30c0 45 16 83 48 115s71 48 118 48c20 0 41 -4 62 -12c27 -10 43 -17 50 -21c12 -7 28 -17 48 -30c35 -23 57 -37 64 -41c15 -9 32 -16 51 -23c21 -7 40 -11 58 -11c35 0 67 11 94 32c26 21 41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "⪹": {
                x: 965,
                d: "M439 -114l60 117c-47 31 -82 52 -105 63c-26 12 -52 18 -78 18c-20 0 -39 -3 -57 -10c-19 -7 -37 -19 -54 -38c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116c33 31 72 47 118 47c33 0 71 -11 114 -34c9 -5 23 -13 41 -26\nc6 -5 23 -15 50 -32c10 18 20 38 31 60c15 30 24 47 27 52c5 10 9 16 12 19c2 2 6 3 11 3c13 0 20 -7 20 -20c0 -5 -5 -16 -16 -35c-3 -5 -8 -17 -16 -34c-2 -5 -5 -12 -10 -21s-9 -15 -10 -18c-3 -5 -6 -11 -9 -17s-5 -9 -5 -10c31 -17 62 -25 93 -25c35 0 66 10 93 31\ns42 46 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-33 0 -68 10 -105 29c-5 3 -9 5 -10 5l-8 -13l-60 -117c46 -31 81 -52 106 -63c26 -12 52 -18 77 -18c35 0 66 10 93 31s42 46 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31\nc0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-33 0 -71 11 -114 34c-13 7 -26 15 -41 25s-31 21 -50 33c-10 -18 -20 -38 -31 -60c-15 -30 -24 -47 -27 -52c-5 -10 -9 -16 -12 -19c-2 -2 -6 -3 -11 -3c-13 0 -20 7 -20 20c0 5 5 16 16 35l5 10l6 12l6 12l20 40l13 26\nc-31 17 -62 25 -93 25c-18 0 -37 -4 -57 -11c-19 -7 -37 -20 -54 -37c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 47 16 85 48 116c33 31 72 47 118 47c33 0 68 -10 105 -29c5 -3 9 -5 10 -5zM507 502c89 -15 158 -45 207 -89c22 -20 39 -42 50 -67\nc12 -27 19 -45 21 -56c2 -12 3 -21 3 -26c0 -14 -7 -21 -20 -21c-7 0 -11 2 -14 6c-3 5 -5 8 -5 11c-4 20 -7 32 -8 36c-5 14 -10 28 -17 41c-9 17 -20 32 -34 45c-12 11 -31 24 -56 38s-54 25 -88 33c-83 19 -175 29 -274 29h-57c-25 0 -38 7 -38 20c0 7 2 12 7 15\ns9 5 14 5h9s9 1 13 1c137 0 239 8 307 24c42 10 74 21 97 33c26 13 47 27 62 40s27 27 36 44c10 18 16 32 18 42c1 3 2 8 4 17s3 16 4 21c2 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -2 -1 -12 -4 -29c-2 -13 -9 -33 -22 -58c-14 -27 -31 -49 -50 -65\nc-49 -42 -117 -71 -205 -87z"
            },
            "⪺": {
                x: 965,
                d: "M439 -114l60 117c-47 31 -82 52 -105 63c-26 12 -52 18 -78 18c-20 0 -39 -3 -57 -10c-19 -7 -37 -19 -54 -38c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116c33 31 72 47 118 47c33 0 71 -11 114 -34c9 -5 23 -13 41 -26\nc6 -5 23 -15 50 -32c10 18 20 38 31 60c15 30 24 47 27 52c5 10 9 16 12 19c2 2 6 3 11 3c13 0 20 -7 20 -20c0 -5 -5 -16 -16 -35c-3 -5 -8 -17 -16 -34c-2 -5 -5 -12 -10 -21s-9 -15 -10 -18c-3 -5 -6 -11 -9 -17s-5 -9 -5 -10c31 -17 62 -25 93 -25c35 0 66 10 93 31\ns42 46 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -44 -16 -82 -48 -114s-71 -48 -118 -48c-33 0 -68 10 -105 29c-5 3 -9 5 -10 5l-8 -13l-60 -117c46 -31 81 -52 106 -63c26 -12 52 -18 77 -18c35 0 66 10 93 31s42 46 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31\nc0 -45 -16 -83 -48 -115c-31 -31 -71 -47 -118 -47c-33 0 -71 11 -114 34c-13 7 -26 15 -41 25s-31 21 -50 33c-10 -18 -20 -38 -31 -60c-15 -30 -24 -47 -27 -52c-5 -10 -9 -16 -12 -19c-2 -2 -6 -3 -11 -3c-13 0 -20 7 -20 20c0 5 5 16 16 35l5 10l6 12l6 12l20 40l13 26\nc-31 17 -62 25 -93 25c-18 0 -37 -4 -57 -11c-19 -7 -37 -20 -54 -37c-17 -18 -26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 47 16 85 48 116c33 31 72 47 118 47c33 0 68 -10 105 -29c5 -3 9 -5 10 -5zM693 482c-102 0 -188 -8 -259 -25c-35 -9 -67 -20 -94 -33\ns-47 -25 -62 -38c-14 -12 -26 -27 -35 -46c-9 -18 -15 -32 -18 -42c-1 -5 -4 -18 -8 -38c-3 -11 -10 -17 -20 -17c-13 0 -20 7 -20 21c0 7 1 16 3 29s10 32 23 59s30 48 50 64c49 42 117 71 202 86v1c-87 15 -155 45 -204 89c-21 19 -38 41 -49 66c-13 28 -21 47 -22 57\nc-2 12 -3 21 -3 26c0 6 2 11 6 15s9 6 14 6c11 0 17 -6 19 -17c5 -26 11 -47 18 -64c8 -19 22 -39 42 -59c21 -21 49 -39 84 -52s82 -24 142 -33c64 -9 137 -14 219 -14c28 0 45 -1 52 -2c10 -2 15 -8 15 -19c0 -13 -13 -20 -38 -20h-57z"
            },
            "⫅": {
                x: 941,
                d: "M460 214h266h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-269c-85 0 -157 28 -217 84s-90 125 -90 206s30 149 90 205s131 84 216 84h270c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-267c-77 0 -141 -24 -192 -73\ns-77 -108 -77 -177c0 -67 25 -126 76 -175s115 -74 194 -74zM185 -174h541h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-541h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17zM185 20h541h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-541\nh-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17z"
            },
            "⫆": {
                x: 941,
                d: "M451 713h-266c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h269c85 0 158 -28 218 -84s89 -125 89 -206s-29 -149 -89 -205s-132 -84 -217 -84h-270h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h267c77 0 141 24 192 73s77 108 77 177\nc0 67 -25 126 -76 175s-115 74 -194 74zM726 -214h-541h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h541h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17zM726 -20h-541h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h541h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "⫇": {
                x: 941,
                d: "M684 713l-223 -499h265h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-283l-68 -154h351h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-369l-69 -154h438h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-456\nc-9 -22 -24 -54 -44 -97c-5 -11 -11 -17 -20 -17c-5 0 -10 2 -14 5s-6 8 -6 15c0 2 7 18 20 49c1 3 4 10 10 23s9 21 10 22h-41h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h59l69 154h-128h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h146l71 159\nc-75 13 -136 45 -182 99s-70 116 -70 186c0 81 30 149 90 205s131 84 216 84h203c8 19 14 33 19 43c5 11 8 17 10 20s3 6 6 8s7 4 11 4c5 0 9 -2 13 -5s7 -8 7 -15c0 -3 -8 -21 -23 -55h40c13 -1 19 -8 19 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-42zM641 713\nh-182c-77 0 -141 -24 -192 -73s-77 -108 -77 -177c0 -47 13 -91 38 -129s57 -67 96 -88c37 -19 68 -29 92 -29c2 0 4 2 5 5l3 8z"
            },
            "⫈": {
                x: 941,
                d: "M418 214l199 448c-49 34 -104 51 -166 51h-266c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h269c65 0 126 -18 181 -54l47 108c5 14 13 21 23 21c5 0 9 -2 13 -5s7 -8 7 -15c0 -2 -2 -8 -6 -18l-52 -118c25 -21 47 -50 66 -87s28 -77 28 -122\nc0 -75 -28 -142 -85 -201s-134 -88 -233 -88l-68 -154h351h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-369l-69 -154h438h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-456c-9 -22 -24 -54 -44 -97c-5 -11 -11 -17 -20 -17c-5 0 -10 2 -14 5\ns-6 8 -6 15c0 2 7 18 20 49c1 3 4 10 10 23s9 21 10 22h-41h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h59l69 154h-128h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h146l69 154h-215h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h233zM649 634l-188 -420\nc80 4 143 31 190 80s70 106 70 170c0 65 -24 122 -72 170z"
            },
            "⫉": {
                x: 965,
                d: "M584 316c14 47 42 86 82 114s81 42 123 42c17 0 26 -7 26 -20c0 -12 -9 -19 -27 -20c-51 -3 -92 -22 -125 -58s-49 -77 -49 -124c0 -43 15 -82 45 -120s76 -59 138 -62c12 -1 18 -8 18 -20c0 -13 -9 -20 -26 -20c-41 0 -81 13 -121 40s-69 66 -85 116\nc-15 -47 -41 -86 -81 -114s-83 -42 -130 -42c-60 0 -112 21 -156 64s-66 95 -66 158s22 115 66 158s96 64 156 64c45 0 87 -13 127 -40s68 -66 85 -116zM372 68c49 0 91 17 127 52s54 78 54 130s-18 95 -54 130s-78 52 -127 52s-92 -17 -128 -52s-54 -79 -54 -130\ns18 -95 54 -130s79 -52 128 -52z"
            },
            "⫋": {
                x: 941,
                d: "M460 246h266h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-269c-85 0 -157 28 -217 84s-90 125 -90 206s30 149 90 205s131 84 216 84h270c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-267c-77 0 -141 -24 -192 -73\ns-77 -108 -77 -177c0 -67 25 -126 76 -175s115 -74 194 -74zM548 -52l-132 -154h310h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-345l-89 -105c-11 -11 -17 -19 -20 -21s-6 -3 -11 -3s-10 2 -14 6s-6 9 -6 14c0 6 6 16 19 30c28 32 51 58 68 79h-143h-17\ns-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h178l132 154h-310h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h345l89 105c11 11 17 19 20 21s6 3 11 3s10 -2 14 -6s6 -9 6 -14c0 -6 -6 -16 -19 -30c-38 -43 -61 -70 -68 -79h143h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17h-178z"
            },
            "⫌": {
                x: 941,
                d: "M451 745h-266c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h269c85 0 158 -28 218 -84s89 -125 89 -206s-29 -149 -89 -205s-132 -84 -217 -84h-270h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h267c77 0 141 24 192 73s77 108 77 177\nc0 67 -25 126 -76 175s-115 74 -194 74zM548 -52l-132 -154h310h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-345l-89 -105c-11 -11 -17 -19 -20 -21s-6 -3 -11 -3s-10 2 -14 6s-6 9 -6 14c0 6 6 16 19 30c28 32 51 58 68 79h-143h-17s-8 3 -12 6s-6 8 -6 14\ns2 11 6 14s8 6 12 6h17h178l132 154h-310h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h345l89 105c11 11 17 19 20 21s6 3 11 3s10 -2 14 -6s6 -9 6 -14c0 -6 -6 -16 -19 -30c-38 -43 -61 -70 -68 -79h143h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17\nh-178z"
            },
            "*": {
                x: 669,
                d: "M360 427l-14 -156l112 81c17 13 28 19 34 19c7 0 14 -3 19 -9s8 -12 8 -19c0 -5 -1 -9 -3 -12s-4 -5 -7 -7s-7 -5 -14 -8l-138 -67c74 -35 121 -57 141 -67c14 -7 21 -15 21 -26c0 -7 -3 -14 -9 -20s-11 -8 -18 -8c-3 0 -9 2 -18 7l-128 93l15 -168c0 -17 -9 -26 -27 -26\nc-6 0 -12 2 -18 6s-8 11 -8 20l15 168l-112 -81c-17 -13 -28 -19 -34 -19c-7 0 -14 2 -19 8s-8 13 -8 20c0 5 1 9 3 12s4 6 7 8s7 4 14 7l138 67l-142 68c-13 7 -20 15 -20 25c0 7 2 13 8 19s12 9 19 9c3 0 9 -2 18 -7l128 -93l-14 155v13c-1 7 1 13 6 18s12 8 20 8\nc17 0 25 -10 25 -30v-8z"
            }
        },
        map: {
            // char
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            varepsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            varkappa: "ϰ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            digamma: "Ϝ",
            varepsilon: "ϵ",
            varrho: "ϱ",
            varphi: "ϕ",
            vartheta: "ϑ",
            varpi: "ϖ",
            varsigma: "Ϲ",
            aleph: "ℵ",
            beth: "ℶ",
            daleth: "ℸ",
            gimel: "ℷ",
            eth: "ð",
            hbar: "ℎ",
            hslash: "ℏ",
            mho: "℧",
            partial: "∂",
            wp: "℘",
            Bbbk: "⅌",
            Finv: "Ⅎ",
            Im: "ℑ",
            Re: "ℜ",
            complement: "∁",
            ell: "ℓ",
            circledS: "Ⓢ",
            imath: "ı",
            jmath: "ȷ",
            // symbol
            doublecap: "⋒",
            Cap: "⋒",
            doublecup: "⋓",
            Cup: "⋓",
            ast: "*",
            divideontimes: "⋇",
            rightthreetimes: "⋌",
            leftthreetimes: "⋋",
            cdot: "·",
            odot: "⊙",
            dotplus: "∔",
            rtimes: "⋊",
            ltimes: "⋉",
            centerdot: "▪",
            doublebarwedge: "⌭",
            setminus: "⒁",
            amalg: "∐",
            circ: "◦",
            bigcirc: "◯",
            gtrdot: "⋗",
            lessdot: "⋖",
            smallsetminus: "⒅",
            circledast: "⊛",
            circledcirc: "⊚",
            sqcap: "⊓",
            sqcup: "⊔",
            barwedge: "⊼",
            circleddash: "⊝",
            star: "⋆",
            bigtriangledown: "▽",
            bigtriangleup: "△",
            cup: "∪",
            cap: "∩",
            times: "×",
            mp: "∓",
            pm: "±",
            triangleleft: "⊲",
            triangleright: "⊳",
            boxdot: "⊡",
            curlyvee: "⋏",
            curlywedge: "⋎",
            boxminus: "⊟",
            boxtimes: "⊠",
            ominus: "⊖",
            oplus: "⊕",
            oslash: "⊘",
            otimes: "⊗",
            uplus: "⊎",
            boxplus: "⊞",
            dagger: "†",
            ddagger: "‡",
            vee: "∨",
            lor: "∨",
            veebar: "⊻",
            bullet: "•",
            diamond: "⋄",
            wedge: "∧",
            land: "∧",
            div: "÷",
            wr: "≀",
            geqq: "≧",
            lll: "⋘",
            llless: "⋘",
            ggg: "⋙",
            gggtr: "⋙",
            preccurlyeq: "≼",
            geqslant: "⩾",
            lnapprox: "⪉",
            preceq: "⪯",
            gg: "≫",
            lneq: "⪇",
            precnapprox: "⪹",
            approx: "≈",
            lneqq: "≨",
            precneqq: "⪵",
            approxeq: "≊",
            gnapprox: "⪊",
            lnsim: "⋦",
            precnsim: "⋨",
            asymp: "≍",
            gneq: "⪈",
            lvertneqq: "⌮",
            precsim: "≾",
            backsim: "∽",
            gneqq: "≩",
            ncong: "≇",
            risingdotseq: "≓",
            backsimeq: "⋍",
            gnsim: "⋧",
            sim: "∼",
            simeq: "≃",
            bumpeq: "≏",
            gtrapprox: "⪆",
            ngeq: "≱",
            Bumpeq: "≎",
            gtreqless: "⋛",
            ngeqq: "⌱",
            succ: "≻",
            circeq: "≗",
            gtreqqless: "⪌",
            ngeqslant: "⌳",
            succapprox: "⪸",
            cong: "≅",
            gtrless: "≷",
            ngtr: "≯",
            succcurlyeq: "≽",
            curlyeqprec: "⋞",
            gtrsim: "≳",
            nleq: "≰",
            succeq: "⪰",
            curlyeqsucc: "⋟",
            gvertneqq: "⌯",
            neq: "",
            ne: "",
            nleqq: "⌰",
            succnapprox: "⪺",
            doteq: "≐",
            leq: "≤",
            le: "≤",
            nleqslant: "⌲",
            succneqq: "⪶",
            doteqdot: "≑",
            Doteq: "≑",
            leqq: "≦",
            nless: "≮",
            succnsim: "⋩",
            leqslant: "⩽",
            nprec: "⊀",
            succsim: "≿",
            eqsim: "≂",
            lessapprox: "⪅",
            npreceq: "⋠",
            eqslantgtr: "⪖",
            lesseqgtr: "⋚",
            nsim: "≁",
            eqslantless: "⪕",
            lesseqqgtr: "⪋",
            nsucc: "⊁",
            triangleq: "≜",
            eqcirc: "≖",
            equiv: "≡",
            lessgtr: "≶",
            nsucceq: "⋡",
            fallingdotseq: "≒",
            lesssim: "≲",
            prec: "≺",
            geq: "≥",
            ge: "≥",
            ll: "≪",
            precapprox: "⪷",
            // arrows
            uparrow: "↑",
            downarrow: "↓",
            updownarrow: "↕",
            Uparrow: "⇑",
            Downarrow: "⇓",
            Updownarrow: "⇕",
            circlearrowleft: "↺",
            circlearrowright: "↻",
            curvearrowleft: "↶",
            curvearrowright: "↷",
            downdownarrows: "⇊",
            downharpoonleft: "⇃",
            downharpoonright: "⇂",
            leftarrow: "←",
            gets: "←",
            Leftarrow: "⇐",
            leftarrowtail: "↢",
            leftharpoondown: "↽",
            leftharpoonup: "↼",
            leftleftarrows: "⇇",
            leftrightarrow: "↔",
            Leftrightarrow: "⇔",
            leftrightarrows: "⇄",
            leftrightharpoons: "⇋",
            leftrightsquigarrow: "↭",
            Lleftarrow: "⇚",
            looparrowleft: "↫",
            looparrowright: "↬",
            multimap: "⊸",
            nLeftarrow: "⇍",
            nRightarrow: "⇏",
            nLeftrightarrow: "⇎",
            nearrow: "↗",
            nleftarrow: "↚",
            nleftrightarrow: "↮",
            nrightarrow: "↛",
            nwarrow: "↖",
            rightarrow: "→",
            to: "→",
            Rightarrow: "⇒",
            rightarrowtail: "↣",
            rightharpoondown: "⇁",
            rightharpoonup: "⇀",
            rightleftarrows: "⇆",
            rightleftharpoons: "⇌",
            rightrightarrows: "⇉",
            rightsquigarrow: "⇝",
            Rrightarrow: "⇛",
            searrow: "↘",
            swarrow: "↙",
            twoheadleftarrow: "↞",
            twoheadrightarrow: "↠",
            upharpoonleft: "↿",
            upharpoonright: "↾",
            restriction: "↾",
            upuparrows: "⇈",
            Lsh: "↰",
            Rsh: "↱",
            longleftarrow: "⟵",
            longrightarrow: "⟶",
            Longleftarrow: "⟸",
            Longrightarrow: "⟹",
            implies: "⟹",
            longleftrightarrow: "⟷",
            Longleftrightarrow: "⟺",
            // relation
            backepsilon: "∍",
            because: "∵",
            therefore: "∴",
            between: "≬",
            blacktriangleleft: "◀",
            blacktriangleright: "▸",
            dashv: "⊣",
            bowtie: "⋈",
            frown: "⌢",
            "in": "∈",
            mid: "∣",
            parallel: "∥",
            models: "⊨",
            ni: "∋",
            owns: "∋",
            nmid: "∤",
            nparallel: "∦",
            nshortmid: "⏒",
            nshortparallel: "⏓",
            nsubseteq: "⊈",
            nsubseteqq: "⫇",
            nsupseteq: "⊉",
            nsupseteqq: "⫈",
            ntriangleleft: "⋪",
            ntrianglelefteq: "⋬",
            ntriangleright: "⋫",
            ntrianglerighteq: "⋭",
            nvdash: "⊬",
            nVdash: "⊮",
            nvDash: "⊭",
            nVDash: "⊯",
            perp: "⊥",
            pitchfork: "⋔",
            propto: "∝",
            shortmid: "⏐",
            shortparallel: "⏑",
            smile: "⌣",
            sqsubset: "⊏",
            sqsubseteq: "⊑",
            sqsupset: "⊐",
            sqsupseteq: "⊒",
            subset: "⊂",
            Subset: "⋐",
            subseteq: "⊆",
            subseteqq: "⫅",
            subsetneq: "⊊",
            subsetneqq: "⫋",
            supset: "⊃",
            Supset: "⋑",
            supseteq: "⊇",
            supseteqq: "⫆",
            supsetneq: "⊋",
            supsetneqq: "⫌",
            trianglelefteq: "⊴",
            trianglerighteq: "⊵",
            varpropto: "⫉",
            varsubsetneq: "⏔",
            varsubsetneqq: "⏖",
            varsupsetneq: "⏕",
            varsupsetneqq: "⏗",
            vdash: "⊢",
            Vdash: "⊩",
            vDash: "⊨",
            Vvdash: "⊪",
            vert: "|",
            Vert: "ǁ",
            "|": "ǁ",
            "{": "{",
            "}": "}",
            backslash: "\\",
            langle: "〈",
            rangle: "〉",
            lceil: "⌈",
            rceil: "⌉",
            lbrace: "{",
            rbrace: "}",
            lfloor: "⌊",
            rfloor: "⌋",
            cdots: "⋯",
            ddots: "⋰",
            vdots: "⋮",
            dots: "…",
            ldots: "…",
            "#": "#",
            bot: "⊥",
            angle: "∠",
            backprime: "‵",
            bigstar: "★",
            blacklozenge: "◆",
            blacksquare: "■",
            blacktriangle: "▲",
            blacktriangledown: "▼",
            clubsuit: "♣",
            diagdown: "⒁",
            diagup: "⒂",
            diamondsuit: "♢",
            emptyset: "ø",
            exists: "∃",
            flat: "♭",
            forall: "∀",
            heartsuit: "♡",
            infty: "∞",
            lozenge: "◇",
            measuredangle: "∡",
            nabla: "∇",
            natural: "♮",
            neg: "¬",
            lnot: "¬",
            nexists: "∄",
            prime: "′",
            sharp: "♯",
            spadesuit: "♠",
            sphericalangle: "∢",
            surd: "√",
            top: "⊤",
            varnothing: "∅",
            triangle: "△",
            triangledown: "▽"
        }
    };
});
/*!
 * 罗马字体
 */
define("font/kf-ams-roman", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS ROMAN",
            x: 50,
            "units-per-em": 1e3,
            attr: ""
        },
        data: {
            A: {
                x: 746,
                d: "M390 691l222 -628c13 -37 31 -37 84 -37v-26c-24 2 -74 2 -100 2c-31 0 -83 0 -112 -2v26c19 0 62 0 62 27c0 4 0 6 -5 18l-60 170h-262l-53 -149c-2 -6 -4 -11 -4 -20c0 -12 7 -44 54 -46v-26c-24 2 -64 2 -89 2c-19 0 -59 0 -77 -2v26c35 0 75 11 94 65l212 600\nc5 13 7 16 17 16s12 -3 17 -16zM350 611l-122 -344h244z"
            },
            B: {
                x: 655,
                d: "M50 683h318c129 0 211 -85 211 -168c0 -76 -67 -140 -163 -159c107 -7 189 -84 189 -174c0 -91 -83 -182 -211 -182h-344v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26zM193 363h144c108 0 169 76 169 152c0 62 -44 142 -143 142h-128c-40 0 -42 -5 -42 -39v-255z\nM235 26h130c109 0 166 84 166 157s-50 164 -153 164h-185v-282c0 -34 2 -39 42 -39z"
            },
            C: {
                x: 675,
                d: "M625 679v-237c0 -18 0 -20 -11 -20c-9 0 -9 2 -11 14c-19 139 -101 237 -214 237c-97 0 -263 -70 -263 -331c0 -260 163 -332 265 -332c108 0 208 86 216 226c1 9 1 12 9 12c9 0 9 -4 9 -14c0 -115 -95 -250 -248 -250c-172 0 -327 150 -327 358c0 206 155 357 326 357\nc77 0 137 -36 186 -98l44 84c7 12 8 13 12 13c6 0 7 -1 7 -19z"
            },
            D: {
                x: 708,
                d: "M50 683h318c163 0 290 -158 290 -347c0 -188 -129 -336 -290 -336h-318v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26zM236 26h112c95 0 152 54 176 85c19 27 60 84 60 225c0 272 -153 321 -236 321h-112c-40 0 -42 -5 -42 -39v-553c0 -34 2 -39 42 -39z"
            },
            E: {
                x: 656,
                d: "M606 253l-36 -253h-520v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26h506l24 -221h-18c-14 133 -32 195 -187 195h-137c-40 0 -42 -5 -42 -39v-249h94c94 0 103 34 103 117h18v-260h-18c0 83 -9 117 -103 117h-94v-276c0 -34 2 -39 42 -39h139c176 0 189 80 211 227h18\nz"
            },
            F: {
                x: 617,
                d: "M543 681l24 -221h-18c-14 133 -31 195 -182 195h-129c-40 0 -42 -5 -42 -39v-262h90c93 0 102 33 102 117h18v-260h-18c0 84 -9 117 -102 117h-90v-256c0 -36 2 -46 78 -46h22v-26c-41 2 -89 2 -130 2c-31 0 -87 0 -116 -2v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26\nh493z"
            },
            G: {
                x: 740,
                d: "M625 199v-179c0 -18 -1 -19 -6 -19s-33 28 -50 69c-31 -57 -110 -86 -191 -86c-176 0 -328 153 -328 358c0 206 155 357 326 357c77 0 137 -36 186 -98l44 84c7 12 8 13 12 13c6 0 7 -1 7 -19v-237c0 -18 0 -20 -11 -20c-9 0 -9 2 -11 14c-19 139 -101 237 -214 237\nc-97 0 -263 -70 -263 -331s169 -332 272 -332c31 0 161 9 161 119v66c0 36 -2 47 -88 47h-30v26c38 -1 116 -2 144 -2c27 0 81 0 105 2v-26c-62 0 -65 -5 -65 -43z"
            },
            H: {
                x: 690,
                d: "M560 612v-541c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v271h-298v-271c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26\nc-69 0 -80 0 -80 -45v-244h298v244c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45z"
            },
            I: {
                x: 334,
                d: "M200 612v-541c0 -45 12 -45 84 -45v-26c-32 2 -83 2 -117 2s-85 0 -117 -2v26c72 0 84 0 84 45v541c0 45 -12 45 -84 45v26c32 -2 83 -2 117 -2s85 0 117 2v-26c-72 0 -84 0 -84 -45z"
            },
            J: {
                x: 466,
                d: "M292 147v463c0 36 -2 47 -80 47h-24v26c42 -2 88 -2 130 -2c25 0 96 2 98 2v-26c-31 0 -54 0 -58 -19c-2 -6 -2 -34 -2 -51v-420c0 -34 0 -36 -1 -43c-12 -84 -84 -140 -162 -140c-82 0 -143 61 -143 128c0 29 19 44 43 44c25 0 42 -18 42 -42c0 -30 -24 -43 -43 -43\nc-4 0 -9 1 -13 2c26 -61 86 -73 112 -73c51 0 101 55 101 147z"
            },
            K: {
                x: 734,
                d: "M368 419l223 -341c30 -46 45 -52 93 -52v-26c-23 2 -64 2 -88 2c-33 0 -79 0 -111 -2v26c13 0 41 0 41 26c0 10 -7 23 -13 33l-189 290l-128 -127v-177c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26\nc29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45v-339l332 333c4 6 8 17 8 24s-4 25 -30 27v26c26 -2 73 -2 100 -2c20 0 45 1 65 2v-26c-56 -2 -94 -30 -130 -65z"
            },
            L: {
                x: 591,
                d: "M541 253l-24 -253h-467v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26c29 -2 85 -2 116 -2c41 0 89 0 130 2v-26h-22c-76 0 -78 -10 -78 -46v-546c0 -34 2 -39 42 -39h93c171 0 184 128 192 227h18z"
            },
            M: {
                x: 843,
                d: "M206 667l216 -586l216 586c6 15 7 16 28 16h127v-26c-69 0 -80 0 -80 -45v-541c0 -45 11 -45 80 -45v-26c-27 2 -82 2 -111 2s-83 0 -110 -2v26c69 0 80 0 80 45v587h-1l-237 -642c-4 -10 -6 -16 -14 -16s-10 6 -14 16l-235 637h-1v-555c0 -25 0 -72 80 -72v-26\nc-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v514c0 45 -11 45 -80 45v26h128c21 0 22 -1 28 -16z"
            },
            N: {
                x: 690,
                d: "M204 671l336 -549v463c0 25 0 72 -80 72v26c23 -2 65 -2 90 -2s67 0 90 2v-26c-80 0 -80 -47 -80 -72v-563c0 -19 0 -22 -10 -22c-5 0 -8 0 -15 12l-371 607c-7 10 -7 12 -14 18v-539c0 -25 0 -72 80 -72v-26c-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v553\nc-3 1 -21 6 -61 6h-19v26h127c19 0 20 -1 27 -12z"
            },
            O: {
                x: 727,
                d: "M677 340c0 -200 -143 -356 -314 -356c-167 0 -313 153 -313 356s144 359 314 359c166 0 313 -154 313 -359zM364 2c110 0 237 110 237 351c0 233 -132 328 -238 328c-101 0 -237 -92 -237 -328c0 -237 124 -351 238 -351z"
            },
            P: {
                x: 629,
                d: "M196 321v-250c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26h306c131 0 223 -88 223 -183s-94 -179 -223 -179h-160zM194 342h143c122 0 166 67 166 158c0 83 -37 157 -166 157h-101c-40 0 -42 -5 -42 -39\nv-276z"
            },
            Q: {
                x: 732,
                d: "M477 9c19 -75 40 -128 99 -128c32 0 86 20 93 116c0 2 1 9 6 9c7 0 7 -7 7 -17c0 -28 -5 -184 -111 -184c-86 0 -97 73 -114 195c-38 -13 -70 -16 -93 -16c-170 0 -314 156 -314 356c0 203 144 359 314 359c166 0 313 -154 313 -359c0 -150 -81 -280 -200 -331zM310 10\nc-11 13 -20 32 -20 55c0 38 27 80 75 80c65 0 89 -60 104 -111c67 43 134 137 134 306c0 234 -128 341 -240 341c-108 0 -239 -103 -239 -341c0 -186 82 -297 186 -330zM453 25c-8 47 -24 104 -88 104c-38 0 -59 -33 -59 -64c0 -22 13 -63 58 -63c17 0 49 2 89 23z"
            },
            R: {
                x: 730,
                d: "M390 341c119 -36 127 -109 133 -159c2 -22 4 -37 7 -58c6 -61 12 -124 67 -124c31 0 60 22 65 87c0 4 1 10 9 10c9 0 9 -7 9 -13c0 -17 -11 -100 -85 -100c-22 0 -73 4 -111 45c-30 34 -30 68 -30 135c0 68 0 95 -40 134c-14 13 -46 36 -103 36h-117v-263\nc0 -45 11 -45 80 -45v-26c-29 2 -81 2 -112 2s-83 0 -112 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26h269c140 0 246 -85 246 -179c0 -80 -80 -144 -175 -163zM308 350c75 0 181 25 181 154c0 124 -97 153 -180 153h-73c-40 0 -42 -5 -42 -39v-268h114z"
            },
            S: {
                x: 518,
                d: "M442 679v-203c0 -17 0 -20 -9 -20c-7 0 -8 1 -11 19c-15 125 -81 200 -187 200c-85 0 -137 -71 -137 -136c0 -32 10 -64 38 -95c25 -27 48 -34 102 -48c56 -14 58 -14 65 -17c48 -12 93 -24 135 -88c11 -18 30 -58 30 -110c0 -106 -77 -197 -186 -197\nc-48 0 -132 14 -182 80c-19 -38 -19 -40 -20 -43c-14 -31 -16 -36 -23 -36c-6 0 -7 1 -7 19v202c0 20 1 21 9 21c7 0 8 -1 9 -17c7 -140 107 -200 214 -200c87 0 138 77 138 149c0 56 -30 116 -87 140c-10 4 -60 17 -90 25c-80 21 -115 29 -152 75c-34 42 -41 86 -41 117\nc0 102 82 183 184 183c63 0 121 -25 159 -80l30 66c4 9 6 13 12 13s7 -1 7 -19z"
            },
            T: {
                x: 711,
                d: "M644 680l17 -221h-18c-13 166 -28 195 -181 195c-18 0 -47 0 -55 -1c-18 -4 -18 -16 -18 -38v-542c0 -36 3 -47 86 -47h28v-26c-48 1 -98 2 -147 2s-99 -1 -147 -2v26h28c83 0 86 11 86 47v542c0 23 0 35 -19 38c-8 1 -37 1 -55 1c-154 0 -168 -29 -181 -195h-18l17 221\nh577z"
            },
            U: {
                x: 690,
                d: "M539 229v356c0 25 0 72 -80 72v26c23 -2 66 -2 91 -2s67 0 90 2v-26c-29 0 -80 -6 -80 -62v-380c0 -98 -75 -231 -205 -231c-116 0 -225 101 -225 245v383c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45v-388c0 -35 4 -97 36 -145\nc28 -42 74 -69 125 -69c95 0 182 85 182 219z"
            },
            V: {
                x: 772,
                d: "M630 591l-227 -591c-5 -14 -6 -16 -17 -16s-12 2 -17 16l-238 621c-12 32 -23 36 -81 36v26c24 -2 71 -2 97 -2c33 0 80 0 112 2v-26c-21 0 -61 0 -61 -27c0 -5 2 -10 5 -17l206 -539l197 513c3 8 6 15 6 26c0 6 -2 41 -52 44v26c23 -2 64 -2 88 -2c25 0 51 0 74 2v-26\nc-67 -1 -83 -44 -92 -66z"
            },
            W: {
                x: 1036,
                d: "M904 593l-187 -592c-5 -15 -5 -17 -14 -17c-8 0 -11 2 -15 16l-170 542l-170 -542c-4 -14 -7 -16 -15 -16c-9 0 -9 2 -14 17l-195 618c-10 32 -14 38 -74 38v26c24 -2 68 -2 94 -2c31 0 81 0 110 2v-26c-20 0 -64 0 -64 -28c0 -2 0 -4 5 -18l163 -519l147 467\nc1 3 3 9 3 13c0 3 -16 55 -20 64c-10 18 -22 21 -68 21v26c23 -2 68 -2 93 -2c31 0 81 0 110 2v-26c-19 0 -63 0 -63 -28c0 -4 1 -8 4 -18l163 -520l155 494c4 11 5 15 5 22c0 24 -19 49 -64 50v26c24 -2 68 -2 93 -2c18 0 53 1 70 2v-26c-58 -2 -73 -37 -82 -64z"
            },
            X: {
                x: 766,
                d: "M402 379l220 -320c20 -28 30 -33 94 -33v-26c-24 2 -74 2 -100 2c-33 0 -82 0 -114 -2v26c35 2 44 19 44 27c0 3 0 6 -8 17l-174 254l-160 -232c-5 -7 -10 -14 -10 -27c0 -16 9 -36 40 -39v-26c-25 2 -72 2 -99 2c-24 0 -62 0 -85 -2v26c19 0 84 1 127 63l174 253\nl-193 282c-22 31 -40 33 -95 33v26c24 -2 74 -2 100 -2c33 0 82 0 114 2v-26c-33 -1 -44 -18 -44 -27c0 -3 1 -6 8 -17l148 -216l132 191c7 10 12 18 12 30c0 16 -8 36 -40 39v26c25 -2 66 -2 99 -2c24 0 62 0 85 2v-26c-82 -1 -112 -44 -127 -65z"
            },
            Y: {
                x: 788,
                d: "M627 594l-201 -321v-198c0 -49 9 -49 81 -49v-26c-29 2 -82 2 -113 2s-83 0 -112 -2v26c69 0 80 0 80 45v202l-221 352c-18 29 -34 32 -91 32v26c24 -2 74 -2 100 -2c33 0 82 0 114 2v-26c-14 0 -49 0 -49 -20c0 -7 1 -8 8 -20l197 -315l180 289c8 13 13 21 13 33\nc0 19 -13 32 -38 33v26c24 -2 64 -2 89 -2s51 0 74 2v-26c-18 0 -72 -1 -111 -63z"
            },
            Z: {
                x: 575,
                d: "M520 663l-394 -635h174c191 0 198 102 207 233h18l-14 -261h-439c-20 0 -22 0 -22 13c0 7 0 8 7 19l387 625h-165c-162 0 -192 -81 -198 -195h-18l10 221h425c21 0 22 -1 22 -20z"
            },
            a: {
                x: 519,
                d: "M370 259v-144c0 -44 0 -96 41 -96c13 0 40 8 40 69v57h18v-56c0 -79 -53 -93 -74 -93c-44 0 -72 40 -74 84c-22 -57 -73 -88 -128 -88c-53 0 -143 22 -143 99c0 38 18 88 81 123c56 30 127 38 186 40v44c0 84 -55 128 -105 128c-35 0 -89 -18 -110 -81c3 1 8 2 12 2\nc17 0 36 -11 36 -36c0 -28 -23 -36 -36 -36c-6 0 -36 2 -36 39c0 66 57 128 136 128c34 0 77 -10 114 -43c42 -39 42 -74 42 -140zM317 139v100c-32 -2 -87 -6 -135 -33c-58 -32 -71 -85 -71 -115c0 -46 39 -83 89 -83c55 0 117 44 117 131z"
            },
            b: {
                x: 546,
                d: "M169 694v-328c30 39 74 72 136 72c101 0 191 -94 191 -222c0 -136 -101 -224 -201 -224c-58 0 -101 32 -130 79l-29 -71h-18v603c0 48 -9 54 -68 54v26zM171 315v-198c0 -18 0 -20 11 -39c32 -58 77 -70 108 -70c24 0 142 11 142 209c0 189 -103 205 -133 205\nc-19 0 -75 -5 -114 -65c-14 -21 -14 -24 -14 -42z"
            },
            c: {
                x: 451,
                d: "M366 350c-22 55 -80 74 -119 74c-59 0 -133 -55 -133 -207c0 -148 77 -207 141 -207c43 0 100 20 126 101c4 13 5 14 12 14s8 -3 8 -7c0 -11 -31 -126 -155 -126c-102 0 -196 91 -196 224c0 128 90 226 196 226c77 0 145 -54 145 -125c0 -35 -29 -38 -36 -38\nc-13 0 -36 8 -36 36c0 35 28 35 47 35z"
            },
            d: {
                x: 546,
                d: "M309 683l119 11v-614c0 -48 9 -54 68 -54v-26l-121 -8v73c-5 -7 -49 -73 -134 -73c-98 0 -191 92 -191 223c0 132 99 223 201 223c81 0 122 -64 126 -69v234c0 48 -9 54 -68 54v26zM375 120v198c0 18 0 21 -13 42c-23 36 -60 62 -106 62c-26 0 -142 -12 -142 -208\nc0 -191 104 -206 133 -206c19 0 53 5 87 35c23 20 41 47 41 77z"
            },
            e: {
                x: 458,
                d: "M404 235h-290c0 -47 0 -106 31 -157c27 -44 70 -68 113 -68c52 0 107 34 129 102c4 12 5 14 12 14c2 0 8 0 8 -7c0 -21 -44 -127 -156 -127c-106 0 -201 96 -201 226c0 123 84 224 190 224c114 0 168 -89 168 -191c0 -10 0 -12 -4 -16zM115 250h239\nc-1 112 -47 176 -115 176c-40 0 -117 -32 -124 -176z"
            },
            f: {
                x: 391,
                d: "M181 404v-333c0 -45 12 -45 84 -45v-26c-27 2 -78 2 -107 2c-26 0 -72 0 -96 -2v26c64 0 68 5 68 43v335h-80v26h80v119c0 106 78 153 135 153c40 0 76 -23 76 -61c0 -26 -20 -34 -34 -34s-34 8 -34 34c0 25 21 32 29 34c-10 7 -25 11 -38 11c-43 0 -85 -52 -85 -135\nv-121h116v-26h-114z"
            },
            g: {
                x: 531,
                d: "M141 180c-19 -22 -19 -44 -19 -53c0 -35 21 -63 52 -68c5 -1 46 -1 69 -1c77 0 225 0 225 -136c0 -75 -99 -126 -209 -126c-114 0 -209 53 -209 125c0 50 41 90 93 103c-34 21 -44 59 -44 85c0 5 0 46 30 81c-10 10 -43 46 -43 103c0 83 68 145 147 145\nc32 0 68 -10 98 -37c28 26 63 45 103 45c32 0 47 -20 47 -39c0 -13 -8 -23 -23 -23c-13 0 -22 9 -22 22c0 16 9 20 13 21c-5 3 -11 3 -15 3c-23 0 -64 -10 -92 -40c30 -31 38 -71 38 -97c0 -83 -68 -145 -147 -145c-40 0 -73 17 -92 32zM233 165c88 0 88 108 88 128\ns0 128 -88 128s-88 -108 -88 -128s0 -128 88 -128zM259 -187c100 0 169 53 169 108c0 93 -114 93 -196 93c-68 0 -78 0 -103 -17c-22 -16 -39 -45 -39 -76c0 -55 69 -108 169 -108z"
            },
            h: {
                x: 550,
                d: "M432 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26l119 11v-355\nh1c12 33 52 99 134 99c118 0 128 -83 128 -134z"
            },
            i: {
                x: 280,
                d: "M171 616c0 -23 -19 -41 -41 -41c-23 0 -41 19 -41 41c0 23 19 41 41 41c23 0 41 -19 41 -41zM54 427l115 11v-370c0 -36 2 -42 61 -42v-26c-23 2 -64 2 -88 2c-25 0 -68 0 -92 -2v26c64 0 68 5 68 43v278c0 48 -8 54 -64 54v26z"
            },
            j: {
                x: 315,
                d: "M265 616c0 -23 -19 -41 -41 -41c-23 0 -41 19 -41 41c0 23 19 41 41 41c23 0 41 -19 41 -41zM140 427l125 11v-493c0 -85 -51 -148 -120 -148c-51 0 -95 26 -95 66c0 22 14 37 36 37c23 0 36 -17 36 -36c0 -28 -25 -35 -32 -36c22 -14 49 -15 56 -15c59 0 68 78 68 128\nv405c0 48 -8 55 -74 55v26z"
            },
            k: {
                x: 544,
                d: "M280 264l126 -185c30 -44 41 -53 88 -53v-26c-17 1 -54 2 -72 2c-25 0 -68 0 -92 -2v26c12 0 30 3 30 21c0 13 -10 27 -22 45l-101 150l-69 -63v-110c0 -39 4 -43 68 -43v-26c-24 2 -68 2 -93 2s-69 0 -93 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26l119 11v-490\nl151 138c1 0 21 19 21 39c0 14 -10 22 -24 23v26c27 -2 70 -2 98 -2l49 1c1 1 3 1 9 1v-26c-26 -1 -62 -6 -119 -54c-9 -8 -80 -73 -80 -75c0 -3 5 -9 6 -11z"
            },
            l: {
                x: 287,
                d: "M169 694v-625c0 -39 4 -43 68 -43v-26c-24 2 -68 2 -94 2c-25 0 -69 0 -93 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26z"
            },
            m: {
                x: 811,
                d: "M693 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114\nc-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l118 11v-101h1c15 40 56 101 135 101c56 0 115 -18 127 -100h1c18 54 65 100 133 100c119 0 128 -84 128 -134z"
            },
            n: {
                x: 550,
                d: "M432 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l118 11v-101\nh1c15 40 56 101 135 101c118 0 128 -83 128 -134z"
            },
            o: {
                x: 504,
                d: "M454 214c0 -126 -93 -222 -202 -222s-202 96 -202 222c0 128 93 228 202 228s202 -100 202 -228zM252 10c38 0 81 19 109 65c27 48 29 108 29 147c0 31 0 97 -31 144c-24 35 -62 60 -107 60c-51 0 -90 -32 -110 -65c-26 -45 -28 -97 -28 -139c0 -44 3 -100 28 -145\nc23 -39 63 -67 110 -67z"
            },
            p: {
                x: 546,
                d: "M239 -169v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v473c0 48 -9 54 -68 54v26l119 11v-73c28 40 77 73 137 73c103 0 190 -96 190 -222c0 -136 -101 -224 -201 -224c-53 0 -95 27 -124 69v-187c0 -39 4 -43 68 -43zM171 314v-198c0 -16 0 -22 13 -44\nc30 -47 69 -64 105 -64c79 0 143 93 143 207s-60 205 -133 205c-50 0 -84 -30 -89 -34c-39 -37 -39 -58 -39 -72z"
            },
            q: {
                x: 546,
                d: "M428 438v-564c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v199c-13 -22 -56 -81 -133 -81c-100 0 -192 92 -192 223c0 132 98 223 200 223c67 0 109 -46 132 -99l30 99h16zM377 137v140c0 52 -40 143 -120 143c-77 0 -143 -89 -143 -206\nc0 -111 58 -206 133 -206c24 0 60 8 91 43c3 3 39 43 39 86z"
            },
            r: {
                x: 402,
                d: "M169 236v-165c0 -45 12 -45 84 -45v-26c-27 2 -78 2 -107 2c-26 0 -72 0 -96 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l116 11v-109h1c10 35 43 109 119 109c34 0 66 -20 66 -52c0 -28 -22 -35 -34 -35c-15 0 -34 10 -34 34c0 26 22 33 22 33c-7 3 -14 4 -21 4\nc-75 0 -116 -90 -116 -186z"
            },
            s: {
                x: 408,
                d: "M334 422v-112c0 -17 0 -20 -9 -20c-3 0 -8 1 -9 6c-2 32 -8 132 -115 132c-101 0 -115 -55 -115 -81c0 -61 70 -75 125 -87c42 -8 77 -15 107 -46c13 -12 40 -39 40 -90c0 -78 -53 -132 -152 -132c-56 0 -91 26 -111 53c-6 -10 -21 -34 -27 -43c-5 -8 -6 -9 -11 -9\nc-6 0 -7 1 -7 19v144c0 20 1 21 9 21s8 -1 11 -15c18 -88 49 -154 136 -154c92 0 116 54 116 96c0 36 -22 58 -35 70c-21 18 -43 22 -106 35c-29 6 -131 27 -131 117c0 58 40 116 151 116c17 0 62 -1 94 -35c3 4 12 14 15 18c12 15 13 16 17 16c6 0 7 -1 7 -19z"
            },
            t: {
                x: 396,
                d: "M190 404v-283c0 -91 40 -111 69 -111c42 0 69 46 69 115v56h18v-57c0 -74 -34 -132 -93 -132c-116 0 -116 112 -116 131v281h-87v16c85 2 120 92 122 195h18v-185h140v-26h-140z"
            },
            u: {
                x: 550,
                d: "M311 427l121 11v-358c0 -48 9 -54 68 -54v-26l-119 -8v93h-1c-8 -21 -41 -93 -126 -93c-72 0 -97 26 -110 39c-26 28 -26 71 -26 138v192c-1 40 -28 40 -68 40v26l121 11v-329c0 -52 7 -101 89 -101c74 0 119 73 119 157v182c0 48 -9 54 -68 54v26z"
            },
            v: {
                x: 564,
                d: "M431 340l-133 -331c-6 -15 -7 -17 -16 -17s-10 2 -16 17l-145 364c-12 31 -33 31 -71 31v26c22 -2 53 -2 80 -2c25 0 69 0 93 2v-26c-15 0 -48 0 -48 -24c0 -4 0 -6 6 -19l119 -300l110 278c6 14 6 16 6 25c0 26 -14 38 -39 40v26c20 -2 53 -2 74 -2c19 0 44 1 63 2v-26\nc-58 -2 -74 -42 -83 -64z"
            },
            w: {
                x: 747,
                d: "M622 342l-114 -334c-4 -13 -7 -16 -15 -16c-7 0 -11 2 -16 17l-104 302l-103 -302c-5 -15 -9 -17 -16 -17c-8 0 -11 3 -15 16l-123 360c-11 33 -22 36 -66 36v26c21 -2 55 -2 77 -2c25 0 67 0 91 2v-26c-16 0 -50 0 -50 -26c0 -3 0 -5 5 -18l99 -289l92 268\nc-21 63 -21 65 -76 65v26c23 -2 49 -2 74 -2c24 0 66 0 89 2v-26c-16 0 -50 0 -50 -26c0 -4 3 -12 5 -19l102 -295l94 272c2 7 4 16 4 23c0 25 -17 43 -48 45v26c17 -2 60 -2 79 -2c20 0 40 1 60 2v-26c-15 -1 -55 -3 -75 -62z"
            },
            x: {
                x: 582,
                d: "M309 233l134 -174c24 -31 39 -33 89 -33v-26c-22 2 -54 2 -81 2c-25 0 -68 0 -92 -2v26c16 1 28 9 28 23c0 7 -12 22 -20 33l-87 113l-83 -102c-9 -12 -17 -23 -17 -41c0 -23 16 -25 22 -26v-26c-18 2 -62 2 -82 2c-18 0 -53 -1 -70 -2v26c27 1 74 5 119 59\nc11 14 98 121 98 125c0 3 -5 9 -7 11l-115 149c-24 30 -36 34 -90 34v26c22 -2 54 -2 81 -2c25 0 68 0 92 2v-26c-17 -1 -27 -11 -27 -23c0 -5 0 -7 9 -18l88 -115l74 94c5 7 15 18 15 36c0 14 -8 24 -22 26v26c23 -2 54 -2 81 -2c18 0 53 1 70 2v-26\nc-44 -1 -82 -17 -115 -55c-28 -33 -62 -77 -92 -116z"
            },
            y: {
                x: 564,
                d: "M430 342l-178 -439c-20 -50 -56 -106 -114 -106c-45 0 -86 29 -86 69c0 18 11 33 33 33c20 0 32 -15 32 -32s-10 -31 -33 -33c18 -18 43 -21 54 -21c63 0 89 69 134 187l-149 367c-13 32 -19 37 -73 37v26c22 -2 54 -2 81 -2c25 0 68 0 92 2v-26c-24 0 -47 -2 -47 -24\nc0 -1 0 -8 5 -20l119 -292l109 270c5 12 7 17 7 27c0 8 -1 36 -39 39v26c20 -2 53 -2 74 -2c19 0 44 1 63 2v-26c-14 0 -59 -1 -84 -62z"
            },
            z: {
                x: 452,
                d: "M391 407l-278 -389h128c122 0 135 51 143 162h18l-14 -180h-316c-21 0 -22 1 -22 15l286 399h-122c-115 0 -126 -42 -133 -139h-18l10 155h304c18 0 22 0 22 -9c0 -2 0 -4 -8 -14z"
            }
        }
    };
});
/*!
 * 字体管理器
 */
define("font/manager", [], function(require) {
    var FONT_LIST = {};
    return {
        registerFont: function(fontData) {
            FONT_LIST[fontData.meta.fontFamily] = fontData;
        },
        getFontList: function() {
            return FONT_LIST;
        },
        getCharacterMap: function(fontFamily) {
            if (!FONT_LIST[fontFamily]) {
                return null;
            }
            return FONT_LIST[fontFamily].map || {};
        },
        getCharacterData: function(char, fontFamily) {
            try {
                return FONT_LIST[fontFamily].data[char].d;
            } catch (e) {
                return null;
            }
        },
        /**
         * 按照指定的字体族， 返回给定的转义序列str所对应的unicode字符
         * 如果不存在对应的字体族或者该族内不存在对应的转义序列， 则返回空串
         * @param str 需要转义的序列
         * @param fontFamily 参考的字体族
         */
        getCharacterValue: function(str, fontFamily) {
            var map = this.getCharacterMap(fontFamily);
            if (!map) {
                return "";
            }
            return map[str] || "";
        }
    };
});
/**
 * 公式对象，表达式容器
 */
define("formula", [ "kity", "def/gtype", "conf", "font/kf-ams-main", "font/kf-ams-cal", "font/kf-ams-roman", "font/manager", "font/installer", "fpaper" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), CONF = require("conf"), FontManager = require("font/manager"), FontInstaller = require("font/installer"), DEFAULT_OPTIONS = {
        fontsize: 50,
        autoresize: true,
        padding: [ 0 ]
    }, EXPRESSION_INTERVAL = 10, ExpressionWrap = kity.createClass("ExpressionWrap", {
        constructor: function(exp, config) {
            this.wrap = new kity.Group();
            this.bg = new kity.Rect(0, 0, 0, 0).fill("transparent");
            this.exp = exp;
            this.config = config;
            this.wrap.setAttr("data-type", "kf-exp-wrap");
            this.bg.setAttr("data-type", "kf-exp-wrap-bg");
            this.wrap.addShape(this.bg);
            this.wrap.addShape(this.exp);
        },
        getWrapShape: function() {
            return this.wrap;
        },
        getExpression: function() {
            return this.exp;
        },
        getBackground: function() {
            return this.bg;
        },
        resize: function() {
            var padding = this.config.padding, expBox = this.exp.getFixRenderBox();
            if (padding.length === 1) {
                padding[1] = padding[0];
            }
            this.bg.setSize(padding[1] * 2 + expBox.width, padding[0] * 2 + expBox.height);
            this.exp.translate(padding[1], padding[0]);
        }
    }), Formula = kity.createClass("Formula", {
        base: require("fpaper"),
        constructor: function(container, config) {
            this.callBase(container);
            this.expressions = [];
            this.fontInstaller = new FontInstaller(this);
            this.config = kity.Utils.extend({}, DEFAULT_OPTIONS, config);
            this.initEnvironment();
            this.initFont();
        },
        initEnvironment: function() {
            this.zoom = this.config.fontsize / 50;
            if ("width" in this.config) {
                this.setWidth(this.config.width);
            }
            if ("height" in this.config) {
                this.setHeight(this.config.height);
            }
            this.node.setAttribute("font-size", DEFAULT_OPTIONS.fontsize);
        },
        initFont: function() {
            var fontInstaller = this.fontInstaller;
            kity.Utils.each(FontManager.getFontList(), function(fontData) {
                fontInstaller.mount(fontData);
            });
        },
        insertExpression: function(expression, index) {
            var expWrap = this.wrap(expression);
            // clear zoom
            this.container.clearTransform();
            this.expressions.splice(index, 0, expWrap.getWrapShape());
            this.addShape(expWrap.getWrapShape());
            notifyExpression.call(this, expWrap.getExpression());
            expWrap.resize();
            correctOffset.call(this);
            this.resetZoom();
            this.config.autoresize && this.resize();
        },
        appendExpression: function(expression) {
            this.insertExpression(expression, this.expressions.length);
        },
        resize: function() {
            var renderBox = this.container.getFixRenderBox();
            this.node.setAttribute("width", renderBox.width);
            this.node.setAttribute("height", renderBox.height);
        },
        resetZoom: function() {
            var zoomLevel = this.zoom / this.getBaseZoom();
            if (zoomLevel !== 0) {
                this.container.scale(zoomLevel);
            }
        },
        wrap: function(exp) {
            return new ExpressionWrap(exp, this.config);
        },
        clear: function() {
            this.callBase();
            this.expressions = [];
        },
        clearExpressions: function() {
            kity.Utils.each(this.expressions, function(exp, i) {
                exp.remove();
            });
            this.expressions = [];
        }
    });
    kity.Utils.extend(Formula, {
        registerFont: function(fontData) {
            FontManager.registerFont(fontData);
        }
    });
    // 自运行， 注册配置好的字体
    (function() {
        kity.Utils.each(CONF.font.list, function(fontData) {
            Formula.registerFont(fontData);
        });
    })();
    // 调整表达式之间的偏移
    function correctOffset() {
        var exprOffset = 0;
        kity.Utils.each(this.expressions, function(expr) {
            var box = null;
            if (!expr) {
                return;
            }
            expr.setMatrix(new kity.Matrix(1, 0, 0, 1, 0, 0));
            box = expr.getFixRenderBox();
            expr.translate(0 - box.x, exprOffset);
            exprOffset += box.height + EXPRESSION_INTERVAL;
        });
        return this;
    }
    // 通知表达式已接入到paper
    function notifyExpression(expression) {
        var len = 0, childGroup = null;
        if (!expression) {
            return;
        }
        if (expression.getType() === GTYPE.EXP) {
            for (var i = 0, len = expression.getChildren().length; i < len; i++) {
                notifyExpression(expression.getChild(i));
            }
        } else if (expression.getType() === GTYPE.COMPOUND_EXP) {
            // 操作数处理
            for (var i = 0, len = expression.getOperands().length; i < len; i++) {
                notifyExpression(expression.getOperand(i));
            }
            // 处理操作符
            notifyExpression(expression.getOperator());
        }
        expression.addedCall && expression.addedCall();
    }
    return Formula;
});
/**
 * 公式专用paper
 */
define("fpaper", [ "kity" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("FPaper", {
        base: kity.Paper,
        constructor: function(container) {
            this.callBase(container);
            this.container = new kity.Group();
            this.container.setAttr("data-type", "kf-container");
            this.background = new kity.Group();
            this.background.setAttr("data-type", "kf-bg");
            this.baseZoom = 1;
            this.zoom = 1;
            this.base("addShape", this.background);
            this.base("addShape", this.container);
        },
        getZoom: function() {
            return this.zoom;
        },
        getBaseZoom: function() {
            return this.baseZoom;
        },
        addShape: function(shape, pos) {
            return this.container.addShape(shape, pos);
        },
        getBackground: function() {
            return this.background;
        },
        removeShape: function(pos) {
            return this.container.removeShape(pos);
        },
        clear: function() {
            return this.container.clear();
        }
    });
});
/**
 * kity库封包
 */
define("kity", [], function(require, exports, module) {
    if (!window.kity) {
        throw new Error("Missing Kity Graphic Lib");
    }
    return window.kity;
});
/**
 * 分数操作符
 */
define("operator/binary-opr/fraction", [ "kity", "operator/binary-opr/up-down", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("FractionOperator", {
        base: require("operator/binary-opr/up-down"),
        constructor: function() {
            this.callBase("Fraction");
        },
        applyOperand: function(upOperand, downOperand) {
            upOperand.scale(.66);
            downOperand.scale(.66);
            var upWidth = Math.ceil(upOperand.getWidth()), downWidth = Math.ceil(downOperand.getWidth()), upHeight = Math.ceil(upOperand.getHeight()), downHeight = Math.ceil(downOperand.getHeight()), offset = 3, // 整体padding
            boxPadding = 5, maxWidth = Math.max(upWidth, downWidth), // 内部padding
            padding = 3, maxHeight = Math.max(upHeight, downHeight), operatorShape = generateOperator(maxWidth, offset);
            this.addOperatorShape(operatorShape);
            upOperand.translate((maxWidth - upWidth) / 2 + offset, maxHeight - upHeight);
            operatorShape.translate(0, maxHeight + padding);
            // 下部不需要偏移
            downOperand.translate((maxWidth - downWidth) / 2 + offset, maxHeight + padding + operatorShape.getHeight());
            this.parentExpression.setBoxSize(maxWidth + offset * 2, maxHeight * 2 + operatorShape.getHeight() + padding * 2);
            this.parentExpression.expand(boxPadding, boxPadding);
            this.parentExpression.translateElement(boxPadding, boxPadding);
        }
    });
    function generateOperator(width, offset) {
        return new kity.Rect(width + offset * 2, 1).fill("black");
    }
});
/**
 * 左右结合二元操作符
 * @abstract
 */
define("operator/binary-opr/left-right", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightOperator", {
        base: require("operator/binary"),
        applyOperand: function(leftOperand, rightOperand) {
            var operator = this, operatorBox = operator.getFixRenderBox(), // 操作数特殊处理
            leftOperandBox = leftOperand.getFixRenderBox(), rightOperandBox = rightOperand.getFixRenderBox(), // 偏移量
            offset = 0, // 操作对象最大高度
            maxHeight = Math.max(leftOperandBox.height, rightOperandBox.height, operatorBox.height);
            // 左操作数
            leftOperand.translate(offset, (maxHeight - leftOperandBox.height) / 2);
            // 操作符
            offset += leftOperandBox.width + leftOperandBox.x;
            operator.translate(offset, (maxHeight - operatorBox.height) / 2);
            // 右操作数
            offset += operatorBox.width + operatorBox.x;
            rightOperand.translate(offset, (maxHeight - rightOperandBox.height) / 2);
        }
    });
});
/**
 * 开方操作符
 */
define("operator/binary-opr/radical", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity"), // 符号图形属性
    // 线条宽度
    SHAPE_DATA_WIDTH = 1, // 计算公式
    radians = 2 * Math.PI / 360, sin20 = Math.sin(20 * radians), cos20 = Math.cos(20 * radians), tan20 = Math.tan(20 * radians), atan20 = Math.atan(20 * radians);
    return kity.createClass("RadicalOperator", {
        base: require("operator/binary"),
        constructor: function() {
            this.callBase("Radical");
        },
        applyOperand: function(radicand, exponent) {
            generateOperator.call(this, radicand, exponent);
        }
    });
    // 根据给定的操作数生成操作符的pathData
    // radicand 表示被开方数
    // exponent 表示指数
    function generateOperator(radicand, exponent) {
        var decoration = generateDecoration(radicand), vLine = generateVLine(radicand), hLine = generateHLine(radicand);
        this.addOperatorShape(decoration);
        this.addOperatorShape(vLine);
        this.addOperatorShape(hLine);
        adjustmentPosition.call(this, mergeShape(decoration, vLine, hLine), this.operatorShape, radicand, exponent);
        this.parentExpression.expand(0, 10);
        this.parentExpression.translateElement(0, 5);
    }
    // 生成根号中的左边装饰部分
    function generateDecoration(radicand) {
        var shape = new kity.Path(), // 命名为a以便于精简表达式
        a = SHAPE_DATA_WIDTH, h = radicand.getHeight() / 3, drawer = shape.getDrawer();
        // 根号尾部左上角开始
        drawer.moveTo(0, cos20 * a * 6);
        drawer.lineBy(sin20 * a, cos20 * a);
        drawer.lineBy(cos20 * a * 3, -sin20 * a * 3);
        drawer.lineBy(tan20 * h, h);
        drawer.lineBy(sin20 * a * 3, -cos20 * a * 3);
        drawer.lineBy(-sin20 * h, -h);
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的竖直线部分
    function generateVLine(operand) {
        var shape = new kity.Path(), h = operand.getHeight(), drawer = shape.getDrawer();
        drawer.moveTo(tan20 * h, 0);
        drawer.lineTo(0, h);
        drawer.lineBy(sin20 * SHAPE_DATA_WIDTH * 3, cos20 * SHAPE_DATA_WIDTH * 3);
        drawer.lineBy(tan20 * h + sin20 * SHAPE_DATA_WIDTH * 3, -(h + 3 * SHAPE_DATA_WIDTH * cos20));
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的水平线部分
    function generateHLine(operand) {
        // 表达式宽度
        var w = operand.getWidth() + 2 * SHAPE_DATA_WIDTH;
        return new kity.Rect(w, 2 * SHAPE_DATA_WIDTH).fill("black");
    }
    // 合并根号的各个部分， 并返回根号的关键点位置数据
    function mergeShape(decoration, vLine, hLine) {
        var decoBox = decoration.getFixRenderBox(), vLineBox = vLine.getFixRenderBox();
        vLine.translate(decoBox.width - sin20 * SHAPE_DATA_WIDTH * 3, 0);
        decoration.translate(0, vLineBox.height - decoBox.height);
        vLineBox = vLine.getFixRenderBox();
        hLine.translate(vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20, 0);
        // 返回关键点数据
        return {
            x: vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20,
            y: 0
        };
    }
    // 调整整个根号表达式的各个部分： 位置、操作符、被开方数、指数
    function adjustmentPosition(position, operator, radicand, exponent) {
        var exponentBox = null, opOffset = {
            x: 0,
            y: 0
        }, opBox = operator.getFixRenderBox();
        exponent.scale(.66);
        exponentBox = exponent.getFixRenderBox();
        if (exponentBox.width > 0 && exponentBox.height > 0) {
            opOffset.y = exponentBox.height - opBox.height / 2;
            // 指数不超出根号， 则移动指数
            if (opOffset.y < 0) {
                exponent.translate(0, -opOffset.y);
                opOffset.y = 0;
            }
            opOffset.x = exponentBox.width + opBox.height / 2 * tan20 - position.x;
        }
        operator.translate(opOffset.x, opOffset.y);
        radicand.translate(opOffset.x + position.x + SHAPE_DATA_WIDTH, opOffset.y + 2 * SHAPE_DATA_WIDTH);
    }
});
/**
 * 上下结合二元操作符
 * @abstract
 */
define("operator/binary-opr/up-down", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownOperator", {
        base: require("operator/binary"),
        applyOperand: function(upOperand, downOperand) {
            throw new Error("applyOperand is abstract");
        }
    });
});
/**
 * 二元操作符抽象类
 * @abstract
 */
define("operator/binary", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryOperator", {
        base: require("operator/operator"),
        setParentExpression: function(exp) {
            this.callBase(exp);
        }
    });
});
/**
 * 小括号操作符：()
 */
define("operator/brackets", [ "kity", "font/manager", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), FontManager = require("font/manager");
    return kity.createClass("BracketsOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Brackets");
        },
        applyOperand: function(exp) {
            generate.call(this, exp);
        }
    });
    function generate(exp) {
        var left = this.getParentExpression().getLeftSymbol(), right = this.getParentExpression().getRightSymbol(), leftPath = FontManager.getCharacterData(left, "KF AMS MAIN"), rightPath = FontManager.getCharacterData(right, "KF AMS MAIN"), group = new kity.Group(), leftOp = new kity.Path(leftPath).fill("black"), rightOp = new kity.Path(rightPath).fill("black"), expSpaceSize = exp.getFixRenderBox(), leftOpSize = null, rightOpSize = null, leftZoom = 1, rightZoom = 1, // 左右空间大小
        SPACE = 0, offset = 0;
        this.addOperatorShape(group.addShape(leftOp).addShape(rightOp));
        leftOpSize = leftOp.getFixRenderBox();
        rightOpSize = rightOp.getFixRenderBox();
        leftZoom = expSpaceSize.height ? expSpaceSize.height / leftOpSize.height : 1;
        rightZoom = expSpaceSize.height ? expSpaceSize.height / rightOpSize.height : 1;
        leftOp.scale(leftZoom);
        rightOp.scale(rightZoom);
        // 重新获取大小
        leftOpSize = leftOp.getFixRenderBox();
        rightOpSize = rightOp.getFixRenderBox();
        offset -= leftOpSize.x;
        leftOp.translate(offset, -leftOpSize.y);
        offset += SPACE + leftOpSize.width - expSpaceSize.x;
        exp.translate(offset, 0);
        offset += SPACE + expSpaceSize.width - rightOpSize.x;
        rightOp.translate(offset, -rightOpSize.y);
        this.parentExpression.expand(10, 0);
        this.parentExpression.translateElement(5, 0);
    }
});
/**
 * 组合操作符
 * 操作多个表达式组合在一起
 */
define("operator/combination", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("CombinationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Combination");
        },
        applyOperand: function() {
            // 偏移量
            var offset = 0, // 操作数
            operands = arguments, // 操作对象最大高度
            maxHeight = 0, cached = [];
            kity.Utils.each(operands, function(operand) {
                var box = operand.getFixRenderBox();
                cached.push(box);
                maxHeight = Math.max(box.height, maxHeight);
            });
            kity.Utils.each(operands, function(operand, index) {
                var box = cached[index];
                operand.translate(offset - box.x, (maxHeight - (box.y + box.height)) / 2);
                offset += box.width;
            });
        }
    });
});
/*!
 * 上下标控制器`  1``     ``  `   `       `432    1`
 */
define("operator/common/script-controller", [ "kity" ], function(require) {
    var kity = require("kity"), defaultOptions = {
        subOffset: 0,
        supOffset: 0,
        // 上下标的默认缩放值
        zoom: .66
    };
    return kity.createClass("ScriptController", {
        constructor: function(opObj, target, sup, sub, options) {
            this.opObj = opObj;
            this.target = target;
            this.sup = sup;
            this.sub = sub;
            this.options = kity.Utils.extend({}, defaultOptions, options);
        },
        // 上下标记
        applyUpDown: function() {
            var target = this.target, sup = this.sup, sub = this.sub, options = this.options;
            sup.scale(options.zoom);
            sub.scale(options.zoom);
            var targetBox = target.getFixRenderBox();
            // 基础空间大小
            var supBox = sup.getFixRenderBox(), subBox = sub.getFixRenderBox(), maxOffset = Math.max(supBox.height, subBox.height), space = {
                width: Math.max(targetBox.width, supBox.width, subBox.width),
                height: maxOffset * 2 + targetBox.height
            }, targetHeight = targetBox.height, vOffset = 0;
            if (supBox.height < maxOffset) {
                vOffset = maxOffset - supBox.height;
            }
            // 位置调整
            sup.translate((space.width - supBox.width) / 2, vOffset);
            target.translate((space.width - targetBox.width) / 2, maxOffset);
            sub.translate((space.width - subBox.width) / 2, maxOffset + targetBox.height);
            return space;
        },
        // 侧面标记
        applySide: function() {
            var target = this.target, sup = this.sup, sub = this.sub, options = this.options;
            sup.scale(options.zoom);
            sub.scale(options.zoom);
            var targetBox = target.getFixRenderBox();
            // 默认字符高度
            targetBox.height = targetBox.height || 50;
            // 基础空间大小
            var supBox = sup.getFixRenderBox(), subBox = sub.getFixRenderBox(), maxOffset = Math.max(supBox.height, subBox.height), space = {
                width: targetBox.width + Math.max(supBox.width + options.supOffset, subBox.width + options.subOffset),
                height: 0
            }, targetHeight = targetBox.height, vOffset = 0;
            // 水平方向调整
            sup.translate(targetBox.width + options.supOffset, 0);
            sub.translate(targetBox.width + options.subOffset, 0);
            if (maxOffset * 2 < targetHeight) {
                sub.translate(0, targetHeight - subBox.height);
                space.height = targetHeight;
            } else {
                vOffset = maxOffset - targetHeight / 2;
                target.translate(0, vOffset);
                if (supBox.height < targetHeight / 2) {
                    sup.translate(0, vOffset);
                } else {
                    sup.translate(0, maxOffset - supBox.height);
                }
                if (subBox.height < targetHeight / 2) {
                    sub.translate(0, vOffset + targetHeight - subBox.height);
                } else {
                    sub.translate(0, maxOffset * 2 - subBox.height);
                }
                space.height = maxOffset * 2;
            }
            return space;
        }
    });
});
/**
 * 函数操作符
 */
define("operator/func", [ "kity", "char/text", "font/manager", "signgroup", "operator/common/script-controller", "operator/operator", "def/gtype" ], function(require, exports, modules) {
    var kity = require("kity"), Text = require("char/text"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("FunctionOperator", {
        base: require("operator/operator"),
        constructor: function(funcName) {
            this.callBase("Function: " + funcName);
            this.funcName = funcName;
        },
        /*
         * 积分操作符应用操作数
         * @param expr 函数表达式
         * @param sup 上限
         * @param sub 下限
         */
        applyOperand: function(expr, sup, sub) {
            var opShape = generateOperator.call(this), padding = 5, expBox = expr.getFixRenderBox(), space = new ScriptController(this, opShape, sup, sub, {
                zoom: .5
            }).applyUpDown(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                expr.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                expr.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        }
    });
    /* 返回操作符对象 */
    function generateOperator() {
        var opShape = new Text(this.funcName, "KF AMS ROMAN");
        this.addOperatorShape(opShape);
        return opShape;
    }
});
/**
 * 积分操作符：∫
 */
define("operator/integration", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("IntegrationOperator", {
        base: require("operator/operator"),
        constructor: function(type) {
            this.callBase("Integration");
            // 默认是普通单重积分
            this.opType = type || 1;
        },
        setType: function(type) {
            this.opType = type | 0;
        },
        // 重置类型
        resetType: function() {
            this.opType = 1;
        },
        applyOperand: function(exp, sup, sub) {
            var opShape = this.getOperatorShape(), padding = 5, expBox = exp.getFixRenderBox(), space = new ScriptController(this, opShape, sup, sub, {
                subOffset: -15
            }).applySide(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                exp.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                exp.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        },
        getOperatorShape: function() {
            var pathData = "M1.318,48.226c0,0,0.044,0.066,0.134,0.134c0.292,0.313,0.626,0.447,1.006,0.447c0.246,0.022,0.358-0.044,0.604-0.268   c0.782-0.782,1.497-2.838,2.324-6.727c0.514-2.369,0.938-4.693,1.586-8.448C8.559,24.068,9.9,17.878,11.978,9.52   c0.917-3.553,1.922-7.576,3.866-8.983C16.247,0.246,16.739,0,17.274,0c1.564,0,2.503,1.162,2.592,2.57   c0,0.827-0.424,1.386-1.273,1.386c-0.671,0-1.229-0.514-1.229-1.251c0-0.805,0.514-1.095,1.185-1.274   c0.022,0-0.291-0.29-0.425-0.379c-0.201-0.134-0.514-0.224-0.737-0.224c-0.067,0-0.112,0-0.157,0.022   c-0.469,0.134-0.983,0.939-1.453,2.234c-0.537,1.475-0.961,3.174-1.631,6.548c-0.424,2.101-0.693,3.464-1.229,6.727   c-1.608,9.185-2.949,15.487-5.006,23.756c-0.514,2.034-0.849,3.24-1.207,4.335c-0.559,1.698-1.162,2.95-1.811,3.799   c-0.514,0.715-1.385,1.408-2.436,1.408c-1.363,0-2.391-1.185-2.458-2.592c0-0.804,0.447-1.363,1.273-1.363   c0.671,0,1.229,0.514,1.229,1.251C2.503,47.757,1.989,48.047,1.318,48.226z", group = new kity.Group(), opGroup = new kity.Group(), opShape = new kity.Path(pathData).fill("black"), opBox = new kity.Rect(0, 0, 0, 0).fill("transparent"), tmpShape = null;
            opGroup.addShape(opShape);
            group.addShape(opBox);
            group.addShape(opGroup);
            for (var i = 1; i < this.opType; i++) {
                tmpShape = new kity.Use(opShape).translate(opShape.getWidth() / 2 * i, 0);
                tmpShape.translate(10 * i, 0);
                opGroup.addShape(tmpShape);
            }
            tmpShape = null;
            opGroup.scale(1.6);
            this.addOperatorShape(group);
            opGroup.translate(2, 15);
            opBox.setSize(opGroup.getFixRenderBox().width + 4, opGroup.getFixRenderBox().height + 25);
            return group;
        }
    });
});
/**
 * 操作符抽象类
 * @abstract
 */
define("operator/operator", [ "kity", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("Operator", {
        base: require("signgroup"),
        constructor: function(operatorName) {
            this.callBase();
            this.type = GTYPE.OP;
            // 该操作符所属的表达式
            this.parentExpression = null;
            // 操作符名称
            this.operatorName = operatorName;
            // 操作符图形
            this.operatorShape = new kity.Group();
            this.addShape(this.operatorShape);
        },
        applyOperand: function() {
            throw new Error("applyOperand is abstract");
        },
        setParentExpression: function(exp) {
            this.parentExpression = exp;
        },
        getParentExpression: function() {
            return this.parentExpression;
        },
        clearParentExpression: function() {
            this.parentExpression = null;
        },
        // 提供给具体实现类附加其绘制的操作符图形的接口
        addOperatorShape: function(shpae) {
            return this.operatorShape.addShape(shpae);
        },
        getOperatorShape: function() {
            return this.operatorShape;
        }
    });
});
/**
 * 上下标操作符
 */
define("operator/script", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("ScriptOperator", {
        base: require("operator/operator"),
        constructor: function(operatorName) {
            this.callBase(operatorName || "Script");
        },
        applyOperand: function(operand, sup, sub) {
            var opShape = this.getOperatorShape(), padding = 5, space = new ScriptController(this, operand, sup, sub).applySide();
            this.parentExpression.setBoxSize(space.width, space.height);
            this.parentExpression.expand(0, padding * 2);
            this.parentExpression.translateElement(0, padding);
        }
    });
});
/**
 * 求和操作符：∑
 */
define("operator/summation", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("SummationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Summation");
            this.displayType = "equation";
        },
        applyOperand: function(expr, sup, sub) {
            var opShape = this.getOperatorShape(), expBox = expr.getFixRenderBox(), padding = 5, space = new ScriptController(this, opShape, sup, sub).applyUpDown(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                expr.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                expr.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        },
        getOperatorShape: function() {
            var pathData = "M0.672,33.603c-0.432,0-0.648,0-0.648-0.264c0-0.024,0-0.144,0.24-0.432l12.433-14.569L0,0.96c0-0.264,0-0.72,0.024-0.792   C0.096,0.024,0.12,0,0.672,0h28.371l2.904,6.745h-0.6C30.531,4.8,28.898,3.72,28.298,3.336c-1.896-1.2-3.984-1.608-5.28-1.8   c-0.216-0.048-2.4-0.384-5.617-0.384H4.248l11.185,15.289c0.168,0.24,0.168,0.312,0.168,0.36c0,0.12-0.048,0.192-0.216,0.384   L3.168,31.515h14.474c4.608,0,6.96-0.624,7.464-0.744c2.76-0.72,5.305-2.352,6.241-4.848h0.6l-2.904,7.681H0.672z", operatorShape = new kity.Path(pathData).fill("black"), opBgShape = new kity.Rect(0, 0, 0, 0).fill("transparent"), group = new kity.Group(), opRenderBox = null;
            group.addShape(opBgShape);
            group.addShape(operatorShape);
            operatorShape.scale(1.6);
            this.addOperatorShape(group);
            opRenderBox = operatorShape.getFixRenderBox();
            if (this.displayType === "inline") {
                operatorShape.translate(5, 15);
                opBgShape.setSize(opRenderBox.width + 10, opRenderBox.height + 25);
            } else {
                operatorShape.translate(2, 5);
                opBgShape.setSize(opRenderBox.width + 4, opRenderBox.height + 8);
            }
            return group;
        }
    });
});
/**
 * Created by hn on 13-12-3.
 */
define("signgroup", [ "kity", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("SignGroup", {
        base: kity.Group,
        constructor: function() {
            this.callBase();
            this.box = new kity.Rect(0, 0, 0, 0);
            this.type = GTYPE.UNKNOWN;
            this.addShape(this.box);
            this.zoom = 1;
        },
        setZoom: function(zoom) {
            this.zoom = zoom;
        },
        getZoom: function() {
            return this.zoom;
        },
        setBoxSize: function(w, h) {
            return this.box.setSize(w, h);
        },
        setBoxWidth: function(w) {
            return this.box.setWidth(w);
        },
        setBoxHeight: function(h) {
            return this.box.setHeight(h);
        },
        getType: function() {
            return this.type;
        },
        getBaseHeight: function() {
            return this.getHeight();
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        addedCall: function() {}
    });
});

/**
 * 模块暴露
 */

( function ( global ) {

    var oldGetRenderBox = kity.Shape.getRenderBox;

    kity.extendClass(kity.Shape, {
        getFixRenderBox: function () {
            return this.getRenderBox( this.container.container );
        }
    });

    define( 'kf.start', function ( require ) {

        global.kf = {

            // base
            Formula: require( "formula" ),
            Operator: require( "operator/operator" ),

            // expression
            Expression: require( "expression/expression" ),
            CompoundExpression: require( "expression/compound" ),
            TextExpression: require( "expression/text" ),
            EmptyExpression: require( "expression/empty" ),
            CombinationExpression: require( "expression/compound-exp/combination" ),
            FunctionExpression: require( "expression/compound-exp/func" ),

            FractionExpression: require( "expression/compound-exp/binary-exp/fraction" ),
            IntegrationExpression: require( "expression/compound-exp/integration" ),
            RadicalExpression: require( "expression/compound-exp/binary-exp/radical" ),
            ScriptExpression: require( "expression/compound-exp/script" ),
            SuperscriptExpression: require( "expression/compound-exp/binary-exp/superscript" ),
            SubscriptExpression: require( "expression/compound-exp/binary-exp/subscript" ),
            SummationExpression: require( "expression/compound-exp/summation" ),

            // Brackets expressoin
            BracketsExpression: require( "expression/compound-exp/brackets" )

        };

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
