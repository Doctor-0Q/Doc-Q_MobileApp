import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import doctorpicture from "../../../assets/doctor/doctor-profile.png";
import doctorprofile from "../../../assets/doctor/doctor profile pic.jpeg";
// import DoctorAppointment from "./DoctorAppointment";
import TimeSlotBooking from "./TimeSlotBooking";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import API_URL from "../../../config";
// import styles from "toastify-react-native/components/styles";


const Doctorprofile = () => {
  // const { item } = route.params; // Extracting item from navigation route
  // if(!item){
  //   return (
  //     <View>no item</View>
  //   )
  // }
  const scrollref = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollref);
  const [showHeader, setShowHeader] = useState(false);
  const headerOpacity = useSharedValue(0);
  const route=useRoute()
  const {doctorId}=route.params;
  const [docData,setDocData]=useState([]);
  const fetchDoctorProfile = async () => {
    try {
      uid=doctorId;
      console.log(uid);
      const res = await fetch(`${API_URL}/api/doctor/profile/${uid}`);
      const datas = await res.json();
      console.log(datas);
      setDocData(datas);
      console.log(docData.name);
    } catch (error) {
      toast.error("Error fetching doctor profile");
      return;
    }
  };
  // useEffect(() => {
  //   console.log("this",doctorId);
  //   fetchDoctorProfile();
  //   headerOpacity.value = withTiming(showHeader ? 1 : 0, { duration: 300 });
    
  // }, [showHeader]);
 useEffect(() => {
    fetchDoctorProfile();
  }, [doctorId]); 
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-400, 0, 400],
            [-400 / 2, 0, 400 * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-400, 0, 400], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: interpolate(headerOpacity.value, [0, 1], [-50, 0]),
        },
      ],
    };
  });

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowHeader(offsetY > 300);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#003B2E80" }}>
      <Animated.FlatList
        ref={scrollref}
        data={[{ key: "content" }]} // Using a single item to wrap your content
        renderItem={() => (
          <>
            <Animated.Image
              source={doctorpicture}
              style={[{ height: 400, width: "100%" }, imageAnimatedStyle]}
            />
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 30,
                marginTop: -50,
                minHeight: "100%",
              }}
            >
              {showHeader && (
                <Animated.View style={[headerAnimatedStyle]}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={doctorprofile}
                        resizeMode="cover"
                        style={{ flex: 1, width: undefined, height: undefined }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {docData?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {docData?.name}
                    </Text>
                    <Text style={{ color: "#777777", marginTop: 5 }}>
                      {/* ENT Surgeon */}
                      {docData?.specializations}
                    </Text>
                  </View>
                </Animated.View>
              )}
              {!showHeader && (
                <>
                  <View
                    style={{
                      height: 1,
                      width: 16,
                      backgroundColor: "#000000",
                      marginVertical: 10,
                      borderRadius: 3,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {/* {item.Name} */}
                      {docData?.name}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        // textAlign: "flex-end", 
                      }}
                    >
                      {/* {item.Name} */}
                      {docData?.city}
                      
                    </Text>
                    <TouchableOpacity>
                      <Feather name="bookmark" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#777777",
                      marginVertical: 10,
                    }}
                  >
                    {docData?.specializations}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "left",
                      marginVertical: 10,
                    }}
                  >
                    Dr.   {docData?.name}, is a distinguished ENT surgeon renowned for
                    her expertise in diagnosing and treating conditions
                    affecting the ear, nose, and throat. With a passion for
                    improving patients' quality of life, Dr.{docData?.name}{" "}
                    combines compassion with cutting-edge medical knowledge to
                    provide comprehensive care.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <FontAwesome name="star" size={20} color="#FFD700" />
                    <FontAwesome name="star" size={20} color="#FFD700" />
                    <FontAwesome name="star" size={20} color="#FFD700" />
                    <FontAwesome name="star" size={20} color="#FFD700" />
                    <FontAwesome name="star" size={20} color="#3F3E3C" />
                    <Text style={{ fontSize: 18, marginLeft: 5 }}>4.66</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 5,
                    }}
                  >
                    <Feather name="clock" size={16} color="#7B7B7B" />
                    <Text style={{ color: "#7B7B7B", marginLeft: 5 }}>
                      04:00 PM - 08:00 PM
                    </Text>
                  </View>
                </>
              )}
              <View>
                <TimeSlotBooking />
              </View>
            </View>
          </>
        )}
        // keyExtractor={(docData) => docData.key}
        // {docData?.name}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Doctorprofile;
