'use client';

import styled from 'styled-components';
import { useEquipmentAgent } from '@/hooks/useEquipmentAgent';
import AlarmDetail from './AlarmDetail';
import AlarmSidebar from './AlarmSidebar';
import TopBar from './TopBar';

export default function Dashboard() {
  const agent = useEquipmentAgent();

  return (
    <Shell>
      <TopBar
        plcCount={agent.counts.PLC}
        pieCount={agent.counts.PIE}
        isAutoLocked={agent.isAutoLocked}
        onToggleLock={agent.toggleAutoLock}
      />
      <Main>
        <AlarmSidebar
          alarms={agent.filteredAlarms}
          activeKind={agent.activeKind}
          selectedAlarmId={agent.selectedAlarmId}
          counts={agent.counts}
          stats={agent.stats}
          onKindChange={agent.changeKind}
          onSelectAlarm={agent.selectAlarm}
        />
        <AlarmDetail
          detail={agent.detail}
          selectedAlarm={agent.selectedAlarm}
          isLoading={agent.isLoadingDetail}
          isAutoLocked={agent.isAutoLocked}
          onToggleLock={agent.toggleAutoLock}
          onRefresh={agent.refreshDetail}
        />
      </Main>
    </Shell>
  );
}

const Shell = styled.div`
  width: 100vw;
  height: 100dvh;
  display: grid;
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  background: #f3f1eb;
  overflow: hidden;
`;

const Main = styled.main`
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: clamp(320px, 23vw, 420px) minmax(0, 1fr);
  overflow: hidden;

  @media (max-width: 1180px) {
    grid-template-columns: 320px minmax(0, 1fr);
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-rows: 42dvh minmax(0, 1fr);
  }
`;
