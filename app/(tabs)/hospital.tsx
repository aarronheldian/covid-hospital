import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useHospitalContext } from "@/context/Hospital";

const Hospital = () => {
  const {
    listHospital,
    loadingListHospital,
    setListHospital,
    fetchListHospital,
  } = useHospitalContext();

  useEffect(() => {
    fetchListHospital();

    return () => {
      setListHospital(null);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-grow"
        data={listHospital}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/hospital/[id]`,
                params: { id: item.name, index: index },
              })
            }
            activeOpacity={0.7}
            className="flex items-start justify-start p-2 mx-4 my-1 rounded-xl bg-white space-y-2"
          >
            <Image
              source={{
                uri: `https://picsum.photos/id/${index + 1}/1920/1080`,
              }}
              className="w-full aspect-[16/5] rounded-lg"
              resizeMode="cover"
              onError={(error) => {
                console.error("Failed to load image:", error.nativeEvent.error);
              }}
            />
            <View className="flex items-start justify-start px-2 space-y-1">
              <Text className="text-xl font-pbold text-[#3B525C]">
                {item.name}
              </Text>
              <Text className="font-pregular text-[#3B525C]">
                {item.region}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-6 px-4 space-y-6">
            <View className="flex justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-[#0493B3]">
                  Get the First!
                </Text>
                <Text className="text-2xl font-psemibold text-[#3B525C]">
                  Hospital Near You
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={require("@/assets/images/logo.png")}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex justify-center items-center p-4 space-y-2 bg-white rounded-xl mx-4 my-1">
            <Text className="text-6xl font-pextrabold leading-[80px] text-[#0873BB]">
              404!
            </Text>
            <Text className="text-sm font-pmedium text-[#0493B3] text-center">
              No hospitals available at the moment.
            </Text>
            <Text className="text-xl text-center font-psemibold text-[#3B525C]">
              Please refresh or check later.
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loadingListHospital}
            onRefresh={fetchListHospital}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Hospital;
