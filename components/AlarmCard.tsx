'use client';

import { memo } from 'react';
import styled from 'styled-components';
import { formatTime } from '@/lib/format';
import { colors, shadows } from '@/lib/theme';
import type { Alarm, AlarmSeverity } from '@/types/alarm';

interface AlarmCardProps {
  alarm: Alarm;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const severityLabel: Record<AlarmSeverity, string> = {
  CRITICAL: 'CRITICAL',
  WARNING: 'WARNING',
  INFO: 'INFO',
  PREDICT: 'PIE 예지',
};

function AlarmCard({
  alarm,
  isSelected,
  onSelect,
}: AlarmCardProps) {
  return (
    <Card
      type="button"
      $selected={isSelected}
      $severity={alarm.severity}
      onClick={() => onSelect(alarm.id)}
      aria-pressed={isSelected}
    >
      <MetaRow>
        <SeverityTag $severity={alarm.severity}>{severityLabel[alarm.severity]}</SeverityTag>
        <TimeText>{formatTime(alarm.occurredAt)}</TimeText>
      </MetaRow>
      <Title>{alarm.equipmentId}</Title>
      <Code>{alarm.code}</Code>
      <Description>{alarm.description}</Description>
    </Card>
  );
}

export default memo(AlarmCard);

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

const Card = styled.button<{ $selected: boolean; $severity: AlarmSeverity }>`
  width: 100%;
  display: block;
  padding: 14px;
  border: 1px solid ${({ $selected, $severity }) => ($selected ? severityColor($severity) : colors.line)};
  border-radius: 8px;
  background: ${({ $selected, $severity }) => ($selected && $severity === 'PREDICT' ? colors.pieBg : $selected ? colors.dangerBg : colors.panel)};
  color: ${colors.text};
  text-align: left;
  box-shadow: ${({ $selected }) => ($selected ? shadows.card : 'none')};
  transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease, transform 160ms ease;

  &:hover {
    border-color: ${({ $severity }) => severityColor($severity)};
    box-shadow: ${shadows.hover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
`;

const SeverityTag = styled.span<{ $severity: AlarmSeverity }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 0 8px;
  border: 1px solid ${({ $severity }) => severityColor($severity)};
  border-radius: 999px;
  color: ${({ $severity }) => severityColor($severity)};
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
`;

const TimeText = styled.time`
  color: ${colors.textMuted};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 2px;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const Code = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const Description = styled.p`
  margin: 0;
  color: #3f4348;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.52;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;
