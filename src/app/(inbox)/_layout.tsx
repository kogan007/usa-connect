import { Stack } from "expo-router"
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="inbox" options={{ headerShown: false}} />
      <Stack.Screen name="inbox/[id]" options={{ headerShown: false}} />
    </Stack>
  )
}