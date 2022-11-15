import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value, say }) {
  const {
    state: { contract },
  } = useEth();

  const spanEle = useRef(null);
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("valueChanged", {
        fromBlock: 0,
        toBlock: "latest",
      });

      let oldies = [];
      oldEvents.forEach((event) => {
        oldies.push(event.returnValues._val);
        console.log(event.returnValues._val);
      });
      setOldEvents(oldies.toString());

      await contract.events
        .valueChanged({ fromBlock: "earliest" })
        .on("data", (event) => {
          let newEvent = event.returnValues._val;
          setEventValue(newEvent);
          console.log(newEvent);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);
  // useEffect(() => {
  //   spanEle.current.classList.add("flash");
  //   const flash = setTimeout(() => {
  //     spanEle.current.classList.remove("flash");
  //   }, 300);
  //   return () => {
  //     clearTimeout(flash);
  //   };
  // }, [value, say]);

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}
      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>
      {`;
  string greeter = `}
      <span className="secondary-color" ref={spanEle}>
        <strong>{say}</strong>
      </span>
      {`
  event valueChanged(uint256 _val);

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    require(newValue != 5, "Invalid input, 5 is forbidden");
    value = newValue;
    emit valueChanged(newValue);
  }

  function setGreeter(string memory _say) external {
    greeter = _say;
  }

  function getGreeter() external view returns (string memory) {
    return greeter;
  }

Incoming event :
`}
      {eventValue}
      {`Old events :
`}
      {oldEvents}
    </code>
  );
}

export default Contract;
