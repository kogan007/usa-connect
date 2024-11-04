

import React from 'react';

import { type City, useCities } from '@/api';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView } from '@/ui';

export default function Onboarding() {
  // const [_, setIsFirstTime] = useIsFirstTime();
  // const router = useRouter();
  const { data, isPending } = useCities();

  return (
    <SafeAreaView className="size-full">
      <Center>
        <Heading size="3xl">Choose your city</Heading>
        <VStack>
          {isPending && (
            <Box>
              <Text>Loading</Text>
            </Box>
          )}
          {data && <CityPicker cities={data} />}
        </VStack>
      </Center>
      {/* <MobileFooter footerIcons={bottomTabsList} /> */}
    </SafeAreaView>
  );
}

const CityPicker = ({ cities }: { cities: City[] }) => {
  return cities.map((city) => (
    <HStack
      key={city.id}
      space="2xl"
      className="w-full flex-1 items-center justify-between px-2 py-3"
    >
      <HStack className="items-center" space="md">
        <Text size="lg">{city.name}</Text>
      </HStack>
    </HStack>
  ));
};




