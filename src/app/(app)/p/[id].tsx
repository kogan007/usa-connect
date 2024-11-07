import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Heart } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

import { useComments, usePost } from '@/api';
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { FocusAwareStatusBar, Image } from '@/ui';

export default function Post() {
  const { id } = useLocalSearchParams();
  const { data, isPending, isError } = usePost({
    variables: { postId: Number(id) },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  const win = Dimensions.get('window');
  const ratio = win.width / data.image.width;

  return (
    <View>
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Profile' }} />
      <FocusAwareStatusBar />
      <VStack>
        <HStack className="h-16 items-center bg-zinc-800 p-4" space="sm">
          <Avatar size="sm" className="bg-primary-600">
            <AvatarImage
              alt="Profile Image"
              source={{
                uri: `http://localhost:3000${data.createdBy.avatar.url}`,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <Text className="ml-1 text-white">{data.createdBy.username}</Text>
        </HStack>
        <Box>
          <Image
            alt="test"
            style={{ width: win.width, height: data.image.height * ratio }}
            source={`http://localhost:3000${data.image.url}`}
          />
        </Box>
        <HStack className='p-2'>
          <Pressable>
           <Heart className="text-red-500"/>
          </Pressable>
        </HStack>
        <View className='mt-2 w-full px-2'>
        <Comments postId={data.id} />
        </View>
      </VStack>
    </View>
  );
}

const Comments = ({ postId }: { postId: number }) => {
  const { data, isPending, isError } = useComments({ variables: { postId }})

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <View>
      <VStack>
        {data.map(comment => (
          <HStack key={comment.id}>
            <Avatar size="sm" className="bg-primary-600">
            <AvatarImage
              alt="Profile Image"
              source={{
                uri: `http://localhost:3000${comment.author.avatar.url}`,
              }}
            />
          </Avatar>
          <VStack className="ml-2">
            <Link href={`/${comment.author.username}`}>{comment.author.username}</Link>
            <Text>{comment.content}</Text>
          </VStack>
          </HStack>
        ))}
      </VStack>
    </View>
  )

}