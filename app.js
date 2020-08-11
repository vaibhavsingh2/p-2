import React, { Component } from 'react';
import {
  Text,
  AsyncStorage,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  ScrollView
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './config';
import TaskButton from './components/TaskButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task: '',
      text: '',
      toDos: []
    };
  }

componentDidMount(){
  this.showTask()
}

showTask(){
  var tasks=[]
  var toDoThings=[]
  var ref=db.ref('toDos')
   ref.on("value",(data)=>{
     var taskList=data.val();

     for(var task in taskList){
       if(taskList[task].status === 'pending'){
         taskList[task].keys=task
         tasks.push(taskList[task])
         console.log(taskList[task])
       }
     }
     this.setState({
       toDos: tasks

     })
  tasks=[];

   })

}
 
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Header
          backgroundColor={'yellow'}
          centerComponent={{
            text: 'To do List',
            style: { marginTop: 10, fontSize: 30 },
          }}
        />

     <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png',
          }}
        />


        <TextInput
          style={styles.textInputBox}
          onChangeText={(text) => {
            this.setState({
              
              task: text,
            });
          }}
          value={this.state.task}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var word=this.state.text
              db.ref('toDos').push({
                taskName: this.state.task,
              status: "pending"
              })

            }}>
            <Text style={styles.buttonText}> Set Reminder </Text>
          </TouchableOpacity>
        </View>
        <View>
        {this.state.toDos.map((item,index)=>{
          return(
            
              <TaskButton
                keys={this.state.toDos[index].keys}
                wordChunk={this.state.toDos[index].taskName}
                buttonIndex={index}

              />
              
          )

        })
        }
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  textInputBox: {
    width: '80%',
    height: 40,
    borderWidth: 4,
    marginTop: 50,
    alignSelf: 'center',
  },
  button: {
    width: '60%',
    height: 40,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'yellow',
  },
  buttonText:{
    textAlign: 'center',
fontSize: 18,

  },
  imageIcon: {
    width: 150,
    height: 160,
    marginLeft: 95,
    marginTop:20
  }
});
