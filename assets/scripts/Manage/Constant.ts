
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
    public static View_Wareroom_button = 102;
    public static View_Article_Detail = 103;
    public static View_refresh_RoleUi = 1001;

    public static Game_Role_PlayAnimation  = 2021;

    public static Csv_load = 301;
}



