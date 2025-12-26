import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"


export type RootStackParamList = {
    menu: undefined;
    wellnessDetails: { data: SpaBase };
    privateSaunaDetails: { data: SpaBase };
    massageAndBeautyDetails: { data: SpaBase };
    publicSaunaDetails: { data: SpaBase };
    addSpa: undefined;
};

export type DrawerParamList = {
    home: undefined;
    wellness: undefined;
    privateSauna: undefined;
    profile: undefined;
    favorites: undefined;
    settings: undefined;
    about: undefined;
    beautyAndMassage: undefined;
    publicSauna: undefined;
    spa: undefined;
};

export type AuthStackParamsList = {
    login: undefined;
    register: undefined;
};

export type RootStackNavProps< T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
export type DrawerNavProps< T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;
export type AuthStackNavProps< T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList, DrawerParamList, AuthStackParamsList {}
    }
}