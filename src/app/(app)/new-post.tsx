import { type PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGallery } from "@/core/hooks/use-gallery";
import { Image, ScrollView } from "@/ui";
import { View } from "@/ui";

export default function NewPost() {
  const { photos, loadNextPagePictures } = useGallery({ pageSize: 2})
  const [activePhoto, setActivePhoto] = useState<PhotoIdentifier["node"] | null>(null)
  
  useEffect(() => {
    if (photos?.length) {
      setActivePhoto(photos[0].node)
    }
  }, [photos])
  const router = useRouter()
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, headerTitle: "New Post", headerLeft: () => (
        <Pressable onPress={router.back}><X color="#000" /></Pressable>
      )}} />
      <VStack>
        <Box className="h-80">
          {activePhoto && (
            <Image className="size-full"  alt={activePhoto.image.filename ?? ""} source={activePhoto.image.uri} />
          )}
        </Box>
        <Button onPress={loadNextPagePictures}>
          <ButtonText>Load more</ButtonText>
        </Button>
        <HStack className="bg-zinc-800 p-4"><Text className="text-white" size="xl">Недавние</Text></HStack>
        <ScrollView>
        <View className="flex w-full flex-row flex-wrap">
        {photos && photos.map(({node}) => (
        <Box key={node.id} className="w-1/3">
          <Pressable onPress={() => setActivePhoto(node)}>
          <Image className="h-40"
              source={node.image.uri} alt={node.image.filename ?? ""} />
          </Pressable>
        </Box>
      ))}
        </View>
        </ScrollView>
      </VStack>
      
    </View>
  )
}