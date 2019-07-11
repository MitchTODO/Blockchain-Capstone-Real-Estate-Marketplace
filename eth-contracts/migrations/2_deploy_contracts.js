// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//var TestERC721Mintable = artifacts.require("./HouseToken");
var verifier = artifacts.require('verifier.sol');


module.exports = async (deployer) => {
  await deployer.deploy(verifier);
  //await deployer.deploy(TestERC721Mintable,"HST_ERC721MintableToken", "HST_721");
  await deployer.deploy(SolnSquareVerifier, verifier.address, "HST_ERC721MintableToken", "HST_721");
};
