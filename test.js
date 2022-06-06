import { test } from 'tapzero'
import { hash, bleq } from 'coreword'
import { croc32 } from './croc32.js'

let { enc, dec } = croc32
let buf =x=> Buffer.from(x)

test('croc32', t=>{
    let hi = buf('hi')
    t.ok(bleq(hi, dec(enc(hi))))
    let hello = buf('hello')
    t.equal(enc(hello), 'd1JPrV3F')
    t.ok(bleq(hello, dec(enc(hello))))
    t.throws(()=> { dec('d1JPrV3f') })
    t.ok(dec('d1JPrV3f', false))
    t.ok(bleq(hello, dec('d1JPrV3f', false)))
    t.throws(()=> { dec(enc(hello, false), true) })
    t.ok(bleq(hello, dec(enc(hello, true), true)))
    t.ok(bleq(hello, dec(enc(hello, false), false)))
})
