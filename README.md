
## croc32

Crockford base32 with letter-case checksums similar to ETH addresses.

1. Take [crockford base32](https://www.crockford.com/base32.html) of value (e.g. [base32.js](https://github.com/speakeasyjs/base32.js)
2. Take hash of value (keccak256)
3. Uppercase Nth letter of encoded string if bit 0 of byte N of hash is 1

Checksum density:
- (22/32) check bits per char
- 5 value bits per char
- = 0.1375 check bits per bit = 1.1 check bits per byte
- encoding density is (5/8) so this gives 0.6875 check bits per encoded bytes
- !! up to a maximum of 32 check bits, b/c it only uses LSB of each byte in hash (32 bytes) for simplicity