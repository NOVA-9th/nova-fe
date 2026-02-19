'use client';

import { Stepper, type StepStatus } from '@/features/onboarding/ui';
import { Button, Header, ToggleButton } from '@/shared/ui';
import { showToast } from '@/shared/utils/toast';
import { cn } from '@/shared/utils/cn';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useEventStore, type RoundKey } from '@/features/event/model/useEventStore';
import { pickRandomQuestionsByRole } from '@/features/event/utils/pickQuestion';
import { EVENT_QUESTIONS } from '@/features/event/data/eventQuestion';
import type { EventQuestion } from '@/features/event/type/EventQuestion';

const roundKeys: RoundKey[] = ['round1', 'round2', 'round3', 'round4'];

/** 맞춘 문제 수 = 룰렛 기회 */
const calcSpins = (score: number) => score;

export const EventContainer = () => {
  const role = useEventStore((s) => s.role);
  const pickedQuestionIds = useEventStore((s) => s.pickedQuestionIds);
  const setPickedQuestionIds = useEventStore((s) => s.setPickedQuestionIds);

  const answers = useEventStore((s) => s.answers);
  const setAnswer = useEventStore((s) => s.setAnswer);

  const setResult = useEventStore((s) => s.setResult);
  const setPhase = useEventStore((s) => s.setPhase);
  const resetAll = useEventStore((s) => s.resetAll);

  const [index, setIndex] = useState(0);
  /** 각 라운드 정답 여부 (null = 미제출, true = 정답, false = 오답) */
  const [roundResults, setRoundResults] = useState<(boolean | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  /** 정답/오답 사운드 */
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  /** 사운드 초기화 */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    correctSoundRef.current = new Audio('/AnswerSound.mp3');
    correctSoundRef.current.preload = 'auto';
    correctSoundRef.current.volume = 0.4;

    wrongSoundRef.current = new Audio('/WrongSound.mp3');
    wrongSoundRef.current.preload = 'auto';
    wrongSoundRef.current.volume = 0.4;

    return () => {
      if (correctSoundRef.current) {
        correctSoundRef.current.pause();
        correctSoundRef.current = null;
      }
      if (wrongSoundRef.current) {
        wrongSoundRef.current.pause();
        wrongSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!role) return;
    if (pickedQuestionIds.length === 4) return;

    const picked = pickRandomQuestionsByRole(role, 4);
    setPickedQuestionIds(picked.map((q) => q.id));
  }, [role, pickedQuestionIds.length, setPickedQuestionIds]);

  const questions: EventQuestion[] = useMemo(() => {
    if (!role) return [];
    if (pickedQuestionIds.length !== 4) return [];

    const map = new Map(EVENT_QUESTIONS.map((q) => [q.id, q]));
    return pickedQuestionIds.map((id) => map.get(id)!).filter(Boolean);
  }, [role, pickedQuestionIds]);

  const current = questions[index];
  const roundKey = roundKeys[index];
  const selected = (answers[roundKey] as string | undefined) ?? '';

  const isFirst = index === 0;
  const isLast = index === 3;
  const isValid = !!selected;

  const handleSelect = useCallback(
    (opt: string) => setAnswer(roundKey, opt),
    [roundKey, setAnswer],
  );

  const handlePrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const revealed = roundResults[index] !== null;
  const stepStatuses: StepStatus[] = roundResults.map((r) =>
    r === null ? 'default' : r ? 'success' : 'error',
  );

  const handleNext = useCallback(() => {
    if (!isValid) return;

    const isRevealed = roundResults[index] !== null;

    if (!isRevealed) {
      const correct = selected === current.answer;
      setRoundResults((prev) => {
        const next = [...prev];
        next[index] = correct;
        return next;
      });

      // 정답/오답 사운드 재생
      if (correct && correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch((err) => {
          console.debug('Correct sound play failed:', err);
        });
      } else if (!correct && wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch((err) => {
          console.debug('Wrong sound play failed:', err);
        });
      }

      const message =
        current.rationale ?? (correct ? '정답이에요!' : `정답: ${current.answer ?? ''}`);
      if (correct) {
        showToast.success(message);
      } else {
        showToast.error(message);
      }
      return;
    }

    if (isLast) {
      const score = questions.reduce((acc, q, i) => {
        const key = roundKeys[i];
        const picked = answers[key] as string | undefined;
        return acc + (picked === q.answer ? 1 : 0);
      }, 0);

      setResult({ score, spins: calcSpins(score) });
      setPhase('RESULT');
      return;
    }

    setIndex((i) => Math.min(3, i + 1));
  }, [
    isValid,
    isLast,
    index,
    roundResults,
    selected,
    current,
    answers,
    questions,
    setResult,
    setPhase,
  ]);

  if (!role) {
    return (
      <main className='flex flex-col w-full gap-5 px-7 py-5 bg-base rounded-static-frame sm:max-w-170 sm:px-10 sm:py-7.5'>
        <Header
          size='lg'
          label='직무를 먼저 선택해주세요!'
          description='직무 선택 후 문제를 풀 수 있어요.'
        />
      </main>
    );
  }

  if (pickedQuestionIds.length !== 4 || questions.length !== 4) {
    return (
      <main className='flex flex-col w-full gap-5 px-7 py-5 bg-base rounded-static-frame sm:max-w-170 sm:px-10 sm:py-7.5'>
        <Header size='lg' label='문제 준비 중...' description='잠시만요!' />
      </main>
    );
  }

  return (
    <main className='flex flex-col w-full gap-5 px-7 py-5 bg-base rounded-static-frame sm:max-w-170 sm:px-10 sm:py-7.5'>
      <Stepper
        currentStep={`step${index + 1}` as any}
        labels={['Round 1', 'Round 2', 'Round 3', 'Round 4']}
        stepStatus={stepStatuses}
        currentStepRevealed={revealed}
      />

      <div key={index} className='animate-slide-in-from-right'>
        <div>
          <Header
            size='lg'
            subLabel={current.role}
            label={current.question}
            description='하나만 선택해주세요.'
            className='hidden sm:flex'
          />
          <Header
            size='md'
            subLabel={current.role}
            label={current.question}
            description='하나만 선택해주세요.'
            className='flex sm:hidden'
          />
        </div>

        <div className='grid grid-cols-1 gap-3'>
          {current.options!.map((opt) => {
            const isCorrect = opt === current.answer;
            const isSelected = selected === opt;
            const feedback =
              revealed && isCorrect
                ? 'correct'
                : revealed && isSelected && !isCorrect
                  ? 'wrong'
                  : 'none';
            return (
              <ToggleButton
                key={opt}
                size='lg'
                variant='outline'
                value={opt}
                text={opt}
                selected={selected === opt}
                feedback={feedback}
                onClick={revealed ? undefined : () => handleSelect(opt)}
                className={cn('w-full')}
              />
            );
          })}
        </div>
      </div>

      <div className='mt-auto flex w-full sm:max-w-150 justify-between'>
        {!isFirst ? (
          <Button
            size='lg'
            label='이전'
            style='surface'
            onClick={handlePrev}
            className='w-14 sm:w-15 typo-callout-key sm:typo-body-key'
          />
        ) : (
          <Button
            size='lg'
            label='직무 선택'
            style='surface'
            onClick={resetAll}
            className='w-20 sm:w-24'
          />
        )}

        <Button
          size='lg'
          label={isLast ? '완료' : '다음'}
          style={isLast ? 'accent' : 'surface'}
          onClick={handleNext}
          peak={isValid}
          disabled={!isValid}
          className='sm:w-15 sm:max-w-15 max-w-14 typo-callout-key sm:typo-body-key'
        />
      </div>
    </main>
  );
};
