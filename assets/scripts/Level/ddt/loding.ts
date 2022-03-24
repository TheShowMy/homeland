
import { _decorator, Component, Node, UITransform, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;


 
@ccclass('loding')
export class loding extends Component {
    @property(Node)
    public lodingProgressBar: Node = null;


    onLoad(){
    }
    start () {
        let ProgressBarWidth = this.lodingProgressBar.getComponent(UITransform).contentSize.width - 10;
        const progressBar = this.lodingProgressBar.getComponent(ProgressBar);
        progressBar.totalLength = ProgressBarWidth;
    }
    update(time){
        const progressBar = this.lodingProgressBar.getComponent(ProgressBar);
        console.log();
        progressBar.progress += 0.5 * time;
        if (progressBar.progress >= 1) {
            this.node.destroy()
        }
        
    }

}

