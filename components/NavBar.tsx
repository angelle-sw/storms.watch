import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useStormModeStatus from "../hooks/useStormModeStatus";
import useToggleStormModeStatus from "../hooks/useToggleStormModeStatus";
import AdminDashboardIcon from "./AdminDashboardIcon";
import HomeIcon from "./HomeIcon";
import ToggleStormModeConfirmationModal from "./ToggleStormModeConfirmationModal";
import ToggleStormModeStatusButton from "./ToggleStormModeStatusButton";

type Props = {
  isAdmin: boolean;
  stormModeStatus: boolean;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function NavBar({ isAdmin, stormModeStatus }: Props) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const {
    data: toggleStormModeStatusData,
    isLoading: toggleStormModeStatusLoading,
    isSuccess: toggleStormModeStatusSuccess,
    mutate: mutateToggleStormModeStatus,
  } = useToggleStormModeStatus();
  const { data: stormModeStatusData, refetch: refetchStormModeStatus } =
    useStormModeStatus({
      initialData: { stormModeStatus },
    });

  useEffect(() => {
    if (toggleStormModeStatusSuccess) {
      refetchStormModeStatus();
    }
  }, [toggleStormModeStatusSuccess, refetchStormModeStatus]);

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const router = useRouter();

  if (router.pathname === "/" && isAdmin) {
    return <AdminDashboardIcon />;
  } else if (router.pathname === "/admin") {
    return (
      <Container>
        <ToggleStormModeStatusButton
          openModal={openConfirmationModal}
          status={stormModeStatusData}
          loading={toggleStormModeStatusLoading}
          toggleStormModeStatusData={toggleStormModeStatusData}
        />
        <ToggleStormModeConfirmationModal
          closeModal={closeConfirmationModal}
          modalOpen={confirmationModalOpen}
          status={stormModeStatusData}
          setStatus={mutateToggleStormModeStatus}
        />
        <HomeIcon />
      </Container>
    );
  } else {
    return null;
  }
}

export default NavBar;
