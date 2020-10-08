const assert = require("assert");
const ganache = require("ganache-cli");
const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const bytecode = fs.readFileSync('./build/__contracts_basic_data_type_sol_DataType.bin');
const abi = JSON.parse(fs.readFileSync('./build/__contracts_basic_data_type_sol_DataType.abi'));
var accounts;
var bdt;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    bdt = await
    new web3.eth.Contract(abi)
        .deploy({
            data: '0x'+bytecode,
            
        }).send({
            from: accounts[0],
            gas:'1000000'
    });
//console.log(accounts);
});

describe('Basic Data Type',() => {
    it('deploys a BDT contract', () => {        
        assert.ok(bdt.options.address);
    });
    it('i is set to 6 by setInt() ',async () => {
        await bdt.methods.setInt(6).send({ from: accounts[0] } );
        const i = await bdt.methods.i().call();       
        assert.strictEqual (i,'6');
    });
    it('ui is set to 9 by setUint() ',async () => {
        await bdt.methods.setUint(9).send({ from: accounts[0] } );
        const ui = await bdt.methods.ui().call();       
        assert.strictEqual (ui,'9');
    });
    it('b is set to true by setBool() ',async () => {
        await bdt.methods.setBool(true).send({ from: accounts[0] } );
        const b = await bdt.methods.b().call();       
        assert.strictEqual (b,true);
    });
    it('s is set to "420" by setInt() ',async () => {
        await bdt.methods.setString("420").send({ from: accounts[0] } );
        const s = await bdt.methods.s().call();       
        assert.strictEqual (s,'420');
    });
    it('addr set by setAddress() ',async () => {
        await bdt.methods.setAddress().send({ from: accounts[0] } );
        const addr = await bdt.methods.addr().call();       
        assert.strictEqual (addr,accounts[0]);
    });
    
});