import React from "react";
import { FaPlusCircle as NewSourceIcon } from "react-icons/fa";

type Props = {
  openAddModal: () => void;
};

const NewSource = ({ openAddModal }: Props) => (
  <div className="card new-source" onClick={openAddModal} role="button">
    <NewSourceIcon size={40} className="new-source-icon" />
  </div>
);

export default NewSource;
