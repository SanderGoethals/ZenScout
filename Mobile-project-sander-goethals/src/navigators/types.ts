import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"


export type RootStackParamList = {
    wellnessList: undefined;
    wellnessDetails: { data: Wellness };
    menu: undefined;
};

export type DrawerParamList = {
    home: undefined;
    profile: undefined;
    favorites: undefined;
    settings: undefined;
    about: undefined;
};

export type RootStackNavProps< T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
export type DrawerNavProps< T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList, DrawerParamList {}
    }
}