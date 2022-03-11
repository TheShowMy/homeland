
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;


 
@ccclass('PveButtonManager')
export class PveButtonManager extends Component {


    power(){
        
    }
 
 
    public cancelButton(){
        setTimeout(() => {
            director.preloadScene("scene", (err, scene) => {
                director.loadScene("scene");
            });
        }, 10);
    }

}
