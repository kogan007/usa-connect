import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  ImageIcon,
  LucideCalendar,
  MailIcon,
  MapPin,
  MenuIcon,
  Newspaper,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  type LayoutChangeEvent,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { usePagerView } from 'react-native-pager-view/src/usePagerView';
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import MasonryList from 'reanimated-masonry-list';

import {
  type Post as PostType,
  usePosts,
  useUser,
  useUserByUsername,
} from '@/api';
import Follow from '@/components/follow';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView, ScrollView, View } from '@/ui';

interface UserStats {
  following: string;
  followingText: string;
  followers: string;
  followersText: string;
  posts: string;
  postsText: string;
  likes: number;
  likesText: string;
}

const HeaderBack = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={navigation.goBack}>
      <ArrowLeft className="text-black" />
    </Pressable>
  );
};

const ProfileHeader = ({ data, loggedInUser }: any) => {
  return (
    <SafeAreaView>
    <HStack className="w-full justify-between px-4">
      <HeaderBack />
      {data && loggedInUser!.id === data.user.id && (
        <HStack className="flex justify-end px-2">
          <Link asChild href="/settings">
            <Pressable>
              <MenuIcon className="text-black" />
            </Pressable>
          </Link>
        </HStack>
      )}
    </HStack>
  </SafeAreaView>
  )
}
export default function Profile() {
  const { profile } = useLocalSearchParams();

  const { data: loggedInUser } = useUser();
  const { data, isRefetching, refetch } = useUserByUsername({
    enabled: !!loggedInUser,
    variables: {
      username: profile as string,
      loggedInUsername: loggedInUser?.username!,
    },
  });

  const userData: UserStats[] = [
    {
      following: data ? String(data?.user.followingCount) : '0',
      followingText: 'Подписки',
      followers: data ? String(data?.user.followersCount) : '0',
      followersText: 'Подписчики',
      posts: data ? String(data?.user.postsCount) : '0',
      postsText: 'Посты',
      likes: data?.likesCount ?? 0,
      likesText: 'Лайки',
    },
  ];

  const storiesCount = data?.user.storiesCount;

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <ProfileHeader data={data} loggedInUser={loggedInUser} />
      <VStack className="size-full bg-background-0">
        <VStack className="size-full">
          <HStack className="size-full">
            <VStack className="w-full flex-1">
              <VStack className="mb-16 size-full">
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 160 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefetching}
                      onRefresh={refetch}
                    />
                  }
                >
                  <VStack className="size-full">
                    <VStack className="px-6">
                      <HStack className="flex-1">
                        <Link
                          href={{
                            pathname: '/stories/[profile]',
                            params: { profile: data ? data.user.username : "" }
                          }}                          
                          disabled={storiesCount ? storiesCount < 1 : true}
                          className="rounded-full border-2 border-violet-500 p-1"
                        >
                          <Avatar size="2xl" className="bg-primary-600">
                            {data && data.user.avatar && (
                              <>
                                <AvatarImage
                                  alt="Profile Image"
                                  source={{
                                    uri: `${data.user.avatar.url}`,
                                  }}
                                />
                              </>
                            )}
                          </Avatar>
                        </Link>

                        <HStack className="ml-auto mt-auto items-center gap-2">
                          {data && loggedInUser!.id !== data.user.id ? (
                            <>
                              <Button
                                size="noHeight"
                                className="size-12 rounded-full bg-gray-100"
                              >
                                <ButtonIcon
                                  size="md"
                                  as={MailIcon}
                                  className="text-black"
                                />
                              </Button>
                              <Follow
                                username={profile as string}
                                amFollowing={data.user.amFollowing}
                              />
                            </>
                          ) : (
                            <>
                              <Button
                                size="noHeight"
                                className="size-12 rounded-full bg-gray-100"
                              >
                                <ButtonIcon
                                  size="md"
                                  as={LucideCalendar}
                                  className="text-black"
                                />
                              </Button>
                              <Button
                                className="rounded-full bg-purple-500"
                                size="xl"
                              >
                                <ButtonText>Edit Profile</ButtonText>
                              </Button>
                            </>
                          )}
                        </HStack>
                      </HStack>
                      <VStack className="w-full gap-1">
                        <Text size="2xl" className="text-dark font-roboto">
                          {data?.user.username}
                        </Text>
                        <HStack className="items-center">
                          <MapPin size={12} className="text-black" />
                          <Text className="text-typograpphy-700 ml-1 font-roboto text-sm">
                            {data?.user.city.name}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                    <VStack className="mb-4 items-center">
                      {userData.map((item, index) => (
                        <UserData item={item} key={index} />
                      ))}
                    </VStack>

                    {data && <PostSwitcher username={data.user.username} />}
                  </VStack>
                </ScrollView>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
}

