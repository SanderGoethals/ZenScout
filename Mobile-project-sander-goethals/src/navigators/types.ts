import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"


export type RootStackParamList = {
    menu: undefined;
    wellnessList: undefined;
    wellnessDetails: { data: Wellness };
    privateSaunaList: undefined;
    privateSaunaDetails: { data: PrivateSauna };
    massageAndBeautyList: undefined;
    massageAndBeautyDetails: { data: MassageAndBeauty };
    publicSaunaList: undefined;
    publicSaunaDetails: { data: PublicSauna };
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
};

export type RootStackNavProps< T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
export type DrawerNavProps< T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList, DrawerParamList {}
    }
}