import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { MessageCircle, SendHorizonal } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, type TextInput, View } from 'react-native';

import { useAddComment, useComments, usePost, type User, useUser } from '@/api';
import Like from '@/components/like';
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { FocusAwareStatusBar, Image } from '@/ui';

export default function Post() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = usePost({
    variables: { postId: id as string },
  });

  const { data: loggedInUser } = useUser();

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
  const ratio = win.width / (post.media.length > 0 ? post.media[0].image.width : 0);

  return (
    <View className='size-full flex-1'>
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Profile' }} />
      <FocusAwareStatusBar />
      <VStack>
        <HStack className="h-16 items-center bg-zinc-800 p-4" space="sm">
          <Avatar size="sm" className="bg-primary-600">
            <AvatarImage
              alt="Profile Image"
              source={{
                uri: `${post.createdBy.avatar.url}`,
              }}
            />
            <AvatarBadge />
          </Avatar>
          <Text className="ml-1 text-white">{post.createdBy.username}</Text>
        </HStack>
        <Box>
          {post.media.length > 0 && (
            <Image
            alt="test"
            style={{ width: win.width, height: post.media[0].image.height * ratio }}
            source={`${post.media[0].image.url}`}
          />
          )}
        </Box>
        <HStack className='items-center gap-2 p-2'>
          <Like postId={post.id} />
          <Pressable>
           <MessageCircle className="text-black"/>
          </Pressable>
        </HStack>
        <Box className="px-2">
          <Text>Нравится: {post.likesCount}</Text>
        </Box>
        <View className='mt-2 w-full px-2'>
        <Comments postId={post.id} user={loggedInUser!} />
        </View>
      </VStack>
    </View>
  );
}



const Comments = ({ postId, user }: { postId: string, user: User }) => {
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
    <ScrollView automaticallyAdjustKeyboardInsets={true} className="h-full">
      <VStack>
        {data.map(comment => (
          <HStack key={comment.id}>
            <Avatar size="sm" className="bg-primary-600">
            {comment.author.avatar && (
              <AvatarImage
              alt="Profile Image"
              source={{
                uri: `${comment.author.avatar.url}`,
              }}
            />
            )}
          </Avatar>
          <VStack className="ml-2">
            <Link href={`/${comment.author.username}`}>{comment.author.username}</Link>
            <Text>{comment.content}</Text>
          </VStack>
          </HStack>
        ))}
      </VStack>
      <CreateComment postId={postId} user={user} />
    </ScrollView>
  )

}

const CreateComment = ({ postId, user }: { postId: string, user: User }) => {
  const [input, setInput] = useState("")
  const { mutate: addComment } = useAddComment()

  const inputRef = useRef<TextInput | any>()
  const handleSubmit = () => {
    addComment({ postId, content: input  })
    if (inputRef.current) {
      inputRef.current.clear()
    }
   
  }

  return (
    <VStack className="mt-6 w-full px-6">
        <HStack className='items-center gap-4'>
        <Avatar size="lg" className="bg-primary-600">
            {user.avatar && (
              <AvatarImage
              alt="Profile Image"
              source={{
                uri: `${user.avatar.url}`,
              }}
            />
            )}
          </Avatar>
          <Box className='grow'>
            <Input size="xl" className="w-full rounded-lg bg-violet-50">
              <InputField ref={inputRef} placeholder='Добавьте комментарий' onChangeText={(text) => setInput(text)} />
              <InputSlot className="pr-3" onPress={handleSubmit}>
                <InputIcon as={SendHorizonal} />
              </InputSlot>
            </Input>
          </Box>
        </HStack>
      </VStack>
  )
}