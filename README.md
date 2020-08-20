# fake-credit-card
Fake Credit Card Number Generator

This code is  based in original [creditcardvalidator](http://creditcardvalidator.org) website.

The code generate a random credcard list with cvv and expiration date.

This is only to test use or studies.

## how to

### install

to install package run:

```bash
yarn add fake-credit-card
```

### test

to run unity tests

```bash
yarn test

yarn run v1.19.1
$ mocha


  test fake_credit_card
    ✓ one visa card number
    ✓ one master card number
    ✓ a invalid flag card number
    ✓ card with expiration date
    ✓ card with cvv
    ✓ many cards


  6 passing (38ms)

Done in 0.86s.
```

## use sample

```javascript
node
> const fakecc = require("../index");
> console.log(fakecc.flag(fakecc.flags.VISA).cardNumber);
[ { number: '4999452238006090' } ]
```
read test file to more sample.

## coming

support to this credcard flags.
```javascript
> Object.keys(fakecc.flags)
[ 'ELO',
  'JCB',
  'AMEX',
  'VISA',
  'DINERS',
  'MASTER',
  'VOYAGER',
  'ENROUTE',
  'DISCOVER',
  'UNIONPAY',
  'HIPERCARD' ]
```

## contacts
pedro.leao@gmail.com
