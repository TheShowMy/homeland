
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
/**
     * 事件类型枚举
     */
export class MessageType {
    public static Type_view = 1;                //视图类消息
    public static Type_game = 2;                //游戏逻辑类消息
    public static Type_csv = 3;                 //

    public static View_loading = 101;

    public static Csv_load = 301;
}

