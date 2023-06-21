import { SvgIcon } from "@mui/material";
import { CSSProperties } from "react";
import { ReactElement } from "react";

export enum IconFontSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
    inherit = 'inherit'
}


export interface NIconPropsModel {
    icon: typeof SvgIcon;
    size?: IconFontSize;
    rootStyle?: CSSProperties | null;
}


export const NIcon = (function NIcon(props: NIconPropsModel) {

    const element: ReactElement<any> = <props.icon
        fontSize={props.size ? props.size : IconFontSize.medium}
        sx={props.rootStyle ? props.rootStyle : null}
    />;

    return element;

})