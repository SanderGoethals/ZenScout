import { StackScreenProps } from "@react-navigation/stack"


export type RootStackParamList = {
    wellnessList: undefined;
    wellnessDetails: { data: Wellness };
};

export type RootStackNavProps< T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList{}
    }
}