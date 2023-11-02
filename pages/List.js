import { View, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, TouchableHighlight, Animated, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Hyperlink from 'react-native-hyperlink'
import { TextInput, Text, Button, FAB, IconButton, MD3Colors } from 'react-native-paper';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import mime from 'mime';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';

export default function List({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [list, setList] = useState('');
  const [list1, setList1] = useState('');
  const [note, setNote] = useState('');
  const [details, setDetails] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [optionsVisible, setOptionsVisible] = useState(false);
  // const [updatedNote, setUpdatedNote] = useState('');
  const [image, setImage] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  })
  const openUploader = async () => {
    await launchCamera()
      .then((res) => {
        console.log(res.assets[0].uri);

        const newImageUri = "file:///" + res.assets[0].uri.split("file:/").join("");
        setImage({
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop()
        })
        // const imageData = new FormData()
        // imageData.append("image", {
        //   uri: newImageUri,
        //   type: mime.getType(newImageUri),
        //   name: newImageUri.split("/").pop()
      })

      // fetch("http://192.168.1.52:3000/api/list/upload_image/1",
      //   {
      //     body: imageData,
      //     method: "POST"
      //   }).then((res) => {
      //     console.log(res);
      //   }).catch(err => {
      //     console.log(err);
      //   });

      .catch((err) => {
        console.log(err);
      });
  }

  const loadData = () => {
    fetch('http://192.168.8.100:3000/api/list/get_list')
      .then((response) => response.json())
      .then((json) => setData(json));
  }

  const saveData = () => {
    try {
      fetch('http://192.168.8.100:3000/api/list/add_list', {
        method: 'POST',
        body: JSON.stringify({
          list: list,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        // .then((response) => response.json())
        // .then((json) => console.log(json));
        .then(res => res.json())
        .then(res => {
          const imageData = new FormData()
          imageData.append("image", image)
          console.log(imageData);
          console.log(res);

          fetch('http://192.168.8.100:3000/api/list/upload_image/' + res,
            {
              body: imageData,
              method: "POST",
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => res.json())
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }

  const updateData = () => {
    console.log(details.id);
    try {
      fetch('http://192.168.8.100:3000/api/list/update_list/' + details.id, {
        method: 'PUT',
        body: JSON.stringify({
          list: list1,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        // .then((json) => console.log(json))
        .then(res => {
          if (image == '') {
            console.log("Fail")
          } else {
            console.log("-----------------------" + res.insertId);
            const imageData = new FormData()
            imageData.append("image", image)
            // console.log(imageData);


            fetch('http://192.168.8.100:3000/api/list/upload_image/' + details.id,
              {
                body: imageData,
                method: "POST",
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }).then(res => res.json())
              .then(res => {
                // console.log(res);
                setModalVisible1(false);
              })
              .catch(err => {
                console.log(err);
              });

            // 
          }
        });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }

  const deleteData = () => {
    console.log(details.id);
    try {
      fetch('http://192.168.8.100:3000/api/list/delete_list/' + details.id, {
        method: 'DELETE',
      }).then(res => res.json())
        .then(res => {
          // console.log(res);
          setModalVisible2(false);
        });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  const renderLeftActions = (progress, list) => {
    return (
      <View style={styles.flatListContainer1}>
        {/* <TouchableOpacity
          style={{ top: 7, width: 100, height: 175, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Text style={{ fontSize: 30 }}>Delete</Text> */}
        <IconButton
          icon="delete"
          iconColor={MD3Colors.error50}
          size={50}
          onPress={() => { setModalVisible2(true); setDetails(list); setList1(list.list) }}
        />
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  const renderRightActions = (progress, list) => {
    return (
      <View style={styles.flatListContainer1}>
        {/* <TouchableOpacity
          style={{ top: 7, width: 100, height: 175, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Text style={{ fontSize: 30 }}>Update</Text> */}
        <IconButton
          icon="update"
          iconColor={MD3Colors.error50}
          size={50}
          onPress={() => { setModalVisible1(true); setDetails(list); setList1(list.list) }}
        />
        {/* </TouchableOpacity> */}

      </View>
    );
  };

  return (
    <View>
      {/* <Button onPress={loadData} title="Login" /> */}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Swipeable renderLeftActions={(progress) => renderLeftActions(progress, item)} renderRightActions={(progress) => renderRightActions(progress, item)}>
              <View style={styles.flatListContainer}>

                {/* <TouchableOpacity style={styles.button} onPress={() => { setModalVisible1(true); setDetails(item); setList1(item.list) }}> */}
                <Image
                  style={{ height: 200, width: "100%" }}
                  source={{
                    uri: 'http://192.168.8.100:3000/images/' + item.imagename,
                  }}
                />
                <Text style={styles.Text}>{item.list}</Text>
              </View>
            </Swipeable>
          )
        }}
        // 
        // 
        // keyExtractor={item => item.id}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        // onPress={() => { setModalVisible(true); }}
        onPress={toggleModal}
      // onPress={() => console.log('hi')}
      />
      {/* <Modal transparent={true} visible={this.state.show}>
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 50 }}>Modal Text</Text>
          </View>
        </View>
      </Modal> */}
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
              <View style={{ backgroundColor: "#ffffff", margin: 10, padding: 10, borderRadius: 2, flex: 1 }}>
                {/* <Text style={{ fontSize: 20 }}>Modal Text</Text> */}
                <TextInput value={list} onChangeText={(val) => { setList(val) }}
                  style={styles.input} />
                <View>
                  {/* <Text>React Native Image Upload Demo</Text> */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setModalVisible(false); }}
                  >
                    <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={openUploader}
                  >
                    <Text style={{ fontSize: 22, height: 25, }}>Open Uploader</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={loadData}
                  >
                    <Text style={{ fontSize: 22, height: 25, }}>Load Data</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={saveData}
                  >
                    <Text style={{ fontSize: 22, height: 25, }}>Save Data</Text>
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri: 'http://192.168.8.100:3000/image_1692528435141.jpg',
                    }}
                    style={{ width: 300, height: 300 }}
                  />
                </View>
              </View>
            </View>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View>

      <View style={{ flex: 1 }}>
        <Button title="Show modal" />
        <Modal isVisible={isModalVisible1}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 440, backgroundColor: 'white' }}>
              <View style={{ margin: 5, padding: 5, borderRadius: 2, flex: 1 }}>
                <TextInput value={list1} onChangeText={(val) => { setList1(val) }}
                  style={styles.input} />
                {/* <Text style={{ fontSize: 40, marginBottom: 5 }}>{details.list}</Text> */}
                <Image
                  style={styles.tinyLogo1}
                  source={{
                    uri: 'http://192.168.8.100:3000/images/' + details.imagename,
                  }}
                />
                {/* <Button title='Open Uploader' onPress={openUploader} /> */}
                {/* <Button title='Save Data' onPress={updateData} /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { setModalVisible1(false); }}
                >
                  <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={openUploader}
                >
                  <Text style={{ fontSize: 22, height: 25 }}>Open Uploader</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={updateData}
                  onPress={updateData}
                >
                  <Text style={{ fontSize: 22, height: 25 }}>Save Data</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 5 }}></View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ flex: 1 }}>
        <Button title="Show modal" />
        <Modal isVisible={isModalVisible2}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 440, backgroundColor: 'white' }}>
              <View style={{ margin: 5, padding: 5, borderRadius: 2, flex: 1 }}>
                <TextInput value={list1} onChangeText={(val) => { setList1(val) }}
                  style={styles.input} />
                {/* <Text style={{ fontSize: 40, marginBottom: 5 }}>{details.list}</Text> */}
                <Image
                  style={styles.tinyLogo1}
                  source={{
                    uri: 'http://192.168.8.100:3000/images/' + details.imagename,
                  }}
                />
                {/* <Button title='Open Uploader' onPress={openUploader} /> */}
                {/* <Button title='Save Data' onPress={updateData} /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { setModalVisible2(false); }}
                >
                  <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={deleteData}
                >
                  <Text style={{ fontSize: 22, height: 25 }}>Delete</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 5 }}></View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 16,
    paddingBottom: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6
  },
  flatListContainer1: {
    backgroundColor: "white",
    marginVertical: 10,
    width: 100,
    marginHorizontal: 16,
    paddingBottom: 32,
    borderColor: 'black',
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#f1f2f6"
  },
  Text: {
    fontSize: 24,
    paddingTop: 6,
  },
  fab: {
    position: 'absolute',
    width: 70,
    // margin: 16,
    right: 5,
    top: 660,
  },
  input: {
    height: 100,
    backgroundColor: 'lightblue',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#70a1ff',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 30,
    borderRadius: 10
  },
  tinyLogo: {
    display: 'flex',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  tinyLogo1: {
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center',
    width: 100,
    height: 100,
    left: 110
  }
})