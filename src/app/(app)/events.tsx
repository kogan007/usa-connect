import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import WheelPicker from '@quidone/react-native-wheel-picker';
import React, { useCallback, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import PagerView from 'react-native-pager-view';

import { type City, type Event, useCities, useEvents, useUser } from '@/api';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Image, SafeAreaView } from '@/ui';
import { ActivityIndicator, FocusAwareStatusBar, ScrollView, View } from '@/ui';

export default function Events() {

  const { data: user } = useUser();

  const { data, isPending, isError} = useCities();
  const userCity = user!.city;

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
        <Text className="text-center">Error loading events</Text>
      </View>
    );
  }


  return (
    <SafeAreaView className='size-full flex-1'>
      <EventsWrap userCity={userCity} cities={data} />
    </SafeAreaView>
  );
}

const EventsWrap = ({ userCity, cities,  }: { userCity: City, cities: City[] }) => {
  const [selectedCity, setSelectedCity] = useState(
    {
      value: userCity.id,
      label: userCity.name,
      coordinates: cities.find((city) => city.id === userCity.id)!.coordinates,
    }
  );
  const bottomSheetRef = useRef(null);
  const openSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      const sheet = bottomSheetRef.current as any
      sheet.expand()  
    }
  }, [])

  const options = cities.map((city) => ({
    label: city.name,
    value: city.id,
    coordinates: city.coordinates,
  }));

  return (
    <View className="items-center">
      <VStack className="mt-2 w-full px-4">
        <HStack>
          <Button onPress={openSheet}><ButtonText>{selectedCity.label}</ButtonText></Button>
        </HStack>
        {selectedCity.value && (<EventsContainer city={selectedCity} />)}
      </VStack>
      <BottomSheet
        index={-1}
        containerStyle={{ zIndex: 10 }}
        snapPoints={['40%']}
        enablePanDownToClose
        ref={bottomSheetRef}
      >
        <BottomSheetView className="z-10 flex-1 items-center">
          <WheelPicker
            width="100%"
            data={options}
            value={selectedCity.value}
            onValueChanged={({ item }) =>
              setSelectedCity(item)
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )

}

type Coordinates = {
  latitude: number; longitude: number 
}
const EventsContainer = ({
  city,
}: {
  city: {
    coordinates: Coordinates;
    value: string;
  };
}) => {
  const { data, isPending, isError } = useEvents({
    variables: { cityId: city.value },
  });
  const pagerRef = useRef(null);

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
    <>
      <Button
        onPress={() => {
          if (pagerRef.current) {
            //@ts-ignore
            pagerRef.current.setPage(1);
          }
        }}
      >
        <ButtonText>ok</ButtonText>
      </Button>
      <PagerView
        ref={pagerRef}
        style={{ width: '100%', height: '100%' }}
        initialPage={0}
      >
        <View key="1">
          <EventsList data={data} />
        </View>
        <View key="2">
          <EventMap data={data} cityCoordinates={city.coordinates} />
        </View>
      </PagerView>
    </>
  );
};

const EventMap = ({ data, cityCoordinates }: { data: Event[], cityCoordinates: Coordinates | null }) => {

  const latitude = cityCoordinates ? cityCoordinates.latitude : 39.952583
  const longitude = cityCoordinates ? cityCoordinates.longitude : -75.165222

  return (
    <MapView
    key={JSON.stringify({ latitude, longitude})}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.421,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* {data.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.address.coordinates.latitude,
            longitude: event.address.coordinates.longitude,
          }}
        />
      ))} */}
    </MapView>
  );
};

const EventsList = ({ data }: { data: Event[] }) => {
  return (
    <ScrollView>
      <VStack className="w-full" space="2xl">
        {data.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </VStack>
    </ScrollView>
  );
};

const EventItem = ({ event }: { event: Event }) => {
  return (
    <VStack className="w-full p-5">
      <Box className="w-full rounded">
        <Image
          className="h-64"
          source={`${event.media[0].url}`}
          alt={'test'}
          contentFit="cover"
        />
      </Box>
      <VStack className="mt-4" space="md">
        <Heading size="md">{event.name}</Heading>
        {/* <Text className="line-clamp-2">{item.description}</Text> */}
      </VStack>
    </VStack>
  );
};
