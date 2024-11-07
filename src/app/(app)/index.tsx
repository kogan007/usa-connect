import React from 'react';

import { usePosts, useUser } from '@/api';
import Banner from '@/components/banner';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { useAuth } from '@/core';
import { FocusAwareStatusBar, ScrollView, View } from '@/ui';

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
      <FocusAwareStatusBar />
      <ScrollView className="h-px md:hidden">
        <Box className="flex">
          <MainContent />
        </Box>
      </ScrollView>
    </View>
  );
}

function MainContent() {


  return (
    <Box className="flex-1 overflow-auto md:h-[calc(100vh-144px)] md:pl-8 md:pr-16">
      <Banner />
      <Box className="px-4 pb-2.5 pt-6 md:px-0">
      <Heading size="xl">Популярные посты</Heading>
      </Box>
      
      <Box className="w-full">
        <ScrollView
          horizontal
          style={{ width: '100%' }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={50}
         
        >
          <HStack space="md" className="w-full px-4 md:px-0">
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
            <FeedPosts />
      </Box>
    </Box>
  );
}

const FeedPosts = () => {
  const token = useAuth().token?.access;
  const { data: user } = useUser({ variables: { token: token! } });
  const userCity = user!.city.id;
  const { data } = usePosts({ variables: { cityId: userCity}})
  console.log(data)
  return (<View></View>)
}