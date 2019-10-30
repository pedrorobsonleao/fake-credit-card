/* jshint esversion:8 */

const fakeCreditCard = ((howMany) => {
    const _flags = {
        ELO: "elo",
        JCB: "jcb",
        AMEX: "amex",
        VISA: "visa",
        DINERS: "diners",
        MASTER: "master",
        VOYAGER: "voyager",
        ENROUTE: "en_route",
        DISCOVER: "discover",
        UNIONPAY: "union_pay",
        HIPERCARD: "hipercard"
    };

    var _pseudoRandom = Math.random;

    const scheme = (() => {
        var lst = {};
        Object.keys(_flags).forEach(key => {
            switch (key) {
                case "MASTER":
                    lst[key] = {
                        prefixList: ["51", "52", "53", "54", "55"],
                        digitCount: 16
                    };
                    break;
                case "VISA":
                    lst[key] = {
                        prefixList: ["4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4"],
                        digitCount: 16
                    };
                    break;
            }
        });
        return lst;
    })();

    const strrev = (str) => {
        return str.split("").reverse().join("");
    };

    const completed_number = (prefix, length) => {
        var ccnumber = prefix;

        while (ccnumber.length < (length - 1)) {
            ccnumber += Math.floor(_pseudoRandom() * 10);
        }

        var reversedCCnumberString = strrev(ccnumber);
        var reversedCCnumber = [];

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
    };

    const credit_card_number = (prefixList, length, howMany) => {
        var result = [];

        for (var i = 0; i < howMany; i++) {
            var randomArrayIndex = Math.floor(_pseudoRandom() * prefixList.length);
            var ccnumber = prefixList[randomArrayIndex];
            result.push(completed_number(ccnumber, length));
        }
        return result;
    };

    const generate = (flag, howMany, randomGen) => {
        _pseudoRandom = randomGen || _pseudoRandom; 
        var amount = howMany || 1; 
        
        if(Object.keys(_flags).indexOf(flag) >= 0) {
            return credit_card_number(
                scheme[flag].prefixList,
                scheme[flag].digitCount,
                amount
                );
        }

        throw {
            exception: "flag not found",
            flag: flag
        };
    };

    const getCards = (flag) => {
        var list = [];
        generate(flag, howMany).forEach(card => {
            list.push({number:card });
        });
        return list;
    };

    const getExpiration = (flag) => {
        return getCards(flag).filter(number => {
            number.exception = Math.round(Math.random() * 11 + 1) + "/" + parseInt(new Date().getFullYear() * 1 + (Math.round(Math.random() * 7)));
            return true;
        });
    };

    const getCvv = (flag) => {
        return getExpiration(flag).filter(number => {
            number.cvv = Math.round(Math.random() * 899) + 100;
            return true;
        });
    };

    return {
        card: (flag) => {
            return {
                cvv: getCvv(flag),
                numbers: getCards(flag),
                expiration: getExpiration(flag)
            };
        }
    };
})();

console.log(JSON.stringify({
    onlyCards: fakeCreditCard.card("VISA").numbers, 
    cardsAndExipration: fakeCreditCard.card("VISA").expiration,
    cardsExpirationAndCvv: fakeCreditCard.card("VISA").cvv
}));