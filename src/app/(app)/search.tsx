import { Link } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";

import { type SearchResponse, useSearch } from "@/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function Search() {
  const [query, setQuery] = useState("")
  const { data, isPending, isError } = useSearch({ variables: { input: query }, enabled: !!query.length})

  const handleText = useCallback((text: string) => {
    setQuery(text)
  }, [])


  return (
    <SafeAreaView >
      <VStack className="size-full flex-1">
        <HStack className="w-full px-4">
          <Input className="w-full grow rounded-lg" size="xl">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
            <InputField onChangeText={handleText} placeholder="Search"/>
          </Input>
        </HStack>
        {isPending || isError ? (
          <Text>Error</Text>
        ): (
          <SearchResults data={data}/>
        )}
        
      </VStack>
    </SafeAreaView>
  )
}

function SearchResults({ data }: { data: SearchResponse}) {
  return (
    <VStack className="mt-16 size-full">

      {data.map(item => (
        <Link className="h-20 w-full" key={item.id} href={{
          pathname: "/(app)/[profile]",
          params: { profile: item.username }
          
        }}>
        
         <HStack>
         <Avatar size="md" className="bg-primary-600">
           {item.avatar && (<AvatarImage
             alt="Profile Image"
             source={{
               uri: `${item.avatar.url}`,
             }}
           />)}
         
         </Avatar>
         <Text className="ml-1 text-black">@{item.username}</Text>
         </HStack>
         
       
        </Link>
      ))}
    </VStack>
  )
}