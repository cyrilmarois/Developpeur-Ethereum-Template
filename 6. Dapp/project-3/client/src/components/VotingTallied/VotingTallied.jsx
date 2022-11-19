import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./VotingTallied.css";

const VotingTallied = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [winnerProposal, setWinnerProposal] = useState("TADAMMM !!!");
  console.log({ winnerProposal });

  const startTallied = async () => {
    try {
      await contract.methods.tallyVotes().call({
        from: accounts[0],
      });
      await contract.methods.tallyVotes().send({
        from: accounts[0],
      });
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    (async function () {
      if (contract) {
        try {
          const tmpStatus = await contract.methods.workflowStatus().call({
            from: accounts[0],
          });
          console.log({ tmpStatus, Condition: parseInt(tmpStatus) === 5 });
          if (
            parseInt(tmpStatus) === 5 &&
            accounts[0] !== "0x5666eD746E98FA440ceD3714d5915c2556888a5c"
          ) {
            const tmpWinningProposalId = await contract.methods
              .winningProposalID()
              .call({ from: accounts[0] });

            const winner = await contract.methods
              .getOneProposal(tmpWinningProposalId)
              .call({
                from: accounts[0],
              });
            console.log({ winner });
            setWinnerProposal(winner.description);
          }
        } catch (e) {
          alert(e.message);
        }
      }
    })();
  }, [contract]);

  // return <div id="votingTallied" className="col"></div>;
  return (
    <div id="votingTallied" className="row">
      <div className="col">
        <h2 className="title">VotingTallied Component</h2>
        <div className="row">
          <button type="btn btn-primary" onClick={startTallied}>
            Pick the winner <span>&#128373;</span>
          </button>
          <h1>
            <span>&#128640;</span>
            <span>&#128640;</span>
            <span>&#128640;</span>
            {winnerProposal}
            <span>&#128640;</span>
            <span>&#128640;</span>
            <span>&#128640;</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VotingTallied;
