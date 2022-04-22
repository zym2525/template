export type RootStackParamList = {
    Home: undefined;
    StartUp: undefined;
    Login: undefined;
    RefreshList: undefined;
    StickyItem: undefined;
    BottomSheetIndex: undefined;
    BottomSheet: undefined;
    BlurToolbar: undefined;
    Counter: undefined;
    WaterfallGrid: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}