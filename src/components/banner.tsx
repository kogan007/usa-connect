import { Link } from 'expo-router';
import { Bell, Earth, Inbox } from 'lucide-react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { Pressable } from './ui/pressable';
import { VStack } from './ui/vstack';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const Banner = () => {
  const rotate = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotate.value}deg`
        }
      ]
    }
  })

  const handlePress = () => {
    rotate.value = withTiming(360, { duration: 1000 }, () => rotate.value = 0)
  }

  return (
    <VStack className='rounded-b-xl bg-[#1F2127]'>
      <HStack className="h-16 items-center px-4" space="sm">
        <HStack>
          <AnimatedPressable style={style} onPress={handlePress}><Earth className="text-white" /></AnimatedPressable>
          <Heading className="ml-2 text-white">Connect</Heading>
        </HStack>
        <HStack className="ml-auto items-center">
          <Link href="/notifications">
            <Bell className="text-white" />
          </Link>
          <Link href="/(inbox)/inbox/test" className="ml-5">
            <Inbox className="text-white" />
          </Link>
        </HStack>
      </HStack>
      
    </VStack>
  );
};


export default Banner;
