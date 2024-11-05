import { Inbox, type LucideIcon } from 'lucide-react-native';
import React from 'react';

import { type Post as PostType, usePosts, useUser } from '@/api';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { ChevronRightIcon, GlobeIcon, Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/core';
import { SafeAreaView, ScrollView, View } from '@/ui';

interface UserStats {
  friends: string;
  friendsText: string;
  followers: string;
  followersText: string;
  posts: string;
  postsText: string;
}

const userData: UserStats[] = [
  {
    friends: '45K',
    friendsText: 'Друзей',
    followers: '500M',
    followersText: 'Подписчиков',
    posts: '346',
    postsText: 'Постов',
  },
];

interface AccountCardType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  endIcon: LucideIcon | typeof Icon;
}
const accountData: AccountCardType[] = [
  {
    iconName: Inbox,
    subText: 'Настройки',
    endIcon: ChevronRightIcon,
  },
  {
    iconName: GlobeIcon,
    subText: 'Уведомления',
    endIcon: ChevronRightIcon,
  },
];

export default function Profile() {
  const token = useAuth().token?.access;
  const { data } = useUser({ variables: { token: token! } });

  return (
    <SafeAreaView className="size-full">
      <VStack className="size-full bg-background-0">
        <VStack className="size-full">
          <HStack className="size-full">
            <VStack className="w-full flex-1">
              <VStack className="mb-16 size-full">
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 160, flexGrow: 1 }}
                >
                  <VStack className="size-full pb-8" space="2xl">
                    <HStack className="absolute hidden px-10 pt-6 md:flex">
                      <Text className="font-roboto text-typography-900">
                        home &gt; {` `}
                      </Text>
                      <Text className="font-semibold text-typography-900 ">
                        profile
                      </Text>
                    </HStack>
                    <Center className="mt-6 w-full pb-4 md:mt-14 md:px-10 md:pt-6">
                      <VStack space="lg" className="items-center">
                        <VStack className="w-full items-center gap-1">
                          <Text size="2xl" className="text-dark font-roboto">
                            {data?.username}
                          </Text>
                          <Text className="text-typograpphy-700 font-roboto text-sm">
                            {data?.city.name}
                          </Text>
                        </VStack>
                        <>
                          {userData.map((item, index) => (
                            <UserData item={item} key={index} />
                          ))}
                        </>
                      </VStack>
                    </Center>
                    <VStack space="2xl">
                      <Heading className="mx-6 font-roboto" size="xl">
                        Посты
                      </Heading>
                      {data && <Posts userId={data.id} />}
                    </VStack>
                    <VStack className="mx-6" space="2xl">
                      <Heading className="font-roboto" size="xl">
                        Аккаунт
                      </Heading>
                      <VStack className="border-border-300 items-center justify-between rounded-xl border px-4 py-2">
                        {accountData.map((item, index) => (
                          <AccountData item={item} key={index} index={index} />
                        ))}
                      </VStack>
                    </VStack>
                  </VStack>
                </ScrollView>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      {/* <MobileFooter footerIcons={bottomTabsList} /> */}
    </SafeAreaView>
  );
}

const Posts = ({ userId }: { userId: number }) => {
  const {
    data: posts,
    isPending,
    // refetch,
  } = usePosts({
    variables: { userId: userId },
  });

  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   refetch();
  //   setRefreshing(false);
  // }, [refetch]);

  if (isPending) {
    return <Text>Loading</Text>;
  }

  return (
    <VStack className="items-center justify-between">
      
        <View
          className="flex w-full flex-row flex-wrap"
          
        >
          {posts!.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </View>
      
    </VStack>
  );
};

const Post = ({ post }: { post: PostType }) => {
  return (
<View className='w-1/3'>
      <Box>
      <Image
        source={`http://localhost:3000${post.image.url}`}
        alt={'test'}
        size="none"
        className="h-40"
        resizeMode="cover"
      />
    </Box>
    </View>
  );
};

const AccountData = ({
  item,
  index,
}: {
  item: AccountCardType;
  index: number;
}) => {
  return (
    <>
      <HStack
        space="2xl"
        className="w-full flex-1 items-center justify-between px-2 py-3"
      >
        <HStack className="items-center" space="md">
          <Icon as={item.iconName} className="stroke-[#747474]" />
          <Text size="lg">{item.subText}</Text>
        </HStack>
        <Icon as={item.endIcon} />
      </HStack>
      {accountData.length - 1 !== index && <Divider className="my-1" />}
    </>
  );
};

const UserData = ({ item }: { item: UserStats }) => {
  return (
    <HStack className="items-center gap-1">
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark items-center justify-center font-roboto font-semibold">
          {item.friends}
        </Text>
        <Text className="text-dark font-roboto text-xs">
          {item.friendsText}
        </Text>
      </VStack>
      <Divider orientation="vertical" className="h-10" />
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark font-roboto font-semibold">
          {item.followers}
        </Text>
        <Text className="text-dark font-roboto text-xs">
          {item.followersText}
        </Text>
      </VStack>

      <Divider orientation="vertical" className="h-10" />
      <VStack className="items-center px-4 py-3" space="xs">
        <Text className="text-dark font-roboto font-semibold">
          {item.posts}
        </Text>
        <Text className="text-dark font-roboto text-xs">{item.postsText}</Text>
      </VStack>
    </HStack>
  );
};
