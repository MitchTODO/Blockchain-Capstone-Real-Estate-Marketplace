var ERC721MintableComplete = artifacts.require('HouseToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const symbol = "HST721";
    const name = "HouseToken721";

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
            // TODO: mint multiple tokens
            for(let number = 0; number <= 5; number++){
              let status = await this.contract.mint(account_two,number,{from:account_one});
            }

        })
        it('should return full tokenURI', async function() {
          let tokenURI = await this.contract.tokenURI(0);
          console.log(tokenURI);
        })


        it('should return total supply', async function () {
          let amount = await this.contract.totalSupply();
          assert.equal(parseInt(amount),6,"Incorrect token amount for total supply");
        })

        it('should get token balance', async function () {
          let balance = await this.contract.balanceOf(account_two);
          assert.equal(parseInt(balance), 6, "Incorrect token balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
          let uri = await this.contract.BaseTokenURI();
          assert.equal(uri,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Incorrect uri");
        })

        it('should transfer token from one owner to another', async function () {
          let amountTwo = await this.contract.ownerOf(1);
          await this.contract.transferFrom(account_two,account_three,1,{from:account_two});
          let amount = await this.contract.ownerOf(1);
          assert.equal(amount,account_three,"Incorrect token amount");
        })

    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
        try{
          let status = await this.contract.mint(account_two,8,{from:account_two});
        }catch{

        }

        })

        it('should return contract owner', async function () {
          let owner = await this.contract._owner.call();
          assert.equal(owner, account_one,"Owner is not correct");
        })

    });

})
