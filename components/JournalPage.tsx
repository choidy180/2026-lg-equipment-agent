'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { colors, shadows } from '@/lib/theme';

const journals = [
  {
    id: 'JRN-260415-01',
    date: '2026-04-15 10:20:00',
    equipment: 'INJ-LINE-03',
    type: 'PLC',
    title: '유압계통 압력 급강하 대응',
    owner: '김현수',
    status: '조치 진행',
  },
  {
    id: 'JRN-260414-03',
    date: '2026-04-14 16:10:00',
    equipment: 'PUMP-COOL-02',
    type: 'PIE',
    title: '베어링 교체 계획 등록',
    owner: '최민재',
    status: '승인 대기',
  },
  {
    id: 'JRN-260412-02',
    date: '2026-04-12 09:35:00',
    equipment: 'CNC-MILL-07',
    type: 'PLC',
    title: 'X축 이송부 가속도 점검',
    owner: '이도윤',
    status: '완료',
  },
];

export default function JournalPage() {
  return (
    <Shell>
      <Header>
        <TitleGroup>
          <ProductName>Equipment Agent</ProductName>
          <SubTitle>대응 일지</SubTitle>
        </TitleGroup>
        <BackLink href="/">알람 화면</BackLink>
      </Header>

      <Content>
        <PageHead>
          <h1>대응 일지</h1>
          <p>알람 상세와 1:1 매칭하지 않는 독립 메뉴입니다.</p>
        </PageHead>

        <TableCard>
          <Table>
            <thead>
              <tr>
                <th>일지ID</th>
                <th>일시</th>
                <th>설비</th>
                <th>유형</th>
                <th>제목</th>
                <th>담당자</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((journal) => (
                <tr key={journal.id}>
                  <td>{journal.id}</td>
                  <td>{journal.date}</td>
                  <td>{journal.equipment}</td>
                  <td>{journal.type}</td>
                  <td>{journal.title}</td>
                  <td>{journal.owner}</td>
                  <td>{journal.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      </Content>
    </Shell>
  );
}

const Shell = styled.div`
  width: 100vw;
  height: 100dvh;
  display: grid;
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  background: ${colors.appBackground};
`;

const Header = styled.header`
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
`;

const ProductName = styled.strong`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const SubTitle = styled.span`
  color: #bcb4a9;
  font-size: 12px;
  font-weight: 500;
`;

const BackLink = styled(Link)`
  padding: 7px 12px;
  border: 1px solid #5e5750;
  border-radius: 4px;
  color: #d8d0c5;
  font-size: 12px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: #2d2824;
    transform: translateY(-1px);
  }
`;

const Content = styled.main`
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 14px;
  padding: 22px;
  overflow: auto;
`;

const PageHead = styled.section`
  padding: 18px;
  border: 1px solid ${colors.line};
  border-radius: 10px;
  background: ${colors.panel};
  box-shadow: ${shadows.card};

  h1 {
    margin: 0 0 8px;
    color: ${colors.text};
    font-size: 24px;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: ${colors.textMuted};
    font-size: 14px;
    font-weight: 500;
  }
`;

const TableCard = styled.section`
  min-width: 0;
  overflow: auto;
  border: 1px solid ${colors.line};
  border-radius: 10px;
  background: ${colors.panel};
  box-shadow: ${shadows.card};
`;

const Table = styled.table`
  width: 100%;
  min-width: 880px;
  border-collapse: collapse;

  th,
  td {
    padding: 13px 14px;
    border-bottom: 1px solid ${colors.line};
    color: ${colors.text};
    font-size: 13px;
    line-height: 1.5;
    text-align: left;
  }

  th {
    background: ${colors.panelMuted};
    color: ${colors.textMuted};
    font-weight: 700;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;
