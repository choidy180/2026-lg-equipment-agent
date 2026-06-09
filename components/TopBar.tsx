'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatClock } from '@/lib/format';
import { colors } from '@/lib/theme';

interface TopBarProps {
  plcCount: number;
  pieCount: number;
  isAutoLocked: boolean;
  onToggleLock: () => void;
}

export default function TopBar({
  plcCount,
  pieCount,
  isAutoLocked,
  onToggleLock,
}: TopBarProps) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()));
    const timer = window.setInterval(tick, 1000);

    tick();

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Header>
      <TitleGroup>
        <ProductName>Equipment Agent</ProductName>
        <SubTitle>설비관리 AI 에이전트 v2</SubTitle>
      </TitleGroup>

      <StatusArea>
        <StatusBadge $tone="plc">PLC {plcCount}건</StatusBadge>
        <StatusBadge $tone="pie">PIE {pieCount}건</StatusBadge>
        <StatusBadge $tone="ai">AI 연결됨</StatusBadge>
        <LockButton
          type="button"
          $active={isAutoLocked}
          onClick={onToggleLock}
          aria-pressed={isAutoLocked}
        >
          {isAutoLocked ? '자동 갱신 잠김' : '자동 갱신'}
        </LockButton>
        <JournalLink href="/journal">대응 일지</JournalLink>
        <ClockText>{clock}</ClockText>
      </StatusArea>
    </Header>
  );
}

const Header = styled.header`
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 22px;
  background: ${colors.header};
  color: #f7f1e7;
  border-bottom: 1px solid #c76525;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
`;

const ProductName = styled.strong`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const SubTitle = styled.span`
  color: #bcb4a9;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

const StatusArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
`;

const StatusBadge = styled.span<{ $tone: 'plc' | 'pie' | 'ai' }>`
  min-width: 84px;
  padding: 6px 10px;
  border: 1px solid ${({ $tone }) => ($tone === 'plc' ? '#803135' : $tone === 'pie' ? '#1f6670' : '#237344')};
  border-radius: 4px;
  color: ${({ $tone }) => ($tone === 'plc' ? '#ffb0b0' : $tone === 'pie' ? '#9be8f0' : '#a2f0bf')};
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
`;

const LockButton = styled.button<{ $active: boolean }>`
  padding: 6px 10px;
  border: 1px solid ${({ $active }) => ($active ? '#f2b84b' : '#5e5750')};
  border-radius: 4px;
  background: ${({ $active }) => ($active ? '#3b2d13' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffd78a' : '#d8d0c5')};
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) => ($active ? '#443518' : '#2d2824')};
    transform: translateY(-1px);
  }
`;

const JournalLink = styled(Link)`
  padding: 6px 10px;
  border: 1px solid #5e5750;
  border-radius: 4px;
  color: #d8d0c5;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  transition: background 160ms ease, transform 160ms ease;
  white-space: nowrap;

  &:hover {
    background: #2d2824;
    transform: translateY(-1px);
  }
`;

const ClockText = styled.time`
  min-width: 94px;
  color: #bcb4a9;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 980px) {
    display: none;
  }
`;
