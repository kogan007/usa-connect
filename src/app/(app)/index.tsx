import { Link } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';

import {
  type Post as PostType,
  useAddPost,
  usePosts,
  type User,
  useUser,
} from '@/api';
import Banner from '@/components/banner';
import Like from '@/components/like';
import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Image as UImage } from '@/ui';
import { SafeAreaView } from '@/ui';
import { ScrollView, View } from '@/ui';

const data = [
  {
    src: require('../../../assets/display/image1.png'),
  },
  {
    src: require('../../../assets/display/image1.png'),
  },
  {
    src: require('../../../assets/display/image1.png'),
  },
  {
    src: require('../../../assets/display/image1.png'),
  },
  {
    src: require('../../../assets/display/image1.png'),
  },
];

export default function Feed() {
  return (
    <View className="flex-1 ">
      <Box className="flex">
        <MainContent />
      </Box>
    </View>
  );
}

function MainContent() {
  return (
    <View className="bg-[#1F2127]">
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <VStack className="size-full">
          <Banner />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Stories />
            <VStack className="bg-white">
              <VStack className="mb-4">
                <Box className="bg-white px-4 pb-2.5 pt-6">
                  <Heading size="xl">Популярные посты</Heading>
                </Box>

                <Box className="w-full bg-white">
                  <ScrollView
                    horizontal
                    style={{ width: '100%' }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={50}
                  >
                    <HStack space="md" className="w-full px-4 ">
                      {data.map((image, index) => {
                        return (
                          <Box key={index} className="mr-2 flex-1">
                            <Image
                              source={image.src}
                              alt={'place' + index}
                              size="none"
                              className="size-60 rounded-md"
                              resizeMode="cover"
                            />
                          </Box>
                        );
                      })}
                    </HStack>
                  </ScrollView>
                </Box>
              </VStack>
              <CreatePost />
              <View className="mt-2">
                <FeedPosts />
              </View>
            </VStack>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </View>
  );
}

const CreatePost = () => {

  const { data: user } = useUser();
  
  const userCity = user?.city.id!;

  const [input, setInput] = useState('');
  const { mutate: createTextPost } = useAddPost();
  const inputRef = useRef<any>();
  const handleSubmit = () => {
    createTextPost({ content: input, city: userCity,});
    inputRef.current.clear();
  };
  return (
    <Box className="flex-1 px-4 pb-2">
      <HStack className="w-full items-center gap-4">
        <Input size="xl" className="grow rounded-lg bg-violet-50">
          <InputField
            ref={inputRef}
            onChangeText={(text) => setInput(text)}
            placeholder="Write Something"
          />
        </Input>
        <Button
          onPress={handleSubmit}
          size="xl"
          className="w-1/4 rounded-lg bg-violet-500"
        >
          <ButtonText size="md">Post</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

const FeedPosts = () => {

  const { data: user } = useUser();
  const userCity = user?.city.id;
  const { data, isError, isPending } = usePosts({
    variables: { cityId: userCity, showAllPosts: true, sort: 'desc' },
    enabled: !!userCity,
  });

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isPending) {
    return <Text>Loading</Text>;
  }
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <VStack space="md">
        {data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </VStack>
    </ScrollView>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const win = Dimensions.get('window');
  const ratio = win.width / (post.media.length > 0 ? post.media[0].image.width : 1);

  return (
    <VStack className="rounded-xl bg-white">
      <HStack className="h-20 items-center p-4" space="sm">
        <Avatar size="md" className="bg-primary-600">
          {post.createdBy.avatar && (
            <AvatarImage
            alt="Profile Image"
            source={{
              uri: `${post.createdBy.avatar.url}`,
            }}
          />
          )}
          <AvatarBadge />
        </Avatar>
        <Link href={{
          pathname: "/(app)/[profile]",
          params: {
            profile: post.createdBy.username
          }
        }}><Text className="ml-1 text-black">@{post.createdBy.username}</Text></Link>
      </HStack>
      {post.media.length > 0 && (
        <Box className="w-full px-4">
          <UImage
            alt="test"
            className="w-full rounded-xl"
            style={{ height: post.media[0].image.height * ratio }}
            source={`${post.media[0].image.url}`}
          />
        </Box>
      )}
      {post.content && <Text className="px-4">{post.content}</Text>}
      <HStack className="px-4 py-2">
        <Like postId={post.id} />
      </HStack>
    </VStack>
  );
};

const Stories = () => {

  const {
    data: loggedInUser,
    isError,
    isPending,
  } = useUser();

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isPending) {
    return <Text>Loading</Text>;
  }
  return (
    <HStack className="items-center gap-4 px-1 pb-4">
      <VStack className="items-center">
        <Box className="rounded-full border border-zinc-900 p-2">
          <Button className="h-16 rounded-full">
            <ButtonIcon as={PlusIcon} />
          </Button>
        </Box>
        <Text size="sm" className="pt-1 text-white">
          Add Story
        </Text>
      </VStack>
      <Story user={loggedInUser!} />
      <Story user={loggedInUser!} />
      <Story user={loggedInUser!} />
    </HStack>
  );
};
const Story = ({ user }: { user: User }) => {
  return (
    <VStack className="items-center">
      <Box className="rounded-full border border-zinc-900 p-2">
        <Avatar size="lg" className="bg-primary-600">
          {user.avatar && (
            <AvatarImage
              alt="Image"
              source={{
                uri: user.avatar.url,
              }}
            />
          )}
        </Avatar>
      </Box>
      <Text size="sm" className="pt-1 text-white">
        {user.username}
      </Text>
    </VStack>
  );
};
