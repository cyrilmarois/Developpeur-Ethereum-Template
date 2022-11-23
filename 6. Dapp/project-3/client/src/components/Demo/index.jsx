import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Debug from "../Debug/Debug";
import Voting from "../Voting/Voting";
import VotingTallied from "../VotingTallied/VotingTallied";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Progress from "./Progress/Progress";
import MenuStatus from "../MenuStatus/MenuStatus";
import Result from "../Result/Result";
import AddVoter from "../AddVoter/AddVoter";
import AddProposal from "../AddProposal/AddProposal";

const Demo = () => {
  const { state } = useEth();
  const {
    state: { contract, accounts, isOwner },
  } = useEth();

  const [workflowStatus, setWorkflowStatus] = useState(0);
  // console.log({
  //   "index:init:workflowStatus": workflowStatus,
  // });

  useEffect(() => {
    (async function () {
      if (contract) {
        try {
          // get current status
          const tmpStatus = await contract.methods.workflowStatus().call({
            from: accounts[0],
          });
          // console.log({ "index:call:tmpStatus": parseInt(tmpStatus) });
          setWorkflowStatus(parseInt(tmpStatus));
        } catch (e) {
          alert(e.message);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (contract) {
        // fetch new status
        const fetchStatus = async () => {
          await contract.events
            .WorkflowStatusChange({ fromBlock: "earliest" })
            .on("data", (event) => {
              let newStatusEvent = event.returnValues.newStatus;
              // console.log({ "index:newStatusEvent": parseInt(newStatusEvent) });
              setWorkflowStatus(parseInt(newStatusEvent));
            });
        };
        fetchStatus().catch(console.error);
      }
    })();
  }, []);
  // console.log({ "index:end:workflowStatus": workflowStatus });

  const demo = (
    <>
      <div className="container">
        <div className="row">
          <Progress workflowStatus={workflowStatus} />
          <div className="row">
            <div className="col-md-2">
              {isOwner ? <MenuStatus workflowStatus={workflowStatus} /> : null}
            </div>
            <div className="col-md-10">
              {/* {isOwner && workflowStatus === 0 ? <AddVoter /> : null} */}
              {/* {!isOwner ? <AddProposal workflowStatus={workflowStatus} /> : null} */}
              {!isOwner ? <Voting workflowStatus={workflowStatus} /> : null}
              {/* {isOwner && workflowStatus === 4 ? <VotingTallied /> : null}
          {!isOwner && workflowStatus === 5 ? <Result /> : null} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {!state.artifact ? (
        <div className="col-md-12">
          <NoticeNoArtifact />
        </div>
      ) : !state.contract ? (
        <div className="col-md-12">
          <NoticeWrongNetwork />
        </div>
      ) : (
        demo
      )}
    </>
  );
};

export default Demo;