const PostSwitcher = ({ username }: { username: string }) => {
  const { AnimatedPagerView, ref, setPage, ...rest } = usePagerView();

  const [tabDimensions, setTabDimensions] = useState({ 0: 0, 1: 0, 2: 0 });
  const translateX = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent, tab: number) => {
    const layout = event.nativeEvent.layout;
    setTabDimensions((state) => ({ ...state, [tab]: layout.x }));
  };

  const changeTab = (page: 0 | 1 | 2) => {
    translateX.value = withSpring(tabDimensions[page], {
      damping: 50,
    });
    setPage(page);
  };

  return (
    <VStack>
      <HStack>
        <Animated.View
          className="absolute bottom-0 h-0.5 w-1/3 bg-[#3A3248]"
          style={{
            transform: [{ translateX }],
          }}
        />
        <Pressable
          onLayout={(e) => onLayout(e, 0)}
          onPress={() => changeTab(0)}
          className="flex w-1/3 items-center"
        >
          <Box className="px-2 pb-2">
            <ImageIcon className="border-b text-black" />
          </Box>
        </Pressable>

        <Pressable
          onLayout={(e) => onLayout(e, 1)}
          onPress={() => changeTab(1)}
          className="flex w-1/3 items-center"
        >
          <Box className="px-2 pb-2">
            <Newspaper className="text-black" />
          </Box>
        </Pressable>
        <Pressable
          onLayout={(e) => onLayout(e, 2)}
          onPress={() => changeTab(2)}
          className="flex w-1/3 items-center"
        >
          <Box className="px-2 pb-2">
            <Bookmark className="text-black" />
          </Box>
        </Pressable>
      </HStack>
      <View className="h-full flex-1 bg-gray-100">
        <AnimatedPagerView
          ref={ref}
          {...rest}
          onPageScroll={(e) => {
            translateX.value = withSpring(
              interpolate(
                e.nativeEvent.offset + e.nativeEvent.position,
                [0, 2],
                [tabDimensions[0], tabDimensions[2]],
                Extrapolation.CLAMP,
              ),
              {
                damping: 50,
              },
            );
          }}
          style={{ width: '100%' }}
          initialPage={0}
        >
          <Posts key={1} username={username} />
          <TextPosts key={2} username={username} />
          <View key={3}><Text>Hello</Text></View>
        </AnimatedPagerView>
      </View>
    </VStack>
  );
};

const TextPosts = ({ username }: { username: string }) => {
  const {
    data: posts,
    isError,
    isPending,
  } = usePosts({ variables: { username, textOnly: true, sort: 'desc' } });
  if (isError) {
    return <Text>Error</Text>;
  }
  if (isPending) {
    return <Text>Loading</Text>;
  }
  return (
    <VStack className="items-center justify-between">
      <View className="flex w-full">
        {posts.map((post) => (
          <VStack key={post.id}>
            <HStack>
              <Text>{post.content}</Text>
            </HStack>
          </VStack>
        ))}
      </View>
    </VStack>
  );
};

const Posts = ({ username }: { username: string }) => {
  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = usePosts({
    variables: { username, textOnly: false, sort: 'desc' },
  });

  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   refetch();
  //   setRefreshing(false);
  // }, [refetch]);
  if (isError) {
    return <Text>Error</Text>;
  }
  if (isPending) {
    return <Text>Loading</Text>;
  }
  
  return (
    <VStack className="items-center justify-between px-4 pt-6">
      <MasonryList
        onRefresh={refetch}
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <Post post={item as PostType} />}
        style={{ gap: 6 }}
      />
    </VStack>
  );
};

const Post = ({ post }: { post: PostType }) => {
  return (
    <View className="mb-2">
      <Box>
        <Link href={`/p/${post.id}`} asChild>
          <Pressable className="relative">
            <Image
              source={`${post.media[0].image.url}`}
              alt={'test'}
              className="h-52 w-full rounded-lg"
              resizeMode="cover"
            />

            <Box className="absolute bottom-0 left-0 flex flex-row items-center gap-2 px-4 pb-2">
              <Heart size={16} className="text-white" />
              <Text className="text-white">{post.likesCount}</Text>
            </Box>
          </Pressable>
        </Link>
      </Box>
    </View>
  );
};

const UserData = ({ item }: { item: UserStats }) => {
  return (
    <HStack className="items-center gap-1">
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark items-center justify-center font-roboto font-semibold">
          {item.following}
        </Text>
        <Text className="text-dark text-md font-roboto">
          {item.followingText}
        </Text>
      </VStack>
      <Divider orientation="vertical" className="h-10" />
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark font-roboto font-semibold">
          {item.followers}
        </Text>
        <Text className="text-dark text-md font-roboto">
          {item.followersText}
        </Text>
      </VStack>

      <Divider orientation="vertical" className="h-10" />
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark font-roboto font-semibold">
          {item.posts}
        </Text>
        <Text className="text-dark text-md font-roboto">{item.postsText}</Text>
      </VStack>
      <Divider orientation="vertical" className="h-10" />
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark font-roboto font-semibold">
          {item.likes}
        </Text>
        <Text className="text-dark text-md font-roboto">{item.likesText}</Text>
      </VStack>
    </HStack>
  );
};
