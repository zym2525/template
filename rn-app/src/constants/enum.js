export const UserType = {
    Teacher: 1,
    Student: 2,
    SystemAdmin: 3,
    SchoolAdmin: 4
}

export const SpinnerStyle = {
    /**
     * @description 平行移动 特点: HeaderView高度不会改变
     */
    Translate: 0,
    /**
    * @description 拉伸形变 特点：在下拉和上弹（HeaderView高度改变）时候，会自动触发OnDraw事件
    */
    Scale: 1,
    /**
    * @description 固定在背后 特点：HeaderView高度不会改变
    */
    FixedBehind: 2,
    /**
    * @description 固定在前面 特点：HeaderView高度不会改变
    */
    FixedFront: 3,
    /**
     *  @description 填满布局 特点：HeaderView高度不会改变
     */
    MatchLayout: 4,
}