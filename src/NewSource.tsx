import React from "react";
import { FaPlusCircle as NewSourceIcon } from "react-icons/fa";

type Props = {
  openAddModal: () => void;
};

const NewSource = ({ openAddModal }: Props) => {
  return (
    <div
      className="card-container new-source"
      onClick={openAddModal}
      role="button"
    >
      <NewSourceIcon size={40} className="new-source-icon" />
    </div>
  );
};

export default NewSource;
