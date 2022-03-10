
import { _decorator, Component, Node, Label } from 'cc';
import { gameManage } from './gameManage';
const { ccclass, property } = _decorator;
var worlds = [
    {
        name: "斗弹世界",
        map: "ddt",
        choose: 1,

    },
    {
        name: "像素世界",
        map: "minecraft",
        choose: 2,
    },
    {
        name: "原魔",
        map: "minecraft2",
        choose: 3,
    },
];

 
@ccclass('messageUi')
export class messageUi extends Component {
    @property(gameManage)
    public gameManage = null;
    @property(Label)
    public label = null;

    
    start () {
        for (let world of worlds) {
            if (world.choose === this.gameManage.worldListChoose) {
                this.label.string = world.name + ":还未开放,敬请期待";
            }
        }
    }
    update(){
        for (let world of worlds) {
            if (world.choose === this.gameManage.worldListChoose) {
                this.label.string = world.name + ":还未开放,敬请期待";
            }
        }
    }

}


