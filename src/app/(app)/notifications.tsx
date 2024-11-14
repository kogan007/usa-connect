import { Link } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

import { type Notification as NotificationType,useNotifications } from "@/api";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { FocusAwareStatusBar, Text } from "@/ui";

export default function Notifications() {

  const { data, isPending, isError } = useNotifications()
  
  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView className="size-full">
        <VStack className="gap-2 px-4 py-2">
          {data.map((notification) => <Notification key={notification.id} notification={notification} />)}
        </VStack>
      </ScrollView>
    </View>
  )
}

const Notification = ({ notification }: { notification: NotificationType}) => {
    if (notification.like) {
      return (
        <Box className="w-full">
          <HStack className="w-full flex-1">
              <Link className="grow" href={{ pathname: "/(app)/[profile]", params: { profile: notification.like.user.username }}}>
                Liked by {notification.like.user.username}
              </Link>
              {notification.like.post.media.length > 0 && (
                <Link href={{ pathname: "/(app)/p/[id]", params: { id: notification.like.post.id }}}>
                <Image alt="Test" source={`${notification.like.post.media[0].image.url}`} />
              </Link>
              )}
            </HStack>
            </Box>
      )
    }
    if (notification.comment) {
      return (
        <Box className="w-full">
          <HStack className="w-full flex-1">
              <Link className="grow" href={{ pathname: "/(app)/[profile]", params: { profile: notification.comment.author.username }}}>
                Commented by {notification.comment.author.username}
              </Link>
              {notification.comment.post.media.length > 0 && (
                <Link href={{ pathname: "/(app)/p/[id]", params: { id: notification.comment.post.id }}}>
                <Image alt="Test" source={`${notification.comment.post.media[0].image.url}`} />
              </Link>
              )}
            </HStack>
            </Box>
      )
    }
    
}