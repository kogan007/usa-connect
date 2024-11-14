import { Heart } from 'lucide-react-native';

import { useAddLike } from '@/api';

import { Pressable } from './ui/pressable';

const Like = ({ postId }: { postId: string }) => {

  const { mutate: addLike } = useAddLike();

  const handlePress = () => {
    addLike({ postId });
  };
  return (
    <Pressable onPress={handlePress}>
      <Heart className="text-red-500" fill="red" />
    </Pressable>
  );
};

export default Like;
