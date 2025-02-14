const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt=require("prompt-sync")({sigint:true});

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  var name = prompt("Please enter a name to check if its on our Gift-List.");
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

    try {

      const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        // TODO: add request body parameters here!
        proof: proof,
        name: name
      });

      prompt(gift);

      console.log({ gift });

    } catch (ex) {
      console.log(ex);
      prompt(ex.response.data.message);
    }

}


main();