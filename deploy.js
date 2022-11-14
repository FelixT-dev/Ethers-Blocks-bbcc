const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //compile separately

  // http://127.0.0.1:7545 => RPC with ganache endpoint

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "9a21c73eef96fd418c1eabde7adae5eb63c460310379f7d02813a5e5640001ca",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => Process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
