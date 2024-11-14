
import { LinearGradient } from 'expo-linear-gradient';
import { Link, SplashScreen, Stack, usePathname } from 'expo-router';
import { Calendar, House, Plus, Search, UserIcon } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

import { useUser } from '@/api';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
    <View className="size-full">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="new-post" options={{ headerShown: false }} />
        <Stack.Screen name="events" options={{ headerShown: false }} />
        <Stack.Screen name="[profile]" options={{ headerShown: false }} />
        <Stack.Screen name="stories/[profile]" options={{ presentation: "containedModal"}} />
        <Stack.Screen
          name="p/[id]"
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack>
      <View className="bg-[#161616]">
        <SafeAreaView>
          <Box className="w-full items-center bg-transparent">
            <Box className="absolute bottom-0 flex h-auto w-full items-center border-outline-50 bg-[#161616] pt-4 md:hidden">
              <MobileBottomTabs />
            </Box>
          </Box>
        </SafeAreaView>
      </View>
    </View>
  );
  //   return (
  //     <Tabs backBehavior="history">
  //       <Tabs.Screen
  //         name="index"
  //         options={{
  //           lazy:false,
  //           tabBarShowLabel: false,
  //           tabBarIcon: ({ color }) => <House color={color} />,
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
  //           lazy:false,
  //           tabBarShowLabel: false,
  //           tabBarIcon: ({color }) => <Calendar color={color} />,
  //           headerShown: true,
  //           tabBarActiveTintColor: "#000",

  //         }}
  //       />
  //       <Tabs.Screen
  //         name="new-post"
  //         options={{
  //           lazy:false,
  //           tabBarIcon: ({ color }) => <CirclePlus color={color} />,
  //           headerShown: false,
  //           tabBarActiveTintColor: "#000",
  //           tabBarShowLabel: false,
  //         }}
  //       />

  //       <Tabs.Screen
  //       name="p/[id]"
  //       options={{
  //         lazy:false,
  //         href: null
  //       }}
  // />
  //       <Tabs.Screen
  //         name="[profile]"
  //         options={{
  //           href: "/coreykogan",
  //           lazy:false,
  //           // href: `/${data?.username}`,
  //           tabBarShowLabel: false,
  //           tabBarIcon: ({color }) => <UserIcon color={color} />,
  //           tabBarActiveTintColor: "#000"
  //         }}
  //       />
  //     </Tabs>
  //   );
}

const MobileBottomTabs = () => {
  const { data } = useUser();

  const pathname = usePathname();
  const bottomTabs = [
    {
      icon: House,
      label: 'Home',
      href: '/',
    },
    {
      icon: Search,
      label: 'Search',
      href: '/search',
    },

    {
      icon: Plus,
      label: 'Post',
      href: '/new-post',
    },
    // {
    //   icon: MessageCircle,
    //   label: 'Messages',
    //   href: '/messages',
    // },
    {
      icon: Calendar,
      label: 'Events',
      href: '/events',
    },
    {
      icon: UserIcon,
      label: 'Profile',
      href: '/(app)/[profile]',
      active: pathname === `/${data?.username}`,
      params: {
        profile: data?.username,
      },
      replace: true,
    },
  ];

  return (
    <HStack className="w-full flex-1 content-center justify-between py-4 shadow-md">
      {bottomTabs.map((tab: any) => {
        return (
          <VStack className="w-1/5 items-center" key={tab.href}>
            {tab.label === 'Post' ? (
              <Box
                style={{ width: 60, height: 60 }}
                className="absolute -top-5 flex-1 items-center justify-center rounded-md"
              >
                <Link
                  href={tab.href}
                  key={tab.label}
                  disabled={tab.disabled}
                  className="relative "
                >
                  <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    style={{
                      borderRadius: 12,
                      height: 35,
                      width: 50,
                      justifyContent: 'center',
                      left: 0,
                      alignItems: 'center',
                    }}
                    colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
                  >
                    <Icon
                      as={tab.icon}
                      size="xl"
                      className={` ${
                        pathname === tab.href ? 'text-slate-300' : 'text-white'
                      }`}
                    />
                  </LinearGradient>
                </Link>
              </Box>
            ) : (
              <Link
                href={{
                  pathname: tab.href,
                  params: tab.params,
                }}
                key={tab.label}
                disabled={tab.disabled}
              >
                <Box>
                  {tab.label === 'Profile' && data && data.avatar ? (
                   
                      <Avatar size="custom" className={`bg-primary-600 ${tab.active ?? pathname === tab.href ? "border-2 border-violet-400" : ""}`}>
                      <AvatarImage
                        alt="Profile Image"
                        source={{
                          uri: `${data.avatar.url}`,
                        }}
                      />
                    </Avatar>
                   
                  ) : (
                    <Icon
                      as={tab.icon}
                      size="2xl"
                      className={` ${
                        (tab.active ?? pathname === tab.href)
                          ? 'text-violet-400'
                          : 'text-slate-300'
                      }`}
                    />
                  )}
                </Box>
              </Link>
            )}
          </VStack>
        );
      })}
    </HStack>
  );
};
