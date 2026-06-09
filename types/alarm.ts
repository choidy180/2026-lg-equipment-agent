export type AlarmKind = 'PLC' | 'PIE';

export type AlarmSeverity = 'CRITICAL' | 'WARNING' | 'INFO' | 'PREDICT';

export type DetailTab = 'similar' | 'guide' | 'docs' | 'trend';

export interface Alarm {
  id: string;
  kind: AlarmKind;
  code: string;
  title: string;
  equipmentId: string;
  assetId: string;
  location: string;
  description: string;
  occurredAt: string;
  severity: AlarmSeverity;
  assignee?: string;
}

export interface SimilarCase {
  id: string;
  date: string;
  alarmId: string;
  symptom: string;
  reason: string;
  action: string;
  result: string;
}

export interface ActionStep {
  id: string;
  order: number;
  title: string;
  body: string;
  checks: string[];
}

export interface ReferenceDocument {
  id: string;
  title: string;
  type: 'SOP' | '도면' | '정비매뉴얼' | '점검표';
  revision: string;
  owner: string;
  updatedAt: string;
}

export interface SensorPoint {
  label: string;
  value: string;
  standard: string;
  status: '정상' | '주의' | '위험';
}

export interface AlarmDetail {
  alarm: Alarm;
  summary: string;
  riskLevel: '낮음' | '주의' | '높음';
  similarCases: SimilarCase[];
  actionGuide: ActionStep[];
  references: ReferenceDocument[];
  sensorPoints: SensorPoint[];
}

export interface EquipmentStats {
  total: number;
  normal: number;
  pieWarning: number;
  plcFault: number;
}
