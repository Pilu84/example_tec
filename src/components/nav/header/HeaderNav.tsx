import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createSvgIcon } from "@mui/material";
import { createUseStyles } from "react-jss";
import { InputTextField } from "../../../commons/InputTextField/InputTextField";
import { ButtonSize, ButtonType, InputTextFieldType } from "../../baseComponentTypes";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { BrightnessLowOutlined, ErrorOutlineOutlined, HelpOutlineOutlined, TableViewOutlined } from "@mui/icons-material";
import { MainBtn } from "../../../commons/MainBtn/MainBtn";

const DbIcon = createSvgIcon(
    <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.59 21 12 21S20 19.21 20 17V7C20 4.79 16.42 3 12 3M18 17C18 17.5 15.87 19 12 19S6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16S16.39 15.55 18 14.77V17M18 12.45C16.7 13.4 14.42 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11C14.39 11 16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5C15.87 5 18 6.5 18 7S15.87 9 12 9Z" />,
    'Db'
);

const useStyles = createUseStyles({
    headerContainer: {
        height: '70px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center'
    },
    leftWrapper: {
        display: 'flex',
        flex: 1
    },
    centerWrapper: {
        display: 'flex',
        flex: 2
    },
    rightWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    }
})

export const HeaderNav = React.memo(() => {

    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>

            <div className={classes.leftWrapper}>
                <MainBtn
                    icon={AddCircleOutlineIcon}
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                    label={'Add'}
                />

                <MainBtn
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                    icon={DbIcon}
                    label={'Daten'}
                />
            </div>

            <div className={classes.centerWrapper}>
                <InputTextField
                    inputTextFieldType={InputTextFieldType.icon}
                    icon={SearchOutlinedIcon}
                    label={'Suche'}
                />
            </div>

            <div className={classes.rightWrapper}>
                <MainBtn
                    icon={BrightnessLowOutlined}
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                    label={'Einstellung'}
                />


                <MainBtn
                    icon={TableViewOutlined}
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                />

                <MainBtn
                    icon={HelpOutlineOutlined}
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                    label={'Hilfe'}
                />

                <MainBtn
                    icon={ErrorOutlineOutlined}
                    type={ButtonType.icon}
                    btnSize={ButtonSize.medium}
                    label={'Wartung'}
                />

            </div>


        </div>
    )

})