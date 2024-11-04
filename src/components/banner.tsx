
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";


const Banner = () => {
  return (
    <HStack
      className="mt-6 h-16 items-center justify-center bg-zinc-800 p-4"
      space="sm"
    >
      <Text className="text-content-0 text-white" size="md">
        Бета Версия
      </Text>
      
    </HStack>
  );
};
export default Banner;