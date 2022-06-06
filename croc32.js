import base32 from 'base32.js'
import { hash, bleq } from 'coreword'

export const croc32 = {
    enc: (buf, check=true) => {
        let dig = hash(buf)
        let enc = new base32.Encoder({ type: 'crockford', lc: true })
        let str = enc.write(buf).finalize()
        let arr = []
        for(let i = 0; i < str.length; i++) {
            let byt = dig[i % dig.length]
            if (check && byt % 2) {
                arr.push(str[i].toUpperCase())
            } else {
                arr.push(str[i])
            }
        }
        let chk = arr.join('')
        return chk
    },
    dec: (str, check=true) => {
        var dec = new base32.Decoder({ type: "crockford" });
        var out = dec.write(str).finalize();
        if (check) {
            let chk = croc32.enc(out)
            if (chk !== str) {
                throw new Error(`Checksum failed:\n given: ${str}\n check: ${chk}`)
            }
        }
        return Buffer.from(out)
    }
}

