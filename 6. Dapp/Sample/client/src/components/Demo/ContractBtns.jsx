import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setSayan }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputSay, setInputSay] = useState("");

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleInputSayChange = (e) => {
    if (/^\w+$/.test(e.target.value)) {
      setInputSay(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  const getGreeter = async () => {
    const toto = await contract.methods
      .getGreeter()
      .call({ from: accounts[0] });
    setSayan(toto);
  };

  const setGreeter = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputSay === "") {
      alert("Please say something");
      return;
    }
    const titi = inputSay;
    await contract.methods.setGreeter(titi).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div onClick={write} className="input-btn">
        write(
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
        )
      </div>

      <button onClick={getGreeter}>getGreeter()</button>

      <div onClick={setGreeter} className="input-btn">
        setGreeter(
        <input
          type="text"
          placeholder="string"
          value={inputSay}
          onChange={handleInputSayChange}
        />
        )
      </div>
    </div>
  );
}

export default ContractBtns;
