/**method - for _calculate values in inputs*/
const calculate = str =>  {
    if (str.replace(/[\d\.+\-\/*\(\)]+/g, '').length > 0) {
            console.log('NaN1');
            return NaN;
        }
        let number_group = function (sub) {
            return sub === '' ? '' : '(' + sub + ')';
        };
        str = str.replace(/[\d]+(\.\d+)?/g, number_group);

        if (str.indexOf(')(') !== -1) {

            return NaN;
        }

        let sum_or_diff = function (sub, a, empty, sign, b) {
            return sign === "-" ? a - b : +a + +b;
        };
        let mult_or_div = function (sub, a, empty, sign, b) {
            return sign === "*" ? a * b : a / b;
        };
        let power = function (sub, a, empty, sign, b) {
            return Math.pow(a, b);
        };
        const match_power = /(-?[\d\.]+(\.\d+)?)\s*\^\s*(-?[\d\.?]+(\.\d+)?)/g;
        const match_mult_div = /(-?[\d\.]+(\.\d+)?)\s*([\*\/])\s*(-?[\d\.]+(\.\d+)?)/g;
        const match_sum_diff = /(-?[\d\.]+(\.\d+)?)\s*([\+-])\s*(-?[\d\.]+(\.\d+)?)/g;

        let get_value = function (sub, exp) {
            
            while (exp.indexOf("^") !== -1) {
                exp = exp.replace(match_power, power);
            }
            while (match_mult_div.test(exp)) {
                exp = exp.replace(match_mult_div, mult_or_div);
            }
            while (match_sum_diff.test(exp)) {
                exp = exp.replace(match_sum_diff, sum_or_diff);
            }
            return exp;
        };

        while (str.indexOf("(") !== -1 && str.indexOf(")") !== -1) {
            // убираем скобки
            str = str.replace(/\(([^\(\)]*)\)/g, get_value);
        }
        if (str.indexOf("(") !== -1 || str.indexOf(")") !== -1) {
            return NaN;
        }

        return parseFloat(get_value("", str));
};

export default calculate;