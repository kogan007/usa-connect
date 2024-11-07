/* eslint-disable react/no-unstable-nested-components */
import { Link, SplashScreen, Stack, usePathname } from 'expo-router';
import { Calendar, CirclePlus, House,UserIcon } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { useUser } from '@/api';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/core';

export default function TabLayout() {
  const status = useAuth.use.status();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  // if (status === 'signOut') {
  //   return <Redirect href="/login" />;
  // }


  return (
    <SafeAreaView className="size-full">
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="events" options={{ headerShown: false }}/>
        <Stack.Screen name="new-post" options={{ headerShown: false }}/>
        <Stack.Screen name="[profile]"options={{ headerShown: false }} />
        <Stack.Screen name="p/[id]" options={{ headerShown: false, presentation: "modal" }}/>
      </Stack>
      <Box className='w-full items-center px-4'>
      <Box className="absolute bottom-4 flex h-auto w-full items-center rounded-2xl border-outline-50 bg-slate-800 py-2 md:hidden">
        
        <MobileBottomTabs />
      </Box>
      </Box>
    </SafeAreaView>
  )
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="index"
//         options={{
//           tabBarShowLabel: false,
//           tabBarIcon: ({ color }) => <FeedIcon color={color} />,
//           headerRight: () => <CreateNewPostLink />,
//           tabBarTestID: 'feed-tab',
//           headerShown: false,
//           tabBarActiveTintColor: "#000"
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           href: null,
//           title: 'Settings',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
//           tabBarTestID: 'settings-tab',
//         }}
//       />
//       <Tabs.Screen
//         name="events"
//         options={{
//           tabBarShowLabel: false,
//           tabBarIcon: ({color }) => <Calendar color={color} />,
//           headerShown: false,
//           tabBarActiveTintColor: "#000"
//         }}
//       />
//       <Tabs.Screen 
//         name="new-post"
//         options={{
//           tabBarIcon: ({ color }) => <CirclePlus color={color} />,
//           headerShown: false,
//           tabBarActiveTintColor: "#000",
//           tabBarShowLabel: false,
//         }}
//       />

//       <Tabs.Screen
//       name="p/[id]"
//       options={{
//         href: null
//       }}
// />
//       <Tabs.Screen
//         name="[profile]"
//         options={{
//           href: `/${data?.username}`,
//           tabBarShowLabel: false,
//           tabBarIcon: ({color }) => <UserIcon color={color} />,
//           tabBarActiveTintColor: "#000"
//         }}
//       />
//     </Tabs>
//   );
}





const MobileBottomTabs = () => {

  const token = useAuth().token?.access;
  const { data } = useUser({ variables: { token: token! } });

  const pathname = usePathname()
  const bottomTabs = [
    {
      icon: House,
      label: "Home",
      href: "/"
    },
    {
      icon: Calendar,
      label: "Events",
      href: "/events"
    },
    {
      icon: CirclePlus,
      label: "Post",
      href: "/new-post"
    },
  
    {
      icon: UserIcon,
      label: "Profile",
      href: "/" + data?.username
    },
  ];
  
  return (

      <HStack className="w-full content-center justify-between px-6 py-3 md:hidden">
        {bottomTabs.map((tab: any) => {
          return (
            <Link href={tab.href}
              key={tab.label}
              
              disabled={tab.disabled}
            >
              <VStack className="items-center">
                <Icon
                  as={tab.icon}
                  size="lg"
                  
                  className={` ${
                    pathname === tab.href
                      ? "text-sky-400"
                      : "text-slate-300"
                  }`}
                />
                
              </VStack>
            </Link>
          );
        })}
      </HStack>

      
  );
};