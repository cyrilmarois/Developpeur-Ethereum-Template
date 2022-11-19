import { useEffect, useRef } from "react";
import { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import NoticeVotingNotStarted from "./NoticeVotingNotStarted";
import "./Voting.css";

const Voting = ({ workflowStatus }) => {
  console.log({ "voting:init:workflowStatus": workflowStatus });
  const {
    state: { contract, accounts },
  } = useEth();
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [oldProposalEvent, setOldProposalEvent] = useState([]);
  const [value, setValue] = useState("");

  const voteProposalHandler = async () => {
    try {
      await contract.methods.setVote(value).call({ from: accounts[0] });
      await contract.methods.setVote(value).send({ from: accounts[0] });
    } catch (e) {
      setHasError(true);
      setError(e.message);
    }
  };

  const onDropdownSelected = async (e) => {
    setHasError(false);
    setError("");
    const value = parseInt(e.target.value);
    setValue(value);
  };

  useEffect(() => {
    if (contract) {
      const fetchProposalEvents = async () => {
        const oldProposalEvent = await contract.getPastEvents(
          "ProposalRegistered",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        );

        setOldProposalEvent(oldProposalEvent);
      };
      fetchProposalEvents().catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (contract) {
      const fetchProposals = async () => {
        const tmpProposals = await Promise.all(
          oldProposalEvent.map(async (event) => {
            const proposalId = parseInt(event.returnValues.proposalId);
            try {
              const tmpProposal = await contract.methods
                .getOneProposal(proposalId)
                .call({ from: accounts[0] });

              return tmpProposal?.description;
            } catch (e) {
              console.error();
              setHasError(true);
              setError(e.message);
            }
          })
        );
        setProposals(tmpProposals);
      };
      fetchProposals().catch(console.error);
    }
  }, [oldProposalEvent]);

  const voting = (
    <>
      <div id="voting" className="row justify-content-center">
        <h2 className="title">Voting time</h2>
        <div className="col-5">
          <form
            className="row justify-content-center g-3 needs-validation"
            noValidate
          >
            <select
              className={`form-select ${hasError ? "error" : ""}`}
              aria-label="Default select example"
              onChange={onDropdownSelected}
              required
            >
              <option defaultValue>Please select a proposal</option>

              {proposals.length > 0
                ? proposals.map((item, key) => (
                    <option key={key} value={key}>
                      {item}
                    </option>
                  ))
                : null}
            </select>
            <div className="error">{error}</div>
            <button
              onClick={voteProposalHandler}
              type="button"
              className="btn btn-primary btn-lg"
            >
              Vote
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {workflowStatus === 2 ? (
        <div className="col-md-12">
          <NoticeVotingNotStarted />
        </div>
      ) : workflowStatus === 3 ? (
        voting
      ) : null}
    </>
  );
};

export default Voting;
