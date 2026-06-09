'use client';

import styled from 'styled-components';
import { formatDateTime } from '@/lib/format';
import { colors, shadows } from '@/lib/theme';
import type { Alarm, AlarmDetail, AlarmSeverity } from '@/types/alarm';

interface DetailHeaderProps {
  alarm: Alarm;
  detail: AlarmDetail | null;
  isLoading: boolean;
  isAutoLocked: boolean;
  onToggleLock: () => void;
  onRefresh: () => void;
}

const severityLabel: Record<AlarmSeverity, string> = {
  CRITICAL: '긴급',
  WARNING: '주의',
  INFO: '정보',
  PREDICT: '예지',
};

export default function DetailHeader({
  alarm,
  detail,
  isLoading,
  isAutoLocked,
  onToggleLock,
  onRefresh,
}: DetailHeaderProps) {
  return (
    <HeaderCard>
      <TopLine>
        <ContextText>{alarm.kind} 알람 상세</ContextText>
        <TimeText>{formatDateTime(alarm.occurredAt)}</TimeText>
      </TopLine>

      <MainRow>
        <Symbol $kind={alarm.kind}>{alarm.kind}</Symbol>
        <TitleArea>
          <TitleLine>
            <Title>{alarm.title}</Title>
            <Severity $severity={alarm.severity}>{severityLabel[alarm.severity]}</Severity>
          </TitleLine>
          <SubInfo>
            {alarm.code} · {alarm.equipmentId}
          </SubInfo>
        </TitleArea>
        <ControlGroup>
          <ControlButton
            type="button"
            $active={isAutoLocked}
            onClick={onToggleLock}
            aria-pressed={isAutoLocked}
          >
            {isAutoLocked ? 'Lock 해제' : 'Lock'}
          </ControlButton>
          <ControlButton
            type="button"
            $active={false}
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? '조회 중' : '재조회'}
          </ControlButton>
        </ControlGroup>
      </MainRow>

      <Summary>{detail?.summary ?? alarm.description}</Summary>

      <MetaGrid>
        <MetaItem>
          <span>위치</span>
          <strong>{alarm.location}</strong>
        </MetaItem>
        <MetaItem>
          <span>담당자</span>
          <strong>{alarm.assignee ?? '-'}</strong>
        </MetaItem>
        <MetaItem>
          <span>Asset ID</span>
          <strong>{alarm.assetId}</strong>
        </MetaItem>
        <MetaItem>
          <span>리스크</span>
          <strong>{detail?.riskLevel ?? '-'}</strong>
        </MetaItem>
      </MetaGrid>
    </HeaderCard>
  );
}

const severityColor = (severity: AlarmSeverity) => {
  if (severity === 'CRITICAL') {
    return colors.plc;
  }

  if (severity === 'PREDICT') {
    return colors.pie;
  }

  if (severity === 'WARNING') {
    return colors.warning;
  }

  return colors.info;
};

const HeaderCard = styled.section`
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid ${colors.line};
  border-radius: 10px;
  background: ${colors.panel};
  box-shadow: ${shadows.card};
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const ContextText = styled.span`
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TimeText = styled.time`
  color: ${colors.textMuted};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const MainRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

const Symbol = styled.div<{ $kind: 'PLC' | 'PIE' }>`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ $kind }) => ($kind === 'PLC' ? '#edb5b8' : '#a9dfe6')};
  border-radius: 8px;
  background: ${({ $kind }) => ($kind === 'PLC' ? '#fff4f4' : '#effafd')};
  color: ${({ $kind }) => ($kind === 'PLC' ? colors.plc : colors.pie)};
  font-size: 13px;
  font-weight: 700;
`;

const TitleArea = styled.div`
  min-width: 0;
`;

const TitleLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(20px, 1.45vw, 26px);
  font-weight: 700;
  line-height: 1.22;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const Severity = styled.span<{ $severity: AlarmSeverity }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border: 1px solid ${({ $severity }) => severityColor($severity)};
  border-radius: 999px;
  color: ${({ $severity }) => severityColor($severity)};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

const SubInfo = styled.p`
  margin: 6px 0 0;
  color: ${colors.textMuted};
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const ControlGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 960px) {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
`;

const ControlButton = styled.button<{ $active: boolean }>`
  min-width: 76px;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid ${({ $active }) => ($active ? colors.warning : colors.lineStrong)};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#fff7e6' : colors.panel)};
  color: ${({ $active }) => ($active ? colors.warning : colors.text)};
  font-size: 13px;
  font-weight: 700;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ $active }) => ($active ? colors.warning : colors.textMuted)};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.58;
  }
`;

const Summary = styled.p`
  margin: 0;
  padding: 12px 14px;
  border: 1px solid #e4ddd2;
  border-radius: 8px;
  background: #f8f5ef;
  color: ${colors.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled.div`
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  background: ${colors.panelMuted};

  span {
    display: block;
    margin-bottom: 4px;
    color: ${colors.textMuted};
    font-size: 12px;
    font-weight: 600;
  }

  strong {
    display: block;
    color: ${colors.text};
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
`;
