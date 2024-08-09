import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full p-6 text-center flex flex-col">
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <Text className="font-pbold text-3xl mt-6 text-[#0873BB]">
            Covid Hospital
          </Text>
          <Text className="font-psemibold text-xl text-[#0493B3]">
            All Around You
          </Text>
          <Text className="font-pregular text-center mt-6 text-[#3B525C]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            odio quis recusandae Eaque.
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.replace("/dashboard")}
            containerStyles="w-full mt-20 md:w-60"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaProvider>
  );
}
