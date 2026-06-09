'use client';

import styled from 'styled-components';
import { MAX_ALARM_HISTORY } from '@/data/mockData';
import { colors } from '@/lib/theme';
import type { Alarm, AlarmKind, EquipmentStats } from '@/types/alarm';
import AlarmCard from './AlarmCard';

interface AlarmSidebarProps {
  alarms: Alarm[];
  activeKind: AlarmKind;
  selectedAlarmId: string;
  counts: Record<AlarmKind, number>;
  stats: EquipmentStats;
  onKindChange: (kind: AlarmKind) => void;
  onSelectAlarm: (id: string) => void;
}

const tabs: AlarmKind[] = ['PLC', 'PIE'];

export default function AlarmSidebar({
  alarms,
  activeKind,
  selectedAlarmId,
  counts,
  stats,
  onKindChange,
  onSelectAlarm,
}: AlarmSidebarProps) {
  return (
    <Aside aria-label="알람 목록">
      <FilterBlock>
        <SectionTitle>알람 유형 필터</SectionTitle>
        <TabList role="tablist" aria-label="알람 유형">
          {tabs.map((kind) => (
            <TabButton
              key={kind}
              type="button"
              role="tab"
              $active={activeKind === kind}
              aria-selected={activeKind === kind}
              onClick={() => onKindChange(kind)}
            >
              {kind}
              <TabCount>{counts[kind]}</TabCount>
            </TabButton>
          ))}
        </TabList>
        <ListGuide>최신순 · 최대 {MAX_ALARM_HISTORY}건 보관</ListGuide>
      </FilterBlock>

      <AlarmList>
        {alarms.map((alarm) => (
          <AlarmCard
            key={alarm.id}
            alarm={alarm}
            isSelected={alarm.id === selectedAlarmId}
            onSelect={onSelectAlarm}
          />
        ))}
      </AlarmList>

      <SummaryBlock>
        <SectionTitle>설비 현황</SectionTitle>
        <StatRow>
          <span>전체</span>
          <strong>{stats.total}대</strong>
        </StatRow>
        <StatRow>
          <span>정상</span>
          <strong>{stats.normal}대</strong>
        </StatRow>
        <StatRow $tone="pie">
          <span>PIE경고</span>
          <strong>{stats.pieWarning}대</strong>
        </StatRow>
        <StatRow $tone="plc">
          <span>PLC고장</span>
          <strong>{stats.plcFault}대</strong>
        </StatRow>
      </SummaryBlock>
    </Aside>
  );
}

const Aside = styled.aside`
  min-width: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background: ${colors.panelMuted};
  border-right: 1px solid ${colors.line};
  overflow: hidden;
`;

const FilterBlock = styled.div`
  padding: 16px 18px 12px;
  border-bottom: 1px solid ${colors.line};
`;

const SectionTitle = styled.h2`
  margin: 0 0 10px;
  color: #4b4f55;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const TabList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  border: 1px solid ${({ $active }) => ($active ? colors.pie : colors.lineStrong)};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? colors.pie : colors.panel)};
  color: ${({ $active }) => ($active ? '#ffffff' : colors.text)};
  font-size: 13px;
  font-weight: 700;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;

  &:hover {
    border-color: ${colors.pie};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

const TabCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  opacity: 0.78;
`;

const ListGuide = styled.p`
  margin: 8px 0 0;
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 400;
`;

const AlarmList = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 18px;
  overflow-y: auto;
`;

const SummaryBlock = styled.div`
  padding: 16px 18px 20px;
  border-top: 1px solid ${colors.line};
  background: ${colors.panel};
`;

const StatRow = styled.div<{ $tone?: 'plc' | 'pie' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 5px 0;
  color: ${({ $tone }) => ($tone === 'plc' ? colors.plc : $tone === 'pie' ? colors.warning : colors.text)};
  font-size: 13px;

  strong {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
`;
