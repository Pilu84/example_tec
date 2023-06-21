import React from "react";
import { SelectedContent } from "../../../App";
import { MainMenu } from "./MainMenu";

export type UnderMenuDataType =
    ReadonlyArray<{
        readonly [key: string]: {
            readonly title: string,
            readonly underMenu: ReadonlyArray<{ name: string, key: string }> | null;
        }
    }
    >;



export interface MenuDataType {
    readonly title: string;
    readonly data: UnderMenuDataType;
}

export interface MenuData {
    readonly [key: string]: MenuDataType;
};

export interface MainMenuContainerProps {
    readonly selectedContent: (selectedContentId: SelectedContent | null) => void;
}

export const MainMenuContainer = React.memo((props: MainMenuContainerProps) => {

    // const [menuData, setMenuData] = useState();

    const data = require('./../../../dummyData/secondaryMenu.json');

    return (
        <MainMenu
            data={data.data}
            selectedContent={props.selectedContent}
        />
    );

})