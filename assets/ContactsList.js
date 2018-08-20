import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native';
var SQLite = require('react-native-sqlite-storage');

var db = SQLite.openDatabase({name : "test.db", createFromLocation : "~sqllite.db"});

   
export default class ContactsList extends Component {
 
    constructor(props) {
    super(props);
    this.state = {   
	data:[],
    isRefreshing:false    
	};
	
   }
     
       
componentDidMount(){	 
	 db.transaction((tx) => {  
	  //tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (id integer primary key, name text, number integer)');
      tx.executeSql('SELECT * FROM contacts', [], (tx, results) => {
        
		 var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
              this.setState({data:[...this.state.data,{name: row.name, number:row.number,id:row.id}], isRefreshing: false});
		  }
        }, function (error) {
          alert(JSON.stringify(error)); 
        });
    });
               
  }                         
                   
  onDelete(id,index){    
	   var self = this; 
	  db.transaction((tx) => {
      tx.executeSql('DELETE FROM contacts WHERE id='+id, [], (tx, rs)=>{ 
	 
     self.setState({
            data: self.state.data.filter((_, i) => i !== index)
          });
				});    
			//self.select(tx);	
    });   
	      
  }         
         
   
 static navigationOptions =  ({ navigation }) => { return {
      headerTitle:
	               <View style={{padding:5}}>
                    <Text style={{fontWeight:'bold',fontSize:20, color:'#ffff'}}>All Contacts</Text>
         		   </View>,
				    
		headerStyle: { backgroundColor: '#232f3e' },
		headerLeft:null
         
  }};       
   
     
 
  render(){
	 return(
    (this.state.isRefreshing==false)?<View style={{flex:1, backgroundColor:'#ffff'}}>
          <TouchableOpacity style={{backgroundColor:'lightgrey', padding:10, margin:20}} onPress={()=>this.props.navigation.navigate('AddContact')}>
		      <Text style={{color:'black', fontSize:15, textAlign:'center'}}>Add New Contact</Text>
		  </TouchableOpacity>
	 {
		   (this.state.data.length > 0)?   <ScrollView>
	 
   {this.state.data.map((item,index)=> {return(
	  <View style={{borderBottomWidth:1, borderBottomColor:'lightgrey', flexDirection:'row'}}>
	     <View style={{width:'70%', justifyContent:'center',}}>
		 
		  <Text style={{padding:5, color: 'black', fontSize:15, fontWeight:'bold'}}>{item.name}</Text>
		  <Text style={{padding:5, color: 'black', fontSize:15}}>{item.number}</Text>
	     </View>
	     <TouchableOpacity style={{width:'30%',margin:10, justifyContent:'center', backgroundColor:'#232f3e', alignItems:'center', borderRadius:5}} onPress={()=>{this.onDelete(item.id,index)}}>
		   <Text style={{color:'white'}}>Delete</Text>
		 </TouchableOpacity>
     </View>   
	     
	  )}
	 )}  
       </ScrollView> :<View style={{justifyContent:'center',  alignItems:'center'}}>
	               <Text style={{fontSize:20, color:'black'}}>No Contacts</Text>
	   </View>
	   }  	     
   </View>:
		   <View style={{flex:1, backgroundColor:'#ffff', justifyContent:'center'}}>
			<ActivityIndicator size="large" color="#232f3e" />
		   </View>
	)}  

} 