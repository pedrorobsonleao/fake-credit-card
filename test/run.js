/* jshint esversion: 8 */

const fakecc = require("../index");
const assert = require("assert");

describe("test fake_credit_card", () => {
    it("one visa card number", () => {
        let card = fakecc.flag(fakecc.flags.VISA).cardNumber;
        assert.equal(1, card.length, JSON.stringify(card));
    });
    it("one master card number", () => {
        let card = fakecc.flag(fakecc.flags.MASTER).cardNumber;
        assert.equal(1, card.length);
    });
    it("a invalid flag card number", () => {
        try {
            fakecc.flag("zzz").cardNumber;
        } catch (e) {
            assert.equal("flag not found", e.exception);
        }
    });
    it("card with expiration date", () => {
        let card = fakecc.flag("master").withExpiration;
        assert.equal("string",typeof card[0].expiration);
    });
    it("card with cvv", () => {
        let card = fakecc.flag("master").withCvv;
        assert.equal("number",typeof card[0].cvv);
    });
    it("many cards", () => {
        let i = 1000;
        let card = fakecc.howMany(i).flag("Visa").cardNumber;
        assert.equal(i,card.length);
    });
});
