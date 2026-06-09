'use client';

import styled from 'styled-components';
import { colors } from '@/lib/theme';
import type { ActionStep, SimilarCase } from '@/types/alarm';

interface ActionGuideProps {
  steps: ActionStep[];
  selectedCase?: SimilarCase;
  title?: string;
  helpText?: string;
}

export default function ActionGuide({
  steps,
  selectedCase,
  title = '조치 가이드',
  helpText = '현장 승인 절차 이후 수행합니다.',
}: ActionGuideProps) {
  return (
    <Section>
      <SectionHeader>
        <Title>{title}</Title>
        <HelpText>{helpText}</HelpText>
      </SectionHeader>

      {selectedCase && (
        <CaseBox>
          <span>선택한 유사 사례</span>
          <strong>{selectedCase.alarmId}</strong>
          <p>{selectedCase.action}</p>
        </CaseBox>
      )}

      <StepList>
        {steps.map((step) => (
          <StepCard key={step.id}>
            <StepNumber>{step.order}</StepNumber>
            <StepBody>
              <StepTitle>{step.title}</StepTitle>
              <StepText>{step.body}</StepText>
              <CheckList>
                {step.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </CheckList>
            </StepBody>
          </StepCard>
        ))}
      </StepList>
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

const CaseBox = styled.div`
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: 8px 10px;
  padding: 12px 14px;
  border: 1px solid #d9c68b;
  border-radius: 8px;
  background: #fffaf0;

  span {
    color: ${colors.textMuted};
    font-size: 12px;
    font-weight: 700;
  }

  strong {
    color: ${colors.warning};
    font-size: 13px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  p {
    margin: 0;
    color: ${colors.text};
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const StepList = styled.div`
  display: grid;
  gap: 10px;
`;

const StepCard = styled.article`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  padding: 14px;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  background: ${colors.panel};
`;

const StepNumber = styled.span`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 1px solid ${colors.lineStrong};
  border-radius: 999px;
  color: ${colors.text};
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const StepBody = styled.div`
  min-width: 0;
`;

const StepTitle = styled.h3`
  margin: 0 0 6px;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const StepText = styled.p`
  margin: 0 0 10px;
  color: #3f4348;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.55;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const CheckList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 5px 8px;
    border: 1px solid ${colors.line};
    border-radius: 999px;
    background: ${colors.panelMuted};
    color: ${colors.textMuted};
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
  }
`;
