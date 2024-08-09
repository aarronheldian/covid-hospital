import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font-pbold">This screen doesn't exist.</Text>
        <Link href="/">
          <Text className="font-psemibold">Go to Redirect Page!</Text>
        </Link>
      </View>
    </>
  );
}
