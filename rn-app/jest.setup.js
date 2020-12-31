jest.mock('react-native', () => {
    const RN = jest.requireActual("react-native");
    RN.NativeModules.Orientation = {
        getOrientation: jest.fn(),
        getSpecificOrientation: jest.fn(),
        lockToPortrait: jest.fn(),
        lockToLandscape: jest.fn(),
        lockToLandscapeRight: jest.fn(),
        lockToLandscapeLeft: jest.fn(),
        unlockAllOrientations: jest.fn(),
    };
    return RN;
});