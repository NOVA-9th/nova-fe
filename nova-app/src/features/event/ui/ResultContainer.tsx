'use client';

import { Button, Header } from '@/shared/ui';
import { useEventStore } from '@/features/event/model/useEventStore';
import { showToast } from '@/shared/utils/toast';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { weightedPickIndex, type WeightedItem } from '@/features/event/utils/weightedPick';

type Prize = { label: string };

const PRIZES_WITH_WEIGHT: WeightedItem<Prize>[] = [
  { item: { label: '밈 스티커' }, weight: 30 },
  { item: { label: '키캡 키링' }, weight: 10 },
  { item: { label: '간식' }, weight: 25 },
  { item: { label: '한 번 더!' }, weight: 25 },
];

const getCssVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

export const ResultContainer = () => {
  const role = useEventStore((s) => s.role);
  const score = useEventStore((s) => s.score);
  const spins = useEventStore((s) => s.spins);

  const consumeSpin = useEventStore((s) => s.consumeSpin);
  const resetAll = useEventStore((s) => s.resetAll);

  const prizes = useMemo(() => PRIZES_WITH_WEIGHT.map((x) => x.item), []);
  const n = prizes.length;
  const slice = 360 / n;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const pendingPrizeRef = useRef<number | null>(null);
  const shouldConsumeRef = useRef(false);

  const [wheelBg, setWheelBg] = useState<string>('');

  useEffect(() => {
    const accentSurface = getCssVar('--bg-accent-surface', '#E8F1FF');
    const surface = getCssVar('--bg-surface', '#F3F7FF');

    const stops: string[] = [];
    for (let i = 0; i < n; i++) {
      const from = i * slice;
      const to = (i + 1) * slice;
      const color = i % 2 === 0 ? accentSurface : surface;
      stops.push(`${color} ${from}deg ${to}deg`);
    }

    setWheelBg(`conic-gradient(${stops.join(',')})`);
  }, [n, slice]);

  const labels = useMemo(() => {
    return prizes.map((p, i) => {
      const angle = i * slice + slice / 2;
      return (
        <div
          key={`${p.label}-${i}`}
          className='absolute left-1/2 top-1/2'
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -95px) rotate(${-angle}deg)`,
          }}
        >
          <div className='text-xs sm:text-sm font-medium whitespace-nowrap select-none text-base-color'>
            {p.label}
          </div>
        </div>
      );
    });
  }, [prizes, slice]);

  const spinToIndex = useCallback(
    (idx: number) => {
      const centerAngle = idx * slice + slice / 2;
      const target = 360 - centerAngle;
      const extraTurns = 5;
      const nextRotation = rotation + extraTurns * 360 + target;

      pendingPrizeRef.current = idx;
      setRotation(nextRotation);
      setSelectedIndex(idx);
    },
    [rotation, slice],
  );

  const onWheelStop = useCallback(() => {
    setIsSpinning(false);

    const idx = pendingPrizeRef.current;
    if (idx == null) return;

    const prize = prizes[idx]?.label ?? '결과 없음';

    if (shouldConsumeRef.current) {
      consumeSpin();
      shouldConsumeRef.current = false;
    }

    showToast.success(`당첨: ${prize}`);
  }, [prizes, consumeSpin]);

  const canSpin = spins > 0 && !isSpinning;

  const handleSpin = useCallback(() => {
    if (!canSpin) return;

    setIsSpinning(true);
    shouldConsumeRef.current = true;

    const idx = weightedPickIndex(PRIZES_WITH_WEIGHT);
    spinToIndex(idx);
  }, [canSpin, spinToIndex]);

  return (
    <main className='flex flex-col w-full gap-6 px-7 py-5 bg-base rounded-static-frame sm:max-w-170 sm:px-10 sm:py-7.5'>
      <Header
        size='lg'
        subLabel={`직무 : ${role}`}
        label={`총 ${score}개의 문제를 맞추셨네요!`}
        description={`룰렛 기회: ${spins}번`}
        className='items-center'
      />

      <div className='flex flex-col items-center gap-4 py-2'>
        <div className='relative'>
          <div className='absolute left-1/2 -top-3 z-10 -translate-x-1/2'>
            <div className='w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-16 border-b-outline' />
          </div>

          <div
            className='relative h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-outline overflow-hidden'
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3500ms cubic-bezier(0.12, 0.8, 0.12, 1)' : 'none',
            }}
            onTransitionEnd={onWheelStop}
          >
            <div className='absolute inset-0' style={{ background: wheelBg }} />
            <div className='absolute inset-0'>{labels}</div>

            <div className='absolute left-1/2 top-1/2 h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base border border-outline flex items-center justify-center'>
              <span className='text-xs sm:text-sm font-semibold'>SPIN</span>
            </div>
          </div>
        </div>

        <Button
          size='lg'
          label={spins <= 0 ? '기회 없음' : isSpinning ? '도는 중...' : '룰렛 돌리기'}
          style='data'
          onClick={handleSpin}
          disabled={!canSpin}
          peak={canSpin}
          className='w-28 sm:w-32'
        />
      </div>

      <div className='flex justify-between gap-2'>
        <Button size='lg' label={'처음으로 돌아가기'} style='surface' onClick={resetAll} />

        <Button size='lg' label='홈으로 돌아가기' style='accent' onClick={resetAll} peak />
      </div>
    </main>
  );
};
