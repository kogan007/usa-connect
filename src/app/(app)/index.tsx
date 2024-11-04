import React, { useRef, useState } from 'react';

import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { ChevronLeftIcon, ChevronRightIcon, Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
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
  const scrollViewRef = useRef(null);
  const scrollAmount = 400;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContentAtRight, setIsContentAtRight] = useState(true);

  const handleScrollLeft = () => {
    const newScrollPosition = scrollPosition - scrollAmount;
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollRight = () => {
    const newScrollPosition = scrollPosition + scrollAmount;
    if (scrollViewRef.current)
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
    setScrollPosition(newScrollPosition);
  };

  const checkContentAtLeft = () => {
    if (scrollPosition > 0) {
      return true;
    }
    return false;
  };

  const isCloseToRight = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrollAtEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;
    if (isScrollAtEnd) {
      return true;
    }
    return false;
  };

  return (
    <Box className="flex-1 overflow-auto md:h-[calc(100vh-144px)] md:pl-8 md:pr-16">
      <Box className="px-4 pb-2.5 pt-6 md:px-0">
      <Heading size="xl">Популярные посты</Heading>
      </Box>
      
      <Box className="w-full">
        <ScrollView
          horizontal
          style={{ width: '100%' }}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          scrollEventThrottle={50}
          onScroll={(event) => {
            if (isCloseToRight(event)) {
              setIsContentAtRight(false);
            } else {
              setIsContentAtRight(true);
            }
            setScrollPosition(event.nativeEvent.contentOffset.x);
          }}
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
        <ScrollLeft
          handleScrollLeft={handleScrollLeft}
          disabled={!checkContentAtLeft()}
        />
        <ScrollRight
          handleScrollRight={handleScrollRight}
          disabled={!isContentAtRight}
        />
      </Box>
    </Box>
  );
}

const ScrollLeft = ({ handleScrollLeft, disabled }: any) => {
  return (
    <Center className="absolute left-0 hidden h-full md:flex">
      <Pressable
        className={`ml-3 rounded-full border border-outline-300 bg-background-50 p-1 hover:bg-background-100 ${
          disabled
            ? 'data-[disabled=true]:opacity-0'
            : 'data-[disabled=true]:opacity-100'
        }`}
        disabled={disabled}
        onPress={handleScrollLeft}
      >
        <Icon as={ChevronLeftIcon} size="lg" color={'#535252'} />
      </Pressable>
    </Center>
  );
};

const ScrollRight = ({ handleScrollRight, disabled }: any) => {
  return (
    <Center className="absolute right-0 hidden h-full md:flex">
      <Pressable
        className={`ml-3 rounded-full border border-outline-300 bg-background-50 p-1 hover:bg-background-100 md:-mr-4 ${
          disabled
            ? 'data-[disabled=true]:opacity-0'
            : 'data-[disabled=true]:opacity-100'
        }`}
        onPress={handleScrollRight}
        disabled={disabled}
      >
        <Icon as={ChevronRightIcon} size="lg" color={'#535252'} />
      </Pressable>
    </Center>
  );
};
