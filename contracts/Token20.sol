// SPDX-License-Identifier:MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Token20 is ERC20{
    mapping(address=>uint256) userToken;
    constructor()ERC20("Token20","tkn20"){}

    function mintToken(address user, uint256 amt)external{
        _mint(user,amt);
        userToken[user]+=amt;
        // console.log("hello");
    }

    function transferOne(address user, uint256 amt) external{
        require(userToken[msg.sender]>0,"Insufficient Balance");
        // transferFrom(msg.sender,user, balanceOf(msg.sender));
        require(amt==1, "Amount cannot exceed one");
        transfer(user,amt);
        userToken[msg.sender] -= 1;
        userToken[user] += 1;
    }

    // function transfer(address user, uint256 amt)public  override returns(bool){
    //     // require(amt==1, "Amount cannot exceed one");
    //     _transfer(_msgSender(), user, amt);
    //     return true;
    //     // return true;
    // }

    function findBalance(address user)view external returns(uint256){
        return balanceOf(user);
    }

    function findSupply()view external returns(uint256){
        return totalSupply();
    }
}
