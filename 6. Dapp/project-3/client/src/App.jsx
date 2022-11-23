import { EthProvider } from "./contexts/EthContext";
import { WorkflowStatusProvider } from "./contexts/WorkflowStatusContext";
import Header from "./components/Header/Header.jsx";
import Demo from "./components/Demo";
import "./App.css";

function App() {
  // const goerliAddressContract = "0x74cd60f2a1f248838222fbfee20b8a6dae5c5800";
  // (0) 0x0290DbD9baD5d4E3C0b92F808025A6BF906019C2 (1000 ETH)
  // (1) 0x2f031b8A4b101bE22CeFBe389807587d34Aa330a (1000 ETH)
  // (2) 0xdB984DE416b5D528fe3436d6b89eD81046FD7630 (1000 ETH)
  // (3) 0xD5b131a81e4751a8c918563b99FedFA454b8CA3C (1000 ETH)
  // (4) 0x2A7F4c135B251ee8d9f566b9f5757A1449e5c3f2 (1000 ETH)
  // (5) 0xdFbC50aD87F9d55d7eF3F2FFB6943bE9E139A949 (1000 ETH)
  // (6) 0x6fD055B5f3745dA89c7D0d94f7314A14223ae763 (1000 ETH)
  // (7) 0x1436d0D108f73273C352FAF7063364E8888e1751 (1000 ETH)
  // (8) 0x5D8608455a027c644B940239B24904A938cb21B1 (1000 ETH)
  // (9) 0x8257990101724DdA6831329318786CF6572C60fF (1000 ETH)

  // Private Keys
  // ==================
  // (0) 0xa16f61ac72e7762b3338c296e70ac5d5a3977328f7dceae51eaaaa58f60bdaa5
  // (1) 0x3d786c01b9507000af8dfe272915dcd8a81db8c2f4cb7978756b626018fe40e1
  // (2) 0x5003441dec9f5cd80b934a93fbc2daedbc6bc20a2c4c98665f0a400a3c315568
  // (3) 0x9dbed852460294d9d476c334d093916595b4269090c1db619a6bd9462ba0b6e6
  // (4) 0x1d5e4850746eb2b6c307c45d221006ff37a2ed0f4842dcdd0c0d56824ec7752e
  // (5) 0x51806d2d64e4d5fd728ad525769a070644ff2d4c4f1676d7d444092833abb963
  // (6) 0x5b08d2a5c1e6a2d16c564bf879b729ab84f69fea786fb4769a55cea85138dc34
  // (7) 0xed43da550b2edad4c05f0c9509776c8769a5a73de4f179953f7ed1d9fd99c323
  // (8) 0x6097589887a0675833eba2f61648bf8c5aeb1457202970bd357138739d45b00d
  // (9) 0x31f532f31557d13ca7b6ed19e1d962fa824864c8b52cd49812bbf59d2f42a415

  // HD Wallet
  // ==================
  // Mnemonic:      step chest visa tell inmate tent fine check equip mobile mercy example

  return (
    <EthProvider>
      {/* <WorkflowStatusProvider> */}
      <div id="App">
        <div className="container-fluid">
          <Header />
          <Demo />
        </div>
      </div>
      {/* </WorkflowStatusProvider> */}
    </EthProvider>
  );
}

export default App;
