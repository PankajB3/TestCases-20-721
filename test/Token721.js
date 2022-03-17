// const { inputToConfig } = require('@ethereum-waffle/compiler');
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
// const chai = require("chai");
// const { solidity } =require("ethereum-waffle");
// chai.use(solidity);

describe("Testing Token721", async () => {
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    tkn._tokenIds = 0;
  });
  it("TC-1 Check name of contract", async () => {
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    expect(await tkn.name()).to.equal("Token721");
  });

  it("TC-2 Check symbol of contract", async () => {
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    expect(await tkn.symbol()).to.equal("T721");
  });

  it("TC-3 awardItem function => Check Token ID", async () => {
    const [player] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    await tkn.awardItem(player.address, "abxcx");
    const result = (await tkn.getTokenId()).toString();
    // expect( (await tkn.balanceOf(player.address)).toNumber() ).to.equal(1);
    // console.log(result);
    expect(result).to.equal("1");
  });

  it("TC-4 awardItem function => check balance of player", async () => {
    const [player] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    await tkn.awardItem(player.address, "abcbc");
    expect((await tkn.balanceOf(player.address)).toNumber()).to.equal(1);
  });

  it("TC-5 Check ownerOf", async () => {
    const [player] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    await tkn.awardItem(player.address, "abcfgc");
    const tokenId = (await tkn.getTokenId()).toString();
    expect(await tkn.ownerOf(tokenId)).to.equal(player.address);
  });

  it("TC-6 Check for non existent tokenId", async () => {
    const [player] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    await tkn.awardItem(player.address, "abcfgc");
    expect(await tkn.ownerOf(0)).to.not.equal(player.address);
  });

  it("TC-7 Check fro TransferFrom, when caller = from", async () => {
    const [player, player2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token721");
    const tkn = await Token.deploy();
    await tkn.awardItem(player.address, "abdvbsgb");
    const prevBalance = (await tkn.balanceOf(player2.address)).toNumber();
    const result = await tkn.transferFrom(player.address, player2.address, 1);
    //    console.log(result);
    expect(
      (await tkn.balanceOf(player2.address)).toNumber()
    ).to.be.greaterThanOrEqual(prevBalance);
    console.log("tkn"+tkn);
  });

  
});
