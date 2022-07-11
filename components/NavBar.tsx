import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAdmin from "../hooks/useAdmin";
import useToggleStormModeStatus from "../hooks/useToggleStormModeStatus";
import AdminDashboardIcon from "./AdminDashboardIcon";
import HomeIcon from "./HomeIcon";
import ToggleStormModeConfirmationModal from "./ToggleStormModeConfirmationModal";
import ToggleStormModeStatusButton from "./ToggleStormModeStatusButton";

type Props = {
  adminPassphrase: string;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function NavBar({ adminPassphrase }: Props) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { data: status, mutate: setStatus } =
    useToggleStormModeStatus(adminPassphrase);

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const router = useRouter();
  const { data: adminData } = useAdmin(adminPassphrase);

  if (router.pathname === "/") {
    return adminData && <AdminDashboardIcon />;
  }

  if (router.pathname === "/admin") {
    return (
      <Container>
        <ToggleStormModeStatusButton
          openModal={openConfirmationModal}
          status={status}
        />
        <ToggleStormModeConfirmationModal
          closeModal={closeConfirmationModal}
          modalOpen={confirmationModalOpen}
          status={status}
          setStatus={setStatus}
        />
        <HomeIcon />
      </Container>
    );
  }
}

export default NavBar;
