import type {
  ActionStep,
  Alarm,
  AlarmDetail,
  EquipmentStats,
  ReferenceDocument,
  SensorPoint,
  SimilarCase,
} from '@/types/alarm';

export const POLL_INTERVAL_MS = 7000;
export const MAX_ALARM_HISTORY = 120;


const pad = (value: number) => String(value).padStart(2, '0');

const createLocalDateTime = () => {
  const now = new Date();

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

export const equipmentStats: EquipmentStats = {
  total: 24,
  normal: 19,
  pieWarning: 3,
  plcFault: 2,
};

export const initialAlarms: Alarm[] = [
  {
    id: 'ALM-4421-20260415091432',
    kind: 'PLC',
    code: 'ALM-4421',
    title: '유압계통 압력 급강하',
    equipmentId: 'INJ-LINE-03',
    assetId: 'INJ-LINE-03',
    location: 'A동 3라인',
    description: '유압펌프 출력 압력이 기준값 180 bar 대비 40% 이하인 72 bar로 급감했습니다. 자동 비상정지가 작동했습니다.',
    occurredAt: '2026-04-15T09:14:32',
    severity: 'CRITICAL',
    assignee: '김현수',
  },
  {
    id: 'ALM-2208-20260415090218',
    kind: 'PLC',
    code: 'ALM-2208',
    title: 'X축 가속도 허용치 근접',
    equipmentId: 'CNC-MILL-07',
    assetId: 'CNC-MILL-07',
    location: 'B동 가공라인',
    description: 'X축 가속도 8.2 mm/s²가 감지되었습니다. 허용 기준 6.8 mm/s²를 초과하여 축 이송부 점검이 필요합니다.',
    occurredAt: '2026-04-15T09:02:18',
    severity: 'WARNING',
    assignee: '이도윤',
  },
  {
    id: 'ALM-1105-20260415084500',
    kind: 'PLC',
    code: 'ALM-1105',
    title: '정기 윤활 주기 도달',
    equipmentId: 'CONV-LINE-01',
    assetId: 'CONV-LINE-01',
    location: '물류 투입부',
    description: '정기 윤활 주기 250시간에 도달했습니다. 드라이브 체인, 베어링 블록, 텐션부 상태 확인이 필요합니다.',
    occurredAt: '2026-04-15T08:45:00',
    severity: 'INFO',
    assignee: '박서진',
  },
  {
    id: 'PIE-0831-20260415073000',
    kind: 'PIE',
    code: 'PIE-0831',
    title: '베어링 열화 예지',
    equipmentId: 'PUMP-COOL-02',
    assetId: 'PUMP-COOL-02',
    location: 'A동 유틸리티실 / 냉각수 펌프 #2',
    description: 'FFT 분석에서 베어링 볼 결함 주파수 BPFO가 정상 대비 3.2배 상승했습니다. 4~8주 내 파손 위험이 증가합니다.',
    occurredAt: '2026-04-15T07:30:00',
    severity: 'PREDICT',
    assignee: '최민재',
  },
  {
    id: 'PIE-1142-20260415065000',
    kind: 'PIE',
    code: 'PIE-1142',
    title: '오일 열화 지수 임계 초과',
    equipmentId: 'COMP-AIR-01',
    assetId: 'COMP-AIR-01',
    location: 'A동 공압실',
    description: '오일 열화 지수가 임계값을 초과했습니다. 교체 시점이 예측되었으며 운전 조건 확인이 필요합니다.',
    occurredAt: '2026-04-15T06:50:00',
    severity: 'PREDICT',
    assignee: '정하늘',
  },
];

const realtimeTemplates: Omit<Alarm, 'id' | 'code' | 'occurredAt'>[] = [
  {
    kind: 'PLC',
    title: '서보 드라이브 과전류',
    equipmentId: 'ROBOT-WELD-04',
    assetId: 'ROBOT-WELD-04',
    location: 'C동 용접셀 #4',
    description: '서보 드라이브 순간 전류가 기준 상한을 초과했습니다. 로봇 암 부하와 케이블 간섭 상태를 확인해야 합니다.',
    severity: 'CRITICAL',
    assignee: '한지훈',
  },
  {
    kind: 'PIE',
    title: '모터 진동 증가 예지',
    equipmentId: 'FAN-EXH-03',
    assetId: 'FAN-EXH-03',
    location: '도장 부스 배기라인',
    description: 'RMS 진동이 14일 이동 기준 대비 2.4배 상승했습니다. 임펠러 밸런스와 베어링 유격 확인이 필요합니다.',
    severity: 'PREDICT',
    assignee: '오세연',
  },
  {
    kind: 'PLC',
    title: '온도 센서 입력 단선',
    equipmentId: 'OVEN-DRY-02',
    assetId: 'OVEN-DRY-02',
    location: 'B동 건조로 #2',
    description: '챔버 상부 온도 센서 입력값이 비정상 범위로 고정되었습니다. 단자 체결과 센서 배선을 점검해야 합니다.',
    severity: 'WARNING',
    assignee: '송유진',
  },
  {
    kind: 'PIE',
    title: '펌프 효율 저하 예지',
    equipmentId: 'PUMP-FEED-01',
    assetId: 'PUMP-FEED-01',
    location: '원료 공급실',
    description: '토출 압력 대비 소비 전력이 상승했습니다. 임펠러 마모 또는 흡입 스트레이너 막힘 가능성이 있습니다.',
    severity: 'PREDICT',
    assignee: '김나영',
  },
];

export const createRealtimeAlarm = (sequence: number): Alarm => {
  const template = realtimeTemplates[sequence % realtimeTemplates.length];
  const occurredAt = createLocalDateTime();
  const prefix = template.kind === 'PLC' ? 'ALM' : 'PIE';
  const number = template.kind === 'PLC' ? 4500 + sequence : 900 + sequence;

  return {
    ...template,
    id: `${prefix}-${number}-${Date.now()}`,
    code: `${prefix}-${String(number).padStart(4, '0')}`,
    occurredAt,
  };
};

const plcSimilarCases: SimilarCase[] = [
  {
    id: 'case-plc-01',
    date: '2026-03-28',
    alarmId: 'ALM-4178',
    symptom: '사출압 저하 후 비상정지',
    reason: '흡입 필터 막힘으로 펌프 유량 부족',
    action: '필터 교체, 라인 에어 제거, 압력 재보정',
    result: '정상 압력 178 bar 복귀',
  },
  {
    id: 'case-plc-02',
    date: '2026-02-17',
    alarmId: 'ALM-3984',
    symptom: '압력 변동 폭 확대',
    reason: '릴리프 밸브 스프링 장력 저하',
    action: '릴리프 밸브 교체 후 누설 검사',
    result: '변동 폭 5 bar 이내 안정화',
  },
  {
    id: 'case-plc-03',
    date: '2026-01-06',
    alarmId: 'ALM-3650',
    symptom: '펌프 기동 직후 압력 형성 지연',
    reason: '탱크 오일 레벨 부족 및 흡입측 공기 유입',
    action: '오일 보충, 흡입 호스 클램프 재체결',
    result: '기동 7초 내 설정 압력 도달',
  },
];

const pieSimilarCases: SimilarCase[] = [
  {
    id: 'case-pie-01',
    date: '2026-03-20',
    alarmId: 'PIE-0831',
    symptom: 'BPFO 2.8배 상승',
    reason: '외륜 초기 박리 및 윤활 부족',
    action: '베어링 교체, 그리스 주입량 표준화',
    result: '진동 스펙트럼 기준 범위 복귀',
  },
  {
    id: 'case-pie-02',
    date: '2026-02-10',
    alarmId: 'PIE-0798',
    symptom: '고주파 진동 증가',
    reason: '베어링 씰 손상으로 이물 유입',
    action: '씰과 베어링 동시 교체',
    result: '4주간 재발 없음',
  },
  {
    id: 'case-pie-03',
    date: '2025-12-19',
    alarmId: 'PIE-0714',
    symptom: '펌프 운전음 증가',
    reason: '커플링 정렬 오차',
    action: '레이저 얼라인먼트 조정',
    result: 'RMS 진동 43% 감소',
  },
];

const plcGuide: ActionStep[] = [
  {
    id: 'plc-step-01',
    order: 1,
    title: '현장 안전 상태 확인',
    body: '비상정지 상태와 잔압 유무를 확인하고 작업 허가 절차를 완료합니다.',
    checks: ['구동부 정지 확인', '유압 라인 잔압 해제', '작업자 잠금표시 적용'],
  },
  {
    id: 'plc-step-02',
    order: 2,
    title: '압력 형성 계통 점검',
    body: '흡입 필터, 펌프 커플링, 릴리프 밸브, 압력 센서 배선을 순서대로 확인합니다.',
    checks: ['필터 차압 확인', '펌프 소음 확인', '센서 단자 풀림 확인'],
  },
  {
    id: 'plc-step-03',
    order: 3,
    title: '복구 후 검증',
    body: '무부하 조건에서 압력 상승 시간을 기록하고 기준 압력 도달 여부를 확인합니다.',
    checks: ['설정 압력 180 bar 도달', '5분 유지 중 누설 없음', '알람 리셋 후 재발 없음'],
  },
];

const pieGuide: ActionStep[] = [
  {
    id: 'pie-step-01',
    order: 1,
    title: '운전 조건 고정',
    body: '부하율, 유량, 주변 온도를 기록해 진동 데이터 비교 조건을 맞춥니다.',
    checks: ['부하율 편차 10% 이내', '센서 체결 상태 확인', '최근 정비 이력 확인'],
  },
  {
    id: 'pie-step-02',
    order: 2,
    title: '베어링 열화 원인 확인',
    body: 'BPFO 성분과 윤활 상태를 함께 확인해 외륜 박리 가능성을 판단합니다.',
    checks: ['스펙트럼 재측정', '그리스 변색 확인', '베어링 하우징 온도 확인'],
  },
  {
    id: 'pie-step-03',
    order: 3,
    title: '보전 계획 등록',
    body: '계획 정지 가능 일정을 확인하고 예비품, 작업자, 정지 시간을 등록합니다.',
    checks: ['예비 베어링 재고 확인', '정지 가능 시간 확정', '작업 표준서 연결'],
  },
];

const plcReferences: ReferenceDocument[] = [
  {
    id: 'doc-plc-01',
    title: 'INJ 유압계통 표준 점검서',
    type: '점검표',
    revision: 'R4',
    owner: '설비기술팀',
    updatedAt: '2026-03-12',
  },
  {
    id: 'doc-plc-02',
    title: '사출기 유압 회로도',
    type: '도면',
    revision: 'R7',
    owner: '보전기획',
    updatedAt: '2026-02-24',
  },
  {
    id: 'doc-plc-03',
    title: '유압펌프 교체 SOP',
    type: 'SOP',
    revision: 'R2',
    owner: '안전보건팀',
    updatedAt: '2026-01-18',
  },
];

const pieReferences: ReferenceDocument[] = [
  {
    id: 'doc-pie-01',
    title: '펌프 베어링 진동 진단 기준',
    type: '정비매뉴얼',
    revision: 'R5',
    owner: '예지보전팀',
    updatedAt: '2026-03-22',
  },
  {
    id: 'doc-pie-02',
    title: '냉각수 펌프 분해 정비 SOP',
    type: 'SOP',
    revision: 'R3',
    owner: '유틸리티파트',
    updatedAt: '2026-02-02',
  },
  {
    id: 'doc-pie-03',
    title: '진동 센서 설치 점검표',
    type: '점검표',
    revision: 'R1',
    owner: '예지보전팀',
    updatedAt: '2026-01-29',
  },
];

const plcSensorPoints: SensorPoint[] = [
  {
    label: '출력 압력',
    value: '72 bar',
    standard: '180 bar',
    status: '위험',
  },
  {
    label: '오일 온도',
    value: '51 ℃',
    standard: '45~60 ℃',
    status: '정상',
  },
  {
    label: '펌프 전류',
    value: '16.8 A',
    standard: '12~18 A',
    status: '주의',
  },
];

const pieSensorPoints: SensorPoint[] = [
  {
    label: 'BPFO 배율',
    value: '3.2 x',
    standard: '1.0 x',
    status: '위험',
  },
  {
    label: 'RMS 진동',
    value: '6.8 mm/s',
    standard: '4.5 mm/s 이하',
    status: '주의',
  },
  {
    label: '하우징 온도',
    value: '62 ℃',
    standard: '70 ℃ 이하',
    status: '정상',
  },
];

export const createAlarmDetail = (alarm: Alarm): AlarmDetail => {
  const isPlc = alarm.kind === 'PLC';

  return {
    alarm,
    summary: isPlc
      ? '동일 계통의 압력 형성 실패 사례와 패턴이 유사합니다. 흡입 필터와 릴리프 밸브를 우선 확인합니다.'
      : '베어링 결함 주파수 상승과 고주파 진동 증가가 동시에 관찰됩니다. 계획 정비 등록이 필요합니다.',
    riskLevel: alarm.severity === 'CRITICAL' || alarm.severity === 'PREDICT' ? '높음' : '주의',
    similarCases: isPlc ? plcSimilarCases : pieSimilarCases,
    actionGuide: isPlc ? plcGuide : pieGuide,
    references: isPlc ? plcReferences : pieReferences,
    sensorPoints: isPlc ? plcSensorPoints : pieSensorPoints,
  };
};
