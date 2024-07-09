// import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
// import React, { useEffect, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Toast } from "toastify-react-native";
// import { showLocation } from "../../utils/functions";
// import API_URL from "../../config";

// const Search = () => {
//   const navigation = useNavigation();
//   const [search, setSearch] = useState("");
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [doctorId,setDoctorId] =useState();
//   const [searchBy, setSearchBy] = useState("name");
//   const [doctorData,setDoctorData]=useState();
//   const getDoctorNames = async () => {
//     const response = await fetch(`${API_URL}/api/search/doctors`);
//     const data = await response.json();
//     data.sort((a, b) => a.name.localeCompare(b.name));
//     setDoctors(data);
//   };

//   const filterDoctorsByName = () => {
//     setFilteredDoctors(
//       doctors.filter(doctor =>
//         doctor.name.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   };

//   useEffect(() => {
//     getDoctorNames();
//   }, []);

//   useEffect(() => {
//     if (search === "") {
//       setFilteredDoctors([]);
//     } else if (searchBy === "name")
//       filterDoctorsByName();

//   }, [search, doctors, searchBy]);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!search || search === "") {
//       Toast.warn("Please enter a valid query!");
//       return;
//     }

//     if (searchBy === "location") {
//       showLocation(null, search, null);
//       const data = await showLocation(null, search, null);
//       setDoctorData(data)
//       console.log(data);
//       // if (data) {
//       //   navigation.navigate("Home");
//       // }
//     } else {
//       filterDoctorsByName();
//     }

//   };

//   // const navigateToProfile = (item) => {
//   //   navigation.navigate("Doctorprofile", { item });
//   // };
//   const handlePress = (id) => {
//     setDoctorId(id);
//     console.log(doctorId);
//     navigation.navigate('Doctorprofile', { doctorId: id });
//   };

//   return (
//     <View className="mt-4 relative">
//       <View className="flex-row justify-between items-center mx-4">
//         <TextInput
//           placeholder={`Search by ${searchBy}...`}
//           className="p-2 px-4 flex-1 rounded-lg text-[#004D6C] bg-[#ffffff] border-none outline-none"
//           value={search}
//           onChangeText={text => setSearch(text)}
//           onSubmitEditing={handleSearch}
//         />
//         <TouchableOpacity
//           className="ml-2"
//           onPress={() => setSearchBy(searchBy === "name" ? "location" : "name")}
//         >
//           <Text style={{ color: 'teal' }}>{`Search by ${searchBy === "name" ? "Location" : "Name"}`}</Text>
//         </TouchableOpacity>
//         <View className="absolute right-10 top-2">
//           <AntDesign name="search1" size={24} color="black" />
//         </View>
//       </View>
    
//        {filteredDoctors.length > 0 && (
//         <FlatList
//           data={filteredDoctors}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => handlePress(item.id)}
//               className="p-2 border-b border-gray-200"
//             >
//               <Text className="text-lg">{item.name}</Text>
//               <Text className="text-sm text-gray-600">{item.specializations}</Text>
//             </TouchableOpacity>
//           )}
//           className="absolute top-24 left-0 right-0 bg-white z-10"
//         />
//       )}
//         {/* <ScrollView>
//         {filteredData.map((item, index) => (
//           <TouchableOpacity key={index} onPress={() => navigateToProfile(item)}>
//             <View
//               style={{
//                 padding: 20,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "#ccc",
//                 marginVertical: 5,
//                 marginLeft: 20,
//               }}
//             >
//               <Text style={{ fontSize: 20 }}>{item.Name}</Text>
//               <Text style={{ color: "#777", fontSize: 16 }}>
//                 {item.Diagnosis}
//               </Text>
//               <Text style={{ color: "#777", fontSize: 16 }}>{item.Status}</Text>
//               <Text style={{ color: "#777", fontSize: 16 }}>
//                 Last Appointment: {item["Last Appointment"]}
//               </Text>
//               <Text style={{ color: "#777", fontSize: 16 }}>
//                 Next Appointment: {item["Next Appointment"]}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView> */}
//     </View>
//   );
// };

// export default Search;




import { View, Text, TextInput, TouchableOpacity, FlatList,ScrollView,SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import { showLocation } from "../../utils/functions";
import API_URL from "../../config";

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const [searchBy, setSearchBy] = useState("name");
  const [doctorData, setDoctorData] = useState([]);

  const getDoctorNames = async () => {
    const response = await fetch(`${API_URL}/api/search/doctors`);
    const data = await response.json();
    data.sort((a, b) => a.name.localeCompare(b.name));
    setDoctors(data);
  };

  const filterDoctorsByName = () => {
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getDoctorNames();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredDoctors([]);
    } else if (searchBy === "name") {
      filterDoctorsByName();
    }
  }, [search, doctors, searchBy]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search || search === "") {
      Toast.warn("Please enter a valid query!");
      return;
    }

    if (searchBy === "location") {
      const data = await showLocation(null, search, null);
      console.log(data.length);
      setDoctorData(data);
      console.log("Doctor data by location:", data);
    } else {
      filterDoctorsByName();
    }
  };

  const handlePress = (id) => {
    setDoctorId(id);
    console.log("Selected doctor ID:", id);
    navigation.navigate('Doctorprofile', { doctorId: id });
  };

  return (
    // <SafeAreaView>
    //     <ScrollView>
    <View className="mt-4 relative">
      <View className="flex-row justify-between items-center mx-4">
        <TextInput
          placeholder={`Search by ${searchBy}...`}
          className="p-2 px-4 flex-1 rounded-lg text-[#004D6C] bg-[#ffffff] border-none outline-none"
          value={search}
          onChangeText={text => setSearch(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          className="ml-2"
          onPress={() => setSearchBy(searchBy === "name" ? "location" : "name")}
        >
          <Text style={{ color: 'teal' }}>{`Search by ${searchBy === "name" ? "Location" : "Name"}`}</Text>
        </TouchableOpacity>
        <View className="absolute right-10 top-2">
          <AntDesign name="search1" size={24} color="black" />
        </View>
      </View>
    
    
      {searchBy === "location" && doctorData.length > 0 && (
  <FlatList
    data={doctorData}
    keyExtractor={(item) => (item.uid ? item.uid.toString() : Math.random().toString())}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => handlePress(item.uid)}
        style={{
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.data.name}</Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{item.data.specializations}</Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={{
      paddingHorizontal: 4,
      paddingBottom: 24,
    }}
  />
)}
    </View>
    // </ScrollView></SafeAreaView>
  );
};

export default Search;
