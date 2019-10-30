var pseudoRandom = Math.random;
var visaPrefixList = new Array("4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4");
var mastercardPrefixList = new Array("51", "52", "53", "54", "55");
var amexPrefixList = new Array("34", "37");
var discoverPrefixList = new Array("6011");
var dinersPrefixList = new Array("300", "301", "302", "303", "36", "38");
var unionPayPrefixList = new Array("622305", "622698", "621483", "622202");
var enRoutePrefixList = new Array("2014", "2149");
var jcbPrefixList = new Array("35");
var voyagerPrefixList = new Array("8699");
var hipercardPrefixList = new Array("606282","3841");

var eloPrefixList = ( function() {
    list = ["5067","6277","6363","6550"];

    for(var i=5090; i<=5099; i++) {
        list.push(i + "");
    }

    for(i=6500; i<=6509; i++){
        list.push(i + "");
    }

    for(i=6516; i<=6517; i++){
        list.push(i + "");
    }

    return list.sort();
}());

function strrev(str) {
    if (!str) return '';

    var revstr = '';

    for (var i = str.length - 1; i >= 0; i--)
        revstr += str.charAt(i);

    return revstr;
}

function completed_number(prefix, length) {
    var ccnumber = prefix;

    while (ccnumber.length < (length - 1)) {
        ccnumber += Math.floor(pseudoRandom() * 10);
    }

    var reversedCCnumberString = strrev(ccnumber);
    var reversedCCnumber = new Array();

    for (var i = 0; i < reversedCCnumberString.length; i++) {
        reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
    }

    var sum = 0;
    var pos = 0;

    while (pos < length - 1) {
        var odd = reversedCCnumber[pos] * 2;

        if (odd > 9) {
            odd -= 9;
        }

        sum += odd;

        if (pos != (length - 2)) {
            sum += reversedCCnumber[pos + 1];
        }
        pos += 2;
    }

    var checkdigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;

    ccnumber += checkdigit;
    return ccnumber;
}

function credit_card_number(prefixList, length, howMany) {
    var result = new Array();

    for (var i = 0; i < howMany; i++) {
        var randomArrayIndex = Math.floor(pseudoRandom() * prefixList.length);
        var ccnumber = prefixList[randomArrayIndex];
        result.push(completed_number(ccnumber, length));
    }
    return result;
}

var Schemes = {
    "visa": { prefixList: visaPrefixList, digitCount: 16 },
    "mastercard": { prefixList: mastercardPrefixList, digitCount: 16 },
    "amex": { prefixList: amexPrefixList, digitCount: 15 },
    "diners": { prefixList: dinersPrefixList, digitCount: 14 },
    "discover": { prefixList: discoverPrefixList, digitCount: 16 },
    "unionpay": { prefixList: unionPayPrefixList, digitCount: 16 },
    "enroute": { prefixList: enRoutePrefixList, digitCount: 16 },
    "jcb": { prefixList: jcbPrefixList, digitCount: 16 },
    "voyager": { prefixList: voyagerPrefixList, digitCount: 16 },
    "elo" : { prefixList: eloPrefixList, digitCount: 16},
    "hipercard" : { prefixList: hipercardPrefixList, digitCount: 19 },
    "hipercard-short": { prefixList: [ hipercardPrefixList[0] ], digitCount: 16} 
};

function GenCC(CardScheme, howMany, randomGen) { 
    pseudoRandom = randomGen || pseudoRandom; 
    var amount = howMany || 1; 
    
    if (typeof Schemes[CardScheme] != 'undefined') { 
        return credit_card_number(Schemes[CardScheme].prefixList, Schemes[CardScheme].digitCount, amount); 
    } else { 
        return credit_card_number(Schemes["mastercard"].prefixList, Schemes["mastercard"].digitCount, amount); 
    } 
}

function main(argv) {
    
    var list = [];

    if(argv.length === 0) {
        list = GenCC();
    } else {
        var length = null;
        if(argv[argv.length - 1].match(/^[0-9]+$/)) {
            length = parseInt(argv[argv.length - 1]);
            delete argv[argv.length - 1];
        }

        argv.forEach((arg)=> {
            // console.log(length, arg, Schemes[arg]);
            list = list.concat(GenCC(arg,length));
        });
    }

    list.forEach(item => {console.log(item);});
}

main(process.argv.slice(2));

// console.log(GenCC(Schemes["elo"], 1000));

// console.log(process.argv.slice(2));

