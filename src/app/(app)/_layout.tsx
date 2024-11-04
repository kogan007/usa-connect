/* eslint-disable react/no-unstable-nested-components */
import { Link, SplashScreen, Tabs } from 'expo-router';
import { Calendar, UserIcon } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';

import Banner from '@/components/banner';
import { useAuth } from '@/core';
import { Pressable, Text } from '@/ui';
import {
  Feed as FeedIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@/ui/icons';

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
    <>
    <Banner />
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
          headerShown: false,
          tabBarActiveTintColor: "#000"
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          href: null,
          headerShown: false, 
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color }) => <Calendar color={color} />,
          headerShown: false,
          tabBarActiveTintColor: "#000"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color }) => <UserIcon color={color} />,
          headerShown: false,
          tabBarActiveTintColor: "#000"
        }}
      />
    </Tabs>
    </>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};
