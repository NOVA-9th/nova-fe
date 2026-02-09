import { updatePersonalization } from '@/features/profile/api/profile';
import { MemberPersonalizationDto } from '@/features/profile/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePersonalization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      requestDto,
    }: {
      memberId: number;
      requestDto: MemberPersonalizationDto;
    }) => updatePersonalization(memberId, requestDto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['personalization', variables.memberId] });
    },
  });
};
