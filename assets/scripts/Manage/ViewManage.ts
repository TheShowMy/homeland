
import { _decorator, Component, Node, View, resources, Prefab, instantiate } from 'cc';
import { MessageType } from './Constant';
import { ManageBase } from './ManageBase';
import { Message } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;


 
@ccclass('ViewManage')
export class ViewManage extends ManageBase{
    private static instance: ViewManage;

    @property(Node)
    public UI = null;

    public static getInstance() {
        return this.instance;
    }
    private constructor() {
        super()
    };

    onLoad(){
        super.onLoad();
        ViewManage.instance = this;
    }
    start(){
    }
    setMessageType(){
        return MessageType.Type_view;
    }

        //重写ReceiveMessage 希望直接在管理类处理有些消息
        ReceiveMessage(message:Message){
            if(MessageType.Type_view != message.Type){
                return;
            }
            if (message.Command === MessageType.Type_view) {
                
                if(message.Content === "loadBg"){
                    new Promise((resolve, reject)=>{
                        resources.load("prefab/ui/bg",Prefab,(err,data)=>{
                            let bg =  instantiate(data);
                            bg.setParent(this.UI);
                            resolve(true);
                        });
                    }).then((res)=>{
                        if(res){
                            MessageCenter.SendCustomMessage(MessageType.Type_view,MessageType.View_loading,false);
                        }
                    });
                    
                    return;
                }
                if(message.Content === "openSelectWord"){
                    resources.load("prefab/ui/selectWord",Prefab,(err,data)=>{
                        let selectWord =  instantiate(data);
                        selectWord.setParent(this.UI);
                    });
                }
                
      
            }
            super.ReceiveMessage(message);
    
        }

}


