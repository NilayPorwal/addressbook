import React,  { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import  ContactsList from './ContactsList';
import  AddContact from './AddContact';

export const RootStack = StackNavigator(
  {  
   AddContact:{
	  screen:AddContact
	} ,
	  
	  ContactsList:{
	  screen:ContactsList
	}     
    
	  
	  
  
   
 } 
 )      