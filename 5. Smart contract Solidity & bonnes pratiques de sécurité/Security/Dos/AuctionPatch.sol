pragma solidity 0.8.9;

contract AuctionPatch {
    address highestBidder;
    uint256 highestBid;
    mapping(address => uint256) refunds;

    function bid() payable public {
        require(msg.value >= highestBid);

        // check for the first bid
        if (highestBidder != address(0)) {
            refunds[highestBidder] += hightestBid;     // record the fund that the bidder can claim
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function refundBidder() external {
        uint256 refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        (bool success) = msg.sender.call{value: refund}("");
        require(success);
    }
}
