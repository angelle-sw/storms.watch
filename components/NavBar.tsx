import HomeIcon from "./HomeIcon";
import ToggleStormModeStatusButton from "./ToggleStormModeStatusButton";
import styled from "styled-components";
import { useRouter } from "next/router";
import AdminDashboardIcon from "./AdminDashboardIcon";
import useAdmin from "../hooks/useAdmin";
import ToggleStormModeConfirmationModal from "./ToggleStormModeConfirmationModal";
import { useEffect, useState } from "react";
import useToggleStormModeStatus from "../hooks/useToggleStormModeStatus";

type Props = {
  stormModeStatus: boolean;
  adminPassphrase: string;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function NavBar({ stormModeStatus, adminPassphrase }: Props) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [status, setStatus] = useState(stormModeStatus);
  const { data } = useToggleStormModeStatus(adminPassphrase);

  useEffect(() => {
    setStatus(data);
  }, [data]);

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
          adminPassphrase={adminPassphrase}
          openModal={openConfirmationModal}
          status={status}
        />
        <ToggleStormModeConfirmationModal
          closeModal={closeConfirmationModal}
          modalOpen={confirmationModalOpen}
          adminPassphrase={adminPassphrase}
          status={status}
          setStatus={setStatus}
        />
        <HomeIcon />
      </Container>
    );
  }
}

export default NavBar;
