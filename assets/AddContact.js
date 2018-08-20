import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name : "test.db", createFromLocation : "~sqllite.db"});
   
global.addContact;   
export default class AddContact extends Component {
	
	
    constructor(props) {
    super(props);
    this.state = {   
	name: ' ' ,
	number:'',
	

	}; 
		global.addContact = this;	
  }
  
  onAdd(){  
  var self = this;
  if(this.state.name !=='' && this.state.number !==''){
   db.transaction((tx) => {
    // tx.executeSql('DROP TABLE contacts');
    tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (id integer primary key, name text, number integer)');
    tx.executeSql('INSERT INTO contacts (name, number) VALUES (?,?)', [this.state.name,this.state.number]);
	this.setState({name:'',number:''});
    self.props.navigation.navigate('ContactsList')
    });
       
  }   
   else{    
	   alert('Contact is empty')     
   }   
  }  
   
	redirectToList()
	{
		this.props.navigation.navigate('ContactsList');
	}
   
   static navigationOptions =  ({ navigation }) => { return {
      headerTitle:<View style={{padding:5, flexDirection:'row'}}>
	              <View style={{width:'70%'}}>
                   <Text style={{fontWeight:'bold',fontSize:20, color:'#ffff'}}>Add New Contact</Text>
				  </View>
				  <TouchableOpacity style={{ width:'30%', backgroundColor:'#ffff', justifyContent:'center', alignItems:'center', borderRadius:5}} onPress={()=>{global.addContact.redirectToList()}}>
				    <Text style={{fontWeight:'bold',fontSize:15, color:'BLACK'}}>Contact List</Text>
				  </TouchableOpacity>
         		  </View>,  
	  headerStyle: { backgroundColor: '#232f3e' }, 
	  headerLeft:null  
   }        
  };          
    
  
          
  render(){   
	 return(
       <View style={{flex:1, backgroundColor:'#ffff'}}>
	  
	    <View style={{marginTop:20}}>
		  <Text style={{color:'black', padding:5}}>Name</Text>
		  <TextInput
             style={{borderColor: 'gray', borderWidth: 1, margin:5}}
             onChangeText={(name) => this.setState({name})}
             value={this.state.name}
			 underlineColorAndroid='transparent'  
  
         />         
		</View>     
		<View style={{marginTop:20}}>
		  <Text style={{color:'black', padding:5}}>Contact Number</Text>
		  <TextInput
             style={{borderColor: 'gray', borderWidth: 1,margin:5}}
             onChangeText={(number) => this.setState({number})}
             value={this.state.number}
			 underlineColorAndroid='transparent'
			 keyboardType='numeric'
  
         />  
		</View>
        <TouchableOpacity onPress={this.onAdd.bind(this)} style={{margin:10, padding:10, backgroundColor:'lightgrey', width:50}}>
		  <Text style={{color:'black', fontSize:15}}>Add</Text>
		</TouchableOpacity>
	          
	   </View>	     

	)}

} 