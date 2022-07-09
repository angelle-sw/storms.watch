import Image from "next/image";

function Logo() {
  return (
    <div className="logo-container">
      <Image src="./images/logo.png" className="logo" alt="storms.watch" />
      <div className="storm-mode-indicator blink"></div>
    </div>
  );
}

export default Logo;
