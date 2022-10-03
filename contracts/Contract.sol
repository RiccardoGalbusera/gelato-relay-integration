pragma solidity ^0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract Contract is ERC2771Context {
    address owner;
    uint256 public count;
    address[] public senders;
    address public immutable gelatoTrustedForwarder =
        0xaBcC9b596420A9E9172FD5938620E265a0f9Df92;

    modifier onlyTrustedForwarder() {
        require(
            isTrustedForwarder(msg.sender),
            "Only callable by Trusted Forwarder"
        );
        _;
    }

    constructor() ERC2771Context(gelatoTrustedForwarder) {
        owner = msg.sender;
    }

    function counter() public onlyTrustedForwarder {
        count++;
        senders.push(_msgSender());
    }

    function returnFunds() public {
        require(msg.sender == owner, "Only callable by owner");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
