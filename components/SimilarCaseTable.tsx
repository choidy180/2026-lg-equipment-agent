'use client';

import styled from 'styled-components';
import { colors } from '@/lib/theme';
import type { SimilarCase } from '@/types/alarm';

interface SimilarCaseTableProps {
  cases: SimilarCase[];
  selectedCaseId: string | null;
  onSelectCase: (id: string) => void;
}

export default function SimilarCaseTable({
  cases,
  selectedCaseId,
  onSelectCase,
}: SimilarCaseTableProps) {
  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? cases[0];

  return (
    <Section>
      <SectionHeader>
        <Title>유사 알람 내역</Title>
        <HelpText>행 선택 시 조치 가이드에서 사례 기준 내용을 함께 표시합니다.</HelpText>
      </SectionHeader>

      <TableScroller>
        <Table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>알람ID</th>
              <th>고장현상</th>
              <th>이유</th>
              <th>조치</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <Row
                key={item.id}
                $active={item.id === selectedCase.id}
                onClick={() => onSelectCase(item.id)}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    onSelectCase(item.id);
                  }
                }}
              >
                <td>{item.date}</td>
                <td>{item.alarmId}</td>
                <td>{item.symptom}</td>
                <td>{item.reason}</td>
                <td>{item.action}</td>
              </Row>
            ))}
          </tbody>
        </Table>
      </TableScroller>

      <SelectedBox>
        <span>선택 사례 결과</span>
        <strong>{selectedCase.result}</strong>
      </SelectedBox>
    </Section>
  );
}

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

const TableScroller = styled.div`
  min-width: 0;
  overflow-x: auto;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  background: ${colors.panel};
`;

const Table = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 14px;
    border-bottom: 1px solid ${colors.line};
    color: ${colors.text};
    font-size: 13px;
    line-height: 1.48;
    text-align: left;
    vertical-align: top;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  th {
    background: ${colors.panelMuted};
    color: ${colors.textMuted};
    font-weight: 700;
    white-space: nowrap;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

const Row = styled.tr<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#eef7f8' : colors.panel)};
  transition: background 140ms ease;

  &:hover {
    background: #f3fbfc;
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: -2px;
  }

  td:nth-child(1),
  td:nth-child(2) {
    color: ${colors.textMuted};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
`;

const SelectedBox = styled.div`
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid #c7dfe3;
  border-radius: 8px;
  background: #f3fbfc;

  span {
    color: ${colors.textMuted};
    font-size: 12px;
    font-weight: 700;
  }

  strong {
    color: ${colors.text};
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
`;
