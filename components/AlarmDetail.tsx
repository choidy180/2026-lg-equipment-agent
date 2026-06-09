'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { colors, shadows } from '@/lib/theme';
import type { Alarm, AlarmDetail as AlarmDetailType, DetailTab } from '@/types/alarm';
import ActionGuide from './ActionGuide';
import DetailHeader from './DetailHeader';
import ReferenceDocuments from './ReferenceDocuments';
import SensorData from './SensorData';
import SimilarCaseTable from './SimilarCaseTable';

interface AlarmDetailProps {
  detail: AlarmDetailType | null;
  selectedAlarm: Alarm;
  isLoading: boolean;
  isAutoLocked: boolean;
  onToggleLock: () => void;
  onRefresh: () => void;
}

const plcTabs: { id: DetailTab; label: string }[] = [
  {
    id: 'similar',
    label: '유사 알람 내역',
  },
  {
    id: 'guide',
    label: '조치 가이드',
  },
  {
    id: 'docs',
    label: '관련 문서',
  },
];

const pieTabs: { id: DetailTab; label: string }[] = [
  {
    id: 'trend',
    label: '센서 데이터',
  },
  {
    id: 'similar',
    label: '유사 알람 내역',
  },
  {
    id: 'guide',
    label: '보전 추천',
  },
  {
    id: 'docs',
    label: '관련 문서',
  },
];

export default function AlarmDetail({
  detail,
  selectedAlarm,
  isLoading,
  isAutoLocked,
  onToggleLock,
  onRefresh,
}: AlarmDetailProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('similar');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const tabs = selectedAlarm.kind === 'PIE' ? pieTabs : plcTabs;

  useEffect(() => {
    if (!detail) {
      return;
    }

    setSelectedCaseId(detail.similarCases[0]?.id ?? null);
    setActiveTab(detail.alarm.kind === 'PIE' ? 'trend' : 'similar');
  }, [detail?.alarm.id]);

  const selectedCase = useMemo(() => {
    if (!detail) {
      return undefined;
    }

    return detail.similarCases.find((item) => item.id === selectedCaseId) ?? detail.similarCases[0];
  }, [detail, selectedCaseId]);

  const content = useMemo(() => {
    if (!detail) {
      return <EmptyState>상세 정보 요청 중입니다.</EmptyState>;
    }

    if (activeTab === 'trend') {
      return <SensorData points={detail.sensorPoints} />;
    }

    if (activeTab === 'guide') {
      return (
        <ActionGuide
          steps={detail.actionGuide}
          selectedCase={selectedCase}
          title={detail.alarm.kind === 'PIE' ? '보전 추천' : '조치 가이드'}
          helpText={detail.alarm.kind === 'PIE' ? '계획 정비 기준으로 등록합니다.' : '현장 승인 절차 이후 수행합니다.'}
        />
      );
    }

    if (activeTab === 'docs') {
      return <ReferenceDocuments documents={detail.references} />;
    }

    return (
      <SimilarCaseTable
        cases={detail.similarCases}
        selectedCaseId={selectedCase?.id ?? null}
        onSelectCase={setSelectedCaseId}
      />
    );
  }, [activeTab, detail, selectedCase]);

  return (
    <DetailPane aria-label="알람 상세 정보">
      <DetailHeader
        alarm={selectedAlarm}
        detail={detail}
        isLoading={isLoading}
        isAutoLocked={isAutoLocked}
        onToggleLock={onToggleLock}
        onRefresh={onRefresh}
      />

      <DetailBody>
        <BodyTop>
          <BodyTitle>상세 정보</BodyTitle>
          <StateText>{isAutoLocked ? '자동 갱신 Lock 적용 중' : '최신 알람 자동 갱신 중'}</StateText>
        </BodyTop>

        <TabBar role="tablist" aria-label="알람 상세 탭">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              type="button"
              role="tab"
              $active={activeTab === tab.id}
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabBar>

        <Panel $loading={isLoading}>{content}</Panel>
      </DetailBody>
    </DetailPane>
  );
}

const DetailPane = styled.section`
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 14px;
  padding: 18px;
  overflow: hidden;

  @media (max-width: 860px) {
    padding: 12px;
  }
`;

const DetailBody = styled.section`
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  border: 1px solid ${colors.line};
  border-radius: 10px;
  background: ${colors.panel};
  box-shadow: ${shadows.card};
  overflow: hidden;
`;

const BodyTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid ${colors.line};
`;

const BodyTitle = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const StateText = styled.span`
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const TabBar = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid ${colors.line};
  overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid ${({ $active }) => ($active ? colors.pie : colors.line)};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#eef7f8' : colors.panel)};
  color: ${({ $active }) => ($active ? colors.pie : colors.textMuted)};
  font-size: 13px;
  font-weight: 700;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.pie};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

const Panel = styled.div<{ $loading: boolean }>`
  min-width: 0;
  min-height: 0;
  padding: 16px;
  overflow: auto;
  opacity: ${({ $loading }) => ($loading ? 0.64 : 1)};
  transition: opacity 140ms ease;
`;

const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 180px;
  border: 1px dashed ${colors.lineStrong};
  border-radius: 8px;
  color: ${colors.textMuted};
  font-size: 14px;
  font-weight: 600;
`;
