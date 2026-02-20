'use client';

import { Button, Header } from '@/shared/ui';
import { useEventStore } from '@/features/event/model/useEventStore';
import { showToast } from '@/shared/utils/toast';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { weightedPickIndex, type WeightedItem } from '@/features/event/utils/weightedPick';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

type Prize = { label: string };

const PRIZES_WITH_WEIGHT: WeightedItem<Prize>[] = [
  { item: { label: '간식' }, weight: 20 },
  { item: { label: '개발자 스티커' }, weight: 20 },
  { item: { label: '간식' }, weight: 20 },
  { item: { label: '키캡' }, weight: 5 },
  { item: { label: '개발자 스티커' }, weight: 30 },
  { item: { label: '키캡' }, weight: 5 },
];

const PRIZE_COLORS = [
  '#e03939', // 코랄 핑크
  '#3a91e2', // 소프트 블루
  '#f89524', // 오렌지
  '#83d342', // 라임 그린
  '#ffa805', // 옐로우
  '#2ea0bd', // 라임 그린
];

const getCssVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const WHEEL_SIZE = 360;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2 - 12;

export const ResultContainer = () => {
  const role = useEventStore((s) => s.role);
  const score = useEventStore((s) => s.score);
  const spins = useEventStore((s) => s.spins);
  const router = useRouter();

  const consumeSpin = useEventStore((s) => s.consumeSpin);
  const resetAll = useEventStore((s) => s.resetAll);

  const prizes = useMemo(() => PRIZES_WITH_WEIGHT.map((x) => x.item), []);

  /** 확률(가중치)에 비례한 각도: cumDeg[i]=세그먼트 i 시작 각도(deg), segmentCenterDeg[i]=i번 중심(deg) */
  const { cumDeg, segmentCenterDeg } = useMemo(() => {
    const total = PRIZES_WITH_WEIGHT.reduce((s, w) => s + w.weight, 0);
    const angles = PRIZES_WITH_WEIGHT.map((w) => (360 * w.weight) / total);
    const cum: number[] = [0];
    angles.forEach((a) => cum.push(cum[cum.length - 1] + a));
    const centers = angles.map((a, i) => cum[i] + a / 2);
    return { cumDeg: cum, segmentCenterDeg: centers };
  }, []);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const wheelRef = useRef<SVGGElement>(null);
  const shouldConsumeRef = useRef(false);
  const didHandleTransitionRef = useRef(false);
  /** 스핀 시 미리 뽑은 당첨 인덱스 → 애니메이션은 이 인덱스가 포인터에 오도록만 함 */
  const wonIndexRef = useRef<number>(0);
  /** 0도 리셋 후 적용할 목표 회전값 (리셋 직후 한 프레임 뒤 적용) */
  const pendingTargetRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  rotationRef.current = rotation;
  /** 룰렛 결과 사운드 */
  const soundRef = useRef<HTMLAudioElement | null>(null);
  /** 룰렛 돌 때 드럼 롤 사운드 */
  const drumRollSoundRef = useRef<HTMLAudioElement | null>(null);

  /** 당첨 인덱스 세그먼트 내 랜덤 각도 + 360×랜덤 바퀴 수 (0도 기준). CSS rotate는 시계방향이라 포인터(상단)에는 (360-R)%360이 보이므로 보정 */
  const computeTargetFromZero = useCallback(
    (targetSegmentIndex: number) => {
      const start = cumDeg[targetSegmentIndex] ?? 0;
      const end = cumDeg[targetSegmentIndex + 1] ?? 360;
      const span = end - start;
      const randomInSegment = start + Math.random() * span;
      const fullTurns = 5 + Math.floor(Math.random() * 4);
      const angleAtPointer = (360 - randomInSegment) % 360;
      return fullTurns * 360 + angleAtPointer;
    },
    [cumDeg],
  );

  const onWheelStop = useCallback(() => {
    if (didHandleTransitionRef.current) return;
    didHandleTransitionRef.current = true;
    setIsSpinning(false);

    const idx = wonIndexRef.current;
    const prize = prizes[idx]?.label ?? '결과 없음';
    const prizeColor = PRIZE_COLORS[idx % PRIZE_COLORS.length];

    if (shouldConsumeRef.current) {
      consumeSpin();
      shouldConsumeRef.current = false;
    }

    // 드럼 롤 사운드 중지
    if (drumRollSoundRef.current) {
      drumRollSoundRef.current.pause();
      drumRollSoundRef.current.currentTime = 0;
    }

    // 결과 사운드 재생
    if (soundRef.current) {
      soundRef.current.currentTime = 0; // 처음부터 재생
      soundRef.current.play().catch((err) => {
        // 브라우저 정책으로 인한 재생 실패는 무시
        console.debug('Sound play failed:', err);
      });
    }

    // 꽝이 아닐 때만 팡파레 이펙트 발사
    if (prize !== '꽝!') {
      // 당첨 색상에 맞춘 팡파레
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: [prizeColor],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      // 여러 방향에서 발사
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }

    showToast.event(`${prize} 당첨!`);
  }, [prizes, consumeSpin]);

  /** 사운드 초기화 */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    soundRef.current = new Audio('/TaDa.mp3');
    soundRef.current.preload = 'auto';
    soundRef.current.volume = 0.4; // 볼륨 조절 (0.0 ~ 1.0)

    drumRollSoundRef.current = new Audio('/DrumRoll.mp3');
    drumRollSoundRef.current.preload = 'auto';
    drumRollSoundRef.current.volume = 0.4;
    drumRollSoundRef.current.loop = true; // 반복 재생

    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current = null;
      }
      if (drumRollSoundRef.current) {
        drumRollSoundRef.current.pause();
        drumRollSoundRef.current = null;
      }
    };
  }, []);

  /** 0도 리셋 후 pendingTarget을 다음 프레임에 적용 (transition으로 애니메이션) */
  useEffect(() => {
    if (rotation !== 0 || pendingTargetRef.current == null) return;
    const target = pendingTargetRef.current;
    pendingTargetRef.current = null;
    setIsResetting(false);
    const id = requestAnimationFrame(() => setRotation(target));
    return () => cancelAnimationFrame(id);
  }, [rotation]);

  const canSpin = spins > 0 && !isSpinning;

  const handleSpin = useCallback(() => {
    if (!canSpin) return;

    didHandleTransitionRef.current = false;
    setIsSpinning(true);
    shouldConsumeRef.current = true;

    // 드럼 롤 사운드 재생
    if (drumRollSoundRef.current) {
      drumRollSoundRef.current.currentTime = 0.3;
      drumRollSoundRef.current.play().catch((err) => {
        console.debug('Drum roll sound play failed:', err);
      });
    }

    const idx = weightedPickIndex(PRIZES_WITH_WEIGHT);
    wonIndexRef.current = idx;
    const target = computeTargetFromZero(idx);

    if (rotationRef.current === 0) {
      // 이미 0도면 리셋 없이 바로 목표 각도로 (첫 스핀 등)
      setRotation(target);
    } else {
      pendingTargetRef.current = target;
      setIsResetting(true);
      setRotation(0);
    }
  }, [canSpin, computeTargetFromZero]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== wheelRef.current || e.propertyName !== 'transform') return;
      onWheelStop();
    },
    [onWheelStop],
  );

  const borderColor = getCssVar('--stroke-outline', 'rgba(150, 159, 174, 0.2)');
  const centerBg = getCssVar('--bg-base', '#ffffff');
  const centerFg = getCssVar('--fg-base', '#151618');

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
        <div className='relative flex items-center justify-center'>
          {/* Pointer (top): 라이트=검정, 다크=흰색 */}
          <div
            className='absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-0.5 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-peak'
          />

          {/* Glow when spinning */}
          {isSpinning && (
            <div
              className='absolute inset-0 rounded-full blur-2xl animate-pulse'
              style={{
                background: getCssVar('--bg-accent-surface', 'rgba(40, 122, 245, 0.1)'),
                width: WHEEL_SIZE,
                height: WHEEL_SIZE,
              }}
            />
          )}

          <svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
            className='drop-shadow-lg'
          >
            <defs>
              {prizes.map((_, index) => (
                <filter key={`shadow-${index}`} id={`roulette-shadow-${index}`}>
                  <feDropShadow dx={0} dy={0} stdDeviation={1} floodOpacity={0.1} />
                </filter>
              ))}
            </defs>

            <g
              ref={wheelRef}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: `${CENTER}px ${CENTER}px`,
                transition:
                  isSpinning && !isResetting
                    ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                    : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {/* Outer ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + 5}
                fill='none'
                stroke={borderColor}
                strokeWidth={3}
              />

              {prizes.map((prize, index) => {
                const startDeg = cumDeg[index] ?? 0;
                const endDeg = cumDeg[index + 1] ?? 360;
                const midDeg = segmentCenterDeg[index] ?? 0;
                const startAngle = (startDeg * Math.PI) / 180;
                const endAngle = (endDeg * Math.PI) / 180;
                const midAngle = (midDeg * Math.PI) / 180;

                const x1 = CENTER + RADIUS * Math.sin(startAngle);
                const y1 = CENTER - RADIUS * Math.cos(startAngle);
                const x2 = CENTER + RADIUS * Math.sin(endAngle);
                const y2 = CENTER - RADIUS * Math.cos(endAngle);

                const textRadius = RADIUS * 0.7;
                const textX = CENTER + textRadius * Math.sin(midAngle);
                const textY = CENTER - textRadius * Math.cos(midAngle);

                const iconRadius = RADIUS * 0.38;
                const iconX = CENTER + iconRadius * Math.sin(midAngle);
                const iconY = CENTER - iconRadius * Math.cos(midAngle);

                const segmentDeg = endDeg - startDeg;
                const largeArc = segmentDeg > 180 ? 1 : 0;
                const pathD = [
                  `M ${CENTER} ${CENTER}`,
                  `L ${x1} ${y1}`,
                  `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`,
                  'Z',
                ].join(' ');

                const textAngleDeg = midDeg;
                const color = PRIZE_COLORS[index % PRIZE_COLORS.length];

                return (
                  <g key={index}>
                    <path
                      d={pathD}
                      fill={color}
                      stroke={centerBg}
                      strokeWidth={1}
                      opacity={0.92}
                    />
                    
                    <text
                      x={textX}
                      y={textY}
                      textAnchor='middle'
                      dominantBaseline='middle'
                      fill='white'
                      fontSize={16}
                      fontWeight={700}
                      transform={`rotate(${textAngleDeg}, ${textX}, ${textY})`}
                    >
                      {prize.label}
                    </text>
                  </g>
                );
              })}

              {/* Center circle */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={26}
                fill={centerBg}
                stroke={borderColor}
                strokeWidth={3}
              />
              <text
                x={CENTER}
                y={CENTER}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize={10}
                fontWeight={700}
                fill={centerFg}
              >
                SPIN
              </text>
            </g>
          </svg>
        </div>

        <Button
          size='lg'
          label={
            spins <= 0 ? '기회 없음' : isSpinning ? '도는 중...' : '룰렛 돌리기'
          }
          style='data'
          onClick={handleSpin}
          disabled={!canSpin}
          peak={canSpin}
          className='w-28 sm:w-32'
        />
      </div>

      <div className='flex justify-between gap-2'>
        <Button size='lg' label='처음으로 돌아가기' style='surface' onClick={resetAll} />

        <Button
          size='lg'
          label='홈으로 돌아가기'
          style='accent'
          onClick={() => router.push('/')}
          peak
        />
      </div>
    </main>
  );
};
