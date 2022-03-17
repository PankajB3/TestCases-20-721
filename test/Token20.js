const {expect} = require('chai');
const { ethers } = require('hardhat');

const chai = require("chai");
const { solidity } =require("ethereum-waffle");
chai.use(solidity);

describe('Testing Token20',()=>{
    // let Token20, token20, addr1,addr2;

    // beforeEach(async()=>{
    //     const [owner,addr1,addr2] = await ethers.getSigners();
    //     const Token = await ethers.getContractFactory("Token20");
    //     const hardhatToken = await Token.deploy();
    // })
    it('TC-1 Test mint function',async()=>{
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token20");
        const hardhatToken = await Token.deploy();
        await hardhatToken.mintToken(owner.address,100);
        const result = await hardhatToken.balanceOf(owner.address);
        expect(result.toNumber()).to.equal(
        100
             );
    })
    it('TC-2 Test transferOne function',async()=>{
        const [owner,addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token20");
        const hardhatToken = await Token.deploy();
        await hardhatToken.mintToken(owner.address,100);
        await  hardhatToken.transferOne(addr1.address,1);
        expect((await hardhatToken.balanceOf(addr1.address)).toNumber()).to.equal(1);
    })

    it('TC-3 Check only 1 gets transferred', async()=>{
        const [sender,addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token20");
        const tkn = await Token.deploy();
        await tkn.mintToken(sender.address,100);
    //    const result =  await tkn.transferOne(addr1.address, 2);
        expect(await tkn.transferOne(addr1.address, 2)).to.be.revertedWith('Amount cannot exceed one');;
    })

    it('TC-4 Test findSupply function',async()=>{
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token20");
        const hardhatToken = await Token.deploy();
        await hardhatToken.mintToken(owner.address,100);
        await hardhatToken.mintToken(owner.address,100);
        await hardhatToken.findSupply();
        expect((await hardhatToken.totalSupply()).toNumber()).to.equal(200);
    })
    it('TC-5 check name for contract',async()=>{
        const token = await ethers.getContractFactory("Token20");
        const tkn = await token.deploy();
        expect(await tkn.name()).to.equal("Token20");
    })
    it('TC-6 check symbol for contract',async()=>{
        const token = await ethers.getContractFactory("Token20");
        const tkn = await token.deploy();
        expect(await tkn.symbol()).to.equal("tkn20");
    })
})