'use client';

import styled from 'styled-components';
import { colors } from '@/lib/theme';
import type { ReferenceDocument } from '@/types/alarm';

interface ReferenceDocumentsProps {
  documents: ReferenceDocument[];
}

export default function ReferenceDocuments({
  documents,
}: ReferenceDocumentsProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>관련 문서</Title>
        <HelpText>문서 연결은 실제 Backend 문서 API로 교체합니다.</HelpText>
      </SectionHeader>

      <DocumentGrid>
        {documents.map((document) => (
          <DocumentCard key={document.id}>
            <DocumentTop>
              <TypeBadge>{document.type}</TypeBadge>
              <Revision>{document.revision}</Revision>
            </DocumentTop>
            <DocumentTitle>{document.title}</DocumentTitle>
            <DocumentMeta>
              <span>관리: {document.owner}</span>
              <span>개정: {document.updatedAt}</span>
            </DocumentMeta>
          </DocumentCard>
        ))}
      </DocumentGrid>
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

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const DocumentCard = styled.article`
  min-width: 0;
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  background: ${colors.panel};
  transition: border-color 160ms ease, transform 160ms ease;

  &:hover {
    border-color: ${colors.lineStrong};
    transform: translateY(-1px);
  }
`;

const DocumentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const TypeBadge = styled.span`
  padding: 5px 8px;
  border: 1px solid #c7dfe3;
  border-radius: 999px;
  background: #f3fbfc;
  color: ${colors.pie};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

const Revision = styled.span`
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const DocumentTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const DocumentMeta = styled.div`
  display: grid;
  gap: 4px;
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
`;
