
import { Bell, Earth, MessageCircleMore } from "lucide-react-native";
import React from "react";

import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";


const Banner = () => {
  return (
    <HStack
      className="h-16 items-center p-4"
      space="sm"
    >
      <HStack>
        <Earth className="text-black" />
        <Heading className="ml-2">Connect</Heading>
      </HStack>
      <HStack className="ml-auto items-center">
        <Pressable>
          <Bell className="text-black" />
        </Pressable>
        <Pressable className="ml-2">
          <MessageCircleMore className="mb-1 text-black" />
        </Pressable>
      </HStack>
      
    </HStack>
  );
};
export default Banner;