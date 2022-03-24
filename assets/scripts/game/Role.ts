
import { dragonBones, SkelAnimDataHub, _decorator } from 'cc';
import { ComponentBase } from '../Manage/ComponentBase';
import { MessageType } from '../Manage/Constant';
import { GameManage } from '../Manage/GameManage';
import { Message } from '../Manage/Message';
const { ccclass, property } = _decorator;


 
@ccclass('Role')
export class Role extends ComponentBase {


    onLoad(){
        GameManage.getInstance().RegisterReceiver(this);
    }
    
    start () {
        
        
        //console.log(this.node.getComponent(dragonBones.ArmatureDisplay).getAnimationNames(this.node.getComponent(dragonBones.ArmatureDisplay).animationName););
        
    }
    ReceiveMessage(message:Message){
        super.ReceiveMessage(message);
        if (message.Command === MessageType.Game_Role_PlayAnimation) {
            const Display = this.node.getComponent(dragonBones.ArmatureDisplay);
            Display.playAnimation("Idle",0);
  
        }
        
    }
    
}

