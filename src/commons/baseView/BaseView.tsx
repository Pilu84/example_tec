import { ClearOutlined, LayersOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { createUseStyles } from "react-jss";
import { ButtonSize, ButtonType } from "../../components/baseComponentTypes";
import { MainBtn } from "../MainBtn/MainBtn";


export interface BaseViewProps {
    readonly children: ReactElement | null;
    readonly headerData: {
        readonly name: string | null;
        readonly id: string | null;
    }
    readonly close?: () => void;
    readonly openDraw?: () => void;
}

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#f2f2f2',
    },
    noData: {
        justifyContent: 'center'
    },
    headerMain: {
        height: '100%',
        width: '100%',
        "& >div": {
            paddingLeft: '16px',
            borderBottom: '1px solid #c6c4c4'
        }
    },
    headerMenu: {
        display: 'flex',
        border: 'none'
    },
    headerTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    closeBtn: {
        color: '#000'
    }
});

export const BaseView = React.memo(function BaseView(props: BaseViewProps) {

    const classes = useStyles();

    // const theme = useTheme();

    return (
        <div className={classes.main}>

            <Box className={classes.headerMain}>
                <div className={classes.headerTitle}>
                    <h2>{`${props.headerData.name} (${props.headerData.id})`}</h2>

                    <MainBtn
                        type={ButtonType.icon}
                        btnSize={ButtonSize.small}
                        icon={ClearOutlined}
                        tooltip={'Schliesen'}
                        rootClassName={classes.closeBtn}
                        onClick={props.close}
                    />

                </div>

                <div className={classes.headerMenu}>
                    <MainBtn
                        type={ButtonType.iconWithText}
                        btnSize={ButtonSize.medium}
                        icon={ModeEditOutlineOutlined}
                        label={"Bearbeiten"}
                        onClick={props.openDraw}
                    />
                    <MainBtn
                        type={ButtonType.iconWithText}
                        btnSize={ButtonSize.medium}
                        icon={LayersOutlined}
                        label={"Duplizieren"}
                    />
                    <MainBtn
                        type={ButtonType.iconWithText}
                        btnSize={ButtonSize.medium}
                        icon={ClearOutlined}
                        label={"Löschen"}
                    />
                </div>

                <div>
                    {props.children}
                </div>
            </Box>

        </div>
    )

})