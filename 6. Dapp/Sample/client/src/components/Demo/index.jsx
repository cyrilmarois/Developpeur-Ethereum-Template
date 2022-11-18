import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  const [say, setSay] = useState("init");
  const [balance, setBalance] = useState("0");

  const demo = (
    <>
      <Cta />
      <div className="contract-container">
        <Contract value={value} say={say} balance={balance} />
        <ContractBtns
          setValue={setValue}
          setSayan={setSay}
          setBalance={setBalance}
        />
      </div>
      <Desc />
    </>
  );

  return (
    <div className="demo">
      <Title />
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
