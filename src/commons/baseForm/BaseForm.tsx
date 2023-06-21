import React, { useCallback, useState } from "react";
import { DataRowsProp } from "./BaseFormContainer";
import { InputTextField, SelectData } from "../../commons/InputTextField/InputTextField";
import { createUseStyles } from "react-jss";
import { ButtonType, InputTextFieldType, YesOrNo } from "../../components/baseComponentTypes";
import { useFormField } from "./form/useFormFields";
import { useForm } from "./form/useForm";
import { MainBtn } from "../MainBtn/MainBtn";
import { CancelOutlined, CloseFullscreenOutlined, FingerprintOutlined, GroupsOutlined, OpenInFullOutlined, SaveOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { FamilyType, GenderType } from "../../components/baseComponentTypes";
import { IconFontSize, NIcon } from "../NIcon/NIcon";


export interface BaseFormProps {
    readonly data?: DataRowsProp;
    readonly onCloseDraw?: () => void;
}

const useStyles = createUseStyles({
    main: {
        padding: '8px'
    },
    firstRow: {
        display: 'flex'
    },
    drawMenuWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    drawMenuContent: {
        display: 'flex'
    },
    drawBtn: {
        color: '#000'
    },
    topMargin: {
        marginTop: '16px'
    },
    accordionBtn: {
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        paddingLeft: '8px',
        "&:hover": {
            background: '#f2f2fe'
        }
    },
    accordion: {
        display: 'flex',
        alignItems: 'center'
    }
})


const getEnum = (enumData: any) => {

    const fields: SelectData[] = [{ id: '-1', value: '' }];

    const keys = Object.keys(enumData);

    keys.forEach((key, idx) => {
        fields.push({
            id: idx.toString(),
            value: enumData[key]
        })
    })

    return fields;
};

export const BaseForm = React.memo(function BaseForm(props: BaseFormProps) {

    const data = { ...props.data };

    const classes = useStyles();

    const form = useForm({
        personalnummer: useFormField(InputTextFieldType.text, { personalnummer: data?.id }),
        vorname: useFormField(InputTextFieldType.text, { vorname: data?.firstName }),
        familiename: useFormField(InputTextFieldType.text, { lastname: data?.lastName }),
        aufnahme: useFormField(InputTextFieldType.date, { aufnahme: data?.hr.entryDate }),
        notice: useFormField(InputTextFieldType.text, { notice: data?.hr.notice }),
        gender: useFormField(InputTextFieldType.select, { gender: data?.gender }),
        family: useFormField(InputTextFieldType.select, { family: data?.family }),
        address: useFormField(InputTextFieldType.text, { address: data?.kontakt.address }),
        access: useFormField(InputTextFieldType.text, { acces: data?.hr.acces }),
        endDate: useFormField(InputTextFieldType.date, { endDate: data?.hr.endDate }),
        endDateConfirmed: useFormField(InputTextFieldType.select, { endDateConfirmed: data?.hr.endDateConfirmed })
    }
    )


    const handlerSubmit = useCallback(() => {
        const data = {
            ...form.field.personalnummer.getValue(),
            ...form.field.vorname.getValue(),
            ...form.field.aufnahme.getValue(),
            ...form.field.notice.getValue(),
            ...form.field.familiename.getValue(),
            ...form.field.gender.getValue(),
            ...form.field.family.getValue(),
            ...form.field.address.getValue(),
            ...form.field.access.getValue(),
            ...form.field.endData.getValue(),
            ...form.field.endDateConfirmed.getValue()
        };

        const dataJson = JSON.stringify(data);
        console.log(dataJson);
    },
        [form.field]
    );

    const [expanded, setExpanded] = useState<string | false>(false);

    const handlerExpand = useCallback((panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    },
        []
    )

    return (

        <>

            <div className={classes.drawMenuWrapper}>
                <div className={classes.drawMenuContent}>
                    <MainBtn
                        type={ButtonType.iconWithText}
                        icon={SaveOutlined}
                        label={'Speichern'}
                        onClick={handlerSubmit}
                    />
                    <MainBtn
                        type={ButtonType.iconWithText}
                        icon={CancelOutlined}
                        label={'Abbrechen'}
                    />
                </div>
                <div className={classes.drawMenuContent}>
                    <MainBtn
                        type={ButtonType.icon}
                        icon={CloseFullscreenOutlined}
                        onClick={props.onCloseDraw}
                        tooltip={'Schliesen'}
                        rootClassName={classes.drawBtn}
                    />
                    <MainBtn
                        type={ButtonType.icon}
                        icon={OpenInFullOutlined}
                        tooltip={'Vollbild'}
                        rootClassName={classes.drawBtn}
                    />
                </div>
            </div>
            <Divider />

            <div className={classes.main}>

                <div>
                    <h2>{`${data?.firstName} ${data?.lastName} (${data?.id})`}</h2>
                </div>

                <div className={classes.firstRow}>
                    <InputTextField
                        label={'Personalnummer'}
                        fullWidth
                        rootStyle={{ marginRight: '8px' }}
                        formField={form.field.personalnummer}
                    />
                    <InputTextField
                        inputTextFieldType={InputTextFieldType.date}
                        label={'Aufnahme'}
                        fullWidth
                        formField={form.field.aufnahme}
                    />
                </div>


                <div className={classes.topMargin}>
                    <InputTextField
                        inputTextFieldType={InputTextFieldType.select}
                        label={'Vermittlerart'}
                        selectItem={[{ id: '-1', value: '' }, { id: '0', value: 'test1' }, { id: '1', value: 'test2' }]}
                        fullWidth
                    />
                    <div className={classes.topMargin}>
                        <InputTextField
                            inputTextFieldType={InputTextFieldType.text}
                            label={'Bemerkung'}
                            fullWidth
                            formField={form.field.notice}
                        />
                    </div>
                </div>

                <div className={classes.topMargin}>

                    <Accordion expanded={expanded === 'info'} onChange={handlerExpand('info')}>
                        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                            <div className={classes.accordion}>
                                <NIcon
                                    icon={FingerprintOutlined}
                                    size={IconFontSize.medium}
                                    rootStyle={{ marginRight: '8px' }}
                                />
                                <p>Persönliche Information</p>
                            </div>
                        </AccordionSummary>

                        <AccordionDetails>
                            <InputTextField
                                inputTextFieldType={InputTextFieldType.text}
                                label={'Vorname'}
                                fullWidth
                                formField={form.field.vorname}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.text}
                                label={'Familienname'}
                                fullWidth
                                formField={form.field.familiename}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.select}
                                label={'Familienstand'}
                                fullWidth
                                formField={form.field.family}
                                selectItem={getEnum(FamilyType)}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.select}
                                label={'Geschlecht'}
                                fullWidth
                                formField={form.field.gender}
                                selectItem={getEnum(GenderType)}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.text}
                                label={'Anschrift'}
                                fullWidth
                                formField={form.field.address}
                            />
                        </AccordionDetails>
                    </Accordion>


                    <Accordion expanded={expanded === 'hr'} onChange={handlerExpand('hr')}>
                        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                            <div className={classes.accordion}>
                                <NIcon
                                    icon={GroupsOutlined}
                                    size={IconFontSize.medium}
                                    rootStyle={{ marginRight: '8px' }}
                                />
                                <p>HR</p>
                            </div>
                        </AccordionSummary>

                        <AccordionDetails>
                            <InputTextField
                                inputTextFieldType={InputTextFieldType.text}
                                label={'Zugangsweg'}
                                fullWidth
                                formField={form.field.acces}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.date}
                                label={'Kündigung am'}
                                fullWidth
                                formField={form.field.endData}
                            />

                            <InputTextField
                                inputTextFieldType={InputTextFieldType.select}
                                label={'Kündigungbestätigt'}
                                fullWidth
                                formField={form.field.endDateConfirmed}
                                selectItem={getEnum(YesOrNo)}
                            />

                        </AccordionDetails>
                    </Accordion>


                </div>

            </div>
        </>
    )

})