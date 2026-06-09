'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import {
  createAlarmDetail,
  createRealtimeAlarm,
  equipmentStats,
  initialAlarms,
  MAX_ALARM_HISTORY,
  POLL_INTERVAL_MS,
} from '@/data/mockData';
import type { Alarm, AlarmDetail, AlarmKind } from '@/types/alarm';

const requestAlarmDetail = async (alarm: Alarm) => {
  // Backend 상세 조회를 대체하는 지연 함수입니다.
  await new Promise((resolve) => window.setTimeout(resolve, 260));

  return createAlarmDetail(alarm);
};

export const useEquipmentAgent = () => {
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
  const [activeKind, setActiveKind] = useState<AlarmKind>('PLC');
  const [selectedAlarmId, setSelectedAlarmId] = useState(initialAlarms[0].id);
  const [detail, setDetail] = useState<AlarmDetail | null>(null);
  const [detailVersion, setDetailVersion] = useState(0);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isAutoLocked, setIsAutoLocked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const lockRef = useRef(isAutoLocked);
  const sequenceRef = useRef(0);

  useEffect(() => {
    lockRef.current = isAutoLocked;
  }, [isAutoLocked]);

  const selectedAlarm = useMemo(
    () => alarms.find((alarm) => alarm.id === selectedAlarmId) ?? alarms[0],
    [alarms, selectedAlarmId],
  );

  const filteredAlarms = useMemo(
    () => alarms.filter((alarm) => alarm.kind === activeKind),
    [alarms, activeKind],
  );

  const counts = useMemo(
    () => ({
      PLC: alarms.filter((alarm) => alarm.kind === 'PLC').length,
      PIE: alarms.filter((alarm) => alarm.kind === 'PIE').length,
    }),
    [alarms],
  );

  const selectAlarm = useCallback((id: string) => {
    startTransition(() => {
      const alarm = alarms.find((item) => item.id === id);

      if (alarm) {
        setActiveKind(alarm.kind);
      }

      setSelectedAlarmId(id);
    });
  }, [alarms]);

  const changeKind = useCallback((kind: AlarmKind) => {
    startTransition(() => {
      setActiveKind(kind);

      const latestInKind = alarms.find((alarm) => alarm.kind === kind);

      if (latestInKind) {
        setSelectedAlarmId(latestInKind.id);
      }
    });
  }, [alarms]);

  const refreshDetail = useCallback(() => {
    setDetailVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextAlarm = createRealtimeAlarm(sequenceRef.current);
      sequenceRef.current += 1;

      setAlarms((current) => [nextAlarm, ...current].slice(0, MAX_ALARM_HISTORY));

      // 자동 갱신 Lock이 꺼져 있으면 최신 알람으로 상세 조회 대상을 교체합니다.
      if (!lockRef.current) {
        setActiveKind(nextAlarm.kind);
        setSelectedAlarmId(nextAlarm.id);
      }
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedAlarm) {
      return;
    }

    let isAlive = true;

    setIsLoadingDetail(true);

    requestAlarmDetail(selectedAlarm)
      .then((nextDetail) => {
        if (isAlive) {
          setDetail(nextDetail);
        }
      })
      .finally(() => {
        if (isAlive) {
          setIsLoadingDetail(false);
        }
      });

    return () => {
      isAlive = false;
    };
  }, [selectedAlarm, detailVersion]);

  return {
    alarms,
    activeKind,
    filteredAlarms,
    selectedAlarm,
    selectedAlarmId,
    detail,
    counts,
    stats: equipmentStats,
    isAutoLocked,
    isLoadingDetail: isLoadingDetail || isPending,
    selectAlarm,
    changeKind,
    refreshDetail,
    toggleAutoLock: () => setIsAutoLocked((current) => !current),
  };
};
