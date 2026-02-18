'use client';

import { Stepper } from '@/features/onboarding/ui';
import { Button, Header, ToggleButton } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useEventStore, type RoundKey } from '@/features/event/model/useEventStore';
import { pickRandomQuestionsByRole } from '@/features/event/utils/pickQuestion';
import { EVENT_QUESTIONS } from '@/features/event/data/eventQuestion';
import type { EventQuestion } from '@/features/event/type/EventQuestion';

const roundKeys: RoundKey[] = ['round1', 'round2', 'round3', 'round4'];

const calcSpins = (score: number) => (score === 4 ? 2 : score >= 1 ? 1 : 0);

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

  const handleNext = useCallback(() => {
    if (!isValid) return;

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
  }, [isValid, isLast, answers, questions, setResult, setPhase]);

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
      />

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
        {current.options!.map((opt) => (
          <ToggleButton
            key={opt}
            size='lg'
            variant='outline'
            value={opt}
            text={opt}
            selected={selected === opt}
            onClick={() => handleSelect(opt)}
            className={cn('w-full')}
          />
        ))}
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
