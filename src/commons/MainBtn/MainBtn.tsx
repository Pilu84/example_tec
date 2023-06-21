import { Button, IconButton, SvgIcon, Tooltip } from "@mui/material";
import React, { SyntheticEvent, useCallback } from "react";
import { createUseStyles } from 'react-jss'
import { ButtonSize, ButtonType, ComponentProps } from "../../components/baseComponentTypes";
import { IconFontSize, NIcon } from "../NIcon/NIcon";


export interface MainBtnProps extends ComponentProps {
    readonly type: ButtonType;
    readonly label?: string | null;
    readonly icon?: typeof SvgIcon;
    readonly onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
    readonly btnSize?: ButtonSize;
    readonly disabled?: boolean;
    readonly tooltip?: string | null;
    readonly tooltipDisabled?: boolean;
}

const useStyles = createUseStyles({
    wrapper: {
        padding: '4px',
        display: 'flex',
        justifyContent: 'center'
    },
    mainBtn: {
        color: '#fff'
    },
    mainBtnUnderText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    mainTextIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        color: '#000',
        justifyContent: 'space-between',
        '&:hover': {
            color: '#1976d2'
        },
        '& span': {
            paddingLeft: '8px'
        }
    }
})


const iconSize = (size: ButtonSize): IconFontSize => {
    switch (size) {
        case ButtonSize.large:
            return IconFontSize.large;
        case ButtonSize.medium:
            return IconFontSize.medium;
        case ButtonSize.small:
            return IconFontSize.small;
    }
}

export const MainBtn = React.memo(function MainBtn(props: MainBtnProps) {

    const classes = useStyles();

    const clickHandler = useCallback((event: SyntheticEvent<HTMLElement>) => {
        const onClick = props.onClick;
        if (onClick != null) {
            event.preventDefault();
            onClick(event);
        }
    },
        [props.onClick]
    )


    const icon = (props.icon == null) ? undefined :
        <NIcon
            icon={props.icon}
            size={iconSize(props.btnSize ?? ButtonSize.small)}
        />

    let element;

    if (props.type === ButtonType.icon && props.icon != null) {
        element =
            <div className={classes.wrapper}>
                <IconButton
                    onClick={clickHandler}
                    style={props.rootStyle ? props.rootStyle : undefined}
                    className={props.rootClassName ? props.rootClassName : classes.mainBtn}
                    disabled={props.disabled}
                >
                    {icon}
                </IconButton>
            </div>;
    } else if (props.type === ButtonType.text) {
        element = <div className={classes.wrapper}>
            <Button
                variant={"outlined"}
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : classes.mainBtn}
            >
                {props.label}
            </Button>
        </div>;
    } else if (props.type === ButtonType.iconWithUnderText) {
        element = <div className={classes.wrapper}>
            <Button
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : classes.mainBtnUnderText}
            >
                {icon}
                {props.label}
            </Button>
        </div>;

    } else if (props.type === ButtonType.iconWithText) {
        element = <div className={classes.wrapper}>
            <Button
                disabled={props.disabled}
                size={props.btnSize ?? ButtonSize.small}
                onClick={clickHandler}
                style={props.rootStyle ? props.rootStyle : undefined}
                className={props.rootClassName ? props.rootClassName : classes.mainTextIcon}
            >
                {icon}
                <span>{props.label}</span>
            </Button>
        </div>;

    } else {
        return null;
    }

    if (!props.tooltipDisabled) {
        element = <Tooltip title={props.tooltip ?? props.label}>{element}</Tooltip>
    }

    return element;

})