export enum UserType {
    Teacher = 1,
    Student,
    SystemAdmin,
    SchoolAdmin
}

export enum SpinnerStyle {
    /**
     * @description 平行移动 特点: HeaderView高度不会改变
     */
    Translate = 0,
    /**
    * @description 拉伸形变 特点：在下拉和上弹（HeaderView高度改变）时候，会自动触发OnDraw事件
    */
    Scale,
    /**
    * @description 固定在背后 特点：HeaderView高度不会改变
    */
    FixedBehind,
    /**
    * @description 固定在前面 特点：HeaderView高度不会改变
    */
    FixedFront,
    /**
     *  @description 填满布局 特点：HeaderView高度不会改变
     */
    MatchLayout,
}