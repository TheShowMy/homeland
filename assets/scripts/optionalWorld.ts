
import { _decorator, Component, Node, ccenum, Prefab, instantiate, Label, Input } from 'cc';
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


@ccclass('OptionalWorld')
export class OptionalWorld extends Component {

    @property(Prefab)
    public worlList = null;

    @property(gameManage)
    public gameManage = null;

    public choose:number;

    start() {
        /**
         * 打开世界选择界面后 加载存在的世界写入列表
         * 并未每一个列表注册事件
         */
        for (let world of worlds) {

            let pos: Node = instantiate(this.worlList)
            pos.children[0].getComponent(Label).string = world.name;
            pos.setParent(this.node);

            pos.on(Input.EventType.MOUSE_DOWN, () => {
                this.gameManage.worldListChoose = world.choose;
            }, this)
        }

    }





}