import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useHospitalContext } from "@/context/Hospital";
import { IHospital } from "@/interface/hospital";
import fetch from "@/utils/fetch";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HospitalDetail() {
  const local = useLocalSearchParams();
  const { findHospitalByName } = useHospitalContext();

  const [dataHospital, setDataHospital] = useState<IHospital | null>(null);
  const [dataGeometryHospital, setGeometryHospital] = useState<any>(null);
  const [loadingGeocode, setLoadingGeocode] = useState<boolean>(false);

  const fetchGeocodeHospital = async (data: IHospital) => {
    if (!loadingGeocode) {
      setLoadingGeocode(true);

      try {
        const res = await fetch<any>({
          baseURL: "https://api.opencagedata.com",
          url: `/geocode/v1/json`,
          params: {
            key: "6452bf9323f745b191a034fb3e68e1dd",
            q: data?.province,
          },
          method: "GET",
        });
        setGeometryHospital(res?.results[0]?.geometry);
      } catch (error) {
        setGeometryHospital(null);
      } finally {
        setLoadingGeocode(false);
      }
    }
  };

  useEffect(() => {
    setDataHospital(findHospitalByName(local?.id as string));

    return () => {
      setDataHospital(null);
    };
  }, [local?.id]);

  useEffect(() => {
    if (dataHospital?.province) {
      fetchGeocodeHospital(dataHospital);
    }

    return () => {
      setGeometryHospital(null);
    };
  }, [dataHospital, local?.id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: local?.id as string,
          headerTitleStyle: {
            color: "#3B525C",
          },
          headerTintColor: "#0873BB",
        }}
      />
      <ParallaxScrollView
        headerImage={
          <Image
            source={{
              uri: `https://picsum.photos/id/${
                Number(local?.index as string) + 1
              }/1920/1080`,
            }}
            className="w-full h-full"
            resizeMode="cover"
            onError={(error) => {
              console.error("Failed to load image:", error.nativeEvent.error);
            }}
          />
        }
      >
        <View className="flex flex-col space-y-4">
          <Text className="text-2xl font-pbold text-[#3B525C]">
            {dataHospital?.name || "-"}
          </Text>
          <View className="flex flex-col space-y-2">
            <View className="flex flex-col space-y-2 items-start justify-start bg-white p-4 rounded-lg">
              <View className="flex flex-row space-x-2">
                <Ionicons size={18} name="call" color="#0493B3" />
                <Text className="font-pbold text-sm text-[#0493B3]">
                  Contact
                </Text>
              </View>
              <Text className="font-pregular text-base text-[#3B525C] uppercase">
                {dataHospital?.phone || "-"}
              </Text>
            </View>
            <View className="flex flex-col space-y-2 items-start justify-start bg-white p-4 rounded-lg">
              <View className="flex flex-row space-x-2">
                <Ionicons size={18} name="map" color="#0493B3" />
                <Text className="font-pbold text-sm text-[#0493B3]">
                  Detail Address
                </Text>
              </View>
              <Text className="font-pregular text-base text-[#3B525C] uppercase">
                {dataHospital?.address || "-"}
              </Text>
              <Text className="font-pregular text-base text-[#3B525C] uppercase">
                {dataHospital?.region || "-"}
              </Text>
              <Text className="font-pregular text-base text-[#3B525C] uppercase">
                {dataHospital?.province || "-"}
              </Text>
              {dataGeometryHospital?.lng &&
                dataGeometryHospital?.lat &&
                !loadingGeocode && (
                  <View className="flex-1 rounded-lg">
                    <MapView
                      className="w-full aspect-video rounded-lg"
                      initialRegion={{
                        latitude: dataGeometryHospital?.lat,
                        longitude: dataGeometryHospital?.lng,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: dataGeometryHospital?.lat,
                          longitude: dataGeometryHospital?.lng,
                        }}
                        title={dataHospital?.province || "-"}
                      />
                    </MapView>
                  </View>
                )}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}
