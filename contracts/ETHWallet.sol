// contracts/ETHWallet.sol
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract ETHWallet {
    mapping(address => UserInfo) public users;
    
    struct UserInfo {
        bool isRegistered;
        uint256 balance;
        uint256 lastActivity;
    }
    
    event UserRegistered(address indexed user);
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Trade(address indexed user, bool isBuy, uint256 amount, uint256 price);
    
    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "Not registered");
        _;
    }
    
    function register() external {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender].isRegistered = true;
        users[msg.sender].lastActivity = block.timestamp;
        emit UserRegistered(msg.sender);
    }
    
    function deposit() external payable onlyRegistered {
        users[msg.sender].balance += msg.value;
        users[msg.sender].lastActivity = block.timestamp;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external onlyRegistered {
        require(users[msg.sender].balance >= amount, "Insufficient balance");
        users[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
    
    function trade(bool isBuy, uint256 amount) external payable onlyRegistered {
        require(amount > 0, "Invalid amount");
        
        if (isBuy) {
            require(msg.value == amount, "Incorrect amount sent");
            users[msg.sender].balance += amount;
        } else {
            require(users[msg.sender].balance >= amount, "Insufficient balance");
            users[msg.sender].balance -= amount;
            payable(msg.sender).transfer(amount);
        }
        
        emit Trade(msg.sender, isBuy, amount, getCurrentPrice());
    }
    
    function getBalance() external view returns (uint256) {
        return users[msg.sender].balance;
    }
    
    function getCurrentPrice() public view returns (uint256) {
        // Mock price feed - in production connect to Chainlink
        return 2000 * 10**18; // $2000 per ETH
    }
}