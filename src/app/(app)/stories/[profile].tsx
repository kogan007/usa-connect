import { useLocalSearchParams, useNavigation } from "expo-router"
import { View } from "react-native"

import { useUserStories } from "@/api";
import { Button, ButtonText } from "@/components/ui/button"

export default function Story() {
  const navigator = useNavigation()
  const { profile } = useLocalSearchParams(); 
  const { data } = useUserStories({ variables: { username: profile as string }})

  console.log(data)
  return (
    <View>
      {/* <ProgressBar /> */}
      <Button onPress={() => navigator.goBack()}>
        <ButtonText>Go back</ButtonText>
      </Button>
    
    </View>
  )
}

// const { width } = Dimensions.get("screen")
// const ProgressBar = () => {
//   const [progress, setProgress] = useState(0)
//   const progressWidth = useSharedValue(0)

//   useEffect(() => {
//     progressWidth.value = withSpring(progress * width)
//   }, [progress, progressWidth])

//   const progressStyle = useAnimatedStyle(() => {
//     return {
//       width: clamp(progressWidth.value, 0, width),
//       height: 5,
//       backgroundColor: "purple"
//     }
//   })
//   return (
//     <View style={{width, height: 5}}>
//       <Animated.View style={progressStyle}  />
//     </View>
//   )
// }