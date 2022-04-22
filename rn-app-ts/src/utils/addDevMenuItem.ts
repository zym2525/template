import { DevSettings } from 'react-native'
import { store } from '@/store/store';
import { commonActions } from '@/reducers/common'

export function addDevMenuItem() {
    if (!__DEV__) return;
    DevSettings.addMenuItem('Toggle Dev Components Screen', () => {
        store.dispatch(commonActions.toggleDevComponentScreen())
    })
}