import { useEth } from "../../contexts/EthContext";

function Cta() {
  const {
    state: { contract, accounts },
  } = useEth();
  const loggedAccount = accounts[0];

  return (
    <p>
      {loggedAccount}
      <br />
      Try changing&nbsp;
      <span className="code">value</span>
      &nbsp;in&nbsp;
      <span className="code">SimpleStorage</span>.
    </p>
  );
}

export default Cta;
