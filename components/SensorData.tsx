'use client';

import styled from 'styled-components';
import { colors } from '@/lib/theme';
import type { SensorPoint } from '@/types/alarm';

interface SensorDataProps {
  points: SensorPoint[];
}

export default function SensorData({
  points,
}: SensorDataProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>센서 데이터</Title>
        <HelpText>상세 수치와 기준값을 함께 표시합니다.</HelpText>
      </SectionHeader>

      <PointGrid>
        {points.map((point) => (
          <PointCard key={point.label}>
            <PointLabel>{point.label}</PointLabel>
            <PointValue>{point.value}</PointValue>
            <PointStandard>기준 {point.standard}</PointStandard>
            <PointStatus $status={point.status}>{point.status}</PointStatus>
          </PointCard>
        ))}
      </PointGrid>
    </Section>
  );
}

const statusColor = (status: SensorPoint['status']) => {
  if (status === '위험') {
    return colors.plc;
  }

  if (status === '주의') {
    return colors.warning;
  }

  return colors.success;
};

const Section = styled.section`
  display: grid;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: 16px;
  font-weight: 700;
`;

const HelpText = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 500;
`;

const PointGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const PointCard = styled.article`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px 12px;
  padding: 14px;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  background: ${colors.panel};
`;

const PointLabel = styled.span`
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const PointValue = styled.strong`
  grid-column: 1 / -1;
  color: ${colors.text};
  font-size: 24px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const PointStandard = styled.span`
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 600;
`;

const PointStatus = styled.span<{ $status: SensorPoint['status'] }>`
  justify-self: end;
  color: ${({ $status }) => statusColor($status)};
  font-size: 12px;
  font-weight: 700;
`;
