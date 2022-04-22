import { ResourceSavingView } from '@react-navigation/elements';
import * as React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { ScreenContainer, screensEnabled, Screen, ScreenContainerProps } from 'react-native-screens';

type Props = {
    visible: boolean;
    children: React.ReactNode;
    enabled: boolean;
    style?: StyleProp<ViewStyle>;
};


export const MaybeScreenContainer = ({
    enabled,
    ...rest
}: ScreenContainerProps) => {
    if (screensEnabled?.()) {
        return <ScreenContainer enabled={enabled} {...rest} />;
    }

    return <View {...rest} />;
};

export function MaybeScreen({ visible, children, ...rest }: Props) {
    if (screensEnabled?.()) {
        return (
            <Screen activityState={visible ? 2 : 0} {...rest}>
                {children}
            </Screen>
        );
    }

    return (
        <ResourceSavingView visible={visible} {...rest}>
            {children}
        </ResourceSavingView>
    );
}
