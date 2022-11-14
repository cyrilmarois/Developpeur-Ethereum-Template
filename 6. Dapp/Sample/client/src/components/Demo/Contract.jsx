import { useRef, useEffect } from "react";

function Contract({ value, say }) {
  const spanEle = useRef(null);

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

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function setGreeter(string memory _say) external {
    greeter = _say;
  }

  function getGreeter() external view returns (string memory) {
    return greeter;
  }
}`}
    </code>
  );
}

export default Contract;
