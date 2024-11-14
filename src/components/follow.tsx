import { useToggleFollow } from '@/api';

import { Button, ButtonText } from './ui/button';

export default function Follow({ username, amFollowing }: { username: string, amFollowing: 0 | 1 }) {

  const { mutate: toggleFollow } = useToggleFollow();

  const handlePress = () => {
    toggleFollow({ username });
  };

  return (
    <Button onPress={handlePress} className="rounded-full bg-violet-500" size="xl">
      <ButtonText>{amFollowing === 0 ? 'Follow' : 'Unfollow' }</ButtonText>
    </Button>
  );
}
