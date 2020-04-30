import React, { Component } from 'react';
import MenuSection from "./MenuSection"
import {Typography} from '@material-ui/core';
class MenuSectionWrapper extends Component {
    
    render() {
        return (
            <div>
               {this.props.menu.map((section,i)=>{
                   return(
                   <MenuSection 
                        key={i} 
                        section = {section}
                        handleChanges={this.handleChanges.bind(this)}/>)
                })} 
               <Typography
                    color="textSecondary"
                    style={{
                        color:this.props.error?"#f44336":"black",
                        fontSize:"0.75rem",
                        marginLeft:"14px"}}>
                   {this.props.helperText}
                </Typography>
            </div>
        );
    }


    handleChanges(op,element){
        var tmp = []
        tmp = this.props.value.map(e=>e)
        if(op === "add"){
            tmp.push(element)
        }else if(op === "rm"){
            tmp = tmp.filter(e=> e.item.value !== element.item.value)
        }else{
            tmp = tmp.map(e=>{
                if(e.item.value === element.item.value)
                    return element
                else
                    return e
            })
        }
        var e = {target:{value:tmp,id:this.props.id}}
        this.props.onChange(e)
    }
}

export default MenuSectionWrapper;